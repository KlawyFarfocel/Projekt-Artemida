<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ogloszenia extends Model
{
    use HasFactory;
/**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ogloszenia';
    protected $primaryKey = 'ogloszenie_id';

    protected $fillable = [
        'nadawca',
        'priorytet',
        'temat',
        'tresc',
        'czlonek_id',
         'data'
    ];

}
