<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('status')->insert([
            ['nombre' => 'ACTIVO'],
            ['nombre' => 'INACTIVO'],
            ['nombre' => 'SUSPENDIDO'],
            ['nombre' => 'BLOQUEADO'],
            ['nombre' => 'CANCELADO'],
            ['nombre' => 'PENDIENTE'],
            ['nombre' => 'EN PROCESO'],
            ['nombre' => 'PAGADO'],
        ]);
    }
}
