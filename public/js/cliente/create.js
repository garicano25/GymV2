$.getScript("/js/funciones.js").done(function () {
    $(function () {
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

        $("#tiempo_pago").on("change", function () {
            TIEMPO = $(this).val();

            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 1);
            const futureDate = new Date();

            switch (TIEMPO) {
                case "SEMANA":
                    futureDate.setDate(futureDate.getDate() + 7);
                    break;
                case "QUINCENA":
                    futureDate.setDate(futureDate.getDate() + 15);
                    break;
                case "MES":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 1);
                    break;
                case "BIMESTRE":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 2);

                    break;
                case "TRIMESTRE":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 3);

                    break;
                case "SEMESTRE":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 6);

                    break;
                case "ANUALIDAD":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 12);

                    break;
                default:
                // code block
            }

            // Restar un día a la fecha final
            futureDate.setDate(futureDate.getDate() - 1);

            // Formatear las fechas en formato "YYYY-MM-DD"
            const currentDateString = currentDate.toISOString().slice(0, 10);
            const futureDateString = futureDate.toISOString().slice(0, 10);

            // Establecer los valores en los campos de entrada de tipo "date"
            $("#inicio_mes").val(currentDateString);
            $("#fin_mes").val(futureDateString);
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

        $("#generarClave").click(function () {
            $("#clave_acceso").val(generarClave());
            $("#textPin").text(generarClave());
        });

        $("#guardar").click(function (e) {
            e.preventDefault();

            formularioValido = validarFormulario($("#formUsuario"));

            // Si el formulario es válido, procede a realizar la acción (enviarlo en este caso)
            if (formularioValido) {
                alertMensajeConfirm(
                    {
                        title: "¿Deseas registrar este nuevo usuario?",
                        text: "Se añadira un nuevo usuario",
                        icon: "question",
                    },
                    function () {
                        atendidoPor = "Personal Administrativo";
                        clave_acceso = $("#clave_acceso").val();
                        nombre_completo = $("#nombre_completo").val();
                        inicio_mes = $("#inicio_mes").val();
                        fin_mes = $("#fin_mes").val();
                        monto_pago = $("#monto_pago").val();
                        sexo = $("#sexo").val();
                        tipo_pago = $("#tipo_pago").val();
                        tiempo_pago = $("#tiempo_pago").val();
                        correo = $("#correo").val();

                        data = {
                            api: 1,
                            nombre_completo: nombre_completo,
                            clave_acceso: clave_acceso,
                            inicio_mes: inicio_mes,
                            fin_mes: fin_mes,
                            monto_pago: monto_pago,
                            sexo: sexo,
                            correo: correo,
                            tipo_pago: tipo_pago,
                            tiempo_pago: tiempo_pago,
                        };

                        ajax(
                            data,
                            "usuarios_api",
                            { callbackAfter: true },
                            false,
                            function (data) {
                                error = data["response"]["data"][0]["MSJ"];

                                if (error) {
                                    alertToast(`${error}`, "error", 4500);
                                } else {
                                    $("#formUsuario")[0].reset();

                                    Swal.fire({
                                        icon: "success",
                                        title: "Usuario registrado con exito",
                                        allowOutsideClick: false,
                                        allowEnterKey: true,
                                        footer: `<h1> Clave de acceso :  <b> ${clave_acceso} </b></h1>`,
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
