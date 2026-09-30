# Sismos Colombia · Taller de patrones de rendering

Aplicación web que implementa **cinco patrones clásicos de rendering** sobre la misma funcionalidad: consultar sismos recientes en Colombia (magnitud ≥ 2,5, últimos 30 días).

| | |
|---|---|
| **Asignatura** | Programación Orientada a la Web |
| **Docente** | Jhonatan Andrés Mideros Narváez |
| **Semestre** | Séptimo |
| **Stack** | Next.js 15 (App Router), React 19 |



## Objetivo del taller

Crear una app que permita **ver e comparar** cada patrón de rendering (CSR, SSR, SSG, ISR y Streaming SSR), desplegada en la nube, usando datos reales del catálogo USGS.

## ¿Funcionalidad real?

**Sí hay datos y consulta reales; no es un producto de alerta sísmica.**

| Sí es real | No pretende ser |
|------------|-----------------|
| Consulta al catálogo **USGS** (sismos ≥ 2,5, últimos 30 días, zona Colombia). | Sistema oficial del **SGC** ni alerta temprana. |
| Lista, magnitudes, lugares, fechas y resumen (total, más fuerte, profundidad media). | Mapas, notificaciones push, cuentas de usuario o historial guardado. |
| Misma información mostrada con **cinco estrategias de rendering** distintas. | App lista para producción en emergencias. |

El retraso de **~2 s** en `/ssr` y en el resumen de `/streaming` es una **simulación didáctica** de una consulta pesada al servidor, no un cuello de botella real de nuestra base de datos.

**En una frase:** es una **demo educativa** con **datos reales de USGS**; el valor del entregable es comparar **patrones de rendering**, no resolver el negocio sísmico.

### Casos de uso que ilustra (vida real)

- **CSR** — panel interno con sesión, donde el SEO no importa.
- **SSR** — página pública que debe indexarse y mostrar el dato del momento.
- **SSG** — contenido casi estático (p. ej. guía de qué hacer en un sismo).
- **ISR** — listado público que se actualiza cada minuto sin saturar el servidor.
- **Streaming SSR** — pantalla con bloques rápidos y otros lentos (lista vs estadísticas).

## Patrones implementados

| Patrón | Ruta | Qué hace en este proyecto |
|--------|------|---------------------------|
| **CSR** | `/csr` | HTML inicial sin datos; el navegador pide `/api/quakes` con JavaScript. |
| **SSR** | `/ssr` | El servidor consulta USGS en cada visita y envía HTML completo (`cache: no-store`). |
| **SSG** | `/ssg` | HTML generado en el **build**; datos congelados hasta volver a compilar. |
| **ISR** | `/isr` | HTML estático con **revalidación cada 60 s** (stale-while-revalidate). |
| **Streaming SSR** | `/streaming` | Shell inmediato; lista y resumen llegan en trozos con `Suspense`. |

La explicación de ventajas, trade-offs y “cómo comprobarlo” está en cada página (`lib/patterns.js` + `PatternShell`).

## Cómo ejecutar en local

Requisitos: **Node.js 18+** y **pnpm** (o npm).

```bash
cd sismos-rendering
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para medir tiempos reales (sin compilación de desarrollo):

```bash
pnpm build
pnpm start
```

## Guía rápida para demostrar (evaluación)

| Patrón | Qué mostrar al docente |
|--------|-------------------------|
| CSR | Ver código fuente (Ctrl+U): no hay sismos en el HTML. En Network: `/api/quakes` después del JS. |
| SSR | Recargar `/ssr`: la página tarda y el **sello de hora** cambia en cada visita. |
| SSG | En producción, `/ssg` responde al instante; la hora **no cambia** al recargar. |
| ISR | Esperar >1 min, recargar dos veces: primera respuesta “vieja”, la siguiente más fresca. |
| Streaming | En `/streaming`: título y explicación al instante; skeletons; lista antes que el resumen (~2 s). |

Entre rutas aparece un **indicador de carga** (barra superior + mensaje) mientras el servidor prepara la página.

## Fuente de datos

- **USGS Earthquake Catalog** (`earthquake.usgs.gov`) — zona Colombia y alrededores.
- Información oficial en Colombia: [Servicio Geológico Colombiano (SGC)](https://www.sgc.gov.co).

## Estructura del proyecto

```
app/
  page.jsx          # Inicio y enlaces a cada patrón
  csr/              # Client-Side Rendering
  ssr/              # Server-Side Rendering
  ssg/              # Static Site Generation
  isr/              # Incremental Static Regeneration
  streaming/        # Streaming SSR con Suspense
  api/quakes/       # API para CSR
components/         # UI compartida (lista, métricas, navegación, loader)
lib/
  patterns.js       # Textos del taller por patrón
  quakes.js         # Fetch y resumen de sismos
```

## Autores

- Nicolás Alejandro García Pasmiño

---

*Taller: Patrones de Rendering · Programación Web*
