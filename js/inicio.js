/* ==============================================================================
   PORTAL ACADÉMICO · INGENIERÍA GEOLÓGICA · UNAL SEDE MEDELLÍN
   Módulo: Inicio | Desarrollado por: Santiago Escobar Arias (Representante de Sistemas)
   Contacto: saescobara@unal.edu.co | Firma: SEA-GEO-UNAL-2026-AUTH-9B4E7A
   ============================================================================== */

const ICONOS_PERFIL = {
  ciencia: '<polygon points="6 2 18 2 22 8 12 22 2 8"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="12" y1="22" x2="7.5" y2="8"/><line x1="12" y1="22" x2="16.5" y2="8"/><line x1="6" y1="2" x2="10.5" y2="8"/><line x1="18" y1="2" x2="13.5" y2="8"/>',
  gestion: '<path d="M2 20h20"/><path d="m3 16 6-7 5 3 7-8"/><circle cx="9" cy="9" r="1.5"/><path d="M6 20v-5"/><path d="M14 20v-6"/><path d="M19 20V9"/>',
  equipo: '<path d="m2 20 7-13 4 5 7 8z"/><path d="m9 7 3-3 3 3"/><path d="M12 2v2"/><path d="M5 20h14"/>',
  empresa: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/><circle cx="12" cy="12" r="3"/>',
};

const TAGS_PERFIL = [
  'Recursos Naturales & Energía',
  'Geomecánica & Obras Civiles',
  'Gestión del Riesgo & Territorio',
  'Geomática, SIG & Modelado 3D'
];

