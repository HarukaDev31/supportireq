/* global React */
// shadcn-style primitives. Class strings mirror the real shadcn/ui components.

const cn = (...xs) => xs.filter(Boolean).join(" ");

// =========================================================================
// Button
// =========================================================================
const BUTTON_VARIANTS = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  link: "text-primary underline-offset-4 hover:underline",
  success: "bg-emerald-600 text-white hover:bg-emerald-700",
};
const BUTTON_SIZES = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-6 text-sm",
  icon: "h-9 w-9",
  xs: "h-7 rounded-md px-2 text-xs",
};
function Button({ variant = "default", size = "default", className = "", children, ...rest }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-ring disabled:pointer-events-none disabled:opacity-50",
        BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className
      )}
      {...rest}
    >{children}</button>
  );
}

// =========================================================================
// Card
// =========================================================================
const Card = ({ className = "", children, ...rest }) => (
  <div className={cn("rounded-xl border bg-card text-card-foreground shadow-card", className)} {...rest}>{children}</div>
);
const CardHeader = ({ className = "", children, ...rest }) => (
  <div className={cn("flex flex-col space-y-1 p-5", className)} {...rest}>{children}</div>
);
const CardTitle = ({ className = "", children, ...rest }) => (
  <h3 className={cn("text-base font-semibold leading-tight tracking-tight", className)} {...rest}>{children}</h3>
);
const CardDescription = ({ className = "", children, ...rest }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...rest}>{children}</p>
);
const CardContent = ({ className = "", children, ...rest }) => (
  <div className={cn("p-5 pt-0", className)} {...rest}>{children}</div>
);
const CardFooter = ({ className = "", children, ...rest }) => (
  <div className={cn("flex items-center p-5 pt-0", className)} {...rest}>{children}</div>
);

// =========================================================================
// Badge
// =========================================================================
const BADGE_VARIANTS = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent",
  secondary: "bg-secondary text-secondary-foreground border-transparent",
  outline: "text-foreground border-border",
  destructive: "bg-destructive text-destructive-foreground border-transparent",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  danger: "bg-rose-50 text-rose-700 border-rose-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  tipoA: "bg-orange-50 text-orange-700 border-orange-200",
  tipoB: "bg-blue-50 text-blue-700 border-blue-200",
  tipoB1: "bg-orange-50 text-orange-700 border-orange-200",
  tipoB2: "bg-sky-50 text-sky-700 border-sky-200",
  muted: "bg-muted text-muted-foreground border-transparent",
};
function Badge({ variant = "default", className = "", children, ...rest }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
      BADGE_VARIANTS[variant], className
    )} {...rest}>{children}</span>
  );
}

// =========================================================================
// Inputs
// =========================================================================
const Input = React.forwardRef(({ className = "", type = "text", ...rest }, ref) => (
  <input
    ref={ref} type={type}
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
      "placeholder:text-muted-foreground focus-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...rest}
  />
));
const Textarea = React.forwardRef(({ className = "", ...rest }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm",
      "placeholder:text-muted-foreground focus-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...rest}
  />
));
const Label = ({ className = "", children, ...rest }) => (
  <label className={cn("text-sm font-medium leading-none text-foreground", className)} {...rest}>{children}</label>
);

// =========================================================================
// Separator
// =========================================================================
const Separator = ({ orientation = "horizontal", className = "" }) => (
  <div className={cn(
    "shrink-0 bg-border",
    orientation === "vertical" ? "h-full w-px" : "h-px w-full",
    className
  )} />
);

// =========================================================================
// Avatar
// =========================================================================
function Avatar({ initials, src, size = 32, className = "", tone = "default" }) {
  const tones = {
    default: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    PM: "bg-orange-100 text-orange-800 ring-orange-200",
    AN: "bg-blue-100 text-blue-800 ring-blue-200",
    SO: "bg-zinc-100 text-zinc-700 ring-zinc-300",
  };
  return (
    <div
      className={cn("inline-flex items-center justify-center rounded-full ring-1 font-medium select-none", tones[tone], className)}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.4) }}
    >
      {src ? <img src={src} className="rounded-full w-full h-full object-cover" alt=""/> : initials}
    </div>
  );
}
function AvatarStack({ items = [], size = 24, max = 4 }) {
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  return (
    <div className="flex -space-x-1.5">
      {shown.map((p, i) => (
        <Avatar key={i} initials={p.initials} tone={p.tone} size={size} className="ring-2 ring-background"/>
      ))}
      {extra > 0 && (
        <div className="inline-flex items-center justify-center rounded-full ring-2 ring-background bg-muted text-muted-foreground font-medium"
             style={{ width: size, height: size, fontSize: Math.max(10, size*0.4) }}>+{extra}</div>
      )}
    </div>
  );
}

