<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class zwierze extends Model
{
    use HasFactory;
    protected $table = 'zwierze';
    protected $primaryKey = 'zwierze_id';

    protected $fillable = [
        'nazwa',
        'podgrupa',
        'wiek'
    ];
}