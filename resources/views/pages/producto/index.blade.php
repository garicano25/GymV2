@extends('layout.main')

@section('content')

<!-- Start: Tablas -->
<div id="row" class="row">
    <div class="col-6">
        <h1 class="mt-4">Lista de productos totales</h1>
    </div>
    <div class="col-6">
        <button class="btn btn-success me-2 mt-4 mx-auto text-lg-end justify-content-center d-flex btnGuardar" data-bs-target="#modalAgregarProducto" data-bs-toggle="modal" title="Agregar" style="margin-bottom: 4px;"><i class='bx bx-plus'></i>Agregar Producto</button>

    </div>
</div>
<div class="card mb-3 mt-4 shadow">

    <div class="card-body">
        <table id="TablaProductos" class="w-100 table table-hover bg-white table-bordered text-center">

        </table>
    </div>
</div>

<!-- End: Tablas -->

<!-- Star: Modal -->

<!-- Modal: Crear Producto -->
<div class="modal fade " id="modalAgregarProducto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crear producto</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formProducto">
                    {{ csrf_field() }}
                    <span><i style="color: red;">*</i> Nombre del producto:</span><b><span class="m-0" style="color: red;"></span></b>
                    <input type="text" class="form-control" name="nombre" required>
                    <br>
                    <span><i style="color: red;">*</i>Precio unitario:</span><b><span class="m-0" style="color: red;"></span></b>
                    <input type="number" class="form-control negativo" name="precio" placeholder="$ 00.00" min="0" required>
                    <br>
                    <span><i style="color: red;">*</i>Productos totales:</span><b><span class="m-0" style="color: red;"></span></b>
                    <input type="number" class="form-control negativo" name="cantidad" min="0" required>
                    <br>
                    <div class="row">
                        <span><i style="color: red;">*</i>Clave del producto</span>
                        <div class="col-9">
                            <input type="number" class="form-control mb-4 mt-2" placeholder="Esta clave te servira para agregar el producta a tus registros de ventas" name="clave" id="clave_producto" readonly required>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-outline-danger mt-2" id="generarClave" type="button">Generar clave</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-success" id="btnCrearProducto" type="button">Añadir producto</button>

            </div>
        </div>
    </div>
</div>



<!-- Modal: Editar Producto -->
<div class="modal fade " id="modalEditarProducto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edicion del producto : <span id="nombreProducto"></span><i class='bx bx-purchase-tag-alt bx-fw'></i></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editarProducto">
                    {{ csrf_field() }}
                    <input type="hidden" id="id" name="id">
                    <span>Nombre del producto:</span>
                    <input type="text" class="form-control" id="nombre" name="nombre" required>
                    <br>
                    <span>Precio unitario:</span>
                    <input type="number" class="form-control negativo" id="precio" name="precio" min="0" required>
                    <br>
                    <span>Productos agregados:</span>
                    <input type="number" class="form-control negativo" id="productos_agregados" name="productos_agregados" value="0" min="0" required>
                    <br>
                    <span>Productos existentes:</span>
                    <input type="number" class="form-control negativo" id="productos_cantidad" name="productos_cantidad" readonly>
                    <br>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-success" id="btnEditar">Guardar cambios</button>

            </div>
        </div>
    </div>
</div>

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

<script src="{{ asset('js/producto/index.js') }}"></script>

@endsection