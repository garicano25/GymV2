@extends('layout.main')

@section('content')

<!-- Start: Tablas -->
<div class="row">
    <div class="col-xl-6 col-sm-12 d-flex align-items-center">

        <h3 class="mt-4 me-3">Lista de clientes totales</h3>

        <button type="button" class="btn btn-primary position-relative mt-4" data-bs-toggle="modal" data-bs-target="#ModalPagoPendientes" title="Visualize los pagos pendientes por confirmar">
            Pagos...
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="pagos_sin_confirma">

            </span>
        </button>
        <button type="button" class="btn btn-success position-relative mt-4" style="margin-left: 20px!important;" data-bs-toggle="modal" data-bs-target="#modalPagoVisita" title="Realize pago de una visita">
            Visitas
        </button>
    </div>

    <div class="col-xl-6 col-sm-12">

        <button type="button" class="btn btn-warning me-2 mt-4 mx-auto text-lg-end justify-content-center d-flex btnGuardar" style="margin-bottom: 4px;" data-bs-toggle="modal" data-bs-target="#ModalBusquedaAsistencias" title="Realize una busqueda de asistencias">
            Registros de asistencias
        </button>

    </div>
</div>
<div class="card mb-4 shadow mt-2 ">

    <div class="card-body">
        <table id="TablaUsuarios" class="table table-hover bg-white table-bordered text-center w-100">

        </table>

    </div>
</div>

<!-- End: Tablas -->

<!-- Star: Modal -->

<!-- Modal: Busqueda de asistencia -->
<div class="modal fade " id="ModalBusquedaAsistencias" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl  modal-dialog-scrollable">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class='bx bx-search-alt bx-fw'></i>Realice una búsqueda de registros de asistencias</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="card mb-4 shadow">
                    <div class="card-header " style="background: #F9E79F;">
                        <div class="row">
                            <div class="col-4">
                                <i class="fas fa-table me-1"></i>
                                <strong>Asistencias</strong>
                            </div>
                            <div class="col-8">
                                <div class="d-flex align-items-center">

                                    <input type="date" class="form-control input-form" name="fechaRegistroAsistencias" required id="fechaRegistroAsistencias" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Filtra las asistencias por una fecha en especifico">

                                    <input class="form-check-input" type="checkbox" value="" id="checkRegistroAsistencias" style="margin: 8px">
                                    <label class="form-check-label" for="checkRegistroAsistencias" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Muestra todas las asistencias de este mes">
                                        Todos
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <table id="TablaRegistroAsistencias" class="table table-hover bg-white table-bordered text-center w-100">

                        </table>
                    </div>
                </div>


            </div>
        </div>
    </div>
</div>

<!-- Modal: Editar Usuario -->
<div class="modal fade " id="modalEditarUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edicion del usuario : <span id="nombreUsuario"></span><i class='bx-fw bx bxs-user'></i></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editarUser">
                    <input type="hidden" id="id_usuario">
                    <span>Nombre completo:</span>
                    <input type="text" class="form-control" id="nombre_completo" name="nombre_completo">
                    <br>
                    <span>Correo:</span>
                    <input type="email" class="form-control" id="correo" name="correo">
                    <br>
                    <span>Monto a pagar:</span>
                    <input type="number" class="form-control" id="monto_pago" name="monto_pago" min="0">
                    <br>
                    <span>Inicio de inscripción:</span>
                    <input type="date" class="form-control" id="inicio_mes" name="inicio_mes">
                    <br>
                    <span>Fin de inscripción:</span>
                    <input type="date" class="form-control" id="fin_mes" name="fin_mes">
                    <br>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button class="btn btn-success" id="btnEditar" onclick="ActualizarUsuario()">Guardar cambios</button>

            </div>
        </div>
    </div>
</div>

