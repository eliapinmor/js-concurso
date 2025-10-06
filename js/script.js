let isLogin = false;
let contador = 0;
let indice = 0;
let dataNewSort = [];
let i_name = 0;
let isCorrect = false;
let preguntasMostradas = [];


function cargarPreguntas() {
    const preguntasDiv = document.querySelector(".preguntas");
    preguntasDiv.style.display = "block";
    const container = document.querySelector(".row");
    container.innerHTML = "";
    const boton_enviar = document.querySelector(".boton_enviar");
    boton_enviar.style.display = "block";

    fetch('../json/data.json')
        .then(response => response.json())
        .then(data => {
            if (indice === 0) {
                dataNewSort = data.preguntas.sort(() => Math.random() - 0.5);
            }
            preguntasMostradas = dataNewSort.slice(indice, indice + 2);

            preguntasMostradas.forEach(pregunta => {
                const opcionesArray = pregunta.opciones.map(o => {
                    console.log(Object.keys(o))
                    const key = Object.keys(o)[0];
                    return { key, text: o[key] };
                });

                const opcionesNewSort = opcionesArray.sort(() => Math.random() - 0.5);

                const opcionesHTML = opcionesNewSort.map((op, i) => `
                    <label>
                        <input type="radio" name="${i_name}" value="${op.key}">
                        ${op.text}
                    </label>
                    `).join("");

                container.innerHTML += `
          <div class="col-lg-6 col-md-6 col-12 mb-4 card-item">
            <div class="card h-100">
              <p>${pregunta.pregunta}</p>
              <div class="card-body">
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  ${opcionesHTML}
                </div>
              </div>
            </div>
          </div>
        `;
                i_name++;
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
    const respuesta1 = document.querySelector(`input[name="${contador}"]:checked`).value;
    console.log(respuesta1);
        if (respuesta1 === preguntasMostradas[contador].opcion_correcta){
        console.log("opcion correcta");
    }
    contador++;

    const respuesta2 = document.querySelector(`input[name="${contador}"]:checked`).value;

    console.log(respuesta2);


    indice += 2;
    cargarPreguntas();

}

