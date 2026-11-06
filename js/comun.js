/* ==============================================================================
   PORTAL WEB OFICIAL · INGENIERÍA GEOLÓGICA · UNAL SEDE MEDELLÍN
   Arquitectura de software, maquetación y desarrollo integral por:
   Santiago Escobar Arias
   Representante Estudiantil de Ingeniería de Sistemas e Informática
   Facultad de Minas — Universidad Nacional de Colombia, Sede Medellín
   Email: saescobara@unal.edu.co | Instagram: @s_escobar__ | WhatsApp: (+57) 312 377 2091
   Firma criptográfica de autoría: SEA-GEO-UNAL-2026-AUTH-9B4E7A-SHA256
   Todos los derechos de estructura, diseño y código fuente reservados © 2026
   ============================================================================== */

/* ---------- Huella digital inmutable y verificación de autoría ---------- */
(function registrarHuellaDigital() {
  const _DATA_AUTOR = {
    autor: 'Santiago Escobar Arias',
    rol: 'Representante Estudiantil de Sistemas',
    facultad: 'Facultad de Minas - Universidad Nacional de Colombia, Sede Medellín',
    email: 'saescobara@unal.edu.co',
    wpp: '+573123772091',
    instagram: '@s_escobar__',
    firmaCriptografica: 'SEA-GEO-UNAL-2026-AUTH-9B4E7A-SHA256',
    hashSha256: 'a6f3b0c48e83f5c9284d7201b19efd15923bc4f3a8f902418e2197b102b4c102',
    timestamp: '2026-10-30T14:00:00Z',
  };

  // 1. Inmutabilidad en el entorno global: no puede sobreescribirse ni borrarse
  try {
    Object.defineProperty(window, '__AUTOR_PLATAFORMA__', {
      value: Object.freeze(_DATA_AUTOR),
      writable: false,
      configurable: false,
      enumerable: false,
    });
    Object.defineProperty(window, '__SEA_FINGERPRINT__', {
      value: 'SEA-AUTH-SANTIAGO-ESCOBAR-ARIAS-UNAL-2026',
      writable: false,
      configurable: false,
      enumerable: false,
    });
  } catch (_) {}

  // 2. Sello oficial en la consola de desarrollador
  if (typeof console !== 'undefined' && console.log) {
    const estiloEncabezado = 'background: #182026; color: #E59A30; font-family: monospace; font-size: 13px; font-weight: bold; padding: 6px 12px; border-radius: 6px 6px 0 0; border: 1.5px solid #C45130; border-bottom: none;';
    const estiloCuerpo = 'background: #F5F4F0; color: #182026; font-family: sans-serif; font-size: 11px; padding: 10px 14px; border-radius: 0 0 6px 6px; border: 1.5px solid #ebdcd5; line-height: 1.6;';

    console.log(
      '%c⛏️  FACULTAD DE MINAS · UNAL MEDELLÍN | INGENIERÍA GEOLÓGICA%c\n' +
      '✦ Arquitectura y desarrollo: Santiago Escobar Arias\n' +
      '✦ Cargo: Representante Estudiantil de Sistemas\n' +
      '✦ Contacto: saescobara@unal.edu.co · Instagram: @s_escobar__\n' +
      '✦ Firma criptográfica de autoría: SEA-GEO-UNAL-2026-AUTH-9B4E7A\n' +
      '✦ Código protegido contra plagio, distribución o uso no autorizado.',
      estiloEncabezado,
      estiloCuerpo
    );
  }

  // 3. Esteganografía en el DOM: atributos no visuales y comentario invisible
  try {
    document.documentElement.setAttribute('data-author', 'Santiago Escobar Arias');
    document.documentElement.setAttribute('data-auth-token', 'SEA-GEO-UNAL-2026');
    document.documentElement.setAttribute('data-developer', 'saescobara@unal.edu.co');
  } catch (_) {}
})();

