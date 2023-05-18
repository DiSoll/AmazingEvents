
let texto = "";
let fechaBase
let eventos
const eventosPasados = [];
const eventosFuturos = [];
let contac = [];
let estats = [];
let formulario = document.getElementById("form")
let arrayFiltrar = [];
let ulNombreEventos = document.getElementById("todosLosEventos")
var searchContainer = document.getElementById("containerSearch")
let checkedCheckboxes = []
let search = ""
var inputSearch = document.getElementById("inputSearch")
var checkboxCategory = document.getElementById("checkCategories")
var estadisticas = document.getElementById("estadisticas")
var buttonNavegacion = []
var nameCarrusel = document.getElementById("name-carrusel")

async function getData() {

    let datosApi
    await fetch("../AE.JSON")
        .then(response => response.json())
        .then(json => datosApi = json)

    eventos = datosApi.eventos
    fechaBase = datosApi.fechaActual
    console.log(datosApi)

    for (var i = 0; i < eventos.length; i++) {
        if (eventos[i].date > fechaBase) {
            eventosFuturos.push(eventos[i]);
        }
        else {
            eventosPasados.push(eventos[i]);
        }
    }

    var time = location.search.split("?time=");
    switch (time[1]) {

        case "pastEvents": imprimir("pastEvents")
            break;

        case "upcomingEvents": imprimir("upcomingEvents")
            break;

        case "contact": imprimir("contact")
            break;

        case "stats": imprimir("stats")
            break;

        default:
            imprimir("home")
            break;
            
    }
}
getData()


var buttonNav = document.getElementsByClassName("nav-link");
for (var i = 0; i < buttonNav.length; i++) {
    const element = buttonNav[i];
    buttonNavegacion.push(buttonNav[i].innerText)
    element.addEventListener("click", function (e) {
        
        imprimir(e.target.id);
    })
}

function imprimir(id) {
    
    switch (id) {

        case "upcomingEvents":
            nameCarrusel.innerHTML = "UPCOMING EVENTS"
            inputSearch.value = ""
            checkedCheckboxes = []
            display(eventosFuturos)
            arrayFiltrar = eventosFuturos
            searchContainer.style.display = "flex"
            ulNombreEventos.style.display = "flex"
            formulario.style.display = "none"
            checkboxCategory.style.display = "flex"
            estadisticas.style.display = "none"
            eventsCategories(eventosFuturos)
            window.history.replaceState(null, null, window.location.origin+"/index.html?time=upcomingEvents");
            break;

        case "pastEvents":
            nameCarrusel.innerHTML = "PAST EVENTS"
            inputSearch.value = ""
            checkedCheckboxes = []
            display(eventosPasados)
            arrayFiltrar = eventosPasados
            searchContainer.style.display = "flex"
            ulNombreEventos.style.display = "flex"
            formulario.style.display = "none"
            checkboxCategory.style.display = "flex"
            estadisticas.style.display = "none"
            eventsCategories(eventosPasados)
            window.history.replaceState(null, null, window.location.origin+"/index.html?time=pastEvents");
            break;

        case "contact":
            nameCarrusel.innerHTML = "CONTACT"
            imprimirFormulario()
            searchContainer.style.display = "none"
            ulNombreEventos.style.display = "none"
            formulario.style.display = "flex"
            checkboxCategory.style.display = "none"
            estadisticas.style.display = "none"
            window.history.replaceState(null, null, window.location.origin+"/index.html?time=contact");
            break;

        case "stats":
            nameCarrusel.innerHTML = "STATS"
            imprimirStats()
            texto = ""
            searchContainer.style.display = "none"
            ulNombreEventos.style.display = "none"
            formulario.style.display = "none"
            checkboxCategory.style.display = "none"
            estadisticas.style.display = "flex"
            window.history.replaceState(null, null, window.location.origin+"/index.html?time=stats");
            break;

        default:
            nameCarrusel.innerHTML = "HOME"
            inputSearch.value = ""
            checkedCheckboxes = []
            arrayFiltrar = eventos
            searchContainer.style.display = "flex"
            ulNombreEventos.style.display = "flex"
            formulario.style.display = "none"
            checkboxCategory.style.display = "flex"
            estadisticas.style.display = "none"
            display(eventos)
            eventsCategories(eventos)
            window.history.replaceState(null, null, window.location.origin+"/index.html?time=home");
            break;
    }
}



