export default function Field({ label, error, children, className = "", theme }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium block mb-1" style={{ color: theme.inkSoft }}>
        {label}
      </span>
      {children}
      {error && (
        <span className="text-xs block mt-1" style={{ color: theme.danger }}>
          {error}
        </span>
      )}
    </label>
  );
}
