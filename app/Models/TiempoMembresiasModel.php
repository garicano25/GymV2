<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiempoMembresiasModel extends Model
{
    use HasFactory;

    protected $table = 'tiempo_membresias';

    protected $fillable = [
        'tiempo',
        'descripcion',
    ];
}
