/* global React, cn, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button, Separator, Avatar, Textarea, Icon */

function StepPill({ n, t, state }) {
  const cls =
    state === "done"
      ? "border-emerald-300 bg-emerald-50"
      : state === "now"
        ? "border-amber-400 bg-amber-50 ring-2 ring-amber-200"
        : "border-border bg-card";
  return (
    <div className={cn("rounded-lg border px-3 py-2 text-center min-w-[100px]", cls)}>
      {state === "done" && (
        <div className="flex justify-center text-emerald-600 mb-1">
          <Icon name="circleCheck" size={16} />
        </div>
      )}
      <div className="text-xs font-semibold">{n}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">
        {state === "now" ? `en curso · ${t}` : t}
      </div>
    </div>
  );
}

function DetailScreen({ tipo }) {
  const isA = tipo === "A";
  const steps = isA
    ? [
        { n: "Pendiente", t: "0d", state: "done" },
        { n: "En maqueta", t: "3d", state: "done" },
        { n: "En progreso", t: "5d", state: "now" },
        { n: "Desplegado", t: "2d", state: "todo" },
        { n: "Observado", t: "—", state: "todo" },
        { n: "Operativo", t: "—", state: "todo" },
      ]
    : [
        { n: "Pendiente", t: "0d", state: "done" },
        { n: "En progreso", t: "1d", state: "done" },
        { n: "Hecho", t: "4h", state: "now" },
        { n: "Desplegado", t: "1d", state: "todo" },
        { n: "Observado", t: "—", state: "todo" },
        { n: "Operativo", t: "—", state: "todo" },
      ];

  const subSteps = [
    { n: "Pendiente", t: "½d", state: "done" },
    { n: "En progreso", t: "1d", state: "now" },
    { n: "Hecho", t: "½d", state: "todo" },
    { n: "Desplegado", t: "1d", state: "todo" },
    { n: "Observado", t: "—", state: "todo" },
    { n: "Operativo", t: "—", state: "todo" },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="space-y-2">
              <Badge variant={isA ? "tipoA" : "tipoB"}>
                {isA ? "Tipo A · Proyecto" : "Tipo B · Requerimiento B1"}
              </Badge>
              <CardTitle className="text-xl">{isA ? "App marcaciones móvil" : "Login falla con SSO"}</CardTitle>
              <CardDescription className="font-mono text-xs">
                {isA ? "PRJ-098" : "REQ-428"} · creado 03-may por María Rojas (Operaciones)
              </CardDescription>
            </div>
            <div className="text-right space-y-1 text-sm">
              <div className="font-mono text-muted-foreground">
                SLA estimado: <span className="text-foreground font-semibold">{isA ? "8 días" : "1 día"}</span>
              </div>
              <div className="font-mono text-amber-700">
                transcurrido: <span className="font-semibold">5d 4h</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-end pt-2">
                <Badge variant="outline" className="bg-orange-50 text-orange-900 border-orange-200">PM · L. Vega</Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-900 border-blue-200">Analista · J. Torres</Badge>
              </div>
              {isA ? (
                <div className="flex flex-wrap gap-2 justify-end pt-1">
                  <Badge variant="warning">complej. PM: Media</Badge>
                  <Badge variant="info">complej. Analista (fase 6): Alta</Badge>
                </div>
              ) : (
                <div className="flex justify-end pt-1">
                  <Badge variant="danger">complejidad: Alta</Badge>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Estados</h3>
            <div className="flex flex-wrap gap-2">
              {steps.map((s, i) => (
                <React.Fragment key={i}>
                  <StepPill {...s} />
                  {i < steps.length - 1 && (
                    <span className="hidden sm:flex items-center text-muted-foreground">
                      <Icon name="chevRight" size={14} />
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {isA && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold mb-2">Fase macro</h3>
                <p className="text-xs text-muted-foreground mb-3">vista ejecutiva</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {["Levantamiento", "Maqueta", "Configuración", "Pruebas", "Capacitación"].map((name, i) => (
                    <div
                      key={name}
                      className={cn(
                        "rounded-lg border px-2 py-3 text-center text-xs font-medium",
                        i === 2 ? "border-blue-400 bg-blue-50 ring-2 ring-blue-200" : "bg-muted/40"
                      )}
                    >
                      {name}
                      {i === 2 && <div className="text-[10px] text-blue-700 mt-1 font-mono">ahora</div>}
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border-blue-200 bg-blue-50/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-900 flex items-center gap-2">
                    <Icon name="cornerDown" size={16} />
                    Sub-flujo dentro de fase Configuración
                  </CardTitle>
                  <CardDescription className="text-blue-800/80 text-xs">
                    a cargo del Analista · mismos estados que un requerimiento B
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {subSteps.map((s, i) => (
                      <React.Fragment key={i}>
                        <StepPill {...s} />
                        {i < subSteps.length - 1 && (
                          <span className="hidden sm:flex items-center text-blue-400">
                            <Icon name="chevRight" size={12} />
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-xs text-blue-900/80 mt-3 leading-relaxed">
                    Al cerrar el sub-flujo, la fase 6 marca <b>Hecho</b> y pasa a <b>Pruebas</b>.
                    Si en Pruebas el área detecta algo, vuelve a este sub-flujo (estado <b>Observado</b>).
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          <Separator />
          <div>
            <h3 className="text-sm font-semibold mb-3">Resumen de la solicitud</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div><span className="text-muted-foreground text-xs">Área:</span> Operaciones</div>
                <div><span className="text-muted-foreground text-xs">Sección:</span> Marcaciones</div>
                <div><span className="text-muted-foreground text-xs">Perfil:</span> Jefe de turno</div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground text-xs">Objetivo:</span>{" "}
                  {isA ? "Reemplazar marcador físico" : "Restablecer login SSO"}
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Descripción:</span> breve descripción de ejemplo.
                </div>
                <div className="font-mono text-xs">
                  <span className="text-muted-foreground">Adjuntos:</span> pantallazo-01.png · req-flujo.pdf
                </div>
              </div>
            </div>
          </div>

          <Separator />
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground mr-2">Acciones del rol activo:</span>
            <Button size="sm" variant="outline">marcar Desplegado</Button>
            <Button size="sm" variant="destructive">marcar Observado</Button>
            <Button size="sm" variant="success">marcar Operativo</Button>
            <Button size="sm" variant="outline">adjuntar evidencia</Button>
            <Button size="sm" variant="ghost">re-asignar</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="xl:sticky xl:top-4 flex flex-col max-h-[min(720px,85vh)]">
        <CardHeader className="border-b pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-base">Chat de evidencias</CardTitle>
              <CardDescription className="text-xs font-mono">creado automáticamente con la solicitud</CardDescription>
            </div>
            <Badge variant="success">en vivo</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto scrollarea space-y-4 py-4 stream">
          <div className="rounded-lg border bg-card p-3 text-sm space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Avatar initials="MR" size={28} tone="SO" />
              <span className="font-medium">María R.</span>
              <span className="text-muted-foreground font-mono">· 03-may 09:12</span>
            </div>
            <p>Hola, adjunto el detalle del problema con la app de marcaciones.</p>
            <div className="text-xs font-mono text-muted-foreground border rounded px-2 py-1 inline-block">pantallazo-01.png</div>
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3 text-sm space-y-2 ml-4">
            <div className="flex items-center gap-2 text-xs">
              <Avatar initials="JT" size={28} tone="AN" />
              <span className="font-medium">J. Torres (Analista)</span>
              <span className="text-muted-foreground font-mono">· 03-may 10:40</span>
            </div>
            <p>Recibido. Lo revisamos hoy mismo y volvemos con diagnóstico.</p>
          </div>
          <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-3 text-sm space-y-2 ml-4">
            <div className="flex items-center gap-2 text-xs">
              <Avatar initials="LV" size={28} tone="PM" />
              <span className="font-medium">L. Vega (PM)</span>
              <span className="text-muted-foreground font-mono">· 04-may</span>
            </div>
            <p>Maqueta aprobada por el área. Pasamos a Configuración.</p>
            <div className="text-xs font-mono text-muted-foreground border rounded px-2 py-1 inline-block">maqueta-v2.pdf</div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex-col gap-2 items-stretch">
          <Textarea placeholder="escribe un mensaje…" rows={2} className="resize-none" />
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="outline">adjuntar</Button>
            <Button size="sm">enviar</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

window.DetailScreen = DetailScreen;
