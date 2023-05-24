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
use \App\Models\polowania;
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
            if ($skladka->data_zapl=='0001-01-01 00:00:00'){
                $zmienna='Brak wpłaty';
            }else
            {
                $zmienna=$skladka->data_zapl;
            }
            $ads=[
                'Id'=>$skladka->skladka_id,
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
        $options = [
        'cost' => 12,
                ];
        $passwd=password_hash($haslo, PASSWORD_BCRYPT, $options);
       User::create([
       'legitymacja' => $legitymacja,
       'email' =>  $mail,
       'password' =>  $passwd]);
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
            ["id"=>$prezes->user_id,"Prezes"=>$end1],
            ["id"=>$sekretarz->user_id,"Sekretarz"=>$end2],
            ["id"=>$skarbnik->user_id,"Skarbnik"=>$end3],
            ["id"=>$lowczy->user_id,"Łowczy"=>$end4]
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
                "id"=>$zez->user_id,
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
                "Data"=>$klub->data_nast_spotkania

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
       $legi=$request['userToken'];
       $ser=User::where('id','=',$legi)->first();
       $idik=$ser->klub_id;
      // $user=dane::where('user_id','=',$legi)->first()->update(['kod'=>$request->kod]);
       foreach ($optionsArray as $perm )
        {
           // $idik='15';       
            $zez=User::where('id','=',$perm)->update(['klub_id'=>$idik]);

        }
       /* foreach (User::all()->where('klub_id','0') as $perm )
        {
            $zez=dane::where('user_id','=',$perm->id)->first();
            $fullname=$zez->imie." ".$zez->nazwisko;
            $ads=[
                "value"=>$perm->id,
                "label"=>$fullname,
                
            ];
            array_push($usersWithoutClub,$ads);
                
        }*/
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
           $zez, $optionsArray , $usersWithoutClub
        ]);
    }
    //--------------------------------------------------------------Składki admin--------------------------------------------------------------
    public function showSkarbnikDonate(Request $request){
        //jest userToken zebys klub znalazl
        //tu mają wszystkie składki z tego klubu sie pokazac
        //Id to id składki
        $data=[];
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        $klub=klub::where('klub_id','=',$idik)->first();
        $man=1;
        foreach (User::all()->where('klub_id',$idik) as $perm )
        {
          
           $man++;
           foreach (skladka::all()->where('czlonek_id','=',$perm->id) as $zezol )
           {
           if(isset($zezol))
            {
             $zez=dane::where('user_id','=',$perm->id)->first();
            $fullname=$zez->imie." ".$zez->nazwisko;
            if ($zezol->data_zapl=='0000-01-01 00:00:00'){
                $zmienna='Brak wpłaty';
            }else
            {
                $zmienna=$zezol->data_zapl;
            }
            $ads=
                [
                    "Id"=>$zezol->skladka_id,
                    "Imię i nazwisko"=>$fullname,
                    "Opis"=>$zezol->opis,
                    "Termin"=>$zezol->termin,
                    "Kwota"=>$zezol->kwota,
                    "Data zapłaty"=>$zmienna,
                    "Status"=>$zezol->status,
                    "Edytuj"=>false
                ];
            array_push($data,$ads);
            }
        }
    }
      /*  $data=[
            [
                "Id"=>11,
                "Imię i nazwisko"=>"Endrju Golara",
                "Opis"=>"Składka okresowa",
                "Termin"=>"2008-11-11",
                "Kwota"=>950,
                "Data zapłaty"=>"2008-11-12",
                "Status"=>"Nieopłacona",
                "Edytuj"=>false
            ],
            [
                "Id"=>11,
                "Imię i nazwisko"=>"Dupa Golara",
                "Opis"=>"Składka okresowa",
                "Termin"=>"2008-11-11",
                "Kwota"=>950,
                "Data zapłaty"=>"Brak wpłaty",
                "Status"=>"Nieopłacona",
                "Edytuj"=>false,
            ]
            ];*/
            return response([
                $data,$zezol
            ]);
    }
    public function editDonate(Request $request){
       //idSkładki - skladka_id
       //selectedOption - status
       // jak status przestawisz na "Nieopłacona" to ustawiasz datetime na "0000-01-01 00:00:00"
       //jak na "Opłacona" to na aktualną datę
       //w response nic 
       date_default_timezone_set('Europe/Warsaw');
       $data_zapl=0; 
      
       $legi2=$request['selectedOption'];
       
       
       if($legi2=='Nieopłacona'){
            $data_zapl=date('Y-m-d H:i:s',strtotime("0000-01-01 00:00:00"));
       }
       else{
            $data_zapl=date('Y-m-d H:i:s');
       }/*
       if(!$request->selectedOption){
        $data_zapl=date('Y-m-d H:i:s',strtotime("0000-01-01 00:00:00"));
   }
   else{
        $data_zapl=date('Y-m-d H:i:s',strtotime($request->combinedDate));
   }*/
       $legi=$request['idSkladki'];
      
       $user=skladka::where('skladka_id','=',$legi)->first()->update(['status'=>$legi2]);
       $user=skladka::where('skladka_id','=',$legi)->first()->update(['data_zapl'=>$data_zapl]);
       return response([
          $legi2 , true
        ]);
    }
    public function deleteDonate(Request $request){
       //idSkładki - skladka_id
       // po prostu ją usuń - w responsa wrzuć true tak jak masz nizej
       //powinno sie odswiezyc
      
       $legi=$request['idSkladki'];
       skladka::where('skladka_id','=',$legi)->first()->delete();
       return response([
        true
       ]);
    }
    public function showPermissionRequest(Request $request){
        $datan=[
            [
                "id"=>"650",
                "Imię i nazwisko"=>"Dupa Biskupa",
                "Typ"=>"Podstawowe",
                "Organ"=>"Organek",
                "Numer zezwolenia"=>"123/IHS/Dziki/Alfa/Wilk",
                "Data wydania"=>"2023-04-12",
                "Wygasa"=>"2023-06-06",
                "showPermissionModal"=>"showPermissionModal"
            ]
        ];
        return response([
            $datan
        ]);
    }
