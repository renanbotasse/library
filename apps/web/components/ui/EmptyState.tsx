interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
      {/* Book stack illustration */}
      <div className="relative mb-2">
        <div
          className="absolute -left-5 top-2 h-16 w-10 rotate-[-8deg] rounded"
          style={{ backgroundColor: "rgba(33,28,41,0.7)", border: "1px solid rgba(163,130,74,0.08)" }}
        />
        <div
          className="absolute -right-5 top-3 h-16 w-10 rotate-[8deg] rounded"
          style={{ backgroundColor: "rgba(33,28,41,0.5)", border: "1px solid rgba(163,130,74,0.08)" }}
        />
        <div
          className="relative flex h-20 w-12 flex-col items-center justify-center rounded shadow-lg"
          style={{
            backgroundColor: "#15131B",
            border: "1px solid rgba(163,130,74,0.18)",
          }}
        >
          <span className="font-serif text-2xl" style={{ color: "#A3824A" }}>✦</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-text">{title}</h3>
        <p className="max-w-xs font-sans text-sm text-muted">{description}</p>
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
