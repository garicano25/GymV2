$.getScript("/js/funciones.js").done(function () {
    $(function () {
        recuperarPagosSinConfirmar();

        TablaUsuarios = $("#TablaUsuarios").DataTable({
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
            },
            lengthChange: true,
            lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, "All"],
            ],
            // dom: '<"top"i>rt<"bottom"flp><"clear">',
            info: false,
            paging: true,
            searching: true,
            filtering: true,
            scrollY: "65vh",
            scrollCollapse: true,
            dom: "lfrtipB",
            buttons: [
                {
                    extend: "excelHtml5",
                    text: '<i class="fas fa-file-excel"></i> ',
                    titleAttr: "Exportar a Excel",
                    className: "btn btn-success",
                    exportOptions: {
                        columns: ":visible",
                        modifier: {
                            selected: false,
                            columns: [5, 6],
                        },
                    },
                },
                {
                    extend: "pdfHtml5",
                    text: '<i class="fas fa-file-pdf"></i> ',
                    titleAttr: "Exportar a PDF",
                    className: "btn btn-danger",
                    customize: function (doc) {
                        // Oculta la columna en el índice 6 en el PDF
                        doc.content[1].table.body.forEach(function (row) {
                            row.splice(5, 2);
                        });
                    },
                    exportOptions: {
                        columns: ":visible",
                    },
                },
                // Puedes agregar más botones según tus necesidades
            ],
            ajax: {
                dataType: "json",
                data: { api: 2 },
                method: "POST",
                url: `${http}${servidor}/${appname}/api/usuarios_api.php`,
                beforeSend: function () {},
                complete: function () {
                    TablaUsuarios.columns.adjust().draw();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alertErrorAJAX(jqXHR, textStatus, errorThrown);
                },
                dataSrc: "response.data",
            },
            createdRow: function (row, data, dataIndex) {
                if (data.ACTIVO == 0) {
                    $(row).css({
                        // "font-style" : "italic",
                        color: "#888",
                        "background-color": "#D7DBDD",
                        cursor: "not-allowed",
                        opacity: "0.8",
                    });
                } else if (
                    data.ACTIVO == 1 &&
                    convertirCadenaAFecha(data.FIN_MES) <
                        convertirCadenaAFecha(fechaActual)
                ) {
                    $(row).css({
                        "background-color": "#FFCCCC",
                        border: "1px solid #FF0000",
                        color: "#FF0000",
                        opacity: "0.8",
                    });
                }
            },
            columns: [
                { data: "COUNT" },
                {
                    data: null,
                    render: function (meta, data) {
                        let html = "";
                        if (meta.SEXO == "FEMENINO") {
                            html += `<i class="fa-solid fa-person-dress" style="color: #f415cb;"></i> ${meta.NOMBRE_COMPLETO}`;
                        } else {
                            html += `<i class="fa-solid fa-person" style="color: #3e83f9;"></i> ${meta.NOMBRE_COMPLETO}`;
                        }

                        return html;
                    },
                },
                { data: "MONTO_PAGO" },
                { data: "INICIO_MES" },
                { data: "FIN_MES" },
                {
                    data: null,
                    render: function (meta, data) {
                        let html1 = "";
                        html1 += `
                            <div class="input-group" >
                                <input type="password" value="${meta.ID_USUARIO}" id="pass${meta.ID_USUARIO}" style="border:none; background-color: transparent;" disabled class="text-center"></input>

                                <span onclick="Vista(${meta.ID_USUARIO})" style="cursor: pointer;">
                                    <i class='bx bx-show' id="ver${meta.ID_USUARIO}"></i>
                                    <i class='bx bx-hide' id="ocultar${meta.ID_USUARIO}" style="display: none;"></i>

                                </span>
                            </div >
                        
                        
                        `;
                        return html1;
                    },
                },

                {
                    data: null,
                    render: function (meta, data) {
                        let html = "";
                        if (meta.ACTIVO == 1) {
                            html += `<div class = "estatusUsuariosTabla">`;
                            html += `
                        
                            <button id="btnBloquear" class="btn btn-sm btn-info" title="Reimprimir Comprobante" onclick="ImprimirTicket(${meta.ID_USUARIO})"><i class='bx bx-printer'></i></button>

                            <button class="btn btn-sm btn-warning" data-bs-target="#modalEditarUsuario" data-bs-toggle="modal" title="Editar" onclick="ObtenerUser(${meta.ID_USUARIO})"><i class='bx bx-edit-alt'></i></button>

                            <button id="btnEliminar" class="btn btn-sm btn-danger" title="Eliminar" onclick="EliminarUsuario(${meta.ID_USUARIO})" ><i class='bx bx-trash'></i></button>

                            <button id="btnPagar" class="btn btn-sm btn-success" data-bs-target="#modalPagoUsuario" data-bs-toggle="modal" title="Pagar" onclick="PagarUser(${meta.ID_USUARIO})"><i class='bx bx-dollar'></i></button>
                        
                        `;
                        } else {
                            html += `<div class = "estatusUsuariosTabla">`;
                            html += `
                            <button id="btnDesbloquear" class="btn btn-sm btn-success" title="Activar" onclick="DesbloquearUsuario(${meta.ID_USUARIO})"><i class='bx bx-lock-open-alt'></i></button> `;
                        }

                        html += "</div>";

                        return html;
                    },
                },
                { data: "ID_USUARIO" },
            ],
            columnDefs: [
                { target: 0, title: "#", className: "all", searchable: false },
                { target: 1, title: "Nombre Completo", className: "all" },
                { target: 2, title: "Pago", className: "all" },
                { target: 3, title: "Inicio de mes", className: "all" },
                { target: 4, title: "Fin de mes", className: "all" },
                { target: 5, title: "Clave de acceso", className: "all" },
                { target: 6, title: "Acciones", className: "min-tablet" },
                {
                    target: 7,
                    title: "Clave",
                    className: "none",
                    visible: false,
                },
            ],
        });

        //################################################################################################################

        // FUNCIONES PARA EL MODAL DE LOS REGISTROS DE ASISTENCIAS

        $("#fechaRegistroAsistencias").val(fechaActualFormatoInput);
        $("#fecha_pago_visita").val(fechaActualFormatoInput);

        $("#ModalBusquedaAsistencias").on("shown.bs.modal", function (e) {
            dataRegistroAsistencias = {
                api: 3,
                fechaRegistroAsistencias: $("#fechaRegistroAsistencias").val(),
            };

            TablaRegistroAsistencias = $("#TablaRegistroAsistencias").DataTable(
                {
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                    },
                    lengthChange: true,
                    lengthMenu: [
                        [10, 25, 50, -1],
                        [10, 25, 50, "All"],
                    ],
                    // dom: '<"top"i>rt<"bottom"flp><"clear">',
                    info: false,
                    paging: true,
                    searching: true,
                    filtering: true,
                    scrollY: "65vh",
                    scrollCollapse: true,
                    responsive: true,
                    dom: "Bfrtilp",
                    buttons: [
                        {
                            extend: "excelHtml5",
                            text: '<i class="fas fa-file-excel"></i> ',
                            titleAttr: "Exportar a Excel",
                            className: "btn btn-success",
                        },
                        {
                            extend: "pdfHtml5",
                            text: '<i class="fas fa-file-pdf"></i> ',
                            titleAttr: "Exportar a PDF",
                            className: "btn btn-danger",
                        },
                        {
                            extend: "print",
                            text: '<i class="fa fa-print"></i> ',
                            titleAttr: "Imprimir",
                            className: "btn btn-info",
                        },
                    ],
                    ajax: {
                        dataType: "json",
                        data: function (d) {
                            return $.extend(d, dataRegistroAsistencias);
                        },
                        method: "POST",
                        url: `${http}${servidor}/${appname}/api/asistencia_api.php`,
                        beforeSend: function () {
                            Toast.fire({
                                icon: "info",
                                title: "Estamos cargando tu solicitud, esto puede demorar un rato",
                                timer: 3000,
                                // width: 'auto'
                            });
                        },
                        complete: function () {
                            TablaRegistroAsistencias.columns.adjust().draw();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alertErrorAJAX(jqXHR, textStatus, errorThrown);
                        },
                        dataSrc: "response.data",
                    },
                    columns: [
                        // { data: 'COUNT' },
                        { data: "NOMBRE_COMPLETO" },
                        { data: "ID_USUARIO" },
                        { data: "FECHA" },
                        { data: "HORA" },
                    ],
                    columnDefs: [
                        // { target: 0, title: '#', className: 'all' },
                        { target: 0, title: "Nombre", className: "all" },
                        { target: 1, title: "Clave", className: "all" },
                        { target: 2, title: "Fecha", className: "all" },
                        {
                            target: 3,
                            title: "Hora de entrada",
                            className: "all",
                        },
                    ],
                }
            );

            $("#fechaRegistroAsistencias").change(function () {
                recargarTablaAsistencias();
            });

            $("#checkRegistroAsistencias").click(function () {
                if ($(this).is(":checked")) {
                    recargarTablaAsistencias(0);
                    $("#fechaRegistroAsistencias").prop("disabled", true);
                } else {
                    recargarTablaAsistencias();
                    $("#fechaRegistroAsistencias").prop("disabled", false);
                }
            });

            function recargarTablaAsistencias(fecha = 1) {
                dataRegistroAsistencias = {
                    api: 3,
                };

                if (fecha)
                    dataRegistroAsistencias["fechaRegistroAsistencias"] = $(
                        "#fechaRegistroAsistencias"
                    ).val();

                TablaRegistroAsistencias.ajax.reload();
            }
        });

        //DESTRUIMOS NUESTRA TABLA PARA NO CAUSAR CONFLICTOS
        $("#ModalBusquedaAsistencias").on("hidden.bs.modal", function () {
            TablaRegistroAsistencias.destroy();
        });

        ///////// Modal de pagos sin confirmar
        $("#ModalPagoPendientes").on("shown.bs.modal", function (e) {
            TablaPagosSinConfirmar = $("#TablaPagosSinConfirmar").DataTable({
                language: {
                    url: "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
                },
                lengthChange: true,
                lengthMenu: [
                    [10, 25, 50, -1],
                    [10, 25, 50, "All"],
                ],
                // dom: '<"top"i>rt<"bottom"flp><"clear">',
                info: false,
                paging: true,
                searching: true,
                filtering: true,
                scrollY: "65vh",
                scrollCollapse: true,
                responsive: true,
                ajax: {
                    dataType: "json",
                    data: { api: 7 },
                    method: "POST",
                    url: `${http}${servidor}/${appname}/api/pagos_api.php`,
                    beforeSend: function () {
                        Toast.fire({
                            icon: "info",
                            title: "Estamos cargando tu solicitud, esto puede demorar un rato",
                            timer: 3000,
                            // width: 'auto'
                        });
                    },
                    complete: function () {
                        TablaPagosSinConfirmar.columns.adjust().draw();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alertErrorAJAX(jqXHR, textStatus, errorThrown);
                    },
                    dataSrc: "response.data",
                },
                columns: [
                    // { data: 'COUNT' },
                    { data: "NOMBRE_COMPLETO" },
                    { data: "CLAVE" },
                    { data: "MONTO_PAGO" },
                    { data: "FIN_MES" },
                    { data: "FECHA_CARGADO" },
                    { data: "COMPROBANTE" },
                ],
                columnDefs: [
                    // { target: 0, title: '#', className: 'all' },
                    { target: 0, title: "Nombre", className: "all" },
                    { target: 1, title: "Clave", className: "all" },
                    { target: 2, title: "Monto", className: "all" },
                    {
                        target: 3,
                        title: "Fecha de vencimiento",
                        className: "all",
                    },
                    { target: 4, title: "Fecha de pago", className: "all" },
                    {
                        target: 5,
                        title: "Comprobante",
                        render: function (data, type, row) {
                            return `
                            <a href="${data}" data-lightbox="image-1" data-title="Comprobante de pago" data-alt="Imagen del comprobante de pago">
                                <img src="${data}" style="width:200px; height=200px">
                                </img>
                            </a>`;
                        },
                    },
                ],
            });
        });

        $("#ModalPagoPendientes").on("hidden.bs.modal", function () {
            TablaPagosSinConfirmar.destroy();
        });
    });
});