const icono = (nombre) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS_PERFIL[nombre] || ''}</svg>`;

const ICONO_SELLO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/><path d="m9.5 9 1.8 1.8L15 7.2"/></svg>';


/* ---------- Programa ---------- */

function pintarPrograma(p) {
  $('#portada-cifras').innerHTML = p.cifras
    .map((c) => `<li>${esc(c.valor)}<small>${esc(c.texto)}</small></li>`)
    .join('');

  const acreditacion = p.acreditacion;
  $('#programa-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">${esc(p.facultad)} · ${esc(p.sede)}</p>
      <h2 id="programa-titulo">El programa de Ingeniería Geológica</h2>
      <p class="seccion-titulo__intro">Formación científica y técnica para investigar el territorio, liderar el aprovechamiento sostenible de recursos y garantizar la seguridad geotécnica del país.</p>
    </div>

    <!-- 4 GRANDES CAMPOS DE ACCIÓN GEOLÓGICA -->
    <div class="geopilares" aria-label="Campos de acción de la Ingeniería Geológica">
      <div class="geopilar">
        <span class="geopilar__icono geopilar__icono--mineral" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 2 18 2 22 8 12 22 2 8"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="12" y1="22" x2="7.5" y2="8"/><line x1="12" y1="22" x2="16.5" y2="8"/></svg>
        </span>
        <span class="geopilar__tag">Eje 01</span>
        <h4>Georrecursos Sostenibles</h4>
        <p>Exploración de minerales críticos, transición energética, yacimientos, hidrocarburos y aguas subterráneas.</p>
      </div>

      <div class="geopilar">
        <span class="geopilar__icono geopilar__icono--geotecnia" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="m3 16 6-7 5 3 7-8"/><circle cx="9" cy="9" r="1.5"/><path d="M6 20v-5"/><path d="M14 20v-6"/><path d="M19 20V9"/></svg>
        </span>
        <span class="geopilar__tag">Eje 02</span>
        <h4>Geotecnia & Macizos</h4>
        <p>Mecánica de suelos y rocas para túneles, taludes, represas, vías y cimentaciones de grandes obras civiles.</p>
      </div>

      <div class="geopilar">
        <span class="geopilar__icono geopilar__icono--riesgo" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 20 7-13 4 5 7 8z"/><path d="m9 7 3-3 3 3"/><path d="M12 2v2"/><path d="M5 20h14"/></svg>
        </span>
        <span class="geopilar__tag">Eje 03</span>
        <h4>Amenazas & Gestión del Riesgo</h4>
        <p>Evaluación y mitigación de remoción en masa, sismicidad, vulcanismo y ordenamiento seguro del territorio.</p>
      </div>

      <div class="geopilar">
        <span class="geopilar__icono geopilar__icono--geomatica" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/><circle cx="12" cy="12" r="3"/></svg>
        </span>
        <span class="geopilar__tag">Eje 04</span>
        <h4>Geomática & Modelado 3D</h4>
        <p>Procesamiento de imágenes satelitales, fotogrametría con drones, SIG y modelamiento tridimensional del subsuelo.</p>
      </div>
    </div>

    <div class="programa__rejilla">
      <div class="programa__texto">
        <div class="programa__cabecera-texto">
          <span class="programa__lema">Lema de la Facultad: ${esc(p.lema)}</span>
          <span class="programa__fundacion">Escuela de Minas · 1911</span>
        </div>
        ${p.descripcion.map((parrafo) => `<p>${esc(parrafo)}</p>`).join('')}

        <!-- ESTRATIGRAFÍA DEL PLAN DE ESTUDIOS -->
        <div class="estratigrafia-curricular">
          <div class="estratigrafia-curricular__cabecera">
            <span class="estratigrafia-curricular__titulo">Estratigrafía del Plan de Estudios (180 créditos)</span>
            <a href="malla.html" class="estratigrafia-curricular__enlace">Explorar Malla Curricular →</a>
          </div>
          <div class="estratigrafia-curricular__barra" role="img" aria-label="Estratigrafía: 44 créditos Fundamentación, 100 créditos Disciplinar, 36 créditos Libre Elección">
            <span class="estrato estrato--fundamentacion" style="width: 24.4%;" title="Fundamentación: 44 cr (24.4%)">44 cr</span>
            <span class="estrato estrato--disciplinar" style="width: 55.6%;" title="Disciplinar o Profesional: 100 cr (55.6%)">100 cr</span>
            <span class="estrato estrato--libre" style="width: 20%;" title="Libre Elección: 36 cr (20%)">36 cr</span>
          </div>
          <div class="estratigrafia-curricular__leyenda">
            <span><em style="background: var(--fundamentacion)"></em> Fundamentación (44 cr)</span>
            <span><em style="background: var(--disciplinar)"></em> Formación Disciplinar (100 cr)</span>
            <span><em style="background: var(--libre)"></em> Libre Elección (36 cr)</span>
          </div>
        </div>
      </div>

      <!-- FICHA TÉCNICA GEOLÓGICA (ESTILO LIBRETA DE CAMPO) -->
      <div class="ficha-contenedor">
        <div class="ficha__cabecera-geologica">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          <span>Expediente Curricular · Muestra Oficial</span>
        </div>
        <ul class="ficha">
          ${p.ficha.map((f) => `
            <li><span class="ficha__etiqueta">${esc(f.etiqueta)}</span><span class="ficha__valor">${esc(f.valor)}</span></li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="acreditacion">
      <div class="acreditacion__cabecera">
        <span class="acreditacion__sello-icono">${ICONO_SELLO}</span>
        <div>
          <span class="acreditacion__antetitulo">Calidad Académica Certificada</span>
          <h3 class="acreditacion__estado">${esc(acreditacion.estado)}</h3>
        </div>
      </div>
      <div class="acreditacion__rejilla">
        ${acreditacion.hitos.map((h, i) => `
          <div class="acreditacion__tarjeta ${String(h.anio).toLowerCase().includes('renova') ? 'acreditacion__tarjeta--renovacion' : ''}">
            <div class="acreditacion__tarjeta-encabezado">
              <span class="acreditacion__anio-badge">${esc(h.anio)}</span>
              <span class="acreditacion__hito-tipo">${i === 0 ? 'Acreditación Inicial' : 'Renovación de Calidad'}</span>
            </div>
            <p class="acreditacion__texto">${esc(h.texto)}</p>
          </div>`).join('')}
      </div>
      <div class="acreditacion__pie">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="acreditacion__info-icono" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <p class="acreditacion__nota">${esc(acreditacion.nota)}</p>
      </div>
    </div>

    <p class="fuentes">Fuentes:
      ${p.fuentes.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>`).join(' · ')}
    </p>`;
}


/* ---------- Perfil del egresado ---------- */

