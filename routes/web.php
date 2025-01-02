<?php

use App\Http\Controllers\AuthSPAController;
use App\Http\Controllers\CartSPAController;
use App\Http\Controllers\CategorySPAController;
use App\Http\Controllers\OrderSPAController;
use App\Http\Controllers\ProductSPAController;
use App\Http\Controllers\SPAController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/login', [AuthSPAController::class, 'login'])->name('login');
Route::post('/register', [AuthSPAController::class, 'register']);

Route::prefix('spa')->group(function () {
    Route::post('/logout', [AuthSPAController::class, 'logout']);
    Route::resource('/product', 'ProductSPAController');
    Route::get('/category/category-search', [CategorySPAController::class, 'categorySearch']);
    Route::resource('/category', 'CategorySPAController');
    Route::resource('/cart', 'CartSPAController');
    Route::resource('/order', 'OrderSPAController');
});

Route::get('/{any}', [SPAController::class, 'index'])->where('any', '.*');
