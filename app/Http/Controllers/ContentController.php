<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ogloszenia;
class ContentController extends Controller
{
    public function ogloszenie(Request $request){

    $data=[];
        foreach (ogloszenia::all() as $oglo )
        {
            $asd=[
                    "Nadawca"=>$oglo->nadawca,
                    "Temat"=>$oglo->temat,
                    "Data wysłania"=>$oglo->data,
                    "Treść"=>$oglo->tresc,
                    "Priorytet"=>$oglo->priorytet,
                ] ;
            array_push($data,$asd);
        }
        return response([
            $data
        ]);
    }
    public function userData(Request $request){
        $data=[
            'imie'=>"Dzwonie",
            'nazwisko'=>'Na Sanepid',
            'pesel'=>'00000',
            'legitymacja'=>'Nie-znasz-numeru',
            'miasto'=>'Nie znam',
            'kod'=>'99-777',
            'ulica'=>'Siedem-siedem',
            'mieszkanie'=>'2',
            'budynek'=>'15',
            'mail'=>'srodowa.noc@gmail.com',
            'telefon'=>'997',
        ];
        return response([
            $data
        ]);
    }
}
