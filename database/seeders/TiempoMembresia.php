<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiempoMembresia extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tiempo_membresias')->insert([
            ['tiempo' =>  'Semana'],
            ['tiempo' =>  'Quincena'],
            ['tiempo' =>  'Mes'],
            ['tiempo' =>  'Bimestre'],
            ['tiempo' =>  'Trimestre'],
            ['tiempo' =>  'Semestre'],
            ['tiempo' =>  'Año'],
        ]);
    }
}
