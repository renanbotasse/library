import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = "", id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-stone-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">{icon}</span>
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl border border-stone-700 bg-stone-800/60 px-4 py-2.5 text-stone-100 placeholder-stone-500 outline-none transition-all duration-200 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50 ${icon ? "pl-10" : ""} ${error ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20" : ""} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
