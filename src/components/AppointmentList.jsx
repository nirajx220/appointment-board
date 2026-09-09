import { formatDateHeading } from "../utils/date";
import { TODAY } from "../data/sampleAppointments";
import AppointmentRow from "./AppointmentRow";

export default function AppointmentList({
  grouped,
  theme,
  statusColor,
  onEdit,
  onComplete,
  onReopen,
  confirmingCancelId,
  onRequestCancel,
  onConfirmCancel,
  onDismissCancel,
}) {
  if (grouped.length === 0) {
    return (
      <div className="text-center py-20" style={{ color: theme.inkSoft }}>
        <p className="text-sm font-medium" style={{ color: theme.ink }}>No appointments match this view.</p>
        <p className="text-xs mt-1">Try a different date, status, or search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {grouped.map(([date, items]) => (
        <section key={date}>
          <div className="flex items-baseline gap-2 mb-1.5 px-1">
            <h2 className="text-xs font-semibold" style={{ color: theme.inkSoft }}>{formatDateHeading(date)}</h2>
            {date === TODAY && <span className="text-xs" style={{ color: theme.accent }}>· Today</span>}
          </div>

          <div style={{ border: `1px solid ${theme.border}`, borderRadius: "8px", overflow: "hidden" }}>
            {items.map((a, idx) => (
              <AppointmentRow
                key={a.id}
                appointment={a}
                isFirst={idx === 0}
                theme={theme}
                statusColor={statusColor}
                onEdit={onEdit}
                onComplete={onComplete}
                onReopen={onReopen}
                confirming={confirmingCancelId === a.id}
                onRequestCancel={onRequestCancel}
                onConfirmCancel={onConfirmCancel}
                onDismissCancel={onDismissCancel}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
