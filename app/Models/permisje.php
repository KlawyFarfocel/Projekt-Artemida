<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class permisje extends Model
{
    use HasFactory;
    protected $table = 'zezwolenia';
    protected $primaryKey = 'zezwolenie_id';

    protected $fillable = [
        
        'zezwolenie_id',
        'organ',
        'data_wydania',
        'typ',
        'data_wyga',
        'numer_zez',
        'czlonek_id'	

    ];
}
