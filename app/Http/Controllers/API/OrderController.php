<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Midtrans\Config;
use Midtrans\Snap;

class OrderController extends Controller
{

    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $transcation = DB::transaction(function () use ($request) {
            $order = Order::updateOrCreate(['id' => $request->get('order_id')], [
                'order_number' => 'ORD-' . time(),
                'status' => 'PENDING',
            ]);

            foreach ($request->get('items') as $key => $item) {
                $product = Product::findOrFail($item['product_id']);
                $totalPriceItem = $product->price * $item['quantity'];
                $order->items()->updateOrCreate([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                ], [
                    'price_per_unit' => $product->price,
                    'quantity' => $item['quantity'],
                    'total_price' => $totalPriceItem
                ]);
            }

            $orderItems = $order->items()->get()->map(function ($item) {
                return [
                    'id' => 'Product' . '_' . $item->id,
                    'name' => $item->product->name,
                    'price' => (int) $item->price_per_unit,
                    'quantity' => $item->quantity,
                    'category' => $item->product->category_name,
                ];
            })->toArray();

            $totalPrice = $order->items()->sum('total_price');

            $subTotal = round($totalPrice);
            $totalTax = round($totalPrice * 0.12);
            $grossAmount = $subTotal + $totalTax;

            $orderItems = array_merge($orderItems, [
                [
                    'id' => 'TAX01',
                    'name' => "TAX PPN 12%",
                    'quantity' => 1,
                    'price' => (int) $totalTax,
                    'category' => 'TAX'
                ]
            ]);


            $params = [
                'transaction_details' => [
                    'order_id' => $order->order_number,
                    'gross_amount' => $grossAmount,
                ],
                'item_details' => $orderItems,
                'customer_details' => [
                    'first_name' => "Test Midtrans",
                    'email' => "test@midtrans.com"
                ],
            ];

            $snapToken = Snap::getSnapToken($params);
            $order->sub_total = $subTotal;
            $order->total_tax = $totalTax;
            $order->total_price = $grossAmount;
            $order->snap_token = $snapToken;
            $order->save();

            return compact('snapToken');
        });

        return response()->json($transcation['snapToken']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::with('items.product')->findOrFail($id);
        return response()->json($order);
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
            $order = Order::findOrFail($notification->order_id);

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
                $order->order_completed = Carbon::now();
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
        });

        return response()->json('Success');
    }
}
