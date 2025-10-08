let isLogin = false;
let contador = 0;
let indice = 0;
let dataNewSort = [];
let i_name = 0;
let isGanado = "No";
let preguntasMostradas = [];
let storage = [];
let usernameObj = "";


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
  const mensaje = document.querySelector(".mensaje");
  mensaje.innerHTML = "";
  usernameObj = username;

  if (username != "") {
    texto.innerHTML = "Buenas, " + username;
    isLogin = true;
    login.style.display = "none";
    cargarPreguntas();
  } else {
    alert("Introduzca un nombre")
  }


}


function checkAnswers() {
  const mensaje = document.querySelector(".mensaje");
  mensaje.innerHTML = "";
  const respuesta1 = document.querySelector(`input[name="${contador}"]:checked`).value;


  if (respuesta1 !== preguntasMostradas[0].opcion_correcta) {

    mensaje.innerHTML = "Respuesta incorrecta, volviendo a inicio...";
    guardarDatos();
    setTimeout(() => {
      volverInicio();
    }, 1000);
    return;
  }
  contador++;
  const respuesta2 = document.querySelector(`input[name="${contador}"]:checked`).value;


  if (respuesta2 !== preguntasMostradas[1].opcion_correcta) {
    mensaje.innerHTML = "Respuesta incorrecta, volviendo a inicio...";
    guardarDatos();
    setTimeout(() => {
      volverInicio();
    }, 1000);
    return;
  }

  contador++;

  if (contador >= dataNewSort.length - 1) {
    mensaje.style.color = "green";
    mensaje.innerHTML = "Has ganado";
    isGanado = "Sí";
    guardarDatos();
    setTimeout(() => {
      volverInicio();
    }, 1000);
    return;
  }

  indice += 2;
  cargarPreguntas();

}


function volverInicio() {
  const login = document.querySelector(".login");
  login.style.display = "block";

  const preguntasDiv = document.querySelector(".preguntas");
  preguntasDiv.style.display = "none";

  const container = document.querySelector(".row");
  container.style.display = "";
  container.innerHTML = "";


  const saludo = document.querySelector(".saludo");
  saludo.style.display = "none";

  const boton_enviar = document.querySelector(".boton_enviar");
  boton_enviar.style.display = "none";

  const mensaje = document.querySelector(".mensaje");
  mensaje.innerHTML = "";
  mensaje.style.color = "";



  isLogin = false;
  contador = 0;
  indice = 0;
  dataNewSort = [];
  i_name = 0;
  preguntasMostradas = [];
  isGanado = "No";
  usernameObj = "";

}

function guardarDatos(){
  //crear un objeto y guardarlo en el array storage[]
  
  let newObject = {
    jugador: usernameObj,
    aciertos: contador,
    ganado: isGanado
  };

  storage.push(newObject)

}