import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = "", hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-stone-800 bg-stone-900/60 backdrop-blur-sm ${hover ? "cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-stone-700 hover:shadow-xl hover:shadow-black/40" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
