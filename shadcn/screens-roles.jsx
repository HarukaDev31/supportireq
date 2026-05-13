/* global React, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell */

function RolesScreen() {
  const roles = [
    { ini: "PM", name: "Project Manager", scope: "Tipo A · fases Levantamiento, Maqueta, Capacitación", can: ["crear/cerrar Proyectos", "aprobar pasos macro", "reasignar", "reportes mes"] },
    { ini: "AS", name: "Analista Senior TI", scope: "Tipo A · Configuración y Pruebas · Tipo B completo (B1/B2)", can: ["resolver incidencias", "ejecutar configuraciones", "marcar Hecho/Desplegado", "adjuntar evidencias"] },
    { ini: "SL", name: "Solicitante (Área)", scope: "Cualquier proceso que él/ella crea", can: ["crear solicitudes", "aprobar maqueta", "validar en pruebas", "aceptar Operativo / Observado"] },
  ];

  const matrix = [
    ["Crear solicitud", "—", "—", "✓"],
    ["Asignar analista/PM", "✓", "—", "—"],
    ["Definir complejidad global (Tipo A)", "✓", "—", "—"],
    ["Definir complejidad propia (fase 6 / Tipo B)", "—", "✓", "—"],
    ["Aprobar maqueta", "leer", "—", "✓"],
    ["Pasar a En progreso / Hecho", "—", "✓", "—"],
    ["Pasar a Desplegado", "—", "✓", "—"],
    ["Marcar Observado", "leer", "—", "✓"],
    ["Marcar Operativo (cierre)", "leer", "leer", "✓"],
    ["Mantenedor tiempos A · fases L/M/P/Cap.", "✓", "—", "—"],
    ["Mantenedor tiempos A · fase Configuración", "—", "✓", "—"],
    ["Mantenedor tiempos B (Requerimientos)", "—", "✓", "—"],
    ["Adjuntar evidencias en chat", "✓", "✓", "✓"],
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((r) => (
          <Card key={r.ini}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-muted text-sm font-bold">
                  {r.ini}
                </div>
                <div>
                  <CardTitle className="text-base">{r.name}</CardTitle>
                  <CardDescription className="text-xs font-mono mt-1">{r.scope}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-medium text-muted-foreground mb-2">Puede:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                {r.can.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-foreground text-background py-3">
          <CardTitle className="text-base text-background">Matriz de permisos (RACI simplificada)</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Acción</TableHead>
              <TableHead>PM</TableHead>
              <TableHead>Analista</TableHead>
              <TableHead>Solicitante</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matrix.map((m) => (
              <TableRow key={m[0]}>
                <TableCell className="font-medium">{m[0]}</TableCell>
                {[1, 2, 3].map((k) => (
                  <TableCell key={k}>
                    {m[k] === "✓" && <Badge variant="success">✓ puede</Badge>}
                    {m[k] === "leer" && <Badge variant="outline">solo lectura</Badge>}
                    {m[k] === "—" && <span className="text-muted-foreground text-xs">—</span>}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

window.RolesScreen = RolesScreen;
