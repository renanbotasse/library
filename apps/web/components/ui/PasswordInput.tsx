"use client";

import { useState } from "react";

const REQUIREMENTS = [
  { label: "At least 8 characters",         test: (v: string) => v.length >= 8 },
  { label: "Uppercase letter (A–Z)",         test: (v: string) => /[A-Z]/.test(v) },
  { label: "Lowercase letter (a–z)",         test: (v: string) => /[a-z]/.test(v) },
  { label: "Special character (!@#$…)",      test: (v: string) => /[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]/.test(v) },
];

export function PasswordInput() {
  const [value, setValue] = useState("");
  const touched = value.length > 0;

  return (
    <div className="space-y-2">
      <input
        id="password"
        name="password"
        type="password"
        required
        autoComplete="new-password"
        placeholder="Min. 8 characters"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input-wl"
      />

      {/* 2×2 grid — 2 requirements per column */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
        {REQUIREMENTS.map((req) => {
          const ok = req.test(value);
          const color = !touched
            ? "rgba(201,193,180,0.4)"  // natural
            : ok
              ? "#7EC87E"              // green
              : "#E05C6A";            // red

          return (
            <div
              key={req.label}
              className="flex items-center gap-1.5 font-sans text-[11px] transition-colors duration-300"
            >
              <span style={{ color, flexShrink: 0 }}>
                {!touched ? "●" : ok ? "✓" : "✕"}
              </span>
              <span style={{ color }}>{req.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
