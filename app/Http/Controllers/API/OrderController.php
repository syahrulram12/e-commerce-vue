<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
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
            if (request()->get('cart_id')) {
                $searchQuery = ['cart_id' => $request->get('cart_id')];
            } else {
                $searchQuery = ['order_id' => $request->get('order_id')];
            }

            $order = Order::updateOrCreate($searchQuery, [
                'order_number' => 'ORD-' . time(),
                'status' => 'WAITING_PAYMENT',
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

            $order->sub_total = $subTotal;
            $order->total_tax = round($totalTax);
            $order->total_price = $grossAmount;

            $orderItems = array_merge($orderItems, [
                [
                    'id' => 'TAX_12',
                    'name' => 'TAX_12%',
                    'price' => $totalTax,
                    'quantity' => 1,
                    'category' => 'TAX',
                ]
            ]);
            if (!$order->snap_token) {
                $params = [
                    'transaction_details' => [
                        'order_id' => $order->order_number,
                        'gross_amount' => $order->total_price,
                    ],
                    'item_details' => $orderItems,
                    'customer_details' => [
                        'first_name' => "Test Midtrans",
                        'email' => "test@midtrans.com"
                    ],
                ];

                $snapToken = Snap::getSnapToken($params);

                $order->snap_token = $snapToken;
                $order->save();
            } else {
                $snapToken = $order->snap_token;
            }

            return compact('snapToken');
        });

        return response()->json(['token' => $transcation['snapToken']]);
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
            $order = Order::where('order_number', $notification->order_id)->first();

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


            if ($order->status == 'SUCCESS') {
                $cart = Cart::where('id', $order->cart_id)->delete();
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

    public function checkout(Request $request)
    {
        $order = Order::findOrFail($request->get('order_id'));
        $orderItems = $order->items()->get()->map(function ($item) {
            return [
                'id' => 'Product' . '_' . $item->id,
                'name' => $item->product->name,
                'price' => (int) $item->price_per_unit,
                'quantity' => $item->quantity,
                'category' => $item->product->category_name,
            ];
        })->toArray();

        $params = [
            'transaction_details' => [
                'order_id' => $order->order_number,
                'gross_amount' => $order->total_price,
            ],
            'item_details' => $orderItems,
            'customer_details' => [
                'first_name' => "Test Midtrans",
                'email' => "test@midtrans.com"
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        $order->snap_token = $snapToken;
        $order->save();

        return response()->json($snapToken);
    }
}
