/* global React, ReactDOM, FlowDiagram, Kanban, Modales, Detalle, ConfigTiempos, Roles */

const SECTIONS = [
  {key:"flujo",     title:"1 · Diagrama de flujo",                   render: () => <FlowDiagram /> },
  {key:"tablero",   title:"2 · Tablero (Kanban)",                    render: () => <Kanban /> },
  {key:"modal",     title:"3 · Modales de solicitud",                render: () => <Modales /> },
  {key:"detalleA",  title:"4a · Detalle + Chat · Tipo A (Proyecto)", render: () => <Detalle tipo="A" /> },
  {key:"detalleB",  title:"4b · Detalle + Chat · Tipo B (Requerimiento)", render: () => <Detalle tipo="B" /> },
  {key:"config",    title:"5 · Config. tiempos",                     render: () => <ConfigTiempos /> },
  {key:"roles",     title:"6 · Roles & permisos",                    render: () => <Roles /> },
];

function PrintApp() {
  const today = new Date().toLocaleDateString("es-PE");
  return (
    <div className="shell">
      <header className="top">
        <h1 style={{transform:"rotate(-.6deg)"}}>
          Módulo Soporte TI — Procesos
          <small>Wireframes · diagrama de flujo + prototipo completo · v0.1 · export PDF</small>
        </h1>
        <div className="meta">
          <div><strong>tipos:</strong> A Proyecto · B Requerimiento (B1/B2)</div>
          <div><strong>roles:</strong> PM · Analista · Solicitante</div>
          <div>{today}</div>
        </div>
      </header>

      {SECTIONS.map((s, i) => (
        <section key={s.key} className="print-section">
          <div className="print-header">
            <h2 style={{transform: i % 2 ? "rotate(.2deg)" : "rotate(-.3deg)"}}>{s.title}</h2>
            <div className="meta">pág. {i + 1} / {SECTIONS.length} · Modulo Soporte TI · wf v0.1</div>
          </div>
          {s.render()}
        </section>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PrintApp />);

// Auto-print once everything is settled
(async () => {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
  // give React/Babel a moment to mount all sections
  await new Promise(r => setTimeout(r, 800));
  window.print();
})();
