import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

import { useAppointments } from "./hooks/useAppointments";
import { validateAppointment } from "./utils/validation";
import { emptyForm, TODAY } from "./data/sampleAppointments";
import { THEMES, STATUS_COLOR, STATUS_LABEL } from "./theme/theme";

import Sidebar from "./components/Sidebar";
import AppointmentList from "./components/AppointmentList";
import AppointmentInsights from "./components/AppointmentInsights";
import AppointmentModal from "./components/AppointmentModal";
import Toast from "./components/Toast";

export default function App() {
  const {
    appointments,
    theme: themeName,
    ready,
    toggleTheme,
    addAppointment,
    editAppointment,
    markCompleted,
    reopen,
    cancelAppointment,
  } = useAppointments();

  const theme = THEMES[themeName];
  const statusColor = STATUS_COLOR[themeName];

  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [calendarView, setCalendarView] = useState(() => new Date());

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  const [confirmingCancelId, setConfirmingCancelId] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const searchRef = useRef(null);

  const showToast = (kind, message) => {
    setToast({ kind, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (modalOpen) requestAnimationFrame(() => setModalVisible(true));
  }, [modalOpen]);

  const openAddModal = () => {
    setEditingId(null);
    setForm({ ...emptyForm, date: filterDate || TODAY });
    setFormErrors({});
    setModalVisible(false);
    setModalOpen(true);
  };

  const openEditModal = (appt) => {
    setEditingId(appt.id);
    setForm({ title: appt.title, description: appt.description, with: appt.with || "", date: appt.date, start: appt.start, end: appt.end });
    setFormErrors({});
    setModalVisible(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setModalOpen(false);
      setEditingId(null);
      setFormErrors({});
    }, 140);
  };

  useEffect(() => {
    const onKey = (e) => {
      const typing = ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
      if (e.key === "Escape" && modalOpen) closeModal();
      if (e.key === "n" && !modalOpen && !typing) {
        e.preventDefault();
        openAddModal();
      }
      if (e.key === "/" && !modalOpen && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, filterDate]);

  const counts = useMemo(
    () => ({
      all: appointments.length,
      scheduled: appointments.filter((a) => a.status === "scheduled").length,
      completed: appointments.filter((a) => a.status === "completed").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    }),
    [appointments]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return appointments.filter((a) => {
      if (filterDate && a.date !== filterDate) return false;
      if (filterStatus !== "all" && a.status !== filterStatus) return false;
      if (q && !`${a.title} ${a.description} ${a.with}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [appointments, filterDate, filterStatus, search]);

  const grouped = useMemo(() => {
    const byDate = {};
    filtered.forEach((a) => {
      if (!byDate[a.date]) byDate[a.date] = [];
      byDate[a.date].push(a);
    });
    Object.values(byDate).forEach((list) => list.sort((a, b) => a.start.localeCompare(b.start)));
    return Object.entries(byDate).sort(([d1], [d2]) => d1.localeCompare(d2));
  }, [filtered]);

  const headerTitle =
    filterStatus !== "all"
      ? STATUS_LABEL[filterStatus]
      : filterDate
      ? new Date(filterDate + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
      : "All appointments";

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateAppointment(form, appointments, editingId);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast("error", "Fix the highlighted fields before saving.");
      return;
    }
    if (editingId) {
      editAppointment(editingId, form);
      showToast("success", "Appointment updated.");
    } else {
      addAppointment(form);
      showToast("success", "Appointment added.");
    }
    closeModal();
  };

  const handleComplete = (id) => {
    markCompleted(id);
    showToast("success", "Marked as completed.");
  };
  const handleReopen = (id) => {
    reopen(id);
    showToast("success", "Appointment reopened.");
  };
  const handleConfirmCancel = (id) => {
    cancelAppointment(id);
    setConfirmingCancelId(null);
    showToast("success", "Appointment cancelled.");
  };

  const handleStatusShortcut = (status) => {
    setFilterDate("");
    setFilterStatus(status);
  };

  const handleDateShortcut = (date) => {
    setFilterStatus("all");
    setFilterDate(date);
  };

  return (
    <div
      style={{
        background: theme.bg,
        color: theme.ink,
        opacity: ready ? 1 : 0,
        transition: "opacity 0.15s ease",
      }}
      className="w-full h-screen flex overflow-hidden"
    >
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator { filter: ${themeName === "dark" ? "invert(1)" : "none"}; opacity: 0.6; }
        ::placeholder { color: ${theme.inkFaint}; }
        .row:hover { background: ${theme.hoverBg}; }
        .row:hover .row-actions { opacity: 1; }
        .row-actions { opacity: 0; transition: opacity 0.12s ease; }
        .nav-item:hover { background: ${theme.hoverBg}; }
        .cal-day:hover { background: ${theme.hoverBg}; }
        .icon-btn:hover { background: ${theme.hoverBg}; }
        .primary-btn:hover { filter: brightness(1.07); }
        .primary-btn:active { transform: translateY(1px); }
        :focus-visible { outline: 2px solid ${theme.accent}; outline-offset: 1px; }
      `}</style>

      <Sidebar
        theme={theme}
        isDark={themeName === "dark"}
        toggleTheme={toggleTheme}
        onAddClick={openAddModal}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        calendarView={calendarView}
        setCalendarView={setCalendarView}
        appointments={appointments}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        counts={counts}
        statusColor={statusColor}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-4 px-8 py-5 shrink-0" style={{ borderBottom: `1px solid ${theme.border}` }}>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold truncate">{headerTitle}</h1>
            <p className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>
              {filtered.length} appointment{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="relative shrink-0" style={{ width: "240px" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: theme.inkFaint }} />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search appointments"
              className="w-full text-sm pl-8 pr-8 py-1.5 outline-none"
              style={{ border: `1px solid ${theme.border}`, borderRadius: "6px", background: theme.bg, color: theme.ink }}
            />
            <span
              className="font-mono-b text-[10px] px-1"
              style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", color: theme.inkFaint, border: `1px solid ${theme.border}`, borderRadius: "3px" }}
            >
              /
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-7">
          <AppointmentInsights
            appointments={appointments}
            theme={theme}
            statusColor={statusColor}
            onStatusClick={handleStatusShortcut}
            onDateClick={handleDateShortcut}
          />
          <AppointmentList
            grouped={grouped}
            theme={theme}
            statusColor={statusColor}
            onEdit={openEditModal}
            onComplete={handleComplete}
            onReopen={handleReopen}
            confirmingCancelId={confirmingCancelId}
            onRequestCancel={setConfirmingCancelId}
            onConfirmCancel={handleConfirmCancel}
            onDismissCancel={() => setConfirmingCancelId(null)}
          />
        </div>
      </main>

      {modalOpen && (
        <AppointmentModal
          visible={modalVisible}
          editingId={editingId}
          form={form}
          setForm={setForm}
          errors={formErrors}
          onSubmit={handleSubmit}
          onClose={closeModal}
          theme={theme}
        />
      )}

      <Toast toast={toast} theme={theme} />
    </div>
  );
}
