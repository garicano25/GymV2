<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PagoMembresia extends Model
{
    use HasFactory;

    protected $table = 'pagos_membresias';

    protected $fillable = [
        'monto',
        'forma_pago',
        'cliente_id',
        'gym_id',
    ];

}
