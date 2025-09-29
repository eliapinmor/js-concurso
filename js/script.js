function cargarPreguntas() {
    const container = document.querySelector(".row");
    container.innerHTML = "";
    let indice = 0;

    fetch('../json/data.json')
        .then(response => response.json())
        .then(data => {
            const preguntasMostradas = data.preguntas.slice(indice, indice + 2);

            preguntasMostradas.forEach(pregunta => {
                container.innerHTML += `<p>${pregunta.pregunta}</p>`;

            });
        })
        .catch(error => console.error('Error al cargar JSON:', error));
}

function iniciarPartida(){
    const username = document.querySelector(".username").value;
    const texto = document.querySelector(".saludo");
    texto.innerHTML = "Buenas, " + username;

}

window.onload = function () {
    cargarPreguntas();
}