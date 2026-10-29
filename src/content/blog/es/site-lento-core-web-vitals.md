---
title: "Sitio web lento: cómo hacerlo más rápido con Core Web Vitals"
description: "¿Su sitio web está lento? Entienda LCP, INP y CLS, aprenda a medir la velocidad correctamente y vea las causas más comunes de lentitud y cómo corregirlas."
category: sites-e-seo
tags: [site-lento, core-web-vitals, velocidade-do-site, seo, pagespeed]
author: "Equipo Vtech"
publishedAt: 2026-11-26
updatedAt: 2026-11-26
offerTitle: "Auditoría gratuita de velocidad de su sitio web"
offerText: "Medimos su sitio web con datos reales de usuarios y de laboratorio, encontramos lo que hace lenta cada página y le enviamos la lista de correcciones ordenada por impacto."
offerItems: [Diagnóstico de Core Web Vitals de las páginas principales, Causas de la lentitud en cada página, Lista de correcciones priorizada por impacto, Propuesta con alcance y plazo en hasta 24 horas hábiles]
offerAsk: "¿Cuál es la dirección de su sitio web y qué página es la más importante para su negocio?"
offerPlaceholder: "Ej.: www.suempresa.com. La página de cotización tarda mucho en el celular…"
offerCta: "Quiero la auditoría gratuita"
---

Usted abre el sitio web de su empresa en el celular y espera. La imagen principal aparece por partes, el botón cambia de lugar justo cuando lo toca, el menú tarda en responder. Si usted lo nota, su cliente también, y muchas veces no espera: vuelve a Google y hace clic en la competencia.

Un sitio lento no es solo una molestia. Afecta la forma en que Google evalúa sus páginas y cuántas visitas se convierten en contactos.

Esta guía explica qué son los Core Web Vitals en lenguaje sencillo, cómo medir la velocidad correctamente, cuáles son las causas más comunes de lentitud con la solución de cada una y cuándo conviene más rehacer el sitio que seguir parchándolo.

## Por qué la velocidad del sitio web importa para Google y para las ventas

Google usa la experiencia en la página como una de sus señales de clasificación, y los Core Web Vitals forman parte de esa evaluación. La velocidad por sí sola no pone a un sitio malo en primer lugar: el contenido relevante sigue siendo lo principal. Pero, entre páginas parecidas, la que ofrece una mejor experiencia tiene ventaja.

El efecto más directo, sin embargo, está en las ventas. Piense en el camino de un cliente:

- Busca en el celular, muchas veces con una conexión móvil inestable.
- Hace clic en su resultado y ve una pantalla en blanco por algunos segundos.
- Cuando la página aparece, intenta tocar "Pedir cotización", pero carga un banner y empuja el botón hacia abajo.
- Toca en el lugar equivocado, se irrita y se va.

Ninguna de estas etapas aparece en el informe de Google Ads ni en las métricas del sitio como "cliente perdido por lentitud". Simplemente no se convierte en contacto. Por eso la velocidad es un problema comercial, no solo técnico.

## Qué son LCP, INP y CLS, en palabras sencillas

Los Core Web Vitals son tres métricas definidas por Google para medir la experiencia real de quien usa la página. Cada una tiene un límite oficial de "bueno":

| Métrica | Qué mide | En palabras sencillas | Bueno |
|---|---|---|---|
| LCP (Largest Contentful Paint) | Carga | Cuánto tarda en aparecer el elemento visible más grande (normalmente la imagen principal o el título) | hasta 2,5 s |
| INP (Interaction to Next Paint) | Respuesta | Cuánto tarda la página en reaccionar después de un toque, clic o tecla | hasta 200 ms |
| CLS (Cumulative Layout Shift) | Estabilidad | Cuánto "salta" el contenido de lugar mientras la página carga | hasta 0,1 |

