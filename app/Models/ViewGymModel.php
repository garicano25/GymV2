<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewGymModel extends Model
{
    use HasFactory;

    protected $table = 'views_gym';

    protected $fillable = [
        'gym_id',
        'view_id',
    ];
}
