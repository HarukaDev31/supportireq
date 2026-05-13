/* global React, cn, Card, CardHeader, CardTitle, CardContent, Badge, Button, Progress, AvatarStack, Icon */

function KanbanCard({ d, tone }) {
  const barTone = d.bar === "late" ? "danger" : d.bar === "warn" ? "warning" : "default";
  return (
    <div className={cn(
      "rounded-lg border bg-card p-3 shadow-soft space-y-2",
      tone === "A" && "border-orange-200",
      tone === "B" && "border-blue-200"
    )}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs text-muted-foreground">{d.c}</span>
        {d.tag && <Badge variant={d.tag === "B1" ? "tipoB1" : "tipoB2"}>{d.tag}</Badge>}
      </div>
      <div className="text-sm font-medium leading-snug">{d.t}</div>
      {d.pct !== undefined && <Progress value={d.pct} tone={barTone} />}
      <div className="flex items-center justify-between gap-2">
        <AvatarStack
          items={(d.who || []).map((w) => ({ initials: w, tone: "default" }))}
          size={22}
        />
        {d.days && <span className="text-xs text-muted-foreground">{d.days}</span>}
      </div>
    </div>
  );
}

function KanbanBoard({ title, tone, cols, data }) {
  const headClass = tone === "A"
    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white"
    : "bg-gradient-to-r from-blue-700 to-blue-600 text-white";
  return (
    <Card className="overflow-hidden">
      <CardHeader className={cn("pb-3", headClass)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base text-white">{title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button size="xs" variant="secondary" className="bg-white/15 text-white border-white/20 hover:bg-white/25">
              <Icon name="filter" size={12} /> área
            </Button>
            <Button size="xs" variant="secondary" className="bg-white/15 text-white border-white/20 hover:bg-white/25">
              rol
            </Button>
            <Button size="xs" variant="secondary" className="bg-white/15 text-white border-white/20 hover:bg-white/25">
              mes <Icon name="chevDown" size={12} />
            </Button>
            <Button size="xs" className="bg-white text-orange-700 hover:bg-white/90 border-0">
              <Icon name="plus" size={12} /> nuevo
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex gap-3 overflow-x-auto pb-2 kanban-bg rounded-lg p-2 min-h-[280px]">
          {cols.map((c) => (
            <div
              key={c.key}
              className="min-w-[200px] max-w-[240px] shrink-0 rounded-lg border bg-muted/30 p-2 flex flex-col gap-2"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold">{c.name}</span>
                <Badge variant="muted">{(data[c.key] || []).length}</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground leading-tight">{c.sub}</p>
              {(data[c.key] || []).map((d, i) => (
                <KanbanCard key={i} d={d} tone={tone} />
              ))}
              {(!data[c.key] || data[c.key].length === 0) && (
                <div className="text-xs text-muted-foreground text-center py-6 rounded-md border border-dashed">
                  vacío
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function KanbanScreen() {
  const colsA = [
    { key: "pendiente", name: "Pendiente", sub: "solicitud registrada" },
    { key: "maqueta", name: "En maqueta", sub: "diseñando maqueta" },
    { key: "progreso", name: "En progreso", sub: "TI configurando" },
    { key: "desplegado", name: "Desplegado", sub: "validar" },
    { key: "observado", name: "Observado", sub: "correcciones" },
    { key: "operativo", name: "Operativo", sub: "cerrado" },
  ];
  const colsB = [
    { key: "pendiente", name: "Pendiente", sub: "req. registrado" },
    { key: "progreso", name: "En progreso", sub: "TI trabajando" },
    { key: "hecho", name: "Hecho", sub: "sin validación" },
    { key: "desplegado", name: "Desplegado", sub: "validar" },
    { key: "observado", name: "Observado", sub: "no resuelto" },
    { key: "operativo", name: "Operativo", sub: "cerrado" },
  ];
  const sampleA = {
    pendiente: [{ c: "PRJ-104", t: "Módulo cobranzas v2", who: ["MR"], days: "hoy" }],
    maqueta: [{ c: "PRJ-101", t: "Portal proveedores", who: ["LV", "JT"], pct: 55, days: "d. 3/7" }],
    progreso: [{ c: "PRJ-098", t: "App marcaciones móvil", who: ["JT"], pct: 70, days: "d. 5/8", bar: "warn" }],
    desplegado: [{ c: "PRJ-092", t: "Reportes BI ventas", who: ["MR", "LV"], pct: 90, days: "validando" }],
    observado: [{ c: "PRJ-088", t: "Integración SAP", who: ["JT"], pct: 60, days: "+2d", bar: "late" }],
    operativo: [{ c: "PRJ-080", t: "Onboarding RRHH", who: ["MR"], pct: 100 }],
  };
  const sampleB = {
    pendiente: [
      { c: "REQ-432", tag: "B1", t: "Error al exportar factura PDF", who: ["AS"], days: "hoy" },
      { c: "REQ-431", tag: "B2", t: "Cambio etiqueta menú", who: ["AS"], days: "hoy" },
    ],
    progreso: [{ c: "REQ-428", tag: "B1", t: "Login falla con SSO", who: ["AS"], pct: 40, days: "d. 1/2", bar: "warn" }],
    hecho: [{ c: "REQ-425", tag: "B2", t: "Habilitar permiso supervisor", who: ["AS"], pct: 80 }],
    desplegado: [{ c: "REQ-420", tag: "B2", t: "Texto del aviso compliance", who: ["AS"], pct: 90 }],
    observado: [{ c: "REQ-415", tag: "B1", t: "Reporte no muestra totales", who: ["AS"], bar: "late", days: "+1d" }],
    operativo: [{ c: "REQ-410", tag: "B2", t: "Color del banner home", pct: 100 }],
  };

  return (
    <div className="space-y-6">
      <KanbanBoard title="Tipo A — Proyectos del mes" tone="A" cols={colsA} data={sampleA} />
      <KanbanBoard title="Tipo B — Requerimientos TI (B1 + B2)" tone="B" cols={colsB} data={sampleB} />
    </div>
  );
}

window.KanbanScreen = KanbanScreen;
