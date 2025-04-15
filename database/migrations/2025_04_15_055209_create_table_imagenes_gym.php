<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableImagenesGym extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imagenes_gym', function (Blueprint $table) {
            $table->id();
            // Relacionamos con los gimnasios (Usuarios)
            $table->foreignId('gym_id')->constrained('users')->onDelete('cascade');

            $table->string('url');
            $table->string('tipo'); // tipo de imagen (logo, banner, etc.)
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
        Schema::dropIfExists('imagenes_gym');
    }
}
