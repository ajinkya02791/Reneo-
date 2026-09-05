import type { ToastProps } from "../types/toast";

export default function Toast({
  message,
  type = "success",
}: ToastProps) {
  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-gray-800",
  };

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 flex items-center gap-2
        rounded-lg px-4 py-3 text-sm text-white shadow-lg
        ${styles[type]}
        animate-in slide-in-from-left-5 duration-200`}
    >
      {type === "success" && "✓"}
      {type === "error" && "✕"}
      {type === "info" && "ⓘ"}

      <span>{message}</span>
    </div>
  );
}