function EliminarUsuario(id_usuario) {
    alertMensajeConfirm(
        {
            title: "¿Esta seguro de eliminar este usuario?",
            text: `El usuario con la clave ${id_usuario} no podra acceder nunca más`,
            icon: "warning",
        },
        function () {
            data = {
                api: 3,
                id_usuario: id_usuario,
            };

            ajax(
                data,
                "usuarios_api",
                { callbackAfter: true },
                false,
                function (data) {
                    TablaUsuarios.ajax.reload();
                    alertToast("Usuario eliminado con éxito", "success", 4000);
                }
            );
        },
        1
    );
}

function ObtenerUser(id_usuario) {
    data = {
        api: 2,
        id_usuario: id_usuario,
    };

    ajax(data, "usuarios_api", { callbackAfter: true }, false, function (data) {
        info = data["response"]["data"][0];
        $("#nombreUsuario").text(info["NOMBRE_COMPLETO"]),
            $("#nombre_completo").val(info["NOMBRE_COMPLETO"]),
            $("#inicio_mes").val(info["INICIO_MES"]),
            $("#fin_mes").val(info["FIN_MES"]),
            $("#monto_pago").val(info["MONTO_PAGO"]),
            $("#id_usuario").val(info["ID_USUARIO"]);
        $("#correo").val(info["CORREO"]);
    });
}

