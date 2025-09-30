let isLogin = false;
let

function cargarPreguntas() {
    const container = document.querySelector(".row");
    container.innerHTML = "";
    let indice = 0;
    const boton_enviar = document.querySelector(".boton_enviar");
    boton_enviar.style.display = "block";

    fetch('../json/data.json')
        .then(response => response.json())
        .then(data => {
            const preguntasMostradas = data.preguntas.slice(indice, indice + 2);

            preguntasMostradas.forEach(pregunta => {
                container.innerHTML += `
                            <div class="col-lg-6 col-md-6 col-12 mb-4 card-item">
                                <div class="card h-100">
                                <p>${pregunta.pregunta}</p>
                                    <div class="card-body">
                                        <div style="display: flex; flex-direction: column; gap: 6px;">
                                            <label>
                                                <input type="radio" name="${pregunta.id}" value="opcion-1">${pregunta["opcion1"]}
                                            </label>
                                            <label>
                                                <input type="radio" name="${pregunta.id}" value="opcion-2">${pregunta["opcion2"]}
                                            </label>
                                            <label>
                                                <input type="radio" name="${pregunta.id}" value="opcion-3">${pregunta["opcion3"]}
                                            </label>
                                            <label>
                                                <input type="radio" name="${pregunta.id}" value="opcion-4">${pregunta["opcion4"]}
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

    texto.innerHTML = "Buenas, " + username;
    isLogin = true;
    login.style.display = "none";
    cargarPreguntas();
}


function checkAnswers() {
    let respuesta = document.querySelector('input[name="${pregunta.id}"]:checked');
}

window.onload = function () {
    cargarPreguntas();
}