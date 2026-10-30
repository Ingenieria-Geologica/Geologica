# Ingeniería Geológica · UNAL Medellín

Sitio web del programa de Ingeniería Geológica de la Facultad de Minas, Universidad Nacional de Colombia, Sede Medellín.
Desarrollado bajo la guía de diseño UI/UX **«Estratos & Terreno»** (paleta inspirada en ciencias de la Tierra: Caliza Silícea, Basalto Profundo, Terracota Magmático, Verde Olivino y Ámbar Pirita, con tipografías Space Grotesk y Plus Jakarta Sans).

## Módulos (páginas del portal)

| Página | Contenido |
| --- | --- |
| `index.html` | Información del programa (180 créditos, acreditación de alta calidad, objetivos, ficha técnica), perfil del egresado y grupos de investigación / semilleros (GEMMA, IGNEA, etc.) |
| `malla.html` | Malla curricular interactiva oficial (10 semestres, 180 créditos, relaciones dinámicas de prerrequisitos y dependientes, recursos académicos en Drive) y catálogo completo de asignaturas por componente |
| `intercampus.html` | Rutas intercampus (Robledo ➔ El Volador, El Volador ➔ Robledo, Río ➔ El Volador), cálculo de próxima salida en tiempo real, mapa interactivo y láminas oficiales |
| `info.html` | Información general y guía estudiantil (P.A.P.A., bolsa de 180+80 créditos, horas de corresponsabilidad, citas SIA, simulador interactivo y preguntas frecuentes) |
| `convenios.html` | Convenios de la UNAL (Coursera, MATLAB, Microsoft 365) y beneficios para estudiantes (Autodesk, GitHub, JetBrains, Spotify): lista desplegable y guías paso a paso |

## Arquitectura de datos

Los datos viven en `data/` estructurados en formato JSON:

```
data/
  programa.json          ficha del programa (180 créditos), acreditación y fuentes
  perfil.json            perfil del ingeniero geólogo egresado
  grupos.json            grupos de investigación y semilleros
  intercampus.json       rutas, franjas horarias y conexiones intercampus
  convenios/
    indice.json          tipos y ficha corta de cada convenio
    <id>.json            detalle y pasos de activación
  info.json              guía estudiantil, PAPA, bolsa de créditos, trámites y glosario
  malla/
    componentes.json     componentes (Fundamentación, Disciplinar, Libre Elección) y agrupaciones
    plan.json            distribución por semestres (I a X) con 180 créditos
    asignaturas.json     catálogo de asignaturas obligatorias y optativas con códigos y prerrequisitos
```

## Ver el sitio en local

Los datos se consultan mediante `fetch`, por lo cual se recomienda un servidor local estático:

```bash
python3 -m http.server 8000
# Abre en tu navegador http://localhost:8000
```

---

## Autoría y Créditos de Desarrollo

Plataforma diseñada, estructurada y desarrollada en su totalidad por:

- **Santiago Escobar Arias**
  - **Cargo:** Representante Estudiantil de Ingeniería de Sistemas e Informática
  - **Institución:** Facultad de Minas · Universidad Nacional de Colombia, Sede Medellín
  - **Correo institucional:** [saescobara@unal.edu.co](mailto:saescobara@unal.edu.co)
  - **WhatsApp:** [(+57) 312 377 2091](https://wa.me/573123772091)
  - **Instagram:** [@s_escobar__](https://www.instagram.com/s_escobar__/)

## Licencia y Propiedad Intelectual

© 2026 Santiago Escobar Arias. Todos los derechos reservados.

Este proyecto cuenta con una licencia de autoría estricta contenida en el archivo [`LICENSE`](LICENSE). Queda expresamente prohibida la copia no autorizada, plagio o supresión de créditos de autor en el código fuente.

