# Appointment Board

A small-team appointment board: view, add, edit, complete, and cancel appointments, with date/status filtering, search, and double-booking prevention. Built as a standard Vite + React app.

## Folder structure

```
appointment-board/
├── index.html                 Vite entry HTML (mounts #root)
├── package.json                Dependencies & scripts (dev/build/preview)
├── vite.config.js              Vite + React plugin config
├── tailwind.config.js          Tailwind content paths
├── postcss.config.js           Tailwind/Autoprefixer pipeline
└── src/
    ├── main.jsx                 React entry point
    ├── App.jsx                  Top-level component: wires state, filters, and layout together
    ├── index.css                Tailwind directives + global styles/fonts
    │
    ├── data/
    │   └── sampleAppointments.js   Seed data shown on first load, + the empty form shape
    │
    ├── utils/
    │   ├── date.js                  Date/time formatting and the mini-calendar grid builder
    │   └── validation.js            Form validation, incl. the double-booking check
    │
    ├── hooks/
    │   └── useAppointments.js       Owns appointment/theme state + localStorage persistence
    │
    ├── theme/
    │   └── theme.js                 Light/dark color tokens and status colors/labels
    │
    └── components/
        ├── Sidebar.jsx               Branding, "New appointment", composes calendar + status nav
        ├── MiniCalendar.jsx          Month grid, date filtering, dots on busy days
        ├── StatusNav.jsx             Status filter list with live counts
        ├── AppointmentList.jsx       Groups filtered appointments by date
        ├── AppointmentRow.jsx        One appointment: complete-toggle, details, hover actions
        ├── AppointmentModal.jsx      Add/edit form
        ├── Field.jsx                 Reusable labeled input wrapper with inline error text
        └── Toast.jsx                 Success/error toast
```

The split mirrors how the app actually works: **data** is what's on the board, **utils** are pure functions with no state, **hooks** own state and persistence, **theme** is shared design tokens, and **components** are presentational — they receive data and callbacks as props and don't talk to storage directly.

## Running it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

```bash
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

## Features

- **Sidebar + list layout** — branding, "New appointment," a mini calendar, and status filters in a left rail, next to a dense list.
- **Mini calendar** — click a date to filter the list to that day; days with active appointments show a dot.
- **Status filters with live counts** — All / Scheduled / Completed / Cancelled.
- **Search** — filters by title, description, or the "with" field; press `/` to focus it.
- **Keyboard shortcut** — press `N` to open the new-appointment form.
- **Add / edit** — a form for title, optional "with," description, date, start time, and end time.
- **Validation** — required fields, end time after start time, and no overlapping time slots on the same day.
- **Status changes** — a circular toggle marks an appointment complete or reopens it; edit/cancel icons appear on row hover.
- **Cancelled appointments stay visible** — struck through, dimmed, clearly labeled, no further actions.
- **Feedback** — inline field errors, plus a toast for every success or failure.
- **Dark mode** — a switch in the sidebar; preference is remembered.
- **Persistence** — appointments and theme are saved to `localStorage`, so they survive a page reload.
- **Sample data** — seven appointments across yesterday/today/tomorrow, covering all three statuses.

## How it works

1. On load, `useAppointments` tries to restore saved appointments and theme from `localStorage`; if none exist yet, it falls back to the sample data and light mode.
2. **New appointment** (button, or `N`) opens `AppointmentModal`. On submit, `validateAppointment` checks required fields, that end is after start, and that the new range doesn't overlap any other *non-cancelled* appointment on the same date. The first problem found is shown next to the relevant field, with a toast summarizing that something needs fixing.
3. On success, the appointment is added or updated and saved to `localStorage`; a success toast confirms it.
4. The circular toggle on each `AppointmentRow` marks an appointment "Completed" or reopens it. The X icon (shown on hover) asks "Cancel it?" inline before applying the change.
5. The calendar, status filters, and search box all combine in `App.jsx` — nothing is discarded, just hidden from the current view.

## Assumptions

- **No real backend** — state lives in the browser via `localStorage` rather than a server database. Mapped to a real API, this would look like:
  - `GET /appointments` — list (with `date`/`status` query params)
  - `POST /appointments` — create, with the same validation enforced server-side
  - `PATCH /appointments/:id` — edit, complete, reopen, or cancel
  - Conflict checking would move server-side to stay correct under concurrent edits.
- **One shared board, no accounts** — fits "a small team" sharing one calendar rather than per-person calendars or auth.
- **Time-slot conflicts** are checked per calendar date, assuming one team/one schedule rather than multiple rooms or resources.
- **"Reopen" for completed appointments** is an added convenience beyond the original spec, in case something is marked done by mistake.
- **Cancelled appointments are terminal** (no restore) — visible and clearly marked, per the spec, but not un-cancellable.
- **Storage is per-browser, not shared** — this demo persists to the local browser only. A real shared team board would need the backend above plus a way to broadcast updates (polling or websockets).
