<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{ config('app.name') }}</title>
    <!-- Splash Screen/Loader Styles -->
    <link rel="stylesheet" type="text/css" href="{{ asset(mix('css/loader.css')) }}" />

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="<CLIENT-KEY>">
    </script>
</head>
<style>
    html,
    body {
        height: 100%;
        margin: 0;
    }

    #wrapper {
        min-height: 100%;
    }
</style>

<body>

    <div id="loading-bg">
        <div class="loading">
            <div class="effect-1 effects"></div>
            <div class="effect-2 effects"></div>
            <div class="effect-3 effects"></div>
        </div>
    </div>

    <div id="app"></div>
    <script src="{{ asset(mix('js/app.js')) }}"></script>
</body>

</html>
