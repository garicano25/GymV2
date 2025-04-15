<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePagosMembresias extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagos_membresias', function (Blueprint $table) {

            $table->id();
            $table->float('monto');
            $table->enum('forma_pago', ['efectivo', 'tarjeta', 'transferencia']);
            
            // Relacionamos con los clientes (Clientes del Gym)
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            // Relacionamos con los usuarios (Gym)
            $table->foreignId('gym_id')->constrained('users')->onDelete('cascade');

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
        Schema::dropIfExists('pagos_membresias');
    }
}
