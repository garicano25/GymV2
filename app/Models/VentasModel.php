<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VentasModel extends Model
{
    use HasFactory;

    protected $table = 'ventas';

    protected $fillable = [
        'producto_id',
        'gym_id',
        'cantidad',
        'total',
    ];
}
