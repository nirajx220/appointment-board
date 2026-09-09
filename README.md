# Appointment Board

Appointment Board is a focused scheduling workspace for small teams. It provides a fast way to review upcoming work, create appointments, manage statuses, search the schedule, and prevent overlapping time slots.

The interface is branded as Niraj Studio and uses a dark-first visual theme with an optional light mode.

## Highlights

- Dark mode is enabled by default for new users.
- Light mode can be enabled from the sidebar and is remembered.
- Dashboard metrics show today's appointments, scheduled work, completed work, and collaborators.
- The Up next panel provides quick links to upcoming appointments.
- The mini calendar filters the board by date and shows days containing appointments.
- Status filters support All, Scheduled, Completed, and Cancelled views.
- Search matches appointment titles, descriptions, and attendees.
- New appointments can be created with the `N` keyboard shortcut.
- Search can be focused with the `/` keyboard shortcut.
- Appointments can be edited, completed, reopened, or cancelled.
- Cancelled appointments remain visible for history but cannot be edited or reopened.
- Inline form errors explain missing fields, invalid time ranges, and conflicts.
- Toast messages confirm successful and failed actions.
- Appointment data and theme settings persist in browser `localStorage`.

## Technology

- React 18
- Vite 5
- Tailwind CSS 3
- PostCSS and Autoprefixer
- Lucide React icons
- JavaScript and JSX

## Requirements

- Node.js 18 or newer
- npm 9 or newer

Check your installed versions:

```bash
node --version
npm --version
```

## Local development

From the project directory:

```bash
npm install
npm run dev
```

Vite will print a local URL, normally `http://localhost:5173/`.

On Windows PowerShell, you can run the project with an explicit path:

```powershell
npm --prefix "C:\path\to\appointment-board" run dev
```

## Production build

Create an optimized production build:

```bash
npm run build
```

The generated files are written to `dist/`. Preview that build locally with:

```bash
npm run preview
```

## Project structure

```text
appointment-board/
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── AppointmentInsights.jsx
    │   ├── AppointmentList.jsx
    │   ├── AppointmentModal.jsx
    │   ├── AppointmentRow.jsx
    │   ├── Field.jsx
    │   ├── MiniCalendar.jsx
    │   ├── Sidebar.jsx
    │   ├── StatusNav.jsx
    │   └── Toast.jsx
    ├── data/
    │   └── sampleAppointments.js
    ├── hooks/
    │   └── useAppointments.js
    ├── theme/
    │   └── theme.js
    └── utils/
        ├── date.js
        └── validation.js
```

## Architecture

`App.jsx` owns filtering, modal state, keyboard shortcuts, and action handlers. `useAppointments` owns appointment state, theme state, persistence, and status mutations. Components receive data and callbacks as props, keeping presentation separate from storage and business logic.

The main data flow is:

1. `useAppointments` loads sample data and any saved browser data.
2. `App.jsx` derives counts, filtered appointments, and date groups.
3. Sidebar controls update date and status filters.
4. Appointment rows call handlers for complete, reopen, edit, and cancel actions.
5. Successful changes are written back to `localStorage`.

## Validation rules

The appointment form requires a title, date, start time, and end time. The end time must be later than the start time. A new or edited appointment cannot overlap another non-cancelled appointment on the same date. Cancelled appointments do not block a new time slot.

## Persistence

The app uses two browser storage keys:

- `appointment-board:appointments`
- `appointment-board:theme`

Data is stored per browser and per device. Clearing site data resets the board to its sample appointments and dark theme. There is no backend, authentication, or shared team synchronization.

## Deployment on Vercel

This is a standard Vite project and can be deployed directly from GitHub.

1. Open [Vercel](https://vercel.com) and sign in with GitHub.
2. Select **Add New** and then **Project**.
3. Import `nirajx220/appointment-board`.
4. Select `Vite` as the framework preset.
5. Use `npm run build` as the build command.
6. Use `dist` as the output directory.
7. Leave environment variables empty.
8. Click **Deploy**.

Vercel will automatically create a deployment URL and redeploy when new commits are pushed to `main`.

## Git workflow

After making changes locally:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

The repository is available at [github.com/nirajx220/appointment-board](https://github.com/nirajx220/appointment-board).

## Current limitations

- Appointments are not shared between browsers.
- There are no user accounts or permissions.
- There is no server-side conflict checking.
- Cancelled appointments are terminal and cannot be restored.
- Sample data is included for demonstration and can be replaced with an API later.

## Future backend shape

If the app is connected to a server, the current actions map naturally to these endpoints:

```text
GET    /appointments
POST   /appointments
PATCH  /appointments/:id
DELETE /appointments/:id
```

Conflict checking should remain server-side once multiple users can edit the same schedule concurrently.