// TARJETAS:

function display(array) {
    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += `
          <div class="col-md-6 col-lg-4 col-xl-4 mx-auto ">
              <div class="cardEfect effect card style " style="width: 19rem; height: 25rem; ">
                  <div >
                    <img src="../recursos/${array[i].image}" class="card-img-top" alt=${array[i].name}>
                  </div>
                  <div class="card-body">
                    <h6 class="card-title">${array[i].name}</h6>
                    <p class="card-text">${array[i].description}</p>
                  </div>
                  <div class="card-precio">
                    <p> Precio: $ ${array[i].price}</p>
                  </div>
                  <div class="card-detalle" >
                    <a href="../pagina/detalle.html?id=${array[i].id}">
                    <button type="button" class="btn btn-outline-danger">Mas detalles</button></a>
                  </div>
              </div>
          </div>
         `
    }
        ulNombreEventos.innerHTML = html
}

// TITULO DINAMICO: CARRUSEL

var botonNext = document.getElementById("next")
botonNext.addEventListener("click", function (e) {
    var page = document.getElementById("name-carrusel").innerText
    if (buttonNavegacion.indexOf(page) == 4) {
        changePage(0)
    } else {
        changePage(buttonNavegacion.indexOf(page) + 1)
    }
})

var botonAfter = document.getElementById("after")
botonAfter.addEventListener("click", function (e) {
    var page = document.getElementById("name-carrusel").innerText
    if (buttonNavegacion.indexOf(page) == 0) {
        changePage(4)
    } else {
        changePage(buttonNavegacion.indexOf(page) - 1)
    }
})

function changePage(i) {

    switch (i) {
        case 0: display(eventos)
            document.getElementById("name-carrusel").innerHTML = buttonNavegacion[i]
            inputSearch.value = ""
            checkedCheckboxes = []
            arrayFiltrar = eventos
            searchContainer.style.display = "flex"
            ulNombreEventos.style.display = "flex"
            formulario.style.display = "none"
            checkboxCategory.style.display = "flex"
            estadisticas.style.display = "none"
            display(eventos)
            eventsCategories(eventos)
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=home");

            break;

        case 1: display(eventosFuturos)
            document.getElementById("name-carrusel").innerHTML = buttonNavegacion[i]
            inputSearch.value = ""
            checkedCheckboxes = []
            display(eventosFuturos)
            arrayFiltrar = eventosFuturos
            searchContainer.style.display = "flex"
            ulNombreEventos.style.display = "flex"
            formulario.style.display = "none"
            checkboxCategory.style.display = "flex"
            estadisticas.style.display = "none"
            eventsCategories(eventosFuturos)
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=upcomingEvents");
            break;

        case 2: display(eventosPasados)
            document.getElementById("name-carrusel").innerHTML = buttonNavegacion[i]
            inputSearch.value = ""
            checkedCheckboxes = []
            display(eventosPasados)
            arrayFiltrar = eventosPasados
            searchContainer.style.display = "flex"
            ulNombreEventos.style.display = "flex"
            formulario.style.display = "none"
            checkboxCategory.style.display = "flex"
            estadisticas.style.display = "none"
            eventsCategories(eventosPasados)
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=pastEvents");
            break;

        case 3: imprimirFormulario()
            document.getElementById("name-carrusel").innerHTML = buttonNavegacion[i]
            searchContainer.style.display = "none"
            ulNombreEventos.style.display = "none"
            formulario.style.display = "flex"
            checkboxCategory.style.display = "none"
            estadisticas.style.display = "none"
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=contact");
            break;

        case 4: imprimirStats()
            document.getElementById("name-carrusel").innerHTML = buttonNavegacion[i]
            imprimirStats()
            texto = ""
            searchContainer.style.display = "none"
            ulNombreEventos.style.display = "none"
            formulario.style.display = "none"
            checkboxCategory.style.display = "none"
            estadisticas.style.display = "flex"
            window.history.replaceState(null, null, window.location.origin + "/index.html?time=stats");
            break;
    }
}

