import { useCallback, useEffect, useRef, useState } from "react";
import { SAMPLE_APPOINTMENTS } from "../data/sampleAppointments";

const STORAGE_KEY = "appointment-board:appointments";
const THEME_KEY = "appointment-board:theme";
export function useAppointments() {
  const [appointments, setAppointments] = useState(SAMPLE_APPOINTMENTS);
  const [theme, setTheme] = useState("dark");
  const [ready, setReady] = useState(false);
  const idCounter = useRef(16);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) setTheme(savedTheme);
    } catch {
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setAppointments(parsed);
      }
    } catch {
    }
    setReady(true);
  }, []);

  const persist = useCallback((list) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
    }
  }, []);

  const update = useCallback(
    (updater) => {
      setAppointments((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
      }
      return next;
    });
  }, []);

  const addAppointment = useCallback(
    (form) => {
      const id = `a${idCounter.current++}`;
      update((prev) => [...prev, { id, ...form, title: form.title.trim(), status: "scheduled" }]);
    },
    [update]
  );

  const editAppointment = useCallback(
    (id, form) => {
      update((prev) => prev.map((a) => (a.id === id ? { ...a, ...form, title: form.title.trim() } : a)));
    },
    [update]
  );

  const markCompleted = useCallback(
    (id) => update((prev) => prev.map((a) => (a.id === id ? { ...a, status: "completed" } : a))),
    [update]
  );

  const reopen = useCallback(
    (id) => update((prev) => prev.map((a) => (a.id === id ? { ...a, status: "scheduled" } : a))),
    [update]
  );

  const cancelAppointment = useCallback(
    (id) => update((prev) => prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))),
    [update]
  );

  return {
    appointments,
    theme,
    ready,
    toggleTheme,
    addAppointment,
    editAppointment,
    markCompleted,
    reopen,
    cancelAppointment,
  };
}
