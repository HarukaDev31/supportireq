/* global React, ReactDOM, FlowDiagram, Kanban, Modales, Detalle, ConfigTiempos, Roles, TweaksPanel, useTweaks, TweakSection, TweakRadio */

const TABS = [
  {key:"flujo",   label:"1 · Diagrama de flujo"},
  {key:"tablero", label:"2 · Tablero (Kanban)"},
  {key:"modal",   label:"3 · Modales de solicitud"},
  {key:"detalle", label:"4 · Detalle + Chat"},
  {key:"config",  label:"5 · Config. tiempos"},
  {key:"roles",   label:"6 · Roles & permisos"},
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "rol": "PM",
  "tipoDetalle": "A",
  "modoSketch": "lapiz"
}/*EDITMODE-END*/;

function App() {
  const [tab, setTab] = React.useState("flujo");
  const [tw, setTweak] = (typeof useTweaks === "function")
    ? useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];

  // Apply "sketch intensity" globally
  React.useEffect(() => {
    document.documentElement.style.setProperty("--paper",
      tw.modoSketch === "limpio" ? "#fafaf6" : tw.modoSketch === "marcador" ? "#f1ebd9" : "#f6f2e9");
    document.documentElement.style.setProperty("--ink",
      tw.modoSketch === "marcador" ? "#0c0b0a" : "#1d1c1a");
  }, [tw.modoSketch]);

  const RoleHud = () => (
    <span className="row" style={{gap:6, alignItems:"center"}}>
      <span className="mono xs muted">viendo como</span>
      <span className={`pill xs ${tw.rol === "PM" ? "role-pm" : tw.rol === "AN" ? "role-an" : "role-so"}`}>
        {tw.rol === "PM" ? "PM · L. Vega" : tw.rol === "AN" ? "Analista · J. Torres" : "Solicitante · M. Rojas"}
      </span>
    </span>
  );

  return (
    <div className="shell">
      <header className="top">
        <h1 style={{transform:"rotate(-.6deg)"}}>
          Módulo Soporte TI — Procesos
          <small>Wireframes · diagrama de flujo + prototipo completo · v0.1</small>
        </h1>
        <div className="meta">
          <div><strong>tipos:</strong> A Proyecto · B Requerimiento (B1/B2)</div>
          <div><strong>roles:</strong> PM · Analista · Solicitante</div>
          <div><RoleHud /></div>
        </div>
      </header>

      <nav className="tabs" role="tablist">
        {TABS.map(x => (
          <button key={x.key} className={`tab ${tab===x.key?"active":""}`} onClick={()=>setTab(x.key)}>
            {x.label}
          </button>
        ))}
      </nav>

      {tab === "flujo"   && <FlowDiagram />}
      {tab === "tablero" && <Kanban />}
      {tab === "modal"   && <Modales />}
      {tab === "detalle" && (
        <div className="col" style={{gap: 12}}>
          <div className="row" style={{gap:8, alignItems:"center"}}>
            <span className="anno" style={{marginRight:6}}>vista de detalle para</span>
            <button className={`pill ${tw.tipoDetalle==="A"?"tag-A":""}`}
                    style={{cursor:"pointer", fontWeight: tw.tipoDetalle==="A"?700:400}}
                    onClick={()=>setTweak("tipoDetalle","A")}>Tipo A · Proyecto</button>
            <button className={`pill ${tw.tipoDetalle==="B"?"tag-B":""}`}
                    style={{cursor:"pointer", fontWeight: tw.tipoDetalle==="B"?700:400}}
                    onClick={()=>setTweak("tipoDetalle","B")}>Tipo B · Requerimiento</button>
          </div>
          <Detalle tipo={tw.tipoDetalle} />
        </div>
      )}
      {tab === "config"  && <ConfigTiempos />}
      {tab === "roles"   && <Roles />}

      <footer style={{marginTop: 32, paddingTop: 14, borderTop: "2px dashed var(--line-soft)"}}>
        <div className="row" style={{justifyContent:"space-between", alignItems:"baseline"}}>
          <div className="muted small">
            Wireframes para validar estructura y flujos antes de pasar a hi-fi. Activa el panel de Tweaks (botón flotante) para cambiar rol y modo de sketch.
          </div>
          <div className="mono xs muted">Modulo Soporte TI / wireframe v0.1 · {new Date().toLocaleDateString("es-PE")}</div>
        </div>
      </footer>

      {typeof TweaksPanel === "function" && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Rol activo">
            <TweakRadio
              label="rol"
              value={tw.rol}
              onChange={(v)=>setTweak("rol", v)}
              options={[
                {value:"PM", label:"PM"},
                {value:"AN", label:"Analista"},
                {value:"SO", label:"Solicitante"},
              ]}
            />
          </TweakSection>

          <TweakSection label="Pantalla de detalle">
            <TweakRadio
              label="tipo"
              value={tw.tipoDetalle}
              onChange={(v)=>setTweak("tipoDetalle", v)}
              options={[
                {value:"A", label:"Proyecto"},
                {value:"B", label:"Requerim."},
              ]}
            />
          </TweakSection>

          <TweakSection label="Estilo">
            <TweakRadio
              label="modo"
              value={tw.modoSketch}
              onChange={(v)=>setTweak("modoSketch", v)}
              options={[
                {value:"limpio", label:"limpio"},
                {value:"lapiz", label:"lápiz"},
                {value:"marcador", label:"marcador"},
              ]}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