function ActualizarUsuario() {
    formularioValido = validarFormulario($("#editarUser"));

    // Si el formulario es válido, procede a realizar la acción (enviarlo en este caso)
    if (formularioValido) {
        alertMensajeConfirm(
            {
                title: "¿Esta seguro de editar este usuario?",
                text: `Es necesario confirmar para realizar esta acción`,
                icon: "question",
            },
            function () {
                data = {
                    api: 4,
                    id_usuario: $("#id_usuario").val(),
                    nombre_completo: $("#nombre_completo").val(),
                    monto_pago: $("#monto_pago").val(),
                    inicio_mes: $("#inicio_mes").val(),
                    fin_mes: $("#fin_mes").val(),
                    correo: $("#correo").val(),
                };

                ajax(
                    data,
                    "usuarios_api",
                    { callbackAfter: true },
                    false,
                    function (data) {
                        TablaUsuarios.ajax.reload();
                        $("#modalEditarUsuario").modal("hide");
                        alertToast(
                            "Usuario editado con éxito",
                            "success",
                            4000
                        );
                    }
                );
            },
            1
        );
    } else {
        // Muestra un mensaje de error o realiza alguna otra acción
        alertToast(
            "Por favor, complete todos los campos del formulario.",
            "error",
            2000
        );
    }
}

