

function cargarPreguntas(){
    fetch('../json/data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error al cargar JSON:', error));
}

window.onload = function() {
    cargarPreguntas();
}