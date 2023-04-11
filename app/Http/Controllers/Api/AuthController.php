<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Models\User;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        $credentials=$request->validated();
        // if(!Auth::attempt($credentials)){
        //     return response([
        //         'error' => "The provided ...",
        //     ],422);
        // }
        $token="123";
        return response([
            'token'=>$token
        ]);
        
    }
    public function logout(Request $request){
        $user=$request->user();
    }
}
