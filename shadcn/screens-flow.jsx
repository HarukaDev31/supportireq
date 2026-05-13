/* global React, Icon, cn, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Separator, Avatar, AvatarStack */

// =========================================================================
// FLOW · Diagrama de flujo del módulo
// =========================================================================
function FlowScreen() {
  return (
    <div className="space-y-6">
      <PipelineHero />
      <Swimlane />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StateMachine
          title="Estados · Tipo A (Proyecto)"
          accent="tipoA"
          steps={[
            { l: "Pendiente", sub: "registrada" },
            { l: "En maqueta", sub: "diseñando" },
            { l: "En progreso", sub: "configurando" },
            { l: "Desplegado", sub: "validar" },
            { l: "Observado", sub: "correcciones", terminal: "neg" },
            { l: "Operativo", sub: "cerrado", terminal: "ok" },
          ]}
          transitions={[
            { from: 0, to: 1, by: "PM" },
            { from: 1, to: 2, by: "PM" },
            { from: 2, to: 3, by: "Analista" },
            { from: 3, to: 4, by: "Solicitante", tone: "danger", label: "rechaza" },
            { from: 3, to: 5, by: "Solicitante", tone: "success", label: "acepta" },
            { from: 4, to: 2, by: "Analista", tone: "danger", dashed: true, loop: true, label: "re-trabajo" },
          ]}
        />
        <StateMachine
          title="Estados · Tipo B (Requerimiento — B1/B2)"
          accent="tipoB"
          steps={[
            { l: "Pendiente", sub: "registrado" },
            { l: "En progreso", sub: "TI trabaja" },
            { l: "Hecho", sub: "sin validar" },
            { l: "Desplegado", sub: "validar" },
            { l: "Observado", sub: "no resuelto", terminal: "neg" },
            { l: "Operativo", sub: "cerrado", terminal: "ok" },
          ]}
          transitions={[
            { from: 0, to: 1, by: "Analista" },
            { from: 1, to: 2, by: "Analista" },
            { from: 2, to: 3, by: "Analista" },
            { from: 3, to: 4, by: "Solicitante", tone: "danger", label: "rechaza" },
            { from: 3, to: 5, by: "Solicitante", tone: "success", label: "acepta" },
            { from: 4, to: 1, by: "Analista", tone: "danger", dashed: true, loop: true, label: "re-trabajo" },
          ]}
        />
      </div>
      <MacroTipoA />
      <FlowNotes />
    </div>
  );
}

