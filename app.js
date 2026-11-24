"use strict";

/* ==========================================================================
   CONFIGURACIÓN
   ========================================================================== */
const ANIO = 2026;
/* SOLO PARA PRUEBAS: true = todas las casillas se pueden abrir sin esperar a su día.
   En la versión final, ponerlo en false (el desbloqueo día a dia sigue implementado). */
const DESBLOQUEAR_TODO = true;
const CLAVE_STORAGE = "adviento-2026-abiertas";

// Qué día va en cada celda del grid (las letras son las de grid-template-areas
// en style.css). Cambia aquí los números para recolocar los días.
const DIA_POR_CELDA = {
  a: 1,  b: 15, c: 7,  d: 19, e: 11, f: 22,
  g: 24, h: 20,  i: 13, j: 3,  k: 17, l: 9,
  m: 21, n: 2,  o: 14, p: 6,  q: 4, r: 10,
  s: 5,  t: 23, u: 8,  v: 16, w: 12, x: 18
};

/* ==========================================================================
   FECHA Y ESTADO
   ========================================================================== */

// Fecha actual; con ?fecha=AAAA-MM-DD se simula ese día (modo prueba).
function ahora() {
  const p = new URLSearchParams(location.search).get("fecha");
  const m = p && /^(\d{4})-(\d{2})-(\d{2})$/.exec(p);
  if (m) {
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    if (d.getMonth() === +m[2] - 1) return d; // fecha válida
  }
  return new Date();
}

function estaDesbloqueado(dia) {
  return DESBLOQUEAR_TODO || ahora() >= new Date(ANIO, 11, dia, 0, 0, 0);
}

function esHoy(dia) {
  const n = ahora();
  return n.getFullYear() === ANIO && n.getMonth() === 11 && n.getDate() === dia;
}

// ?reset=1 borra las celdas abiertas guardadas.
if (new URLSearchParams(location.search).get("reset") === "1") {
  try { localStorage.removeItem(CLAVE_STORAGE); } catch (e) { /* sin storage */ }
}

function cargarAbiertas() {
  try {
    const lista = JSON.parse(localStorage.getItem(CLAVE_STORAGE) || "[]");
    return new Set(lista.filter(n => Number.isInteger(n) && n >= 1 && n <= 24));
  } catch (e) {
    return new Set();
  }
}

function guardarAbiertas() {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify([...abiertas]));
  } catch (e) { /* sin storage: solo dura mientras la página esté abierta */ }
}

const abiertas = cargarAbiertas();

// Matiz (0-359) para el degradado de respaldo cuando falta la foto.
function tono(dia) { return (dia * 37) % 360; }

/* ==========================================================================
   CONSTRUCCIÓN DEL TABLERO
   ========================================================================== */
const grid = document.getElementById("grid");
const aviso = document.getElementById("aviso");
const celdas = {}; // dia -> botón

// Colores rojo/verde/dorado repartidos para que celdas vecinas no repitan.
// La adyacencia se deduce de grid-template-areas, que ya está en el CSS.
function calcularColores() {
  const colores = {};
  const areas = getComputedStyle(grid).gridTemplateAreas;
  const filas = (areas.match(/"([^"]*)"/g) || []).map(f => f.replace(/"/g, "").trim().split(/\s+/));
  const vecinos = {};
  filas.forEach((fila, r) => fila.forEach((l, c) => {
    vecinos[l] = vecinos[l] || new Set();
    [[r + 1, c], [r, c + 1]].forEach(([r2, c2]) => {
      const l2 = filas[r2] && filas[r2][c2];
      if (l2 && l2 !== l) {
        vecinos[l].add(l2);
        (vecinos[l2] = vecinos[l2] || new Set()).add(l);
      }
    });
  }));
  Object.keys(DIA_POR_CELDA).forEach((letra, i) => {
    const usados = new Set([...(vecinos[letra] || [])].map(v => colores[v]));
    const libre = [0, 1, 2].find(k => !usados.has(k));
    colores[letra] = libre !== undefined ? libre : i % 3;
  });
  return colores;
}

const SVG_CANDADO =
  '<svg class="candado" viewBox="0 0 24 24" aria-hidden="true">' +
  '<path d="M17 9V7a5 5 0 0 0-10 0v2H5v12h14V9h-2zM9 7a3 3 0 0 1 6 0v2H9V7z"/></svg>';

