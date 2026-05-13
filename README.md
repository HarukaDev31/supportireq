# Módulo Soporte TI — Procesos

Documento de **síntesis funcional** a partir de los prototipos (wireframes y shadcn). Sirve como **punto de partida para levantar requisitos funcionales (RF)**: cada bloque mezcla *lo que el prototipo muestra* con *preguntas típicas* para validar con negocio y TI.

**Versión prototipo:** v0.1 · texto revisado con el código de las vistas (mayo 2026).

---

## 1. Cómo navegar el repositorio

| Vista | Archivo | Descripción breve |
|--------|---------|-------------------|
| Inicio | `index.html` | Enlaces a las demás entradas. |
| Wireframes (boceto) | `wireframes.html` | Misma lógica de negocio con estilo “papel / boceto”. Incluye panel **Tweaks** (rol, tipo detalle, estilo visual). |
| Wireframes (impresión) | `wireframes-print.html` | Variante orientada a impresión. |
| Prototipo UI (shadcn) | `prototipo-shadcn.html` | Misma estructura por **pestañas**; selector de rol en cabecera (sin panel flotante Tweaks). |

**Prototipo shadcn — pestañas internas**

1. Diagrama de flujo  
2. Tablero (Kanban)  
3. Modales de solicitud  
4. Detalle + Chat  
5. Config. tiempos  
6. Roles & permisos  

Los wireframes equivalentes viven en `app.jsx` + `screens.jsx` + `flow.jsx`; el flujo shadcn en `shadcn/screens-flow.jsx` y el resto en `shadcn/screens-*.jsx`.

---

## 2. Alcance del módulo (visión)

- Gestionar **solicitudes de soporte TI** con dos familias: **Tipo A (Proyecto del mes)** y **Tipo B (Requerimiento TI)**, este último con subtipos **B1 (incidencia)** y **B2 (configuración)**.
- Acompañar el ciclo con **estados**, **responsables (roles)**, **tiempos / SLA**, **chat con evidencias** y **validación** por el área solicitante.
- **Despliegue:** sitio estático (HTML + React vía CDN + Babel en cliente). No hay backend en este repo; los RF de integración (API, BD, auth) se deducen aparte.

---

## 3. Actores y roles

| Rol en prototipo | Nombre largo (referencia) | Idea de responsabilidad |
|------------------|---------------------------|-------------------------|
| **Solicitante** | Área usuaria | Crea fichas, adjunta contexto, aprueba maqueta (A), decide Operativo/Observado en validación. |
| **PM** | Project Manager | Ámbito **Tipo A**: fases macro, complejidad global, coordinación; no es el dueño del flujo B completo. |
| **Analista** | Analista TI | Ejecuta **Tipo B** end-to-end; en **Tipo A** lidera fase **Configuración** (y sub-flujo) y transiciones operativas típicas de ticket. |
| **Sistema** | Automatización | Códigos PRJ/REQ, chat al crear, notificaciones, SLA, logs, reglas de bloqueo (según diseño). |

**Preguntas para RF:** ¿Existen más roles (ej. líder de área, mesa de ayuda)? ¿El “Analista” se segmenta por seniority o cola? ¿El PM siempre es único por proyecto?

---

## 4. Tipos de solicitud

### 4.1 Tipo A — Proyecto del mes

- Flujo de **estados** (orden conceptual en prototipo): Pendiente → En maqueta → En progreso → Desplegado → (Observado | Operativo).
- **Macro-fases** ejecutivas (ejemplo en detalle): Levantamiento → Maqueta → **Configuración** → Pruebas → Capacitación.
- Dentro de **Configuración**, el prototipo muestra un **sub-flujo** con la misma *forma* de estados que un requerimiento B, pero **reglas y tiempos propios** (no reutilizar literalmente el mantenedor B).

**RF candidatos:** transiciones permitidas por rol; qué datos obligatorios en cada estado; si “En maqueta” implica entregables formales; definición exacta de “Desplegado” vs “Operativo”.

### 4.2 Tipo B — Requerimiento (B1 / B2)

- Estados: Pendiente → En progreso → Hecho → Desplegado → (Observado | Operativo).
- **B1 — Incidencia:** fallo o comportamiento inesperado en módulo existente.
- **B2 — Configuración:** ajuste de parámetros / accesos / textos sin desarrollo.

