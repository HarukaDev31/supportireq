/* global React */
// Diagrama de flujo global — Hoja 1
// Mapea: creación · transiciones de estado · chat · evidencias · comentarios
// Estructura: (1) Swimlane por rol × ciclo de vida + chat omnipresente
//             (2) State machine con transiciones por rol
//             (3) Macro Tipo A
//             (4) Notas

function FlowDiagram() {
  return (
    <div className="col" style={{gap: 18}}>
      <div className="row" style={{justifyContent:"space-between", alignItems:"baseline"}}>
        <h2 style={{transform:"rotate(-.4deg)"}}>Hoja 1 — Diagrama de flujo del módulo</h2>
        <div className="legend">
          <span><i className="swatch sw-A" /> Tipo A · Proyecto</span>
          <span><i className="swatch sw-B" /> Tipo B · Requerimiento</span>
          <span><i className="swatch sw-chat" /> Chat / evidencias</span>
          <span><i className="swatch sw-end" /> Estado terminal</span>
        </div>
      </div>

      <Swimlane />
      <StateMachines />
      <MacroTipoA />

      {/* Notas */}
      <div className="row" style={{gap: 18}}>
        <div className="grow" style={{minWidth: 260}}>
          <span className="sticker" style={{background:"#fff5e0"}}>Nota</span>
          <p className="small" style={{marginTop:8}}>
            <b>Observado</b> NO regresa al estado <i>Pendiente</i> sino directamente a la fase de trabajo activa
            (En progreso para B, sub-flujo Configuración para A) — flecha roja punteada.
          </p>
        </div>
        <div className="grow" style={{minWidth: 260}}>
          <span className="sticker" style={{background:"#e2ecfb"}}>Nota</span>
          <p className="small" style={{marginTop:8}}>
            Dentro de la fase <b>Configuración</b> de un proyecto corre el mismo flujo de estados de un requerimiento B,
            pero los tiempos del mantenedor son <b>independientes</b> (los edita el Analista, valores distintos).
          </p>
        </div>
        <div className="grow" style={{minWidth: 260}}>
          <span className="sticker" style={{background:"#cfe8d8"}}>Nota</span>
          <p className="small" style={{marginTop:8}}>
            El <b>chat</b> es transversal: existe desde la creación hasta el cierre. Cualquier rol puede comentar
            y adjuntar evidencias (imágenes, docs) en cualquier estado.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============ 1 · Swimlane ============ */
function Swimlane() {
  // Datos: para cada [rol][etapa] una lista de acciones tipadas
  // tipos: create | state | chat | evidence | comment | system | decision
  const lanes = [
    {
      key:"sol", label:"Solicitante", color:"#ece8df", note:"crea y valida",
      cells: [
        [ // 1 creación
          {t:"create", l:"Crea Ficha A o B"},
          {t:"create", l:"Adjunta pantallazos"},
        ],
        [ // 2 asignación
          {t:"system", l:"Recibe confirmación + nº ticket"},
        ],
        [ // 3 trabajo
          {t:"comment",  l:"Comenta en chat"},
          {t:"evidence", l:"Adjunta evidencia"},
          {t:"state",    l:"Aprueba maqueta", only:"A"},
        ],
        [ // 4 validación
          {t:"decision", l:"Revisa Desplegado"},
          {t:"state",    l:"→ Operativo (acepta)"},
          {t:"state",    l:"→ Observado (rechaza)"},
        ],
        [ // 5 cierre
          {t:"state", l:"Confirma cierre"},
          {t:"chat",  l:"Última evidencia"},
        ],
      ]
    },
    {
      key:"sys", label:"Sistema", color:"#fff", note:"automático",
      cells: [
        [
          {t:"system", l:"Crea chat automático"},
          {t:"system", l:"Genera código (PRJ/REQ)"},
        ],
        [
          {t:"system", l:"Asigna PM (A) / Analista (B)"},
          {t:"system", l:"Notifica responsables"},
        ],
        [
          {t:"system", l:"Calcula SLA + semáforo"},
          {t:"system", l:"Loguea cambios en historial"},
          {t:"system", l:"Notifica cada transición"},
        ],
        [
          {t:"system", l:"Bloquea avance si falta evidencia"},
        ],
        [
          {t:"system", l:"Archiva expediente"},
        ],
      ]
    },
    {
      key:"pm", label:"PM", color:"#fff1de", note:"solo Tipo A",
      cells: [
        [
          {t:"system",  l:"Recibe proyecto Pendiente", only:"A"},
        ],
        [
          {t:"state",   l:"Asigna complejidad global", only:"A"},
          {t:"state",   l:"Inicia Levantamiento", only:"A"},
          {t:"comment", l:"Comenta requisitos"},
        ],
        [
          {t:"state",   l:"Avanza fases (L→M→Conf→P→Cap)"},
          {t:"state",   l:"Delega Configuración al Analista"},
          {t:"evidence",l:"Sube maqueta"},
        ],
        [
          {t:"state",   l:"Valida con Solicitante"},
          {t:"decision",l:"Si Observado → vuelve a fase"},
        ],
        [
          {t:"state",   l:"Marca Completado"},
        ],
      ]
    },
    {
      key:"an", label:"Analista", color:"#e2ecfb", note:"Tipo B + fase Config. (A)",
      cells: [
        [
          {t:"system",  l:"Recibe req. Tipo B"},
          {t:"system",  l:"O fase Configuración (A)"},
        ],
        [
          {t:"state",   l:"Asigna complejidad propia"},
          {t:"state",   l:"Pendiente → En progreso"},
        ],
        [
          {t:"state",   l:"En progreso → Hecho"},
          {t:"state",   l:"Hecho → Desplegado"},
          {t:"evidence",l:"Sube evidencia técnica"},
          {t:"comment", l:"Comenta diagnóstico"},
          {t:"state",   l:"Observado → En progreso (re-trabajo)"},
        ],
        [
          {t:"state",   l:"Espera validación del área"},
        ],
        [
          {t:"state",   l:"Cierra ticket → Operativo"},
        ],
      ]
    },
  ];

  const stages = [
    {key:"crea", n:"1", l:"Creación",     desc:"Solicitante registra la ficha"},
    {key:"asig", n:"2", l:"Asignación",   desc:"Sistema rutea + responsable confirma"},
    {key:"trab", n:"3", l:"Trabajo",      desc:"Cambios de estado, chat y evidencias"},
    {key:"vali", n:"4", l:"Validación",   desc:"Solicitante decide Operativo / Observado"},
    {key:"cier", n:"5", l:"Cierre",       desc:"Operativo · histórico archivado"},
  ];

  return (
    <div className="sk sk--double" style={{padding: 16, overflow:"hidden"}}>
      <div className="row" style={{justifyContent:"space-between", alignItems:"baseline", marginBottom: 10}}>
        <h3>1 · Acciones por rol a lo largo del ciclo de vida</h3>
        <span className="row" style={{gap:8, flexWrap:"wrap"}}>
          <ChipKey t="state" l="cambio de estado" />
          <ChipKey t="create" l="crear" />
          <ChipKey t="comment" l="comentario" />
          <ChipKey t="evidence" l="evidencia" />
          <ChipKey t="decision" l="decisión" />
          <ChipKey t="system" l="sistema" />
        </span>
      </div>

      <div className="swim">
        {/* header */}
        <div className="swim-corner"></div>
        {stages.map(s => (
          <div key={s.key} className="swim-head">
            <span className="mono xs muted">etapa {s.n}</span>
            <div className="swim-head-name">{s.l}</div>
            <div className="xs muted">{s.desc}</div>
          </div>
        ))}

        {/* lanes */}
        {lanes.map(lane => (
          <React.Fragment key={lane.key}>
            <div className="swim-lane-label" style={{background: lane.color}}>
              <div className="swim-lane-name">{lane.label}</div>
              <div className="xs muted">{lane.note}</div>
            </div>
            {lane.cells.map((acts, ci) => (
              <div key={ci} className="swim-cell">
                {acts.map((a,i) => <ActionChip key={i} a={a} />)}
              </div>
            ))}
          </React.Fragment>
        ))}

        {/* chat band */}
        <div className="swim-lane-label" style={{background:"repeating-linear-gradient(135deg, #fff 0 6px, #f4efe1 6px 12px)"}}>
          <div className="swim-lane-name">Chat</div>
          <div className="xs muted">siempre activo</div>
        </div>
        <div className="swim-chat" style={{gridColumn: "span 5"}}>
          <span className="anno" style={{margin:"0 8px"}}>creado al registrar la ficha</span>
          <span className="chat-step">💬 mensaje</span>
          <span className="chat-step">📎 adjunto</span>
          <span className="chat-step">📷 captura</span>
          <span className="chat-step">💬 mensaje</span>
          <span className="chat-step">📎 adjunto</span>
          <span className="chat-step">💬 mensaje</span>
          <span className="chat-step">📎 firma</span>
          <span className="anno" style={{marginLeft: "auto"}}>se archiva al cerrar</span>
        </div>
      </div>

      {/* Style local al componente */}
      <style>{`
        .swim {
          display: grid;
          grid-template-columns: 150px repeat(5, 1fr);
          gap: 0;
          border: 2px solid var(--line);
          border-radius: 12px 10px 14px 12px / 10px 14px 12px 14px;
          overflow: hidden;
          background: #fffdf7;
        }
        .swim-corner { background: #f4efe1; border-right: 2px solid var(--line); border-bottom: 2px solid var(--line); }
        .swim-head {
          padding: 10px 12px;
          background: #f4efe1;
          border-right: 1.5px dashed var(--line-soft);
          border-bottom: 2px solid var(--line);
        }
        .swim-head:last-child { border-right: 0; }
        .swim-head-name { font-family: "Caveat"; font-size: 24px; line-height: 1.05; margin: 2px 0; }
        .swim-lane-label {
          padding: 10px 12px;
          border-right: 2px solid var(--line);
          border-bottom: 1.5px dashed var(--line-soft);
        }
        .swim-lane-name { font-family: "Caveat"; font-size: 22px; line-height: 1; }
        .swim-cell {
          padding: 10px;
          border-right: 1.5px dashed var(--line-soft);
          border-bottom: 1.5px dashed var(--line-soft);
          min-height: 110px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-content: flex-start;
        }
        .swim-cell:nth-of-type(6n) { border-right: 0; } /* last in row, since 6 cells per row incl. label */
        .swim-chat {
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          background: repeating-linear-gradient(135deg, #fff 0 6px, #f8f3df 6px 12px);
          border-bottom: 0;
        }
        .chat-step {
          font-family: "Kalam"; font-size: 12px;
          padding: 3px 9px; background: #fff;
          border: 2px solid var(--line);
          border-radius: 12px 8px 14px 10px/8px 14px 10px 14px;
        }
        .act {
          font-family: "Kalam"; font-size: 12px; line-height: 1.15;
          padding: 4px 8px 5px;
          border: 2px solid var(--line);
          border-radius: 8px 10px 8px 12px/10px 8px 12px 8px;
          background: #fff;
          display: inline-flex; gap: 4px; align-items: center;
        }
        .act .ico { font-family: "JetBrains Mono"; font-size: 10px; }
        .act.state    { background: #e2ecfb; }
        .act.create   { background: #fff1de; }
        .act.comment  { background: #fff; }
        .act.evidence { background: #fff5e0; }
        .act.decision { background: #f7d4cd; }
        .act.system   { background: repeating-linear-gradient(135deg, #fff 0 4px, #f4f0e3 4px 8px); }
        .act .only {
          font-family: "JetBrains Mono"; font-size: 9px; padding: 1px 4px;
          border: 1.5px solid; border-radius: 4px; margin-left: 2px;
        }
        .act .only.A { color: var(--orange); border-color: var(--orange); background: #fff7f1; }
        .act .only.B { color: var(--blue); border-color: var(--blue); background: #f1f6ff; }
        .chip-key { font-family: "Kalam"; font-size: 11px; display: inline-flex; gap: 4px; align-items: center; }
        .chip-key .sw {
          display: inline-block; width: 12px; height: 12px;
          border: 1.5px solid var(--line); border-radius: 3px;
        }
      `}</style>
    </div>
  );
}

function ChipKey({t, l}) {
  const bg = ({state:"#e2ecfb", create:"#fff1de", comment:"#fff", evidence:"#fff5e0", decision:"#f7d4cd", system:"#f4f0e3"})[t];
  return <span className="chip-key"><i className="sw" style={{background:bg}}/> {l}</span>;
}

function ActionChip({a}) {
  const icon = ({
    state:"→", create:"+", comment:"💬", evidence:"📎",
    decision:"⟂", system:"⚙"
  })[a.t] || "•";
  return (
    <span className={`act ${a.t}`}>
      <span className="ico">{icon}</span>
      <span>{a.l}</span>
      {a.only && <span className={`only ${a.only}`}>{a.only}</span>}
    </span>
  );
}

/* ============ 2 · State machines ============ */
function StateMachines() {
  // Cada estado es un nodo; las transiciones se anotan con quién las dispara.
  return (
    <div className="sk sk--double" style={{padding: 16}}>
      <h3 style={{marginBottom:10}}>2 · Máquina de estados — transiciones (quién dispara qué)</h3>

      <svg viewBox="0 0 1200 420" width="100%" style={{display:"block"}}>
        <defs>
          <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1d1c1a" />
          </marker>
          <marker id="arR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b73a2b" />
          </marker>
        </defs>

        {/* Tipo A */}
        <text x="20" y="30" fontFamily="Caveat" fontSize="26" fontWeight="700" fill="#e15a1a">A · Estados Proyecto</text>
        <line x1="20" y1="40" x2="1180" y2="40" stroke="#e15a1a" strokeDasharray="4 4" strokeWidth="2"/>

        {/* Nodos A */}
        {[
          {l:"Pendiente",   x:30,   c:"#e9e6dd"},
          {l:"En maqueta",  x:215,  c:"#d9efe1"},
          {l:"En progreso", x:400,  c:"#d6e4f9"},
          {l:"Desplegado",  x:585,  c:"#f8e0c5"},
          {l:"Observado",   x:770,  c:"#f7d4cd"},
          {l:"Operativo",   x:955,  c:"#cfe8d8"},
        ].map((s,i)=>(
          <g key={i}>
            <rect x={s.x} y={60} width={155} height={56} rx="10" ry="12" fill={s.c} stroke="#1d1c1a" strokeWidth="2.5"/>
            <text x={s.x+77} y={87} textAnchor="middle" fontFamily="Caveat" fontSize="22">{s.l}</text>
            <text x={s.x+77} y={104} textAnchor="middle" fontFamily="Kalam" fontSize="10" fill="#4a4845">
              {["registrada","diseñando","TI configurando","subido","correcciones","cerrado"][i]}
            </text>
          </g>
        ))}
        {/* Transiciones A — etiquetas cortas arriba de la flecha */}
        {[
          {from:[185,88], to:[215,88],   l:"PM"},
          {from:[370,88], to:[400,88],   l:"PM"},
          {from:[555,88], to:[585,88],   l:"Analista"},
          {from:[740,88], to:[770,88],   l:"Solic. ✗", color:"#b73a2b", marker:"arR"},
          {from:[740,88], to:[955,88],   l:"Solic. ✓", curve:-40},
        ].map((a,i)=>(
          <g key={i}>
            <path
              d={a.curve
                ? `M ${a.from[0]} ${a.from[1]} Q ${(a.from[0]+a.to[0])/2} ${a.from[1]+a.curve} ${a.to[0]} ${a.to[1]}`
                : `M ${a.from[0]} ${a.from[1]} L ${a.to[0]} ${a.to[1]}`}
              fill="none" stroke={a.color || "#1d1c1a"} strokeWidth="2"
              markerEnd={`url(#${a.marker || "ar"})`}/>
            <text x={(a.from[0]+a.to[0])/2} y={a.curve ? a.from[1] + a.curve - 6 : 54}
                  textAnchor="middle" fontFamily="Kalam" fontSize="10" fontWeight="700" fill={a.color || "#4a4845"}>{a.l}</text>
          </g>
        ))}
        {/* Loop Observado -> En progreso */}
        <path d="M 847 60 C 847 20 480 20 480 60" fill="none" stroke="#b73a2b" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arR)"/>
        <text x="660" y="20" textAnchor="middle" fontFamily="Caveat" fontSize="16" fill="#b73a2b">Analista re-trabaja</text>

        {/* Acciones paralelas A */}
        <g transform="translate(20, 130)">
          <text x="0" y="0" fontFamily="Kalam" fontSize="11" fill="#4a4845">
            En cualquier estado · 3 roles pueden: 💬 comentar · 📎 adjuntar evidencia · ver historial
          </text>
        </g>

        {/* Tipo B */}
        <text x="20" y="200" fontFamily="Caveat" fontSize="26" fontWeight="700" fill="#1f5fb8">B · Estados Requerimiento (B1 / B2)</text>
        <line x1="20" y1="210" x2="1180" y2="210" stroke="#1f5fb8" strokeDasharray="4 4" strokeWidth="2"/>

        {[
          {l:"Pendiente",   x:30,   c:"#e9e6dd"},
          {l:"En progreso", x:215,  c:"#d6e4f9"},
          {l:"Hecho",       x:400,  c:"#d9efe1"},
          {l:"Desplegado",  x:585,  c:"#f8e0c5"},
          {l:"Observado",   x:770,  c:"#f7d4cd"},
          {l:"Operativo",   x:955,  c:"#cfe8d8"},
        ].map((s,i)=>(
          <g key={i}>
            <rect x={s.x} y={230} width={155} height={56} rx="10" ry="12" fill={s.c} stroke="#1d1c1a" strokeWidth="2.5"/>
            <text x={s.x+77} y={257} textAnchor="middle" fontFamily="Caveat" fontSize="22">{s.l}</text>
            <text x={s.x+77} y={274} textAnchor="middle" fontFamily="Kalam" fontSize="10" fill="#4a4845">
              {["registrado","TI trabajando","sin valid.","subido","no resuelto","cerrado"][i]}
            </text>
          </g>
        ))}
        {[
          {from:[185,258], to:[215,258],   l:"Analista"},
          {from:[370,258], to:[400,258],   l:"Analista"},
          {from:[555,258], to:[585,258],   l:"Analista"},
          {from:[740,258], to:[770,258],   l:"Solic. ✗", color:"#b73a2b", marker:"arR"},
          {from:[740,258], to:[955,258],   l:"Solic. ✓", curve:-40},
        ].map((a,i)=>(
          <g key={i}>
            <path
              d={a.curve
                ? `M ${a.from[0]} ${a.from[1]} Q ${(a.from[0]+a.to[0])/2} ${a.from[1]+a.curve} ${a.to[0]} ${a.to[1]}`
                : `M ${a.from[0]} ${a.from[1]} L ${a.to[0]} ${a.to[1]}`}
              fill="none" stroke={a.color || "#1d1c1a"} strokeWidth="2"
              markerEnd={`url(#${a.marker || "ar"})`}/>
            <text x={(a.from[0]+a.to[0])/2} y={a.curve ? a.from[1] + a.curve - 6 : 224}
                  textAnchor="middle" fontFamily="Kalam" fontSize="10" fontWeight="700" fill={a.color || "#4a4845"}>{a.l}</text>
          </g>
        ))}
        <path d="M 847 230 C 847 190 480 190 480 230" fill="none" stroke="#b73a2b" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arR)"/>
        <text x="660" y="190" textAnchor="middle" fontFamily="Caveat" fontSize="16" fill="#b73a2b">Analista re-trabaja</text>

        {/* Acciones paralelas (chat) — banda inferior */}
        <g transform="translate(20, 320)">
          <rect x="0" y="0" width="1160" height="70" rx="12" ry="14"
                fill="#fffdf7" stroke="#1d1c1a" strokeWidth="2" strokeDasharray="6 5"/>
          <text x="20" y="26" fontFamily="Caveat" fontSize="20">Chat omnipresente · paralelo a cualquier estado</text>
          {[
            {l:"💬 Solicitante comenta", x:280},
            {l:"📷 Solicitante adjunta", x:445},
            {l:"💬 Analista responde", x:610},
            {l:"📎 Analista sube evid.", x:760},
            {l:"💬 PM coordina", x:920},
            {l:"🔔 Sistema notifica", x:1040},
          ].map((c,i)=>(
            <g key={i} transform={`translate(${c.x}, 38)`}>
              <rect x="-2" y="0" width={c.l.length*7.2} height="22" rx="6" ry="8" fill="#fff" stroke="#1d1c1a" strokeWidth="1.5"/>
              <text x={c.l.length*3.4} y="16" textAnchor="middle" fontFamily="Kalam" fontSize="11">{c.l}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

/* ============ 3 · Macro Tipo A ============ */
function MacroTipoA() {
  return (
    <div className="sk sk--double" style={{padding: 16}}>
      <h3 style={{marginBottom: 4}}>3 · Macro Tipo A — fases del proyecto</h3>
      <p className="small muted" style={{marginTop:0, marginBottom:10}}>
        El PM asigna complejidad global al crear el proyecto. En la fase Configuración, el Analista re-asigna su propia complejidad
        y corre los mismos estados que un requerimiento B. Si en Pruebas falta cuadrar, vuelve a Configuración.
      </p>

      <svg viewBox="0 0 1200 200" width="100%" style={{display:"block"}}>
        <defs>
          <marker id="arM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1d1c1a" />
          </marker>
          <marker id="arMR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b73a2b" />
          </marker>
        </defs>

        {[
          {l:"Levantamiento", c:"#fff1de", who:"PM"},
          {l:"Maqueta",       c:"#e6f3eb", who:"PM"},
          {l:"Configuración", c:"#e2ecfb", who:"Analista (sub-flujo B)"},
          {l:"Pruebas",       c:"#fbe3f0", who:"PM + Solic."},
          {l:"Capacitación",  c:"#ebe0f6", who:"PM"},
          {l:"Completado",    c:"#cfe8d8", who:"cierre"},
        ].map((s,i)=>(
          <g key={i}>
            <rect x={20 + i*195} y={50} width={175} height={62} rx="10" ry="12" fill={s.c} stroke="#1d1c1a" strokeWidth="2.5"/>
            <text x={20 + i*195 + 88} y={82} textAnchor="middle" fontFamily="Caveat" fontSize="24">{s.l}</text>
            <text x={20 + i*195 + 88} y={101} textAnchor="middle" fontFamily="Kalam" fontSize="11" fill="#4a4845">{s.who}</text>
            {i<5 && <path d={`M ${20+i*195+175} 81 L ${20+(i+1)*195} 81`} stroke="#1d1c1a" strokeWidth="2" markerEnd="url(#arM)"/>}
          </g>
        ))}
        {/* Loop Pruebas -> Configuración */}
        <path d="M 700 50 C 700 20 530 20 530 50" fill="none" stroke="#b73a2b" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arMR)"/>
        <text x="615" y="20" textAnchor="middle" fontFamily="Caveat" fontSize="16" fill="#b73a2b">si falta cuadrar → vuelve a Configuración</text>

        {/* Sub-flujo dentro de fase 6 (mismos estados de B) */}
        <g transform="translate(20, 130)">
          <text x="0" y="0" fontFamily="Kalam" fontSize="11" fill="#1f5fb8">
            ↑ dentro de Configuración corre el flujo del Analista (mismos estados de B, tiempos independientes):
          </text>
          {[
            {l:"Pendiente",   x:0,   c:"#e9e6dd"},
            {l:"En progreso", x:190, c:"#e2ecfb"},
            {l:"Hecho",       x:380, c:"#d9efe1"},
            {l:"Desplegado",  x:570, c:"#f8e0c5"},
            {l:"Operativo",   x:760, c:"#cfe8d8"},
          ].map((s,i)=>(
            <g key={i}>
              <rect x={s.x} y={12} width={170} height={40} rx="10" ry="12" fill={s.c} stroke="#1f5fb8" strokeWidth="2"/>
              <text x={s.x+85} y={38} textAnchor="middle" fontFamily="Caveat" fontSize="20">{s.l}</text>
              {i<4 && <path d={`M ${s.x+170} 32 L ${s.x+190} 32`} stroke="#1f5fb8" strokeWidth="2" markerEnd="url(#arM)"/>}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

window.FlowDiagram = FlowDiagram;
