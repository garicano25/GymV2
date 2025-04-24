$.getScript("/js/funciones.js").done(function () {
    $(function () {

        $("#btnCrearUser").click(async function () {
            var isValid = validarFormulario($("#formUser"));
            if (isValid) {
                try {
                    await sendFormPostCreateorUpdate(
                        "/register-user",
                        "formUser",
                        "btnCrearUser"
                    );
                    actionsAfterSuccess(TablaUsuarios, "formUser", "modalCreateUser", "btnCrearUser");
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

        var TablaUsuarios = $("#TablaUsuarios").DataTable({
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
            },
            lengthChange: true,
            lengthMenu: [
                [20, 35, 50, -1],
                [20, 35, 50, "Todos"],
            ],
            info: false,
            paging: true,
            searching: true,
            filtering: true,
            ajax: {
                dataType: "json",
                data: {},
                method: "GET",
                url: "/getUsers",
                beforeSend: function () { },
                complete: function () {
                    TablaUsuarios.columns.adjust().draw();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                },
                dataSrc: "",
            },
            createdRow: function (row, data, dataIndex) {
                if (data.status_id != 1) {
                    $(row).css({
                        "background-color": "#D7DBDD",
                        cursor: "not-allowed",
                        opacity: "0.8",
                    });
                } else if (data.status_id == 1 && data.fecha_pago_fin) {

                    if (convertirCadenaAFecha(fechaActualFormatoInput) > convertirCadenaAFecha(data.fecha_pago_fin)) {
                        $(row).css({
                            "background-color": "#FFCCCC",
                            border: "1px solid #FF0000",
                            color: "#FF0000",
                            opacity: "0.8",
                        });
                    }
                }
            },

            columns: [
                { data: "username" },
                { data: "dirreccion" },
                { data: "telefono" },
                {
                    data: null,
                    render: function (meta, data) {
                        let html = "";
                        html = `
                        <span class="badge" style="background: ${meta.color_primario}; border: 1px solid #000000">Color 1</span>
                        <span class="badge" style="background: ${meta.color_secundario}; border: 1px solid #000000">Color 2</span>`;
                        return html;
                    },
                },
                { data: "pago_mensual" },
                { data: "fecha_pago_inicio" },
                { data: "fecha_pago_fin" },
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
                { target: 0, title: "Username", className: "all text-center" },
                { target: 1, title: "Direcion", className: "all text-center" },
                { target: 2, title: "Telefono", className: "all text-center" },
                { target: 3, title: "Colores", className: "all text-center" },
                { target: 4, title: "Pago", className: "all text-center" },
                {
                    target: 5,
                    title: "Fecha Inicio Pago",
                    className: "all text-center",
                },
                {
                    target: 6,
                    title: "Fecha Fin Pago",
                    className: "all text-center",
                },
                { target: 7, title: "Acciones", className: "all text-center" },
            ],
        });

        //Editar User
        $("#TablaUsuarios tbody").on("click", "td>button.editar", function () {
            var tr = $(this).closest("tr");
            var row = TablaUsuarios.row(tr);

            editDatoTabla(row.data(), "formUser", "modalCreateUser");

            Toast.fire({
                icon: "success",
                title: "Datos consultados correctamente!",
                timer: 2000
            });

            $("#usersModal").modal("show");
        });
        
        
        
        //Activar User
        $("#TablaUsuarios tbody").on("click", "td>button.active", function () {
            var tr = $(this).closest("tr");
            var row = TablaUsuarios.row(tr);

            var activo = row.data().status_id == 1 ? "Inactivar" : "Activar";

            Swal.fire({
                title: `Decea ${activo} al usuario ${row.data().username}?`,
                text: "Nota: Si se Inactiva al usuario este no podra iniciar sesion!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `Si, ${activo}!`,
                cancelButtonText: "No, cancelar!",
                reverseButtons: true,
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            dataType: "json",
                            type: "POST",
                            url: "/user-active",
                            headers: {
                                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                            },
                            data: {
                                id: row.data().id,
                                estado: row.data().status_id,
                            },
                            beforeSend: function () { },
                            success: function () {
                                // message
                                Toast.fire({
                                    icon: "success",
                                    title: "Usuario actualizado con exito!",
                                    timer: 2000
                                });

                                TablaUsuarios.ajax.reload();
                            },
                            error: function () {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Error al intentar actualizar el estado del usuario, intentelo nuevamente!",
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
        $("#TablaUsuarios tbody").on("click", "td>button.eliminar", function () {
            var tr = $(this).closest("tr");
            var row = TablaUsuarios.row(tr);

            Swal.fire({
                title: `Decea eliminar al Usuario ${row.data().username}?`,
                text: "Esta acción es irreversible!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `Si, eliminar!`,
                cancelButtonText: "No, cancelar!",
                reverseButtons: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await sendFormPostDelete("/user-delete", 0, row.data().id);
                        TablaUsuarios.ajax.reload();
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
                            text:
                                "Error al intentar eliminar el Gym intentelo de nuevo! " +
                                error,
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
        });
      
        

        
    })
});
