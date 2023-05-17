
function actionForm(event){
    event.preventDefault()
    
let formData = {
    nombres: event.target[0].value,
    correo: event.target[1].value,
    telefono: event.target[2].value
}
    console.log(formData)
}


