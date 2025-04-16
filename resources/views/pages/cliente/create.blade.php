@extends('layout.main')

@section('content')


<h1 class="mt-4 hola">Creación de usuarios</h1>
<ol class="breadcrumb mb-4">
    <li class="breadcrumb-item active">Crea un nuevo usuario</li>
</ol>

<div class="row">
    <div class="col-xl-12">
        <div class="card mb-4 shadow">
            <div class="card-header text-center">
                <i class='bx bxs-user-plus'></i> Creación de usuarios
            </div>
            <div class="card-body mt-2">
                <form class="p-3" id="formUsuario">
                    <div class="row">
                        <div class="col-8">
                            <div class="row">
                                <div class="col-8">
                                    <span><i style="color: red;">*</i> Nombre completo </span><b><span id="obligatorio" class="m-0" style="color: red;"></span></b>
                                    <input type="text" class="form-control mb-4 mt-2" placeholder="Nombre completo" name="nombre_completo" id="nombre_completo" required autofocus>
                                </div>

                                <div class="col-4">
                                    <span><i style="color: red;">*</i> Sexo </span><b><span id="obligatorio" class="m-0" style="color: red;"></span></b>

                                    <select class="form-select mt-2 mb-4" id="sexo" name="sexo">
                                        <option selected value="ninguna">Seleccione una opción...</option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                    </select>
                                </div>

                                <div class="col-12 mb-4">
                                    <span><i style="color: red;">*</i>Tiempo de inscripción</span>
                                    <select class="form-select mt-2" id="tiempo_pago" name="tiempo_pago" aria-label="Floating label select example" required>
                                        <option selected disabled>Seleccione una opción...</option>
                                        <option value="SEMANA">Semana</option>
                                        <option value="QUINCENA">Quincena</option>
                                        <option value="MES">Mes</option>
                                        <option value="BIMESTRE">Bimestre</option>
                                        <option value="TRIMESTRE">Trimestre</option>
                                        <option value="SEMESTRE">Semestre</option>
                                        <option value="ANUALIDAD">Anualidad</option>

                                    </select>
                                </div>
                                <div class="col-6">
                                    <span><i style="color: red;">*</i>Inicio de mensualidad</span>
                                    <input type="date" class="form-control mb-4 mt-2" name="inicio_mes" id="inicio_mes" required readonly>
                                </div>
                                <div class="col-6">
                                    <span><i style="color: red;">*</i>Fin de mensualidad</span>
                                    <input type="date" class="form-control mb-4 mt-2" name="fin_mes" id="fin_mes" required readonly>
                                </div>

                                <div class="col-6 mb-4">
                                    <span><i style="color: red;">*</i>Tipo de pago</span>
                                    <select class="form-select mt-2" id="tipo_pago" name="tipo_pago" required>
                                        <option selected disabled>Seleccione una opción...</option>
                                        <option value="EFECTIVO">Efectivo</option>
                                        <option value="TRANSFERENCIA">Transferencia</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <span><i style="color: red;">*</i>Monto de pago</span>
                                    <input type="number" class="form-control mb-4 mt-2" placeholder="$$$" name="monto_pago" id="monto_pago" required>
                                </div>

                                <div class="col-12">
                                    <span> Correo electronico </span>
                                    <input type="text" class="form-control mb-4 mt-2" placeholder="Este correo servira para enviar los comprobantes de pago" name="correo" id="correo">
                                </div>
                            </div>
                        </div>


                        <div class="col-4">
                            <!-- Ingreso por Pin -->
                            <div class="row d-none" id="authPin">
                                <span><i style="color: red;">*</i>Clave de acceso</span>
                                <div class="col-12">
                                    <input type="hidden" class="form-control mb-4 mt-2" name="clave_acceso" id="clave_acceso" required maxlength="4" readonly>
                                </div>
                                <div class="col-12 w-100">
                                    <button class="btn btn-outline-danger mt-2 w-100" id="generarClave" type="button">Generar clave</button>
                                </div>
                                <div class="col-12 w-100 justify-content-center d-flex" style="margin-top: 70px;">
                                    <h1 id="textPin" style="font-size: 150px;"></h1>
                                </div>
                            </div>
                            <!-- Ingreso por Facial -->
                            <div class="row" id="authFace">
                                <span><i style="color: red;">*</i>Rostro</span>
                                <div class="col-12 w-100">
                                    <button class="btn btn-outline-danger mt-2 w-100" id="tomarFoto" type="button"><i class='bx-fw bx bxs-camera'></i>Tomar Foto</button>
                                </div>
                                <div class="col-12 w-100 justify-content-center d-flex" style="margin-top: 50px;">
                                    <img id="foto" src="{{ asset('img/VALROSS.png') }}" alt="Foto de rostro" style="width: 300px; height: 300px; border-radius: 10%; border: 2px solid #000;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <button id="guardar" class="btn btn-success w-50 mt-4 p-2 d-flex mx-auto text-lg-end justify-content-center btnGuardar">Guardar</button>

                </form>

            </div>
        </div>
    </div>
</div>




@endsection

<!-- Anexar JS Custom  -->
@section('scripts')

<script src="{{ asset('js/cliente/create.js') }}"></script>

@endsection