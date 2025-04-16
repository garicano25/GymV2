@extends('layout.main')

@section('content')

<!-- Start: Tablas -->

<form id="formVenta">
    <div class="row mb-2 mt-2">
        <div class="col-8">
            <h2 class="mt-4 text-center"><i class='bx bxs-store bx-fw'></i>Registro de ventas<span id="fechaActual"></span></h2>
            <div class="row mt-2">
                <div class="col-6">
                    <span><i style="color: red;">*</i>Clave del producto</span>
                    <input type="number" name="clave_producto" id="clave_producto" placeholder="Ingrese la clave del producto" class="form-control mt-1 mb-4 clave" autofocus required min="1">
                </div>
                <div class="col-6">
                    <span><i style="color: red;">*</i>Productos vendidos</span>
                    <input type="number" name="cantidad_productos" id="cantidad_productos" placeholder="Productos vendidos" class="form-control mt-1 mb-4 clave" required min="1" value="1">
                </div>
            </div>

            <button class="btn btn-success w-50 p-2 d-flex mx-auto text-lg-end justify-content-center btnGuardar " id="btnRegistrarVenta">Registar venta</button>
        </div>
        <div class="col-4">
            <img src="{{ asset('img/VALROSS3.jpg') }}" alt="VAL-ROSS" width="200px" class="img">
        </div>
    </div>
</form>


<div class="card mb-4 mt-5 shadow">
    <div class="card-header " style="background: #F9E79F;">
        <div class="row">
            <div class="col-4">
                <i class="fas fa-table me-1"></i>
                <strong id="total_vendido"></strong>
            </div>
            <div class="col-8">
                <div class="d-flex align-items-center">

                    <input type="date" class="form-control input-form" name="fechaRegistroVentas" required id="fechaRegistroVentas" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Filtra las ventas por una fecha en especifico">

                    <input class="form-check-input" type="checkbox" value="" id="checkRegistroVentas" style="margin: 8px">
                    <label class="form-check-label" for="checkRegistroVentas" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Muestra todas las ventas de este mes">
                        Todos
                    </label>
                </div>
            </div>
        </div>

    </div>
    <div class="card-body">
        <table id="TablaVentas" class="table table-hover bg-white table-bordered text-center w-100">

        </table>
    </div>
</div>

<!-- End: Tablas -->

<!-- Star: Modal -->
<!-- End: Modal -->

@endsection

<!-- Anexar JS Custom  -->
@section('scripts')

<!-- Funciones adicionales de DataTable -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.html5.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.4.2/js/buttons.print.min.js"></script>

<script src="{{ asset('js/registroHub/ventas.js') }}"></script>

@endsection