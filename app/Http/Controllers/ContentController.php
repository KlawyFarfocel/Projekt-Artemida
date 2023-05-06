<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\ogloszenia;
use \App\Models\dane;
use \App\Models\skladka;
use \App\Models\permisje;
use \App\Models\odstrz;
use \App\Models\zwierze;
use \App\Models\User;
use \App\Models\klub;
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
            [ "value"=>'29', "label"=>'norka' ],
            [ "value"=>'36', "label"=>'bazant' ],
            [ "value"=>'26', "label"=>'borsuk' ],
            [ "value"=>'47', "label"=>'łyski' ],
            [ "value"=>'46', "label"=>'słonki' ],
            [ "value"=>'45', "label"=>'gołębie' ],
            [ "value"=>'37', "label"=>'kuropatwy' ],
            [ "value"=>'35', "label"=>'jarząbki' ],
            [ "value"=>'34', "label"=>'króliki' ],
            [ "value"=>'33', "label"=>'zające' ],
            [ "value"=>'32', "label"=>'piżmaki' ],
            [ "value"=>'30', "label"=>'tchórze' ],
            [ "value"=>'25', "label"=>'jenoty' ],
           
        ];
        $daniele=[//łanie i cielęta
            [ "value"=>'9,10,11', "label"=>'byk' ],
            [ "value"=>'12', "label"=>'łanie' ],
            [ "value"=>'13', "label"=>'cielęta' ],
        ];
        
        $dziki=[//wszystkie jak leci
            [ "value"=>'21', "label"=>'lochy' ],
            [ "value"=>'22', "label"=>'odyńce' ],
            [ "value"=>'23', "label"=>'pozostałe' ],
            [ "value"=>'24', "label"=>'warchlaki' ]
        ];
        $gesi=[//wszystkie jak leci
            [ "value"=>'38', "label"=>'gęgawy' ],
            [ "value"=>'39', "label"=>'zbożowe' ],
            [ "value"=>'40', "label"=>'białoczelne' ]
        ];
        $jelenie=[//łanie i cieleta
            [ "value"=>'4,5,6', "label"=>'byk' ],
            [ "value"=>'7', "label"=>'łanie' ],
            [ "value"=>'8', "label"=>'cielęta' ]
        ];
        $kaczki=[//jak leci
            [ "value"=>'41', "label"=>'krzyżówki' ],
            [ "value"=>'42', "label"=>'cyraneczki' ],
            [ "value"=>'43', "label"=>'głowienki' ],
            [ "value"=>'44', "label"=>'czernice' ]

        ];
        $kuny=[//jak leci
            [ "value"=>'27', "label"=>'tumak' ],
            [ "value"=>'28', "label"=>'kamionka' ]

        ];
        $losie=[//jak leci
            [ "value"=>'1', "label"=>'byki' ],
            [ "value"=>'2', "label"=>'klępy' ],
            [ "value"=>'3', "label"=>'łoszaki' ]
        ];
        $muflony=[//jak leci
            [ "value"=>'18', "label"=>'tryki' ],
            [ "value"=>'19', "label"=>'owce' ],
            [ "value"=>'20', "label"=>'jagnięta' ]
        ];
        $sarny=[//kozy,kozleta
            [ "value"=>'14,15', "label"=>'kozły' ],
            [ "value"=>'16', "label"=>'kozy' ],
            [ "value"=>'17', "label"=>'koźlęta' ]
        ];
        
        return response(
            [
                "Daniele"=>$daniele,
                "Dziki"=>$dziki,
                "Gęsi"=>$gesi,
                "Jelenie"=>$jelenie,
                "Kaczki"=>$kaczki,
                "Kuny"=>$kuny,
                "Łosie"=>$losie,
                "Muflony"=>$muflony,
                "Sarny"=>$sarny,
                "Pozostałe"=>$animals,
            ]
        );
    }
    
     /*public function changeStatsView(Request $request){
        $option=$request['userToken'];
        $op=$request['selectedOptionPayload'];
       
        $data=[];
        $legi=$request['userToken'];
        $option=$request['selectedOptionPayload'];
        $match=['user_id'=>$legi,'zwierze_id'=>$option[0]];
        foreach (odstrz::all()->where('zwierze_id','23') as $perm )
        {
            $jd=$perm->zwierze_id;
           // $match=['zwierze_id'=>$jd,''];
           $jds=zwierze::where('zwierze_id',$jd)->first();//('zwierze_id','=','1');
            $jeden=$jds->nazwa;
            $dwa=$jds->podgrupa;
            $wynik=$dwa." ".$jeden;
           
            // "Typ zezwolenia","Organ wydający","Numer zezwolenia","Data uzyskania","Wygasa"
          
            $data=[
                "id"=>$option,//$perm->odstrzal_id,
                "title"=>$op,//$wynik,
                "date"=>'1'//$perm->data
                
            ];
            
         //   array_push($data,$ads);
       // }
        response(
            $data
        );
    }*/
    public function changeStatsView(Request $request){
        $data=[];
        $legi=$request['userToken'];
         $xde = explode(',',$request->selectedOptionPayload);
        $odp=$request['startDate'];
        $dop=$request['endDate'];
        $do=substr($dop,0,10);
        $od=substr($odp,0,10);
       // $match=['user_id'=>$legi,'zwierze_id'=>$option[0]];
        foreach (odstrz::all()->where('user_id',$legi)->whereIn('zwierze_id',$xde)->whereBetween('data',[$od,$do]) as $perm )
        {
            $jd=$perm->zwierze_id;
           $jds=zwierze::where('zwierze_id',$jd)->first();//('zwierze_id','=','1');
            $jeden=$jds->nazwa;
            $dwa=$jds->podgrupa;
            $wynik=$dwa." ".$jeden;
            // "Typ zezwolenia","Organ wydający","Numer zezwolenia","Data uzyskania","Wygasa"
            $ads=[
                "id"=>$perm->odstrzal_id,
                "title"=>$wynik,
                "date"=>$perm->data
                
            ];
            array_push($data,$ads);
                
        }
        
        
        return response(
           $data
        );
    
    }
    public function getStats(Request $request){
        $data=[];
        $legi=$request['userToken'];
        foreach (odstrz::all()->where('user_id',$legi) as $perm )
        {
            $jd=$perm->zwierze_id;
           $jds=zwierze::where('zwierze_id',$jd)->first();//('zwierze_id','=','1');
            $jeden=$jds->nazwa;
            $dwa=$jds->podgrupa;
            $wynik=$dwa." ".$jeden;
            // "Typ zezwolenia","Organ wydający","Numer zezwolenia","Data uzyskania","Wygasa"
            $ads=[
                "id"=>$perm->odstrzal_id,
                "title"=>$wynik,
                "date"=>$perm->data
                
            ];
            array_push($data,$ads);
        }
        
        
        return response(
            $data
        );
    }
    public function AddNewUser(Request $request){
        $budynek=$request['budynek'];
        $haslo=$request['haslo'];
        $imie=$request['imie'];
        $kod=$request['kod'];
        $legitymacja=$request['legitymacja'];
        $mail=$request['mail'];
        $miasto=$request['miasto'];
        $mieszkanie=$request['mieszkanie'];
        $nazwisko=$request['nazwisko'];
        $pesel=$request['pesel'];
        $telefon=$request['telefon'];
        $ulica=$request['ulica'];
    
       User::create([
       'legitymacja' => $legitymacja,
       'email' =>  $mail,
       'password' =>  $haslo]);
        // ta funkcja dodaje usera, dostajesz wszystkie te dane co w changeUserData, ale
        // dostajesz jeszcze budynek - to trzeba będzie dodać do changeUserData, bo zapomniałem przekazać ostatnio
       
       
       
       
        $ser=User::where('legitymacja','=',$legitymacja)->first();
        $idik=$ser->id;

        dane::create([
        'user_id'=> $idik,
        'imie'=>$imie,
        'nazwisko'=>$nazwisko,
        'pesel'=>$pesel,
        'legitymacja'=>$legitymacja,
        'miasto'=>$miasto,
        'kod'=>$kod,
        'budynek'=>$budynek,
        'e_mail'=>$mail,
        'telefon'=>$telefon,
        'ulica'=>$ulica,
        'mieszkanie'=>$mieszkanie
        ]);
       
       
       
        // i hasło - jawnie, no bo skąd - wiadmo, bcrypt i hyc do bazy
        return response(
            $request
        );
    }

    public function getInformationOnPageLoad(Request $request){
        //ta funkcja zbiera wszystkie dane do wyświetlenia przy ładowaniu strony
        // mainSquad - zarząd
        // usersWithoutClub - wszyscy użytkownicy, którzy nie mają przypisanego koła
        // allHuntersFromClub - wszyscy przypisani do tego koła

        // do tych trzec weź mi jeszcze ich id daj albo token albo cokolwiek zeby ich rozroznic - po prostu zeby bylo - bo trzeba bedzie edycje i usuwanie dorobić

        // najbliższePolowanie - najbliższe polowanie dla tego koła - nie ma polowań, zostaw tak jak jest, bo to trzeba będzie przemyśleć
        $usersWithoutClub=[];
        $allHuntersFromClub=[];
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        $klub=klub::where('klub_id','=',$idik)->first();
        $pr=$klub->prezes;
        $se=$klub->sekretarz;
        $sk=$klub->skarbnik;
        $lg=$klub->lowczy_glowny;
        $prezes=dane::where('user_id','=',$pr)->first();
        $sekretarz=dane::where('user_id','=',$se)->first();
        $skarbnik=dane::where('user_id','=',$sk)->first();
        $lowczy=dane::where('user_id','=',$lg)->first();
        $end1=$prezes->imie." ".$prezes->nazwisko;
        $end2=$sekretarz->imie." ".$sekretarz->nazwisko;
        $end3=$skarbnik->imie." ".$skarbnik->nazwisko;
        $end4=$lowczy->imie." ".$lowczy->nazwisko;
        // nextMeeting - data najbliższego spotkania - można na to osobną tabelę zrobić, nie zaszkodzi 
        $mainSquad=[
            ["Prezes"=>$end1],
            ["Sekretarz"=>$end2],
            ["Skarbnik"=>$end3],
            ["Łowczy"=>$end4]
        ];
        
        foreach (User::all()->where('klub_id','0') as $perm )
        {
            $zez=dane::where('user_id','=',$perm->id)->first();
            $fullname=$zez->imie." ".$zez->nazwisko;
            $ads=[
                "value"=>$perm->id,
                "label"=>$fullname,
                
            ];
            array_push($usersWithoutClub,$ads);
                
        }
      /*  $usersWithoutClub=[
            [
                "value"=>12,//Jego id
                "label"=>"Marek Bezklubny",
            ],
            [
                "value"=>14,//Jego id
                "label"=>"Jarek Bezkarny",
            ],
            [
                "value"=>3,//Jego id
                "label"=>"CiebieBoga Wysławiamy",
            ],
        ];*/
        foreach (User::all()->where('klub_id',$idik) as $perm )
        {
            $zez=dane::where('user_id','=',$perm->id)->first();
            $fullname=$zez->imie." ".$zez->nazwisko;
            $ads=[
                "łowczy"=>$fullname,
          
                
            ];
            array_push($allHuntersFromClub,$ads);
                
        }
        /*
        $allHuntersFromClub=[
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Golara"],
                ["Łowczy"=>"Endrju Dupa"],
        ];
        */
        $najblizszePolowania=[
            [
                "id"=>1,
                "Nazwa"=>"Polowanie na Czerwony Październik",
                "Data"=>"2023-05-06"
            ],
            [
                "id"=>2,
                "Nazwa"=>"Polowanie na Śledzie",
                "Data"=>"2023-12-06"
            ],
            [
                "id"=>3,
                "Nazwa"=>"Polowanie na Boba Marleya",
                "Data"=>"2023-04-26"
            ],
        ];
        $nextMeeting=[
            [
                "id"=>3,
                "Nazwa"=>"Siedziba koła Bóbr",
                "Data"=>"2023-12-26"
            ]
            ];
        return response([
            $usersWithoutClub,$mainSquad,$allHuntersFromClub,$najblizszePolowania,$nextMeeting
        ]);
    }
    public function AddExistingUserToClub(Request $request ){
        $optionsArray=explode(",",$request->optionsString); // tu masz id wszystkich co trzeba ich do koła dodać
       // masz tez userToken zebys wiedzial jakie kolo
       // wez z bazy jeszcze raz tych ludzi co klubu nie mają
        $usersWithoutClub=[
            [
                "value"=>14,//Jego id
                "label"=>"Jarek Bezkarny",
            ],
            [
                "value"=>3,//Jego id
                "label"=>"CiebieBoga Wysławiamy",
            ],
        ];
        return response([
            $usersWithoutClub
        ]);
    }
}
