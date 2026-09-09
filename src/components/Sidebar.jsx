import { Plus } from "lucide-react";
import MiniCalendar from "./MiniCalendar";
import StatusNav from "./StatusNav";

export default function Sidebar({
  theme,
  toggleTheme,
  isDark,
  onAddClick,
  filterDate,
  setFilterDate,
  calendarView,
  setCalendarView,
  appointments,
  filterStatus,
  setFilterStatus,
  counts,
  statusColor,
}) {
  return (
    <aside className="shrink-0 flex flex-col" style={{ width: "288px", background: theme.sidebarBg, borderRight: `1px solid ${theme.border}` }}>
      <div className="px-4 pt-5 pb-4 flex items-center gap-2.5" style={{ borderBottom: `1px solid ${theme.border}` }}>
        <div
          className="flex items-center justify-center shrink-0 text-sm font-semibold text-white"
          style={{ width: "26px", height: "26px", background: theme.accent, borderRadius: "6px" }}
        >
          H
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold leading-tight truncate">Niraj Studio</div>
          <div className="text-xs leading-tight" style={{ color: theme.inkSoft }}>Front desk</div>
        </div>
      </div>

      <div className="px-3 pt-3">
        <button
          onClick={onAddClick}
          className="primary-btn w-full flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-white"
          style={{ background: theme.accent, borderRadius: "6px" }}
        >
          <span className="flex items-center gap-1.5">
            <Plus size={15} strokeWidth={2.5} />
            New appointment
          </span>
          <span className="font-mono-b text-[11px] px-1.5 py-0.5" style={{ background: "rgba(255,255,255,0.18)", borderRadius: "4px" }}>
            N
          </span>
        </button>
      </div>

      <MiniCalendar
        calendarView={calendarView}
        setCalendarView={setCalendarView}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        appointments={appointments}
        theme={theme}
      />

      <StatusNav counts={counts} filterStatus={filterStatus} setFilterStatus={setFilterStatus} theme={theme} statusColor={statusColor} />

      <div className="mt-auto px-3 pb-4 pt-4" style={{ borderTop: `1px solid ${theme.border}` }}>
        <div className="flex items-center justify-between px-1">
          <span className="text-sm" style={{ color: theme.inkSoft }}>Dark mode</span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="relative shrink-0"
            style={{ width: "34px", height: "19px", borderRadius: "999px", background: isDark ? theme.accent : theme.border, transition: "background 0.15s ease" }}
          >
            <span
              style={{
                position: "absolute",
                top: "2px",
                left: isDark ? "17px" : "2px",
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.15s ease",
                boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
              }}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