function construirTablero() {
  const colores = calcularColores();
  // Orden de tabulación = orden de días
  const porDia = Object.entries(DIA_POR_CELDA).sort((a, b) => a[1] - b[1]);

  porDia.forEach(([letra, dia]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "celda c" + colores[letra];
    btn.dataset.celda = letra;
    btn.style.gridArea = letra;
    btn.style.setProperty("--h", tono(dia));

    const img = document.createElement("img");
    img.className = "foto";
    img.alt = "";
    img.src = (DIAS[dia] && DIAS[dia].foto) || "";
    img.onerror = () => btn.classList.add("sin-foto"); // fallback: degradado
    btn.appendChild(img);

    const num = document.createElement("span");
    num.className = "num";
    num.textContent = dia;
    btn.appendChild(num);
    btn.insertAdjacentHTML("beforeend", SVG_CANDADO);

    btn.addEventListener("click", () => alPulsar(dia, btn));
    celdas[dia] = btn;
    grid.appendChild(btn);
    actualizarCelda(dia);
  });
}

function actualizarCelda(dia) {
  const btn = celdas[dia];
  const abierta = abiertas.has(dia);
  const libre = estaDesbloqueado(dia);
  btn.classList.toggle("abierta", abierta);
  btn.classList.toggle("bloqueada", !libre && !abierta);
  btn.classList.toggle("disponible", libre && !abierta);
  btn.classList.toggle("hoy", libre && !abierta && esHoy(dia));
  const estado = abierta ? "abierto" : libre ? "disponible" : "bloqueado";
  btn.setAttribute("aria-label", "Día " + dia + ", " + estado);
}

/* ==========================================================================
   INTERACCIÓN
   ========================================================================== */
const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let temporizadorAviso;

function avisar(texto) {
  aviso.textContent = texto;
  aviso.classList.add("visible");
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove("visible"), 2200);
}

function animar(btn, clase, ms) {
  btn.classList.remove(clase);
  void btn.offsetWidth; // reinicia la animación
  btn.classList.add(clase);
  setTimeout(() => btn.classList.remove(clase), ms);
}

function alPulsar(dia, btn) {
  if (btn.dataset.girando) return;

  if (!estaDesbloqueado(dia)) {
    animar(btn, "shake", 400);
    avisar("Todavía no: se abre el " + dia + " de diciembre");
    return;
  }

  if (abiertas.has(dia)) { // ya abierta: volver a ver su contenido
    mostrarContenido(dia, btn);
    return;
  }

  // Primera apertura: giro, se revela la foto a mitad y luego el contenido
  abiertas.add(dia);
  guardarAbiertas();
  const total = reducirMovimiento ? 0 : 600;
  btn.dataset.girando = "1";
  if (total) animar(btn, "giro", total);
  setTimeout(() => actualizarCelda(dia), total / 2);
  setTimeout(() => {
    delete btn.dataset.girando;
    mostrarContenido(dia, btn);
  }, total);
}

/* ==========================================================================
   CONTENIDO AL ABRIR
   ==========================================================================
   renderContenido(dia) es el ÚNICO sitio que decide qué se ve al abrir una
   celda. Ahora mismo: foto + título (solo el número) + texto + lista (todo opcional salvo la foto) de data.js dentro de un
   modal. Para cambiarlo, edita solo esta función: rellena `cont` (el interior
   del modal) con lo que quieras. El título debe conservar id="modal-titulo"
   para que el diálogo siga etiquetado. El resto (abrir/cerrar, Esc, foco)
   está más abajo y no hace falta tocarlo.
   ========================================================================== */
/* Botón que muestra el vale y permite descargarlo (como PNG; si no se puede, como SVG). */
function crearBotonVale(vale) {
  const caja = document.createElement("div");
  caja.className = "vale-caja";
  const ver = document.createElement("button");
  ver.type = "button";
  ver.className = "btn-vale";
  ver.textContent = "Ver mi vale";
  ver.addEventListener("click", () => {
    const img = document.createElement("img");
    img.className = "vale-img";
    img.src = vale.ruta;
    img.alt = vale.alt;
    const bajar = document.createElement("button");
    bajar.type = "button";
    bajar.className = "btn-vale";
    bajar.textContent = "Descargar vale";
    bajar.addEventListener("click", () => descargarVale(vale.ruta, vale.archivo));
    ver.replaceWith(img, bajar);
  });
  caja.appendChild(ver);
  return caja;
}

