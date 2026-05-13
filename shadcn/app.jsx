/* global React, ReactDOM, cn, Button, Badge, Separator, FlowScreen, KanbanScreen, ModalScreen, DetailScreen, ConfigScreen, RolesScreen */

const TABS = [
  { key: "flujo", label: "1 · Diagrama de flujo" },
  { key: "tablero", label: "2 · Tablero (Kanban)" },
  { key: "modal", label: "3 · Modales de solicitud" },
  { key: "detalle", label: "4 · Detalle + Chat" },
  { key: "config", label: "5 · Config. tiempos" },
  { key: "roles", label: "6 · Roles & permisos" },
];

function App() {
  const [tab, setTab] = React.useState("flujo");
  const [rol, setRol] = React.useState("PM");
  const [tipoDetalle, setTipoDetalle] = React.useState("A");

  const rolLabel =
    rol === "PM" ? "PM · L. Vega" : rol === "AN" ? "Analista · J. Torres" : "Solicitante · M. Rojas";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
        <header className="border-b pb-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Módulo Soporte TI — Procesos
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Prototipo shadcn · diagrama de flujo + pantallas · v0.1
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 text-sm">
              <div className="text-muted-foreground">
                <span className="font-medium text-foreground">tipos:</span> A Proyecto · B Requerimiento (B1/B2)
              </div>
              <div className="text-muted-foreground">
                <span className="font-medium text-foreground">roles:</span> PM · Analista · Solicitante
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-muted-foreground">viendo como</span>
                <Badge
                  variant={rol === "PM" ? "tipoA" : rol === "AN" ? "tipoB" : "secondary"}
                  className="font-normal"
                >
                  {rolLabel}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            <span className="text-xs text-muted-foreground self-center mr-1">Rol:</span>
            {[
              { v: "PM", l: "PM" },
              { v: "AN", l: "Analista" },
              { v: "SO", l: "Solicitante" },
            ].map((o) => (
              <Button
                key={o.v}
                size="sm"
                variant={rol === o.v ? "default" : "outline"}
                onClick={() => setRol(o.v)}
              >
                {o.l}
              </Button>
            ))}
          </div>
        </header>

        <nav className="flex flex-wrap gap-1 border-b mb-6 -mb-px" role="tablist">
          {TABS.map((x) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={tab === x.key}
              onClick={() => setTab(x.key)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-t-md border border-b-0 transition-colors focus-ring mb-[-1px]",
                tab === x.key
                  ? "bg-card text-foreground border-border shadow-soft relative z-10"
                  : "bg-transparent text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              {x.label}
            </button>
          ))}
        </nav>

        <main>
          {tab === "flujo" && <FlowScreen />}
          {tab === "tablero" && <KanbanScreen />}
          {tab === "modal" && <ModalScreen />}
          {tab === "detalle" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground">vista de detalle para</span>
                <Button
                  size="sm"
                  variant={tipoDetalle === "A" ? "default" : "outline"}
                  className={tipoDetalle === "A" ? "bg-orange-600 hover:bg-orange-700" : ""}
                  onClick={() => setTipoDetalle("A")}
                >
                  Tipo A · Proyecto
                </Button>
                <Button
                  size="sm"
                  variant={tipoDetalle === "B" ? "default" : "outline"}
                  className={tipoDetalle === "B" ? "bg-blue-700 hover:bg-blue-800" : ""}
                  onClick={() => setTipoDetalle("B")}
                >
                  Tipo B · Requerimiento
                </Button>
              </div>
              <DetailScreen tipo={tipoDetalle} />
            </div>
          )}
          {tab === "config" && <ConfigScreen />}
          {tab === "roles" && <RolesScreen />}
        </main>

        <Separator className="my-10" />

        <footer className="flex flex-col sm:flex-row gap-4 justify-between text-xs text-muted-foreground pb-8">
          <p className="max-w-xl leading-relaxed">
            Prototipo para validar estructura y flujos. Usa los botones de rol y las pestañas para recorrer las pantallas.
          </p>
          <p className="font-mono shrink-0">
            Soporte TI / shadcn v0.1 · {new Date().toLocaleDateString("es-PE")}
          </p>
        </footer>
      </div>
    </div>
  );
}

const root = document.getElementById("root");
if (root) ReactDOM.createRoot(root).render(<App />);
