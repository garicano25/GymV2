<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableRentaPagos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('renta_pagos', function (Blueprint $table) {
            $table->id();
            
            //Relacionamos con los usuarios (gym)
            $table->foreignId('gym_id')->constrained('users')->onDelete('cascade');
            
            $table->float('monto');
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
        Schema::dropIfExists('renta_pagos');
    }
}
