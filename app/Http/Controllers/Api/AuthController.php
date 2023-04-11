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
<<<<<<< HEAD
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
        
=======
        $request->validated();
        return($request);
>>>>>>> c29e9561e8e7b0ec15ea5f01aee50d7787f47dbf
    }
    public function logout(Request $request){
        $user=$request->user();
    }
}
