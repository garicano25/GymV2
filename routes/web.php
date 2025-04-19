<?php

use App\Http\Controllers\UserGymController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProductController;
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





// ==================== Auth
Route::get('/login', [AuthController::class, 'index'])->name('login');
Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/loginAuth', [AuthController::class, 'loginAuth'])->name('loginAuth');

Route::middleware(['auth'])->group(function () {

    // ===================== Home
    Route::get('/', function () {return view('pages.home.index');})->name('home');


    // ===================== Usuarios (Gym)
    Route::get('/users', [UserGymController::class, 'index'])->name('users');
    Route::get('/getUsers', [UserGymController::class, 'getUsers']);
    Route::post('/register-user', [AuthController::class, 'register']);
    Route::post('/user-active', [UserGymController::class, 'userActive']);
    Route::post('/user-delete', [UserGymController::class, 'deleteUser']);

    // ==================== Clientes 
    Route::get('/create-client', [ClienteController::class, 'index'])->name('create-client');
    Route::post('/store-client', [ClienteController::class, 'store']);
    
    
    // =================== Productos
    Route::get('/product', [ProductController::class, 'index'])->name('product');
    Route::get('/getProducts', [ProductController::class, 'getProducts']);
    Route::post('/store-product', [ProductController::class, 'store']);
    Route::post('/product-active', [ProductController::class, 'productActive']);



    // =================== Aditional
    Route::get('/list-client', function () {return view('pages.cliente.list'); });
    Route::get('/asistencia-pin', function () {return view('pages.asistencia.auth-pin'); });
    Route::get('/hub-ventas', function () {return view('pages.registroHub.ventas'); });
    Route::get('/hub-pagos', function () {return view('pages.registroHub.pagos'); });

});