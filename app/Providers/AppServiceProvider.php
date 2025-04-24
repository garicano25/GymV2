<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('*', function ($view) {
            if (Auth::check()) {
                $user = Auth::id();
                $views = DB::select("
                SELECT v.ruta AS RUTA, v.nombre as NOMBRE, v.icono AS ICONO
                FROM views_gym vg
                LEFT JOIN users u ON u.id = vg.gym_id
                LEFT JOIN views v ON v.id = vg.view_id
                WHERE vg.gym_id = ? AND v.status_id = 1
            ", [$user]);

                $view->with('views', $views);
            }
        });
    }
}
