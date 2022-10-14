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
        Log::info("IndexController:execute [" . $form_data["textName"] . "]");

        //Initial(read files....)
        sleep(3);

        //throw new Exception('500 error');

        //send message  //execute Heavy Task
        $uniqid = uniqid();
        HeavyTaskJob::dispatch([
            "id" => $uniqid,
            "text" => $form_data["textName"]
        ]);

        echo $uniqid;
    }
}


