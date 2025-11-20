
// Oráculo PRO - script.js
// Genera la UI desde JS, carga mensajes desde mensajes.json (fetch), usa SweetAlert2 para pedir nombre,
// muestra mensajes aleatorios, y guarda historial en localStorage.

const APP_KEY = 'oraculoPRO_v1';
let state = {
  nombre: localStorage.getItem(APP_KEY + '_nombre') || '',
  mensajes: [],
  historial: JSON.parse(localStorage.getItem(APP_KEY + '_historial') || '[]')
};

function qs(sel){ return document.querySelector(sel); }
function ce(tag){ return document.createElement(tag); }

async function init(){
  // Generar estructura principal desde JS
  const app = qs('#app');
  app.innerHTML = ''; // limpio por si acaso

  const title = ce('h1');
  title.textContent = '🌿 Lo que necesitabas leer hoy 🌞';
  app.appendChild(title);

  const caja = ce('div');
  caja.className = 'caja-oraculo';
  caja.id = 'caja-oraculo';

  const saludo = ce('p');
  saludo.id = 'saludo';
  saludo.textContent = 'Presiona el botón para recibir tu mensaje del universo 🌸';
  caja.appendChild(saludo);

  const boton = ce('button');
  boton.id = 'btn-revelar';
  boton.textContent = 'Revelar mensaje ✨';
  caja.appendChild(boton);

  const mensajeDiv = ce('div');
  mensajeDiv.id = 'mensaje';
  caja.appendChild(mensajeDiv);

  app.appendChild(caja);

  // contenedor de historial
  const historyWrap = ce('section');
  historyWrap.className = 'history';
  historyWrap.id = 'history';
  const hh = ce('h3');
  hh.textContent = 'Historial de mensajes recibidos';
  historyWrap.appendChild(hh);
  const ul = ce('ul');
  ul.id = 'historial-list';
  historyWrap.appendChild(ul);
  app.appendChild(historyWrap);

  // listeners
  boton.addEventListener('click', mostrarMensajeAleatorio);
  // Si no hay nombre guardado, pedirlo ahora con SweetAlert2
  if(!state.nombre){
    const { value } = await Swal.fire({
      title: '🌻 Bienvenida',
      text: '¿Cuál es tu nombre?',
      input: 'text',
      inputPlaceholder: 'Escribí tu nombre...',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    state.nombre = (value || 'alma bella').trim();
    localStorage.setItem(APP_KEY + '_nombre', state.nombre);
  }

  // cargar mensajes desde JSON
  await cargarMensajes();
  // render saludo personalizado
  qs('#saludo').textContent = `✨ Hola ${state.nombre}, el universo tiene un mensaje para vos... ✨`;
  // render historial inicial
  renderHistorial();
}

async function cargarMensajes(){
  try{
    const res = await fetch('mensajes.json');
    if(!res.ok) throw new Error('Error al cargar mensajes.json');
    state.mensajes = await res.json();
  }catch(e){
    // Si falla el fetch, cargamos una lista por defecto (resiliencia)
    state.mensajes = [
      { id: 1, texto: 'Confía en el proceso. El universo está obrando a tu favor. 🌌' },
      { id: 2, texto: 'Hoy es un día perfecto para sembrar intenciones. 🌱' }
    ];
    console.error(e);
    Swal.fire({ icon: 'warning', title: 'Atención', text: 'No se pudieron cargar los mensajes remotos. Se usará una lista local.' });
  }
}

function mostrarMensajeAleatorio(){
  if(!state.mensajes.length) return;
  const idx = Math.floor(Math.random() * state.mensajes.length);
  const seleccionado = state.mensajes[idx].texto;

  const mensajeDiv = qs('#mensaje');
  mensajeDiv.classList.remove('visible');
  // animación: breve delay para que el fade funcione
  setTimeout(() => {
    mensajeDiv.textContent = seleccionado;
    mensajeDiv.classList.add('visible');
  }, 100);

  // guardar en historial con fecha y nombre
  const entrada = {
    id: Date.now(),
    nombre: state.nombre,
    texto: seleccionado,
    fecha: new Date().toISOString()
  };
  state.historial.unshift(entrada);
  // mantener solo los últimos 20 registros
  state.historial = state.historial.slice(0, 20);
  localStorage.setItem(APP_KEY + '_historial', JSON.stringify(state.historial));
  renderHistorial();
}

function renderHistorial(){
  const ul = qs('#historial-list');
  ul.innerHTML = '';
  if(!state.historial.length){
    const li = ce('li');
    li.textContent = 'Aún no recibiste mensajes. Cada vez que reveles uno aparecerá aquí.';
    ul.appendChild(li);
    return;
  }
  state.historial.forEach(h => {
    const li = ce('li');
    const d = new Date(h.fecha);
    li.innerHTML = `<strong>${d.toLocaleString()}</strong> — ${h.texto}`;
    ul.appendChild(li);
  });
}

// arrancar
document.addEventListener('DOMContentLoaded', init);
