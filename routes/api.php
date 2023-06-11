<?php

use App\Http\Controllers\ContentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout']);
Route::post('/ogloszenie',[ContentController::class,'ogloszenie']);
Route::post("/userData",[ContentController::class,'userData']);
Route::post("/changeUserData",[ContentController::class,'changeUserData']);
Route::post("/showDonate",[ContentController::class,'showDonate']);
Route::post("/showPermissions",[ContentController::class,'showPermissions']);
Route::post("/getStatsSelect",[ContentController::class,'getStatsSelect']);
Route::post("/getStats",[ContentController::class,'getStats']);
Route::post("/changeStatsView",[ContentController::class,'changeStatsView']);
Route::post("/addNewUser",[ContentController::class,'addNewUser']);
Route::post("/getInformationOnPageLoad",[ContentController::class,'getInformationOnPageLoad']);
Route::post("/AddExistingUserToClub",[ContentController::class,'AddExistingUserToClub']);
Route::post("/showSkarbnikDonate",[ContentController::class,'showSkarbnikDonate']);
Route::post("/EditDonate",[ContentController::class,'EditDonate']);
Route::post("/DeleteDonate",[ContentController::class,'DeleteDonate']);
Route::post("/showPermissionRequest",[ContentController::class,'showPermissionRequest']);
Route::post("/GetActiveHunts",[ContentController::class,'GetActiveHunts']);
Route::post("/GetCurrentHunt",[ContentController::class,'GetCurrentHunt']);
Route::post("/EditHunt",[ContentController::class,'EditHunt']);
Route::post("/AddHunt",[ContentController::class,'AddHunt']);
Route::post("/DeleteHunt",[ContentController::class,'DeleteHunt']);
Route::post("/ChangeHuntParticipation",[ContentController::class,'ChangeHuntParticipation']);
Route::post("/CheckPrivileges",[ContentController::class,'CheckPrivileges']);
Route::post("/KickUserOutOfClub",[ContentController::class,'KickUserOutOfClub']);
Route::post("/AssignRanks",[ContentController::class,'AssignRanks']);
Route::post("/AddPermissionRequest",[ContentController::class,'AddPermissionRequest']);
Route::post("/GetUserDataInClub",[ContentController::class,'GetUserDataInClub']);
Route::post("/AddDonate",[ContentController::class,'AddDonate']);
Route::post("/GetAllHuntersFromClub",[ContentController::class,'GetAllHuntersFromClub']);
Route::post("/EndShootingEarly",[ContentController::class,'EndShootingEarly']);
Route::post("/AddShooting",[ContentController::class,'AddShooting']); 
Route::post("/GetOnlyMainSquadFromClub",[ContentController::class,'GetOnlyMainSquadFromClub']);
Route::post("/FilterDonate",[ContentController::class,'FilterDonate']);
Route::post("/SendAnno",[ContentController::class,'SendAnno']);
Route::post("/GetActiveHuntInfo",[ContentController::class,'GetActiveHuntInfo']);
Route::post("/SetNextMeeting",[ContentController::class,'SetNextMeeting']);
Route::post("/downloadCsv",[ContentController::class,'downloadCsv']);