//----------------------------------------Polowania----------------------------------------
    public function EditHunt(Request $request){
        //userToken,formattedDateFirst,formattedDateEnd,huntTypeValue,localisation,rallyPoint,supervisor,contact,huntId
        //formattedDateFirst - data zakończenia / DateEnd - zakończenia
        //huntType - Indywidualne/Zbiorowe/Sokolnicze
        $legi=$request['huntId'];
        $marko=polowania::where('polowanie_id','=',$legi)->first();
        
        if($request->localisation!=$marko->lokalizacja)
        $user=polowania::where('polowanie_id','=',$legi)->first()->update(['lokalizacja'=>$request->localisation]);

        if($request->rallyPoint!=$marko->miejsce_zb)
        $user=polowania::where('polowanie_id','=',$legi)->first()->update(['miejsce_zb'=>$request->rallyPoint]);

        if($request->formattedDateEnd!=$marko->data_koncowa)
        $user=polowania::where('polowanie_id','=',$legi)->first()->update(['data_koncowa'=>$request->formattedDateEnd]);

        if($request->formattedDateFirst!=$marko->data_pocz)
        $user=polowania::where('polowanie_id','=',$legi)->first()->update(['data_pocz'=>$request->formattedDateFirst]);
        
        if($request->contact!=$marko->kontakt)
        $user=polowania::where('polowanie_id','=',$legi)->first()->update(['kontakt'=>$request->contact]);

        return $request;





    }
    public function AddHunt(Request $request){
        //userToken,formattedDateFirst,formattedDateEnd,huntTypeValue,localisation,rallyPoint,supervisor,contact,huntId
        //ta sama akcja, nie masz huntId bo po co
        
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        $klub=klub::where('klub_id','=',$idik)->first();

        $dat1=$request['formattedDateFirst'];
        $dat2=$request['formattedDateEnd'];
        $type=strtolower($request['huntType']);
        $lok=$request['localisation'];
        $miejsce=$request['rallyPoint'];
        $sup=$request['supervisor'];
        $kont=$request['contact'];
        $nazwa=$request['huntName'];
        polowania::create([
            'nazwa'=>$nazwa,
            'lokalizacja'=>$lok,
            'miejsce_zb'=>$miejsce,
            'supervisor'=>$sup,
            'kontakt'=>$kont,
            'data_pocz'=>$dat1,
            'data_koncowa'=>$dat2,
            'typ'=>$type,
            'klub_id'=>$klub->klub_id
            ]);
           
    }
    public function DeleteHunt(Request $request){
        //huntId - usuniesz polowanie o tym id i fajrant
        $legi=$request['huntId'];
       polowania::where('polowanie_id','=',$legi)->first()->delete();
    }
    public function ChangeHuntParticipation(Request $request){//to na razie nie jest podpięte
        //huntId, userToken - po prostu zmienisz na przeciwny czy dołączył - na to trzeba będzie tabele zrobić
    }
    public function GetActiveHunts(Request $request){
        //userToken
        date_default_timezone_set('Europe/Warsaw');
        $data=[];
        $data1=[];
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        $klub=klub::where('klub_id','=',$idik)->first();
        foreach (polowania::all()->where('klub_id',$idik) as $perm )
        {
            $stat=true;
            $dat=date('Y-m-d H:i:s');
            $checkTimestamp = strtotime($dat);
            $startTimestamp = strtotime($perm->data_pocz);
            $endTimestamp = strtotime($perm->data_koncowa,);
           
            if ($checkTimestamp >= $startTimestamp && $checkTimestamp <= $endTimestamp) {
                $stat=true;
            } else {
                $stat=false;
            
        }

            $ads=
                [
                    "Id"=>$perm->polowanie_id,
                    "Nazwa"=>$perm->nazwa,
                    "Data rozpoczęcia"=>$perm->data_pocz,
                    "Data zakończenia"=>$perm->data_koncowa,
                    "Status"=>$stat,
                ];
            if($perm->koniec==0)
            {
                 array_push($data,$ads);
            }
            if($perm->koniec==1)
            {
                 array_push($data1,$ads);
            }
            
        }   
        
        /*$data=[
            [
                "Id"=>7,
                "Nazwa"=>"Polowanie na Czerwony Październik",
                "Data rozpoczęcia"=>"17.06.2023 07:00",
                "Data zakończenia"=>"17.06.2023 21:00",
                "Status"=>false,
            ],
            [
                "Id"=>8,
                "Nazwa"=>"Polowanie na Boba Marleya",
                "Data rozpoczęcia"=>"17.06.2023 07:00",
                "Data zakończenia"=>"17.06.2023 21:00",
                "Status"=>true,
            ],
        ];*/
        return response([
            $data,$data1
        ]);
    }
    public function GetCurrentHunt(Request $request){
        //huntId
        date_default_timezone_set('Europe/Warsaw');
        $legi=$request['huntId'];
        $polowanie=polowania::where('polowanie_id','=',$legi)->first();

        $stat=true;
            $dat=date('Y-m-d H:i:s');
            $checkTimestamp = strtotime($dat);
            $startTimestamp = strtotime($polowanie->data_pocz);
            $endTimestamp = strtotime($polowanie->data_koncowa,);
           
            if ($checkTimestamp >= $startTimestamp && $checkTimestamp <= $endTimestamp) {
                $stat=true;
            } else {
                $stat=false;
            }
                $zez=dane::where('user_id','=',$polowanie->supervisor)->first();
                $fullname=$zez->imie." ".$zez->nazwisko;
        $data=[
            [
                "Id"=>$polowanie->polowanie_id,
                "Nazwa"=>"Polowanie na Czerwony Październik",
                "Data rozpoczęcia"=>$polowanie->data_pocz,
                "Data zakończenia"=>$polowanie->data_koncowa,
                "Typ polowania"=>$polowanie->typ,
                "Lokalizacja"=>$polowanie->lokalizacja,
                "Miejsce zbiórki"=>$polowanie->miejsce_zb,
                "Osoba odpowiedzialna"=>$fullname,
                "Kontakt"=>$polowanie->kontakt,
                "Status"=>$stat,
            ]
        ];
        return response(
            $data
        );
    }
    public function CheckPrivileges(Request $request){
        //userToken
        $president=true;
        $secretary=false;
        $cashier=false;
        $huntsman=false;
        return response([
            "President"=>$president,
            "Secretary"=>$secretary,
            "Cashier"=>$cashier,
            "Huntsman"=>$huntsman
        ]);
    }
    public function KickUserOutOfClub(Request $request){
        //kickUserId
        $legi=$request['kickUserId'];
        User::where('id','=',$legi)->first()->update(['klub_id'=>0]);
        return response($legi);
    }
    public function AssignRanks(Request $request){
        //newPresident,newSecretary,newCashier,newHuntsman,userToken
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        $klub=klub::where('klub_id','=',$idik)->first();
        if($request->newSecretary!=$klub->sekretarz)
             klub::where('klub_id','=',$idik)->first()->update(['sekretarz'=>$request->newSecretary]);
        if($request->newPresident!=$klub->prezes)
             klub::where('klub_id','=',$idik)->first()->update(['prezes'=>$request->newPresident]);
        if($request->newCashier!=$klub->skarbnik)
             klub::where('klub_id','=',$idik)->first()->update(['skarbnik'=>$request->newCashier]);
        if($request->newHuntsman!=$klub->lowczy_glowny)
             klub::where('klub_id','=',$idik)->first()->update(['lowczy_glowny'=>$request->newHuntsman]);     
        //w tym klubie co jest userToken przestaw te 4 rzeczy i fajrant - nawet nic nie musisz zwracać - w sensie idk czy musisz, zostaw to true
        return response(true);
    }
    public function AddPermissionRequest(Request $request){
        //userToken,organ,zezwolenie,data_uzyskania 
        //ugułem chyba trzeba będzie dodać kolumnę na to czy jest przyjęte  -wtedy będę sie dalej bawił z tymi requestami uprawnieniami
        return response(true);
    }
    public function GetUserDataInClub(Request $request){
        $zez=dane::where('user_id','=',$request->userDataId)->first();
        $data=[
            "Imie"=>$zez->imie,
            "Nazwisko"=>$zez->nazwisko,
            "Legitymacja"=>$zez->legitymacja,
            "Telefon"=>$zez->telefon,
            "E-mail"=>$zez->e_mail,
        ];
        return response([
            $data
        ]);
    }
    public function AddDonate(Request $request){
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        $opis=$request->opis;
        $kwota=$request->kwota;
        $data=$request->dataString;
        $data1='0000-01-01 00:00:00';
        $status='Nieopłacona';
        foreach (User::all()->where('klub_id',$idik) as $perm )
        {
            skladka::create([
               'termin'=>$data,
               'kwota'=>$kwota,
               'czlonek_id'=>$perm->id,
               'opis'=>$opis,
               'data_zapl'=>$data1,
               'status'=>$status
                ]);


        }
        //userToken,opis,kwota,dataString
        // z userTokena klub i wszystkim userom w klubie
    }
    public function GetAllHuntersFromClub(Request $request){
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        $allHuntersFromClub=[];
        foreach (User::all()->where('klub_id',$idik) as $perm )
        {
            $zez=dane::where('user_id','=',$perm->id)->first();
            $fullname=$zez->imie." ".$zez->nazwisko;
            $ads=[
                "id"=>$zez->user_id,
                "łowczy"=>$fullname,
                
            ];
            array_push($allHuntersFromClub,$ads);
        }
        return response([
            $allHuntersFromClub
        ]);
    }
    public function AddShooting(Request $request){
        //newUser,ilosc,newZwierze,huntId 
        //trzeba będzie tabele zrobić na te polowania - w sensie te konkretne
    }
    public function EndShootingEarly(Request $request){
        
        $legi=$request['huntId'];
        polowania::where('polowanie_id','=',$legi)->first()->update(['koniec'=>1]);
        
        //huntId
        //ustaw end date na datę teraz i status się powinien przestawić sam
    }
}
