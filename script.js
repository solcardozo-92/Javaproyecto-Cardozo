let nombreUsuario = "";

// Función para inicializar la app y checar si ya recibió mensaje hoy
function iniciarOraculo() {
  const input = document.getElementById("nombre");
  const modal = document.getElementById("modal");
  const saludo = document.getElementById("saludo");

  // Checar si hay nombre guardado
  const nombreGuardado = localStorage.getItem("nombreUsuario");
  if (nombreGuardado) {
    nombreUsuario = nombreGuardado;
    modal.style.display = "none";
  }

  // Ver si ya recibió un mensaje hoy 
  const hoy = new Date().toDateString();
  const ultimoAcceso = localStorage.getItem("ultimoAcceso");

  if (ultimoAcceso === hoy) {
    saludo.innerText = `✨ Hola ${nombreUsuario || "alma bella"}, ya recibiste tu mensaje de hoy. Volvé mañana para más sabiduría ✨`;
  } else if (nombreUsuario) {
    saludo.innerText = `✨ Hola ${nombreUsuario}, el universo tiene un mensaje para vos... ✨`;
  } else {
    modal.style.display = "flex"; // Mostramos modal si no hay nombre
  }
}

// Función para guardar el nombre
function guardarNombre() {
  const input = document.getElementById("nombre");
  nombreUsuario = input.value.trim() || "alma bella";
  localStorage.setItem("nombreUsuario", nombreUsuario);

  document.getElementById("modal").style.display = "none";

  const saludo = document.getElementById("saludo");
  saludo.innerText = `✨ Hola ${nombreUsuario}, el universo tiene un mensaje para vos... ✨`;
}

// Función para mostrar mensaje del oráculo
function mostrarMensaje() {
  const mensajeDiv = document.getElementById("mensaje");

  const hoy = new Date().toDateString();
  const ultimoAcceso = localStorage.getItem("ultimoAcceso");

  if (ultimoAcceso === hoy) {
    mensajeDiv.classList.remove("visible");
    mensajeDiv.innerText = "✨ Ya recibiste tu mensaje de hoy, que tengas un bonito día lleno de magia. Nos vemos mañana✨";
    setTimeout(() => mensajeDiv.classList.add("visible"), 100);
    return;
  }

  const mensajes = [
    "Confiá en el proceso. El universo está obrando a tu favor. 🌌",
    "Lo que crees, creas. Hablate bonito, pensá en todo lo increible que podés conseguir. Respirá hondo y dalo todo 🌱",
    "Dejá ir lo que no vibra con vos. 💫",
    "Hablale bonito a los demás, sonreíles. Nunca sabés las luchas que están atravesando los otros. Se luz para los otros, todo lo bueno que das siempre vuelve 🌷",
    "Abre tu corazón: el amor llega en formas inesperadas. 💖",
    "Respira. Estás exactamente donde debés estar. 🌈",
    "Si estabas esperando una señal. Es esta 🌙",
    "Sonreí, te ves increíble hoy☀️",
    "Recordá tu poder, sos magia pura.✨ ",
    "Lo que buscas también te está buscando. 🌻",
    "Si vas a sobrepensar que sea imaginando todos los escenarios en que todo sale bien 💫",
    "Nunca nadie se arrepiente de ser valiente, dalo todo✨ ",
    "Viniste a ser feliz, no te distraigas💖 ",
    "Y si todo sale bien?☀️",
    "Lo que es para vos siempre te encuentra💖",
    "Si tenés que forzarlo no es de tu talle, aplica para ropa, trabajos y para todo en la vida🌈",
    "Respirá y mirá a tu alrededor. Cuánto de lo que tenés hoy es lo que soñaba tu yo de hace dos, tres, siete años? Tomate un momento para agradecer/te, ahora seguí adelante por tus sueños☀️",


  ];

  const randomIndex = Math.floor(Math.random() * mensajes.length);
  const mensajeSeleccionado = mensajes[randomIndex];

  mensajeDiv.classList.remove("visible");
  mensajeDiv.innerText = mensajeSeleccionado;
  setTimeout(() => mensajeDiv.classList.add("visible"), 100);

  localStorage.setItem("ultimoAcceso", hoy);
}

// Funcion al cargar la pagina 
window.onload = iniciarOraculo;
