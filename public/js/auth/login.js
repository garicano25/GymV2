$("#formIniciarSesion").submit(function (event) {
    event.preventDefault();
    $(this).find("button :submit").prop("disabled", true);
    /*DATOS Y VALIDACION DEL REGISTRO*/
    var form = document.getElementById("formIniciarSesion");
    var formData = new FormData(form);
    $.ajax({
        data: formData,
        url: "/loginAuth",
        type: "POST",
        processData: false,
        contentType: false,
        beforeSend: function () {
            Swal.fire({
                icon: "info",
                title: "Espere un momento",
                text: "Validando datos...",
            });
        },
        dataType: "json",
        success: function (data) {
            Swal.fire({
                title: "Exito!",
                text: "Inicio de Sesion Exitoso!",
                icon: "success",
                timer: 1000,
                timerProgressBar: true,
            });

            // update button
            $("#login").prop("disabled", false);

            setTimeout(() => {
                if (data.redirect) {
                    window.location.href = data.redirect;
                }
            }, 1000);
        },
        error: function (jqXHR, exception, data) {

            $("#login").prop("disabled", false);
            $("#formIniciarSesion")[0].reset();
            console.log(data)
            Swal.fire({
                title: "Error al Inicar Sesion!",
                text: "Usuario o contraseña incorrectos",
                icon: "error",
                timer: 2500,
                timerProgressBar: true,
            });
            return false;
        },
    });
});
