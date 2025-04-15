<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CortesCajaModel extends Model
{
    use HasFactory;

    protected $table = 'cortes_caja';

    protected $fillable = [
        'gym_id',
        'total_ventas',
        'total_pagos',
        'total_corte',
        'status_id',
    ];
}
