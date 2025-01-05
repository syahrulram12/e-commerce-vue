<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $perPage = request()->get('perPage', 10);
        $cart = Cart::where('customer_id', request()->get(
            'customer_id'
        ))->first();
        if (!$cart) {
            $cart = Cart::create([
                'customer_id' => Auth::user()->customer_id ?? request()->get('customer_id'),
                'customer_name' => Auth::user()->name ?? 'Customer',
            ]);
        }
        $cart->items = $cart->items;
        $cart->sub_total = $cart->items()->sum('total_price');
        $cart->total_tax = round($cart->sub_total * 0.12);
        $cart->total_price = $cart->sub_total + $cart->total_tax;
        return response()->json(
            $cart
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function addToCart(Request $request)
    {
        $carts = DB::transaction(function () use ($request) {
            $request->validate([
                'quantity' => ['required', 'integer'],
            ]);

            $cart = Cart::updateOrCreate([
                'customer_id' => $request->customer_id,
            ], [
                'customer_name' => Auth::user()->name ?? 'Customer',
                'user_id' => $request->user_id,
            ]);

            $product = Product::findOrFail($request->product_id);

            $cart->items()->updateOrCreate(['cart_id' => $cart->id, 'product_id' => $request->product_id], [
                'product_id' => $request->product_id,
                'product_name' => $product->name,
                'price_per_unit' => $product->price,
                'quantity' => $request->quantity,
                'total_price' => $request->quantity * $product->price,
            ]);

            $totalPrice = $cart->items()->sum('total_price');
            $cart->sub_total = round($totalPrice);
            $cart->total_tax = round($totalPrice * 0.12);
            $cart->total_price = $cart->sub_total + $cart->total_tax;
            $cart->save();
        });
    }

    public function deleteItem($id)
    {

        $cartItem = CartItem::findOrFail($id);
        $cartId = $cartItem->cart_id;
        $cartItem->delete();

        $cart = Cart::findOrFail($cartId);
        $cart->sub_total = $cart->items()->sum('total_price');
        $cart->total_tax = $cart->sub_total * 0.12;
        $cart->total_price = $cart->sub_total + $cart->total_tax;
        $cart->save();

        return response()->json([
            'message' => 'Item has been removed from cart',
        ]);
    }
}