function BloquearUsuario(id_usuario) {
    alertMensajeConfirm(
        {
            title: "¿Esta seguro de desactivar este usuario?",
            text: `Al desactivar este usuario, no podra hacer registro de asistencia`,
            icon: "question",
        },
        function () {
            data = {
                api: 3,
                id_usuario: id_usuario,
                activo: 0,
            };

            ajax(
                data,
                "usuarios_api",
                { callbackAfter: true },
                false,
                function (data) {
                    TablaUsuarios.ajax.reload();
                    alertToast(
                        "Usuario desactivado con éxito",
                        "success",
                        4000
                    );
                }
            );
        },
        1
    );
}

function ImprimirTicket(id_usuario) {
    alertMensajeConfirm(
        {
            title: "¿Esta seguro de Reimprimir el comprobante de pago?",
            text: `Confirme para imprimir`,
            icon: "question",
        },
        function () {
            data = {
                api: 2,
                id_usuario: id_usuario,
            };

            alertToast("Imprimiendo Ticket", "success", 4000);
            ajax(
                data,
                "usuarios_api",
                { callbackAfter: true },
                false,
                function (data) {
                    info = data["response"]["data"][0];

                    atendio = "Personal VAL ROSS";
                    inico = info["INICIO_MES"];
                    fin = info["FIN_MES"];
                    monto = info["MONTO_PAGO"];
                    clave = info["ID_USUARIO"];
                    nombre = info["NOMBRE_COMPLETO"];

                    ImprimirComprobante(
                        atendio,
                        nombre,
                        monto,
                        inico,
                        fin,
                        clave
                    );
                }
            );
        },
        1
    );
}

