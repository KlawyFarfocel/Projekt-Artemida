<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Expression;
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
use \App\Models\temp;
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

            $marko=dane::where('user_id',$legi)->first();
            $jeden=$marko->imie;
            $dwa=$marko->nazwisko;
            $fullname=$dwa." ".$jeden;

            $asd=[
                    "Nadawca"=>$fullname,
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
        $query = "SELECT * FROM dane WHERE user_id = ? LIMIT 1";
        $reee = DB::select($query, [$legi]);
        $user =json_decode(json_encode($reee),true);
      //  $user=dane::where('user_id','=',$legi)->first();
        $data=[
            'imie'=>$user[0]['imie'],
            'nazwisko'=>$user[0]['nazwisko'],
            'pesel'=>$user[0]['pesel'],
            'legitymacja'=>$user[0]['legitymacja'],
            'miasto'=>$user[0]['miasto'],
            'kod'=>$user[0]['kod'],
            'ulica'=>$user[0]['ulica'],
            'mieszkanie'=>$user[0]['mieszkanie'],
            'budynek'=>$user[0]['budynek'],
            'mail'=>$user[0]['e_mail'],
            'telefon'=>$user[0]['telefon'],
        ];
        return response([
            $data
        ]);
    }
    public function changeUserData(Request $request){
        $legi=$request['userToken'];
    
        if(isset($request->imie))
        {
       // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
       $query = "UPDATE dane SET imie = :imie WHERE user_id = :legi LIMIT 1";
       DB::update($query, ['imie' => $request->imie, 'legi' => $legi]);
        }
        if(isset($request->nazwisko))
        {
            // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
            $query = "UPDATE dane SET nazwisko = :nazwisko WHERE user_id = :legi LIMIT 1";
            DB::update($query, ['nazwisko' =>$request->nazwisko, 'legi' => $legi]);
             }
        if(isset($request->legitymacja))
        {
            // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
            $query = "UPDATE dane SET legitymacja = :legitymacja WHERE user_id = :legi LIMIT 1";
            DB::update($query, ['legitymacja' => $request->legitymacja, 'legi' => $legi]);
             }
        if(isset($request->miasto))
        {
            // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
            $query = "UPDATE dane SET miasto = :miasto WHERE user_id = :legi LIMIT 1";
            DB::update($query, ['miasto' => $request->miasto, 'legi' => $legi]);
             }
        if(isset($request->mieszkanie))
        {
            // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
            $query = "UPDATE dane SET mieszkanie = :mieszkanie WHERE user_id = :legi LIMIT 1";
            DB::update($query, ['mieszkanie' => $request->mieszkanie, 'legi' => $legi]);
             }
        if(isset($request->kod))
        {
            // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
            $query = "UPDATE dane SET kod = :kod WHERE user_id = :legi LIMIT 1";
            DB::update($query, ['kod' => $request->kod, 'legi' => $legi]);
             }
        if(isset($request->ulica))
        {
            // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
            $query = "UPDATE dane SET ulica = :ulica WHERE user_id = :legi LIMIT 1";
            DB::update($query, ['ulica' => $request->imie, 'legi' => $legi]);
             }
        if(isset($request->mail))
        {
            // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
            $query = "UPDATE dane SET e_mail = :mail WHERE user_id = :legi LIMIT 1";
            DB::update($query, ['mail' => $request->mail, 'legi' => $legi]);
             }
        if(isset($request->telefon))
        {
            // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
            $query = "UPDATE dane SET telefon = :telefon WHERE user_id = :legi LIMIT 1";
            DB::update($query, ['telefon' => $request->telefon, 'legi' => $legi]);
             }
             if(isset($request->budynek))
             {
                 // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
                 $query = "UPDATE dane SET budynek = :budynek WHERE user_id = :legi LIMIT 1";
                 DB::update($query, ['budynek' => $request->budynek, 'legi' => $legi]);
                  }         
                  if(isset($request->pesel))
                  {
                      // $user=dane::where('user_id','=',$legi)->first()->update(['imie'=>$request->imie]);
                      $query = "UPDATE dane SET pesel = :pesel WHERE user_id = :legi LIMIT 1";
                      DB::update($query, ['pesel' => $request->pesel, 'legi' => $legi]);
                       }         
                     
        return $request;
    }
    public function showDonate (Request $request){
        $data=[];
        $legi=$request['userToken'];
        //$skladka=skladka::where('user_id','=',$legi)->first();
        foreach (skladka::all()->where('czlonek_id',$legi) as $skladka )
        {
            if ($skladka->data_zapl=='0000-01-01 00:00:00'){
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
            [ "value"=>'9', "label"=>'byk' ],
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
            [ "value"=>'4', "label"=>'byk' ],
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
            [ "value"=>'14', "label"=>'kozły' ],
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
        $marko=dane::where('user_id',$legi)->first();
        $jeden=$marko->imie;
        $dwa=$marko->nazwisko;
        $fullname=$jeden." ".$dwa;
        
        return response([
            $data,$fullname
        ]);
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
        $najblizszePolowania=[];
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
        $end1=0;
        $end2=0;
        $end3=0;
        $end4=0;
        $id1=0;
        $id2=0;
        $id3=0;
        $id4=0;
        if(isset($prezes))
        {
            $end1=$prezes->imie." ".$prezes->nazwisko;
            $id1=$prezes->user_id;
        }else
        {
            $end1="brak";
            $id1=0;
        }
        if(isset($sekretarz))
        {
        $end2=$sekretarz->imie." ".$sekretarz->nazwisko;
        $id2=$sekretarz->user_id;
        }else
        {
            $end2="brak";
            $id2=0;
        }
        if(isset($skarbnik))
        {
        $end3=$skarbnik->imie." ".$skarbnik->nazwisko;
        $id3=$skarbnik->user_id;
        }else
        {
            $end3="brak";
            $id3=0;
        }
        if(isset($lowczy))
        {
        $end4=$lowczy->imie." ".$lowczy->nazwisko;
        $id4=$lowczy->user_id;
        }else
        {
            $end4="brak";
            $id4=0;
        }
        
        
        // nextMeeting - data najbliższego spotkania - można na to osobną tabelę zrobić, nie zaszkodzi 
        $mainSquad=[
            ["id"=>$id1,"Prezes"=>$end1],
            ["id"=>$id2,"Sekretarz"=>$end2],
            ["id"=>$id3,"Skarbnik"=>$end3],
            ["id"=>$id4,"Łowczy"=>$end4]
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
        date_default_timezone_set('Europe/Warsaw');
        $od=date('Y-m-d H:i:s');
        $asd=0;
        $do='2200-12-12 12:00:00';
        $ork=polowania::where('klub_id',$idik)->whereBetween('data_koncowa',[$od,$do])->orderBy('data_koncowa','asc')->get();
        for($k=0;$k<=2;$k++)
        {
        if(isset($ork[$k]))
        {
           $asd=[
            "id"=>$k,
            "Nazwa"=>$ork[$k]->nazwa,
            "Data"=>$ork[$k]->data_koncowa
           ]; 
           array_push($najblizszePolowania,$asd);
        }
        }
       
        $nextMeeting=[
            [
                "id"=>3,
                "Nazwa"=>$klub->meetingplace,
                "Data"=>$klub->meetingdate

            ]
            ];
            $nazwa=$klub->nazwa;
        return response([
            $usersWithoutClub,$mainSquad,$allHuntersFromClub,$najblizszePolowania,$nextMeeting,$nazwa,$pr,$idik,$ork,$asd
        ]);
    }
    public function GetOnlyMainSquadFromClub(Request $request){
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
        $end1=0;
        $end2=0;
        $end3=0;
        $end4=0;
        $id1=0;
        $id2=0;
        $id3=0;
        $id4=0;
        if(isset($prezes))
        {
            $end1=$prezes->imie." ".$prezes->nazwisko;
            $id1=$prezes->user_id;
        }else
        {
            $end1="brak";
            $id1=0;
        }
        if(isset($sekretarz))
        {
        $end2=$sekretarz->imie." ".$sekretarz->nazwisko;
        $id2=$sekretarz->user_id;
        }else
        {
            $end2="brak";
            $id2=0;
        }
        if(isset($skarbnik))
        {
        $end3=$skarbnik->imie." ".$skarbnik->nazwisko;
        $id3=$skarbnik->user_id;
        }else
        {
            $end3="brak";
            $id3=0;
        }
        if(isset($lowczy))
        {
            $end4=$lowczy->imie." ".$lowczy->nazwisko;
            $id4=$lowczy->user_id;
        }else
        {
            $end4="brak";
            $id4=0;
        }
        
        
        // nextMeeting - data najbliższego spotkania - można na to osobną tabelę zrobić, nie zaszkodzi 
        $mainSquad=[
            ["value"=>$id1,"label"=>$end1],
            ["value"=>$id2,"label"=>$end2],
            ["value"=>$id3,"label"=>$end3],
            ["value"=>$id4,"label"=>$end4]
        ];
        return response([
            $mainSquad
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

        if($request->newSupervisor!=$marko->supervisor)
        $user=polowania::where('polowanie_id','=',$legi)->first()->update(['supervisor'=>$request->newSupervisor]);

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
        $sup=$request['newSupervisor'];
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
        $liczi=0;
        $pol=polowania::where('data_koncowa','=',$dat2)->first();
        $ajdi=$pol->polowanie_id;
        foreach($request->newAnimalList as $perm)
        {
            $liczi=$perm;
            
            $licznik=intval($perm['ilosc']);
            for($i=0;$i<$licznik;$i++)
            {
            odstrz::create([
            'user_id'=>0,
            'polowanie_id'=>$ajdi,
            'data'=>'2000-01-01',
            'zwierze_id'=>$perm['zwierzeId']
            ]);
            }
        }
        
    }
    public function DeleteHunt(Request $request){
        //huntId - usuniesz polowanie o tym id i fajrant
        $legi=$request['huntId'];
       polowania::where('polowanie_id','=',$legi)->first()->delete();
       temp::where('polowanie_id','=',$legi)->delete();
    }
    public function ChangeHuntParticipation(Request $request){//to na razie nie jest podpięte
        $legi=$request['userToken'];
        $huntid=$request['huntId'];
        temp::create(
        [
            'user_id'=>$legi,
            'polowanie_id'=>$huntid
        ]
        );
        /*
       skladka::create([
               'termin'=>$data,
               'kwota'=>$kwota,
               'czlonek_id'=>$perm->id,
               'opis'=>$opis,
               'data_zapl'=>$data1,
               'status'=>$status
                ]);
      */
      
      
      
      
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
                "Nazwa"=>$polowanie->nazwa,
                "Data rozpoczęcia"=>$polowanie->data_pocz,
                "Data zakończenia"=>$polowanie->data_koncowa,
                "Typ polowania"=>$polowanie->typ,
                "Lokalizacja"=>$polowanie->lokalizacja,
                "Miejsce zbiórki"=>$polowanie->miejsce_zb,
                "Osoba odpowiedzialna"=>$fullname,
                "Kontakt"=>$polowanie->kontakt,
                "Status"=>$stat,
                "IdSupervisor"=>$polowanie->supervisor
            ]
        ];
        return response(
            $data
        );
    }
    public function CheckPrivileges(Request $request){
        //userToken
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
       $klub=klub::where('klub_id','=',$ser->klub_id)->first();
       $huntsman=false;
       $cashier=false;
       $secretary=false;
       $president=false;
       if($klub->prezes==$legi)
        $president=true;
       if($klub->sekretarz==$legi)
        $secretary=true;
        if($klub->skarbnik==$legi)
        $cashier=true;
        if($klub->lowczy_glowny==$legi)
        $huntsman=true;
        return response([
            "President"=>$president,
            "Secretary"=>$secretary,
            "Cashier"=>$cashier,
            "Huntsman"=>$huntsman
        ]);
    }
    public function KickUserOutOfClub(Request $request){
       //teraz masz jeszcze deleteUser
       //jak jest na true znaczy wypierdol z bazy
       //jak jest na false znaczy tylko z kola wypierdol
       
        $legi=$request['kickUserId'];
        $ser=User::where('id','=',$legi)->first();
       $klub=klub::where('klub_id','=',$ser->klub_id)->first();
       $leg=$ser->klub_id;
        $query = "UPDATE users SET klub_id = 0 WHERE  id = :legi LIMIT 1";
        
        $result = DB::update($query,['legi' => $legi]);
        
        if($klub->prezes==$legi)
        {
        $query1 = "UPDATE klub SET prezes = 0 WHERE  klub_id = :legi LIMIT 1";   
        $result = DB::update($query1,['legi' => $leg]);
        }
        if($klub->sekretarz==$legi)
        {
            $query2 = "UPDATE klub SET sekretarz = 0 WHERE  klub_id = :legi LIMIT 1";   
            $result = DB::update($query2,['legi' => $leg]);
        }
        if($klub->skarbnik==$legi)
        {
            $query3 = "UPDATE klub SET skarbnik = 0 WHERE  klub_id = :legi LIMIT 1";   
            $result = DB::update($query3,['legi' => $leg]);
        }
        if($klub->lowczy_glowny==$legi)
        {
            $query4 = "UPDATE klub SET lowczy_glowny = 0 WHERE  klub_id = :legi LIMIT 1";   
            $result = DB::update($query4,['legi' => $leg]);
        }
       
       if($request->deleteUser==true)
       {
        permisje::where('czlonek_id','=',$legi)->first()->delete();
        User::where('id','=',$legi)->first()->delete();
        dane::where('user_id','=',$legi)->first()->delete();
       }
        /*    //kickUserId
        $legi=$request['kickUserId'];
        User::where('id','=',$legi)->first()->update(['klub_id'=>0]);*/
        return response($legi);
    }
    public function AssignRanks(Request $request){
        //newPresident,newSecretary,newCashier,newHuntsman,userToken
        $legi=$request['userToken'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        $klub=klub::where('klub_id','=',$idik)->first();
        if($request->newSecretary!=$klub->sekretarz)
        {
            klub::where('klub_id','=',$idik)->first()->update(['sekretarz'=>$request->newSecretary]);
        }
             
        if($request->newPresident!=$klub->prezes){
            klub::where('klub_id','=',$idik)->first()->update(['prezes'=>$request->newPresident]);
        }
        if($request->newCashier!=$klub->skarbnik){
            klub::where('klub_id','=',$idik)->first()->update(['skarbnik'=>$request->newCashier]);
        }
             
        if($request->newHuntsman!=$klub->lowczy_glowny){
            klub::where('klub_id','=',$idik)->first()->update(['lowczy_glowny'=>$request->newHuntsman]);    
        }
              
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
        $legi=intval($request['newUser']);
        $ilosc=intval($request['ilosc']);
        $zwierze=intval($request['newZwierze']);
        $huntid=intval($request['huntId']);

        for($i=0;$i<$ilosc;$i++)
        {
           odstrz::where('potwierdzenie','nie')->where('zwierze_id',$zwierze)->where('polowanie_id',$huntid)->first()->update(['potwierdzenie'=>'tak','user_id'=>$legi]); //date(['skarbnik'=>$request->newCashier]);
           //odstrz::where('polowanie_id',$huntid)->whereIn('zwierze_id',$zwierze)->whereIn('potwierdzenie','nie')->first()->update(['user_id'=>$legi]);
        }



        //trzeba będzie tabele zrobić na te polowania - w sensie te konkretne
    }
    public function EndShootingEarly(Request $request){
        date_default_timezone_set('Europe/Warsaw');

        $legi=$request['huntId'];
        $dat=date('Y-m-d H:i:s');
        polowania::where('polowanie_id','=',$legi)->first()->update(['koniec'=>1]);
        polowania::where('polowanie_id','=',$legi)->first()->update(['data_koncowa'=>$dat]);
        temp::where('polowanie_id','=',$legi)->delete();
        //huntId
        return $legi;
        //ustaw end date na datę teraz i status się powinien przestawić sam
    }
    public function FilterDonate(Request $request){
        //userToken,newUsersList,newStartDate,newEndDate
        //newUsersList -> tu masz tablice wszystkich id ludzi, których składki chcesz znaleźć - jest opcja ze będzie pusta, ale to wtedy tak zakrynć zeby wszystkich wybrało
        
        //newStartDate - od tego filtrować
        //newEndDate - do tego filtrować
        //userToken zeby klub znaleźć
/**/
        $data=[];
        $legi=$request['userToken'];
        // $xde = explode(',',$request->selectedOptionPayload);
        $od=$request['newStartDate'];
        $do=$request['newEndDate'];
       
       // $match=['user_id'=>$legi,'zwierze_id'=>$option[0]];
        foreach ($request->newUsersList as $perm )
        {
            //odstrz::all()->where('user_id',$legi)->whereIn('zwierze_id',$xde)->whereBetween('data',[$od,$do])
           $marko=dane::where('user_id',$perm)->first();
            $jeden=$marko->imie;
            $dwa=$marko->nazwisko;
            $fullname=$dwa." ".$jeden;
            foreach(skladka::all()->where('czlonek_id',$perm)->whereBetween('termin',[$od,$do]) as $zezol)
           { // "Typ zezwolenia","Organ wydający","Numer zezwolenia","Data uzyskania","Wygasa"
           
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
        return response(
           $data
        );
    }
    public function SendAnno(Request $request){
        $legi=$request['userToken'];
        $data=$request['sendDate'];
        $bool=$request['odbiorca'];
        $tresc=$request['tresc'];
        $topic=$request['temat'];
        $risk=$request['priorytet'];
        $query = "SELECT * FROM users WHERE id = ? LIMIT 1";
        $result = DB::select($query, [$legi]);
        if($bool==1)
        {
            $leg=$result[0]->klub_id;
            $query = "SELECT * FROM users WHERE klub_id = ?";
            $reee = DB::select($query, [$leg]);
            $xde =json_decode(json_encode($reee),true);
        
            foreach($xde as $res)
            {
                ogloszenia::create([
                    
                    'nadawca'=>$legi,
                     'priorytet'=>$risk,
                      'temat'=>$topic,
                    'tresc'=>$tresc,
                    'czlonek_id'=>$res['id'],
                    'data'=>$data
                     ]);
            }
        }
        else
        {
            $leg=$result[0]->klub_id;
            $query = "SELECT * FROM klub WHERE klub_id = ?";
            $reee = DB::select($query, [$leg]);
            $xde =json_decode(json_encode($reee),true);
   
               ogloszenia::create([
                    
                    'nadawca'=>$legi,
                     'priorytet'=>$risk,
                      'temat'=>$topic,
                    'tresc'=>$tresc,
                    'czlonek_id'=>$xde[0]['prezes'],
                    'data'=>$data
                     ]);

                     ogloszenia::create([
                    
                        'nadawca'=>$legi,
                         'priorytet'=>$risk,
                          'temat'=>$topic,
                        'tresc'=>$tresc,
                        'czlonek_id'=>$xde[0]['sekretarz'],
                        'data'=>$data
                         ]);


                         ogloszenia::create([
                    
                            'nadawca'=>$legi,
                             'priorytet'=>$risk,
                              'temat'=>$topic,
                            'tresc'=>$tresc,
                            'czlonek_id'=>$xde[0]['skarbnik'],
                            'data'=>$data
                             ]);
                             
                             ogloszenia::create([
                    
                                'nadawca'=>$legi,
                                 'priorytet'=>$risk,
                                  'temat'=>$topic,
                                'tresc'=>$tresc,
                                'czlonek_id'=>$xde[0]['lowczy_glowny'],
                                'data'=>$data
                                 ]);     
            }
        

        return $xde;
        //userToken,sendDate,odbiorca,tresc,temat,priorytet
        //sendDate to po prostu dzisiejsza data - w sensie z momentu wysłania
        //odbiorca masz tak -> 0 - zarząd, 1 - wszyscy w Klubie
    }
    public function GetActiveHuntInfo(Request $request){
        $huntAnimalsProp=[];
        $tableProp=[
            [
                "Kto strzelał"=>"Alberto Kozak",
                "Kiedy"=>"23.05.2023 23:05",
                "Podgrupa"=>"Dziki",
                "Zwierzyna"=>"pozostały",
                "ilość"=>7
            ],
            [
                "Kto strzelał"=>"Alberto Kozak",
                "Kiedy"=>"23.05.2023 23:05",
                "Podgrupa"=>"Dziki",
                "Zwierzyna"=>" lochy",
                "ilość"=>1
            ],
        ];
        $legi=$request['huntId'];
        $ss1=odstrz::all()->where('polowanie_id','=',$legi)->where('potwierdzenie','=','tak');
        $ss2=odstrz::all()->where('polowanie_id','=',$legi);
        $ss3 = odstrz::where('polowanie_id', '=', $legi)
        ->pluck('zwierze_id')
        ->unique()
        ->values()
        ->all();
        
        foreach($ss3 as $perm)
        {
        $aaa=zwierze::where('zwierze_id','=',$perm)->first();
        $ss1=odstrz::all()->where('polowanie_id','=',$legi)->where('potwierdzenie','=','tak')->where('zwierze_id','=',$perm); 
        $ss2=odstrz::all()->where('polowanie_id','=',$legi)->where('zwierze_id','=',$perm);   
        $asd=
            [
                "Podgrupa"=>$aaa->podgrupa,//$aaa->podgrupa,
                "Zwierze"=>$aaa->nazwa,
                "Założono do odstrzału"=>count($ss2),//masz huntId to weź zlicz wszystkie
                "Odstrzelono"=>count($ss1)//zlicz potwierdzone dla tego huntId
            ];
        array_push($huntAnimalsProp,$asd);
        }
       /* $huntAnimalsProp=[
                [
                    "Podgrupa"=>"Dziki",
                    "Zwierze"=>"Lochy",
                    "Założono do odstrzału"=>7,//masz huntId to weź zlicz wszystkie
                    "Odstrzelono"=>1//zlicz potwierdzone dla tego huntId
                ],
                [
                    "Podgrupa"=>"Dziki",
                    "Zwierze"=>"pozostałe",
                    "Założono do odstrzału"=>5,
                    "Odstrzelono"=>4
                ]
        ];*/
        return response([
            $tableProp,$huntAnimalsProp,$ss3
        ]);
    }
    public function SetNextMeeting(Request $request){
        //userToken,meetingPlace,meetingDate
        //weż dołóż w klubie meetingPlace i meetingDate kolumny
        //meetingDate to będzie timestamp
        //place to varchar
        $legi=$request['userToken'];
        $mp=$request['meetingPlace'];
        $md=$request['meetingDate'];
        $ser=User::where('id','=',$legi)->first();
        $idik=$ser->klub_id;
        klub::where('klub_id','=',$idik)->first()->update(['meetingdate'=>$md,'meetingplace'=>$mp]);
        return response(true);
    }
    public function downloadCsv()
{   
    $data = DB::select("
    SELECT p.nazwa AS 'Nazwa Polowania', CONCAT(d.imie, ' ', d.nazwisko) AS 'Imię i nazwisko osoby odpowiedzialnej za polowanie', z.podgrupa AS 'Podgrupa zwierzęcia', z.nazwa AS 'Nazwa Zwierzęcia', IF(o.potwierdzenie='tak','Odstrzelono','Nie odstrzelono') AS 'Czy odstrzelono', IF(o.potwierdzenie='tak',CONCAT(d.imie,' ',d.nazwisko),'Brak') AS 'Osoba odpowiedzialna za ostrzał' 
    FROM polowania p 
    JOIN dane d ON d.user_id = p.supervisor 
    LEFT JOIN odstrzal o ON o.polowanie_id = p.polowanie_id 
    LEFT JOIN zwierze z ON z.zwierze_id = o.zwierze_id
");
$columnNames = [
    'Nazwa Polowania',
    'Imię i nazwisko osoby odpowiedzialnej za polowanie',
    'Podgrupa zwierzęcia',
    'Nazwa Zwierzęcia',
    'Czy odstrzelono',
    'Osoba odpowiedzialna za ostrzał'
];
$content = implode(';', $columnNames) . "\r\n";

// Generate CSV content
foreach ($data as $row) {
    $content .= implode(';', (array) $row) . "\r\n";
}

// Create a response with the CSV content
$headers = [
    'Content-Type' => 'text/csv; charset=UTF-8',
    'Content-Disposition' => 'attachment; filename=raport.csv"',
];

$response = response($content, 200, $headers);
return $response;
}
}
