import { Check, Pencil, RotateCcw, X } from "lucide-react";
import { formatTime } from "../utils/date";
import { STATUS_LABEL } from "../theme/theme";

const AVATAR_COLORS = ["#5B6E58", "#8A5A44", "#4E6A82", "#7A5A82", "#8A7A3E", "#5C7A6E"];
const colorForName = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[Math.abs(hash)];
};
const initialsOf = (name) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

export default function AppointmentRow({
  appointment: a,
  isFirst,
  theme,
  statusColor,
  onEdit,
  onComplete,
  onReopen,
  confirming,
  onRequestCancel,
  onConfirmCancel,
  onDismissCancel,
}) {
  const isCancelled = a.status === "cancelled";
  const isCompleted = a.status === "completed";

  return (
    <div
      className="row flex items-center gap-3 px-3 py-2.5"
      style={{ borderTop: isFirst ? "none" : `1px solid ${theme.border}`, background: theme.surface, opacity: isCancelled ? 0.6 : 1 }}
    >
      <button
        onClick={() => (isCancelled ? null : isCompleted ? onReopen(a.id) : onComplete(a.id))}
        disabled={isCancelled}
        title={isCancelled ? "Cancelled" : isCompleted ? "Mark as scheduled" : "Mark as completed"}
        className="shrink-0 flex items-center justify-center"
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          border: `1.5px solid ${isCompleted ? statusColor.completed : theme.border}`,
          background: isCompleted ? statusColor.completed : "transparent",
          cursor: isCancelled ? "default" : "pointer",
        }}
      >
        {isCompleted && <Check size={11} color="#fff" strokeWidth={3} />}
      </button>

      <div className="font-mono-b text-xs shrink-0" style={{ width: "108px", color: theme.inkSoft }}>
        {formatTime(a.start)}
        <span style={{ color: theme.inkFaint }}> – </span>
        {formatTime(a.end)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate" style={{ textDecoration: isCancelled ? "line-through" : "none", color: theme.ink }}>
            {a.title}
          </span>
        </div>
        {a.description && (
          <p className="text-xs truncate mt-0.5" style={{ color: theme.inkSoft }}>
            {a.description}
          </p>
        )}
      </div>

      {a.with && (
        <div
          title={a.with}
          className="shrink-0 flex items-center justify-center text-[10px] font-semibold text-white"
          style={{ width: "22px", height: "22px", borderRadius: "50%", background: colorForName(a.with) }}
        >
          {initialsOf(a.with)}
        </div>
      )}

      <div className="shrink-0 flex items-center gap-1.5 text-xs" style={{ width: "92px", color: theme.inkSoft }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: statusColor[a.status] }} />
        {STATUS_LABEL[a.status]}
      </div>

      <div className="shrink-0" style={{ width: "76px" }}>
        {!isCancelled && !confirming && (
          <div className="row-actions flex items-center justify-end gap-1">
            <button className="icon-btn p-1.5" style={{ borderRadius: "5px", color: theme.inkSoft }} title="Edit" onClick={() => onEdit(a)}>
              <Pencil size={14} />
            </button>
            <button className="icon-btn p-1.5" style={{ borderRadius: "5px", color: theme.inkSoft }} title="Cancel" onClick={() => onRequestCancel(a.id)}>
              <X size={14} />
            </button>
          </div>
        )}
        {confirming && (
          <div className="flex items-center justify-end gap-1">
            <button onClick={() => onConfirmCancel(a.id)} className="text-xs font-medium px-2 py-1 text-white" style={{ background: theme.danger, borderRadius: "5px" }}>
              Cancel it
            </button>
            <button onClick={onDismissCancel} className="icon-btn p-1.5" style={{ borderRadius: "5px", color: theme.inkSoft }} title="Keep appointment">
              <RotateCcw size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
