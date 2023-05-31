<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class temp extends Model
{
    use HasFactory;
    protected $table = 'temp';
    protected $primaryKey = 'temp_id';

    protected $fillable = [
        
       'user_id',
       'polowanie_id'

    ];
}