**RF candidatos:** criterios obligatorios para clasificar B1 vs B2; si B2 puede escalarar a desarrollo; SLAs distintos por subtipo.

---

## 5. Ciclo de vida común (5 etapas)

Presente en **Diagrama de flujo** (hero + swimlane):

1. **Creación** — Solicitante crea Ficha A o B; adjuntos; sistema genera ticket y chat.  
2. **Asignación** — Sistema/negocio asigna PM (A) o Analista (B); notificaciones.  
3. **Trabajo** — Cambios de estado, chat, evidencias; en A el solicitante puede **aprobar maqueta**.  
4. **Validación** — Solicitante frente a **Desplegado**: acepta (**Operativo**) o rechaza (**Observado**).  
5. **Cierre** — Archivo / confirmaciones finales.

**RF candidatos:** qué etapas son obligatorias en todos los tipos; qué es opcional; políticas de notificación.

---

## 6. Consolidado por vista / pantalla

Use esta tabla para **mapear RF** (ej. `RF-FLUJO-001`) a sección de prototipo.

### 6.1 Diagrama de flujo (`flow.jsx` / `shadcn/screens-flow.jsx`)

| Tema | Contenido en prototipo | Preguntas para RF |
|------|-------------------------|-------------------|
| Pipeline | Cinco etapas del ciclo | ¿Coincide con el proceso real de la empresa? ¿Faltan etapas (p.ej. CAB, seguridad)? |
| Swimlane | Matriz **rol × etapa** con acciones (crear, estado, comentario, evidencia, decisión, sistema) | ¿Cada acción es un permiso, un evento de auditoría o ambos? |
| Máquinas de estado | Dos diagramas: Tipo A y Tipo B con transiciones y actor | ¿Alguna transición está prohibida en producción? ¿Hay estados paralelos (p.ej. “en pausa”)? |
| Macro Tipo A | Fases L / M / Config / Pruebas / Cap. | ¿Nombres y número de fases definitivos? ¿Quién cierra cada fase? |
| Notas | Observado no vuelve a Pendiente; chat transversal; tiempos Config A ≠ mantenedor B | Validar como **reglas de negocio** (ver §7). |

### 6.2 Tablero Kanban (`screens.jsx` / `shadcn/screens-kanban.jsx`)

| Tema | Contenido en prototipo | Preguntas para RF |
|------|-------------------------|-------------------|
| Columnas A | Pendiente, En maqueta, En progreso, Desplegado, Observado, Operativo | ¿Misma columna para todos los proyectos del mes? ¿WIP limits? |
| Columnas B | Pendiente, En progreso, Hecho, Desplegado, Observado, Operativo | ¿“Hecho” es obligatorio antes de Desplegado? |
| Tarjetas | Código PRJ/REQ, título, avatares, barra %, etiquetas B1/B2, fechas | ¿Qué campos son obligatorios en tarjeta? ¿De dónde sale el %? |
| Filtros UI | “área”, “rol”, “mes”, “+ nuevo” | Definir **RF de filtrado**, guardados de vista, y creación rápida. |

### 6.3 Modales de solicitud (`screens.jsx` / `shadcn/screens-modal.jsx`)

**Ficha A (Proyecto):** área, perfil, sección, objetivo, descripción, complejidad (Baja/Media/Alta/Crítica — “decide PM”), referencias adjuntos, envío → asignación a PM.

**Ficha B (Requerimiento):** área, perfil, sección, tipo B1/B2, instrucciones, pantallazo, envío → Analista.

**RF candidatos:** validaciones de campo; tamaños y tipos de archivo; si la complejidad en A la elige solo PM al inicio o también después; obligatoriedad de pantallazo en B1.

### 6.4 Detalle + chat (`screens.jsx` / `shadcn/screens-detail.jsx`)

| Tema | Contenido en prototipo | Preguntas para RF |
|------|-------------------------|-------------------|
| Cabecera | Código, tipo, título, solicitante, SLA estimado / transcurrido, badges de rol | ¿Fuentes de datos del SLA? ¿Zona horaria? |
| Timeline | Estados con “hecho / en curso / pendiente” | ¿Historial inmutable? ¿Quién puede corregir fechas? |
| Sub-flujo (A) | Dentro de Configuración, mini-flujo tipo B | Reglas de cierre y retorno desde Pruebas (texto en prototipo). |
| Resumen | Área, sección, perfil, objetivo, adjuntos | ¿Campos editables tras creación? ¿Versionado? |
| Acciones | Desplegado, Observado, Operativo, evidencia, re-asignar | Matriz exacta por rol (cruzar con §6.6). |
| Chat | Hilos, adjuntos, “en vivo” | Retención, búsqueda, menciones, notificaciones, moderación. |

