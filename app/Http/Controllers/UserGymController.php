<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\ViewGymModel;
use App\Models\ViewModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserGymController extends Controller
{
    public function index()
    {
        return view('pages.gym.index');
    }
    public function views()
    {
        $users = User::all();
        $pages = ViewModel::where('status_id', 1)->get();
        return view('pages.gym.main-views', compact('users', 'pages'));
    }


    // ================================ FUNCIONES PARA LOS USUARIOS (GYM)
    public function getUsers()
    {
        $datos = User::get();
        return response()->json($datos);
    }


    public function userActive(Request $request)
    {
        try {
            $user = User::find($request->id);
            $estado = $request->estado == 1 ? 2 : 1;
            $user->status_id = $estado;
            $user->save();

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function deleteUser(Request $request)
    {
        try {
            $user = User::find($request->id)->delete();
            return response()->json($user);

        } catch (\Exception $e) {
            //throw $th;
            return response()->json($e, 500);
        }
    }


    // ==================================== FUNCIONES PARA LA RELACION Y CREACION DE VISTAS - USUARIOS

    public function store(Request $request)
    {

        try {

            switch ($request->api) {
                
                //Api para la creacion y edicion de las vistas
                case 1:
                    $request['status_id'] = 1;
                    $view = ViewModel::updateOrCreate(['id' => $request->id], $request->all());
                    
                    break;
                //Api para la eliminacion de vistas
                case -1:

                    $view = ViewModel::find($request->id)->delete();

                    break;
                //Api para guardar y actualizar las relacion de Gym - View
                case 2:

                    //Eliminamos las relaciones existentes
                    ViewGymModel::where('gym_id', $request->gym_id)->delete();

                    foreach ($request->views as $viewId) {
                        ViewGymModel::create([
                            'gym_id' => $request->gym_id,
                            'view_id' => $viewId
                        ]);
                    }

                    return response()->json('Vistas asignadas correctamente', 200);
                    break;
                //Api para la eliminacion de relaciones Gym - View
                case -2:
                    
                    $view = ViewGymModel::where('gym_id', $request->id)->delete();

                    break;
                default:
                    # code...
                    break;
            }


            return response()->json($view, 200);

        } catch (\Exception $e) {

            return response()->json(['error:'  =>  $e], 500);
        }
    }

    // ====> Active View
    public function viewActive(Request $request)
    {
        try {
            $user = ViewModel::find($request->id);
            $estado = $request->estado == 1 ? 2 : 1;
            $user->status_id = $estado;
            $user->save();

            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json($e, 500);
        }
    }

    // ====> Get View
    public function getView(){

        $datos = ViewModel::get();
        return response()->json($datos);   
    }

    // =====> Get Gym - Views
    public function getGymViews(){

        $vistas = DB::select("SELECT u.username AS username,
                                u.id AS gym_id,
                                GROUP_CONCAT(v.nombre SEPARATOR ', ') AS vistas_asignadas,
                                GROUP_CONCAT(v.id SEPARATOR ', ') AS vistas_id
                            FROM views_gym vg
                            LEFT JOIN users u ON u.id = vg.gym_id
                            LEFT JOIN views v ON v.id = vg.view_id
                            GROUP BY u.id, u.username");


        return response()->json($vistas);
    }
}
