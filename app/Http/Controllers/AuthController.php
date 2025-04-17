<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            return redirect()->route('home');
        }
        return view('pages.auth.login');
    }


    public function register(Request $request)
    {

        try {
            // Validar los datos
            $request->validate([
                'username' => ['required', 'string', 'max:255'],
                'password' => ['nullable', 'string', 'min:3'],
                'dirreccion' => ['nullable', 'string', 'min:3'],
                'telefono' => ['nullable', 'string', 'min:3'],
                'color_primario' => ['nullable', 'string', 'min:3'],
                'color_secundario' => ['nullable', 'string', 'min:3'],
                'fecha_pago_inicio' => ['nullable', 'date'],
                'fecha_pago_fin' => ['nullable', 'date'],
            ]);


            $user = User::find($request->id);
            $password = $request->password ? Hash::make($request->password) : $user->password;

            $user = User::updateOrCreate(
                ['id' => $request->id],
                [
                    'username' => $request->username,
                    'password' => $password,

                    'dirreccion' => $request->dirreccion,
                    'telefono' => $request->telefono,
                    'color_primario' => $request->color_primario,
                    'color_secundario' => $request->color_secundario,
                    'pago_mensual' => $request->pago_mensual,
                    'fecha_pago_inicio' => $request->fecha_pago_inicio,
                    'fecha_pago_fin' => $request->fecha_pago_fin,
                    'status_id' => 1, // Activo

                ]
            );

            return response()->json($user, 200);
        } catch (\Exception $e) {

            return response()->json('Error:'  . $e, 500);
        }
    }

    public function loginAuth(Request $request)
    {
        try {
            // Validar los datos
            $request->validate([
                'username' => ['required', 'string', 'max:255'],
                'password' => ['required', 'string', 'min:3'],
            ]);


            $remember = ($request->has('remember') ? true : false);


            // Autenticar al usuario
            if (Auth::attempt(['username' => $request->username, 'password' => $request->password], $remember)) {
                $user = Auth::user();
                if ($user->status_id === 1) { // Activo
                    $request->session()->regenerate();
                    return response()->json(['redirect' => route('home')], 200);
                } else {

                    Auth::logout();
                    return response()->json('Tu cuenta está desactivada. Contacta al administrador.', 403);
                }
            } else {
                return response()->json('Usuario o contraseña incorrectos', 401);
            }
        } catch (\Exception $e) {

            return response()->json('Error:'  . $e, 500);
        }
    }


    public function logout(Request $request)
    {

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
