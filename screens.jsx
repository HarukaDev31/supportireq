/* global React */
// Pantallas wireframe — Tablero Kanban, Modales (Ficha A/B), Detalle+Chat, Config, Roles

// ====== Tablero Kanban ======
function Kanban() {
  const colsA = [
    {key:"pendiente", name:"Pendiente", sub:"solicitud registrada"},
    {key:"maqueta", name:"En maqueta", sub:"diseñando maqueta"},
    {key:"progreso", name:"En progreso", sub:"TI configurando"},
    {key:"desplegado", name:"Desplegado", sub:"validar"},
    {key:"observado", name:"Observado", sub:"correcciones"},
    {key:"operativo", name:"Operativo", sub:"cerrado"},
  ];
  const colsB = [
    {key:"pendiente", name:"Pendiente", sub:"req. registrado"},
    {key:"progreso", name:"En progreso", sub:"TI trabajando"},
    {key:"hecho", name:"Hecho", sub:"sin validación"},
    {key:"desplegado", name:"Desplegado", sub:"validar"},
    {key:"observado", name:"Observado", sub:"no resuelto"},
    {key:"operativo", name:"Operativo", sub:"cerrado"},
  ];

  const sampleA = {
    pendiente: [{c:"PRJ-104", t:"Módulo cobranzas v2", who:["MR"], days:"hoy"}],
    maqueta: [{c:"PRJ-101", t:"Portal proveedores", who:["LV","JT"], pct:55, days:"d. 3/7"}],
    progreso: [{c:"PRJ-098", t:"App marcaciones móvil", who:["JT"], pct:70, days:"d. 5/8", bar:"warn"}],
    desplegado: [{c:"PRJ-092", t:"Reportes BI ventas", who:["MR","LV"], pct:90, days:"validando"}],
    observado: [{c:"PRJ-088", t:"Integración SAP", who:["JT"], pct:60, days:"+2d", bar:"late"}],
    operativo: [{c:"PRJ-080", t:"Onboarding RRHH", who:["MR"], pct:100}],
  };
  const sampleB = {
    pendiente: [
      {c:"REQ-432", tag:"B1", t:"Error al exportar factura PDF", who:["AS"], days:"hoy"},
      {c:"REQ-431", tag:"B2", t:"Cambio etiqueta menú", who:["AS"], days:"hoy"},
    ],
    progreso: [{c:"REQ-428", tag:"B1", t:"Login falla con SSO", who:["AS"], pct:40, days:"d. 1/2", bar:"warn"}],
    hecho: [{c:"REQ-425", tag:"B2", t:"Habilitar permiso supervisor", who:["AS"], pct:80}],
    desplegado: [{c:"REQ-420", tag:"B2", t:"Texto del aviso compliance", who:["AS"], pct:90}],
    observado: [{c:"REQ-415", tag:"B1", t:"Reporte no muestra totales", who:["AS"], bar:"late", days:"+1d"}],
    operativo: [{c:"REQ-410", tag:"B2", t:"Color del banner home", pct:100}],
  };

  const Card = ({d, tone}) => (
    <div className="kcard">
      <span className="code">{d.c}</span>
      {d.tag && <span className={`pill tag-${d.tag} xs`} style={{fontSize:11, padding:"1px 6px"}}>{d.tag}</span>}
      {d.tag && <span style={{display:"inline-block", width:4}} />}
      <span>{d.t}</span>
      {d.pct !== undefined && (
        <div className={`bar ${d.bar||""}`}><span style={{width: `${d.pct}%`}} /></div>
      )}
      <div className="who">
        {d.who && d.who.map((w,i)=><span key={i} className="ava">{w}</span>)}
        {d.days && <span style={{marginLeft:"auto"}}>{d.days}</span>}
      </div>
    </div>
  );

  const Board = ({title, accent, cols, data}) => (
    <div className="sk sk--double" style={{padding: 16, marginBottom: 18}}>
      <div className="row" style={{justifyContent:"space-between", alignItems:"baseline", marginBottom: 10}}>
        <h3 style={{color: accent}}>{title}</h3>
        <div className="row" style={{gap:6}}>
          <span className="pill xs">filtrar área</span>
          <span className="pill xs">filtrar rol</span>
          <span className="pill xs">mes actual ▾</span>
          <span className="pill xs" style={{background:"#fff5e0"}}>+ nuevo</span>
        </div>
      </div>
      <div className="kanban">
        {cols.map(c => (
          <div key={c.key} className={`kcol col-${c.key}`}>
            <header>
              <span className="name">{c.name}</span>
              <span className="count">{(data[c.key]||[]).length}</span>
            </header>
            <div className="xs muted" style={{marginTop:-4, marginBottom:6}}>{c.sub}</div>
            {(data[c.key]||[]).map((d,i)=><Card key={i} d={d}/>)}
            {(!data[c.key] || data[c.key].length===0) && <div className="ghost xs" style={{padding:"8px", textAlign:"center"}}>vacío</div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Board title="Tipo A — Proyectos del mes" accent="var(--orange)" cols={colsA} data={sampleA} />
      <Board title="Tipo B — Requerimientos TI (B1 + B2)" accent="var(--blue)" cols={colsB} data={sampleB} />
    </div>
  );
}

// ====== Modales de solicitud ======
function Modales() {
  return (
    <div className="row" style={{gap:24}}>
      <div className="grow" style={{minWidth: 420}}>
        <div className="sk sk--double sk--tilt-l" style={{overflow:"hidden"}}>
          <div className="modal-head A">
            <span>Ficha A — Proyecto del Mes</span>
            <span className="pill" style={{background:"#fff", color:"var(--orange)", borderColor:"#fff"}}>nuevo</span>
          </div>
          <div className="modal-body">
            <div className="form-row"><label>Área</label><input className="field" placeholder="Operaciones / RRHH / …"/></div>
            <div className="form-row"><label>Perfil</label><input className="field" placeholder="Jefe de área"/></div>
            <div className="form-row"><label>Sección</label><input className="field" placeholder="Cobranzas"/></div>
            <div className="form-row"><label>Objetivo</label><input className="field" placeholder="Para qué se necesita"/></div>
            <div className="form-row"><label>Descripción</label><div className="field ta">descripción del requerimiento…</div></div>
            <div className="form-row"><label>Complejidad</label>
              <div className="row" style={{gap:6}}>
                <span className="pill xs" style={{background:"#e9f5ed"}}>○ Baja</span>
                <span className="pill xs" style={{background:"#fff5e0", borderWidth:2}}>● Media</span>
                <span className="pill xs">○ Alta</span>
                <span className="pill xs">○ Crítica</span>
                <span className="anno" style={{fontSize:14}}>el PM decide</span>
              </div>
            </div>
            <div className="form-row"><label>Referencias</label>
              <div className="ghost" style={{padding:"14px 10px", textAlign:"center"}}>
                <span className="mono">⤓ arrastra pantallazos / docs</span>
              </div>
            </div>
            <div className="hr" />
            <div className="row" style={{justifyContent:"space-between"}}>
              <span className="scribble">→ Se asigna a un Project Manager</span>
              <div className="row" style={{gap:6}}>
                <span className="pill">cancelar</span>
                <span className="pill" style={{background:"var(--orange)", color:"#fff", borderColor:"var(--orange)"}}>enviar</span>
              </div>
            </div>
          </div>
        </div>
        <p className="anno">El PM ve esto en su bandeja como "Pendiente"</p>
      </div>

      <div className="grow" style={{minWidth: 420}}>
        <div className="sk sk--double sk--tilt-r" style={{overflow:"hidden"}}>
          <div className="modal-head B">
            <span>Ficha B — Requerimiento TI</span>
            <span className="pill" style={{background:"#fff", color:"var(--blue)", borderColor:"#fff"}}>nuevo</span>
          </div>
          <div className="modal-body">
            <div className="form-row"><label>Área</label><input className="field" placeholder="…"/></div>
            <div className="form-row"><label>Perfil</label><input className="field" placeholder="…"/></div>
            <div className="form-row"><label>Sección</label><input className="field" placeholder="…"/></div>
            <div className="form-row"><label>Tipo de req.</label>
              <div className="row" style={{gap:8}}>
                <span className="pill tag-B1" style={{padding:"4px 12px"}}>● B1 Incidencia</span>
                <span className="pill tag-B2" style={{padding:"4px 12px", opacity:.5}}>○ B2 Configuración</span>
              </div>
            </div>
            <div className="form-row"><label>Instrucciones</label><div className="field ta">qué falla / qué configurar…</div></div>
            <div className="form-row"><label>Pantallazo</label>
              <div className="ghost" style={{padding:"14px 10px", textAlign:"center"}}>
                <span className="mono">⤓ adjunta captura del error</span>
              </div>
            </div>
            <div className="hr" />
            <div className="row" style={{justifyContent:"space-between"}}>
              <span className="scribble">→ Se asigna al Analista TI</span>
              <div className="row" style={{gap:6}}>
                <span className="pill">cancelar</span>
                <span className="pill" style={{background:"var(--blue)", color:"#fff", borderColor:"var(--blue)"}}>enviar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mini comparativa B1 vs B2 — SOLO referencia informativa */}
        <div className="row" style={{gap:10, marginTop: 14}}>
          <div className="sk grow" style={{padding:10, borderColor:"var(--orange)"}}>
            <div className="row" style={{justifyContent:"space-between"}}>
              <span className="sticker tag-B1">B1 — Incidencia</span>
              <span className="mono muted" style={{fontSize:10}}>referencia ITIL · informativo</span>
            </div>
            <p className="xs muted" style={{margin:"6px 0 0"}}>
              Error o comportamiento inesperado en módulo existente. Lo que el Analista hace internamente al diagnosticar.
            </p>
          </div>
          <div className="sk grow" style={{padding:10, borderColor:"var(--blue)"}}>
            <div className="row" style={{justifyContent:"space-between"}}>
              <span className="sticker tag-B2">B2 — Configuración</span>
              <span className="mono muted" style={{fontSize:10}}>referencia ITIL · informativo</span>
            </div>
            <p className="xs muted" style={{margin:"6px 0 0"}}>
              Ajuste de parámetros, accesos o textos en módulo existente. Cambio acotado, sin desarrollo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== Detalle de proceso + Chat ======
function Detalle({tipo}) {
  // Toggle entre vista A y B
  const isA = tipo === "A";
  const steps = isA
    ? [
        {n:"Pendiente", t:"0d", state:"done"},
        {n:"En maqueta", t:"3d", state:"done"},
        {n:"En progreso", t:"5d", state:"now"},
        {n:"Desplegado", t:"2d", state:"todo"},
        {n:"Observado", t:"—", state:"todo"},
        {n:"Operativo", t:"—", state:"todo"},
      ]
    : [
        {n:"Pendiente", t:"0d", state:"done"},
        {n:"En progreso", t:"1d", state:"done"},
        {n:"Hecho", t:"4h", state:"now"},
        {n:"Desplegado", t:"1d", state:"todo"},
        {n:"Observado", t:"—", state:"todo"},
        {n:"Operativo", t:"—", state:"todo"},
      ];

  return (
    <div className="row" style={{gap: 18, alignItems:"stretch"}}>
      {/* Columna principal */}
      <div className="col grow" style={{minWidth: 640, flex:"2 1 0"}}>
        <div className="sk sk--double" style={{padding:18}}>
          <div className="row" style={{justifyContent:"space-between", alignItems:"baseline"}}>
            <div>
              <span className={`pill ${isA ? "tag-A":"tag-B"}`}>{isA ? "Tipo A · Proyecto" : "Tipo B · Requerimiento B1"}</span>
              <h2 style={{marginTop:6}}>{isA ? "App marcaciones móvil" : "Login falla con SSO"}</h2>
              <span className="mono muted">{isA ? "PRJ-098" : "REQ-428"} · creado 03-may por María Rojas (Operaciones)</span>
            </div>
            <div className="col" style={{alignItems:"flex-end", gap:4}}>
              <span className="mono">SLA estimado: <b>{isA ? "8 días" : "1 día"}</b></span>
              <span className="mono" style={{color:"var(--amber)"}}>transcurrido: <b>5d 4h</b></span>
              <span className="row" style={{gap:6, marginTop:4, flexWrap:"wrap", justifyContent:"flex-end"}}>
                <span className="pill role-pm xs">PM · L. Vega</span>
                <span className="pill role-an xs">Analista · J. Torres</span>
              </span>
              {isA ? (
                <span className="row" style={{gap:6, marginTop:2}}>
                  <span className="pill xs" style={{background:"#fff5e0"}}>complej. PM: <b>Media</b></span>
                  <span className="pill xs" style={{background:"#e2ecfb", borderColor:"var(--blue)"}}>complej. Analista (fase 6): <b>Alta</b></span>
                </span>
              ) : (
                <span className="row" style={{gap:6, marginTop:2}}>
                  <span className="pill xs" style={{background:"#fbe1d4"}}>complejidad: <b>Alta</b></span>
                </span>
              )}
            </div>
          </div>

          {/* Timeline de estados */}
          <h4 style={{marginTop:18, marginBottom:8}}>Estados</h4>
          <div className="tl">
            {steps.map((s,i) => (
              <div key={i} className={`step ${s.state}`}>
                {s.state === "done" && <span className="check">✓</span>}
                <span className="name">{s.n}</span>
                <span className="t">{s.state==="now" ? "en curso · "+s.t : s.t}</span>
              </div>
            ))}
          </div>

          {/* Macro Tipo A solo si aplica */}
          {isA && (
            <>
              <h4 style={{marginTop:18, marginBottom:8}}>Fase macro <span className="muted small">(vista ejecutiva)</span></h4>
              <div className="macro">
                <div className="mstep s1"><span className="name">Levantamiento</span></div>
                <div className="mstep s2"><span className="name">Maqueta</span></div>
                <div className="mstep s3" style={{outline:"3px dashed var(--blue)", outlineOffset:2}}>
                  <span className="name">Configuración</span>
                  <span className="mono xs muted" style={{display:"block", marginTop:2}}>ahora</span>
                </div>
                <div className="mstep s4"><span className="name">Pruebas</span></div>
                <div className="mstep s5"><span className="name">Capacitación</span></div>
              </div>

              {/* Sub-flujo del Analista dentro de la fase 6 */}
              <div className="sk" style={{padding:12, marginTop:14, borderColor:"var(--blue)", background:"#f4f8ff"}}>
                <div className="row" style={{justifyContent:"space-between", alignItems:"baseline"}}>
                  <h4 style={{color:"var(--blue)"}}>↳ Sub-flujo dentro de fase 6 (Configuración)</h4>
                  <span className="row" style={{gap:6}}>
                    <span className="mono xs muted">a cargo del Analista · mismos estados que un requerimiento B</span>
                    <span className="pill xs" style={{background:"#e2ecfb", borderColor:"var(--blue)"}}>complejidad: Alta</span>
                  </span>
                </div>
                <div className="tl" style={{marginTop:10}}>
                  {[
                    {n:"Pendiente",   t:"½d", state:"done"},
                    {n:"En progreso", t:"1d",  state:"now"},
                    {n:"Hecho",       t:"½d", state:"todo"},
                    {n:"Desplegado",  t:"1d",  state:"todo"},
                    {n:"Observado",   t:"—",   state:"todo"},
                    {n:"Operativo",   t:"—",   state:"todo"},
                  ].map((s,i)=>(
                    <div key={i} className={`step ${s.state}`} style={{borderColor:"var(--blue)"}}>
                      {s.state === "done" && <span className="check">✓</span>}
                      <span className="name">{s.n}</span>
                      <span className="t">{s.state==="now" ? "en curso · "+s.t : s.t}</span>
                    </div>
                  ))}
                </div>
                <p className="small muted" style={{marginTop:10, marginBottom:0}}>
                  Al cerrar el sub-flujo, la fase 6 marca <b>Hecho</b> y pasa a <b>Pruebas (7)</b>.
                  Si en Pruebas el área detecta algo, vuelve a este sub-flujo (estado <b>Observado</b>).
                </p>
              </div>
            </>
          )}

          {/* Datos solicitud */}
          <h4 style={{marginTop:18, marginBottom:8}}>Resumen de la solicitud</h4>
          <div className="row" style={{gap:18}}>
            <div className="grow stack">
              <div><span className="muted small">Área:</span> Operaciones</div>
              <div><span className="muted small">Sección:</span> Marcaciones</div>
              <div><span className="muted small">Perfil:</span> Jefe de turno</div>
            </div>
            <div className="grow stack">
              <div><span className="muted small">Objetivo:</span> {isA ? "Reemplazar marcador físico" : "Restablecer login SSO"}</div>
              <div><span className="muted small">Descripción:</span> Lorem ipsum dolor sit amet, breve descripción.</div>
              <div><span className="muted small">Adjuntos:</span> <span className="mono xs">pantallazo-01.png · req-flujo.pdf</span></div>
            </div>
          </div>

          {/* Acciones por rol */}
          <div className="hr" />
          <div className="row" style={{gap:8, flexWrap:"wrap"}}>
            <span className="anno" style={{marginRight:8}}>Acciones del rol activo:</span>
            <span className="pill">marcar Desplegado</span>
            <span className="pill" style={{background:"#f7d4cd", borderColor:"var(--red)"}}>marcar Observado</span>
            <span className="pill" style={{background:"#cfe8d8", borderColor:"var(--green)"}}>marcar Operativo</span>
            <span className="pill">adjuntar evidencia</span>
            <span className="pill">re-asignar</span>
          </div>
        </div>
      </div>

      {/* Chat lateral */}
      <div className="col" style={{minWidth: 360, flex:"1 1 0"}}>
        <div className="chat" style={{height:"100%"}}>
          <header>
            <div>
              <h4 style={{lineHeight:1}}>Chat de evidencias</h4>
              <span className="mono xs muted">creado automáticamente con la solicitud</span>
            </div>
            <span className="pill xs" style={{background:"#cfe8d8", borderColor:"var(--green)"}}>● en vivo</span>
          </header>
          <div className="stream">
            <div className="msg">
              <div className="who"><span className="ava" style={{background:"#ece8df"}}>MR</span> María R. <span className="mono xs muted">· 03-may 09:12</span></div>
              Hola, adjunto el detalle del problema con la app de marcaciones.
              <div className="att">📎 pantallazo-01.png</div>
            </div>
            <div className="msg me">
              <div className="who"><span className="ava" style={{background:"#e2ecfb"}}>JT</span> J. Torres (Analista) <span className="mono xs muted">· 03-may 10:40</span></div>
              Recibido. Lo revisamos hoy mismo y volvemos con diagnóstico.
            </div>
            <div className="msg me">
              <div className="who"><span className="ava" style={{background:"#fff1de"}}>LV</span> L. Vega (PM) <span className="mono xs muted">· 04-may</span></div>
              Maqueta aprobada por el área. Pasamos a Configuración.
              <div className="att">📎 maqueta-v2.pdf</div>
            </div>
            <div className="msg">
              <div className="who"><span className="ava" style={{background:"#ece8df"}}>MR</span> María R. <span className="mono xs muted">· 06-may</span></div>
              ¿Llegamos a tiempo para la capacitación del 12?
            </div>
            <div className="msg me">
              <div className="who"><span className="ava" style={{background:"#e2ecfb"}}>JT</span> J. Torres <span className="mono xs muted">· 06-may</span></div>
              Sí, vamos en línea. Subiendo cambios al QA.
              <div className="att">📷 captura-config.png</div>
            </div>
          </div>
          <footer>
            <div className="field ta" style={{minHeight: 42, padding:"6px 10px"}}>escribe un mensaje…</div>
            <span className="pill xs">📎</span>
            <span className="pill xs" style={{background:"var(--ink)", color:"var(--paper)", borderColor:"var(--ink)"}}>enviar</span>
          </footer>
        </div>
      </div>
    </div>
  );
}

// ====== Config tiempos (mantenedor por complejidad / fase) ======
function ConfigTiempos() {
  // Tipo B → solo por complejidad. Editable por Analista.
  const compsB = [
    ["Baja",     "4",  "horas", "ajustes triviales, 1 sub-paso largo"],
    ["Media",    "1",  "días",  "estándar — la mayoría de casos"],
    ["Alta",     "2",  "días",  "requiere análisis profundo / coord."],
    ["Crítica",  "4",  "días",  "bloqueo de operación, prioridad máx."],
  ];

  // Tipo A → por fase × complejidad. El PM da default global; en fase 6
  // (Configuración) los tiempos los maneja el Analista, pero con valores
  // PROPIOS — NO son los mismos que el mantenedor de Tipo B (aún cuando
  // ambos los edita el Analista).
  const fasesA = [
    {f:"Levantamiento", baja:"2", media:"4", alta:"7",  critica:"10", who:"PM"},
    {f:"Maqueta",       baja:"3", media:"5", alta:"8",  critica:"12", who:"PM"},
    {f:"Configuración", baja:"3", media:"6", alta:"10", critica:"15", who:"Analista (valores independientes)"},
    {f:"Pruebas",       baja:"1", media:"2", alta:"4",  critica:"6",  who:"PM + Solicitante"},
    {f:"Capacitación",  baja:"1", media:"2", alta:"3",  critica:"5",  who:"PM"},
  ];

  return (
    <div className="col" style={{gap:18}}>
      <div className="sk" style={{padding: 14}}>
        <div className="row" style={{justifyContent:"space-between", alignItems:"baseline"}}>
          <h3>Mantenedor de tiempos estimados</h3>
          <span className="row" style={{gap:6}}>
            <span className="pill xs">restablecer defaults</span>
            <span className="pill xs" style={{background:"var(--ink)", color:"var(--paper)", borderColor:"var(--ink)"}}>guardar cambios</span>
          </span>
        </div>
        <p className="small muted" style={{marginTop:6}}>
          El tiempo <b>no se configura por estado</b>: se configura por <b>complejidad</b> (Tipo B) o por
          <b> fase × complejidad</b> (Tipo A). Cada estado interno hereda su tiempo desde estos valores.
        </p>
      </div>

      {/* === Tipo B — Complejidad === */}
      <div className="sk sk--double" style={{padding:0, overflow:"hidden"}}>
        <div className="row" style={{padding:"10px 14px", background:"var(--blue)", color:"#fff", alignItems:"center", justifyContent:"space-between"}}>
          <span style={{fontFamily:"Caveat", fontSize:26, lineHeight:1}}>Tipo B — Requerimientos (B1 / B2)</span>
          <span className="row" style={{gap:6}}>
            <span className="pill xs" style={{background:"#fff", color:"var(--blue)", borderColor:"#fff"}}>edita: Analista</span>
            <span className="pill xs" style={{background:"#fff5e0", color:"var(--ink)"}}>aplica a B1 y B2</span>
          </span>
        </div>
        <table className="cfg">
          <thead><tr><th>Complejidad</th><th>Tiempo estimado</th><th>Unidad</th><th>Cuándo usarla</th><th></th></tr></thead>
          <tbody>
            {compsB.map((r,i)=>(
              <tr key={i}>
                <td><span className="sticker" style={{fontSize:18, background: ["#e9f5ed","#fff5e0","#fbe1d4","#f7d4cd"][i]}}>● {r[0]}</span></td>
                <td><input className="field num" defaultValue={r[1]}/></td>
                <td>
                  <span className="pill xs" style={{marginRight:4, background: r[2]==="horas" ? "#fff5e0":"#fff"}}>horas</span>
                  <span className="pill xs" style={{background: r[2]==="días" ? "#fff5e0":"#fff"}}>días</span>
                </td>
                <td className="small muted">{r[3]}</td>
                <td className="xs muted">↳ se reparte entre los estados del flujo B</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{padding:"10px 14px", background:"#f4f0e3", fontSize:13}}>
          <span className="anno">El Analista escoge la complejidad al tomar el requerimiento. El total se reparte automáticamente entre los estados del flujo B (En progreso → Hecho → Desplegado).</span>
        </div>
      </div>

      {/* === Tipo A — Fase × Complejidad === */}
      <div className="sk sk--double" style={{padding:0, overflow:"hidden"}}>
        <div className="row" style={{padding:"10px 14px", background:"var(--orange)", color:"#fff", alignItems:"center", justifyContent:"space-between"}}>
          <span style={{fontFamily:"Caveat", fontSize:26, lineHeight:1}}>Tipo A — Proyectos del mes</span>
          <span className="row" style={{gap:6}}>
            <span className="pill xs" style={{background:"#fff", color:"var(--orange)", borderColor:"#fff"}}>edita: PM (fases L, M, P, C)</span>
            <span className="pill xs" style={{background:"#e2ecfb", color:"var(--blue)", borderColor:"var(--blue)"}}>edita: Analista (fase Configuración)</span>
          </span>
        </div>
        <table className="cfg">
          <thead>
            <tr>
              <th>Fase</th>
              <th style={{textAlign:"center"}}>Baja</th>
              <th style={{textAlign:"center"}}>Media</th>
              <th style={{textAlign:"center"}}>Alta</th>
              <th style={{textAlign:"center"}}>Crítica</th>
              <th>Asigna complejidad</th>
            </tr>
          </thead>
          <tbody>
            {fasesA.map((r,i)=>{
              const esFase6 = r.f === "Configuración";
              return (
                <tr key={i} style={esFase6 ? {background:"#f1f6ff"} : null}>
                  <td>
                    <span className="sticker" style={{fontSize:18}}>{r.f}</span>
                    {esFase6 && <div className="xs muted" style={{marginTop:4}}>edita Analista</div>}
                  </td>
                  {["baja","media","alta","critica"].map(k => (
                    <td key={k} style={{textAlign:"center"}}>
                      <input className="field num" defaultValue={r[k]}/>
                    </td>
                  ))}
                  <td className="small muted">{r.who}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{padding:"10px 14px", background:"#fff5e0", fontSize:13}}>
          <span className="anno">El PM asigna complejidad <b>global</b> al crear el proyecto → se calcula el tiempo por fase con esta tabla. Cuando el proyecto entra a <b>Configuración</b>, el Analista redefine <b>su propia complejidad</b> y usa esta fila (valores <b>independientes</b> del mantenedor B — son tiempos distintos aunque ambos los edite el Analista).</span>
        </div>
      </div>

      {/* === Diagrama de cómo se "jalan" los tiempos === */}
      <div className="sk sk--paper" style={{padding:14}}>
        <h4>Cómo se calculan los tiempos en cada solicitud</h4>
        <div className="row" style={{gap:14, marginTop:8, alignItems:"stretch"}}>
          <div className="grow sk" style={{padding:10, minWidth:260, borderColor:"var(--blue)"}}>
            <span className="sticker tag-B">Tipo B</span>
            <ol className="small" style={{paddingLeft:18, marginTop:6}}>
              <li>Analista recibe req.</li>
              <li>Asigna complejidad ▸ tabla B</li>
              <li>Tiempo total = celda elegida</li>
              <li>Se reparte entre 5 sub-estados</li>
            </ol>
          </div>
          <div className="grow sk" style={{padding:10, minWidth:260, borderColor:"var(--orange)"}}>
            <span className="sticker tag-A">Tipo A</span>
            <ol className="small" style={{paddingLeft:18, marginTop:6}}>
              <li>PM crea proyecto + complejidad global</li>
              <li>Cada fase ▸ tabla A (fase × complej.)</li>
              <li>Fase Configuración: Analista redefine complej.</li>
              <li>Usa fila Configuración de tabla A (valores propios)</li>
              <li>Pruebas puede regresar a Configuración</li>
            </ol>
          </div>
          <div className="grow sk sk--dash" style={{padding:10, minWidth:260}}>
            <span className="sticker">Semáforo de SLA</span>
            <div className="stack small" style={{marginTop:6}}>
              <div><span className="pill xs" style={{background:"#cfe8d8", borderColor:"var(--green)"}}>verde</span> &lt; 75% del tiempo</div>
              <div><span className="pill xs" style={{background:"#f8e0c5", borderColor:"var(--amber)"}}>ámbar</span> 75 – 100 %</div>
              <div><span className="pill xs" style={{background:"#f7d4cd", borderColor:"var(--red)"}}>rojo</span> &gt; 100% (vencido)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ====== Roles ======
function Roles() {
  const roles = [
    {ini:"PM", color:"var(--orange-soft)", name:"Project Manager", scope:"Tipo A · fases Levantamiento, Maqueta, Capacitación", can:["crear/cerrar Proyectos","aprobar pasos macro","reasignar","reportes mes"]},
    {ini:"AS", color:"var(--blue-soft)", name:"Analista Senior TI", scope:"Tipo A · Configuración y Pruebas (Fases 6 y 7) · Tipo B completo (B1/B2)", can:["resolver incidencias","ejecutar configuraciones","marcar Hecho/Desplegado","adjuntar evidencias"]},
    {ini:"SL", color:"#ece8df", name:"Solicitante (Área)", scope:"Cualquier proceso que él/ella crea", can:["crear solicitudes","aprobar maqueta","validar en pruebas","aceptar Operativo / regresar a Observado"]},
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
    <div className="col" style={{gap:18}}>
      <div className="row" style={{gap:18}}>
        {roles.map((r,i)=>(
          <div key={i} className="sk sk--double role-card grow" style={{minWidth: 280}}>
            <div className="row" style={{alignItems:"center", gap:10}}>
              <span className="avb" style={{background:r.color}}>{r.ini}</span>
              <div>
                <h4>{r.name}</h4>
                <span className="mono xs muted">{r.scope}</span>
              </div>
            </div>
            <div className="hr" />
            <span className="anno">Puede:</span>
            <ul className="small" style={{paddingLeft: 18, margin: "4px 0 0"}}>
              {r.can.map((c,j)=><li key={j}>{c}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="sk" style={{padding:0, overflow:"hidden"}}>
        <div style={{padding:"10px 14px", background:"var(--ink)", color:"var(--paper)", fontFamily:"Caveat", fontSize:24}}>
          Matriz de permisos (RACI simplificada)
        </div>
        <table className="cfg">
          <thead><tr><th>Acción</th><th>PM</th><th>Analista</th><th>Solicitante</th></tr></thead>
          <tbody>
            {matrix.map((m,i)=>(
              <tr key={i}>
                <td>{m[0]}</td>
                {[1,2,3].map(k=>(
                  <td key={k}>
                    {m[k]==="✓" && <span className="pill xs" style={{background:"#cfe8d8", borderColor:"var(--green)"}}>✓ puede</span>}
                    {m[k]==="leer" && <span className="pill xs">solo lectura</span>}
                    {m[k]==="—" && <span className="muted xs">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { Kanban, Modales, Detalle, ConfigTiempos, Roles });
