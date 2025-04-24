$.getScript("/js/funciones.js").done(function () {
    $(function () {
        const modalView = document.getElementById("modalCreateView");
        modalView.addEventListener("hide.bs.modal", () => {
            $("#formView")[0].reset();
            $("#id").val(0);
        });

        //Crear vista
        $("#btnCrearView").click(async function () {
            var isValid = validarFormulario($("#formView"));
            if (isValid) {
                try {
                    await sendFormPostCreateorUpdate(
                        "/store-view",
                        "formView",
                        "btnCrearView",
                        1
                    );
                    actionsAfterSuccess(
                        TablaViews,
                        "formView",
                        "modalCreateView",
                        "btnCrearView"
                    );
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "Error al intentar guardar la vista: " + error,
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

        //Listar Vistas
        var TablaViews = $("#TablaViews").DataTable({
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
                url: "/getView",
                beforeSend: function () {},
                complete: function () {
                    TablaViews.columns.adjust().draw();
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
                }
            },

            columns: [
                { data: "id" },
                { data: "nombre" },
                { data: "ruta" },
                {
                    data: null,
                    render: function (meta, data) {
                        let html = "";
                        html = `<i class="${meta.icono}" ></i>`;
                        return html;
                    },
                },
                {
                    data: null,
                    render: function (meta, data) {
                        if (meta.status_id === 1) {
                            texto = "Desactivar";
                        } else {
                            texto = "Activar";
                        }

                        let html = `
                        <button class="btn btn-sm btn-warning font-semibold rounded-lg editar" title="Editar"><i class='bx bxs-edit' ></i></button>
                        <button class="btn btn-sm btn-secondary font-semibold rounded-lg active" title="Desactivar"><i class='bx bx-power-off' ></i> ${texto}</button>
                        <button class="btn btn-sm btn-danger font-semibold ml-5 rounded-lg eliminar" title="Eliminar"><i class='bx bx-trash'></i></button>`;

                        return html;
                    },
                },
            ],
            columnDefs: [
                { target: 0, title: "Id", className: "all text-center" },
                { target: 1, title: "Nombre", className: "all text-center" },
                { target: 2, title: "Ruta", className: "all text-center" },
                { target: 3, title: "Icono", className: "all text-center" },
                { target: 4, title: "Acciones", className: "all text-center" },
            ],
        });

        //Editar User
        $("#TablaViews tbody").on("click", "td>button.editar", function () {
            var tr = $(this).closest("tr");
            var row = TablaViews.row(tr);

            editDatoTabla(row.data(), "formView", "modalCreateView");

            Toast.fire({
                icon: "success",
                title: "Datos consultados correctamente!",
                timer: 2000,
            });

            $("#usersModal").modal("show");
        });

        //Activar User
        $("#TablaViews tbody").on("click", "td>button.active", function () {
            var tr = $(this).closest("tr");
            var row = TablaViews.row(tr);

            var activo = row.data().status_id == 1 ? "Inactivar" : "Activar";

            Swal.fire({
                title: `Decea ${activo} la vista ${row.data().nombre}?`,
                text: "Nota: Si se Inactiva no se tendra acceso a la vista!",
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
                        url: "/viewActive",
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
                                title: "Vista actualizada con exito!",
                                timer: 2000,
                            });

                            TablaViews.ajax.reload();
                        },
                        error: function () {
                            Swal.fire({
                                title: "Error!",
                                text: "Error al intentar actualizar el estado de la vista, intentelo nuevamente!",
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

        //Eliminar View
        $("#TablaViews tbody").on("click", "td>button.eliminar", function () {
            var tr = $(this).closest("tr");
            var row = TablaViews.row(tr);

            Swal.fire({
                title: `Decea eliminar la vista ${row.data().nombre}?`,
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
                            "/store-view",
                            -1,
                            row.data().id
                        );
                        TablaViews.ajax.reload();

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
                                "Error al intentar eliminar la vista intentelo de nuevo! " +
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

        // ============= FUNCIONES RELACION USER - VIEW
        const myModalEl = document.getElementById("modalRelView");
        myModalEl.addEventListener("hidden.bs.modal", (event) => {
            $(".view").prop("checked", false);
            $("#formUserView")[0].reset();
        });

        //Crear relacion gym-vista
        $("#btnCrearRel").click(async function () {
            var isValid = validarFormulario($("#formUserView"));
            if (isValid) {
                try {
                    await sendFormPostCreateorUpdate(
                        "/store-view",
                        "formUserView",
                        "btnCrearRel",
                        2
                    );

                    actionsAfterSuccess(
                        TablaViewGym,
                        "formUserView",
                        "modalRelView",
                        "btnCrearRel"
                    );
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text:
                            "Error al intentar guardar la asignacion de vistas: " +
                            error,
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

        //Listar Vistas relacionadas
        var TablaViewGym = $("#TablaViewGym").DataTable({
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
                url: "/getGymViews",
                beforeSend: function () {},
                complete: function () {
                    TablaViewGym.columns.adjust().draw();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                },
                dataSrc: "",
            },
            columns: [
                { data: "username" },
                { data: "vistas_asignadas" },
                {
                    data: null,
                    render: function (meta, data) {
                        let html = `
                        <button class="btn btn-sm btn-warning font-semibold rounded-lg editar" title="Editar"><i class='bx bxs-edit' ></i></button>
                        
                        <button class="btn btn-sm btn-danger font-semibold ml-5 rounded-lg eliminar" title="Eliminar"><i class='bx bx-trash'></i></button>`;

                        return html;
                    },
                },
                { data: "vistas_id" },
                { data: "gym_id" },
            ],
            columnDefs: [
                { target: 0, title: "Usuario", className: "all text-center" },
                { target: 1, title: "Vistas", className: "all text-center" },
                { target: 2, title: "Acciones", className: "all text-center" },
                { target: 3, title: "Ids", className: "none", visible: false },
                { target: 4, title: "Id", className: "none", visible: false },
            ],
        });

        //Editar Relacion de vista
        $("#TablaViewGym tbody").on("click", "td>button.editar", function () {
            var tr = $(this).closest("tr");
            var row = TablaViewGym.row(tr);

            $("#gym_id").val(row.data().gym_id);

            const numerosString = row.data().vistas_id;
            const arrayNumeros = numerosString
                .split(",")
                .map((num) => num.trim());

            arrayNumeros.forEach((numero) => {
                $(`#view_${numero}`).prop("checked", true);
            });

            Toast.fire({
                icon: "success",
                title: "Datos consultados correctamente!",
                timer: 2000,
            });

            $("#modalRelView").modal("show");
        });

        //Eliminar relacion Gyn-View
        $("#TablaViewGym tbody").on("click", "td>button.eliminar", function () {
            var tr = $(this).closest("tr");
            var row = TablaViewGym.row(tr);

            Swal.fire({
                title: `Decea eliminar la relacion de vistas para el usuario ${row.data().username}?`,
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
                            "/store-view",
                            -2,
                            row.data().gym_id
                        );
                        TablaViewGym.ajax.reload();

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
                                "Error al intentar eliminar la vista intentelo de nuevo! " +
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


    });
});
