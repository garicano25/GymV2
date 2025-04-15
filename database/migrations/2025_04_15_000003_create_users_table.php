<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('dirreccion')->nullable();
            $table->string('telefono')->nullable();
            $table->string('color_primario')->nullable();
            $table->string('color_secundario')->nullable();
            $table->float('pago_mensual')->nullable();
            $table->date('fecha_pago_inicio')->nullable();
            $table->date('fecha_pago_fin')->nullable();
            $table->rememberToken();

            //Relacionamos con el status
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
        Schema::dropIfExists('users');
    }
}
