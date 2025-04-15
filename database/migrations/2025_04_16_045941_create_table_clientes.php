<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableClientes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {

            $table->id();
            $table->string('nombre');
            $table->string('correo')->nullable();
            $table->enum('sexo', ['M', 'F']);
            $table->string('code_pin')->nullable()->unique();
            $table->longText('code_face')->nullable();
            $table->float('monto');

            // Relacionamos con los usuaios (Gym)
            $table->foreignId('gym_id')->constrained('users')->onDelete('cascade');
            // Relacionamos con los tipos de membresias 
            $table->foreignId('tiempo_membresia_id')->constrained('tiempo_membresias')->onDelete('cascade');

            $table->date('inicio_membresia');
            $table->date('fin_membresia');

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
        Schema::dropIfExists('clientes');
    }
}
