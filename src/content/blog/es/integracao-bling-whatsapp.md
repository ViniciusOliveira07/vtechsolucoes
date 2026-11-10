---
title: "Integración Bling WhatsApp: avisos de pedido, boletos y atención automática"
seoTitle: "Integración Bling WhatsApp: avisos de pedido | Vtech"
description: "Cómo integrar Bling con WhatsApp: avisos de pedido, factura y seguimiento, segunda vía de boleto, pedidos que entran a Bling y cuidados con opt-in y privacidad."
category: integracoes
tags: [bling, whatsapp, erp, integracao, api, webhook, e-commerce, notificacoes]
author: "Equipo Vtech"
publishedAt: 2026-12-10
updatedAt: 2026-12-10
offerTitle: "Mapa gratuito de la integración de su Bling con WhatsApp"
offerText: "Cuéntenos cómo avanzan sus pedidos en Bling y qué mensajes su equipo todavía envía a mano por WhatsApp. Le devolvemos qué avisos automatizar primero, de dónde sale cada dato y qué forma de conexión con WhatsApp conviene para su volumen."
offerItems: [Avisos de pedido que pueden salir solos desde Bling, Eventos y datos de Bling detrás de cada aviso, Forma de conexión con WhatsApp para su caso, Propuesta con alcance y plazo en hasta 24 horas hábiles]
offerAsk: "¿Qué mensajes envía hoy su equipo a mano a los clientes a partir de Bling?"
offerPlaceholder: "Ej.: Usamos Bling con una tienda en Nuvemshop. Hoy enviamos el seguimiento y la factura uno por uno desde el WhatsApp de atención…"
offerCta: "Quiero el mapa gratuito"
---

En muchas empresas que usan Bling, el ERP brasileño, el pedido avanza solo dentro del sistema y se detiene en la puerta de WhatsApp. Se emite la factura, se genera la etiqueta, sale el paquete, y alguien de atención todavía tiene que abrir Bling, copiar el número de seguimiento y enviárselo al cliente. Cuando el volumen crece, esa tarea se atrasa, se olvida a algún cliente y WhatsApp se llena de preguntas que el ERP ya sabe responder: "¿ya enviaron mi pedido?", "¿dónde está la factura?", "¿me reenvían el boleto?".

La integración Bling WhatsApp resuelve justamente ese tramo. Esta guía muestra qué mensajes pueden salir solos, cómo un pedido hecho por WhatsApp entra a Bling, cómo funciona la integración por dentro y los cuidados para que los avisos no molesten al cliente.

Si quiere una visión general de las integraciones de Bling con tienda en línea, CRM y BI, empiece por [integración de Bling, Omie y Tiny con CRM y tienda en línea](/blog/integracao-bling-omie-tiny). Aquí el foco es solo WhatsApp.

## Qué resuelve la integración de Bling con WhatsApp

La idea central es simple: cada cambio importante del pedido dentro de Bling se convierte en un mensaje para el cliente, y cada pregunta del cliente sobre el pedido se responde con el dato que está en Bling. Son cuatro frentes: avisos automáticos de pedido, cobro y pago, pedidos hechos por WhatsApp y consulta de estado. Ninguno exige cambiar de ERP ni de número de WhatsApp. Lo que cambia es que el equipo deja de ser el puente entre los dos sistemas.

## Aviso de pedido por WhatsApp: los mensajes que pueden salir solos

Los mensajes más frecuentes en operaciones de comercio electrónico y venta directa siguen el camino natural del pedido:

