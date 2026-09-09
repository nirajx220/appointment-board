import { X } from "lucide-react";
import Field from "./Field";

export default function AppointmentModal({ visible, editingId, form, setForm, errors, onSubmit, onClose, theme }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ background: theme.overlay }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm"
        style={{
          background: theme.surface,
          borderRadius: "10px",
          overflow: "hidden",
          border: `1px solid ${theme.border}`,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.97) translateY(4px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.14s ease, opacity 0.14s ease",
          boxShadow: theme.shadow,
        }}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${theme.border}` }}>
          <h2 className="text-sm font-semibold">{editingId ? "Edit appointment" : "New appointment"}</h2>
          <button onClick={onClose} aria-label="Close" className="icon-btn p-1" style={{ borderRadius: "4px", color: theme.inkSoft }}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-4 py-4 space-y-3">
          <Field label="Title" error={errors.title} theme={theme}>
            <input
              autoFocus
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Client call"
              className="w-full text-sm px-2.5 py-1.5 outline-none"
              style={{ border: `1px solid ${errors.title ? theme.danger : theme.border}`, borderRadius: "6px", background: theme.bg, color: theme.ink }}
            />
          </Field>

          <Field label="With (optional)" theme={theme}>
            <input
              type="text"
              value={form.with}
              onChange={(e) => setForm({ ...form, with: e.target.value })}
              placeholder="e.g. Dr. Owens"
              className="w-full text-sm px-2.5 py-1.5 outline-none"
              style={{ border: `1px solid ${theme.border}`, borderRadius: "6px", background: theme.bg, color: theme.ink }}
            />
          </Field>

          <Field label="Description (optional)" theme={theme}>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Add any useful context"
              rows={2}
              className="w-full text-sm px-2.5 py-1.5 outline-none resize-none"
              style={{ border: `1px solid ${theme.border}`, borderRadius: "6px", background: theme.bg, color: theme.ink }}
            />
          </Field>

          <Field label="Date" error={errors.date} theme={theme}>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full text-sm px-2.5 py-1.5 outline-none"
              style={{ border: `1px solid ${errors.date ? theme.danger : theme.border}`, borderRadius: "6px", background: theme.bg, color: theme.ink }}
            />
          </Field>

          <div className="flex gap-3">
            <Field label="Start" error={errors.start} theme={theme} className="flex-1">
              <input
                type="time"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
                className="w-full text-sm px-2.5 py-1.5 outline-none"
                style={{ border: `1px solid ${errors.start ? theme.danger : theme.border}`, borderRadius: "6px", background: theme.bg, color: theme.ink }}
              />
            </Field>
            <Field label="End" error={errors.end} theme={theme} className="flex-1">
              <input
                type="time"
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
                className="w-full text-sm px-2.5 py-1.5 outline-none"
                style={{ border: `1px solid ${errors.end ? theme.danger : theme.border}`, borderRadius: "6px", background: theme.bg, color: theme.ink }}
              />
            </Field>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="text-sm px-3 py-1.5" style={{ border: `1px solid ${theme.border}`, borderRadius: "6px", color: theme.ink }}>
              Cancel
            </button>
            <button type="submit" className="primary-btn text-sm px-3 py-1.5 text-white font-medium" style={{ background: theme.accent, borderRadius: "6px" }}>
              {editingId ? "Save changes" : "Add appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
