var fechaOriginal = new Date()
const fechaActual = formatearFecha(fechaOriginal);
// var fechaActualFormatoInput = fechaOriginal.toISOString().slice(0, 10);


// Obtiene la diferencia en minutos entre la zona horaria local y UTC
var zonaHorariaOffset = fechaOriginal.getTimezoneOffset();

// Ajusta la fecha para mostrar la fecha local
fechaOriginal = new Date(fechaOriginal.getTime() - (zonaHorariaOffset * 60000)); // 60000 ms = 1 minuto

// Formatea la fecha en una cadena compatible con input type "date"
var fechaActualFormatoInput = fechaOriginal.toISOString().slice(0, 10);



const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))


function recuperarTotalVendido(dataRecibida, api_php, modulo) {

    ajax(dataRecibida, api_php, { callbackAfter: true }, false, function (data) {

        info = data['response']['data'][0]
        $("#total_vendido").text("Total de "+ modulo + ' : ' + info['TOTAL']);

    })
}


function obtenerFechaActualTexto() {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = meses[fechaActual.getMonth()];
    const año = fechaActual.getFullYear();

    return ` - ${dia} de ${mes} del ${año}`;
}

function convertirCadenaAFecha(fechaTexto) {
    const partesFecha = fechaTexto.split("-");
    if (partesFecha.length !== 3) {
        // Asegurarse de que la cadena tenga el formato correcto
        return null; // Si no es un formato válido, devolver null
    }

    const dia = parseInt(partesFecha[2], 10);
    const mes = parseInt(partesFecha[1], 10);
    const año = parseInt(partesFecha[0], 10);

    if (isNaN(dia) || isNaN(mes) || isNaN(año)) {
        // Asegurarse de que las partes sean números válidos
        return null; // Si no son números válidos, devolver null
    }

    // El mes en JavaScript comienza desde 0, así que restamos 1 al mes
    return new Date(año, mes - 1, dia);
}


function generarClave() {
    return parseInt(Math.random() * (1 + 9999 - 1000) + 100)
}

function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1; 
    const año = fechaObj.getFullYear();

  
    const diaFormateado = dia.toString().padStart(2, '0');
    const mesFormateado = mes.toString().padStart(2, '0');

    return `${diaFormateado}-${mesFormateado}-${año}`;
}



if (window.innerWidth <= 768) {
    position = 'top';
} else {
    position = 'top';
    // position = 'top-start';
}

const Toast = Swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});



function alertMensaje(icon = 'success', title = '¡Completado!', text = 'Datos completados', footer = null, html = null, timer = null) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        html: html,
        footer: footer,
        timer: timer
        // width: 'auto',
    })
}


function alertSelectTable(msj = 'No ha seleccionado ningún registro', icon = 'error', timer = 2000) {
    Toast.fire({
        icon: icon,
        title: msj,
        timer: timer,
        // width: 'auto'
    });
}


function alertSelectTable(msj = 'No ha seleccionado ningún registro', icon = 'error', timer = 2000) {
    Toast.fire({
        icon: icon,
        title: msj,
        timer: timer,
        // width: 'auto'
    });
}

function alertToast(msj = 'No ha seleccionado ningún registro', icon = 'error', timer = 3000) {
    Toast.fire({
        icon: icon,
        title: msj,
        timer: timer,
        // width: 'auto'
    });
}


function validarFormulario(form) {
    
    var formulario = form;

    // Busca todos los elementos input dentro del formulario y agrega la clase
    formulario
        .find("input[required], select[required], textarea[required]")
        .addClass("validar");

    // Busca todos los elementos con la clase "validar"
    var campos = $('.validar');
    var formularioValido = true;

    // Recorre los campos para verificar que tengan un valor no vacío
    campos.each(function () {
        if ($(this).val().trim() === '') {
            formularioValido = false;
            return false; // Detiene la iteración si se encuentra un campo vacío
        }
    });

    return formularioValido;
}


function enviarComprobate(formData){
     $.ajax({
        url: 'https://gymvalross.com/gym/api/pagos_api.php',  // Reemplaza 'tu_api.php' con la URL de tu API PHP
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
         success: function (data) {
            
            if (isNaN(data)) {

                alertToast(`${data}`, 'error', 4500)

            } else {

        
                $("#formData")[0].reset();       
                alertMensaje('success', 'Comprobante enviado', 'Su pago esta en proceso de confirmación')

            }
        },
        error: function(error) {
            // console.error(error);
            alertErrorAJAX(jqXHR, exception, data)
        }
    });
}

function recuperarPagosSinConfirmar() {

    data = {
        api: 6
    }
    ajax(data, "pagos_api", { callbackAfter: true }, false, function (data) {

        info = data['response']['data'][0]
        $("#pagos_sin_confirma").text(info['PAGOS_SIN_CONFIRMAR']);

    })
}


