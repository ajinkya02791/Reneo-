import type { ToastProps } from "../types/toast";


const toastStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-gray-800",
};

export default function Toast({
    message,
    type = "success",
}: ToastProps) {
    return (
        <div
            className={`
                fixed bottom-6 right-6 z-50
                min-w-70 max-w-sm
                rounded-xl px-5 py-4
                text-base font-medium text-white
                shadow-xl
                ${toastStyles[type]}
                animate-toast-in
            `}
        >
            <div className="flex items-center gap-3">
                <span className="text-lg">
                    {type === "success" && "✓"}
                    {type === "error" && "✕"}
                    {type === "info" && "ⓘ"}
                </span>

                <span>{message}</span>
            </div>
        </div>
    );
}