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

const ICONOS_REDES = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.84 1.55V6.85a4.83 4.83 0 0 1-1.07-.16z"/></svg>',
  hermes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  correo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
};

function pintarGrupos(grupos) {
  const roquitas = grupos.map((grupo) => {
    const redesHtml = (grupo.redes || []).map((r) => `
      <a class="grupo-roca__red-btn grupo-roca__red-btn--${esc(r.tipo)}" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" title="${esc(r.texto)}">
        <span class="grupo-roca__red-icono">${ICONOS_REDES[r.tipo] || ICONOS_REDES.web}</span>
        <span>${esc(r.texto)}</span>
      </a>
    `).join('');

    const docentesHtml = grupo.docentes ? `
      <div class="grupo-roca__meta">
        <span class="grupo-roca__meta-etiqueta">Docentes tutores / Líderes:</span>
        <span class="grupo-roca__meta-valor">${esc(grupo.docentes)}</span>
      </div>
    ` : '';

    const matrizHtml = grupo.matriz ? `
      <div class="grupo-roca__meta">
        <span class="grupo-roca__meta-etiqueta">Entidad / Grupo matriz:</span>
        <span class="grupo-roca__meta-valor">${esc(grupo.matriz)}</span>
      </div>
    ` : '';

    const requisitosHtml = grupo.requisitos ? `
      <div class="grupo-roca__requisitos">
        <strong>Requisitos de participación:</strong> ${esc(grupo.requisitos)}
      </div>
    ` : '';

    return `
      <li class="grupo-roca" data-categoria="${esc(grupo.categoria)}" style="--color-roca: ${esc(grupo.color || '#C45130')}">
        <!-- PIEDRA GEOLÓGICA INTERACTIVA: SE PARTE AL PASAR EL CURSOR O AL DAR CLICK -->
        <a class="roca roca--${esc(grupo.id)}" href="${esc(grupo.enlace)}" target="_blank" rel="noopener noreferrer" title="Visitar ${esc(grupo.nombre)} · Abrir enlace oficial (${esc(grupo.enlaceTexto || 'Sitio Web')})" aria-label="${esc(grupo.nombre)} · Abrir página oficial">
          <!-- Mitad Izquierda de la roca -->
          <div class="roca__mitad roca__mitad--izq" aria-hidden="true">
            <div class="roca__cristal">
              <div class="roca__facetas"></div>
              <div class="roca__vetas"></div>
              <div class="roca__brillo"></div>
            </div>
          </div>

          <!-- Mitad Derecha de la roca -->
          <div class="roca__mitad roca__mitad--der" aria-hidden="true">
            <div class="roca__cristal">
              <div class="roca__facetas"></div>
              <div class="roca__vetas"></div>
              <div class="roca__brillo"></div>
            </div>
          </div>

          <!-- Contenido central: Logo sobre la roca (desaparece al partirse) -->
          <div class="roca__contenido">
            <div class="roca__logo-container">
              <img src="${esc(grupo.logo)}" alt="Logo oficial de ${esc(grupo.nombre)}" class="roca__logo-img" loading="lazy">
            </div>
          </div>

          <div class="roca__sombra" aria-hidden="true"></div>
        </a>

        <div class="grupo-roca__info">
          <h3 class="grupo-roca__titulo-completo">${esc(grupo.nombreCompleto || grupo.nombre)}</h3>
          ${docentesHtml}
          ${matrizHtml}
          
          <div class="grupo-roca__descripcion-wrap">
            <p class="grupo-roca__descripcion">${esc(grupo.descripcion || '')}</p>
          </div>

          ${requisitosHtml}

          <div class="grupo-roca__redes" aria-label="Canales y enlaces oficiales">
            ${redesHtml}
          </div>
        </div>
      </li>`;
  }).join('');

  $('#grupos-contenido').innerHTML = `
    <div class="seccion-titulo">
      <p class="seccion-titulo__antetitulo">Comunidad estudiantil & científica</p>
      <h2 id="grupos-titulo">Grupos, Semilleros y Capítulos</h2>
      <p class="seccion-titulo__intro">Directorio oficial de espacios de investigación, aprendizaje técnico y vinculación profesional internacional en Ingeniería Geológica.</p>
    </div>

    <!-- Pestañas de filtrado interactivo -->
    <div class="grupos__filtros" role="tablist" aria-label="Filtrar por categoría">
      <button class="grupos__filtro is-active" type="button" data-filtro="todos" role="tab" aria-selected="true">
        Todos <span class="grupos__filtro-conteo">12</span>
      </button>
      <button class="grupos__filtro" type="button" data-filtro="investigacion" role="tab" aria-selected="false">
        Grupos y Semilleros de Investigación <span class="grupos__filtro-conteo">6</span>
      </button>
      <button class="grupos__filtro" type="button" data-filtro="agrupaciones" role="tab" aria-selected="false">
        Agrupaciones y Capítulos Profesionales <span class="grupos__filtro-conteo">6</span>
      </button>
    </div>

    <ul class="grupos__lista" id="grupos-lista">${roquitas}</ul>`;

  // Controlador de filtros
  const contenedorGrupos = $('#grupos-contenido');
  const botonesFiltro = $$('.grupos__filtro', contenedorGrupos);
  const tarjetas = $$('.grupo-roca', contenedorGrupos);

  botonesFiltro.forEach((btn) => {
    btn.addEventListener('click', () => {
      botonesFiltro.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const filtro = btn.dataset.filtro;
      tarjetas.forEach((tarjeta) => {
        if (filtro === 'todos' || tarjeta.dataset.categoria === filtro) {
          tarjeta.style.display = '';
        } else {
          tarjeta.style.display = 'none';
        }
      });
    });
  });

  // Efecto táctil y de clic: la roca se parte al hacer clic
  $$('.roca', contenedorGrupos).forEach((roca) => {
    roca.addEventListener('click', () => {
      roca.classList.add('is-partida');
      setTimeout(() => roca.classList.remove('is-partida'), 900);
    });
  });
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
