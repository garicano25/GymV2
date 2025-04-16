$.getScript("/js/funciones.js").done(function () {
    $(function () {
        fechon = $("#fechaRegistroVentas").val(fechaActualFormatoInput);
        $("#fechaActual").text(obtenerFechaActualTexto());

        // console.log(fechon)

        dataRegistroVentas = {
            api: 2,
            fechaRegistroVentas: $("#fechaRegistroVentas").val(),
        };

        TablaVentas = $("#TablaVentas").DataTable({
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
                    return $.extend(d, dataRegistroVentas);
                },
                method: "POST",
                url: `${http}${servidor}/${appname}/api/ventas_api.php`,
                beforeSend: function () {
                    Toast.fire({
                        icon: "info",
                        title: "Estamos cargando tu solicitud, esto puede demorar un rato",
                        timer: 3000,
                        // width: 'auto'
                    });
                },
                complete: function () {
                    TablaVentas.columns.adjust().draw();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alertErrorAJAX(jqXHR, textStatus, errorThrown);
                },
                dataSrc: "response.data",
            },
            columns: [
                { data: "COUNT" },
                { data: "NOMBRE" },
                { data: "COSTO" },
                { data: "CANTIDA" },
                { data: "TOTAL" },
                { data: "FECHA_HORA_VENTA" },
            ],
            columnDefs: [
                { target: 0, title: "#", className: "all" },
                { target: 1, title: "Producto", className: "all" },
                { target: 2, title: "Precio", className: "all" },
                { target: 3, title: "Cantidad vendida", className: "all" },
                { target: 4, title: "Total de la venta", className: "all" },
                { target: 5, title: "Fecha", className: "all" },
            ],
        });

        //Codigo para limitar la cantidad maxima que tendra dicho Input
        $("#clave_producto").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 4
            ) {
                return false;
            }
        });

        $("#cantidad_productos").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 3
            ) {
                return false;
            }
        });

        //Activamos o desactivamos el boton de enviar
        // $('#clave_registro').on('input keyup', function () {

        //     var inputValue = $(this).val();
        //     inputValue = inputValue.replace(/\s+/g, '').replace(/^0*/, '');

        //     if (inputValue.length === 4) {

        //         $('#registrar').prop('disabled', false);
        //     } else {
        //         $('#registrar').prop('disabled', true);
        //     }

        // });
        $("#fechaRegistroVentas").change(function () {
            recargarTablaVentas();
        });

        $("#checkRegistroVentas").click(function () {
            if ($(this).is(":checked")) {
                recargarTablaVentas(0, 0);
                $("#fechaRegistroVentas").prop("disabled", true);
            } else {
                recargarTablaVentas();
                $("#fechaRegistroVentas").prop("disabled", false);
            }
        });

        function recargarTablaVentas(fecha = 1, fecha2 = 1) {
            dataRegistroVentas = {
                api: 2,
            };

            dataTotalVendido = {
                api: 3,
            };

            if (fecha)
                dataRegistroVentas["fechaRegistroVentas"] = $(
                    "#fechaRegistroVentas"
                ).val();
            if (fecha2)
                dataTotalVendido["fechaRegistroVentas"] = $(
                    "#fechaRegistroVentas"
                ).val();

            recuperarTotalVendido(dataTotalVendido, "ventas_api", "ventas");

            TablaVentas.ajax.reload();
        }

        dataTotalVendido = {
            api: 3,
            fechaRegistroVentas: $("#fechaRegistroVentas").val(),
        };
        recuperarTotalVendido(dataTotalVendido, "ventas_api", "ventas");

        $("#btnRegistrarVenta").on("click", function (e) {
            e.preventDefault();

            formularioValido = validarFormulario($("#formVenta"));

            // Si el formulario es válido, procede a realizar la acción (enviarlo en este caso)
            if (formularioValido) {
                alertMensajeConfirm(
                    {
                        title: "¿Esta seguro de registrar esta venta?",
                        text: "Se añadira al registro diario de ventas",
                        icon: "question",
                    },
                    function () {
                        data = {
                            api: 1,
                            clave_producto: $("#clave_producto").val(),
                            cantidad_productos: $("#cantidad_productos").val(),
                        };

                        ajax(
                            data,
                            "ventas_api",
                            { callbackAfter: true },
                            false,
                            function (data) {
                                error = data["response"]["data"][0]["MSJ"];

                                if (error) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Hubo un problema!",
                                        footer: error,
                                        timer: 5000,
                                        timerProgressBar: true,
                                    });
                                } else {
                                    $("#formVenta")[0].reset();
                                    TablaVentas.ajax.reload();

                                    dataTotalVendido = {
                                        api: 3,
                                        fechaRegistroVentas: $(
                                            "#fechaRegistroVentas"
                                        ).val(),
                                    };

                                    recuperarTotalVendido(
                                        dataTotalVendido,
                                        "ventas_api",
                                        "ventas"
                                    );
                                    alertToast(
                                        "Venta registradada",
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
    });
});
