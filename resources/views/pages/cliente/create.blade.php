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
                    {{ csrf_field() }}
                    <div class="row">
                        <div class="col-8">
                            <div class="row">
                                <div class="col-8">
                                    <span><i style="color: red;">*</i> Nombre completo </span><b><span id="obligatorio" class="m-0" style="color: red;"></span></b>
                                    <input type="text" class="form-control mb-4 mt-2" placeholder="Nombre completo" name="nombre" id="nombre" required autofocus>
                                </div>

                                <div class="col-4">
                                    <span><i style="color: red;">*</i> Sexo </span><b><span id="obligatorio" class="m-0" style="color: red;"></span></b>

                                    <select class="form-select mt-2 mb-4" id="sexo" name="sexo" required>
                                        <option selected value="ninguna">Seleccione una opción...</option>
                                        <option value="F">Femenino</option>
                                        <option value="M">Masculino</option>
                                    </select>
                                </div>

                                <div class="col-12 mb-4">
                                    <span><i style="color: red;">*</i>Tiempo de inscripción</span>
                                    <select class="form-select mt-2" id="tiempo_membresia_id" name="tiempo_membresia_id" aria-label="Floating label select example" required>
                                        <option selected disabled>Seleccione una opción...</option>
                                        @foreach($tiempo_membresia as $tiempo)
                                        <option value="{{ $tiempo->id }}">{{ $tiempo->tiempo }}</option>
                                        @endforeach


                                    </select>
                                </div>
                                <div class="col-6">
                                    <span><i style="color: red;">*</i>Inicio de mensualidad</span>
                                    <input type="date" class="form-control mb-4 mt-2" name="inicio_membresia" id="inicio_membresia" required readonly>
                                </div>
                                <div class="col-6">
                                    <span><i style="color: red;">*</i>Fin de mensualidad</span>
                                    <input type="date" class="form-control mb-4 mt-2" name="fin_membresia" id="fin_membresia" required readonly>
                                </div>

                                <div class="col-6 mb-4">
                                    <span><i style="color: red;">*</i>Tipo de pago</span>
                                    <select class="form-select mt-2" id="tipo_pago_id" name="tipo_pago_id" required>
                                        <option selected disabled>Seleccione una opción...</option>

                                        @foreach($tipo_pago as $tipo)
                                        <option value="{{$tipo->id }}">{{$tipo->tipo }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-6">
                                    <span><i style="color: red;">*</i>Monto de pago</span>
                                    <input type="number" class="form-control mb-4 mt-2" placeholder="$$$" name="monto" id="monto" required>
                                </div>

                                <div class="col-12">
                                    <span> Correo electronico </span>
                                    <input type="text" class="form-control mb-4 mt-2" placeholder="Este correo servira para enviar los comprobantes de pago" name="correo" id="correo">
                                </div>
                            </div>
                        </div>


                        <div class="col-4">
                            <!-- Ingreso por Pin -->
                            <div class="row d-block" id="authPin">
                                <span><i style="color: red;">*</i>Clave de acceso</span>
                                <div class="col-12">
                                    <input type="hidden" class="form-control mb-4 mt-2" name="code_pin" id="code_pin" required maxlength="4" readonly>
                                </div>
                                <div class="col-12 w-100">
                                    <button class="btn btn-outline-danger mt-2 w-100" id="generarClave" type="button">Generar clave</button>
                                </div>
                                <div class="col-12 w-100 justify-content-center d-flex" style="margin-top: 70px;">
                                    <h1 id="textPin" style="font-size: 150px;"></h1>
                                </div>
                            </div>
                            <!-- Ingreso por Facial -->
                            <div class="row d-none" id="authFace">
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