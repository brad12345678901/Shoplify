import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { ToastContainer } from "./components/Toast";

type ToastContextType = {
  success: (title: string, message: string, duration?: number) => void;
  error: (title: string, message: string, duration?: number) => void;
  warning: (title: string, message: string, duration?: number) => void;
  info: (title: string, message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

type ToastOptions = {
  type?: "info" | "success" | "error" | "warning";
  title: string;
  message: string;
  duration?: number;
};

type Toast = {
  id: number;
  type: "info" | "success" | "error" | "warning";
  title: string;
  message: string;
  duration: number;
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const add = useCallback((options: ToastOptions) => {
    const { type = "info", title, message, duration = 2000 } = options;
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Convenience methods
  const toast = {
    success: (title: string, message: string, duration: number) =>
      add({ type: "success", title, message, duration }),
    error: (title: string, message: string, duration: number) =>
      add({ type: "error", title, message, duration }),
    warning: (title: string, message: string, duration: number) =>
      add({ type: "warning", title, message, duration }),
    info: (title: string, message: string, duration: number) =>
      add({ type: "info", title, message, duration }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onRemove={remove} />{" "}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside <ToastProvider>");
  return context;
}
