<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class dane extends Model
{
    use HasFactory;
/**
    *
    * @var string
    */
   protected $table = 'dane';
   protected $primaryKey = 'dane_id';

   protected $fillable = [
       'imie',
       'nazwisko',
       'pesel',
       'legitymacja',
       'miasto',
        'kod',
        'ulica',
        'mieszkanie',
        'budynek',
        'e_mail',
        'telefon'
   ];
}