### 6.5 Configuración de tiempos (`screens.jsx` / `shadcn/screens-config.jsx`)

| Tema | Contenido en prototipo | Preguntas para RF |
|------|-------------------------|-------------------|
| Tipo B | Tabla **complejidad → tiempo + unidad** (horas/días) + descripción de uso | ¿Quién puede editar? ¿Versionado? ¿Afecta solo solicitudes nuevas? |
| Tipo A | Tabla **fase × complejidad** (Baja/Media/Alta/Crítica); fila **Configuración** editable por Analista con valores **independientes** de B | Confirmar **dos dominios de parámetros** (A vs B) en el mismo producto. |
| Reparto | Texto: el total B se reparte entre sub-estados del flujo | Algoritmo exacto de reparto (RF no funcional o funcional detallado). |
| Semáforo SLA | Verde &lt; 75%, ámbar 75–100%, rojo &gt; 100% | Umbrales configurables, excepciones, feriados. |

### 6.6 Roles y permisos (`screens.jsx` / `shadcn/screens-roles.jsx`)

- Tarjetas por rol (resumen de alcance y capacidades).
- **Matriz** acción × (PM | Analista | Solicitante) con: ✓ puede, solo lectura, o —.

**RF candidatos:** convertir cada fila de la matriz en RF testeable (“dado rol X en estado Y…”); alinear nombres de rol con directorio corporativo (LDAP, etc.).

---

## 7. Reglas de negocio explícitas (prioridad alta para validar)

1. **Observado:** no regresa al estado **Pendiente**; vuelve al trabajo activo (**En progreso** en B; **sub-flujo de Configuración** en A).  
2. **Chat:** existe desde la creación hasta el cierre; todos los roles pueden comentar y adjuntar en (teóricamente) cualquier estado.  
3. **Configuración en Tipo A:** comparte *forma* de flujo con Tipo B, pero **parámetros de tiempo / mantenedor ≠ los del Tipo B**, aunque ambos los edite el Analista.  
4. **Complejidad:** en B la asigna el Analista al tomar el caso; en A el PM define complejidad **global** del proyecto y la tabla por fase aplica; en fase Configuración el Analista **redefine** complejidad para esa fase.  
5. **Códigos:** sistema genera identificadores estilo **PRJ-xxx** / **REQ-xxx** (validar formato y unicidad en RF).

---

## 8. Glosario rápido

| Término | Significado en prototipo |
|---------|---------------------------|
| Desplegado | Entregado a validación del solicitante (no confundir con “deploy” técnico salvo que negocio lo defina así). |
| Operativo | Cierre aceptado por el área. |
| Observado | Rechazo / devolución en validación. |
| Hecho (B) | Trabajo de TI terminado pendiente de validación en entorno acordado. |
| Maqueta (A) | Fase de diseño de solución antes de construcción fuerte. |

---

## 9. Sugerencia de trabajo para el equipo de requisitos

1. Recorrer **pestaña por pestaña** en `prototipo-shadcn.html` con la matriz del **§6**.  
2. Marcar cada fila de **§6.6** como *acordada / pendiente / no aplica*.  
3. Cerrar **§7** con responsable legal/operativo (quién manda en conflicto Observado vs presión de plazo).  
4. Derivar RF en plantilla estándar: *actor + condición + acción + resultado + excepciones*.  
5. Dejar **fuera de alcance v0.1** lo que no aparezca en UI (reporting avanzado, integraciones, mobile nativo, etc.) y listarlo explícitamente.

---

## 10. Despliegue y repo (referencia técnica breve)

- **Netlify:** `netlify.toml` publica la raíz del repo; sin paso de build.  
- **Rutas HTML limpias:** `wireframes.html`, `prototipo-shadcn.html`, `wireframes-print.html` (redirecciones 301 desde nombres antiguos con espacios).  
- **Remoto Git:** según configuración local (`supportireq` u otro).

---

*Fin del documento de apoyo a requisitos funcionales. Actualizar este README cuando el negocio cierre decisiones que cambien flujos o roles.*
