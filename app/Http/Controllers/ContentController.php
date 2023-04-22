<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ogloszenia;
use \App\Models\dane;

class ContentController extends Controller
{
    public function getCookie(Request $request){
        $value = $request->cookie('name');
        echo $value;
     }

    public function ogloszenie(Request $request){
       
     //   $cookie_name = "user";
     //   $cookie_value = 1;
       // setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
     //  $credentials=$request->validated();
       $legi=$request['userToken'];
    
    $data=[];
    
        foreach (ogloszenia::all()->where('czlonek_id',$legi) as $oglo )
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


        $legi=$request['userToken'];
        $user=dane::where('user_id','=',$legi)->first();
        $data=[
            'imie'=>$user->imie,
            'nazwisko'=>$user->nazwisko,
            'pesel'=>$user->pesel,
            'legitymacja'=>$user->legitymacja,
            'miasto'=>$user->miasto,
            'kod'=>$user->kod,
            'ulica'=>$user->ulica,
            'mieszkanie'=>$user->mieszkanie,
            'budynek'=>$user->budynek,
            'mail'=>$user->e_mail,
            'telefon'=>$user->telefon,
        ];
        return response([
            $data
        ]);
    }
    public function changeUserData(Request $request){
        $legi=$request['userToken'];
        if(isset($request->imie))
        $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
        if(isset($request->nazwisko))
        $user=dane::where('user_id','=',$legi)->first()->update(['nazwisko'=>$request->nazwisko]);
        if(isset($request->legitymacja))
        $user=dane::where('user_id','=',$legi)->first()->update(['legitymacja'=>$request->legitymacja]);
        if(isset($request->miasto))
        $user=dane::where('user_id','=',$legi)->first()->update(['miasto'=>$request->miasto]);
        if(isset($request->mieszkanie))
        $user=dane::where('user_id','=',$legi)->first()->update(['mieszkanie'=>$request->mieszkanie]);
        if(isset($request->kod))
        $user=dane::where('user_id','=',$legi)->first()->update(['kod'=>$request->kod]);
        if(isset($request->ulica))
        $user=dane::where('user_id','=',$legi)->first()->update(['ulica'=>$request->ulica]);
        if(isset($request->mail))
        $user=dane::where('user_id','=',$legi)->first()->update(['e_mail'=>$request->mail]);
        if(isset($request->telefon))
        $user=dane::where('user_id','=',$legi)->first()->update(['telefon'=>$request->telefon]);
        return $request;
    }
    public function showDonate (Request $request){
        $data=[];
        $ads=[
            'Opis'=>"Składka okresowa",
            "Termin"=>"11.04.2022r",
            "Kwota"=>"950 PLN",
            "Data zapłaty"=>"12.04.2022r",
            "Status"=>"Opłacona w terminie"
        ];
        array_push($data,$ads);
        $ads=[
            'Opis'=>"Składka okresowa",
            "Termin"=>"11.04.2022r",
            "Kwota"=>"950 PLN",
            "Data zapłaty"=>"12.04.2022r",
            "Status"=>"Nieopłacona"
        ];
        array_push($data,$ads);
        return response([
            $data
        ]);
    }
    public function showPermissions (Request $request){
        $data=[];
        $ads=[
                "Typ zezwolenia"=>"Polowania indywidualne",
                "Organ wydający"=>"Komisja policji w Wałbrzychu",
                "Numer zezwolenia"=>"121/bogu/rodzica/dziewica",
                "Data uzyskania"=>"12.02.2002",
                "Wygasa"=>"19.09.2023"
        ];
        array_push($data,$ads);
        $ads=[
            "Typ zezwolenia"=>"Polowania indywidualne",
            "Organ wydający"=>"Komisja policji w Wałbrzychu",
            "Numer zezwolenia"=>"121/bogu/rodzica/dziewica",
            "Data uzyskania"=>"12.02.2002",
            "Wygasa"=>"19.09.2023"
    ];
    array_push($data,$ads);
        return response([
            $data
        ]);
    }
}