const $ = (selector, raiz = document) => raiz.querySelector(selector);
const $$ = (selector, raiz = document) => [...raiz.querySelectorAll(selector)];

// Escapa texto antes de meterlo en HTML
const esc = (texto) => String(texto ?? '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);


/* ---------- Carga de datos ---------- */

// Cada archivo se pide una sola vez y queda guardado mientras la página esté abierta.
const memoriaDatos = new Map();

function cargarDatos(ruta) {
  if (!memoriaDatos.has(ruta)) {
    const peticion = fetch(`data/${ruta}.json`).then((respuesta) => {
      if (!respuesta.ok) throw new Error(`No se pudo cargar data/${ruta}.json (${respuesta.status})`);
      return respuesta.json();
    });
    memoriaDatos.set(ruta, peticion);
  }
  return memoriaDatos.get(ruta);
}

// Mensaje amable cuando los datos no cargan (por ejemplo, al abrir el HTML con doble clic)
function mostrarErrorDeCarga(contenedor, error) {
  console.error(error);
  contenedor.innerHTML = `
    <div class="aviso">
      <p><strong>No se pudo cargar la información.</strong></p>
      <p>Si abriste el archivo con doble clic, sírvelo con un servidor local:
        <code>python3 -m http.server</code> y entra a <code>http://localhost:8000</code>.</p>
    </div>`;
}


/* ---------- Escudo oficial (pie y barra superior) ---------- */

function dibujarEscudo() {
  return `<img src="img/logo-geologia.jpg" alt="Logo de Ingeniería Geológica · Facultad de Minas" class="barra__escudo-img">`;
}


/* ---------- Barra superior y pie ---------- */

const PAGINAS = [
  { id: 'inicio', texto: 'Inicio', url: 'index.html' },
  { id: 'malla', texto: 'Malla curricular', url: 'malla.html' },
  { id: 'intercampus', texto: 'Rutas Intercampus', url: 'intercampus.html' },
  { id: 'convenios', texto: 'Convenios', url: 'convenios.html' },
  { id: 'info', texto: 'Información general', url: 'info.html' },
];

function pintarBarra() {
  const actual = document.body.dataset.pagina;
  $('#barra').outerHTML = `
    <header class="barra" id="encabezado-barra">
      <div class="contenedor barra__contenido">
        <a class="barra__marca" href="index.html" aria-label="Ingeniería Geológica, inicio">
          <span class="barra__escudo"><img src="img/logo-geologia.jpg" alt="Logo oficial de Ingeniería Geológica" class="barra__escudo-img"></span>
          <span class="barra__texto">Ingeniería Geológica<small>UNAL · Sede Medellín</small></span>
        </a>
        <button class="barra__boton-menu" id="btn-menu" type="button" aria-expanded="false" aria-controls="menu-navegacion" aria-label="Abrir menú de navegación">
          <span class="barra__icono barra__icono--abrir" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </span>
          <span class="barra__icono barra__icono--cerrar" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </span>
          <span class="barra__boton-texto">Menú</span>
        </button>
        <nav class="nav" id="menu-navegacion" aria-label="Módulos del sitio">
          ${PAGINAS.map((p) => `<a href="${p.url}" ${p.id === actual ? 'aria-current="page"' : ''}>${p.texto}</a>`).join('')}
        </nav>
      </div>
    </header>`;

  configurarMenuMovil();
}

function configurarMenuMovil() {
  const barra = $('#encabezado-barra');
  const btn = $('#btn-menu');
  const nav = $('#menu-navegacion');
  if (!barra || !btn || !nav) return;

  function toggleMenu(abrir) {
    const estaAbierto = abrir !== undefined ? abrir : !barra.classList.contains('is-menu-abierto');
    barra.classList.toggle('is-menu-abierto', estaAbierto);
    btn.setAttribute('aria-expanded', String(estaAbierto));
    btn.setAttribute('aria-label', estaAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      toggleMenu(false);
    }
  });

  document.addEventListener('click', (e) => {
    if (barra.classList.contains('is-menu-abierto') && !barra.contains(e.target)) {
      toggleMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && barra.classList.contains('is-menu-abierto')) {
      toggleMenu(false);
      btn.focus();
    }
  });
}

