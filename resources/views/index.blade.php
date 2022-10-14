<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}" rel="stylesheet">

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="{{ asset('js/sse2.js') }}" defer></script>
    </head>
    <body>
        <div id="spinner" class="spinner hidden"></div>
        <form method="POST" id="frmInput" action="/" enctype="multipart/form-data" >
            @csrf
            <input type="text" id="textName" name="textName" class="m-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5" placeholder="John">
            <div>
                <button id='btnStart' class="m-5 bg-red-600 hover:bg-red-500 text-white rounded px-4 py-2">START</button>
                <!-- <input type="submit" class="m-5 bg-red-600 hover:bg-red-500 text-white rounded px-4 py-2" value="START"/> -->
            </div>
        </form>
        <div>
            <button id='btnStop' class="m-5 bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2">STOP</button>
        </div>
        <input type="text" id="txtServerMessage" class="m-5 border-1 w-screen" value="初期状態"/>
    </body>
</html>
