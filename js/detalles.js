let evento
var id = location.search.split("?id=").filter(Number);
var selectId = id[0];
const eventoDetalles = [];
var detalle = "";

async function getData() {

    let datosApi
    await fetch("../AE.JSON")
        .then(response => response.json())
        .then(json => datosApi = json)

    evento = datosApi.eventos
    detalleCard();
}
getData();

function detalleCard(){
    for (var i = 0; i < evento.length; i++) {
        var asis_esti = evento[i].assistance ? "Assistance" : "Estimate"
        if (evento[i].id == selectId) {
            detalle += `
             <div class="card-image">
                 <img src="../recursos/${evento[i].image}" class="card-img-top image_detalle tamaño-image" alt="...">
             </div>
             <div class="card-body">
                 <h1 class="color-title">  ${evento[i].name} </h1>
                 <p class="card-text">${evento[i].description}</p>
                 <p class="card-text">Place: ${evento[i].place}</p>
                 <p class="card-text">Capacity: ${evento[i].capacity}</p>
                 <p class="card-text">Assistance: ${evento[i].assistance}</p>
                 <p class="card-text">Category: ${evento[i].category}</p>
             </div>            
                  `
        eventoDetalles.push(evento[i])
        }
    }
    document.getElementById("container_detalles").innerHTML = detalle
    console.log(document.getElementsByClassName("container_detalles"))
}