// =========================================================================
// Progress
// =========================================================================
function Progress({ value = 0, tone = "default", className = "" }) {
  const tones = {
    default: "bg-primary",
    success: "bg-emerald-600",
    warning: "bg-amber-500",
    danger: "bg-rose-600",
    info: "bg-blue-600",
  };
  return (
    <div className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div className={cn("h-full transition-all", tones[tone])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

// =========================================================================
// Tabs (controlled-friendly)
// =========================================================================
function Tabs({ value, onValueChange, children, className = "" }) {
  const ctx = React.useMemo(() => ({ value, onValueChange }), [value, onValueChange]);
  return <TabsCtx.Provider value={ctx}><div className={className}>{children}</div></TabsCtx.Provider>;
}
const TabsCtx = React.createContext({ value: null, onValueChange: () => {} });
const TabsList = ({ className = "", children }) => (
  <div className={cn(
    "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
    className
  )}>{children}</div>
);
function TabsTrigger({ value, className = "", children }) {
  const { value: cur, onValueChange } = React.useContext(TabsCtx);
  const active = cur === value;
  return (
    <button
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-ring",
        active ? "bg-background text-foreground shadow-soft" : "hover:text-foreground/80",
        className
      )}
    >{children}</button>
  );
}
const TabsContent = ({ value, className = "", children }) => {
  const { value: cur } = React.useContext(TabsCtx);
  if (cur !== value) return null;
  return <div className={cn("mt-3", className)}>{children}</div>;
};

// =========================================================================
// Dialog (controlled, no portal — fixed overlay)
// =========================================================================
function Dialog({ open, onOpenChange, children }) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 animate-in fade-in-0" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 w-full max-w-lg">{children}</div>
    </div>
  );
}
const DialogContent = ({ className = "", children }) => (
  <div className={cn(
    "rounded-xl border bg-background shadow-pop overflow-hidden",
    className
  )}>{children}</div>
);
const DialogHeader = ({ className = "", children }) => (
  <div className={cn("flex flex-col space-y-1.5 px-6 pt-6 pb-2", className)}>{children}</div>
);
const DialogTitle = ({ className = "", children }) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</h2>
);
const DialogDescription = ({ className = "", children }) => (
  <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
);
const DialogBody = ({ className = "", children }) => (
  <div className={cn("px-6 py-4 space-y-4", className)}>{children}</div>
);
const DialogFooter = ({ className = "", children }) => (
  <div className={cn(
    "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2 gap-2 px-6 py-4 border-t bg-muted/30",
    className
  )}>{children}</div>
);

// =========================================================================
// Table
// =========================================================================
const Table = ({ className = "", children }) => (
  <div className="w-full overflow-auto scrollarea">
    <table className={cn("w-full caption-bottom text-sm", className)}>{children}</table>
  </div>
);
const TableHeader = ({ className = "", children }) => (
  <thead className={cn("[&_tr]:border-b bg-muted/40", className)}>{children}</thead>
);
const TableBody = ({ className = "", children }) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)}>{children}</tbody>
);
const TableRow = ({ className = "", children, ...rest }) => (
  <tr className={cn("border-b transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted", className)} {...rest}>{children}</tr>
);
const TableHead = ({ className = "", children, ...rest }) => (
  <th className={cn("h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wide", className)} {...rest}>{children}</th>
);
const TableCell = ({ className = "", children, ...rest }) => (
  <td className={cn("p-4 align-middle text-sm", className)} {...rest}>{children}</td>
);

// =========================================================================
// Select (simple, plain HTML select with shadcn skin)
// =========================================================================
function Select({ value, onChange, options = [], className = "", placeholder, size = "default" }) {
  const sizes = { default: "h-9", sm: "h-8 text-xs" };
  return (
    <div className={cn("relative inline-flex", className)}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "appearance-none w-full rounded-md border border-input bg-background px-3 pr-8 text-sm shadow-sm focus-ring",
          sizes[size]
        )}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Icon name="chevDown" size={14} />
      </span>
    </div>
  );
}

// =========================================================================
// Switch
// =========================================================================
function Switch({ checked, onCheckedChange, className = "" }) {
  return (
    <button
      role="switch" aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-ring",
        checked ? "bg-primary" : "bg-input",
        className
      )}
    >
      <span className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-soft ring-0 transition-transform",
        checked ? "translate-x-4" : "translate-x-0"
      )}/>
    </button>
  );
}

// =========================================================================
// Tooltip — simple title-style on hover via group/peer (no portal)
// =========================================================================
function Tooltip({ label, children, side = "top", className = "" }) {
  return (
    <span className={cn("relative inline-flex group", className)}>
      {children}
      <span className={cn(
        "pointer-events-none absolute z-30 px-2 py-1 rounded-md bg-foreground text-background text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity",
        side === "top" && "bottom-full mb-1 left-1/2 -translate-x-1/2",
        side === "bottom" && "top-full mt-1 left-1/2 -translate-x-1/2",
      )}>{label}</span>
    </span>
  );
}

// =========================================================================
// Empty/State helpers
// =========================================================================
const KBD = ({ children }) => (
  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">{children}</kbd>
);

Object.assign(window, {
  cn,
  Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge, Input, Textarea, Label, Separator,
  Avatar, AvatarStack, Progress,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Select, Switch, Tooltip, KBD,
});
