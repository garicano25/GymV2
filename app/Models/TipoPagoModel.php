<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoPagoModel extends Model
{
    use HasFactory;

    protected $table = 'tipo_pago';

    protected $fillable = [
        'tipo',
    ];
}
