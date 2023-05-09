<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class skladka extends Model
{
    use HasFactory;

    protected $table = 'skladka';
    protected $primaryKey = 'skladka_id';

    protected $fillable = [
        'skladka_id',
        'termin',
        'kwota',
        'czlonek_id',	
        'opis',
        'data_zapl',
        'status'	
    ];

}



