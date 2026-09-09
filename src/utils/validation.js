import { formatTime } from "./date";

// Two time ranges on the same day overlap if one starts before the other ends.
export const overlaps = (a, b) => a.start < b.end && b.start < a.end;

/**
 * Validates a new/edited appointment form against the required fields,
 * the start/end ordering, and existing appointments on the same date.
 *
 * @param {object} form - { title, date, start, end, ... }
 * @param {object[]} appointments - all existing appointments
 * @param {string|null} editingId - id of the appointment being edited, if any
 * @returns {object} a map of field -> error message (empty object = valid)
 */
export function validateAppointment(form, appointments, editingId) {
  const errors = {};

  if (!form.title.trim()) errors.title = "Enter a title.";
  if (!form.date) errors.date = "Choose a date.";
  if (!form.start) errors.start = "Choose a start time.";
  if (!form.end) errors.end = "Choose an end time.";

  if (form.start && form.end && form.end <= form.start) {
    errors.end = "End time must be after the start time.";
  }

  if (!errors.date && !errors.start && !errors.end) {
    const conflict = appointments.find(
      (a) =>
        a.id !== editingId &&
        a.date === form.date &&
        a.status !== "cancelled" &&
        overlaps(a, form)
    );
    if (conflict) {
      errors.start = `Conflicts with "${conflict.title}" (${formatTime(conflict.start)}–${formatTime(
        conflict.end
      )}).`;
    }
  }

  return errors;
}
