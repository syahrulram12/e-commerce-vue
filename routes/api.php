<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
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

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/auth-user', [AuthController::class, 'getAuthUser']);
    Route::post('/update-profile', [AuthController::class, 'updateProfile']);
    Route::post('/cart/add-to-cart', [CartController::class, 'addToCart']);
    Route::delete('/cart/delete-item/{id}', [CartController::class, 'deleteItem']);
    Route::apiResources([
        'order' => 'API\OrderController',
        'cart' => 'API\CartController',
    ]);
});

Route::get('/product', [ProductController::class, 'index']);
Route::get('/product/{slug}', [ProductController::class, 'show']);
Route::get('/category', [CategoryController::class, 'index']);

Route::post('/midtrans-callback', [OrderController::class, 'midtransCallback']);
