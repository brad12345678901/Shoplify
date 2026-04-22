import { useState, useCallback, useEffect } from "react";

const ICONS = {
  success: "✓",
  error: "✕",
  warning: "⚠",
  info: "ℹ",
};

type Toast = {
  id: number;
  type: "info" | "success" | "error" | "warning";
  title: string;
  message: string;
  duration: number;
};

type ToastItemProps = {
  toast: Toast;
  onRemove: (id: number) => void;
};

type ToastContainerProps = {
  toasts: Toast[];
  onRemove: (id: number) => void;
};

export function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [removing, setRemoving] = useState(false);

  const dismiss = useCallback(() => {
    setRemoving(true);
    setTimeout(() => onRemove(toast.id), 240);
  }, [toast.id, onRemove]);

  useEffect(() => {
    const timer = setTimeout(dismiss, toast.duration ?? 4000);
    return () => clearTimeout(timer);
  }, [dismiss, toast.duration]);

  return (
    <div className={`toast toast-${toast.type} ${removing ? "removing" : ""}`}>
      <span className="toast-icon">
        {ICONS[toast.type as keyof typeof ICONS]}
      </span>

      <div className="toast-body">
        {toast.title && <div className="toast-title">{toast.title}</div>}
        {toast.message && <div className="toast-message">{toast.message}</div>}
      </div>

      <button className="toast-close" onClick={dismiss}>
        ✕
      </button>

      <div
        className="toast-progress"
        style={{ animationDuration: `${toast.duration ?? 4000}ms` }}
      />
    </div>
  );
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
