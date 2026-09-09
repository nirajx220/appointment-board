function NavItem({ label, count, active, onClick, dot, theme }) {
  return (
    <button
      onClick={onClick}
      className="nav-item w-full flex items-center justify-between px-2 py-1.5 text-sm"
      style={{
        borderRadius: "6px",
        background: active ? theme.accentSoft : "transparent",
        color: active ? theme.accent : theme.ink,
        fontWeight: active ? 600 : 400,
      }}
    >
      <span className="flex items-center gap-2">
        {dot && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: dot }} />}
        {label}
      </span>
      <span className="text-xs" style={{ color: active ? theme.accent : theme.inkFaint }}>
        {count}
      </span>
    </button>
  );
}

export default function StatusNav({ counts, filterStatus, setFilterStatus, theme, statusColor }) {
  const toggle = (status) => setFilterStatus((s) => (s === status ? "all" : status));

  return (
    <nav className="px-3 pt-5 space-y-0.5">
      <NavItem label="All appointments" count={counts.all} active={filterStatus === "all"} onClick={() => setFilterStatus("all")} theme={theme} />
      <NavItem label="Scheduled" count={counts.scheduled} dot={statusColor.scheduled} active={filterStatus === "scheduled"} onClick={() => toggle("scheduled")} theme={theme} />
      <NavItem label="Completed" count={counts.completed} dot={statusColor.completed} active={filterStatus === "completed"} onClick={() => toggle("completed")} theme={theme} />
      <NavItem label="Cancelled" count={counts.cancelled} dot={statusColor.cancelled} active={filterStatus === "cancelled"} onClick={() => toggle("cancelled")} theme={theme} />
    </nav>
  );
}
