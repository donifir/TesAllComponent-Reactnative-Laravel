<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\SuplierController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [Auth::class, 'register']);
Route::post('/login', [Auth::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [Auth::class, 'logout']);
});

Route::get('/suplier', [SuplierController::class, 'index']);
Route::post('/create/suplier', [SuplierController::class, 'store']);
Route::get('/suplier/{id}', [SuplierController::class, 'show']);
Route::post('/suplier/{id}/update', [SuplierController::class, 'update']);
Route::delete('/suplier/{id}/delete', [SuplierController::class, 'destroy']);

Route::get('/barang', [BarangController::class, 'index']);
Route::post('/barang/create', [BarangController::class, 'store']);
Route::post('/barang/{id}/update', [BarangController::class, 'update']);
Route::delete('/barang/{id}/delete', [BarangController::class, 'destroy']);






