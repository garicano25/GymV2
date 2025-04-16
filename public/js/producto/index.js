$.getScript("/js/funciones.js").done(function () {
    $(function () {
        TablaProductos = $("#TablaProductos").DataTable({
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
                data: { api: 2 },
                method: "POST",
                url: `${http}${servidor}/${appname}/api/productos_api.php`,
                beforeSend: function () {},
                complete: function () {
                    TablaProductos.columns.adjust().draw();
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
                        "text-decoration": "line-through",
                    });
                } else if (data.PRODUCTOS_TOTALES == 0) {
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
                { data: "NOMBRE" },
                { data: "PRECIO" },
                { data: "PRODUCTOS_TOTALES" },
                { data: "ID_PRODUCTO" },
                {
                    data: null,
                    render: function (meta, data) {
                        let html = "";
                        if (meta.ACTIVO == 1) {
                            html += `<div class = "estatusUsuariosTabla">`;
                            html += `
                        
                            <button id="btnBloquear" class="btn btn-sm btn-info" title="Desactivar" onclick="BloquearProducto(${meta.ID_PRODUCTO})"><i class='bx bx-lock-alt'></i></button>

                            <button class="btn btn-sm btn-warning" data-bs-target="#modalEditarProducto" data-bs-toggle="modal" title="Editar" onclick="ObtenerProducto(${meta.ID_PRODUCTO})"><i class='bx bx-edit-alt'></i></button>

                            <button id="btnEliminar" class="btn btn-sm btn-danger" title="Eliminar" onclick="EliminarProducto(${meta.ID_PRODUCTO})" ><i class='bx bx-trash'></i></button>

                        
                        `;
                        } else {
                            html += `<div class = "estatusUsuariosTabla">`;
                            html += `
                            <button id="btnDesbloquear" class="btn btn-sm btn-success" title="Activar" onclick="DesbloquearProducto(${meta.ID_PRODUCTO})"><i class='bx bx-lock-open-alt'></i></button> `;
                        }

                        html += "</div>";

                        return html;
                    },
                },
            ],
            columnDefs: [
                { target: 0, title: "#", className: "all" },
                { target: 1, title: "Producto", className: "all" },
                { target: 2, title: "Precio unitario", className: "all" },
                { target: 3, title: "Productos existentes", className: "all" },
                { target: 4, title: "Clave", className: "all" },
                { target: 5, title: "Acciones", className: "min-tablet" },
            ],
        });

        $("#generarClave").click(function (e) {
            e.preventDefault();
            $("#clave_producto").val(generarClave());
        });

        //Codigo para limitar la cantidad maxima que tendra dicho Input
        $("#monto_pago").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 4
            ) {
                return false;
            }
        });

        $("#clave_acceso").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 4
            ) {
                return false;
            }
        });

        $("#btnCrearProducto").on("click", function (event) {
            event.preventDefault();

            formularioValido = validarFormulario($("#formProducto"));

            // Si el formulario es válido, procede a realizar la acción (enviarlo en este caso)
            if (formularioValido) {
                alertMensajeConfirm(
                    {
                        title: "¿Esta seguro de guardar este producto?",
                        text: `Es necesario confirmar para realizar esta acción`,
                        icon: "question",
                    },
                    function () {
                        data = {
                            api: 1,
                            nombre_producto: $("#nombre_producto").val(),
                            precio_producto: $("#precio_producto").val(),
                            productos_totales: $("#productos_totales_g").val(),
                            clave_producto: $("#clave_producto").val(),
                        };

                        ajax(
                            data,
                            "productos_api",
                            { callbackAfter: true },
                            false,
                            function (data) {
                                error = data["response"]["data"][0]["MSJ"];

                                if (error) {
                                    alertToast(`${error}`, "error", 4500);
                                } else {
                                    TablaProductos.ajax.reload();
                                    $("#formProducto")[0].reset();
                                    $("#modalAgregarProducto").modal("hide");
                                    alertToast(
                                        "Producto guardado con éxito",
                                        "success",
                                        4000
                                    );
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

        //CREAMOS UN EVENTO CUANDO EL MODAL SE CIERRA
        const myModalEl = document.getElementById("modalEditarProducto");
        myModalEl.addEventListener("hidden.bs.modal", (event) => {
            $("#editarProducto")[0].reset();
            $("#editarProducto").find("input").removeClass("validar");
        });

        const myModalEl1 = document.getElementById("modalAgregarProducto");
        myModalEl1.addEventListener("hidden.bs.modal", (event) => {
            $("#formProducto")[0].reset();
            $("#formProducto").find("input").removeClass("validar");
        });

        //NO PERMITIMOS EL INGRESO DE NUMEROS NEGATIVOS PARA EL MODAL DE EDITAR
        $("#costo").on("input", function () {
            var valor = $(this).val().replace(/-/g, "");
            $(this).val(valor);
        });

        $("#productos_agregados").on("input", function () {
            var valor = $(this).val().replace(/-/g, "");
            $(this).val(valor);
        });

        //NO PERMITIMOS EL INGRESO DE NUMEROS NEGATIVOS PARA EL MODAL DE AGREGAR
        $("#precio_producto").on("input", function () {
            var valor = $(this).val().replace(/-/g, "");
            $(this).val(valor);
        });

        $("#productos_totales_g").on("input", function () {
            var valor = $(this).val().replace(/-/g, "");
            $(this).val(valor);
        });
    });
});

function EliminarProducto(id_producto) {
    alertMensajeConfirm(
        {
            title: "¿Esta seguro de eliminar este producto?",
            text: `Ya no podra usar este producto`,
            icon: "warning",
        },
        function () {
            data = {
                api: 3,
                id_producto: id_producto,
            };

            ajax(
                data,
                "productos_api",
                { callbackAfter: true },
                false,
                function (data) {
                    TablaProductos.ajax.reload();
                    alertToast("Producto eliminado con éxito", "success", 4000);
                }
            );
        },
        1
    );
}

function BloquearProducto(id_producto) {
    alertMensajeConfirm(
        {
            title: "¿Esta seguro de desactivar este producto?",
            text: `Al desactivar este producto no podra registrar una venta`,
            icon: "question",
        },
        function () {
            data = {
                api: 3,
                id_producto: id_producto,
                activo: 0,
            };

            ajax(
                data,
                "productos_api",
                { callbackAfter: true },
                false,
                function (data) {
                    TablaProductos.ajax.reload();
                    alertToast(
                        "Producto desactivado con éxito",
                        "success",
                        4000
                    );
                }
            );
        },
        1
    );
}

function DesbloquearProducto(id_producto) {
    alertMensajeConfirm(
        {
            title: "¿Esta seguro de activar este producto?",
            text: `Al activar este producto, podra realizar todos las actividades existentes`,
            icon: "question",
        },
        function () {
            data = {
                api: 3,
                id_producto: id_producto,
                activo: 1,
            };

            ajax(
                data,
                "productos_api",
                { callbackAfter: true },
                false,
                function (data) {
                    TablaProductos.ajax.reload();
                    alertToast("Producto activado con éxito", "success", 4000);
                }
            );
        },
        1
    );
}

function ObtenerProducto(id_producto) {
    data = {
        api: 2,
        id_producto: id_producto,
    };

    ajax(
        data,
        "productos_api",
        { callbackAfter: true },
        false,
        function (data) {
            info = data["response"]["data"][0];
            $("#nombreProducto").text(info["NOMBRE"]),
                $("#nombre").val(info["NOMBRE"]),
                $("#costo").val(info["COSTO"]),
                $("#productos_totales").val(info["PRODUCTOS_TOTALES"]),
                $("#id_producto").val(info["ID_PRODUCTO"]);
        }
    );
}

function ActualizarProducto() {
    formularioValido = validarFormulario($("#editarProducto"));

    // Si el formulario es válido, procede a realizar la acción (enviarlo en este caso)
    if (formularioValido) {
        alertMensajeConfirm(
            {
                title: "¿Esta seguro de editar este producto?",
                text: `Es necesario confirmar para realizar esta acción`,
                icon: "question",
            },
            function () {
                data = {
                    api: 4,
                    id_producto: $("#id_producto").val(),
                    nombre_producto: $("#nombre").val(),
                    precio_producto: $("#costo").val(),
                    productos_agregados: $("#productos_agregados").val(),
                    productos_totales: $("#productos_totales").val(),
                };

                ajax(
                    data,
                    "productos_api",
                    { callbackAfter: true },
                    false,
                    function (data) {
                        error = data["response"]["data"][0]["MSJ"];

                        if (error) {
                            alertToast(`${error}`, "error", 4500);
                        } else {
                            TablaProductos.ajax.reload();
                            $("#editarProducto")[0].reset();
                            $("#modalEditarProducto").modal("hide");
                            alertToast(
                                "Productos editado con éxito",
                                "success",
                                4000
                            );
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
}
