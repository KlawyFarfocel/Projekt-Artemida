<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContentController extends Controller
{
    public function ogloszenie(Request $request){
        $data=[
            [
                "Nadawca"=>"Hodowca bydła",
                "Temat"=>"Hodowla bydła",
                "Data wysłania"=>"27.06.2023r.",
                "Treść"=>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "Priorytet"=>"Niski"
            ],
            [
                "Nadawca"=>"Domino Jachaś",
                "Temat"=>"Hodowla bydła",
                "Data wysłania"=>"27.06.2023r.",
                "Treść"=>"Dupa Dupa Dupa",
                "Priorytet"=>"Wysoki"
            ],
        ];
        return response([
            $data
        ]);
    }
}
