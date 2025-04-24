@extends('layout.main')

@section('content')

<!-- Start: Tablas -->
<div id="row" class="row flex justify-content-between">
    <div class="col-6">
        <h2 class="mt-4">Relación y Creación de Vistas - Usuarios</h2>
    </div>
    <div class="col-6">
        <div class="row ">
            <div class="col-2">
                <button class="btn btn-warning me-2 mt-4 mx-auto text-lg-end  btnGuardar" data-bs-target="#modalCreateView" data-bs-toggle="modal" title="Crear vista" style="margin-bottom: 4px;">Crear vista</button>
            </div>
            <div class="col-6">
                <button class="btn btn-warning me-2 mt-4 mx-auto text-lg-end btnGuardar" data-bs-target="#modalRelView" data-bs-toggle="modal" title="Relacionar Vistas - Gym" style="margin-bottom: 4px;">Relacionar vista</button>
            </div>
        </div>
    </div>
</div>


<div class="row">
    <div class="col-6">
        <div class="card mb-3 mt-4 shadow">
            <div class="card-body">
                <table id="TablaViews" class="w-100 table table-hover bg-white table-bordered"></table>
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="card mb-3 mt-4 shadow">
            <div class="card-body">
                <table id="TablaViewGym" class="w-100 table table-hover bg-white table-bordered"></table>
            </div>
        </div>
    </div>
</div>


<!-- End: Tablas -->

<!-- Star: Modal -->

<!-- Modal: Crear View -->
<div class="modal fade " id="modalCreateView" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class='bx-fw bx bxs-user-plus'></i>Crear vista</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formView">
                    {{ csrf_field() }}
                    <input type="hidden" id="id" name="id" value="0">
                    <div class="row">
                        <div class="col-12 mb-2">
                            <span><i style="color: red;">*</i> Nombre </span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="text" class="form-control" id="nombre" name="nombre" required>
                        </div>
                        <div class="col-12 mb-2">
                            <span><i style="color: red;">*</i> Descripcion:</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="text" class="form-control" id="descripcion" name="descripcion">
                        </div>
                        <div class="col-6 mb-2">
                            <span><i style="color: red;">*</i> Ruta </span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="text" class="form-control" id="ruta" name="ruta" required>
                        </div>
                        <div class="col-6 mb-2">
                            <span><i style="color: red;">*</i> Icono</span><b><span class="m-0" style="color: red;"></span></b>
                            <input type="text" class="form-control" id="icono" name="icono" required>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-success" id="btnCrearView" type="button">Guardar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal: Crear relacion View - Gym (Usuarios) -->
<div class="modal fade " id="modalRelView" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Relacionar vistas</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formUserView">
                    {{ csrf_field() }}
                    <div class="row">
                        <div class="col-12 mb-2">
                            <span><i style="color: red;">*</i> Usuario - Gym </span><b><span class="m-0" style="color: red;"></span></b>
                            <select class="form-select mt-2 mb-4" id="gym_id" name="gym_id" required>
                                <option selected value="ninguna">Seleccione un usuario...</option>
                                @foreach($users as $user)
                                <option value="{{ $user->id }}">{{ $user->username }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-12 mb-2">
                            <span><i style="color: red;">*</i> Vistas:</span><b><span class="m-0" style="color: red;"></span></b>
                            <div class="row mt-3">
                                @foreach($pages as $view)
                                <div class="col-3 mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input view" type="checkbox" name="views[]" value="{{ $view->id }}" id="view_{{ $view->id }}">
                                        <label class="form-check-label" for="view_{{ $view->id }}">
                                            {{ $view->nombre }}
                                        </label>
                                    </div>
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-success" id="btnCrearRel" type="button">Guardar</button>
            </div>
        </div>
    </div>
</div>

<!-- End: Modal -->

@endsection

<!-- Anexar JS Custom  -->
@section('scripts')

<script src="{{ asset('js/gym/main-views.js') }}"></script>

@endsection