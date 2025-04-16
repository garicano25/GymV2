<?php

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

Route::get('/login', function () {return view('pages.auth.login'); });
Route::get('/', function () {return view('pages.home.index'); });
Route::get('/list-client', function () {return view('pages.cliente.list'); });
Route::get('/create-client', function () {return view('pages.cliente.create'); });
Route::get('/product', function () {return view('pages.producto.index'); });
Route::get('/asistencia-pin', function () {return view('pages.asistencia.auth-pin'); });
Route::get('/hub-ventas', function () {return view('pages.registroHub.ventas'); });
Route::get('/hub-pagos', function () {return view('pages.registroHub.pagos'); });