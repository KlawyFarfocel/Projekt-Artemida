<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class klub extends Model
{
    use HasFactory;

   protected $table = 'klub';
   protected $primaryKey = 'klub_id';
      protected $fillable = [
      'klub_id',
      'nazwa',
      'meetingplace',
      'meetingdate',
      'prezes',
      'sekretarz',
      'skarbnik',
      'lowczy_glowny'
   ];
}