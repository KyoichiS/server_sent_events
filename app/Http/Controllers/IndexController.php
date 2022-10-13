<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use App\Jobs\HeavyTaskJob;
use App\Http\Requests\TopRequest;

class IndexController extends Controller
{
    //
    public function index(){
        Log::info("IndexController:index");
        return view('index');
    }

    //
    public function execute(TopRequest $request){
        Log::info("IndexController:execute");

        $form_data = $request->all();
        //dd($request->input('textName'));
        Log::info("IndexController:execute" . $form_data["textName"]);

        //Initial(read files....)
        sleep(5);

        //send message  //execute Heavy Task
/*
        HeavyTaskJob::dispatch([
            "id" => 123,
            "phone_number" => 'xxx-xxxx-xxxx',
        ]);
*/

        return view('error');
    }
}