//SEARCH:

inputSearch.addEventListener("keyup", function (evento) {
    var datoInput = evento.target.value
    search = datoInput.trim().toLowerCase()
    filtrosCombinados()
})

//FORMULARIO

function imprimirFormulario() {
    formulario.innerHTML = `
    
        <div class="content">
            <h1 class="logo">Contact <span>Us</span></h1> <br><br>
            <div class="contact-wrapper animated bounceInUp">
                <div class="contact-form">
                    <form action="">
                       <p>
                          <label>Nombre y Apellido</label> 
                          <input type="text" name="Nombre y Apellido">
                       </p>
                       <p>
                          <label>Email</label>
                          <input type="email" name="Email">
                       </p>
                       <p>
                          <label>Numero de telefono</label>
                          <input type="tel" name="Numero de telefono">
                       </p>
                       <p class="block">
                          <label>Mensaje</label>
                          <textarea name="Mensaje" rows="3"></textarea>
                       </p>
                       <p class="block">
                          <button> ENVIAR </button>
                       </p>
                    </form>
                </div>
                <div class="contact-info">
                    <h4>Mas Info</h4>
                    <ul>
                        <li> Ubicacion : Hipodromo de Palermo                   
                        </li>
                    </ul>
                    <p>Los eventos estan asociados a CocaCola. Veni a disfrutar con toda tu familia.
                    </p>
                    <p>CoCaCola.com
                    </p>
                </div>
            </div>
        </div><br><br><br><br><br>
    `
    let form = document.querySelector("form")
    form.addEventListener("submit", function (event) { actionForm(event) })
}


// PAGINA STATS


//CREACION DINAICA DE CHECKBOX POR CATEGORIA:

function eventsCategories(array) {

    let categories = array.map(evento => evento.category)
    let unica = new Set(categories)
    let lastCategories = [...unica]
    let categoriasEventos = ""
    lastCategories.map(category =>
        categoriasEventos += `

            <div class="row ">
                <br><br>
                <div class="col-auto me-auto">
                    <label ><input type="checkbox" value="${category}"> ${category}</label>
                </div>
            </div>   
                `
    )
    document.getElementById("checkCategories").innerHTML = categoriasEventos
    checkboxListener()
}


function checkboxListener() {
    var checkboxs = document.querySelectorAll('input[type=checkbox')
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].addEventListener("change", function (e) {
           checkedCheckboxes = []

            for (i = 0; i < checkboxs.length; i++) {
               if (checkboxs[i].checked) {
                   checkedCheckboxes.push(checkboxs[i].value)
                }
            }
                filtrosCombinados()
        })
    }
}

function filtrosCombinados() {
    var filtrado = []
    if (search !== "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category => filtrado.push(...arrayFiltrar.filter(evento =>
            evento.name.toLowerCase().includes(search) && evento.category === category))
        )
    }
    else if (search != "" && checkedCheckboxes.length == 0) {
        filtrado = arrayFiltrar.filter(evento => evento.name.toLowerCase().includes(search))
    }
    else if (search === "" && checkedCheckboxes.length > 0) {
        checkedCheckboxes.map(category =>
            filtrado.push(...arrayFiltrar.filter(evento => evento.category === category))
        )
    }
    else {
        filtrado = arrayFiltrar
    }

    filtrado.length > 0 ? display(filtrado) : ulNombreEventos.innerHTML = `
    <h1 class = ceroResult> No se encontraron elementos para tu busqueda </h1> 
    
    `
}









