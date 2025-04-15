<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';

    protected $fillable = [
        'nombre',
        'correo',
        'sexo',
        'code_pin',
        'code_face',
        'monto',
        'gym_id',
        'tiempo_membresia_id',
        'inicio_membresia',
        'fin_membresia',
        'status_id',
    ];

}
