let isLogin = false;
let contador = 0;

function cargarPreguntas() {
    const preguntasDiv = document.querySelector(".preguntas");
    preguntasDiv.style.display = "block";
    const container = document.querySelector(".row");
    container.innerHTML = "";
    let indice = 0;
    const boton_enviar = document.querySelector(".boton_enviar");
    boton_enviar.style.display = "block";

    fetch('../json/data.json')
        .then(response => response.json())
        .then(data => {
            const dataNewSort = data.preguntas.sort(() => Math.random() - 0.5);
            const preguntasMostradas = dataNewSort.slice(indice, indice + 2);

            preguntasMostradas.forEach(pregunta => {
                const opcionesNewSort = pregunta.opciones.sort(() => Math.random() - 0.5);

                container.innerHTML += `
                            <div class="col-lg-6 col-md-6 col-12 mb-4 card-item">
                                <div class="card h-100">
                                <p>${pregunta.pregunta}</p>
                                    <div class="card-body">
                                        <div style="display: flex; flex-direction: column; gap: 6px;">
                                            <label>
                                                <input type="radio" name="${pregunta.id}" value="opcion-1">${opcionesNewSort[0]}
                                            </label>
                                            <label>
                                                <input type="radio" name="${pregunta.id}" value="opcion-2">${opcionesNewSort[1]}
                                            </label>
                                            <label>
                                                <input type="radio" name="${pregunta.id}" value="opcion-3">${opcionesNewSort[2]}
                                            </label>
                                            <label>
                                                <input type="radio" name="${pregunta.id}" value="opcion-4">${opcionesNewSort[3]}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `;


            });
        })
        .catch(error => console.error('Error al cargar JSON:', error));
}

function iniciarPartida() {
    const login = document.querySelector(".login");
    const username = document.querySelector(".username").value;
    const texto = document.querySelector(".saludo");

    // if (username != "") {
        texto.innerHTML = "Buenas, " + username;
        isLogin = true;
        login.style.display = "none";
        cargarPreguntas();
    // } else {
    //     alert("Introduzca un nombre");

    // }


}


function checkAnswers() {

    dataNewSort[contador]






    // let respuesta = document.querySelector('input[name="${pregunta.id}"]:checked');
}

