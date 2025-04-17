@extends('layout.main')

@section('content')

<!-- Start: Tablas -->
<div id="row" class="row">
    <div class="col-6">
        <h1 class="mt-4">Lista de Usarios (Gym)</h1>
    </div>
    <div class="col-6">
        <button class="btn btn-success me-2 mt-4 mx-auto text-lg-end justify-content-center d-flex btnGuardar" data-bs-target="#modalCreateUser" data-bs-toggle="modal" title="Crear usuario" style="margin-bottom: 4px;"><i class='bx bx-plus'></i>Agregar Producto</button>

    </div>
</div>
<div class="card mb-3 mt-4 shadow">

    <div class="card-body">
        <table id="TablaUsuarios" class="w-100 table table-hover bg-white table-bordered text-center">

        </table>
    </div>
</div>

<!-- End: Tablas -->

<!-- Star: Modal -->

<!-- Modal: Crear Gym (Usuarios) -->
<div class="modal fade " id="modalCreateUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class='bx-fw bx bxs-user-plus'></i>Crear usuario</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formUser">
                    {{ csrf_field() }}
                    <input type="hidden" id="id" name="id" value="0">
                    <div class="row">
                        <div class="col-6 mb-2">
                            <span><i style="color: red;">*</i> Username </span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="text" class="form-control" id="username" name="username" required>
                        </div>
                        <div class="col-6 mb-2">
                            <span><i style="color: red;">*</i> Password:</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="text" class="form-control" id="password" name="password" >
                        </div>
                        <div class="col-6 mb-2">
                            <span><i style="color: red;">*</i> Direccion </span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="text" class="form-control" id="dirreccion" name="dirreccion" required>
                        </div>
                        <div class="col-6 mb-2">
                            <span><i style="color: red;">*</i> Telefono</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="text" class="form-control" id="telefono" name="telefono" required>
                        </div>
                        <div class="col-3 mb-2">
                            <span class="form-label"><i style="color: red;">*</i> Color primario</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="color" class="form-control form-control-color" id="color_primario" name="color_primario" value="#563d7c" title="Color primario">
                        </div>
                        <div class="col-3 mb-2">
                            <span class="form-label"><i style="color: red;">*</i> Color secundario</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="color" class="form-control form-control-color" id="color_secundario" name="color_secundario" value="#563d7c" title="Color primario">
                        </div>
                        <div class="col-6 mb-2">
                            <span><i style="color: red;">*</i> Pago mensual</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="number" class="form-control" id="pago_mensual" name="pago_mensual" required>
                        </div>
                        <div class="col-6 mb-2">
                            <span> Fecha inicio renta</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="date" class="form-control" id="fecha_pago_inicio" name="fecha_pago_inicio">
                        </div>
                        <div class="col-6 mb-2">
                            <span> Fecha fin renta</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="date" class="form-control" id="fecha_pago_fin" name="fecha_pago_fin">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-success" id="btnCrearUser" type="button">Guardar</button>
            </div>
        </div>
    </div>
</div>

<!-- End: Modal -->

@endsection

<!-- Anexar JS Custom  -->
@section('scripts')

<script src="{{ asset('js/gym/index.js') }}"></script>

@endsection