$.getScript("/js/funciones.js").done(function () {
    $(function () {
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().slice(0, 10);

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

            ajax(
                data,
                "recibo_pago",
                { callbackAfter: true },
                false,
                function (data) {
                    console.log("OK");
                }
            );
        }

        fechon = $("#fechaRegistroPagos").val(fechaActualFormatoInput);
        $("#fechaActual").text(obtenerFechaActualTexto());

        dataRegistroPagos = {
            api: 1,
            fechaRegistroPagos: $("#fechaRegistroPagos").val(),
        };

        TablaPagos = $("#TablaPagos").DataTable({
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
            },
            lengthChange: true,
            lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, "All"],
            ],
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
                    return $.extend(d, dataRegistroPagos);
                },
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
                    TablaPagos.columns.adjust().draw();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alertErrorAJAX(jqXHR, textStatus, errorThrown);
                },
                dataSrc: "response.data",
            },
            columns: [
                { data: "COUNT" },
                { data: "NOMBRE" },
                { data: "MONTO_PAGO" },
                { data: "TIPO_PAGO" },
                { data: "FECHA" },
                { data: "HORA" },
            ],
            columnDefs: [
                { target: 0, title: "#", className: "all" },
                { target: 1, title: "Nombre", className: "all" },
                { target: 2, title: "Monto pagado", className: "all" },
                { target: 3, title: "Método de pago", className: "all" },
                { target: 4, title: "Fecha", className: "all" },
                { target: 5, title: "Hora", className: "all" },
            ],
        });

        $("#fechaRegistroPagos").change(function () {
            recargarTablaPagos();
        });

        $("#checkRegistroPagos").click(function () {
            if ($(this).is(":checked")) {
                recargarTablaPagos(0, 0);
                $("#fechaRegistroPagos").prop("disabled", true);
            } else {
                recargarTablaPagos();
                $("#fechaRegistroPagos").prop("disabled", false);
            }
        });

        function recargarTablaPagos(fecha = 1, fecha2 = 1) {
            dataRegistroPagos = {
                api: 1,
            };

            dataPagoTotal = {
                api: 3,
            };

            if (fecha)
                dataRegistroPagos["fechaRegistroPagos"] = $(
                    "#fechaRegistroPagos"
                ).val();
            if (fecha2)
                dataPagoTotal["fechaRegistroPagos"] = $(
                    "#fechaRegistroPagos"
                ).val();

            recuperarTotalVendido(dataPagoTotal, "pagos_api", "pagos");

            TablaPagos.ajax.reload();
        }

        dataPagoTotal = {
            api: 3,
            fechaRegistroPagos: $("#fechaRegistroPagos").val(),
        };
        recuperarTotalVendido(dataPagoTotal, "pagos_api", "pagos");

        $("#btnCobrarVisita").click(function (e) {
            e.preventDefault();

            formularioValido = validarFormulario($("#cobrarVisita"));

            // Si el formulario es válido, procede a realizar la acción (enviarlo en este caso)
            if (formularioValido) {
                alertMensajeConfirm(
                    {
                        title: "¿Deseas registrar este pago de visita?",
                        text: "Confirme para cobrar visita",
                        icon: "question",
                    },
                    function () {
                        atendidoPor = "Personal VAL-ROSS";
                        clave_acceso = "NA";
                        nombre_completo = $("#nombre_completo").val();
                        inicio_mes = currentDateString;
                        fin_mes = currentDateString;
                        monto_pago = $("#monto_pago").val();
                        sexo = "NA";
                        correo = "NA";

                        data = {
                            api: 8,
                            nombre_completo: nombre_completo,
                            clave_acceso: clave_acceso,
                            inicio_mes: inicio_mes,
                            fin_mes: fin_mes,
                            monto_pago: monto_pago,
                            sexo: sexo,
                            correo: correo,
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
                                    $("#cobrarVisita")[0].reset();

                                    Swal.fire({
                                        icon: "success",
                                        title: "Pago de Visita realizado correctamente",
                                        allowOutsideClick: false,
                                        allowEnterKey: true,
                                    });

                                    //Mandamos a imprimir el ticket
                                    ImprimirComprobante(
                                        atendidoPor,
                                        nombre_completo,
                                        monto_pago,
                                        inicio_mes,
                                        fin_mes,
                                        clave_acceso
                                    );

                                    //Recargamos los datos de pagos
                                    TablaPagos.ajax.reload();

                                    dataPagoTotal = {
                                        api: 3,
                                        fechaRegistroPagos: $(
                                            "#fechaRegistroPagos"
                                        ).val(),
                                    };
                                    recuperarTotalVendido(
                                        dataPagoTotal,
                                        "pagos_api",
                                        "pagos"
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