- **Pedido confirmado.** En cuanto el pedido entra a Bling, desde la tienda en línea, un marketplace o un vendedor, el cliente recibe la confirmación con el número de pedido y un resumen de los artículos.
- **Pago aprobado.** Cuando se confirma el pago, el cliente sabe que el pedido pasó a preparación.
- **Pedido facturado y factura emitida.** Cuando la factura electrónica (la *nota fiscal* brasileña) queda autorizada, el mensaje lleva el número y el enlace al documento, para que el cliente no tenga que pedirlo.
- **Pedido enviado con seguimiento.** Cuando el número de seguimiento se registra en el pedido, el cliente recibe el código y el enlace de la transportadora.
- **Pedido entregado o con problema.** Si su logística informa la entrega o una incidencia (dirección no encontrada, intento fallido), el aviso sale al instante, antes de que el cliente reclame.

En Bling, el avance del pedido se controla con su estado (la *situação*), y cada empresa puede crear estados propios además de los predeterminados. Por eso, el primer paso del proyecto es listar los estados que usa de verdad y decidir cuáles generan mensaje. No todo cambio merece aviso: "en preparación" sirve a quien fabrica por encargo y sobra para quien despacha el mismo día. Las cancelaciones, cambios y devoluciones suelen pedir un mensaje escrito o revisado por una persona.

## Segunda vía de boleto y enlace de pago por WhatsApp

Pedir de nuevo el boleto (el comprobante de pago bancario muy usado en Brasil) es uno de los mensajes más comunes en el WhatsApp de quien vende a crédito o a otras empresas. La integración puede cubrir dos situaciones:

- **Recordatorio de vencimiento.** Cerca de la fecha, el cliente recibe el aviso con el monto y la forma de pagar. Después del vencimiento, un segundo aviso en tono neutro.
- **Segunda vía a pedido.** El cliente pide el boleto por WhatsApp y recibe el documento o el enlace sin esperar a alguien de finanzas.

El punto clave es de dónde sale el boleto. La API de Bling da acceso a las cuentas por cobrar, pero el archivo del boleto o el enlace de pago depende de cómo su empresa emite el cobro: por la cuenta digital vinculada a Bling, por el banco o por una pasarela de pago. En algunos casos el enlace está disponible directamente en la integración, en otros hay que buscarlo en el sistema que emitió el cobro. Eso se define en el diseño del proyecto, revisando su caso en la documentación oficial, y no improvisando.

Una regla que evita dolores de cabeza: el boleto solo se envía al contacto registrado. Si la segunda vía se pide desde otro número, la conversación pasa a una persona.

## Pedidos hechos por WhatsApp que entran directo a Bling

Muchas empresas venden por WhatsApp y después alguien vuelve a digitar el pedido en Bling. Es retrabajo, y es donde nacen los errores de artículo, cantidad y dirección. La integración puede hacer el camino inverso:

1. El cliente arma el pedido en la conversación, con ayuda de un agente de atención o de un asistente automático que consulta productos, precios e inventario en Bling.
2. Los datos se confirman con el cliente: artículos, cantidades, dirección, forma de pago y envío.
3. El pedido se crea en Bling con esos mismos datos, vinculado al registro del cliente.
4. El cliente recibe la confirmación y, desde ahí, los avisos automáticos siguen como en cualquier otro pedido.

Dos cuidados: use una clave única, como el número de registro fiscal del cliente, para no crear un cliente nuevo en cada conversación, y verifique el inventario en Bling en el momento del pedido, no en una lista copiada en la mañana.

## Atención consultando el estado del pedido sin abrir Bling

Aun con los avisos activos, el cliente va a preguntar. Hay dos formas de responder con el dato de Bling:

- **Agente con el pedido en pantalla.** La plataforma de atención muestra, junto a la conversación, el último pedido del cliente, su estado, la factura y el seguimiento, traídos desde Bling. El agente responde sin cambiar de sistema.
- **Asistente automático.** Un agente de IA identifica al cliente por su número o su registro fiscal, consulta el pedido en Bling y responde. Si el cliente quiere cambiar la dirección, cancelar o reclamar, la conversación pasa a una persona con el historial.

El segundo camino va más allá de la integración y entra en [automatizaciones con IA](/servicos/automacoes-com-ia). Explicamos cómo funciona ese tipo de asistente, y qué debe y no debe hacer, en [agente de IA en WhatsApp](/blog/agente-de-ia-no-whatsapp).

