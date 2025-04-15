<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableCortesCaja extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cortes_caja', function (Blueprint $table) {
            $table->id();

            //Relacionamos con los user (gym)
            $table->foreignId('gym_id')->constrained('users')->onDelete('cascade');

            $table->float('total_ventas');
            $table->float('total_pagos');
            $table->float('total_corte');

            //Relacionamos con la tabla de status
            $table->foreignId('status_id')->constrained('status')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cortes_caja');
    }
}
