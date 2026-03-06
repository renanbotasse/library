"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export function Toast({ message, type = "success", visible, onHide, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, duration);
    return () => clearTimeout(timer);
  }, [visible, onHide, duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full border px-5 py-2.5 font-sans text-sm font-medium shadow-xl backdrop-blur-sm"
          style={
            type === "success"
              ? {
                  borderColor: "rgba(49,67,56,0.5)",
                  backgroundColor: "rgba(11,10,15,0.92)",
                  color: "#7EC87E",
                }
              : {
                  borderColor: "rgba(200,140,154,0.4)",
                  backgroundColor: "rgba(11,10,15,0.92)",
                  color: "#C88C9A",
                }
          }
          role="status"
          aria-live="polite"
        >
          {type === "success" ? "♣ " : "✕ "}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