function DesbloquearUsuario(id_usuario) {
    alertMensajeConfirm(
        {
            title: "¿Esta seguro de activar este usuario?",
            text: `Al activar este usuario, podra realizar todos las actividades existentes`,
            icon: "question",
        },
        function () {
            data = {
                api: 3,
                id_usuario: id_usuario,
                activo: 1,
            };

            ajax(
                data,
                "usuarios_api",
                { callbackAfter: true },
                false,
                function (data) {
                    TablaUsuarios.ajax.reload();
                    alertToast("Usuario activado con éxito", "success", 4000);
                }
            );
        },
        1
    );
}

function PagarUser(id_usuario) {
    data = {
        api: 2,
        id_usuario: id_usuario,
    };

    ajax(data, "usuarios_api", { callbackAfter: true }, false, function (data) {
        info = data["response"]["data"][0];
        $("#nombreUsuarioPago").text(info["NOMBRE_COMPLETO"]),
            $("#inicio_mes").val(info["INICIO_MES"]),
            $("#fin_mes_pago").val(info["FIN_MES"]),
            $("#montoPago").val(info["MONTO_PAGO"]),
            $("#id_usuario_pago").val(info["ID_USUARIO"]);
        $("#usuario").val(info["NOMBRE_COMPLETO"]);
    });
}

$("#monto_pago").on("input", function () {
    // Reemplaza cualquier signo de menos por una cadena vacía
    var valor = $(this).val().replace(/-/g, "");
    $(this).val(valor);
});

//FUNCION PARA VER Y OCULTAR LA CLAVE DE ACCESO DE LOS USUARIOS
function Vista(codigo) {
    let pass = document.getElementById(`pass${codigo}`);
    let ver = document.getElementById(`ver${codigo}`);
    let ocultar = document.getElementById(`ocultar${codigo}`);

    if (pass.type == "password") {
        pass.type = "text";
        ver.style.display = "none";
        ocultar.style.display = "block";
    } else {
        pass.type = "password";
        ver.style.display = "block";
        ocultar.style.display = "none";
    }
}

//###########################################################################################

$("#passAdmin").on("input", function () {
    if ($.trim($(this).val()) === "") {
        $("#realizarPago").prop("disabled", true);
    } else {
        $("#realizarPago").prop("disabled", false);
    }
});

function DataComprobante(id_usuario) {
    data = {
        api: 2,
        id_usuario: id_usuario,
    };

    ajax(data, "usuarios_api", { callbackAfter: true }, false, function (data) {
        info = data["response"]["data"][0];

        $("#vencimiento").val(info["FIN_MES"]);
        $("#correo_comprobante").val(info["CORREO"]);
    });
}

//FUNCIONES PAR EL MODAL DE PAGAR
function realizarPago() {
    alertMensajeConfirm(
        {
            title: "¿Estás seguro de realizar el pago?",
            text: "Ten en cuenta que esta acción no se puede revertir",
            icon: "question",
            confirmButtonText: "Si, realizar pago",
            cancelButtonText: "No, cancelar",
        },
        function () {
            data = {
                api: 2,
                passAdmin: $("#passAdmin").val(),
                usuario_id: $("#id_usuario_pago").val(),
                tipoPago: $("#tipo_pago_user").val(),
                tiempoPago: $("#tiempo_pago").val(),
                montoPago: $("#montoPago").val(),
                fin_mes_pago: $("#fin_mes_pago").val(),
            };
            ajax(
                data,
                "pagos_api",
                { callbackAfter: true },
                false,
                function (data) {
                    TablaUsuarios.ajax.reload();
                    alertToast("Pago realizado con éxito", "success", 4000);

                    $(".modal-footer.blockPago").hide();
                    $("#contrasenia").hide();

                    //Rellenamos la informacion para el envio del comprovante de pago
                    DataComprobante($("#id_usuario_pago").val());

                    $("#comprobante").css("display", "block");
                    $("#enviarComprobante").css("display", "block");
                    $("#enviarComprobante").prop("disabled", false);

                    recuperarPagosSinConfirmar();
                }
            );
        },
        1
    );
}

