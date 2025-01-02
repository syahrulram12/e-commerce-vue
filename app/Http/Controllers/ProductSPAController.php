<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Image;

class ProductSPAController extends Controller
{
    const SPA_PATH = '/spa/product';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orderBy = request()->query('sortBy', 'id');
        $sortBy = request()->query('sortDesc') == 'true' ? 'desc' : 'asc';
        $perPage = request()->query('perPage', 10);

        return response()->json(
            Product::tableSearch()
                ->orderBy($orderBy, $sortBy)
                ->paginate($perPage)
                ->withQueryString()
                ->withPath(self::SPA_PATH)
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
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required',
            'about_product' => 'required|string',
            'description' => 'nullable|string|min:20',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::transaction(function () use ($request) {
            if ($request->hasFile(Product::IMAGE)) {
                $product = DB::table('products')->select('product_images')->where('id', request()->id)->first();
                if ($product && $product->product_images && Storage::disk('public')->exists($product->product_images)) {
                    unlink(storage_path('app/thumbnail/' . $product->product_images));
                }
                $imagePath = $request->file(Product::IMAGE)->store(Product::DIR_IMAGE);
                $img = Image::make($request->file(Product::IMAGE))
                    ->resize(200, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })
                    ->encode();
                Storage::disk('public')->put($imagePath, $img);
                $request->merge(['image' => $imagePath]);
            }
        });

        Product::updateOrCreate(
            ['id' => $request->id],
            [
                'name' => $request->name,
                'category_id' => $request->category_id,
                'about_product' => $request->about_product,
                'product_images' => $request->image,
                'description' => $request->description,
                'price' => $request->price,
                'image' => $request->image,
                'status' => $request->status == true ? 1 : 0
            ]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
