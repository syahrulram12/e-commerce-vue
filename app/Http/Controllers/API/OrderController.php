<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\Product;
use App\Services\MidtransServices;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Midtrans\Snap;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $perPage = request()->get('per_page', 10);
        return response()->json(Order::orderBy('created_at', 'desc')->paginate($perPage)->withQueryString());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'items' => 'required|array'
            ]
        );

        if ($validatedData->fails()) {
            return response()->json(['message' => $validatedData->errors()], 422);
        }

        $transaction = DB::transaction(function () use ($request) {
            $customer = Customer::find($request->user()->id);
            $order = Order::updateOrCreate(['cart_id' => $request->get('cart_id')], [
                'customer_id' => $customer->id,
                'customer_name' => $customer->name,
                'order_number' => 'ORD' . Carbon::now()->timestamp,
                'customer_name' => $customer->name,
                'order_created' => Carbon::now(),
            ]);

            foreach ($request->get('items') as $key => $item) {
                $product = Product::findOrFail($item['product_id']);
                $order->items()->create([
                    'product_id' => $item['id'],
                    'product_name' => $item['product_name'],
                    'price_per_unit' => $item['price_per_unit'],
                    'quantity' => $item['quantity'],
                    'total_price' => $item['total_price']
                ]);
            }

            $totalPrice = $order->items()->sum('total_price');

            $subTotal = round($totalPrice);
            $totalTax = round($totalPrice * 0.11);
            $grossAmount = $subTotal + $totalTax;

            $order->sub_total = $subTotal;
            $order->total_tax = round($totalTax);
            $order->total_price = $grossAmount;

            $orderItems = $order->items()->get()->map(function ($item) {
                return [
                    'id' => 'Product' . '_' . $item->id,
                    'name' => $item->product->name,
                    'price' => (int) $item->price_per_unit,
                    'quantity' => $item->quantity,
                    'category' => $item->product->category_name,
                ];
            })->toArray();

            $order->save();

            Invoice::create([
                'order_id' => $order->id,
                'customer_id' => $customer->id,
                'customer_phone_number' => $customer->phone_number,
                'order_number' => 'ORD' . Carbon::now()->timestamp,
                'customer_name' => $customer->name,
                'order_created' => Carbon::now(),
                'sub_total' => $order->sub_total,
                'total_tax' => $order->total_tax,
                'total_price' => $order->total_price,
            ]);


            foreach ($orderItems as $key => $item) {
                InvoiceItem::create([
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price_per_unit' => $item['price'],
                    'total_price' => $item['price'] * $item['quantity']
                ]);
            }

            //Delete Cart User
            Cart::where('id', $order->cart_id)->delete();

            return compact('order');
        });
        return response()->json(['message' => 'Order created successfully', 'data' => new OrderResource($transaction['order'])], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::with('items')->where('id', $id)->orWhere('order_number', $id)->firstOrFail();
        return response()->json(new OrderResource($order));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }


    public function midtransCallback(Request $request)
    {

        $payload = $request->getContent();
        $notification = json_decode($payload);
        $validSignatureKey = hash('sha512', $notification->order_id . $notification->status_code . $notification->gross_amount . config('midtrans.server_key'));

        if ($notification->signature_key != $validSignatureKey) {
            return response()->json(['message' => 'Invalid Signature Key'], 403);
        }

        $transaction = $notification->transaction_status;
        $type = $notification->payment_type;
        $fraud = $notification->fraud_status;


        DB::transaction(function () use ($notification, $transaction, $type, $fraud) {
            $order = Order::where('order_number', $notification->order_id)->first();
            $order->transaction_id = $notification->transaction_id;


            $transactionDetails = [
                'transaction_time' => $notification->transaction_time,
                'transaction_status' => $transaction,
                'transaction_fraud' => $fraud,
                'payment_type' => $type,

            ];

            if ($transaction == 'capture') {
                if ($type == 'credit_card') {
                    if ($fraud == 'challenge') {
                        $order->status = 'PENDING';
                    } else {
                        $order->status = 'SUCCESS';
                        $order->order_completed = Carbon::now();
                    }
                }
            } else if ($transaction == 'settlement') {
                $order->status = 'SUCCESS';
            } else if ($transaction == 'pending') {
                $order->status = 'PENDING';
            } else if ($transaction == 'deny') {
                $order->status = 'CANCELLED';
            } else if ($transaction == 'expire') {
                $order->status = 'CANCELLED';
            } else if ($transaction == 'cancel') {
                $order->status = 'CANCELLED';
            }

            $order->save();

            OrderHistory::insert([
                'order_id' => $order->id,
                'order_number' => $order->order_number,
                'transaction_status' => $order->status,
                'transaction_id' => $notification->transaction_id,
                'transaction_time' => now(),
                'bank' => $notification->payment_type,
            ]);

            Invoice::where('order_number', $notification->order_id)->update([
                'status' => $order->status,
                'transaction_details' => json_encode($transactionDetails)
            ]);
        });

        return response()->json('Success');
    }

    public function checkout($orderId)
    {
        $order = Order::where('id', $orderId)->orWhere('order_number', $orderId)->first();
        $snapService = new MidtransServices();
        $snapToken = $snapService->createSnapToken($order, true);
        $order->snap_token = $snapToken;
        $order->save();


        return response()->json($snapToken);
    }

    public function cancelOrder(Request $request)
    {
        $order = Order::findOrFail($request->get('order_id'));

        if ($order->status != 'PENDING') {
            return response()->json(['message' => 'Order cannot be cancelled'], 400);
        }

        $response = Http::withBasicAuth(config('midtrans.server_key'), '')
            ->post('https://api.midtrans.com/v2/' . $order->order_number . '/cancel');

        if ($response->successful()) {
            $order->status = 'CANCELLED';
            $order->save();

            OrderHistory::insert([
                'order_id' => $order->id,
                'order_number' => $order->order_number,
                'transaction_status' => 'CANCELLED',
                'transaction_id' => $response->json('transaction_id'),
                'transaction_time' => now(),
                'bank' => $response->json('payment_type'),
            ]);

            return response()->json(['message' => 'Order cancelled successfully']);
        }

        return response()->json(['message' => 'Failed to cancel order'], 500);
    }
}