function ImprimirComprobante(
    atendidoPor,
    nombreUsuarioPago,
    montoPago,
    fin_mes_pago,
    vencimiento,
    clave_acceso
) {
    const data = {
        api: 1,
        atendidoPor: atendidoPor,
        nombreUsuarioPago: nombreUsuarioPago,
        montoPago: montoPago,
        fin_mes_pago: fin_mes_pago,
        vencimiento: vencimiento,
        clave_acceso: clave_acceso,
    };

    ajax(data, "recibo_pago", { callbackAfter: true }, false, function (data) {
        console.log("OK");
    });
}

const btn = document.getElementById("enviarComprobante");

document
    .getElementById("formPago")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        (atendidoPor = $("#responsable").val()),
            (nombreUsuarioPago = $("#nombreUsuarioPago").text()),
            (montoPago = $("#montoPago").val()),
            (fin_mes_pago = $("#fin_mes_pago").val()),
            (vencimiento = $("#vencimiento").val());
        id_usuario = $("#id_usuario_pago").val();

        btn.value = "Enviando...";

        ImprimirComprobante(
            atendidoPor,
            nombreUsuarioPago,
            montoPago,
            fin_mes_pago,
            vencimiento,
            id_usuario
        );

        Swal.fire({
            icon: "success",
            title: "Pago éxitoso",
            text: "El comprobante pago se envio correctamente",
            timer: 3000,
            timerProgressBar: true,
        });
        btn.value = "Enviar comprobante";

        $("#formPago")[0].reset();
        $("#contrasenia").show();
        $("#comprobante").css("display", "none");
        $(".modal-footer.blockPago").show();
        $("#enviarComprobante").css("display", "none");
        $("#enviarComprobante").prop("disabled", true);
        $("#realizarPago").prop("disabled", true);
        $("#modalPagoUsuario").modal("hide");
    });

$("#realizarPagoVisita").on("click", function (e) {
    // e.preventDefault()

    formularioValido = validarFormulario($("#formPagoVisita"));
    // Si el formulario es válido, procede a realizar la acción (enviarlo en este caso)
    if (formularioValido) {
        alertMensajeConfirm(
            {
                title: "¿Deseas registrar este pago?",
                text: "Se sumara al total de pagos del dia de hoy",
                icon: "question",
            },
            function () {
                atendidoPor = $("#atendidoPorVisita").val();
                clave_acceso = "Visita";
                nombre_completo = $("#nombreVisita").val();
                inicio_mes = $("#fecha_pago_visita").val();
                fin_mes = $("#fecha_pago_visita").val();
                monto_pago = $("#totalPagoVisita").val();
                tipo_pago = $("#tipo_pago_visita").val();

                data = {
                    api: 8,
                    nombre_completo: nombre_completo,
                    clave_acceso: clave_acceso,
                    inicio_mes: inicio_mes,
                    fin_mes: fin_mes,
                    monto_pago: monto_pago,
                    tipo_pago: tipo_pago,
                };

                ajax(
                    data,
                    "pagos_api",
                    { callbackAfter: true },
                    false,
                    function (data) {
                        error = data["response"]["data"][0]["MSJ"];

                        if (error) {
                            alertToast(`${error}`, "error", 4500);
                        } else {
                            $("#formPagoVisita")[0].reset();
                            $("#fecha_pago_visita").val(
                                fechaActualFormatoInput
                            );

                            Swal.fire({
                                icon: "success",
                                title: "Pago éxitoso",
                                text: "El pago se realizo de manera correcta",
                                timer: 3000,
                                timerProgressBar: true,
                            });

                           
                            ImprimirComprobante(
                                atendidoPor,
                                nombre_completo,
                                monto_pago,
                                inicio_mes,
                                fin_mes,
                                clave_acceso
                            );

                            $("#modalPagoVisita").modal("hide");
                        }
                    }
                );
            },
            1
        );
    } else {
        // Muestra un mensaje de error o realiza alguna otra acción
        alertToast(
            "Por favor, complete todos los campos del formulario.",
            "error",
            2000
        );
    }
});
