import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_NAMES, WEEKDAY_LETTERS, buildMonthGrid } from "../utils/date";
import { TODAY } from "../data/sampleAppointments";

export default function MiniCalendar({ calendarView, setCalendarView, filterDate, setFilterDate, appointments, theme }) {
  const monthCells = buildMonthGrid(calendarView);
  const dateHasAppointments = (iso) => appointments.some((a) => a.date === iso && a.status !== "cancelled");

  return (
    <div className="px-3 pt-4">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-xs font-medium" style={{ color: theme.inkSoft }}>
          {MONTH_NAMES[calendarView.getMonth()]} {calendarView.getFullYear()}
        </span>
        <div className="flex items-center gap-0.5">
          <button
            className="icon-btn p-1"
            style={{ borderRadius: "4px", color: theme.inkSoft }}
            onClick={() => setCalendarView(new Date(calendarView.getFullYear(), calendarView.getMonth() - 1, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            className="icon-btn p-1"
            style={{ borderRadius: "4px", color: theme.inkSoft }}
            onClick={() => setCalendarView(new Date(calendarView.getFullYear(), calendarView.getMonth() + 1, 1))}
            aria-label="Next month"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 px-1">
        {WEEKDAY_LETTERS.map((w, i) => (
          <div key={i} className="text-center text-[11px] py-1" style={{ color: theme.inkFaint }}>
            {w}
          </div>
        ))}
        {monthCells.map((c, i) => {
          const isSelected = filterDate === c.iso;
          const isToday = c.iso === TODAY;
          const hasAppts = dateHasAppointments(c.iso);
          return (
            <button
              key={i}
              onClick={() => setFilterDate(isSelected ? "" : c.iso)}
              className="cal-day relative flex items-center justify-center text-xs mx-auto"
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "6px",
                color: !c.inMonth ? theme.inkFaint : isSelected ? "#fff" : theme.ink,
                background: isSelected ? theme.accent : "transparent",
                fontWeight: isToday && !isSelected ? 700 : 400,
                border: isToday && !isSelected ? `1px solid ${theme.accent}` : "1px solid transparent",
              }}
            >
              {c.day}
              {hasAppts && c.inMonth && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: isSelected ? "#fff" : theme.accent,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      {filterDate && (
        <button onClick={() => setFilterDate("")} className="text-xs mt-2 px-1" style={{ color: theme.accent }}>
          Clear date
        </button>
      )}
    </div>
  );
}