function pintarPerfil(perfil) {
  $('#perfil-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">Quién sale de aquí</p>
      <h2 id="perfil-titulo">${esc(perfil.titulo)}</h2>
      <p class="seccion-titulo__intro">${esc(perfil.intro)}</p>
    </div>
    <ul class="perfil__tarjetas">
      ${perfil.rasgos.map((r, i) => `
        <li class="rasgo">
          <span class="rasgo__tag">${esc(TAGS_PERFIL[i] || 'Ingeniería Geológica')}</span>
          <div class="rasgo__icono-wrap">
            <span class="rasgo__icono">${icono(r.icono)}</span>
          </div>
          <h3>${esc(r.titulo)}</h3>
          <p>${esc(r.texto)}</p>
        </li>`).join('')}
    </ul>
    <p class="perfil__fuente">${esc(perfil.fuente)}</p>`;
}


/* ---------- Grupos estudiantiles y semilleros (Roquitas Geológicas) ---------- */

const ICONOS_ROCA = {
  gemma: '<polygon points="6 2 18 2 22 8 12 22 2 8"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="12" y1="22" x2="7.5" y2="8"/><line x1="12" y1="22" x2="16.5" y2="8"/><line x1="6" y1="2" x2="10.5" y2="8"/><line x1="18" y1="2" x2="13.5" y2="8"/>',
  ignea: '<path d="m2 20 7-13 4 5 7 8z"/><path d="m9 7 3-3 3 3"/><path d="M12 2v2"/><path d="M5 20h14"/>',
  geotecnia: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  geomatica: '<circle cx="12" cy="3" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m12.72-4.24a12 12 0 0 1 0 16.97m-16.96 0a12 12 0 0 1 0-16.97"/>',
};

const iconoRoca = (id) => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    ${ICONOS_ROCA[id] || '<polygon points="6 2 18 2 22 8 12 22 2 8"/><line x1="2" y1="8" x2="22" y2="8"/>'}
  </svg>`;

function pintarGrupos(grupos) {
  const roquitas = grupos.map((grupo) => {
    const etiqueta = grupo.enlace ? 'a' : 'div';
    const destino = grupo.enlace ? `href="${esc(grupo.enlace)}" target="_blank" rel="noopener noreferrer"` : '';
    return `
      <li class="grupo-roca" style="--color-roca: ${esc(grupo.color || '#C45130')}">
        <${etiqueta} class="roca roca--${esc(grupo.id)}" ${destino} aria-label="${esc(grupo.nombre)} · ${esc(grupo.tipo)}">
          <div class="roca__cristal">
            <div class="roca__facetas" aria-hidden="true"></div>
            <div class="roca__vetas" aria-hidden="true"></div>
            <div class="roca__contenido">
              <span class="roca__icono">${iconoRoca(grupo.id)}</span>
              <strong class="roca__nombre">${esc(grupo.nombre)}</strong>
              <span class="roca__tipo-badge">${esc(grupo.tipo)}</span>
            </div>
            <div class="roca__brillo" aria-hidden="true"></div>
          </div>
          <div class="roca__sombra" aria-hidden="true"></div>
        </${etiqueta}>

        <div class="grupo-roca__info">
          <p class="grupo-roca__descripcion">${esc(grupo.descripcion || '')}</p>
          ${grupo.enlace ? `
            <a class="grupo-roca__enlace" href="${esc(grupo.enlace)}" target="_blank" rel="noopener noreferrer">
              <span>Conocer más</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>` : ''}
        </div>
      </li>`;
  }).join('');

  $('#grupos-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">Comunidad estudiantil</p>
      <h2 id="grupos-titulo">Grupos y semilleros</h2>
      <p class="seccion-titulo__intro">Espacios donde estudiantes de Ingeniería Geológica aprenden haciendo, investigan en campo y aplican las ciencias de la Tierra.</p>
    </div>
    <ul class="grupos__lista">${roquitas}</ul>`;
}


/* ---------- Carga por secciones ---------- */

// Cada sección pide su JSON recién cuando está cerca de la pantalla.
const SECCIONES = {
  perfil: () => cargarDatos('perfil').then(pintarPerfil),
  grupos: () => cargarDatos('grupos').then(pintarGrupos),
};

function cargarSeccion(seccion) {
  const cargar = SECCIONES[seccion.dataset.carga];
  cargar().catch((error) => mostrarErrorDeCarga(seccion.querySelector('.contenedor'), error));
}

cargarDatos('programa')
  .then(pintarPrograma)
  .catch((error) => mostrarErrorDeCarga($('#programa-contenido'), error));

const porCargar = $$('[data-carga]');
if ('IntersectionObserver' in window) {
  const vigilante = new IntersectionObserver((entradas) => {
    entradas.filter((e) => e.isIntersecting).forEach((e) => {
      vigilante.unobserve(e.target);
      cargarSeccion(e.target);
    });
  }, { rootMargin: '400px 0px' });
  porCargar.forEach((seccion) => vigilante.observe(seccion));
} else {
  porCargar.forEach(cargarSeccion);
}
