$.getScript("/js/funciones.js").done(function () {
    $(function () {

        fechon = $("#fechaRegistroVentas").val(fechaActualFormatoInput);
        $("#fechaActual").text(obtenerFechaActualTexto());


        dataRegistroVentas = {
            all: 0,
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
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                method: "POST",
                url: `getVentas`,
                beforeSend: function () {
                    Toast.fire({
                        icon: "info",
                        title: "Estamos cargando tu solicitud, esto puede demorar un rato",
                        timer: 1500,
                        // width: 'auto'
                    });
                },
                complete: function () {
                    TablaVentas.columns.adjust().draw();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                },
                dataSrc: {},
            },
            columns: [
                { data: "PRODUCTO" },
                { data: "PRECIO" },
                { data: "CANTIDAD" },
                { data: "TOTAL" },
                { data: "FECHA" },
            ],
            columnDefs: [
                { target: 0, title: "Producto", className: "all text-center" },
                { target: 1, title: "Precio", className: "all text-center" },
                { target: 2, title: "Cantidad vendida", className: "all text-center" },
                { target: 3, title: "Total de la venta", className: "all text-center" },
                { target: 4, title: "Fecha", className: "all text-center" },
            ],
        });

        //Guardar venta
        $("#btnRegistrarVenta").on("click", async function (e) {
            e.preventDefault();

            
            var isValid = validarFormulario($("#formVenta"));
            if (isValid) {
                try {
                    await sendFormPostCreateorUpdate(
                        "/saveSell",
                        "formVenta",
                        "btnRegistrarVenta"
                    );

                    $("#formVenta")[0].reset();
                    Toast.fire({    
                        icon: "success",
                        title: "Venta registrada con exito",
                        timer: 2000,
                    });

                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Error al intentar registrar la venta: " + error,
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





        // ===================================== FUNCIONES ADICIONALE =========================================

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
            
            if (fecha === 1 && fecha2 === 1) {
                dataRegistroVentas = { all: 0 };
                dataTotalVendido = {all: 0,};
                
            } else {
                
                dataRegistroVentas = { all: 1 };
                dataTotalVendido = { all: 1 };
                                
            }

            if (fecha) dataRegistroVentas["fechaRegistroVentas"] = $("#fechaRegistroVentas").val();
            if (fecha2) dataTotalVendido["fechaRegistroVentas"] = $("#fechaRegistroVentas").val();

            recuperarTotalVendido(dataTotalVendido, "ventas");

            TablaVentas.ajax.reload();
        }

        dataTotalVendido = {
            all: 0,
            fechaRegistroVentas: $("#fechaRegistroVentas").val(),
        };

        recuperarTotalVendido(dataTotalVendido, "ventas");

       
    });
});
