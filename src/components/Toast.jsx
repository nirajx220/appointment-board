export default function Toast({ toast, theme }) {
  if (!toast) return null;
  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 px-3.5 py-2 text-sm text-white z-50"
      style={{
        background: toast.kind === "success" ? theme.accent : theme.danger,
        borderRadius: "6px",
        boxShadow: theme.shadow,
      }}
    >
      {toast.message}
    </div>
  );
}
