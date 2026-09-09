import { ArrowUpRight, CalendarDays, CheckCircle2, Clock3, Users } from "lucide-react";
import { formatTime } from "../utils/date";
import { TODAY } from "../data/sampleAppointments";

export default function AppointmentInsights({ appointments, theme, statusColor, onStatusClick, onDateClick }) {
  const todayAppointments = appointments.filter((a) => a.date === TODAY && a.status !== "cancelled");
  const nextAppointments = appointments
    .filter((a) => a.status === "scheduled")
    .sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`))
    .slice(0, 4);
  const people = new Set(appointments.map((a) => a.with).filter(Boolean)).size;
  const completion = appointments.length ? Math.round((appointments.filter((a) => a.status === "completed").length / appointments.length) * 100) : 0;

  const statCards = [
    { label: "Today", value: todayAppointments.length, detail: "appointments", icon: CalendarDays, onClick: () => onDateClick(TODAY) },
    { label: "Scheduled", value: appointments.filter((a) => a.status === "scheduled").length, detail: "ready to go", icon: Clock3, onClick: () => onStatusClick("scheduled") },
    { label: "Completed", value: appointments.filter((a) => a.status === "completed").length, detail: `${completion}% of board`, icon: CheckCircle2, onClick: () => onStatusClick("completed") },
    { label: "People", value: people, detail: "collaborators", icon: Users, onClick: () => onStatusClick("all") },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_310px] gap-5 mb-6">
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map(({ label, value, detail, icon: Icon, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="text-left p-4 transition-transform hover:-translate-y-0.5"
              style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: "10px", boxShadow: theme.shadow }}
            >
              <div className="flex items-center justify-between" style={{ color: theme.inkSoft }}>
                <span className="text-xs font-medium">{label}</span>
                <Icon size={16} style={{ color: theme.accent }} />
              </div>
              <div className="flex items-end gap-2 mt-3">
                <strong className="text-2xl leading-none" style={{ color: theme.ink }}>{value}</strong>
                <span className="text-xs pb-0.5" style={{ color: theme.inkSoft }}>{detail}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-5 mb-2">
          <div>
            <h2 className="text-base font-semibold" style={{ color: theme.ink }}>Your schedule</h2>
            <p className="text-xs mt-1" style={{ color: theme.inkSoft }}>A live view of the week ahead.</p>
          </div>
          <button onClick={() => onStatusClick("all")} className="flex items-center gap-1 text-xs font-medium" style={{ color: theme.accent }}>
            View all <ArrowUpRight size={14} />
          </button>
        </div>
      </section>

      <aside className="p-4" style={{ background: theme.sidebarBg, border: `1px solid ${theme.border}`, borderRadius: "10px" }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: theme.ink }}>Up next</h2>
          <span className="text-[11px]" style={{ color: theme.inkSoft }}>{nextAppointments.length} upcoming</span>
        </div>
        <div className="space-y-1">
          {nextAppointments.map((a) => (
            <button key={a.id} onClick={() => onDateClick(a.date)} className="w-full text-left flex items-center gap-2.5 p-2 rounded-md" style={{ color: theme.ink }}>
              <span className="shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: statusColor[a.status] }} />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium truncate">{a.title}</span>
                <span className="block text-[11px] mt-0.5" style={{ color: theme.inkSoft }}>{a.date === TODAY ? "Today" : a.date} · {formatTime(a.start)}</span>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}