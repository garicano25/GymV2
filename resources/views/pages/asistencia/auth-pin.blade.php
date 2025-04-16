<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GYM VAL_ROSS</title>
    <link rel="stylesheet" href="{{ asset('css/asistencias.css') }}">
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap5.min.css" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body class="asistencias">
    <div class="container-fluid">
        <div class="row">
            <div class="box mb-2">
                <span class="borderLine"></span>
                <form id="formularioAsistencia">
                    <div class="row mb-2 ">
                        <div class="col-8">
                            <h2 class="mt-2 text-center neon"><i class='bx-fw bx bxs-user bx-tada'></i>Asistencia general<span id="fechaActual"></span></h2>
                            <b>
                                <p id="obligatorio" class="m-0" style="color: red; font-size: 25px; text-align : center"></p>
                            </b>

                            <input type="number" placeholder="Ingresa tu clave de acceso " class="form-control mt-4 mb-4 clave text-center fw-bold" style="font-size: 35px;" name="clave_registro" id="clave_registro" require autofocus>

                            <button class="btn btnAsistencia w-50 mt-4 p-2 d-flex mx-auto text-lg-end justify-content-center btn-outline-danger" id="registrar" type="button" disabled>Registrarme

                            </button>

                        </div>
                        <div class="col-4">
                            <img src="{{ asset('img/VALROSS4.png') }}" alt="VAL-ROSS" class="imgAsistencia">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <table id="TablaAsistencia" class="w-100 table text-center">

            </table>

        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>

    <script src="{{ asset('js/asistencia/auth-pin.js') }}"></script>

</body>

</html>