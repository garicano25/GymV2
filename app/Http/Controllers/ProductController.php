<?php

namespace App\Http\Controllers;

use App\Models\ProductosModel;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return view('pages.producto.index');
    }


    public function getProducts()
    {

        // Verificar autenticación primero
        if (!auth()->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no autenticado'
            ], 401);
        }

        try {
            
            $gym_id = auth()->user()->id;
    
            $productos = ProductosModel::where('gym_id', $gym_id)->get();
            return response()->json($productos, 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener productos: ' . $e->getMessage()
            ], 500);
        }
    }


    // Ejemplo con caching
    // public function getProducts()
    // {
    //     if (!auth()->check()) {
    //         return response()->json(['error' => 'Unauthenticated'], 401);
    //     }

    //     return Cache::remember('products_' . auth()->id(), now()->addHours(2), function () {
    //         return ProductosModel::where('gym_id', auth()->id())
    //             ->with(['categoria', 'proveedor'])
    //             ->paginate(10);
    //     });
    // }


    public function productActive(Request $request)
    {
        try {
            $producto = ProductosModel::find($request->id);
            $estado = $request->estado == 1 ? 2 : 1;
            $producto->status_id = $estado;
            $producto->save();

            return response()->json($producto);

        } catch (\Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function store(Request $request)
    {
        try {
            switch ($request->api) {
                // APIS DE INSERCION 
                case 1:


                    $foundProduc = ProductosModel::where('clave', $request->clave)->first();

                    if (!$foundProduc) {
                        $request['gym_id'] = auth()->user()->id;
                        $request['status_id'] = 1;

                        $producto = ProductosModel::create($request->all());
                    } else {

                        return response()->json([ 'error' => 'Ya existe un producto con la clave: ' . $request->clave . ', por favor elija otra'], 500);
                    }

                    break;

                //APIS DE ACTUALIZACION
                case 2:

                    $producto = ProductosModel::find($request->id);

                    if ($producto) {
                        $request['cantidad'] = ($request['productos_agregados'] + $request['productos_cantidad']);
                        $producto->update($request->all());
                    } else {
                        return response()->json(['error' => 'Producto no encontrado'], 404);
                    }

                    break;
                // APIS DE ELIMINACION
                case -1:

                    $producto = ProductosModel::destroy($request->id);
                    break;

                default:
                    return response()->json([
                        'success' => false,
                        'error' => 'API no encontrada'
                    ], 422);
            }

            return response()->json($producto, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }


}
