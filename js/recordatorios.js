$(function () {
    var info = null;
    var objetos = [];
    var d = new Date();
    var f = d.getFullYear() + "-" + agregarCero((d.getMonth() + 1)) + "-" + agregarCero(d.getDate());

    document.getElementById("date").value = f;

    Object.keys(localStorage).forEach(function (clave) {
        var json = JSON.parse(localStorage.getItem(clave));
        json.key = clave;
        objetos.push(json);
    });

    objetos.sort(function (a, b) {
        return b.i - a.i;
    });

    objetos.forEach(function (json) {
        var html = `<tr> <td class='index'>${json.i}</td> <td>${json.key}</td> <td>${json.value}</td> </tr>`;
        document.getElementById("tbody").innerHTML += html;
    });

    setInterval(function () {
        var h = new Date();
        $("title").text("Recordatorios, " + h.toLocaleTimeString());
        $("#hora").html(h.toTimeString());
    }, 1000);

    $("#eliminar").click(function () {
        var index = prompt("INDEX OR CLEAR", "# OR CLEAR");
        if (index.toLowerCase() == "clear") {
            localStorage.clear();
        } else {
            var key = "";

            Object.keys(localStorage).forEach(function (clave) {
                var json = JSON.parse(localStorage.getItem(clave));
                if (index == json.i) key = clave;
            });

            localStorage.removeItem(key);

            Object.keys(localStorage).forEach(function (clave) {
                var json = JSON.parse(localStorage.getItem(clave));

                if (index < json.i) {
                    json.i--;
                    localStorage.setItem(clave, JSON.stringify(json));
                }
            });
        }
        location.reload();
    });

    $("#modificar").click(function () {
        var index = prompt("INDEX", "#");
        var key = "";

        Object.keys(localStorage).forEach(function (clave) {
            var json = JSON.parse(localStorage.getItem(clave));
            if (index == json.i) key = clave;
        });

        var valor = prompt("Modificar", JSON.parse(localStorage.getItem(key)).value);
        localStorage.setItem(key, JSON.stringify({ i: index, value: valor }));
        location.reload();
    });

    $("#registrar").click(function () {
        if (confirm("¿Desea registrar un recordatorio con la fecha seleccionada?")) {
            while (info == null) {
                info = prompt("Recordatorio");
            }

            var fecha = document.getElementById("date").value;

            d.setFullYear(fecha.substring(0, 4));
            d.setMonth(fecha.substring(5, 7) - 1);
            d.setDate(fecha.substring(8, 10));

            date = prompt("Fecha & Hora", obtenerDia(d.getDay()) + " " + fecha + ", " + d.toLocaleTimeString());

            localStorage.setItem(date, JSON.stringify({ i: localStorage.length + 1, value: info }));
            location.reload();
        } else {
            alert("¡Sí no lo intentas la probabilidad de fallar es del 100%!");
        }
    });
});

var dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");

function agregarCero(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return "" + num;
    }
}

function obtenerDia(num) {
    return dias[num];
}