<!-- Modal: Pago Membresia -->
<div class="modal fade " id="modalPagoUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class='bx bx-dollar' title="Pagar"></i>Realizar pago de : <span id="nombreUsuarioPago"></span><i class='bx-fw bx bxs-user'></i></h1>
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <form id="formPago">

                    <input type="hidden" id="id_usuario_pago" name="id_usuario_pago">
                    <input type="hidden" id="usuario" name="usuario">

                    <div class="row g-2 mb-3">
                        <div class="col-md">
                            <p class="fw-bold mb-2">Datos del pago:</p>
                            <span>Para realizar algún cambio del pago, edite la información del usuario</span>
                            <div class="form-floating mb-1 mt-3">
                                <input type="date" class="form-control" id="fin_mes_pago" name="fin_mes_pago" readonly>
                                <label for="fin_mes_pago">Fecha de pago</label>

                            </div>
                            <div class="form-floating mb-2">
                                <select class="form-select" id="tipo_pago_user" name="tipo_pago" aria-label="Floating label select example">
                                    <option selected disabled>Seleccione una opción...</option>
                                    <option value="EFECTIVO">Efectivo</option>
                                    <option value="TRANSFERENCIA">Transferencia</option>
                                </select>
                                <label for="tipo_pago_user">Metódo de pago</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="montoPago" name="montoPago">
                                <label for="montoPago">Total a pagar :</label>
                            </div>
                            <div class="form-floating mb-2">
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
                                <label for="tiempo_pago">Tiempo de inscripción</label>

                            </div>
                            <div id="comprobante" style="display: none;">

                                <div class="form-floating mb-1 mt-">
                                    <input type="date" class="form-control" id="vencimiento" name="vencimiento" readonly>
                                    <label for="vencimiento">Proxima fecha de pago</label>
                                </div>
                                <div class="form-floating mb-1">
                                    <input type="email" class="form-control" id="correo_comprobante" name="correo_comprobante">
                                    <label for="correo" require>Correo :</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="responsable" name="responsable" require>
                                    <label for="montoPago">Atendido por:</label>
                                </div>

                            </div>
                        </div>
                    </div>

                    <hr>

                    <div id="contrasenia">

                        <p class="mb-3 fw-bold"><i style="color: red;">*</i>Por favor ingrese su contraseña para confirmar el pago</p>

                        <input type="password" id="passAdmin" name="passAdmin" class="form-control" placeholder="Contraseña de administrador" required>

                    </div>


                    <div class="col-12 text-center mt-4">

                        <input type="submit" class="btn btn-success" id="enviarComprobante" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Enviara el coprobante de pago" style="display: none;" disabled value="Imprimir y Enviar Comprobante">

                    </div>

                </form>

                <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

                <script type="text/javascript">
                    emailjs.init('8-oYV9jZZzRK9tZHC')
                </script>

            </div>

            <div class="modal-footer blockPago">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>


                <button type="button" class="btn btn-success" id="realizarPago" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Realizar pago" onclick="realizarPago()" disabled>Realizar Pago</button>

            </div>
        </div>
    </div>
</div>

<!-- Modal: Pagos pendientes por confirmar -->
<div class="modal fade" id="ModalPagoPendientes" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                    <i class='bx bx-stopwatch bx-fw'></i>
                    Pagos pendientes por confirmar
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table id="TablaPagosSinConfirmar" class="table table-hover bg-white table-bordered text-center w-100">

                </table>


            </div>
        </div>
    </div>
</div>


<!-- Modal: Pago Visitas -->
<div class="modal fade " id="modalPagoVisita" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content p-3">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel"><i class='bx bx-dollar' title="Pagar"></i>Realizar pago de una Visita
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <form id="formPagoVisita">

                    <div class="row g-2 mb-3">
                        <div class="col-md">
                            <p class="fw-bold mb-0">Datos del pago:</p>

                            <div class="form-floating mb-3 mt-3">
                                <input type="date" class="form-control" id="fecha_pago_visita" name="fecha_pago_visita" readonly>
                                <label for="fecha_pago_visita">Fecha de pago</label>

                            </div>
                            <div class="form-floating mb-2">
                                <select class="form-select" id="tipo_pago_visita" name="tipo_pago_visita" aria-label="Floating label select example">
                                    <option disabled>Seleccione una opción...</option>
                                    <option value="EFECTIVO">Efectivo</option>
                                    <option value="TRANSFERENCIA">Transferencia</option>
                                </select>
                                <label for="tipo_pago_visita">Metódo de pago</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="totalPagoVisita" name="totalPagoVisita" min="0" required>
                                <label for="totalPagoVisita">Total a pagar :</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="nombreVisita" name="nombreVisita" require>
                                <label for="nombreVisita">Nombre:</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="atendidoPorVisita" name="atendidoPorVisita" require>
                                <label for="atendidoPorVisita">Atendido por:</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer blockPago">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>


                <button type="button" class="btn btn-success" id="realizarPagoVisita" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Realizar pago">Realizar Pago</button>

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

<script src="{{ asset('js/cliente/list.js') }}"></script>
<script src="{{ asset('js/lightbox.js') }}"></script>


@endsection