// -------------------------------------------------------------------------
// Hero — 5 etapas del ciclo de vida
// -------------------------------------------------------------------------
function PipelineHero() {
  const stages = [
    { n: "01", l: "Creación",    d: "Solicitante registra la ficha",         icon: "filePlus" },
    { n: "02", l: "Asignación",  d: "Sistema rutea + responsable confirma",  icon: "users" },
    { n: "03", l: "Trabajo",     d: "Cambios de estado, chat, evidencias",   icon: "workflow" },
    { n: "04", l: "Validación",  d: "Solicitante: Operativo o Observado",    icon: "circleCheck" },
    { n: "05", l: "Cierre",      d: "Archivado del expediente",              icon: "shield" },
  ];
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-baseline justify-between">
          <div>
            <CardTitle className="text-lg">Ciclo de vida de una solicitud</CardTitle>
            <CardDescription>Cinco etapas comunes a Tipo A (Proyecto) y Tipo B (Requerimiento).</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="tipoA">Tipo A · Proyecto</Badge>
            <Badge variant="tipoB">Tipo B · Requerimiento</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {stages.map((s, i) => (
            <div key={s.n} className="relative rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span>{s.n}</span>
                <span className="h-px flex-1 bg-border"/>
                <Icon name={s.icon} size={14}/>
              </div>
              <div className="mt-2 font-semibold">{s.l}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.d}</div>
              {i < stages.length - 1 && (
                <span className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-background border text-muted-foreground">
                  <Icon name="chevRight" size={12}/>
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// -------------------------------------------------------------------------
// Swimlane (rol × etapa)
// -------------------------------------------------------------------------
const ACT_TONE = {
  state:    "bg-blue-50 text-blue-800 border-blue-200",
  create:   "bg-orange-50 text-orange-800 border-orange-200",
  comment:  "bg-zinc-50 text-zinc-700 border-zinc-200",
  evidence: "bg-amber-50 text-amber-800 border-amber-200",
  decision: "bg-rose-50 text-rose-700 border-rose-200",
  system:   "bg-violet-50 text-violet-700 border-violet-200",
};
const ACT_ICON = { state:"arrowRight", create:"plus", comment:"message", evidence:"paperclip", decision:"circleAlert", system:"settings" };

function ActionChip({ a }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium leading-none", ACT_TONE[a.t])}>
      <Icon name={ACT_ICON[a.t]} size={11}/>
      <span>{a.l}</span>
      {a.only && (
        <span className={cn(
          "ml-0.5 rounded px-1 py-0.5 text-[9px] font-mono font-semibold border",
          a.only === "A" ? "bg-white text-orange-700 border-orange-300" : "bg-white text-blue-700 border-blue-300"
        )}>{a.only}</span>
      )}
    </span>
  );
}

function Swimlane() {
  const stages = [
    { n: "01", l: "Creación" },
    { n: "02", l: "Asignación" },
    { n: "03", l: "Trabajo" },
    { n: "04", l: "Validación" },
    { n: "05", l: "Cierre" },
  ];
  const lanes = [
    { key:"sol", label:"Solicitante", note:"crea y valida", tone:"SO",
      cells:[
        [{t:"create",l:"Crea Ficha A o B"},{t:"evidence",l:"Adjunta pantallazos"}],
        [{t:"system",l:"Recibe confirmación + nº ticket"}],
        [{t:"comment",l:"Comenta en chat"},{t:"evidence",l:"Adjunta evidencia"},{t:"state",l:"Aprueba maqueta",only:"A"}],
        [{t:"decision",l:"Revisa Desplegado"},{t:"state",l:"→ Operativo (acepta)"},{t:"state",l:"→ Observado (rechaza)"}],
        [{t:"state",l:"Confirma cierre"},{t:"comment",l:"Última evidencia"}],
      ]
    },
    { key:"pm", label:"PM", note:"solo Tipo A", tone:"PM",
      cells:[
        [{t:"system",l:"Recibe proyecto Pendiente",only:"A"}],
        [{t:"state",l:"Asigna complejidad global",only:"A"},{t:"state",l:"Inicia Levantamiento",only:"A"}],
        [{t:"state",l:"Avanza fases (L→M→C→P→Cap)"},{t:"state",l:"Delega Configuración"},{t:"evidence",l:"Sube maqueta"}],
        [{t:"state",l:"Valida con Solicitante"},{t:"decision",l:"Si Observado → vuelve a fase"}],
        [{t:"state",l:"Marca Completado"}],
      ]
    },
    { key:"an", label:"Analista", note:"Tipo B + fase Configuración", tone:"AN",
      cells:[
        [{t:"system",l:"Recibe req. Tipo B"},{t:"system",l:"O fase Configuración",only:"A"}],
        [{t:"state",l:"Asigna complejidad propia"},{t:"state",l:"Pendiente → En progreso"}],
        [{t:"state",l:"En progreso → Hecho"},{t:"state",l:"Hecho → Desplegado"},{t:"evidence",l:"Sube evidencia técnica"},{t:"state",l:"Observado → En progreso (re-trabajo)"}],
        [{t:"state",l:"Espera validación del área"}],
        [{t:"state",l:"Cierra ticket → Operativo"}],
      ]
    },
    { key:"sys", label:"Sistema", note:"automático", tone:"default",
      cells:[
        [{t:"system",l:"Crea chat automático"},{t:"system",l:"Genera código (PRJ/REQ)"}],
        [{t:"system",l:"Asigna PM (A) / Analista (B)"},{t:"system",l:"Notifica responsables"}],
        [{t:"system",l:"Calcula SLA + semáforo"},{t:"system",l:"Loguea historial"},{t:"system",l:"Notifica transición"}],
        [{t:"system",l:"Bloquea avance si falta evidencia"}],
        [{t:"system",l:"Archiva expediente"}],
      ]
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3 flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">Acciones por rol a lo largo del ciclo</CardTitle>
          <CardDescription>Carriles por rol · columnas por etapa.</CardDescription>
        </div>
        <div className="flex flex-wrap gap-1.5 max-w-md justify-end">
          {Object.entries({ state:"estado", create:"crear", comment:"comentario", evidence:"evidencia", decision:"decisión", system:"sistema" }).map(([k,l]) => (
            <span key={k} className={cn("inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium", ACT_TONE[k])}>
              <Icon name={ACT_ICON[k]} size={10}/>{l}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto scrollarea -mx-1 px-1">
          <div className="min-w-[1080px] rounded-lg border overflow-hidden">
            {/* Header row */}
            <div className="grid bg-muted/40 border-b" style={{ gridTemplateColumns: "180px repeat(5,minmax(0,1fr))" }}>
              <div className="p-3 border-r"></div>
              {stages.map((s) => (
                <div key={s.n} className="p-3 border-r last:border-r-0">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">etapa {s.n}</div>
                  <div className="font-semibold text-sm leading-tight">{s.l}</div>
                </div>
              ))}
            </div>
            {/* Lanes */}
            {lanes.map((lane, li) => (
              <div key={lane.key} className={cn("grid border-b last:border-b-0", li % 2 ? "bg-background" : "bg-muted/10")} style={{ gridTemplateColumns: "180px repeat(5,minmax(0,1fr))" }}>
                <div className="p-3 border-r bg-muted/30 flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-2">
                    <Avatar initials={lane.tone === "PM" ? "PM" : lane.tone === "AN" ? "AN" : lane.tone === "SO" ? "SO" : "SY"} tone={lane.tone === "default" ? "default" : lane.tone} size={28} />
                    <span className="font-semibold text-sm">{lane.label}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{lane.note}</span>
                </div>
                {lane.cells.map((acts, ci) => (
                  <div key={ci} className="p-2.5 border-r last:border-r-0 min-h-[100px]">
                    <div className="flex flex-wrap gap-1.5 content-start">
                      {acts.map((a, i) => <ActionChip key={i} a={a} />)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* Chat lane */}
            <div className="grid" style={{ gridTemplateColumns: "180px repeat(5,minmax(0,1fr))" }}>
              <div className="p-3 border-r bg-zinc-900 text-white">
                <div className="font-semibold text-sm flex items-center gap-2"><Icon name="message" size={14}/> Chat</div>
                <div className="text-[11px] text-zinc-300">siempre activo</div>
              </div>
              <div className="col-span-5 p-3 flex items-center gap-2 flex-wrap bg-zinc-50">
                <span className="text-xs text-muted-foreground">creado al registrar la ficha</span>
                {["mensaje","adjunto","captura","mensaje","adjunto","mensaje","firma"].map((c,i)=>(
                  <span key={i} className="inline-flex items-center gap-1 rounded-md bg-white border px-2 py-1 text-xs">
                    <Icon name={c === "adjunto" ? "paperclip" : c === "captura" ? "image" : c === "firma" ? "check" : "message"} size={11}/>
                    {c}
                  </span>
                ))}
                <span className="ml-auto text-xs text-muted-foreground">se archiva al cerrar</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// -------------------------------------------------------------------------
// State machine (SVG)
// -------------------------------------------------------------------------
function StateMachine({ title, accent, steps, transitions }) {
  // Layout: 3 cols × 2 rows, snake order so the loopback arc fits naturally.
  // 0 1 2
  // 3 4 5  → but visually: row1 = 0,1,2, row2 = 3,4,5 with arrows reversed in row2
  // Simpler: 6 nodes in a single horizontal row.
  const W = 880, H = 240;
  const nodeW = 120, nodeH = 56;
  const gap = (W - nodeW * 6) / 5; // = 32

  const xs = steps.map((_, i) => i * (nodeW + gap));
  const cy = 120;

  const tone = {
    success: "#16a34a",
    danger: "#dc2626",
    info: "#2563eb",
    default: "#52525b",
  };

  return (
    <Card>
      <CardHeader className="pb-3 flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full", accent === "tipoA" ? "bg-orange-500" : "bg-blue-600")}/>
            {title}
          </CardTitle>
          <CardDescription>Cada flecha indica quién dispara la transición.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto scrollarea">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="min-w-[760px]">
            <defs>
              <marker id={`ar-${accent}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#52525b" />
              </marker>
              <marker id={`ar-${accent}-r`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
              </marker>
              <marker id={`ar-${accent}-g`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
              </marker>
            </defs>

            {/* nodes */}
            {steps.map((s, i) => {
              const fill =
                s.terminal === "ok" ? "#ecfdf5" :
                s.terminal === "neg" ? "#fef2f2" :
                accent === "tipoA" ? "#fff7ed" : "#eff6ff";
              const stroke =
                s.terminal === "ok" ? "#a7f3d0" :
                s.terminal === "neg" ? "#fecaca" :
                accent === "tipoA" ? "#fed7aa" : "#bfdbfe";
              return (
                <g key={i} transform={`translate(${xs[i]}, ${cy - nodeH/2})`}>
                  <rect width={nodeW} height={nodeH} rx="8" ry="8" fill={fill} stroke={stroke} strokeWidth="1.5"/>
                  <text x={nodeW/2} y={24} textAnchor="middle" fontSize="13" fontWeight="600" fill="#18181b" fontFamily="Geist, sans-serif">{s.l}</text>
                  <text x={nodeW/2} y={42} textAnchor="middle" fontSize="10" fill="#71717a" fontFamily="Geist, sans-serif">{s.sub}</text>
                </g>
              );
            })}

            {/* transitions */}
            {transitions.map((t, i) => {
              const x1 = xs[t.from] + nodeW;
              const x2 = xs[t.to];
              const adjacent = Math.abs(t.from - t.to) === 1 && t.to > t.from;
              const strokeColor = t.tone === "danger" ? "#dc2626" : t.tone === "success" ? "#16a34a" : "#52525b";
              const marker = t.tone === "danger" ? `ar-${accent}-r` : t.tone === "success" ? `ar-${accent}-g` : `ar-${accent}`;

              if (adjacent) {
                return (
                  <g key={i}>
                    <line x1={x1+2} y1={cy} x2={x2-2} y2={cy} stroke={strokeColor} strokeWidth="1.75" markerEnd={`url(#${marker})`}/>
                    <text x={(x1+x2)/2} y={cy - 8} textAnchor="middle" fontSize="10" fill={strokeColor} fontFamily="Geist Mono, monospace">{t.by}{t.label ? ` · ${t.label}` : ""}</text>
                  </g>
                );
              }
              if (t.loop) {
                // Arc above row from "from" → "to" (backwards)
                const sx = xs[t.from] + nodeW/2;
                const ex = xs[t.to] + nodeW/2;
                const arcY = cy - nodeH/2 - 30;
                const d = `M ${sx} ${cy - nodeH/2} C ${sx} ${arcY}, ${ex} ${arcY}, ${ex} ${cy - nodeH/2}`;
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 4" markerEnd={`url(#${marker})`}/>
                    <text x={(sx+ex)/2} y={arcY - 4} textAnchor="middle" fontSize="10" fill={strokeColor} fontFamily="Geist Mono, monospace">{t.by} · {t.label}</text>
                  </g>
                );
              }
              // skip / curve forward (e.g. Desplegado → Operativo)
              const sx = xs[t.from] + nodeW/2;
              const ex = xs[t.to] + nodeW/2;
              const arcY = cy + nodeH/2 + 26;
              const d = `M ${sx} ${cy + nodeH/2} C ${sx} ${arcY}, ${ex} ${arcY}, ${ex} ${cy + nodeH/2}`;
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke={strokeColor} strokeWidth="1.75" markerEnd={`url(#${marker})`}/>
                  <text x={(sx+ex)/2} y={arcY + 12} textAnchor="middle" fontSize="10" fill={strokeColor} fontFamily="Geist Mono, monospace">{t.by} · {t.label}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

// -------------------------------------------------------------------------
// Macro Tipo A — fases del proyecto
// -------------------------------------------------------------------------
function MacroTipoA() {
  const phases = [
    { l: "Levantamiento", who: "PM" },
    { l: "Maqueta",       who: "PM" },
    { l: "Configuración", who: "Analista" },
    { l: "Pruebas",       who: "PM + Solic." },
    { l: "Capacitación",  who: "PM" },
    { l: "Completado",    who: "cierre" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-baseline justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Badge variant="tipoA">Tipo A</Badge> Macro · fases del proyecto
            </CardTitle>
            <CardDescription>El PM asigna complejidad global. En <b>Configuración</b> el Analista re-asigna su propia complejidad y corre los estados del flujo B (tiempos independientes).</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {phases.map((p, i) => (
            <div key={p.l} className={cn(
              "relative rounded-lg border p-3",
              p.l === "Configuración" ? "border-blue-300 bg-blue-50 ring-1 ring-blue-200" :
              p.l === "Completado" ? "border-emerald-300 bg-emerald-50" :
              "bg-card"
            )}>
              <div className="text-[10px] font-mono uppercase tracking-wide text-muted-foreground">fase {String(i+1).padStart(2,"0")}</div>
              <div className="font-semibold text-sm mt-0.5">{p.l}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{p.who}</div>
              {i < phases.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground">
                  <Icon name="chevRight" size={14}/>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sub-flujo dentro de Configuración */}
        <div className="rounded-lg border border-blue-200 bg-blue-50/40 p-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="cornerDown" size={16} className="text-blue-700"/>
              <span className="font-semibold text-blue-900">Sub-flujo dentro de fase 03 (Configuración)</span>
            </div>
            <span className="text-xs text-blue-700">mismos estados de Tipo B · tiempos independientes</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3">
            {["Pendiente","En progreso","Hecho","Desplegado","Operativo"].map((s,i)=>(
              <div key={s} className="relative rounded-md border border-blue-200 bg-white px-3 py-2 text-xs">
                <div className="font-medium text-blue-900">{s}</div>
                {i < 4 && (
                  <span className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-5 w-5 items-center justify-center rounded-full bg-white border border-blue-200 text-blue-700">
                    <Icon name="chevRight" size={10}/>
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-blue-900/80">
            Al cerrar el sub-flujo, la fase Configuración marca <b>Hecho</b> y pasa a <b>Pruebas (04)</b>.
            Si en Pruebas el área detecta algo, vuelve aquí (estado <b>Observado</b>).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// -------------------------------------------------------------------------
// Notas
// -------------------------------------------------------------------------
function FlowNotes() {
  const notes = [
    { tone: "amber", icon: "alert", title: "Observado no vuelve a Pendiente",
      body: "Regresa directamente a la fase de trabajo activa: En progreso para B, sub-flujo Configuración para A." },
    { tone: "blue", icon: "layers", title: "Configuración (A) ≠ mantenedor B",
      body: "Mismo flujo, tiempos independientes. Los edita el Analista, pero son tablas separadas." },
    { tone: "emerald", icon: "message", title: "Chat transversal",
      body: "Existe desde la creación hasta el cierre. Todos los roles pueden comentar y adjuntar evidencias en cualquier estado." },
  ];
  const toneClasses = {
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {notes.map((n) => (
        <div key={n.title} className={cn("rounded-lg border p-4", toneClasses[n.tone])}>
          <div className="flex items-center gap-2 font-semibold text-sm">
            <Icon name={n.icon} size={16}/> {n.title}
          </div>
          <p className="text-sm mt-1.5 leading-relaxed opacity-90">{n.body}</p>
        </div>
      ))}
    </div>
  );
}

window.FlowScreen = FlowScreen;
