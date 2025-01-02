<?php

use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/update-profile', [CustomerController::class, 'updateProfile']);
    // Route::apiResources([
    //     'cart' => 'API\CartController',
    // ]);
});

Route::apiResources([
    'order' => 'API\OrderController',
    'cart' => 'API\CartController',
    'product' => 'API\ProductController',
    'category' => 'API\CategoryController',
]);

Route::post('/cart/add-to-cart', [CartController::class, 'addToCart']);
Route::delete('/cart/delete-item/{id}', [CartController::class, 'deleteItem']);


Route::post('/midtrans-callback', [OrderController::class, 'midtransCallback']);