function guardarArchivo(url, nombre) {
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function descargarVale(ruta, archivo) {
  const img = new Image();
  img.onload = () => {
    try {
      const c = document.createElement("canvas");
      c.width = 2000; c.height = 880;
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(b => {
        if (!b) return guardarArchivo(ruta, "vale.svg");
        const u = URL.createObjectURL(b);
        guardarArchivo(u, archivo);
        setTimeout(() => URL.revokeObjectURL(u), 4000);
      }, "image/png");
    } catch (e) { guardarArchivo(ruta, "vale.svg"); }
  };
  img.onerror = () => guardarArchivo(ruta, "vale.svg");
  img.src = ruta;
}

function renderContenido(dia) {
  const cont = document.getElementById("modal-contenido");
  const datos = DIAS[dia] || { foto: "", lista: [] };
  cont.textContent = "";

  // Foto, con degradado de color si no carga
  const img = document.createElement("img");
  img.className = "modal-foto" + (datos.cubrir ? " modal-foto--cubrir" : "");   // cubrir: llena todo el marco recortando
  img.alt = "Foto del día " + dia;
  img.src = datos.foto;
  img.onerror = () => {
    const vacio = document.createElement("div");
    vacio.className = "modal-foto modal-foto--vacia";
    vacio.style.setProperty("--h", tono(dia));
    img.replaceWith(vacio);
  };
  cont.appendChild(img);

  // Título y lista
  const texto = document.createElement("div");
  texto.className = "modal-texto";
  const h2 = document.createElement("h2");
  h2.id = "modal-titulo";
  h2.textContent = dia;
  texto.appendChild(h2);
  [].concat(datos.texto || []).forEach(t => {   // "texto" puede ser un párrafo o una lista de párrafos
    const p = document.createElement("p");
    p.className = "modal-mensaje";
    p.textContent = t;
    texto.appendChild(p);
  });
  if (datos.vale) texto.appendChild(crearBotonVale(datos.vale));
  if ((datos.lista || []).length) {
    const ul = document.createElement("ul");
    datos.lista.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    texto.appendChild(ul);
  }
  cont.appendChild(texto);
}

/* ==========================================================================
   MODAL (abrir, cerrar, foco)
   ========================================================================== */
const modal = document.getElementById("modal");
const caja = document.getElementById("modal-caja");
const botonCerrar = document.getElementById("modal-cerrar");
const principal = document.getElementById("principal");
let elementoPrevio = null;

function mostrarContenido(dia, btn) {
  renderContenido(dia);
  elementoPrevio = btn;
  modal.hidden = false;
  principal.inert = true;
  botonCerrar.focus();
}

function cerrarModal() {
  if (modal.hidden) return;
  modal.hidden = true;
  principal.inert = false;
  if (elementoPrevio) elementoPrevio.focus();
}

botonCerrar.addEventListener("click", cerrarModal);
modal.addEventListener("click", e => { if (e.target === modal) cerrarModal(); });

document.addEventListener("keydown", e => {
  if (modal.hidden) return;
  if (e.key === "Escape") {
    cerrarModal();
  } else if (e.key === "Tab") { // el foco no sale del diálogo
    const f = caja.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    if (!f.length) return;
    const primero = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  }
});

construirTablero();

// PROVISIONAL: botón "Reiniciar calendario" (borra las celdas abiertas guardadas)
// Confirmación en dos pasos dentro de la página (confirm() no funciona en todos los entornos).
const botonReiniciar = document.getElementById("reiniciar");
let temporizadorReinicio;
botonReiniciar.addEventListener("click", () => {
  if (!botonReiniciar.dataset.confirmar) {
    botonReiniciar.dataset.confirmar = "1";
    botonReiniciar.textContent = "¿Seguro? Pulsa otra vez";
    temporizadorReinicio = setTimeout(() => {
      delete botonReiniciar.dataset.confirmar;
      botonReiniciar.textContent = "Reiniciar calendario";
    }, 3000);
    return;
  }
  clearTimeout(temporizadorReinicio);
  delete botonReiniciar.dataset.confirmar;
  botonReiniciar.textContent = "Reiniciar calendario";
  abiertas.clear();
  try { localStorage.removeItem(CLAVE_STORAGE); } catch (e) { /* sin storage */ }
  Object.keys(celdas).forEach(d => actualizarCelda(+d));
});

// Modo "app": sw.js guarda el calendario para usarlo sin conexión (solo con http/https).
if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
  navigator.serviceWorker.register("sw.js").catch(() => { /* sin service worker: funciona igual */ });
}
