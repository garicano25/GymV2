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
                data: {},
                method: "GET",
                url: `/getProducts`,
                beforeSend: function () {},
                complete: function () {
                    TablaProductos.columns.adjust().draw();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                },
                dataSrc: "",
            },
            createdRow: function (row, data, dataIndex) {
                if (data.status_id == 2) {
                    $(row).css({
                        // "font-style" : "italic",
                        color: "#888",
                        "background-color": "#D7DBDD",
                        cursor: "not-allowed",
                        opacity: "0.8",
                        "text-decoration": "line-through",
                    });
                } else if (data.cantidad == 0) {
                    $(row).css({
                        "background-color": "#FFCCCC",
                        border: "1px solid #FF0000",
                        color: "#FF0000",
                        opacity: "0.8",
                    });
                }
            },
            columns: [
                { data: "id" },
                { data: "nombre" },
                { data: "precio" },
                { data: "cantidad" },
                { data: "clave" },
                {
                    data: null,
                    render: function (meta, data) {
                        if (meta.status_id === 1) {
                            texto = "Desactivar";
                        } else {
                            texto = "Activar";
                        }

                        let html = `
                        <button class="btn btn-sm btn-warning font-semibold rounded-lg editar" title="Editar"><i class='bx bxs-edit' ></i></i>  Editar</button>
                        <button class="btn btn-sm btn-secondary font-semibold rounded-lg active" title="Desactivar"><i class='bx bx-power-off' ></i> ${texto}</button>
                        <button class="btn btn-sm btn-danger font-semibold ml-5 rounded-lg eliminar" title="Eliminar"><i class='bx bx-trash'></i> Eliminar</button>`;

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

        // =================== CRUD PRODUCTOS =====================

        $("#btnCrearProducto").on("click", async function (event) {
            event.preventDefault();

            var isValid = validarFormulario($("#formProducto"));
            if (isValid) {
                try {
                    await sendFormPostCreateorUpdate(
                        "/store-product",
                        "formProducto",
                        "btnCrearProducto",
                        1
                    );
                    actionsAfterSuccess(
                        TablaProductos,
                        "formProducto",
                        "modalAgregarProducto",
                        "btnCrearProducto"
                    );
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Error al intentar guardar el Producto: " + error,
                        icon: "error",
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }
                return false;
            } else {
                toastEmptyFieldForm();
            }
            return false;
        });

        //Editar Producto
        $("#TablaProductos tbody").on("click", "td>button.editar", function () {
            var tr = $(this).closest("tr");
            var row = TablaProductos.row(tr);

            $("#nombreProducto").text(row.data().nombre);

            editDatoTabla(row.data(), "editarProducto", "modalEditarProducto");
            $("#productos_cantidad").val(row.data().cantidad);

            Toast.fire({
                icon: "success",
                title: "Datos consultados correctamente!",
                timer: 2000,
            });

            $("#modalEditarProducto").modal("show");
        });

        $("#btnEditar").on("click", async function (event) {
            event.preventDefault();

            var isValid = validarFormulario($("#editarProducto"));
            if (isValid) {
                try {
                    await sendFormPostCreateorUpdate(
                        "/store-product",
                        "editarProducto",
                        "btnCrearProducto",
                        2
                    );
                    actionsAfterSuccess(
                        TablaProductos,
                        "editarProducto",
                        "modalEditarProducto",
                        "btnCrearProducto"
                    );
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Error al intentar guardar el Producto: " + error,
                        icon: "error",
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }
                return false;
            } else {
                toastEmptyFieldForm();
            }
            return false;
        });

        //Activar Producto
        $("#TablaProductos tbody").on("click", "td>button.active", function () {
            var tr = $(this).closest("tr");
            var row = TablaProductos.row(tr);

            var activo = row.data().status_id == 1 ? "Inactivar" : "Activar";

            Swal.fire({
                title: `Decea ${activo} al producto ${row.data().nombre}?`,
                text: "Nota: Si se Inactiva al producto no sera utilizado!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `Si, ${activo}!`,
                cancelButtonText: "No, cancelar!",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        dataType: "json",
                        type: "POST",
                        url: "/product-active",
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                                "content"
                            ),
                        },
                        data: {
                            id: row.data().id,
                            estado: row.data().status_id,
                        },
                        beforeSend: function () {},
                        success: function () {
                            // message
                            Toast.fire({
                                icon: "success",
                                title: "Producto actualizado con exito!",
                                timer: 2000,
                            });

                            TablaProductos.ajax.reload();
                        },
                        error: function () {
                            Swal.fire({
                                title: "Error!",
                                text: "Error al intentar actualizar el estado del producto, intentelo nuevamente!",
                                icon: "error",
                                timer: 2500,
                                timerProgressBar: true,
                            });
                            return false;
                        },
                    });
                    return false;
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Swal.fire({
                        title: "Cancelado",
                        text: "Accion cancelada!",
                        timer: 1500,
                        icon: "error",
                    });
                }
            });
        });

        //Eliminar User
        $("#TablaProductos tbody").on("click","td>button.eliminar",
            function () {
                var tr = $(this).closest("tr");
                var row = TablaProductos.row(tr);

                Swal.fire({
                    title: `Decea eliminar al producto ${row.data().nombre}?`,
                    text: "Esta acción es irreversible!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: `Si, eliminar!`,
                    cancelButtonText: "No, cancelar!",
                    reverseButtons: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await sendFormPostDelete(
                                "/store-product",
                                -1,
                                row.data().id
                            );
                            TablaProductos.ajax.reload();
                            Swal.fire({
                                title: "Exito!",
                                text: "Registro eliminado con exito!",
                                icon: "success",
                                timer: 2500,
                                timerProgressBar: true,
                            });
                        } catch (error) {
                            Swal.fire({
                                title: "Error!",
                                text:"Error al intentar eliminar el Producto intentelo de nuevo! " + error,
                                icon: "error",
                                timer: 3000,
                                timerProgressBar: true,
                            });
                        }
                        return false;
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        Swal.fire({
                            title: "Cancelado",
                            text: "Accion cancelada!",
                            timer: 1500,
                            icon: "error",
                        });
                    }
                });
            }
        );

        // ====================================== FUNCIONES ADICIONALES PARA INPUT Y MODAL =============================
        $("#generarClave").click(function (e) {
            e.preventDefault();
            $("#clave_producto").val(generarClave());
        });

        //Codigo para limitar la cantidad maxima que tendra dicho Input
        $("#precio").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 4
            ) {
                return false;
            }
        });

        $("#clave_producto").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 4
            ) {
                return false;
            }
        });

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
        $(".negativo").on("input", function () {
            var valor = $(this).val().replace(/-/g, "");
            $(this).val(valor);
        });
    });
});


