$.getScript("/js/funciones.js").done(function () {
    $(function () {
        
        $("#fecha_corte").val(fechaActualFormatoInput);

        //LE DAMOS UN VALOR A NUESTRO CAMPO DE HORA CADA VEZ QUE SE HABRA EL MODAL
        $("#ModalCorteCaja").on("shown.bs.modal", () => {
            alertToast(
                "Recuperando el detalle de corte, espere un momento por favor.",
                "info",
                3500
            );

            var currentTime = new Date().toLocaleTimeString("en-US", {
                hour12: false,
            });

            $("#hora_corte").val(currentTime);
            ObtenerInfoHome();

            TablaCorte = $("#TablaHistorialCorte").DataTable({
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
                ajax: {
                    dataType: "json",
                    data: { api: 2 },
                    method: "POST",
                    url: `${http}${servidor}/${appname}/api/corte_caja_api.php`,
                    beforeSend: function () {},
                    complete: function () {
                        TablaCorte.columns.adjust().draw();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alertErrorAJAX(jqXHR, textStatus, errorThrown);
                    },
                    dataSrc: "response.data",
                },
                columns: [
                    // { data: 'COUNT' },
                    { data: "TOTAL" },
                    { data: "REALIZADO_POR" },
                    { data: "FECHA" },
                ],
                columnDefs: [
                    // { target: 0, title: '#', className: 'all' },
                    { target: 0, title: "Total", className: "all" },
                    { target: 1, title: "Realizado por", className: "all" },
                    { target: 2, title: "Fecha", className: "all" },
                ],
            });
        });

        const myModalEl = document.getElementById("ModalCorteCaja");
        myModalEl.addEventListener("hidden.bs.modal", (event) => {
            if ($("#TablaHistorialCorte").hasClass("dataTable")) {
                $("#TablaHistorialCorte").DataTable().destroy();
                console.log("Tabla destruida");
            }
        });

        ObtenerInfoHome();
        ObtenerGraficaSubcripciones();
        ObtenerGraficaAsistencias();

        function ObtenerInfoHome() {
            data = {
                api: 3,
            };

            ajax(
                data,
                "home_api",
                { callbackAfter: true },
                false,
                function (data) {
                    info = data["response"]["data"][0];
                    $("#hombre").text(info["HOMBRE"]),
                        $("#mujer").text(info["MUJER"]),
                        $("#total").text(info["TOTAL"]),
                        $("#asistencia").text(info["ASISTENCIA"]);
                    $("#total_pagos").val(info["PAGOS"]);
                    $("#total_ventas").val(info["VENTAS"]);
                    $("#pagos").text(info["TOTAL_PAGOS"]),
                        $("#ventas").text(info["TOTAL_VENTAS"]);
                }
            );
        }

        function ObtenerGraficaSubcripciones() {
            $.ajax({
                data: { api: 2 },
                url: `${http}${servidor}/${appname}/api/home_api.php`,
                type: "POST",
                beforeSend: function () {},
                success: function (response) {
                    subdata = $.parseJSON(response);
                    data = subdata.response.data;
                    // console.log(data)

                    var meses = [
                        "Enero",
                        "Febrero",
                        "Marzo",
                        "Abril",
                        "Mayo",
                        "Junio",
                        "Julio",
                        "Agosto",
                        "Septiembre",
                        "Octubre",
                        "Noviembre",
                        "Diciembre",
                    ];
                    var suscripcionesPorMes = Array.from(
                        { length: 12 },
                        () => 0
                    );

                    for (var i = 0; i < data.length; i++) {
                        var mesIndex = parseInt(data[i].MES) - 1;
                        suscripcionesPorMes[mesIndex] = parseInt(data[i].TOTAL);
                    }

                    var ctx = document.getElementById("graficasUserTotales");
                    var myChart = new Chart(ctx, {
                        type: "bar",
                        data: {
                            labels: meses,
                            datasets: [
                                {
                                    label: "Subcripciones totales",
                                    data: suscripcionesPorMes,
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.2)",
                                        "rgba(54, 162, 235, 0.2)",
                                        "rgba(255, 206, 86, 0.2)",
                                        "rgba(75, 192, 192, 0.2)",
                                        "rgba(153, 102, 255, 0.2)",
                                        "rgba(255, 159, 64, 0.2)",
                                        "rgba(255, 99, 132, 0.2)",
                                        "rgba(54, 162, 235, 0.2)",
                                        "rgba(255, 206, 86, 0.2)",
                                        "rgba(75, 192, 192, 0.2)",
                                        "rgba(153, 102, 255, 0.2)",
                                        "rgba(255, 159, 64, 0.2)",
                                    ],
                                    borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                        "rgba(75, 192, 192, 1)",
                                        "rgba(153, 102, 255, 1)",
                                        "rgba(255, 159, 64, 1)",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                        },
                    });
                },
            });
        }

        function ObtenerGraficaAsistencias() {
            $.ajax({
                data: { api: 1 },
                url: `${http}${servidor}/${appname}/api/home_api.php`,
                type: "POST",
                beforeSend: function () {},
                success: function (response) {
                    subdata = $.parseJSON(response);
                    data = subdata.response.data;

                    // Arreglo para almacenar las horas del rango de 5 AM a 10 PM
                    var horas = [];
                    for (var i = 5; i <= 22; i++) {
                        horas.push(i.toString() + ":00");
                    }

                    // Arreglo para almacenar las asistencias por hora del rango
                    var asistencias = Array(18).fill(0); // Creamos un arreglo de 18 elementos lleno de ceros

                    // Iterar sobre los datos obtenidos y agregar las asistencias a las horas correspondientes
                    for (var i = 0; i < data.length; i++) {
                        var hora = parseInt(data[i].HORA);
                        if (hora >= 5 && hora <= 22) {
                            asistencias[hora - 5] = parseInt(
                                data[i].ASISTENCIAS
                            );
                        }
                    }

                    var ctx = document.getElementById("graficaAsistencias");
                    var myChart = new Chart(ctx, {
                        type: "line",
                        data: {
                            labels: horas,
                            datasets: [
                                {
                                    label: "Asistencias",
                                    data: asistencias,
                                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                                    borderColor: "rgba(255, 99, 132, 1)",
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true,
                                        },
                                    },
                                ],
                            },
                        },
                    });
                },
            });
        }

        FechaAño = new Date();
        año = FechaAño.getFullYear();

        // Obtenemos el elemento span mediante su id
        var spanAnio = document.getElementById("año");

        // Asignamos el año actual al texto del span
        spanAnio.textContent = año;

        ///PROCESO PARA EL CORTE DE CAJA

        $("#cerrarCaja").click(function (e) {
            e.preventDefault();

            formularioValido = validarFormulario($("#formCorte"));

            // Si el formulario es válido, procede a realizar la acción (enviarlo en este caso)
            if (formularioValido) {
                alertMensajeConfirm(
                    {
                        title: "¿Deseas cerrar este corte de caja?",
                        text: "Esta acción no se puede deshacer",
                        icon: "question",
                    },
                    function () {
                        data = {
                            api: 1,
                            hora: $("#hora_corte").val(),
                            total_pagos: $("#total_pagos").val(),
                            total_ventas: $("#total_ventas").val(),
                            registrado_por: $("#registrado_por").val(),
                        };

                        ajax(
                            data,
                            "corte_caja_api",
                            { callbackAfter: true },
                            false,
                            function (data) {
                                // $('#ModalCorteCaja').modal('hide')
                                alertToast(
                                    "Corte de caja cerrado con exito",
                                    "success",
                                    4000
                                );

                                ObtenerInfoHome();
                                TablaCorte.ajax.reload();
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
