$("#formIniciarSesion").submit(function (event) {
    event.preventDefault();
    $(this).find("button :submit").prop("disabled", true);
    /*DATOS Y VALIDACION DEL REGISTRO*/
    var form = document.getElementById("formIniciarSesion");
    var formData = new FormData(form);
    formData.set("api", 2);
    $.ajax({
        data: formData,
        url: "../../gym/api/seguridad_api.php",
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
            data = data["response"];
            if (data["data"] == 1) {
                Swal.fire({
                    title: "Bienvenido",
                    text: "Su registro ha sido exitoso",
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                }).then(function () {
                    window.location = "../index.php?vista=Home/index";
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: data["msj"],
                    timer: 3000,
                    timerProgressBar: true,
                });

                $(this).find("button :submit").prop("disabled", false);
                if (data == "Oops! Tu contraseña es incorrecta.") {
                    console.log("mal contra");
                    $('#formIniciarSesion input[name="pass"]').css(
                        "color",
                        "red"
                    );
                } else {
                    $('#formIniciarSesion input[name="user"]').css(
                        "color",
                        "red"
                    );
                }
            }
        },
        error: function (jqXHR, exception, data) {
            Swal.fire({
                title: "Error!",
                text: data,
                icon: "error",
            });
        },
    });
});
