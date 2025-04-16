$.getScript("/js/funciones.js").done(function () {
    $(function () {
        $("#fechaActual").text(obtenerFechaActualTexto());

        TablaAsistencias = $("#TablaAsistencia").DataTable({
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
            },
            lengthChange: false,
            info: false,
            paging: false,
            searching: false,
            filtering: false,
            scrollY: "65vh",
            scrollCollapse: true,
            ajax: {
                dataType: "json",
                data: { api: 2 },
                method: "POST",
                url: `${http}${servidor}/${appname}/api/asistencia_api.php`,
                beforeSend: function () {},
                complete: function () {
                    TablaAsistencias.columns.adjust().draw();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alertErrorAJAX(jqXHR, textStatus, errorThrown);
                },
                dataSrc: "response.data",
            },
            columns: [
                { data: "COUNT" },
                { data: "NOMBRE_COMPLETO" },
                { data: "FECHA" },
                { data: "HORA" },
            ],
            columnDefs: [
                { target: 0, title: "#", className: "all" },
                { target: 1, title: "Nombre", className: "all" },
                { target: 2, title: "Fecha", className: "all" },
                { target: 3, title: "Hora de entrada", className: "all" },
            ],
        });

        //Codigo para limitar la cantidad maxima que tendra dicho Input
        $("#clave_registro").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 4
            ) {
                return false;
            }
        });

        //Activamos o desactivamos el boton de enviar
        $("#clave_registro").on("input keyup", function () {
            var inputValue = $(this).val();
            inputValue = inputValue.replace(/\s+/g, "").replace(/^0*/, "");

            if (inputValue.length === 4) {
                $("#registrar").prop("disabled", false);
            } else {
                $("#registrar").prop("disabled", true);
            }
        });

        function enviarAsistencia(clave_registro) {
            //  alertMensajeConfirm({
            //     title: `¿Confirma su asistencia con la clave: ${clave_registro} ?`,
            //     icon: 'question',
            // }, function () {

            data = {
                api: 1,
                clave_registro: clave_registro,
            };

            ajax(
                data,
                "asistencia_api",
                { callbackAfter: true },
                false,
                function (data) {
                    msj = data["response"]["data"][0];

                    if (msj["ERROR"]) {
                        Swal.fire({
                            icon: "error",
                            title: "¡Ha ocurrido un error!",
                            text: msj["ERROR"],
                            width: "45%",
                            timer: "4500",
                            timerProgressBar: true,
                        });

                        $("#clave_registro").prop("autofocus", true);
                    } else if (
                        msj["MSJ"] ===
                        "Tu mensualidad ha vencido, recuerda realizar tu pago."
                    ) {
                        TablaAsistencias.ajax.reload();
                        $("#formularioAsistencia")[0].reset();

                        Swal.fire({
                            icon: "warning",
                            title: "Bienvenido",
                            text: "¡Tu registro de asistencia fue exitoso!",
                            footer: "<h4>" + msj["MSJ"] + "</h4>",
                            width: "45%",
                            timer: "4500",
                            timerProgressBar: true,
                        });

                        $("#clave_registro").prop("autofocus", true);
                    } else if (msj["MSJ"].startsWith("Faltan")) {
                        TablaAsistencias.ajax.reload();
                        $("#formularioAsistencia")[0].reset();

                        Swal.fire({
                            icon: "info",
                            title: "Bienvenido",
                            text: "¡Tu registro de asistencia fue exitoso!",
                            footer: "<h4>" + msj["MSJ"] + "</h4>",
                            width: "45%",
                            timer: "4500",
                            timerProgressBar: true,
                        });

                        $("#clave_registro").prop("autofocus", true);
                    } else {
                        TablaAsistencias.ajax.reload();
                        $("#formularioAsistencia")[0].reset();

                        Swal.fire({
                            icon: "success",
                            title: "Bienvenido",
                            text: "¡Tu registro de asistencia fue exitoso!",
                            footer: "<h4>" + msj["MSJ"] + "</h4>",
                            width: "45%",
                            timer: "4500",
                            timerProgressBar: true,
                        });

                        $("#clave_registro").prop("autofocus", true);
                    }
                }
            );
            // }, 1)
        }

        //Funcion  para el envio de datos
        $("#registrar").on("click", function (event) {
            event.preventDefault();
            clave_registro = $("#clave_registro").val();
            enviarAsistencia(clave_registro);
        });

        $("#clave_registro").keypress(function (event) {
            if (event.which === 13) {
                clave_registro = $("#clave_registro").val();
                event.preventDefault();
                enviarAsistencia(clave_registro);
            }
        });
    });
});
