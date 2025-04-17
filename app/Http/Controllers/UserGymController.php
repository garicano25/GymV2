<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserGymController extends Controller
{
    public function index()
    {
        return view('pages.gym.index');
    }

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


}
