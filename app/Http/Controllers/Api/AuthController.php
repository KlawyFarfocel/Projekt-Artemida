<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        
        $credentials=$request->validated();
        $remember=$credentials['remember'] ?? false;
        $legi=$credentials['legitymacja'];
        unset($credentials['remember']);
        $user=User::where('legitymacja','=',$legi)->first();
        
        if($user && $credentials['password'] == $user->password)
        {
        
        $token=$user->id;
        //$res->withCookie(cookie()->forever('tokenisko', $token));
            //  $user=Auth::user();
        setcookie('pomocy', $token, time() + (86400 * 30)); // 86400 = seconds in 1 day
        $_COOKIE['pomocy']=$token;
        return response([
            'user'=>$user,
            'token'=>$token
           // $res
        ]);
         }
        
        else
        {
            return response([
                'error'=>$user
            ],422);
        }
    }
    public function logout(Request $request){
        $user=$request->user();
    }
}
