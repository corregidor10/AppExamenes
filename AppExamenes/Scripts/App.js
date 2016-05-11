'use strict';

function getAlumno() {

    var busqueda = $("#txtBus").val();
    var checkValue = "nada";
    var requestUrl;

    var radiobutton = document.getElementsByName("criterioBusqueda");

    for (var i = 0; i < radiobutton.length; i++) {
        if (radiobutton[i].checked)
            checkValue = radiobutton[i].value;
    }

    $("#resultado").empty();
    $("#resultado").append($("<img>", { src: "_layouts/images/gears_an.gif" }));

    switch (checkValue) {

        case "Alumno":

            requestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('Alumno')/items?$filter=nombre eq '" + busqueda + "'";

            $.ajax({
                type: "GET",
                url: requestUrl,
                contentType: "application/json",
                headers: {
                    "accept": "application/json;odata=verbose",
                },
                success: onReturnDataAlumno,
                error: function (xhr) {
                    alert(xhr.status);
                }
            });

            break;

        case "Asignatura":

            requestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('Asignatura')/items?$filter=nombreMateria eq '" + busqueda + "'";

            $.ajax({
                type: "GET",
                url: requestUrl,
                contentType: "application/json",
                headers: {
                    "accept": "application/json;odata=verbose",
                },
                success: onReturnDataAsignatura,
                error: function (xhr) {
                    alert(xhr.status);
                }
            });

            break;

        case "AlumnoAsignatura":

            busqueda = parseInt(busqueda);

            requestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('AlumnoAsignatura')/items?$filter=nota gt " + busqueda;

            $.ajax({
                type: "GET",
                url: requestUrl,
                contentType: "application/json",
                headers: {
                    "accept": "application/json;odata=verbose"
                },
                success: onReturnDataNota,
                error: function (xhr) {
                    alert(xhr.status);
                }
            });

            break;

        case "nada":
            alert("Hay que marcar un radio button, artista");
            break;
    }
}

function onReturnDataAlumno(data) {

    $("#resultado").empty();


    var oDataResult = data.d.results;
    
    if (oDataResult.length > 0) {

        var tableHeader = "<thead>" +
                      "<td>Nombre</td>" +
                      "<td>Apellidos</td>" +
                      "<td>DNI</td>" +
                      "<td>Edad</td>" +
                     "</thead>";

        var table = $("<table>", { id: "alumnosTable" }).append($(tableHeader));

        $.each(oDataResult,
            function (i, item) {
                var row = "<tr>" +
                    "<td>" +
                    item.nombre +
                    "</td>" +
                    "<td>" +
                    item.apellidos +
                    "</td>" +
                    "<td>" +
                    item.dni +
                    "</td>" +
                    "<td>" +
                    item.edad +
                    "</td></tr>";

                table.append(row);

            });
        $("#resultado").append(table);

    }
    else {
        $("#resultado").append($("<img>", { src: "Travolta.gif" }));

    }
    
}

function onReturnDataAsignatura(data) {

    $("#resultado").empty();
    var oDataResult = data.d.results;

    if (oDataResult.length>0) {
        var tableHeader = "<thead>" +
                      "<td>Materia</td>" +
                      "</thead>";

        var table = $("<table>", { id: "alumnosTable" }).append($(tableHeader));


        $.each(oDataResult,
            function (i, item) {
                var row = "<tr>" + "<td>" + item.nombreMateria + "</td></tr>";

                table.append(row);

            });

        $("#resultado").append(table);
    }
    else {
        $("#resultado").append($("<img>", { src: "Travolta.gif" }));
    }


}

function onReturnDataNota(data) {

    $("#resultado").empty();
    var oDataResult = data.d.results;

    if (oDataResult.length>0) {
        var tableHeader = "<thead>" +
                      "<td>idAlumno</td>" +
                      "<td>idExamen</td>" +
                       "<td>Nota</td>" +
                      "</thead>";

        var table = $("<table>", { id: "alumnosTable" }).append($(tableHeader));

        $.each(oDataResult, function (i, item) {
            var row = "<tr>" + "<td>" + item.idAlumno + "</td>" + "<td>" + item.idMateria + "</td>" + "<td>" + item.nota + "</td></tr>";

            table.append(row);

        });

        $("#resultado").append(table);
    }
    else {
        $("#resultado").append($("<img>", { src: "Travolta.gif" }));
    }


}

$(document).ready(function () {
    $("#btnBus").click(getAlumno);
});

//var requestUrl = "http://grupo33.azurewebsites.net/DataServiceExamenes.svc/Alumno?$filter=nombre eq'"+alumno+"'&$format=json";