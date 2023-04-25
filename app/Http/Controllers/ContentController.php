<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ogloszenia;
use \App\Models\dane;
use \App\Models\skladka;
use \App\Models\permisje;
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
        $legi=$request['userToken'];
        //$skladka=skladka::where('user_id','=',$legi)->first();
        foreach (skladka::all()->where('czlonek_id',$legi) as $skladka )
        {
            if ($skladka->data_zapl=='0000-00-00 00:00:00'){
                $zmienna='Brak wpłaty';
            }else
            {
                $zmienna=$skladka->data_zapl;
            }
            $ads=[
                'Opis'=>$skladka->opis,
                "Termin"=>$skladka->termin,
                "Kwota"=>$skladka->kwota,
                "Data zapłaty"=>$zmienna,
                "Status"=>$skladka->status
            ];
            array_push($data,$ads);
        }
        
        
        return response([
            $data
        ]);
    }
    public function showPermissions (Request $request){
        $data=[];
        $legi=$request['userToken'];
        foreach (permisje::all()->where('czlonek_id',$legi) as $perm )
        {
            /// "Typ zezwolenia","Organ wydający","Numer zezwolenia","Data uzyskania","Wygasa"
            $ads=[
                "Typ zezwolenia"=>$perm->typ,
                "Organ wydający"=>$perm->organ,
                "Numer zezwolenia"=>$perm->numer_zez,
                "Data uzyskania"=>$perm->data_wydania,
                "Wygasa"=>$perm->data_wyga
            ];
            array_push($data,$ads);
        }
        
        
        return response([
            $data
        ]);
    }
    public function getStatsSelect(Request $request){
        $animals=[//tutaj leci wszystko, co jest pojedyncze -> value to id, label to nazwa
            [ "value"=>'1', "label"=>'norka' ],
            [ "value"=>'2', "label"=>'bazant' ],
            [ "value"=>'3', "label"=>'borsuk' ],
        ];
        $daniele=[//łanie i cielęta
            [ "value"=>'4', "label"=>'ciele' ],
            [ "value"=>'5', "label"=>'lania' ],
        ];
        $daniele_byki=[//wagi
            [ "value"=>'6', "label"=>'daniel_byk' ]
        ];
        $dziki=[//wszystkie jak leci
            [ "value"=>'7', "label"=>'dziki' ]
        ];
        $gesi=[//wszystkie jak leci
            [ "value"=>'8', "label"=>'ges' ]
        ];
        $jelenie=[//łanie i cieleta
            [ "value"=>'9', "label"=>'jelen' ]
        ];
        $jelenie_byki=[//wagi
            [ "value"=>'10', "label"=>'jelenbyk' ],
            [ "value"=>'11', "label"=>'jelenbyk2' ]
        ];
        $kaczki=[//jak leci
            [ "value"=>'12', "label"=>'kaczyka' ]
        ];
        $kuny=[//jak leci
            [ "value"=>'13', "label"=>'kuna' ]
        ];
        $losie=[//jak leci
            [ "value"=>'14', "label"=>'los' ]
        ];
        $muflony=[//jak leci
            [ "value"=>'15', "label"=>'muflon' ]
        ];
        $sarny=[//kozy,kozleta
            [ "value"=>'16', "label"=>'sarna' ]
        ];
        $sarny_kozly=[//wagi
            [ "value"=>'17', "label"=>'sarna_koziol' ]
        ];
        return response(
            [
                "Daniele"=>$daniele,
                "Daniele - byki"=>$daniele_byki,
                "Dziki"=>$dziki,
                "Gęsi"=>$gesi,
                "Jelenie"=>$jelenie,
                "Jelenie - byki"=>$jelenie_byki,
                "Kaczki"=>$kaczki,
                "Kuny"=>$kuny,
                "Łosie"=>$losie,
                "Muflony"=>$muflony,
                "Sarny"=>$sarny,
                "Sarny - kozły"=>$sarny_kozly,
                "Pozostałe"=>$animals,
            ]
        );
    }
    public function changeStatsView(Request $request){
        //userToken i slectedOptionPayload -tutaj masz id wybranych
        $data=[ //tak to ma wyglądać
            [ "id" =>'e2', "title" =>'Łodfsffsdfś', "date" =>"2021, 2, 12" ],
            [ "id" =>'e2', "title" =>'Łosdadsaś', "date" =>"2021, 2, 12" ],
          ];
        return response(
            $data
        );
    }
    public function getStats(Request $request){
        $data=[
            [ "id" =>'e2', "title" =>'Łoś', "date" =>"2021, 2, 12" ],
            [ "id" =>'e2', "title" =>'Łukasz', "date" =>"2021, 2, 12" ],
            [ "id" =>'e2', "title" =>'Barnaba', "date" =>"2021, 2, 12" ],
            
          ];
        return response(
            $data
        );
    }
}