Para que la página se considere buena, Google observa el percentil 75 de las visitas reales: al menos tres de cada cuatro visitas deben quedar dentro del límite. Es decir, no basta con que cargue rápido en su computadora con fibra. Tiene que cargar rápido para la mayoría de sus visitantes, en el dispositivo y la red que ellos usan.

El INP reemplazó al antiguo FID (First Input Delay) en 2024. Si encuentra informes antiguos que hablan de FID, sepa que la métrica actual es el INP, que es bastante más exigente.

## Cómo medir la velocidad del sitio web correctamente

El error más común es hacer una prueba una sola vez, ver una nota y sacar conclusiones. Hay dos tipos de datos, y responden preguntas distintas.

Abra [PageSpeed Insights](https://pagespeed.web.dev/) y escriba la dirección de la página. El informe tiene dos partes:

- **Datos de campo.** Provienen de visitas reales de usuarios de Chrome en los últimos 28 días. Es lo que Google usa en la evaluación. Si aparece "aprobada" o "no aprobada" en la evaluación de los Core Web Vitals, viene de aquí.
- **Datos de laboratorio.** Una simulación hecha en el momento, en un celular y una red estandarizados. Genera la nota de 0 a 100 y la lista de oportunidades. Sirve para encontrar la causa, no para decir cómo les va a los usuarios.

Los sitios con poco tráfico pueden no tener datos de campo suficientes. En ese caso, use el laboratorio como referencia y haga la prueba más de una vez, porque el resultado varía de una ejecución a otra.

Un consejo: pruebe siempre primero la versión para celular. Es la que Google usa para indexar, y es en ella donde aparecen los problemas.

PageSpeed Insights analiza una página a la vez. Para ver el sitio completo, use el informe **Core Web Vitals** de Google Search Console. Agrupa las páginas parecidas y muestra cuáles están bien, cuáles necesitan mejoras y cuáles están mal, separando celular y computadora.

Después de corregir un problema, use el botón "Validar corrección". Como los datos de campo cubren 28 días, la mejora tarda algunas semanas en aparecer por completo.

## Causas más comunes de un sitio lento y cómo corregirlas

En la mayoría de los sitios de empresa, la lentitud viene de las mismas fuentes. La tabla muestra cada causa, cómo se manifiesta y qué hacer:

| Causa | Síntoma | Corrección |
|---|---|---|
| Imágenes pesadas | LCP alto; la foto principal aparece al final | Redimensionar al tamaño mostrado, usar WebP o AVIF, cargar la imagen principal con prioridad y las demás bajo demanda (lazy loading) |
| Exceso de plugins y scripts de terceros | INP malo; la página se traba al desplazarse o tocar | Quitar lo que nadie usa, centralizar las etiquetas en un administrador y cargar los scripts no esenciales después de la página |
| Widgets de chat, pop-ups y banners | INP y CLS malos; los botones cambian de lugar | Cargar el widget solo tras la interacción o algunos segundos después; reservar el espacio de los banners en el diseño |
| Fuentes web | Texto invisible o que cambia de estilo; CLS | Usar menos variantes, alojar las fuentes en el propio sitio, usar `font-display: swap` y precargar la fuente principal |
| Alojamiento débil | El servidor tarda en responder antes de que aparezca algo | Migrar a un alojamiento con recursos adecuados al tráfico y un servidor cerca del público |
| Sin CDN y sin caché | Lento para quien está lejos del servidor; cada visita rehace el mismo trabajo | Activar la caché de página y de archivos estáticos y servir el sitio a través de una CDN |
| Renderizado solo en el navegador | Pantalla en blanco mientras el JavaScript se descarga y ejecuta; LCP alto en el celular | Renderizar en el servidor o generar páginas estáticas, enviando el HTML listo |
| Elementos sin tamaño definido | El contenido salta cuando cargan imágenes, videos y anuncios | Definir ancho y alto (o proporción) para imágenes, videos e iframes |

Empiece por lo que PageSpeed Insights señala como la mayor oportunidad en su página más importante, normalmente la de inicio o la de servicio que más visitas recibe. Corregir una imagen de 3 MB en la parte superior de la página suele tener más efecto que decenas de ajustes pequeños.

**Un ejemplo común.** Una página de servicio tiene un LCP malo en el celular. El diagnóstico muestra que el elemento más grande es la foto superior, subida directamente desde la cámara, con resolución de impresión, y cargada con lazy loading. Tres ajustes lo resuelven: reducir la imagen al ancho en que se muestra, convertirla a WebP y quitar el lazy loading solo de ella, para que el navegador la busque de inmediato. Es una corrección de una tarde.

En cambio, si lo que está mal es el INP y la página carga cinco herramientas de seguimiento, un chat, un mapa y un video incrustado, el trabajo es de decisión: qué necesita estar realmente ahí.

## Cuándo conviene rehacer el sitio en lugar de parcharlo

Parchar funciona cuando el problema es puntual: imágenes, caché, un plugin específico. Rehacer empieza a tener sentido cuando:

- **El tema o el constructor visual genera demasiado código.** Algunos constructores cargan scripts y estilos de todas las funciones en todas las páginas, incluso las que usted no usa. Se puede mejorar, pero hay un límite.
- **Cada corrección rompe otra cosa.** Plugins que dependen unos de otros, actualizaciones que le da miedo hacer.
- **Todo el sitio se arma en el navegador** y el contenido principal solo aparece después de que corre el JavaScript.
- **Ya optimizó lo que se podía** y los datos de campo siguen sin aprobar.
- **El sitio también necesita cambiar por otros motivos:** estructura de páginas débil para SEO, textos desactualizados, falta de integración con el CRM.

En esos casos, un [sitio web corporativo hecho a la medida](/servicos/sites-institucionais), con renderizado en el servidor y solo el código necesario, suele resolver la velocidad y los demás problemas de una vez. En Vtech, un sitio corporativo se entrega en hasta 30 días, con el código entregado al cliente.

## Preguntas frecuentes

### ¿Cuál es una buena nota en PageSpeed Insights?

La nota de 0 a 100 viene de los datos de laboratorio y sirve como guía. Lo que pesa para Google son los datos de campo: LCP hasta 2,5 s, INP hasta 200 ms y CLS hasta 0,1 para la mayoría de las visitas. Un sitio puede tener nota 70 y aprobar los Core Web Vitals, o nota 90 y no aprobar con usuarios reales.

### ¿Por qué mi sitio es rápido en la computadora y lento en el celular?

Los celulares tienen procesadores más débiles y muchas veces una red peor. Los scripts que corren sin problema en la computadora se traban en el celular, y las imágenes grandes tardan más en descargarse. Por eso la prueba siempre debe empezar por la versión móvil.

### ¿Un alojamiento más caro resuelve un sitio lento?

Solo cuando el servidor es el cuello de botella, lo que se nota como una demora antes de que empiece a cargar. Si el problema son imágenes pesadas o exceso de scripts, un mejor alojamiento cambia poco. Mida antes de cambiar.

### ¿Cuánto tarda Google en notar la mejora?

La prueba de laboratorio cambia de inmediato. Los datos de campo usan los últimos 28 días de visitas, así que la mejora aparece poco a poco en ese período. Haga el seguimiento en el informe de Core Web Vitals de Search Console.

### ¿La velocidad por sí sola mejora la posición en Google?

Ayuda, pero no reemplaza el contenido relevante ni una buena estructura de páginas. Para el panorama completo, vea [cómo crear un sitio web profesional que aparezca en Google](/blog/como-criar-site-profissional-que-aparece-no-google).

## Próximo paso

Si su sitio está lento y no sabe por dónde empezar, [pida la auditoría gratuita de velocidad aquí abajo](#oferta). Medimos las páginas que más importan, identificamos las causas y le enviamos las correcciones ordenadas por impacto, para que las aplique con su equipo o con quien prefiera.