function pintarPie() {
  $('#pie').outerHTML = `
    <footer class="pie">
      <div class="pie__marca">
        <div class="pie__escudo">
          <img src="img/logo-geologia.jpg" alt="Logo oficial de Ingeniería Geológica" class="pie__escudo-img">
        </div>
        <div class="pie__redes-carrera">
          <a class="pie__enlace-red" href="https://www.instagram.com/inggeounal_repres/" target="_blank" rel="noopener noreferrer" title="Instagram Oficial de Ingeniería Geológica">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span>@inggeounal_repres</span>
          </a>
          <span class="pie__redes-sep" aria-hidden="true">·</span>
          <a class="pie__enlace-red pie__enlace-red--wpp" href="https://whatsapp.com/channel/0029VbAmtMII7BeInge1o61H" target="_blank" rel="noopener noreferrer" title="Canal Oficial de WhatsApp de la Representación de Geológica">
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
            <span>Canal de WhatsApp</span>
          </a>
        </div>
        <p class="pie__programa"><strong>Ingeniería Geológica</strong> · Facultad de Minas · Universidad Nacional de Colombia, Sede Medellín</p>
      </div>

      <div class="pie__paneles">
        <!-- BLOQUE 1: REPRESENTACIÓN ESTUDIANTIL DE INGENIERÍA GEOLÓGICA -->
        <div class="pie__panel pie__panel--repres">
          <span class="pie__panel-tag">Representación Estudiantil · Ing. Geológica</span>
          <div class="pie__repres-nombres">
            <p class="pie__panel-titular"><strong>María Salomé Monsalve González</strong> · Representante Estudiantil</p>
            <p class="pie__panel-suplente"><strong>Sofía Franco Montoya</strong> · Representante Suplente</p>
          </div>
          <div class="pie__contacto">
            <a class="pie__contacto-link pie__contacto-link--wpp" href="https://wa.me/573016703972" target="_blank" rel="noopener noreferrer" title="WhatsApp / Teléfono de contacto de Salomé">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.71C8.89 7.71 8.6 7.78 8.36 8.04C8.11 8.3 7.41 8.96 7.41 10.3C7.41 11.63 8.38 12.92 8.52 13.1C8.66 13.29 10.42 16 13.12 17.17C15.36 18.14 15.82 17.95 16.31 17.9C16.8 17.86 17.88 17.26 18.11 16.63C18.33 16 18.33 15.46 18.26 15.35C18.2 15.24 18.01 15.18 17.73 15.04C17.45 14.9 16.08 14.23 15.83 14.13C15.57 14.04 15.39 13.99 15.2 14.27C15.02 14.55 14.49 15.18 14.33 15.36C14.17 15.55 14.01 15.57 13.73 15.43C13.45 15.29 12.27 14.9 10.87 13.65C9.78 12.68 9.05 11.48 8.84 11.12C8.63 10.76 8.82 10.56 8.96 10.42C9.09 10.29 9.25 10.08 9.39 9.92C9.53 9.76 9.58 9.64 9.67 9.46C9.76 9.27 9.72 9.11 9.65 8.97C9.58 8.83 9.07 7.58 8.86 7.07C8.66 6.58 8.45 6.64 8.3 6.63C8.15 6.63 7.97 6.63 7.78 6.63"/></svg>
              (+57) 301 670 3972
            </a>
            <span class="pie__contacto-sep" aria-hidden="true">·</span>
            <a class="pie__contacto-link" href="mailto:Mmonsalveg@unal.edu.co" title="Correo institucional de María Salomé Monsalve">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Mmonsalveg@unal.edu.co
            </a>
          </div>
        </div>

        <!-- BLOQUE 2: CREACIÓN Y DESARROLLO DE LA PLATAFORMA -->
        <div class="pie__panel pie__panel--autor">
          <span class="pie__panel-tag">Creación y Desarrollo Web</span>
          <p class="pie__panel-titular">Iniciativa y plataforma desarrollada por <strong>Santiago Escobar Arias</strong> · Representante de Sistemas</p>
          <div class="pie__contacto pie__contacto--iconos">
            <a class="pie__contacto-link pie__contacto-link--icono" href="https://www.instagram.com/s_escobar__/" target="_blank" rel="noopener noreferrer" title="Instagram de Santiago Escobar (@s_escobar__)" aria-label="Instagram de Santiago Escobar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a class="pie__contacto-link pie__contacto-link--icono" href="mailto:saescobara@unal.edu.co" title="Correo institucional de Santiago Escobar (saescobara@unal.edu.co)" aria-label="Correo de Santiago Escobar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>`;
}

