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
        const opcionesArray = pregunta.opciones.map(o => {
          const key = Object.keys(o)[0];
          return { key, text: o[key] };
        });

        const opcionesNewSort = opcionesArray.sort(() => Math.random() - 0.5);

        const opcionesHTML = opcionesNewSort.map((op, i) => `
          <label>
            <input type="radio" name="pregunta-${pregunta.id}" value="${op.key}">
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
indice += 2;
  const container = document.querySelector(".row");

  cargarPreguntas(container);
    


}

