<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use DateTime;
use DateTimeZone;
use App\Http\Requests\SseRequest;

class SseController extends Controller
{
    //
    public function getProgress(Request $req){
        $requestid = $req->input('requestid');
        Log::debug("SseController::getProgress[" . $requestid . "]");
        /*
        $ary = [
                 ['name' => 'john'],
                 ['age' => (new DateTime('now', new DateTimeZone('Asia/Tokyo')))->format('H:i:s')]
               ];
        return response()->json($ary);
        sleep(5);
        */

        $count = 0;
        $progress_message = "";
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-store');
        while(true) {
            switch($count){
                case 1:
                    $progress_message = '初期化１' . "[" . $requestid . "]";
                    break;
                case 2:
                    $progress_message = '処理時間計算中2' . "[" . $requestid . "]";
                    break;
                case 3:
                    $progress_message = 'ファイル作成中3' . "[" . $requestid . "]";
                    break;
                case 4:
                    $progress_message = 'ファイル作成中4' . "[" . $requestid . "]";
                    break;
                case 5:
                    $progress_message = '処理完了5' . "[" . $requestid . "]";
                    break;
                default:
                    //$progress_message = '';
                    break;
            }

            printf("data: %s\n\n", json_encode([
                'time' => (new DateTime('now', new DateTimeZone('Asia/Tokyo')))->format('H:i:s'),
                'word' => $progress_message
            ],JSON_UNESCAPED_UNICODE));
            if (ob_get_contents()) ob_end_clean();
            flush();
            sleep(2);

            if ( $count >= 5){
                Log::debug("SseController::getProgress:end 204");
                http_response_code(204); //ClientのListenを終了させる //https://ja.javascript.info/server-sent-events //https://kaworu.jpn.org/kaworu/2013-05-09-1.php
                //ignore_user_abort(false);
                break;
            }
            $count++;
        }
    }
}