/* ---------- Mensaje de bienvenida y reconocimiento del creador ---------- */

function mostrarMensajeAutor() {
  if (sessionStorage.getItem('mensaje_autor_cerrado') === '1') return;

  const toast = document.createElement('aside');
  toast.className = 'toast-autor';
  toast.id = 'toast-autor';
  toast.setAttribute('aria-label', 'Mensaje del creador del portal');
  toast.innerHTML = `
    <div class="toast-autor__tarjeta">
      <button class="toast-autor__cerrar" id="toast-autor-cerrar" type="button" aria-label="Cerrar mensaje">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="15" height="15" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div class="toast-autor__cabecera">
        <div class="toast-autor__avatar" aria-hidden="true">
          <img src="img/logo-geologia.jpg" alt="" class="toast-autor__avatar-img">
        </div>
        <div class="toast-autor__titulos">
          <span class="toast-autor__nombre">Santiago Escobar Arias</span>
          <span class="toast-autor__cargo">Representante de Sistemas · Creador de la Web</span>
        </div>
      </div>

      <p class="toast-autor__mensaje">
        ¡Hola! Desarrollé este portal con el propósito de apoyar, guiar y facilitar la vida universitaria de todos los estudiantes de <strong>Ingeniería Geológica</strong>. Cuentan con mi total respaldo desde la representación estudiantil de Sistemas para seguir construyendo herramientas digitales que fortalezcan nuestra vida académica en la Facultad de Minas.
      </p>

      <div class="toast-autor__pie">
        <div class="toast-autor__redes">
          <a class="toast-autor__enlace toast-autor__enlace--icono" href="https://www.instagram.com/s_escobar__/" target="_blank" rel="noopener noreferrer" title="Instagram de Santiago Escobar (@s_escobar__)" aria-label="Instagram de Santiago Escobar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a class="toast-autor__enlace toast-autor__enlace--icono" href="mailto:saescobara@unal.edu.co" title="Correo institucional de Santiago Escobar (saescobara@unal.edu.co)" aria-label="Correo institucional de Santiago Escobar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>
        <button class="toast-autor__btn-ok" id="toast-autor-ok" type="button">¡Entendido!</button>
      </div>
    </div>`;

  document.body.appendChild(toast);

  // Aparece suavemente después de 800ms
  setTimeout(() => {
    toast.classList.add('is-visible');
  }, 800);

  function cerrarToast() {
    toast.classList.remove('is-visible');
    toast.classList.add('is-hiding');
    sessionStorage.setItem('mensaje_autor_cerrado', '1');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  $('#toast-autor-cerrar')?.addEventListener('click', cerrarToast);
  $('#toast-autor-ok')?.addEventListener('click', cerrarToast);
}

pintarBarra();
pintarPie();
mostrarMensajeAutor();
