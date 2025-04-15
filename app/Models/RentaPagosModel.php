<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentaPagosModel extends Model
{
    use HasFactory;

    protected $table = 'renta_pagos';

    protected $fillable = [
        'gym_id',
        'monto',
    ];
}