En ambos casos, la consulta muestra solo los pedidos de ese cliente, identificado de forma confiable. Un número de pedido escrito por cualquiera no basta para revelar una dirección o una factura.

## Cómo funciona la integración por dentro: API de Bling v3 y webhooks

La integración tiene tres piezas: Bling, WhatsApp y un servicio en el medio que traduce eventos del ERP en mensajes y preguntas del cliente en consultas al ERP.

**API de Bling v3.** La versión actual de la API de Bling usa autenticación OAuth 2.0: la integración se registra como aplicación, la empresa autoriza el acceso con los permisos necesarios y la integración recibe un token para consultar y grabar datos. Mediante la API, la integración busca pedidos, facturas, contactos y cuentas por cobrar, y crea pedidos cuando la venta nace en WhatsApp. La documentación oficial está en el [portal de desarrolladores de Bling](https://developer.bling.com.br/).

**Webhooks.** En lugar de preguntarle a Bling todo el tiempo si algo cambió, la integración puede recibir avisos. Según la [documentación de webhooks de Bling](https://developer.bling.com.br/webhooks), hay avisos para recursos como pedido de venta, factura, factura de consumidor, producto e inventario, en las acciones de creación, actualización y eliminación. Cada aviso llega firmado, lo que permite a la integración comprobar que el mensaje vino realmente de Bling. La propia documentación recomienda procesar los avisos repetidos sin duplicar su efecto y no depender del orden de llegada.

En la práctica, eso define tres reglas de construcción:

- **No enviar dos veces el mismo mensaje.** Si el aviso de factura emitida llega repetido, el cliente no puede recibir el enlace dos veces. La integración guarda lo que ya envió para cada pedido y cada etapa.
- **Seguir el estado del pedido, no el orden de los avisos.** Si "enviado" llega antes que "facturado", la integración consulta el estado actual del pedido antes de decidir qué enviar.
- **Verificar cada cierto tiempo.** Un aviso puede fallar. Una consulta periódica atrapa los pedidos que cambiaron y no generaron mensaje.

**Límites de solicitudes.** La API de Bling limita la cantidad de llamadas por intervalo de tiempo y bloquea temporalmente a quien lo excede. Los valores están en la página de [límites de la API](https://developer.bling.com.br/limites) y pueden cambiar, así que revíselos antes de dimensionar. Una integración bien hecha usa webhooks para reaccionar, guarda en caché lo que cambia poco y espera y reintenta cuando alcanza el límite.

Si quiere entender las formas de integrar con un ERP en general, y no solo con Bling, vea [API, base de datos u hoja de cálculo: cómo integrar con su ERP](/blog/como-integrar-com-erp).

## Opciones de conexión con WhatsApp

Del lado de WhatsApp hay dos caminos, y las empresas usan ambos a diario.

**API oficial (WhatsApp Business Platform).** Es la forma que ofrece Meta para que las empresas integren sus sistemas con WhatsApp, mediante la Cloud API o un proveedor socio. Los mensajes que inicia la empresa, como los avisos de pedido, usan plantillas aprobadas, y hay un cobro por mensaje según la tarifa de Meta, por categoría. Los avisos de pedido, factura y seguimiento suelen encajar como mensajes de utilidad. Cuando el cliente escribe, se abre una ventana de atención de 24 horas en la que la empresa responde libremente. La documentación está en el [sitio de desarrolladores de Meta](https://developers.facebook.com/docs/whatsapp).

**Conexión vía WhatsApp Web.** Herramientas que conectan la integración a un número común de WhatsApp, igual que WhatsApp Web. Se ponen en marcha rápido, no requieren aprobación de plantillas y no tienen costo por mensaje de Meta. Como no están homologadas por Meta, piden cuidado con el volumen y con quién recibe: el número puede sufrir restricciones si se usa para envíos masivos o para contactos que no esperan mensajes, y la conexión puede necesitar ajustes cuando se actualiza la aplicación.

Para avisos de pedido, con volumen moderado y clientes que acaban de comprar, la conexión vía WhatsApp Web funciona bien. Con volumen alto o necesidad de garantías formales, la API oficial es el camino más estable. La integración con Bling puede construirse para cambiar de conexión después sin rehacer las reglas.

## Cuidados: opt-in, frecuencia, privacidad y plantillas

Un aviso útil se vuelve spam cuando llega sin acuerdo previo. Los cuidados que marcan la diferencia:

- **Opt-in claro.** El cliente necesita saber que recibirá novedades del pedido por WhatsApp y haber aceptado, por ejemplo con una casilla en el checkout o una confirmación en la primera conversación. Meta exige ese consentimiento en la API oficial, y además protege su número en la conexión vía WhatsApp Web.
- **Frecuencia bajo control.** Elija las etapas que importan y agrupe avisos cercanos. "Facturado" y "enviado" el mismo día pueden ser un solo mensaje.
- **Salida fácil.** Indique cómo dejar de recibir los avisos y respete la solicitud de inmediato, marcando al cliente para que no reciba más.
- **Un aviso no es marketing.** Los mensajes de pedido no llevan ofertas de otros productos, lo que incluso cambiaría la categoría ante Meta.
- **Privacidad y LGPD.** La ley brasileña de protección de datos, la [LGPD (Ley n.º 13.709/2018)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm), exige base legal para tratar los datos, recolección limitada a lo necesario y transparencia. Envíe solo lo que el cliente necesita (número de pedido, factura, seguimiento), evite exponer la dirección completa y los montos en mensajes que otra persona podría leer, defina cuánto tiempo se guardan los registros de envío y revise cómo tratan los datos los proveedores del camino. La autoridad brasileña de protección de datos, la [ANPD](https://www.gov.br/anpd/pt-br), publica orientaciones sobre el tema.
- **Plantillas bien escritas.** En la API oficial, cada aviso es una plantilla aprobada con campos variables. Escriba plantillas cortas, con el número de pedido al inicio y un solo enlace. Una plantilla confusa genera preguntas, y las preguntas generan las conversaciones que la automatización debía evitar.

## Preguntas frecuentes

### ¿Bling envía mensajes por WhatsApp por sí solo?

Bling tiene integraciones y aplicaciones de socios en su central de integraciones, y algunas cubren avisos por WhatsApp. Cuando se ajustan a su proceso, son un buen comienzo. Cuando necesita reglas propias, como avisar solo en ciertos estados, agrupar etapas o conectar los avisos con la atención, la integración se construye sobre la API de Bling.

### ¿Necesito la API oficial de WhatsApp para enviar avisos de pedido?

No necesariamente. La conexión vía WhatsApp Web funciona para avisos a clientes que acaban de comprar, con volumen moderado y buenas prácticas. La API oficial es la opción más estable para volúmenes altos y para quien necesita plantillas aprobadas, número verificado y garantías formales.

### ¿El cliente puede hacer el pedido por WhatsApp y que aparezca en Bling?

Sí. La integración crea el pedido en Bling mediante la API, con los artículos, el cliente y la forma de pago acordados en la conversación. Los cuidados son verificar el inventario en el momento del pedido y evitar registros duplicados de clientes.

### ¿Y si falla el webhook de Bling?

Por eso la integración combina webhooks con una verificación periódica de los pedidos que cambiaron. Un aviso perdido se recupera en la siguiente ronda.

## Próximo paso

Si su equipo todavía copia el seguimiento desde Bling, envía facturas una por una o busca boletos para reenviar, [pida el mapa gratuito de la integración aquí abajo](#oferta). Le mostramos qué avisos automatizar primero y qué forma de conexión con WhatsApp conviene para su volumen.

Conozca también nuestro servicio de [integración de sistemas](/servicos/integracoes).
