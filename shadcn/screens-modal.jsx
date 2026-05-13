/* global React, cn, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button, Label, Input, Textarea */

function ModalScreen() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Card className="overflow-hidden border-orange-300 shadow-pop">
          <CardHeader className="bg-orange-600 text-white pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base text-white">Ficha A — Proyecto del Mes</CardTitle>
              <Badge className="bg-white text-orange-700 border-0">nuevo</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <div className="grid gap-2">
              <Label>Área</Label>
              <Input placeholder="Operaciones / RRHH / …" />
            </div>
            <div className="grid gap-2">
              <Label>Perfil</Label>
              <Input placeholder="Jefe de área" />
            </div>
            <div className="grid gap-2">
              <Label>Sección</Label>
              <Input placeholder="Cobranzas" />
            </div>
            <div className="grid gap-2">
              <Label>Objetivo</Label>
              <Input placeholder="Para qué se necesita" />
            </div>
            <div className="grid gap-2">
              <Label>Descripción</Label>
              <Textarea placeholder="descripción del requerimiento…" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label>Complejidad</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Baja</Badge>
                <Badge variant="warning">Media</Badge>
                <Badge variant="outline">Alta</Badge>
                <Badge variant="outline">Crítica</Badge>
                <span className="text-xs text-muted-foreground self-center">el PM decide</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Referencias</Label>
              <div className="rounded-md border border-dashed bg-muted/40 px-3 py-8 text-center text-sm text-muted-foreground font-mono">
                arrastra pantallazos / docs
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-3 border-t bg-muted/20 items-stretch sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">Se asigna a un Project Manager</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline">cancelar</Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">enviar</Button>
            </div>
          </CardFooter>
        </Card>
        <p className="text-xs text-muted-foreground">El PM ve esto en su bandeja como &quot;Pendiente&quot;</p>
      </div>

      <div className="space-y-4">
        <Card className="overflow-hidden border-blue-300 shadow-pop">
          <CardHeader className="bg-blue-700 text-white pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base text-white">Ficha B — Requerimiento TI</CardTitle>
              <Badge className="bg-white text-blue-800 border-0">nuevo</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <div className="grid gap-2">
              <Label>Área</Label>
              <Input placeholder="…" />
            </div>
            <div className="grid gap-2">
              <Label>Perfil</Label>
              <Input placeholder="…" />
            </div>
            <div className="grid gap-2">
              <Label>Sección</Label>
              <Input placeholder="…" />
            </div>
            <div className="grid gap-2">
              <Label>Tipo de req.</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="tipoB1">B1 Incidencia</Badge>
                <Badge variant="tipoB2" className="opacity-60">B2 Configuración</Badge>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Instrucciones</Label>
              <Textarea placeholder="qué falla / qué configurar…" rows={3} />
            </div>
            <div className="grid gap-2">
              <Label>Pantallazo</Label>
              <div className="rounded-md border border-dashed bg-muted/40 px-3 py-8 text-center text-sm text-muted-foreground font-mono">
                adjunta captura del error
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-3 border-t bg-muted/20 items-stretch sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">Se asigna al Analista TI</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline">cancelar</Button>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white">enviar</Button>
            </div>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className={cn("border-orange-200")}>
            <CardHeader className="pb-2">
              <Badge variant="tipoB1">B1 — Incidencia</Badge>
              <CardDescription className="text-xs font-mono text-muted-foreground">referencia ITIL · informativo</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed pt-0">
              Error o comportamiento inesperado en módulo existente. Lo que el Analista hace internamente al diagnosticar.
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardHeader className="pb-2">
              <Badge variant="tipoB2">B2 — Configuración</Badge>
              <CardDescription className="text-xs font-mono text-muted-foreground">referencia ITIL · informativo</CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground leading-relaxed pt-0">
              Ajuste de parámetros, accesos o textos en módulo existente. Cambio acotado, sin desarrollo.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

window.ModalScreen = ModalScreen;
