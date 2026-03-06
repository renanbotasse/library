import type { ReadingStatus } from "@tomekeep/core";

interface StatusBadgeProps {
  status: ReadingStatus;
  className?: string;
}

const statusConfig: Record<
  ReadingStatus,
  { label: string; symbol: string; color: string; bg: string; border: string }
> = {
  to_read: {
    label: "To Read",
    symbol: "♦",
    color: "#C4A8D4",
    bg: "rgba(75,46,94,0.12)",
    border: "rgba(75,46,94,0.35)",
  },
  reading: {
    label: "Reading",
    symbol: "♥",
    color: "#C88C9A",
    bg: "rgba(107,31,51,0.15)",
    border: "rgba(200,140,154,0.3)",
  },
  read: {
    label: "Read",
    symbol: "♣",
    color: "#7EC87E",
    bg: "rgba(49,67,56,0.18)",
    border: "rgba(49,67,56,0.38)",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-sans text-xs font-medium ${className}`}
      style={{ color: config.color, backgroundColor: config.bg, borderColor: config.border }}
    >
      <span>{config.symbol}</span>
      {config.label}
    </span>
  );
}
