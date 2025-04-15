<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableVentas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();

            // Relacionamos con los productos
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            // Relacionamos con los clientes (Clientes del Gym)
            $table->foreignId('gym_id')->constrained('users')->onDelete('cascade');

            $table->integer('cantidad');
            $table->float('total');

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
        Schema::dropIfExists('ventas');
    }
}
