/* global React, ReactDOM, cn, Button, Badge, Separator, FlowScreen, KanbanScreen, ModalScreen, DetailScreen, ConfigScreen, RolesScreen */

function ConfigScreen() {
  const compsB = [
    ["Baja", "4", "horas", "ajustes triviales, 1 sub-paso largo"],
    ["Media", "1", "días", "estándar — la mayoría de casos"],
    ["Alta", "2", "días", "requiere análisis profundo / coord."],
    ["Crítica", "4", "días", "bloqueo de operación, prioridad máx."],
  ];
  const fasesA = [
    { f: "Levantamiento", baja: "2", media: "4", alta: "7", critica: "10", who: "PM" },
    { f: "Maqueta", baja: "3", media: "5", alta: "8", critica: "12", who: "PM" },
    { f: "Configuración", baja: "3", media: "6", alta: "10", critica: "15", who: "Analista (valores independientes)" },
    { f: "Pruebas", baja: "1", media: "2", alta: "4", critica: "6", who: "PM + Solicitante" },
    { f: "Capacitación", baja: "1", media: "2", alta: "3", critica: "5", who: "PM" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Mantenedor de tiempos estimados</CardTitle>
            <CardDescription className="mt-2 max-w-3xl">
              El tiempo <strong>no se configura por estado</strong>: se configura por <strong>complejidad</strong> (Tipo B) o por{" "}
              <strong>fase × complejidad</strong> (Tipo A). Cada estado interno hereda su tiempo desde estos valores.
            </CardDescription>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm">restablecer defaults</Button>
            <Button size="sm">guardar cambios</Button>
          </div>
        </CardHeader>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="bg-blue-700 text-white pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base text-white">Tipo B — Requerimientos (B1 / B2)</CardTitle>
            <div className="flex gap-2">
              <Badge className="bg-white text-blue-800 border-0">edita: Analista</Badge>
              <Badge variant="warning" className="border-0">aplica a B1 y B2</Badge>
            </div>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Complejidad</TableHead>
              <TableHead>Tiempo estimado</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead>Cuándo usarla</TableHead>
              <TableHead className="hidden lg:table-cell">Nota</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compsB.map((r, i) => (
              <TableRow key={r[0]}>
                <TableCell>
                  <Badge variant={["success", "warning", "danger", "destructive"][i] || "outline"}>{r[0]}</Badge>
                </TableCell>
                <TableCell><Input className="w-20 h-8" defaultValue={r[1]} /></TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Badge variant={r[2] === "horas" ? "warning" : "outline"}>horas</Badge>
                    <Badge variant={r[2] === "días" ? "warning" : "outline"}>días</Badge>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs max-w-xs">{r[3]}</TableCell>
                <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                  se reparte entre los estados del flujo B
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CardFooter className="bg-muted/40 text-xs text-muted-foreground border-t py-3">
          El Analista escoge la complejidad al tomar el requerimiento. El total se reparte entre En progreso → Hecho → Desplegado.
        </CardFooter>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="bg-orange-600 text-white pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base text-white">Tipo A — Proyectos del mes</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white text-orange-800 border-0">PM: fases L, M, P, C</Badge>
              <Badge className="bg-blue-100 text-blue-900 border-blue-200">Analista: Configuración</Badge>
            </div>
          </div>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fase</TableHead>
              <TableHead className="text-center">Baja</TableHead>
              <TableHead className="text-center">Media</TableHead>
              <TableHead className="text-center">Alta</TableHead>
              <TableHead className="text-center">Crítica</TableHead>
              <TableHead>Asigna complejidad</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fasesA.map((row) => {
              const esFase6 = row.f === "Configuración";
              return (
                <TableRow key={row.f} className={esFase6 ? "bg-blue-50/50" : ""}>
                  <TableCell>
                    <div className="font-medium">{row.f}</div>
                    {esFase6 && <div className="text-xs text-muted-foreground mt-1">edita Analista</div>}
                  </TableCell>
                  {["baja", "media", "alta", "critica"].map((k) => (
                    <TableCell key={k} className="text-center">
                      <Input className="w-16 h-8 inline-flex" defaultValue={row[k]} />
                    </TableCell>
                  ))}
                  <TableCell className="text-xs text-muted-foreground">{row.who}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <CardFooter className="bg-amber-50/80 text-xs text-amber-950 border-t py-3 leading-relaxed">
          El PM asigna complejidad global al crear el proyecto. En <strong>Configuración</strong>, el Analista redefine complejidad con valores
          independientes del mantenedor Tipo B.
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cómo se calculan los tiempos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-blue-200 shadow-none">
              <CardHeader className="pb-2"><Badge variant="tipoB">Tipo B</Badge></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1 pt-0">
                <p>1. Analista recibe req.</p>
                <p>2. Asigna complejidad → tabla B</p>
                <p>3. Tiempo total = celda elegida</p>
                <p>4. Se reparte entre sub-estados</p>
              </CardContent>
            </Card>
            <Card className="border-orange-200 shadow-none">
              <CardHeader className="pb-2"><Badge variant="tipoA">Tipo A</Badge></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1 pt-0">
                <p>1. PM crea proyecto + complejidad</p>
                <p>2. Cada fase → tabla A</p>
                <p>3. Fase Config.: Analista redefine</p>
                <p>4. Pruebas puede regresar a Config.</p>
              </CardContent>
            </Card>
            <Card className="border-dashed shadow-none">
              <CardHeader className="pb-2"><Badge variant="outline">SLA</Badge></CardHeader>
              <CardContent className="text-sm space-y-2 pt-0">
                <div><Badge variant="success" className="mr-2">verde</Badge> &lt; 75% tiempo</div>
                <div><Badge variant="warning" className="mr-2">ámbar</Badge> 75 – 100%</div>
                <div><Badge variant="danger" className="mr-2">rojo</Badge> &gt; 100%</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

window.ConfigScreen = ConfigScreen;
