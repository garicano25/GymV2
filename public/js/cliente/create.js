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

        $("#tiempo_membresia_id").on("change", function () {
            const TIEMPO = $(this).find("option:selected").text();

            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 1);
            const futureDate = new Date();

            switch (TIEMPO) {
                case "Semana":
                    futureDate.setDate(futureDate.getDate() + 7);
                    break;
                case "Quincena":
                    futureDate.setDate(futureDate.getDate() + 15);
                    break;
                case "Mes":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 1);
                    break;
                case "Bimestre":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 2);

                    break;
                case "Trimestre":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 3);

                    break;
                case "Semestre":
                    // code block
                    futureDate.setMonth(futureDate.getMonth() + 6);

                    break;
                case "Anualidad":
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
            $("#inicio_membresia").val(currentDateString);
            $("#fin_membresia").val(futureDateString);
        });

        //Codigo para limitar la cantidad maxima que tendra dicho Input
        $("#monto").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 4
            ) {
                return false;
            }
        });

        $("#code_pin").keypress(function (event) {
            if (
                event.which < 48 ||
                event.which > 57 ||
                this.value.length === 4
            ) {
                return false;
            }
        });

        $("#generarClave").click(function () {
            clave = generarClave()

            $("#code_pin").val(clave);
            $("#textPin").text(clave);
        });

        $("#guardar").click(async function (e) {
            e.preventDefault();

            var isValid = validarFormulario($("#formUsuario"));
            if (isValid) {
                try {
                    await sendFormPostCreateorUpdate(
                        "store-client",
                        "formUsuario",
                        "guardar",
                        1 //Crear
                    );

                    Swal.fire({
                        icon: "success",
                        title: "Usuario registrado con éxito",
                        allowOutsideClick: true,
                        allowEnterKey: true,
                        timer: 4000,
                        showConfirmButton: false, 
                        timerProgressBar: true, 
                        footer: `<h4>🖨️ Imprimiendo comprobante...</h4>`,
                    });

                       
                    $("#code_pin").val('');
                    $("#textPin").text("");
                    $("#formUsuario")[0].reset();
                    
                    
                    //Imprimir comprobante
                    

                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Error al intentar guardar el Cliente: " + error,
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
    });
});
