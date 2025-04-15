<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableViewsGym extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('views_gym', function (Blueprint $table) {
            $table->id();
            
            //Relacionamos con los usuarios (gym)
            $table->foreignId('gym_id')->constrained('users')->onDelete('cascade');
            //Relacionamos con la vista
            $table->foreignId('view_id')->constrained('views')->onDelete('cascade');

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
        Schema::dropIfExists('views_gym');
    }
}
