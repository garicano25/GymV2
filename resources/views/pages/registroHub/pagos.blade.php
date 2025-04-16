@extends('layout.main')

@section('content')

<!-- Start: Tablas -->
<div class="row ">
    <div class="col-6 mt-3">
        <h1 class="mt-2 text-center"><i class='bx bx-dollar bx-fw'></i>Registro de pagos</h1>
        <p id="fechaActual" class="mt-3 display-4 text-center "></p>
    </div>

    <div class="col-6 mt-3 mb-3">
        <img src="{{ asset('img/VALROSS2.png') }}" alt="VAL-ROSS" width="200px" class="imgPago">
    </div>

</div>


<div class="card mb-4 mt-5 shadow">
    <div class="card-header" style="background: #ABEBC6;">
        <div class="row">
            <div class="col-4">
                <i class='bx bx-dollar bx-fw'></i>
                <strong id="total_vendido"></strong>
            </div>

            <div class="col-8">
                <div class="d-flex align-items-center">

                    <input type="date" class="form-control input-form" name="fechaRegistroPagos" required id="fechaRegistroPagos" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Filtra los pagos por una fecha en especifico">

                    <input class="form-check-input" type="checkbox" value="" id="checkRegistroPagos" style="margin: 8px">
                    <label class="form-check-label" for="checkRegistroPagos" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Muestra todos los pagos de este mes">
                        Todos
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body">
        <table id="TablaPagos" class="table table-hover bg-white table-bordered text-center w-100">

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

<script src="{{ asset('js/registroHub/pagos.js') }}"></script>

@endsection