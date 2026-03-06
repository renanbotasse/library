"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number | null;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md";
}

export function StarRating({ value, onChange, readonly = false, size = "md" }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  const active = hovered ?? value ?? 0;

  return (
    <div className="flex items-center gap-0.5" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(null)}
          className={`transition-all duration-100 ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
        >
          <svg
            className={`${starSize} transition-colors duration-100`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= active ? "#A3824A" : "none"}
            stroke={star <= active ? "#A3824A" : "rgba(163,130,74,0.35)"}
            strokeWidth={1.5}
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
