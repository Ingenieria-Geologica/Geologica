/* ==============================================================================
   PORTAL WEB OFICIAL · INGENIERÍA GEOLÓGICA · UNAL SEDE MEDELLÍN
   Arquitectura de software, maquetación y desarrollo integral por:
   Santiago Escobar Arias · Representante Estudiantil de Sistemas e Informática
   Canales Oficiales e Información de Ingeniería Geológica:
   María Salomé Monsalve González (Representante Titular) & Sofía Franco Montoya (Suplente)
   Facultad de Minas — Universidad Nacional de Colombia, Sede Medellín
   ============================================================================== */

/**
 * sofIA — Asistente Virtual Inteligente de Ingeniería Geológica
 * Arquitectura modular autónoma en Vanilla JavaScript.
 * Procesa consultas sobre malla curricular, prerrequisitos, salidas de campo,
 * semilleros, alianzas, cambio de carrera / traslados, creador de la plataforma,
 * fechas del calendario y recursos en Drive.
 */
(() => {
  'use strict';

  // ==========================================================================
  // 1. CONFIGURACIÓN, RECURSOS Y AVATAR HOLOGRÁFICO
  // ==========================================================================

  const SOFIA_CFG = {
    nombre: 'sofIA',
    titulo: 'Asistente Inteligente de Geológica',
    institucion: 'Universidad Nacional de Colombia · Sede Medellín',
    facultad: 'Facultad de Minas',
    programa: 'Ingeniería Geológica',
    repreTitular: 'María Salomé Monsalve González',
    repreSuplente: 'Sofía Franco Montoya',
    whatsappRepre: 'https://wa.me/573016703972',
    telefonoRepre: '(+57) 301 670 3972',
    canalWhatsApp: 'https://whatsapp.com/channel/0029VbAmtMII7BeInge1o61H',
    instagramRepre: 'https://www.instagram.com/inggeounal_repres/',
    usuarioInstagram: '@inggeounal_repres',
    driveRecursos: 'https://drive.google.com/drive/folders/0AJTTimzRtO3zUk9PVA',
    asesoriaMinasCorreo: 'asesorestu_med@unal.edu.co',
    asesoriaMinasTel: '(+57 604) 430 9653',
    tramitesMinasUrl: 'https://minas.medellin.unal.edu.co/estudiantes/gestion-de-asuntos-estudiantiles/gae-solicitudes-estudiantiles',
    creadorNombre: 'Santiago Escobar Arias',
    creadorRol: 'Representante Estudiantil de Ingeniería de Sistemas e Informática · Creador de la Web',
    creadorWhatsApp: 'https://wa.me/573123772091',
    creadorCorreo: 'saescobara@unal.edu.co',
    creadorInstagram: 'https://www.instagram.com/s_escobar__/',
  };

  // SVG Holográfico de sofIA (Estilo Cortana / Inteligencia Geológica con verde mineral olivino y ámbar)
  const SOFIA_SVG_AVATAR = `<svg class="sofia-avatar-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="sofiaGeoGrad" x1="10%" y1="10%" x2="90%" y2="90%">
        <stop offset="0%" stop-color="#E59A30"/>
        <stop offset="45%" stop-color="#C45130"/>
        <stop offset="100%" stop-color="#2B5346"/>
      </linearGradient>
      <radialGradient id="sofiaGeoGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#E59A30" stop-opacity="0.9"/>
        <stop offset="60%" stop-color="#2B5346" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#182026" stop-opacity="0"/>
      </radialGradient>
      <filter id="sofiaGeoFiltro" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="46" fill="url(#sofiaGeoGlow)" opacity="0.35"/>
    <circle cx="50" cy="50" r="42" stroke="url(#sofiaGeoGrad)" stroke-width="2.5" stroke-dasharray="6 3" opacity="0.85"/>
    <circle cx="50" cy="50" r="35" stroke="#E59A30" stroke-width="1.2" opacity="0.6"/>
    <!-- Silueta holográfica estilizada -->
    <path d="M50 22 C41 22 34 29 34 39 C34 47 38 52 42 56 C44 58 45 61 45 64 L55 64 C55 61 56 58 58 56 C62 52 66 47 66 39 C66 29 59 22 50 22 Z" fill="url(#sofiaGeoGrad)" filter="url(#sofiaGeoFiltro)"/>
    <path d="M43 67 L57 67 L55 72 L45 72 Z" fill="#E59A30" opacity="0.9"/>
    <path d="M46 74 L54 74 L53 77 L47 77 Z" fill="#C45130" opacity="0.8"/>
    <!-- Ojos digitales / Núcleo de datos -->
    <circle cx="44.5" cy="39" r="2.2" fill="#FFFFFF"/>
    <circle cx="55.5" cy="39" r="2.2" fill="#FFFFFF"/>
    <circle cx="50" cy="46" r="1.5" fill="#FFFFFF" opacity="0.8"/>
    <!-- Estratos digitales en ondas circulares -->
    <circle cx="50" cy="50" r="28" stroke="#FFFFFF" stroke-width="0.8" stroke-dasharray="2 6" opacity="0.5"/>
  </svg>`;

  // ==========================================================================
  // 2. BASE DE CONOCIMIENTO Y DATOS DINÁMICOS
  // ==========================================================================

  const datos = {
    asignaturas: [],
    componentes: null,
    plan: null,
    info: null,
    programa: null,
    perfil: null,
    grupos: [],
    convenios: null,
  };

  const indices = {
    materiasPorCodigo: new Map(),
    materiasPorNombre: new Map(),
    aliasMaterias: new Map(),
    materiasPorSemestre: new Map(),
    calendarioFilas: [],
  };

  const estadoSofia = {
    abierto: false,
    vozHabilitada: false,
    historial: [],
    cargando: true,
  };

  // Normalizador de texto para búsquedas tolerantes a acentos y mayúsculas
  function normalizar(texto) {
    if (!texto) return '';
    return texto
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Carga de datos JSON oficiales de Ingeniería Geológica
  async function cargarDatos() {
    try {
      const peticiones = [
        fetch('data/malla/asignaturas.json').then((r) => (r.ok ? r.json() : [])).catch(() => []),
        fetch('data/malla/componentes.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/malla/plan.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/info.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/programa.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/perfil.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('data/grupos.json').then((r) => (r.ok ? r.json() : [])).catch(() => []),
        fetch('data/convenios/alianzas-estrategicas.json').then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ];

      const [asigs, comp, plan, info, prog, perfil, grupos, convenios] = await Promise.all(peticiones);

      datos.asignaturas = Array.isArray(asigs) ? asigs : [];
      datos.componentes = comp;
      datos.plan = plan;
      datos.info = info;
      datos.programa = prog;
      datos.perfil = perfil;
      datos.grupos = Array.isArray(grupos) ? grupos : [];
      datos.convenios = convenios;

      construirIndices();
      estadoSofia.cargando = false;
    } catch (err) {
      console.warn('[sofIA Geológica] Advertencia al cargar datos:', err);
      estadoSofia.cargando = false;
    }
  }

  // Indexación y diccionario de sinónimos/alias de materias de Geológica
  function construirIndices() {
    indices.materiasPorCodigo.clear();
    indices.materiasPorNombre.clear();
    indices.aliasMaterias.clear();
    indices.materiasPorSemestre.clear();
    indices.calendarioFilas = [];

    datos.asignaturas.forEach((asig) => {
      indices.materiasPorCodigo.set(asig.codigo, asig);
      indices.materiasPorNombre.set(normalizar(asig.nombre), asig);

      const sem = asig.semestre || 0;
      if (!indices.materiasPorSemestre.has(sem)) {
        indices.materiasPorSemestre.set(sem, []);
      }
      indices.materiasPorSemestre.get(sem).push(asig);
    });

    // Alias exhaustivos para las 77 materias de Ingeniería Geológica
    const ALIAS_MATERIAS = [
      [['calculo 1', 'calculo diferencial', 'diferencial'], 'Cálculo Diferencial'],
      [['geometria vectorial', 'vectorial'], 'Geometría Vectorial y Analítica'],
      [['quimica general', 'quimica 1', 'quimica'], 'Química General'],
      [['geologia fisica', 'geologia 1'], 'Geología Física'],
      [['introduccion a la ingenieria geologica', 'intro geologia', 'intro a geologia', 'introduccion'], 'Introducción a la Ingeniería Geológica'],
      [['calculo 2', 'calculo integral', 'integral'], 'Cálculo Integral'],
      [['algebra lineal', 'lineal'], 'Álgebra Lineal'],
      [['fisica 1', 'mecanica', 'fisica mecanica'], 'Física Mecánica'],
      [['mineralogia', 'minerales'], 'Mineralogía'],
      [['elementos de geologia estructural', 'geologia estructural', 'estructural'], 'Elementos de Geología Estructural'],
      [['fundamentos de programacion', 'programacion', 'python', 'sistemas'], 'Fundamentos de Programación'],
      [['mineralogia optica', 'optica mineral'], 'Mineralogía Óptica'],
      [['termodinamica general', 'termo', 'termodinamica'], 'Termodinámica General'],
      [['estadistica 1', 'estadistica', 'probabilidad y estadistica'], 'Estadística I'],
      [['mecanica de suelos', 'suelos'], 'Mecánica de Suelos'],
      [['petrologia ignea', 'ignea'], 'Petrología Ígnea'],
      [['petrologia sedimentaria', 'sedimentaria'], 'Petrología Sedimentaria'],
      [['fundamentos de proyectos en ingenieria', 'proyectos 1', 'fpi'], 'Fundamentos de Proyectos en Ingeniería'],
      [['geomorfologia', 'geomorfo'], 'Geomorfología'],
      [['geomecanica'], 'Geomecánica'],
      [['geologia de campo 1', 'campo 1', 'campo i'], 'Geología de Campo I'],
      [['petrologia metamorfica', 'metamorfica'], 'Petrología Metamórfica'],
      [['fundamentos de sistemas de informacion geografica', 'sig', 'gis', 'arcgis', 'qgis'], 'Fundamentos de Sistemas de Información Geográfica'],
      [['depositos minerales y metalogenia', 'depositos minerales', 'metalogenia', 'yacimientos minerales'], 'Depósitos Minerales y Metalogenia'],
      [['sensores remotos', 'teledeteccion', 'imagenes satelitales'], 'Sensores Remotos'],
      [['estratigrafia'], 'Estratigrafía'],
      [['geotecnia', 'estabilidad de taludes'], 'Geotecnia'],
      [['geologia de campo 2', 'campo 2', 'campo ii'], 'Geología de Campo II'],
      [['geofisica', 'sismica'], 'Geofísica'],
      [['estructuracion y evaluacion de proyectos de ingenieria', 'evaluacion de proyectos', 'proyectos 2'], 'Estructuración y Evaluación de Proyectos de Ingeniería'],
      [['recursos energeticos', 'energia'], 'Recursos Energéticos'],
      [['geologia de campo 3', 'campo 3', 'campo iii'], 'Geología de Campo III'],
      [['proyecto integrado de ingenieria', 'pii', 'proyecto integrado'], 'Proyecto Integrado de Ingeniería'],
      [['rocas y minerales en la industria', 'minerales industriales'], 'Rocas y Minerales en la Industria'],
      [['trabajo de grado', 'tesis', 'grado', 'monografia'], 'Trabajo de Grado'],
      [['ecuaciones diferenciales', 'ecuaciones', 'ed'], 'Ecuaciones Diferenciales'],
      [['matematicas especiales', 'especiales'], 'Matemáticas Especiales'],
      [['metodos numericos', 'numericos'], 'Métodos Numéricos'],
      [['fisica 2', 'electricidad y magnetismo', 'fisica electricidad', 'electromagnetismo'], 'Física de Electricidad y Magnetismo'],
      [['fisica 3', 'oscilaciones ondas y optica', 'ondas', 'optica'], 'Física de Oscilaciones, Ondas y Óptica'],
      [['geoquimica'], 'Geoquímica'],
      [['neotectonica', 'fallas activas'], 'Neotectónica'],
      [['geologia de colombia'], 'Geología de Colombia'],
      [['geologia ambiental'], 'Geología Ambiental'],
      [['paleontologia y geologia historica', 'paleontologia', 'fosiles'], 'Paleontología y Geología Histórica'],
      [['geologia del cuaternario', 'cuaternario'], 'Geología del Cuaternario'],
      [['oceanografia'], 'Oceanografía'],
      [['geologia marina'], 'Geología Marina'],
      [['geodinamica'], 'Geodinámica'],
      [['estructural y tectonica', 'tectonica'], 'Estructural y Tectónica'],
      [['hidrologia'], 'Hidrología'],
      [['hidraulica fluvial', 'fluvial'], 'Hidráulica Fluvial'],
      [['geocronologia', 'dataciones'], 'Geocronología'],
      [['introduccion a la volcanologia', 'volcanologia', 'volcanes'], 'Introducción a la Volcanología'],
      [['campo marino'], 'Campo Marino'],
      [['geomecanica minera'], 'Geomecánica Minera'],
      [['estimacion de depositos minerales', 'evaluacion de yacimientos'], 'Estimación de Depósitos Minerales'],
      [['modelacion y simulacion de yacimientos', 'simulacion de yacimientos'], 'Modelación y Simulación de Yacimientos'],
      [['prospeccion de recursos hidricos', 'hidrogeologia', 'aguas subterraneas'], 'Prospección de Recursos Hídricos'],
      [['prospeccion y exploracion de recursos minerales', 'exploracion minera'], 'Prospección y Exploración de Recursos Minerales'],
      [['problemas especiales de geologia'], 'Problemas Especiales de Geología'],
      [['microscopia optica de minerales opacos', 'minerales opacos', 'secciones pulidas'], 'Microscopía Óptica de Minerales Opacos'],
      [['mineralogia aplicada y de procesos', 'mineralogia aplicada'], 'Mineralogía Aplicada y de Procesos'],
      [['cartografia geotecnica', 'mapas geotecnicos'], 'Cartografía Geotécnica'],
      [['gestion de los recursos del subsuelo'], 'Gestión de los Recursos del Subsuelo'],
      [['gestion de riesgos geologicos', 'amenazas naturales', 'riesgos geologicos'], 'Gestión de Riesgos Geológicos'],
      [['geoestadistica'], 'Geoestadística'],
      [['analisis de datos ambientales'], 'Análisis de Datos Ambientales'],
      [['mecanica de fluidos', 'fluidos'], 'Mecánica de Fluidos'],
      [['topografia', 'topo'], 'Topografía'],
      [['estrategias de gestion y gerencia de proyectos en ingenieria', 'gerencia de proyectos'], 'Estrategias de Gestión y Gerencia de Proyectos en Ingeniería'],
      [['gestion de proyectos de desarrollo y metodologia general ajustada', 'mga'], 'Gestión de Proyectos de Desarrollo y Metodología General Ajustada'],
      [['proyectos de innovacion y desarrollo'], 'Proyectos de Innovación y Desarrollo'],
      [['toma de decision para el diseno en ingenieria'], 'Toma de Decisión para el Diseño en Ingeniería'],
      [['fundamentos de ciclo de vida para ingenieria', 'ciclo de vida'], 'Fundamentos de Ciclo de Vida para Ingeniería'],
      [['practica de extension', 'pasantia', 'practica profesional', 'practica'], 'Práctica de Extensión'],
      [['cursos de posgrado', 'materias de posgrado', 'posgrado'], 'Cursos de Posgrado'],
    ];

    ALIAS_MATERIAS.forEach(([aliases, nombreReal]) => {
      const match = datos.asignaturas.find((a) => normalizar(a.nombre) === normalizar(nombreReal));
      if (match) {
        aliases.forEach((alias) => indices.aliasMaterias.set(normalizar(alias), match));
      }
    });

    // Indexar calendario académico oficial de la Facultad de Minas
    if (datos.info?.guias) {
      const guiaCal = datos.info.guias.find((g) => g.id === 'calendario-academico');
      if (guiaCal?.calendario?.grupos) {
        guiaCal.calendario.grupos.forEach((grupo) => {
          if (Array.isArray(grupo.filas)) {
            grupo.filas.forEach((fila) => {
              indices.calendarioFilas.push({
                evento: fila.evento,
                eventoNorm: normalizar(fila.evento),
                fecha: fila.fecha,
                grupo: grupo.titulo,
              });
            });
          }
        });
      }
    }
  }

  // ==========================================================================
  // 3. MOTOR DE RESPUESTAS E INTENCIONES (NATURAL LANGUAGE PROCESSOR)
  // ==========================================================================

  function responderPregunta(consultaOriginal) {
    const pregunta = (consultaOriginal || '').trim();
    const preguntaNorm = normalizar(pregunta);

    if (!preguntaNorm) {
      return {
        texto: 'Por favor escribe tu consulta sobre el programa de Ingeniería Geológica, la malla curricular, materias, prerrequisitos, salidas de campo, grupos estudiantiles, trámites o recursos de estudio.',
        chips: ['¿Qué es la malla curricular?', '¿Qué tipo de materias hay?', '¿Por qué estudiar Geológica?'],
      };
    }

    // ------------------------------------------------------------------------
    // 1. Saludos y Presentación
    // ------------------------------------------------------------------------
    if (/^(hola|buen(as|os)?|saludos|hey|que tal|iniciar|comenzar|hi|hello)$/.test(preguntaNorm) || preguntaNorm.startsWith('hola sofia')) {
      return {
        texto: `¡Hola! Soy **${SOFIA_CFG.nombre}**, tu asistente inteligente del programa de **${SOFIA_CFG.programa}** de la **${SOFIA_CFG.facultad}** (UNAL Medellín).

Pregúntame con total confianza sobre:
- **Malla Curricular y prerrequisitos** de las 77 asignaturas.
- **Tipos de materias** y componentes (Fundamentación, Disciplinar, Libre Elección).
- **Salidas de Campo** (Geología de Campo I, II y III).
- **¿Por qué estudiar Geológica?** y fortalezas en geotecnia, recursos y amenazas naturales.
- **¿Cómo hacer cambio de carrera / traslados?** ante la Facultad de Minas.
- **¿Quién es el creador de la web?**
- **Alianzas estratégicas** (ICETEX, Sapiencia, Metro Cívica, software técnico y geocientífico).
- **Banco de Recursos / Drive oficial** con guías de campo, presentaciones y parciales.
- **Representación estudiantil**, capítulos técnicos (SME, SEG, AAPG, ARMA, SCG) y trámites SGS.

¿Sobre qué tema te gustaría consultar hoy?`,
        chips: [
          '¿Qué es la malla curricular?',
          '¿Qué tipo de materias hay?',
          '¿Por qué estudiar Geológica?',
          '¿Quién es el creador de la web?',
          '¿Cómo hacer cambio de carrera?',
          '¿Cuáles son las alianzas?',
        ],
      };
    }

    // ------------------------------------------------------------------------
    // 2. ¿Quién es el Creador de la Web? (Requisito clave)
    // ------------------------------------------------------------------------
    if (/creador|quien creo|quien hizo|quien desarrollo|desarrollador|autor|santiago escobar|santiago|quien construyo esta web|quien programo/.test(preguntaNorm)) {
      return {
        texto: `### Creador y Arquitecto de Software de la Plataforma 💻

Este portal web oficial, sus simuladores de avance, la malla curricular interactiva y yo (**${SOFIA_CFG.nombre}**) fuimos creados y desarrollados integralmente por:

👨‍💻 **${SOFIA_CFG.creadorNombre}**
- **Rol:** ${SOFIA_CFG.creadorRol}.
- **Propósito:** Brindar herramientas digitales de vanguardia, transparentes y gratuitas para fortalecer la vida académica, el seguimiento curricular y el bienestar de los estudiantes de la **Facultad de Minas**.
- **Canal de contacto directo:**
  - WhatsApp: [Chat con Santiago Escobar](${SOFIA_CFG.creadorWhatsApp}) \`(+57 312 377 2091)\`
  - Correo institucional: \`${SOFIA_CFG.creadorCorreo}\`
  - Instagram: [@s_escobar__](${SOFIA_CFG.creadorInstagram})

El proyecto cuenta con propiedad intelectual y derechos de autor conforme a la Ley 23 de 1982 y normativas de software de la UNAL Medellín.`,
        chips: ['Canal Oficial de Geológica', '¿Qué es la malla curricular?', 'Banco de Recursos en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 3. ¿Qué es la Malla Curricular? / Malla en general
    // ------------------------------------------------------------------------
    if (/que es la malla|malla curricular|explicar la malla|como funciona la malla|ver la malla|entender la malla/.test(preguntaNorm)) {
      return {
        texto: `La **Malla Curricular de Ingeniería Geológica** (Código SIA **3536**, SNIES **126**) es la hoja de ruta estructurada de **10 semestres** y **180 créditos** del programa:

- **Semáforo interactivo:** Al hacer clic en cualquier asignatura en la [Malla Curricular](malla.html), se iluminan en **amarillo** sus prerrequisitos y en **verde** las materias que te desbloquea a futuro.
- **Colores por componente:** Verde mineral olivino (\`#2B5346\`) para formación disciplinar, amatista cuarzo (\`#8E6BB8\`) para fundamentación básica y ámbar dorado (\`#E59A30\`) para libre elección.
- **Sombreado de materias aprobadas:** Si pegaste tu historia académica en la sección [Mi Avance](avance.html), puedes activar el interruptor *"Sombreado de materias aprobadas"* para ver tu progreso reflejado en tiempo real sobre la malla.
- **Banco de materiales:** En la pestaña de Malla tienes acceso directo al [Banco de Recursos de Geológica en Google Drive](${SOFIA_CFG.driveRecursos}) con parciales, guías de campo y mapas temáticos.`,
        chips: ['¿Qué tipo de materias hay?', 'Prerrequisitos de Geotecnia', 'Ver Banco en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 4. ¿Qué tipo de materias hay? (Componentes y Tipologías)
    // ------------------------------------------------------------------------
    if (/que tipo de materias|tipos de materias|componentes|agrupaciones|tipologia|creditos del plan|cuantos creditos son|como se dividen las materias/.test(preguntaNorm)) {
      return {
        texto: `En el plan curricular de **Ingeniería Geológica** existen **3 grandes componentes de formación** que totalizan **180 créditos**:

1. **Componente de Fundamentación (44 créditos):**
   - **Matemáticas, Probabilidad y Estadística (19 cr):** Cálculo Diferencial, Cálculo Integral, Geometría Vectorial, Álgebra Lineal y Estadística I.
   - **Física (4 cr):** Física Mecánica.
   - **Química (6 cr):** Química General.
   - **Herramientas de Informática (3 cr):** Fundamentos de Programación (Python).
   - **Optativas de Fundamentación (12 cr):** Asignaturas elegibles como Ecuaciones Diferenciales, Métodos Numéricos, Electricidad y Magnetismo u Oscilaciones y Ondas.

2. **Componente de Formación Disciplinar o Profesional (100 créditos):**
   - **Geología Básica (38 cr):** Geología Física, Mineralogía, Mineralogía Óptica, Petrología Ígnea, Petrología Sedimentaria, Petrología Metamórfica, Estratigrafía y Geología Estructural.
   - **Geología Aplicada (24 cr):** Mecánica de Suelos, Geomecánica, Geotecnia, Depósitos Minerales y Metalogenia, Geofísica, Rocas y Minerales en la Industria.
   - **Herramientas de Apoyo a la Geología (6 cr):** SIG y Sensores Remotos.
   - **Proyectos en Ingeniería (10 cr):** FPI, Estructuración y Evaluación de Proyectos, Proyecto Integrado de Ingeniería.
   - **Geología de Campo (I, II y III):** Salidas formativas de cartografía y trabajo geológico in situ.
   - **Optativas Disciplinares (16 cr):** Hidrogeología, Gestión de Riesgos Geológicos, Tectónica, Neotectónica, etc.
   - **Trabajo de Grado (6 cr):** En el décimo semestre.

3. **Componente de Libre Elección (36 créditos = 20% del plan):**
   - Para profundizar en áreas de tu preferencia, idiomas, posgrados o materias de otras carreras.`,
        chips: ['¿Por qué estudiar Geológica?', 'Prerrequisitos de Geología de Campo I', 'Ir a Mi Avance'],
      };
    }

    // ------------------------------------------------------------------------
    // 5. ¿Por qué estudiar Geológica? / Fortalezas únicas
    // ------------------------------------------------------------------------
    if (/por que estudiar geologica|por que estudiar ingenieria geologica|fortalezas|ventajas|campos de accion|perfil del egresado|a que se dedica|por que geologica/.test(preguntaNorm)) {
      return {
        texto: `**¿Por qué estudiar Ingeniería Geológica en la UNAL Medellín?**

Nuestro programa en la **Facultad de Minas** es el pionero y referente de las Ciencias de la Tierra en Colombia:

1. **Más de 100 Años de Tradición y Prestigio:**
   Nacida en la histórica **Escuela de Minas (1911)** bajo el lema *«Trabajo y Rectitud»*, la carrera cuenta con Acreditación de Alta Calidad del MEN y alta reputación internacional.

2. **El Aula más Grande del País: Salidas de Campo:**
   La formación geológica de la UNAL se vive en el terreno con **Geología de Campo I, II y III**, estudiando macizos rocosos, cuencas sedimentarias, fallas activas y yacimientos en los Andes colombianos.

3. **Enfoque Integral: De la Ciencia a la Ingeniería Aplicada:**
   No solo comprendes la historia del planeta: diseñas soluciones geotécnicas para **obras civiles (túneles, vías, presas, taludes)**, identificas y mitigas **amenazas geológicas y riesgos naturales**, y exploras aguas subterráneas (**hidrogeología**).

4. **Liderazgo en la Transición Energética y Minerales Estratégicos:**
   Los ingenieros geólogos son los exploradores de los minerales críticos para la descarbonización (cobre, litio, níquel, tierras raras), la energía geotérmica y el almacenamiento de carbono (**CCUS**).

5. **Capítulos Estudiantiles Internacionales:**
   Presencia activa de capítulos profesionales globales: **SME, SEG, AAPG, ARMA y la SCG**, que brindan becas, eventos internacionales y redes de trabajo.`,
        chips: ['Semilleros y Capítulos', 'Ver Malla Curricular', '¿Quién es el creador de la web?'],
      };
    }

    // ------------------------------------------------------------------------
    // 6. ¿Cómo hacer cambio de carrera / Traslado de programa?
    // ------------------------------------------------------------------------
    if (/cambio de carrera|traslado|cambiarme de carrera|cambiarme de programa|traslado de programa|pasarme a|homologacion/.test(preguntaNorm)) {
      return {
        texto: `**¿Cómo solicitar Traslado de Programa Curricular (Cambio de carrera)?**

El trámite oficial se realiza ante el Consejo de la **Facultad de Minas** conforme al Estatuto Estudiantil (**Acuerdo 008 de 2008** del CSU):

1. **Requisitos Normativos Básicos:**
   - Tener la condición de estudiante regular activo en la UNAL.
   - Contar con un **P.A.P.A. competitivo** (cada comité de carrera evalúa el corte de cupos disponibles).
   - Tener suficiente **cupo de créditos disponibles** en el SIA para terminar el nuevo plan de estudios.
   - Haber cursado al menos el número de créditos exigido en tu programa de origen.

2. **Procedimiento de Radicación:**
   - La convocatoria se abre semestralmente conforme al Calendario Académico de la sede.
   - Se radica formalmente mediante el **SGS (Sistema de Gestión de Solicitudes)** de la Facultad de Minas:
     🔗 [Portal de Solicitudes GAE Minas](${SOFIA_CFG.tramitesMinasUrl})
   - Seleccionas la opción *«Traslado de programa curricular»*, adjuntas tu carta de motivación y soportes.

3. **Asesoría y Acompañamiento:**
   - Si tienes dudas sobre cupos de créditos o materias convalidables, escribe a **Asesoría Estudiantil de Minas**: \`${SOFIA_CFG.asesoriaMinasCorreo}\` (Campus Robledo, Bloque M4).`,
        chips: ['Portal Solicitudes SGS', 'Calendario académico', '¿Qué es el P.A.P.A.?'],
      };
    }

    // ------------------------------------------------------------------------
    // 7. Alianzas Estratégicas para el Bienestar
    // ------------------------------------------------------------------------
    if (/alianza|alianzas|convenio|convenios|sapiencia|icetex|metro|civica|beneficios de bienestar|becas/.test(preguntaNorm)) {
      return {
        texto: `**Alianzas Estratégicas y Convenios (UNAL Sede Medellín y Facultad de Minas):**

1. **Alianzas de Permanencia y Bienestar:**
   - **ICETEX:** Líneas de crédito tradicionales, condonables y subsidios de sostenimiento.
   - **Sapiencia (Alcaldía de Medellín):** Fondos de Presupuesto Participativo, Fondo EPM y Becas Medellín para matrícula y gastos de sostenimiento.
   - **Metro de Medellín (Cívica Estudiante):** Tarifa preferencial con descuento superior al 50% en Metro, Tranvía, Metrocable y Metroplús.
   - **Auxilios de Bienestar UNAL:** Apoyo alimentario, bono de transporte y residencias universitarias (gestión en Bloque M4 Robledo / Bloque 11A Volador).

2. **Convenios de Software Geocientífico y Tecnológico:**
   - **Software Geológico y Minero:** Acceso en salas de cómputo de la Facultad de Minas a licencias de **ArcGIS, QGIS, Leapfrog Geo, Datamine, Rocscience (Dips, Slide, RS2)** y Petrel.
   - **GitHub Student Developer Pack:** Cuentas Pro, GitHub Copilot gratuito y créditos en la nube (AWS, Azure, DigitalOcean).
   - **Autodesk Educación:** Licencias completas de Civil 3D, AutoCAD y Revit con correo institucional \`@unal.edu.co\`.
   - **JetBrains, MATLAB & Microsoft 365:** Herramientas completas para computación técnica.

Consulta todos los convenios en la sección [Convenios](convenios.html).`,
        chips: ['Ver sección Convenios', 'Auxilios de Bienestar', '¿Quién es el creador de la web?'],
      };
    }

    // ------------------------------------------------------------------------
    // 8. Unidad Compartida / Google Drive de Recursos
    // ------------------------------------------------------------------------
    if (/drive|unidad compartida|banco de recursos|material de estudio|parciales pasados|parciales viejos|talleres|apuntes|guias de campo|libros/.test(preguntaNorm)) {
      return {
        texto: `### Banco de Recursos y Material de Estudio · Ingeniería Geológica 📚

Las guías de campo, presentaciones magistrales, parciales anteriores, memorias de talleres y mapas temáticos están centralizados en el **Google Drive Oficial de Recursos**:

🔗 **[Abrir Banco de Recursos de Geológica en Google Drive](${SOFIA_CFG.driveRecursos})**

💡 *Recomendación:* Inicia sesión con tu correo institucional (\`@unal.edu.co\`) para tener acceso completo e inmediato a todas las carpetas clasificadas por semestre y asignatura.`,
        chips: ['Ver Malla Curricular', 'Canal Oficial de WhatsApp', 'Prerrequisitos de materias'],
      };
    }

    // ------------------------------------------------------------------------
    // 9. Contacto de la Representación y Canales Oficiales
    // ------------------------------------------------------------------------
    if (/repre|representante|representacion|contacto|redes|instagram|canal|salome|sofia franco|como me comunico|asesoria/.test(preguntaNorm)) {
      return {
        texto: `### Canales Oficiales de Contacto · Ingeniería Geológica 📣

Para comunicarte con la representación estudiantil y estar al día con convocatorias:

1. **Representación Estudiantil de Geológica:**
   - **Titular:** ${SOFIA_CFG.repreTitular}
   - **Suplente:** ${SOFIA_CFG.repreSuplente}
   - WhatsApp de contacto de Salomé: [Chat con Salomé](${SOFIA_CFG.whatsappRepre}) \`${SOFIA_CFG.telefonoRepre}\`

2. **Canal Oficial de WhatsApp:**
   - Avisos, convocatorias de salidas de campo y asambleas:
   👉 **[Canal Oficial de WhatsApp](${SOFIA_CFG.canalWhatsApp})**

3. **Instagram Oficial de la Representación:**
   - Síguenos en **[${SOFIA_CFG.usuarioInstagram}](${SOFIA_CFG.instagramRepre})**.

4. **Asesoría Estudiantil · Facultad de Minas:**
   - Correo oficial: \`${SOFIA_CFG.asesoriaMinasCorreo}\`
   - Teléfono: \`${SOFIA_CFG.asesoriaMinasTel}\`
   - Ubicación: Campus Robledo, Bloque M4.

5. **Soporte y Desarrollador del Portal:**
   - Santiago Escobar Arias (Representante de Sistemas): [Chat de WhatsApp](${SOFIA_CFG.creadorWhatsApp}) · \`${SOFIA_CFG.creadorCorreo}\`.`,
        chips: ['Canal de WhatsApp', 'Banco de Recursos en Drive', 'Portal Solicitudes SGS'],
      };
    }

    // ------------------------------------------------------------------------
    // 10. Grupos de WhatsApp de estudio / de materias
    // ------------------------------------------------------------------------
    if (/grupo de whatsapp|grupos de whatsapp|wpp de materias|grupo de estudio|comunidad de wpp/.test(preguntaNorm)) {
      return {
        texto: `### Grupos de WhatsApp y Redes de Estudio 💬

- Los enlaces de los grupos de WhatsApp de materias de Geológica se difunden y organizan a través del **[Canal Oficial de WhatsApp de Geológica](${SOFIA_CFG.canalWhatsApp})**.
- Si administras el grupo de WhatsApp de alguna asignatura de Geológica y deseas que lo vinculemos en la [Malla Curricular](malla.html), escribe al canal o contacta al creador del portal para sumarlo directamente a la ficha del curso.`,
        chips: ['Canal Oficial de WhatsApp', 'Banco en Drive', 'Malla Curricular'],
      };
    }

    // ------------------------------------------------------------------------
    // 11. Semilleros y Grupos Estudiantiles (CCUS, GEMMA, SME, SEG, etc.)
    // ------------------------------------------------------------------------
    if (/semillero|semilleros|ccus|gemma|museo|sema|gea|egeo|geolatinas|scg|sme|seg|aapg|arma|grupos estudiantiles|capitulo/.test(preguntaNorm)) {
      return {
        texto: `### Grupos de Investigación, Semilleros y Capítulos en Geológica 🔬

En Ingeniería Geológica contamos con una comunidad científica y estudiantil de vanguardia:

1. **Semilleros y Grupos de Investigación:**
   - **CCUS (CO₂):** Captura, Uso y Almacenamiento Geológico de Carbono ([@semilleroco2](https://www.instagram.com/semilleroco2/)).
   - **GEMMA:** Georrecursos, Minería y Medio Ambiente ([@gemma_unal](https://www.instagram.com/gemma_unal/)).
   - **Museo de Geociencias:** Patrimonio geológico, mineralogía y paleontología ([@museodegeocienciasun](https://www.instagram.com/museodegeocienciasun/)).
   - **SEMA:** Medio ambiente, hidrogeología y aguas subterráneas.
   - **GEA:** Geología Estructural Aplicada.
   - **EGEO:** Estratigrafía y Geología del Petróleo.
   - **GeoLatinas Medellín:** Agrupación por la visibilidad de mujeres en geociencias ([@geolatinas_medellin](https://www.instagram.com/geolatinas_medellin/)).

2. **Capítulos Profesionales Estudiantiles:**
   - **SCG:** Sociedad Colombiana de Geología ([@scgunalmed](https://www.instagram.com/scgunalmed/)).
   - **SME:** Society for Mining, Metallurgy & Exploration ([@sme_unalmed](https://www.instagram.com/sme_unalmed/)).
   - **SEG:** Society of Economic Geologists ([@seg_unalmed](https://www.instagram.com/seg_unalmed/)).
   - **AAPG:** American Association of Petroleum Geologists ([@aapg_unalmed](https://www.instagram.com/aapg_unalmed/)).
   - **ARMA:** American Rock Mechanics Association ([@armamedellin](https://www.instagram.com/armamedellin/)).`,
        chips: ['Semillero CCUS en Instagram', 'GEMMA en Instagram', 'Banco de Recursos en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 12. Salidas de Campo / Geología de Campo I, II y III
    // ------------------------------------------------------------------------
    if (/salida de campo|salidas de campo|geologia de campo|campo 1|campo 2|campo 3|terreno/.test(preguntaNorm)) {
      return {
        texto: `### Salidas de Campo en Ingeniería Geológica ⛰️

Las materias de **Geología de Campo** son el pilar formativo del ingeniero geólogo de la UNAL Medellín:

1. **Geología de Campo I (\`3007781\` - 3 cr, Semestre 5):**
   - *Prerrequisitos:* Elementos de Geología Estructural, Mineralogía, Geología Física y Topografía.
   - *Enfoque:* Fundamentos de brújula de geólogo, descripción litológica en afloramientos y levantamiento de columnas estratigráficas.

2. **Geología de Campo II (\`3007769\` - 4 cr, Semestre 7):**
   - *Prerrequisitos:* Geología de Campo I, Petrología Ígnea, Petrología Sedimentaria, Petrología Metamórfica y Estratigrafía.
   - *Enfoque:* Cartografía geológica regional integrada y correlación de unidades estratigráficas.

3. **Geología de Campo III (\`3007461\` - 3 cr, Semestre 8):**
   - *Prerrequisitos:* Geología de Campo II y Geología de Colombia.
   - *Enfoque:* Cartografía geológico-geotécnica y estructural avanzada en zonas complejas del territorio colombiano.`,
        chips: ['Prerrequisitos de Geología de Campo I', 'Ver Malla Curricular', 'Banco en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 13. Materias de último semestre / Décimo semestre en Geológica
    // ------------------------------------------------------------------------
    if (/ultimo semestre|ultimos semestres|decimo semestre|semestre 10|10 semestre|materias para graduarme|terminar la carrera/.test(preguntaNorm)) {
      return {
        texto: `En el **10° y último semestre** de Ingeniería Geológica el plan está diseñado para culminar tu formación profesional:

1. **Trabajo de Grado (\`3007442\` - 6 créditos):**
   Modalidades oficiales en la Facultad de Minas:
   - **Práctica de Extensión (\`3010678\`):** Pasantía empresarial en consultoras de geotecnia, minería, hidrocarburos o entidades públicas (Servicio Geológico Colombiano - SGC, Corantioquia, DAGRD).
   - **Proyecto de Investigación:** Vinculado a semilleros como CCUS, GEMMA o grupos de tectónica.
   - **Asignaturas de Posgrado (\`3007443\`):** Cursar materias de maestría en la Facultad de Minas.

2. **Créditos Disciplinares y Optativas Restantes:**
   Completar las optativas de profundización en riesgos, hidrogeología o geotecnia minera.

3. **Créditos de Libre Elección:**
   Tener aprobados los **36 créditos** exigidos.

4. **Requisitos de Grado:**
   - Cumplir el requisito de suficiencia en idioma extranjero (Inglés B1/B2 según tu cohorte).
   - Completar los **180 créditos** del plan de estudios.

Consulta tu progreso en [Mi Avance](avance.html).`,
        chips: ['Prerrequisitos de Trabajo de Grado', 'Ir a Mi Avance', 'Ver Malla Curricular'],
      };
    }

    // ------------------------------------------------------------------------
    // 14. Prerrequisitos de materias específicas
    // ------------------------------------------------------------------------
    const esConsultaPrereq = /prerrequisit|prerequisit|requisito|que pide|que necesito para ver|para matricular|correquisit|abrir|correr/.test(preguntaNorm);
    const materiaEncontrada = buscarAsignaturaPorTexto(preguntaNorm);

    if (materiaEncontrada && (esConsultaPrereq || preguntaNorm.includes(normalizar(materiaEncontrada.nombre)))) {
      const preCodigos = materiaEncontrada.prerrequisitos || [];
      const correqCodigos = materiaEncontrada.correquisitos || [];

      let detallePrereq = '';
      if (preCodigos.length === 0) {
        detallePrereq = 'No tiene prerrequisitos. La puedes matricular desde tu primer semestre (según tu cupo de créditos y cita del SIA).';
      } else {
        const nombresPre = preCodigos.map((cod) => {
          const preMat = indices.materiasPorCodigo.get(cod);
          return preMat ? `• **${preMat.nombre}** (\`${cod}\`)` : `• Asignatura código \`${cod}\``;
        }).join('\n');
        detallePrereq = `**Prerrequisito(s) necesario(s):**\n${nombresPre}`;
      }

      let detalleCorreq = '';
      if (correqCodigos.length > 0) {
        const nombresCorreq = correqCodigos.map((cod) => {
          const cMat = indices.materiasPorCodigo.get(cod);
          return cMat ? `• **${cMat.nombre}** (\`${cod}\`)` : `• Asignatura código \`${cod}\``;
        }).join('\n');
        detalleCorreq = `\n\n**Correquisito(s) (simultáneos):**\n${nombresCorreq}`;
      }

      const semestreTxt = materiaEncontrada.semestre ? `Semestre sugerido: **${materiaEncontrada.semestre}°**` : 'Asignatura Optativa';
      const obligatoriaTxt = materiaEncontrada.obligatoria ? 'Obligatoria' : 'Optativa';

      const chipsPre = preCodigos
        .map((cod) => indices.materiasPorCodigo.get(cod))
        .filter(Boolean)
        .map((m) => `Prerrequisitos de ${m.nombre}`);

      return {
        texto: `### ${materiaEncontrada.nombre} (\`${materiaEncontrada.codigo}\`)

${detallePrereq}${detalleCorreq}

- **Créditos:** ${materiaEncontrada.creditos}
- **Tipología:** ${obligatoriaTxt} (${materiaEncontrada.agrupacion || 'General'})
- **Nivel:** ${semestreTxt}

Puedes consultar esta asignatura interactiva en la [Malla Curricular](malla.html).`,
        chips: chipsPre.length > 0 ? chipsPre.slice(0, 3) : ['Ver Malla Curricular', 'Banco de Recursos en Drive'],
      };
    }

    // ------------------------------------------------------------------------
    // 15. Materias por semestre (Semestre 1 al 10)
    // ------------------------------------------------------------------------
    const matchSem = preguntaNorm.match(/semestre\s*([1-9]|10)\b|primer semestre|segundo semestre|tercer semestre|cuarto semestre|quinto semestre|sexto semestre|septimo semestre|octavo semestre|noveno semestre|decimo semestre/);
    if (matchSem) {
      let numSem = 0;
      if (matchSem[1]) {
        numSem = parseInt(matchSem[1], 10);
      } else {
        const ord = matchSem[0];
        if (ord.includes('primer')) numSem = 1;
        else if (ord.includes('segund')) numSem = 2;
        else if (ord.includes('tercer')) numSem = 3;
        else if (ord.includes('cuart')) numSem = 4;
        else if (ord.includes('quint')) numSem = 5;
        else if (ord.includes('sext')) numSem = 6;
        else if (ord.includes('septim')) numSem = 7;
        else if (ord.includes('octav')) numSem = 8;
        else if (ord.includes('noven')) numSem = 9;
        else if (ord.includes('decim')) numSem = 10;
      }

      if (numSem >= 1 && numSem <= 10) {
        const materiasSem = indices.materiasPorSemestre.get(numSem) || [];
        if (materiasSem.length > 0) {
          const listaTxt = materiasSem
            .map((asig) => {
              const preCount = asig.prerrequisitos?.length || 0;
              const preTxt = preCount === 0 ? '_Sin prereq_' : `_${preCount} prerrequisito(s)_`;
              return `• **${asig.nombre}** (\`${asig.codigo}\`, ${asig.creditos} cr) — ${preTxt}`;
            })
            .join('\n');

          const creditosTotal = materiasSem.reduce((acc, m) => acc + (m.creditos || 0), 0);

          return {
            texto: `### Asignaturas sugeridas para Semestre ${numSem}° (${creditosTotal} créditos en la ruta)

${listaTxt}

Puedes explorar sus relaciones en la [Malla Curricular](malla.html).`,
            chips: materiasSem.slice(0, 3).map((m) => `Prerrequisitos de ${m.nombre}`),
          };
        }
      }
    }

    // ------------------------------------------------------------------------
    // 16. Cancelación de materias o cancelación de semestre
    // ------------------------------------------------------------------------
    if (/cancelar materia|cancelacion de materias|cancelacion extemporanea|cancelar semestre|plazo cancelar|hasta cuando cancelar/.test(preguntaNorm)) {
      return {
        texto: `**Plazos y Condiciones para Cancelar Asignaturas en la Facultad de Minas (Pregrado):**

1. **Semana 3 (Cancelación sin pérdida de créditos):**
   - Es el periodo en el SIA donde puedes retirar asignaturas y los créditos regresan completos a tu bolsa disponible para futuros semestres.

2. **Semana 8 (Cancelación ordinaria con pérdida de créditos):**
   - Puedes cancelar la materia en el SIA hasta esta semana. No afectará tu promedio, pero esos créditos no se devuelven a tu bolsa.

3. **Cancelación Extemporánea (Por fuerza mayor o enfermedad):**
   - Si superaste la semana 8 y sufriste una calamidad de salud, médica o laboral demostrable, radicas la solicitud ante el **SGS de la Facultad de Minas**:
     🔗 [Portal Solicitudes SGS Minas](${SOFIA_CFG.tramitesMinasUrl})
   - Adjuntas los certificados médicos avalados por Bienestar Universitario (Bloque M4 / Robledo).`,
        chips: ['Portal Solicitudes SGS', 'Calendario académico', 'Asesoría Estudiantil'],
      };
    }

    // ------------------------------------------------------------------------
    // 17. Consultas del Calendario Académico
    // ------------------------------------------------------------------------
    if (/calendario|fechas|cuando empiezan clases|cuando terminan|semana de induccion|recesos|evaluacion docente/.test(preguntaNorm)) {
      if (indices.calendarioFilas.length > 0) {
        const palabrasClave = preguntaNorm.split(' ').filter((p) => p.length > 3);
        const coincidencias = indices.calendarioFilas.filter((f) =>
          palabrasClave.some((p) => f.eventoNorm.includes(p))
        );

        if (coincidencias.length > 0) {
          const listado = coincidencias
            .slice(0, 5)
            .map((c) => `• **${c.evento}:** ${c.fecha} _(${c.grupo})_`)
            .join('\n');

          return {
            texto: `**Fechas encontradas en el Calendario Académico Oficial:**\n\n${listado}\n\nPuedes revisar todas las fechas en la guía de [Información General](info.html).`,
            chips: ['Cancelar materias', 'Citas del SIA', 'Bolsa de créditos'],
          };
        }
      }

      return {
        texto: `El **Calendario Académico Oficial (2026-2S)** de la UNAL Sede Medellín establece los hitos clave para matrícula, inicio de clases, cancelaciones y cierre de actas.

Consulta la tabla completa de fechas discriminada por semanas en la sección de [Información General](info.html).`,
        chips: ['Plazos para cancelar materias', 'Citas del SIA', 'Bolsa de créditos'],
      };
    }

    // ------------------------------------------------------------------------
    // 18. P.A.P.A., Citas SIA y Bolsa de Créditos
    // ------------------------------------------------------------------------
    if (/papa|promedio|citas sia|dninfoa|bolsa de creditos|cupo de creditos|creditos adicionales|como calcular el papa/.test(preguntaNorm)) {
      return {
        texto: `**Conceptos Clave del Sistema Académico SIA:**

- **P.A.P.A. (Promedio Aritmético Ponderado Acumulado):**
  Se calcula multiplicando la calificación final de cada materia cursada (aprobada o reprobada) por sus créditos, sumando los productos y dividiéndolos entre el total de créditos cursados.
  Determina tu grupo de citación para matrícula, adjudicación de becas y traslados de programa.

- **Citas DNINFOA:**
  Se asignan en 4 grupos de prelación basados en tu P.A.P.A. del periodo anterior y avance de carrera:
  - *Grupo 1:* Estudiantes con mejores promedios y deportistas representativos.
  - *Grupos 2, 3 y 4:* Orden sucesivo de cita para inscripción de asignaturas.

- **Bolsa de Créditos:**
  Recibes un cupo inicial para tu plan (180 créditos en Geológica). Si mantienes un P.A.P.A. sobresaliente, puedes solicitar créditos adicionales a la Vicedecanatura Académica de Minas vía SGS.

Calcula tu proyección en [Mi Avance](avance.html) o lee la guía completa en [Información General](info.html).`,
        chips: ['Ir a Mi Avance', '¿Cómo hacer cambio de carrera?', 'Ver Malla Curricular'],
      };
    }

    // ------------------------------------------------------------------------
    // 19. Horas de Corresponsabilidad
    // ------------------------------------------------------------------------
    if (/corresponsabilidad|horas de corresponsabilidad|servicio social|beneficiarios bienestar/.test(preguntaNorm)) {
      return {
        texto: `**Horas de Corresponsabilidad en la UNAL:**

Si eres beneficiario de apoyos socioeconómicos de Bienestar Universitario (Gestión Alimentaria, Residencias o Bonos de Transporte):
- Debes cumplir entre **20 y 40 horas** por semestre de actividades solidarias en dependencias de la universidad.
- En la Facultad de Minas puedes cumplirlas apoyando el Museo de Geociencias, salas de cómputo, laboratorios de mecánica de suelos o eventos académicos.
- El registro y legalización se realiza en el sistema de Bienestar Universitario.`,
        chips: ['Auxilios de Bienestar', 'Información General', 'Contacto Asesoría Minas'],
      };
    }

    // ------------------------------------------------------------------------
    // 20. Bus Intercampus (Robledo <-> Volador <-> Río)
    // ------------------------------------------------------------------------
    if (/bus intercampus|intercampus|ruta de bus|transporte entre campus|como ir a robledo|como ir al volador/.test(preguntaNorm)) {
      return {
        texto: `**Servicio de Bus Intercampus UNAL Sede Medellín:**

Conecta de forma gratuita a la comunidad universitaria entre los campus de la sede:
- **Ruta Robledo ↔ Volador:** Vital para estudiantes de la Facultad de Minas que tienen asignaturas de fundamentación o bienestar en El Volador.
- **Ruta Volador ↔ Campus del Río:** Conexión con laboratorios y posgrados.
- **Horarios:** Salidas continuas de lunes a viernes entre las **06:00 a.m. y las 08:30 p.m.** (cada 20 a 30 minutos según el tráfico).
- **Requisito:** Presentar carné institucional físico o digital en la aplicación móvil UNAL.

Consulta el mapa y paraderos en la pestaña de [Intercampus](intercampus.html).`,
        chips: ['Ver sección Intercampus', 'Convenio Metro Cívica', 'Información General'],
      };
    }

    // ------------------------------------------------------------------------
    // 21. Búsqueda en FAQs del portal
    // ------------------------------------------------------------------------
    if (datos.info?.faq && Array.isArray(datos.info.faq)) {
      const matchFaq = datos.info.faq.find((item) => {
        const pregNorm = normalizar(item.pregunta);
        const palabras = preguntaNorm.split(' ').filter((w) => w.length > 3);
        return palabras.filter((w) => pregNorm.includes(w)).length >= 2;
      });

      if (matchFaq) {
        return {
          texto: `**${matchFaq.pregunta}**\n\n${matchFaq.respuesta}`,
          chips: ['¿Qué es la malla curricular?', 'Banco de Recursos en Drive', 'Contacto de la Representación'],
        };
      }
    }

    // ------------------------------------------------------------------------
    // 22. Fallback / Respuesta por defecto inteligente
    // ------------------------------------------------------------------------
    return {
      texto: `No encontré una coincidencia exacta para tu consulta, pero estoy lista para orientarte en cualquiera de estos temas oficiales de **Ingeniería Geológica**:

- **Malla y Prerrequisitos:** Pregúntame por asignaturas como *Geotecnia*, *Geología de Campo I*, *Mecánica de Suelos*, *Depósitos Minerales*, *Mineralogía*, etc.
- **Tipos de materias:** Cómo se distribuyen los 180 créditos del plan.
- **Salidas de Campo:** Detalles de Geología de Campo I, II y III.
- **¿Por qué estudiar Geológica?** y fortalezas en recursos, geotecnia y riesgos.
- **¿Quién es el creador de la web?**
- **¿Cómo hacer cambio de carrera / traslados?** ante la Facultad de Minas.
- **Banco de Recursos en Drive:** Parciales, guías y mapas temáticos.
- **Capítulos y Semilleros:** CCUS, GEMMA, SME, SEG, AAPG, ARMA y SCG.`,
      chips: [
        '¿Qué es la malla curricular?',
        '¿Qué tipo de materias hay?',
        '¿Por qué estudiar Geológica?',
        '¿Quién es el creador de la web?',
        '¿Cómo hacer cambio de carrera?',
        'Banco de Recursos en Drive',
      ],
    };
  }

  // Búsqueda inteligente de asignaturas por texto y alias
  function buscarAsignaturaPorTexto(textoNorm) {
    // 1. Por código numérico directo
    const matchCod = textoNorm.match(/\b(\d{7}|10000\d{2}-m)\b/i);
    if (matchCod) {
      const codigo = matchCod[1].toUpperCase();
      if (indices.materiasPorCodigo.has(codigo)) {
        return indices.materiasPorCodigo.get(codigo);
      }
    }

    // 2. Por alias exacto
    for (const [alias, asig] of indices.aliasMaterias.entries()) {
      if (textoNorm.includes(alias)) {
        return asig;
      }
    }

    // 3. Por nombre oficial de la asignatura
    for (const [nomNorm, asig] of indices.materiasPorNombre.entries()) {
      if (textoNorm.includes(nomNorm)) {
        return asig;
      }
    }

    return null;
  }

  // ==========================================================================
  // 4. GENERACIÓN DEL DOM Y ELEMENTOS DE INTERFAZ
  // ==========================================================================

  function crearElementosDOM() {
    if (document.getElementById('sofia-contenedor-global')) return;

    const contenedorGlobal = document.createElement('div');
    contenedorGlobal.id = 'sofia-contenedor-global';
    contenedorGlobal.className = 'sofia-flotante-wrap';

    // 1. Globo de bienvenida (tooltip)
    const globo = document.createElement('div');
    globo.className = 'sofia-globo-bienvenida';
    globo.id = 'sofia-globo';
    globo.setAttribute('role', 'status');
    globo.innerHTML = `
      <span class="sofia-globo-texto">👋 ¿Dudas con materias o trámites? <strong>Pregúntale a sofIA</strong></span>
      <button class="sofia-globo-cerrar" id="sofia-globo-cerrar" type="button" aria-label="Cerrar aviso">✕</button>
    `;

    // 2. Botón flotante circular
    const boton = document.createElement('button');
    boton.className = 'sofia-boton';
    boton.id = 'sofia-btn-toggle';
    boton.type = 'button';
    boton.setAttribute('aria-label', 'Abrir asistente virtual sofIA de Geológica');
    boton.setAttribute('aria-expanded', 'false');
    boton.innerHTML = `
      <span class="sofia-boton__halo" aria-hidden="true"></span>
      ${SOFIA_SVG_AVATAR}
      <span class="sofia-boton__badge" title="sofIA en línea"></span>
    `;

    // 3. Ventana modal de conversación
    const ventana = document.createElement('section');
    ventana.className = 'sofia-ventana';
    ventana.id = 'sofia-ventana';
    ventana.setAttribute('aria-label', 'Chat con asistente virtual sofIA');
    ventana.hidden = true;

    ventana.innerHTML = `
      <header class="sofia-cabecera">
        <div class="sofia-cabecera__identidad">
          <div class="sofia-cabecera__avatar-wrap" aria-hidden="true">
            ${SOFIA_SVG_AVATAR}
          </div>
          <div class="sofia-cabecera__datos">
            <div class="sofia-cabecera__nombre-wrap">
              <h2 class="sofia-cabecera__nombre">sofIA</h2>
              <span class="sofia-cabecera__tag">UNAL</span>
            </div>
            <span class="sofia-cabecera__estado">
              <span class="sofia-cabecera__punto-estado" aria-hidden="true"></span>
              En línea · Asistente de Geológica
            </span>
          </div>
        </div>
        <div class="sofia-cabecera__acciones">
          <button class="sofia-btn-icono" id="sofia-btn-limpiar" type="button" title="Reiniciar conversación" aria-label="Reiniciar conversación">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
          <button class="sofia-btn-icono" id="sofia-btn-cerrar" type="button" title="Cerrar chat" aria-label="Cerrar chat">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      <div class="sofia-mensajes" id="sofia-mensajes" role="log" aria-live="polite">
        <!-- Los mensajes se inyectan dinámicamente aquí -->
      </div>

      <form class="sofia-formulario" id="sofia-form" autocomplete="off">
        <input
          type="text"
          class="sofia-input"
          id="sofia-input"
          placeholder="Pregúntale a sofIA sobre la malla, materias, alianzas..."
          aria-label="Escribe tu consulta para sofIA"
          maxlength="240"
        />
        <button class="sofia-btn-enviar" id="sofia-btn-enviar" type="submit" aria-label="Enviar mensaje a sofIA">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>

      <div class="sofia-pie-aviso">
        sofIA consulta la base oficial del portal de Ingeniería Geológica UNAL.
      </div>
    `;

    contenedorGlobal.appendChild(globo);
    contenedorGlobal.appendChild(ventana);
    contenedorGlobal.appendChild(boton);
    document.body.appendChild(contenedorGlobal);

    vincularEventos();
    agregarMensajeInicial();
  }

  // ==========================================================================
  // 5. MANIPULACIÓN DEL DOM Y RENDER DE MENSAJES
  // ==========================================================================

  function agregarMensajeInicial() {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor || contenedor.children.length > 0) return;

    const textoBienvenida = `¡Hola! Soy **${SOFIA_CFG.nombre}**, tu asistente holográfica de **${SOFIA_CFG.programa}** de la **${SOFIA_CFG.facultad}** (UNAL Medellín).

Estoy conectada a toda la información oficial: malla curricular, tipos de materias, prerrequisitos, salidas de campo, grupos estudiantiles, alianzas de bienestar, cambio de carrera, creador de la plataforma, fechas del calendario y el Drive de estudio. ¿En qué te puedo colaborar hoy?`;

    const chipsIniciales = [
      '¿Qué es la malla curricular?',
      '¿Qué tipo de materias hay?',
      '¿Por qué estudiar Geológica?',
      '¿Quién es el creador de la web?',
      '¿Cómo hacer cambio de carrera?',
      '¿Cuáles son las alianzas?',
      'Salidas de Campo',
      'Ver Banco en Drive',
    ];

    agregarMensajeAlDOM('bot', textoBienvenida, chipsIniciales);
    contenedor.scrollTop = 0;
  }

  function agregarMensajeAlDOM(remitente, textoMarkdown, chips = []) {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor) return;

    const fila = document.createElement('div');
    fila.className = `sofia-mensaje-fila sofia-mensaje-fila--${remitente}`;

    if (remitente === 'bot') {
      const avatarWrap = document.createElement('div');
      avatarWrap.className = 'sofia-mensaje-avatar';
      avatarWrap.setAttribute('aria-hidden', 'true');
      avatarWrap.innerHTML = SOFIA_SVG_AVATAR;
      fila.appendChild(avatarWrap);
    }

    const burbuja = document.createElement('div');
    burbuja.className = 'sofia-burbuja';
    burbuja.innerHTML = formatearMarkdown(textoMarkdown);

    if (chips && chips.length > 0) {
      const contenedorChips = document.createElement('div');
      contenedorChips.className = 'sofia-chips-contenedor';
      chips.forEach((chipTexto) => {
        const chipBtn = document.createElement('button');
        chipBtn.className = 'sofia-chip';
        chipBtn.type = 'button';
        chipBtn.textContent = chipTexto;
        chipBtn.addEventListener('click', () => {
          procesarConsultaUsuario(chipTexto);
        });
        contenedorChips.appendChild(chipBtn);
      });
      burbuja.appendChild(contenedorChips);
    }

    fila.appendChild(burbuja);
    contenedor.appendChild(fila);
    contenedor.scrollTop = contenedor.scrollHeight;
  }

  function mostrarIndicadorEscribiendo() {
    const contenedor = document.getElementById('sofia-mensajes');
    if (!contenedor) return;

    const fila = document.createElement('div');
    fila.className = 'sofia-mensaje-fila sofia-mensaje-fila--bot';
    fila.id = 'sofia-escribiendo-indicador';

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'sofia-mensaje-avatar';
    avatarWrap.setAttribute('aria-hidden', 'true');
    avatarWrap.innerHTML = SOFIA_SVG_AVATAR;

    const burbuja = document.createElement('div');
    burbuja.className = 'sofia-burbuja sofia-escribiendo';
    burbuja.innerHTML = `
      <span class="sofia-escribiendo-punto"></span>
      <span class="sofia-escribiendo-punto"></span>
      <span class="sofia-escribiendo-punto"></span>
    `;

    fila.appendChild(avatarWrap);
    fila.appendChild(burbuja);
    contenedor.appendChild(fila);
    contenedor.scrollTop = contenedor.scrollHeight;
  }

  function removerIndicadorEscribiendo() {
    const el = document.getElementById('sofia-escribiendo-indicador');
    if (el) el.remove();
  }

  // Parseador ligero de Markdown seguro a HTML
  function formatearMarkdown(md) {
    if (!md) return '';
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Encabezados h3
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');

    // Negritas e itálicas
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Código en línea
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Enlaces markdown [texto](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Listas con viñetas • o -
    html = html.replace(/^[•\-] (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Saltos de línea a párrafos
    const parrafos = html.split(/\n\n+/);
    return parrafos
      .map((p) => {
        p = p.trim();
        if (p.startsWith('<h3>') || p.startsWith('<ul>') || p.startsWith('<li>')) return p;
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');
  }

  // ==========================================================================
  // 6. EVENTOS Y CONTROLADORES DE INTERFAZ
  // ==========================================================================

  function abrirSofia() {
    const ventana = document.getElementById('sofia-ventana');
    const btn = document.getElementById('sofia-btn-toggle');
    const globo = document.getElementById('sofia-globo');
    if (!ventana || !btn) return;

    ventana.hidden = false;
    void ventana.offsetWidth;
    ventana.classList.add('is-abierta');
    btn.setAttribute('aria-expanded', 'true');
    estadoSofia.abierto = true;

    if (globo) {
      globo.style.display = 'none';
      sessionStorage.setItem('geologica.sofia.globo_oculto', '1');
    }

    setTimeout(() => {
      document.getElementById('sofia-input')?.focus();
      const contenedor = document.getElementById('sofia-mensajes');
      if (contenedor && contenedor.children.length > 1) {
        contenedor.scrollTop = contenedor.scrollHeight;
      }
    }, 200);
  }

  function cerrarSofia() {
    const ventana = document.getElementById('sofia-ventana');
    const btn = document.getElementById('sofia-btn-toggle');
    if (!ventana || !btn) return;

    ventana.classList.remove('is-abierta');
    btn.setAttribute('aria-expanded', 'false');
    estadoSofia.abierto = false;

    setTimeout(() => {
      if (!estadoSofia.abierto) {
        ventana.hidden = true;
      }
    }, 280);
  }

  function procesarConsultaUsuario(texto) {
    const consultaLimpia = (texto || '').trim();
    if (!consultaLimpia) return;

    agregarMensajeAlDOM('usuario', consultaLimpia);

    const input = document.getElementById('sofia-input');
    if (input) input.value = '';

    mostrarIndicadorEscribiendo();

    setTimeout(() => {
      removerIndicadorEscribiendo();
      const respuesta = responderPregunta(consultaLimpia);
      agregarMensajeAlDOM('bot', respuesta.texto, respuesta.chips);
    }, 320);
  }

  function vincularEventos() {
    const btnToggle = document.getElementById('sofia-btn-toggle');
    const btnCerrar = document.getElementById('sofia-btn-cerrar');
    const btnLimpiar = document.getElementById('sofia-btn-limpiar');
    const globoCerrar = document.getElementById('sofia-globo-cerrar');
    const globo = document.getElementById('sofia-globo');
    const formulario = document.getElementById('sofia-form');
    const contenedorMensajes = document.getElementById('sofia-mensajes');

    btnToggle?.addEventListener('click', () => {
      if (estadoSofia.abierto) {
        cerrarSofia();
      } else {
        abrirSofia();
      }
    });

    btnCerrar?.addEventListener('click', cerrarSofia);

    globo?.addEventListener('click', (e) => {
      if (e.target.id === 'sofia-globo-cerrar') return;
      abrirSofia();
    });

    globoCerrar?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (globo) globo.style.display = 'none';
      sessionStorage.setItem('geologica.sofia.globo_oculto', '1');
    });

    btnLimpiar?.addEventListener('click', () => {
      if (contenedorMensajes) {
        contenedorMensajes.innerHTML = '';
        agregarMensajeInicial();
      }
    });

    formulario?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('sofia-input');
      if (input && input.value) {
        procesarConsultaUsuario(input.value);
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && estadoSofia.abierto) {
        cerrarSofia();
      }
    });

    if (sessionStorage.getItem('geologica.sofia.globo_oculto') === '1' && globo) {
      globo.style.display = 'none';
    }
  }

  // ==========================================================================
  // 7. INICIALIZACIÓN Y API PÚBLICA (WINDOW.SOFIA)
  // ==========================================================================

  function moduloSofia() {
    cargarDatos();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', crearElementosDOM);
    } else {
      crearElementosDOM();
    }
  }

  moduloSofia();

  // Exposición controlada en window para integración con otros módulos
  window.sofIA = {
    abrir: abrirSofia,
    cerrar: cerrarSofia,
    preguntar: procesarConsultaUsuario,
    responder: responderPregunta,
    inicializar: cargarDatos,
  };
})();
