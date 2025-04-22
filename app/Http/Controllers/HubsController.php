<?php

namespace App\Http\Controllers;

use App\Models\ProductosModel;
use App\Models\VentasModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HubsController extends Controller
{
    public function viewVentas()
    {
        return view('pages.registroHub.ventas');
    }
    public function viewPagos()
    {
        return view('pages.registroHub.pagos');
    }

    // ==================================> Funciones Ventas =========================================
    // ===> Guardas venta
    public function saveSell(Request $request){
        try {
            $producto = ProductosModel::where('clave', $request->clave)->first();
            if($producto){

                if($producto->status_id != 1){
                    return response()->json(['error' => 'El producto con la clave: ' . $request->clave. ' esta desactivado, activelo para poder proceder con la venta'], 500);
                    
                }elseif ($request->cantidad > $producto->cantidad) {
                    return response()->json(['error' => 'El producto con la clave: ' . $request->clave. ' no tiene suficiente stock para realizar esta venta, por favor revise la cantidad de productos disponibles!'], 500);
                
                }else{
                    $request['gym_id'] = auth()->user()->id;
                    $request['producto_id'] = $producto->id;
                    $request['total'] = intval($request->cantidad) * $producto->precio;

                    $venta = VentasModel::create($request->all());

                    if($venta){
                        $producto->cantidad = $producto->cantidad - $request['cantidad'];
                        $producto->save();
                    }

                }

                
            }else{
                return response()->json(['error' => 'No existe un producto con la clave: '.$request->clave], 500);
            }
                        
            return response()->json($venta, 200);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }


    // ===> Ventas totales del dia o del mes
    public function getVentas(Request $request){
        
        try {
            
            if ($request->all == 0) {
                
                $data = DB::select("SELECT p.nombre PRODUCTO,
                                        p.precio PRECIO,
                                        v.cantidad CANTIDAD,
                                        v.total TOTAL,
                                        DATE(v.created_at) FECHA
                                    FROM ventas v
                                    LEFT JOIN productos p ON p.id = v.producto_id
                                    WHERE ? = DATE(v.created_at)", [$request->fechaRegistroVentas]);
                
            } else {
                
                $data = DB::select("SELECT p.nombre PRODUCTO,
                                        p.precio PRECIO,
                                        v.cantidad CANTIDAD,
                                        v.total TOTAL,
                                        DATE(v.created_at) FECHA
                                    FROM ventas v
                                    LEFT JOIN productos p ON p.id = v.producto_id
                                    WHERE MONTH(NOW()) = MONTH(v.created_at)");
            }
            
            
            return response()->json($data, 200);
            
         } catch (\Exception $e) {

            return response()->json(['error' => $e], 500);
        }
        
        
    }

    //Total de ventas por dia o por mes
    public function getTotalVentas(Request $request){
        
        try {
            
            if ($request->all == 0) {
                
                $data = DB::select("SELECT SUM(total) AS TOTAL
                                    FROM ventas 
                                    WHERE ? = DATE(created_at)", [$request->fechaRegistroVentas]);
                
            } else {
                
                $data = DB::select("SELECT SUM(total) AS TOTAL
                                    FROM ventas 
                                    WHERE MONTH(NOW()) = MONTH(created_at)");
            }
            
            
            return response()->json($data, 200);
            
         } catch (\Exception $e) {

            return response()->json(['error' => $e], 500);
        }
        
        
    }





    // ==================================> Funciones Pagos =========================================










}
