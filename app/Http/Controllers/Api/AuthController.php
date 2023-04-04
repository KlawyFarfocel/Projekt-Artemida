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

        return($request);
    }
    public function logout(Request $request){
        $user=$request->user();
    }
}
