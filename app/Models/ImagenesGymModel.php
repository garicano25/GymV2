<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenesGymModel extends Model
{
    use HasFactory;


    protected $table = 'imagenes_gym';

    protected $fillable = [
        'gym_id',
        'url',
        'tipo',
    ];
}