//================================================== Funciones de envio nuevo V2
 function openModal(onlyIdModal, onlyIdForm) {
    $("#" + onlyIdForm)[0].reset();
    $("#" + onlyIdForm)
        .find('input[type="hidden"][name="id"]')
        .val(0);
    $("#" + onlyIdModal).modal("show");
}

 function actionsAfterSuccess(
    tabla,
    onlyIdForm,
    onlyIdModal,
    onlyIdButton,
    textAlert = "Registro Guardado con exito!"
) {
    tabla.ajax.reload();

    $("#" + onlyIdForm)[0].reset();
    $("#" + onlyIdModal).modal("hide");

    // update button
    $("#" + onlyIdButton).prop("disabled", false);

    Swal.fire({
        title: "Exito!",
        text: textAlert,
        icon: "success",
        timer: 3500,
        timerProgressBar: true,
    });
}

 function toastEmptyFieldForm(params) {
    Toast.fire({
        icon: "error",
        title: "Verifique que todos los campos tengan un valor!",
    });
}

 function sendFormPostCreateorUpdate(
    route,
    onlyIdForm,
    onlyIdButton,
    api = 0
) {
    return new Promise((resolve, reject) => {
        $.ajax({
            dataType: "json",
            type: "POST",
            url: route,
            data: $("#" + onlyIdForm).serialize() + "&api=" + api,
            beforeSend: function () {
                $("#" + onlyIdButton).prop("disabled", true);
            },
            success: function (response) {
                $("#" + onlyIdButton).prop("disabled", false);

                if (response.success === false) {
                    reject(response.message);
                } else {
                    resolve(1);
                }
            },
            error: function (xhr) {
                $("#" + onlyIdButton).prop("disabled", false);

                if (xhr.responseJSON) {
                    reject(
                        xhr.responseJSON.message ||
                            "Ocurrió un error inesperado."
                    );
                } else {
                    alert(
                        "Error de conexión con el servidor. Intentelo mas tarde"
                    );
                }
            },
        });
    });
}

 function sendFormPostDelete(route, api = 0, id = 0) {
    return new Promise((resolve, reject) => {
        $.ajax({
            dataType: "json",
            type: "POST",
            url: route,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            data: {
                id: id,
                api: api,
            },
            success: function (response) {
                if (response.success === false) {
                    reject(response.message);
                } else {
                    resolve(1);
                }
            },
            error: function () {
                if (xhr.responseJSON) {
                    reject(
                        xhr.responseJSON.message ||
                            "Ocurrió un error inesperado."
                    );
                } else {
                    alert(
                        "Error de conexión con el servidor. Intentelo mas tarde"
                    );
                }
            },
        });
    });
}


 function editDatoTabla(
     data,
     form = "OnlyForm",
     modalID = "ModalID",
     formComplete = 0
 ) {
     //Limpiamos el form en donde vamos a insertar nuestros datos
     $("#" + form).each(function () {
         this.reset();
     });

     //La variable formComplete nos sirve para decir si es un formulario completo con select, radio, checkbox, textarea, y text, number
     if (formComplete == 0) {
         //Recorremos e insertamos los datos en los campos
         for (var key in data) {
             if (data.hasOwnProperty(key)) {
                 if (
                     !key.startsWith("btn") &&
                     key !== "created_at" &&
                     key !== "updated_at"
                 ) {
                     var input = $("#" + form).find(`input[name='${key}']`);
                     if (input.length) {
                         input.val(data[key]);
                     } else {
                         $("#" + form)
                             .find(`textarea[name='${key}']`)
                             .val(data[key]);
                     }
                 }
             }
         }

         //Abrimos el modal
         $("#" + modalID).modal("show");
     } else {
         //RECOREMOS EL FOMULARIO PRINCIPAL
         for (var key in data) {
             if (data.hasOwnProperty(key)) {
                 if (
                     !key.startsWith("BTN") &&
                     key !== "created_at" &&
                     key !== "updated_at"
                 ) {
                     var input = $("#" + form).find(
                         `input[name='${key}'][type='text'], input[name='${key}'][type='number']`
                     );
                     var date = $("#" + form).find(
                         `input[name='${key}'][type='date']`
                     );
                     var time = $("#" + form).find(
                         `input[name='${key}'][type='time']`
                     );
                     var hidden = $("#" + form).find(
                         `input[name='${key}'][type='hidden']`
                     );
                     var textarea = $("#" + form)
                         .find(`textarea[name='${key}']`)
                         .val(data[key]);
                     var select = $("#" + form)
                         .find(`select[name='${key}']`)
                         .val(data[key]);

                     if (input.length) {
                         input.val(data[key]);
                     } else if (textarea.length) {
                         textarea.val(data[key]);
                     } else if (select.length) {
                         select.val(data[key]);
                     } else if (date.length) {
                         date.val(data[key]);
                     } else if (time.length) {
                         time.val(data[key]);
                     } else if (hidden.length) {
                         hidden.val(data[key]);
                     } else {
                         $("#" + form)
                             .find(
                                 `input[name='${key}'][value='${data[key]}'][type='radio']`
                             )
                             .prop("checked", true);

                         $("#" + form)
                             .find(
                                 `input[name='${key}'][value='${data[key]}'][type='checkbox']`
                             )
                             .prop("checked", true);
                     }
                 }
             }
         }

         //Abrimos el modal
         $("#" + modalID).modal("show");
     }
 }