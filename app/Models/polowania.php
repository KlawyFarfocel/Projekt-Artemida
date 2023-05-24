<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class polowania extends Model
{
    use HasFactory;
    protected $table = 'polowania';
    protected $primaryKey = 'polowanie_id';

    protected $fillable = [
        
        'polowanie_id',
        'lokalizacja',
        'miejsce_zb',
        'supervisor',
        'kontakt',
        'data_pocz',
        'data_koncowa',
        'typ',
        'klub_id',
        'koniec'

    ];
}
