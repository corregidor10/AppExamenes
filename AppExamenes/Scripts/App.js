'use strict';

function getAlumno() {

    var alumno = $("#txtBus").val();

    

    $("#resultado").empty();
    $("#resultado").append($("<img>", { src: "_layouts/images/gears_an.gif" }));

    var requestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('Alumno')/items?$filter=nombre eq '" + alumno+"'";

   

    $.ajax({
        type: "GET",
        url: requestUrl,
        contentType: "application/json",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: onReturnData,
        error: function (xhr) {
            alert(xhr.status);
        }
    });

    }

function onReturnData(data) {

    $("#resultado").empty();
    var oDataResult = data.d.results;

    var tableHeader = "<thead>" +
                       "<td>Nombre</td>" +
                       "<td>Apellidos</td>" +
                       "<td>DNI</td>" +
                       "<td>Edad</td>" +
                      "</thead>";

    var table = $("<table>", { id: "alumnosTable" }).append($(tableHeader));

    $.each(oDataResult,
        function(i, item) {
            var row = "<tr>" +"<td>" +item.nombre +"</td>" +"<td>" +item.apellidos +"</td>" +"<td>" +item.dni +"</td>" +"<td>" +item.edad +"</td></tr>";

            table.append(row);

        });

    $("#resultado").append(table);


}

$(document).ready(function() {
    $("#btnBus").click(getAlumno);
});










//var requestUrl = spPageContextInfo.webAbsoluteUrl + "_api/lists/getByTitle('Alumno')/items";

//var requestUrl = "http://grupo33.azurewebsites.net/DataServiceExamenes.svc/Alumno?$filter=nombre eq'"+alumno+"'&$format=json";