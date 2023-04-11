<?php

namespace App\Http\Controllers\Api;

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
        if(!$user && !$credentials['password']== $user->password)
        {
            return response([
                'error'=>$user
            ],422);
        }
      //  $user=Auth::user();
        $token=$user->remember_token;

        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }
    public function logout(Request $request){
        $user=$request->user();
    }
}
