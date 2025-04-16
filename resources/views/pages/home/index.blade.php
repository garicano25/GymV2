@extends('layout.main')

@section('content')


<div class="row">

    <div class="col-6">

        <h1 class="mt-4">Información General</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">Registros de asistencias, Suscripciones totales, Ingresos diarios, Asistencias, Cortes de Caja, Etc.</li>
        </ol>

    </div>
    <div class="col-6">

        <button type="button" class="btn btn-warning me-2 mt-4 mx-auto text-lg-end justify-content-center d-flex btnGuardar btn-lg" style="margin-bottom: 4px;" data-bs-toggle="modal" data-bs-target="#ModalCorteCaja" title="Realize un corte de caja">
            Corte de caja
        </button>
    </div>
</div>
<!-- Informaciones -->
<div class="row">
    <div class="col-xl-3 col-md-6">
        <div class="card bg-primary text-white mb-4 shadow" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Hombres totales en el GYM">
            <div class="card-body">Hombres totales</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <span class="text-white stretched-link" id="hombre"></span>
                <div class="text-white"><i class="fa-solid fa-person" style="color: #ffff;"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card bg-warning text-white mb-4 shadow" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Mujeres totales en el GYM">
            <div class="card-body">Mujeres totales</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <span class="text-white stretched-link" id="mujer"></span>
                <div class="text-white"><i class="fa-solid fa-person-dress" style="color: #f415cb;"></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card bg-success text-white mb-4 shadow" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Suma de los totales de pagos y ventas del día de hoy">
            <div class="card-body">Total diario</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <span class="text-white stretched-link" id="total"></span>
                <div class="text-white"><i class='bx bx-fw bx-dollar-circle'></i></div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6">
        <div class="card bg-danger text-white mb-4 shadow" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Asistencias totales del día de hoy">
            <div class="card-body">Asistencias: <span id="asistencia"></span></div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a class="text-white stretched-link" href="index.php?vista=User/Lista">Ver</a>
                <div class="text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </div>
</div>



<!-- Graficas -->
<div class="row">
    <div class="col-xl-6">
        <div class="card mb-4 shadow">
            <div class="card-header">
                <i class="fas fa-chart-area me-1"></i>
                Registro de asistencia diarias
            </div>
            <div class="card-body"><canvas id="graficaAsistencias" width="100%" height="60"></canvas></div>
        </div>
    </div>
    <div class="col-xl-6">
        <div class="card mb-4 shadow">
            <div class="card-header">
                <i class="fas fa-chart-bar me-1"></i>
                Subcripciones totales del <span id="año"></span>
            </div>
            <div class="card-body"><canvas id="graficasUserTotales" width="100%" height="60"></canvas></div>
        </div>
    </div>
</div>

<!-- Modal Corte de Caja -->
<div class="modal fade" id="ModalCorteCaja" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                    <i class='bx bxs-box'></i>
                    Realice un corte de caja
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-8">
                        <div class="row">
                            <h1>Detalles del corte</h1>
                        </div>
                        <div class="row">
                            <form class="p-3" id="formCorte">
                                <div class="row">

                                    <div class="row">
                                        <div class="col-6">
                                            <span><i style="color: red;">*</i>Fecha de corte</span>
                                            <input type="date" class="form-control mb-4 mt-2" name="fecha_corte" id="fecha_corte" required>
                                        </div>
                                        <div class="col-6">
                                            <span><i style="color: red;">*</i>Hora del corte</span>
                                            <input type="time" class="form-control mb-4 mt-2" name="hora_corte" id="hora_corte" required>
                                        </div>
                                    </div>


                                    <div class="row">

                                        <div class="row">
                                            <div class="col-8">

                                                <span><i style="color: red;">*</i>Total de pagos de mensualidades</span>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text">$</span>
                                                    <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" name="total_pagos" id="total_pagos" required>
                                                    <span class="input-group-text">.00 pesos</span>
                                                </div>

                                            </div>
                                            <div class="col-4">
                                                <span>Pagos realizados:</span><br>
                                                <a href="index.php?vista=Pagos/index" class="btn btn-outline-danger" id="pagos"></a>
                                            </div>
                                        </div>


                                        <div class="row">
                                            <div class="col-8">

                                                <span><i style="color: red;">*</i>Total de ventas</span>
                                                <div class="input-group mb-3">
                                                    <span class="input-group-text">$</span>
                                                    <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" name="total_ventas" id="total_ventas" required>
                                                    <span class="input-group-text">.00 pesos</span>
                                                </div>

                                            </div>
                                            <div class="col-4">
                                                <span>Productos vendidos:</span><br>
                                                <a href="index.php?vista=Ventas/index" class="btn btn-outline-danger" id="ventas"></a>
                                            </div>
                                        </div>


                                        <span><i style="color: red;">*</i>Registrado por:</span><b><span id="obligatorio" class="m-0" style="color: red;"></span></b>
                                        <input type="text" class="form-control mb-4 mt-2" placeholder="Nombre de quien realiza el corte de caja" name="registrado_por" id="registrado_por" required>


                                        <input id="cerrarCaja" class="btn btn-success w-50 mt-4 p-2 d-flex mx-auto text-lg-end justify-content-center btnGuardar" type="submit" value="Cerar caja">

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-4">
                        <table id="TablaHistorialCorte" class="table table-hover bg-white table-bordered text-center w-100">


                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>




@endsection


<!-- Anexar JS Custom  -->
@section('scripts')

    <script src="{{ asset('js/home/index.js') }}"></script>

@endsection