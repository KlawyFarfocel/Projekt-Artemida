<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class odstrz extends Model
{
    use HasFactory;

    protected $table = 'odstrzal';
    protected $primaryKey = 'odstrzal_id';

    protected $fillable = [
        'user_id',
        'data',
        'zwierze_id',
        'potwierdzenie'
    ];

}

