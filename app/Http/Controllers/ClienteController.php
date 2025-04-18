<?php

namespace App\Http\Controllers;

use App\Models\ClientesModel;
use App\Models\TiempoMembresiasModel;
use App\Models\TipoPagoModel;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index()
    {
        $tipo_pago = TipoPagoModel::all();
        $tiempo_membresia = TiempoMembresiasModel::all();

        return view('pages.cliente.create', compact('tipo_pago', 'tiempo_membresia'));
    }

    public function store(Request $request)
    {
        try {
            switch ($request->api) {
                // APIS DE INSERCION 
                case 1:
                    $foundCliente = ClientesModel::where('code_pin', $request->code_pin)->first();

                    if(!$foundCliente){
                        $request['gym_id'] = auth()->user()->id;
                        $request['status_id'] = 1;
                        
                        $cliente = ClientesModel::create($request->all());
                    }else{

                        return response()->json('Ya existe un cliente con la clave: '.$request->code_pin. ', por favor elija otra', 500);
                    }
                    break;
                //API DE ACTUALIZACION
                case 2:
                    $cliente = ClientesModel::find($request->id);
                    if ($cliente) {
                        $cliente->update($request->all());
                    } else {
                        return response()->json('Cliente no encontrado', 404);
                    }

                    break;
                // APIS DE ELIMINACION
                case -1:
                    $cliente = ClientesModel::destroy($request->id);
                    break;

                default:
                    return response()->json([
                        'success' => false,
                        'message' => 'API no encontrada'
                    ], 422);
            }

            return response()->json($cliente, 200);
        } catch (\Exception $e) {
            return response()->json('Error:'  . $e, 500);
        }
    }
}
