<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>GYM VAL-ROSS</title>
    <link href="{{ asset('css/login.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">

</head>

<body>
    <div class="box">
        <span class="borderLine"></span>

        <form method="post" id="formIniciarSesion">
            {{ csrf_field() }}
            <h2>Inicio de sesión</h2>
            <br>
            <!-- <img src="../include/img/letras.png" alt=""> -->
            <div class="inputBox">
                <input type="text" name="username" id="user" required>
                <span>Username</span>
                <i></i>
            </div>
            <div class="inputBox">
                <input type="password" name="password" id="pass" required>
                <span>Contraseña</span>
                <i></i>
            </div>
            <input type="submit" value="Iniciar sesion" id="login">
            <br>
        </form>
    </div>


</body>

</html>


<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

<link href="{{ asset('css/login.css') }}" rel="stylesheet">
<script src="{{ asset('js/auth/login.js') }}"></script>