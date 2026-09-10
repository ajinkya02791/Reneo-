
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";

const RESEND_COOLDOWN = 30;
const STORAGE_KEY = "verification_resend_at";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email ?? "";

  const [remaining, setRemaining] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const resendAt = Number(localStorage.getItem(STORAGE_KEY));

      if (!resendAt) {
        setRemaining(0);
        return;
      }

      const secondsLeft = Math.ceil((resendAt - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        localStorage.removeItem(STORAGE_KEY);
        setRemaining(0);
      } else {
        setRemaining(secondsLeft);
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResend = async () => {
    if (!email || remaining > 0 || isResending) return;

    setError("");
    setMessage("");
    setIsResending(true);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    setIsResending(false);

    if (error) {
      setError(error.message);
      return;
    }

    const resendAt = Date.now() + RESEND_COOLDOWN * 1000;

    localStorage.setItem(STORAGE_KEY, resendAt.toString());

    setRemaining(RESEND_COOLDOWN);
    setMessage("Verification email sent.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Verify your email
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We sent a verification link to
          </p>

          {email && (
            <p className="mt-1 text-sm font-medium text-gray-900 break-all">
              {email}
            </p>
          )}

          <p className="mt-4 text-xs leading-5 text-gray-500">
            Please check your inbox and click the verification link to
            activate your account.
          </p>
        </div>

        {message && (
          <div className="mt-4 rounded-md bg-green-50 px-3 py-2 text-xs text-green-600">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleResend}
          disabled={remaining > 0 || isResending || !email}
          className="mt-5 h-9 w-full rounded-md bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isResending
            ? "Sending..."
            : remaining > 0
              ? `Resend in ${remaining}s`
              : "Resend verification email"}
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          Didn't receive it? Check your spam or junk folder.
        </p>

        <div className="mt-5 border-t border-gray-100 pt-4 text-center">
          <Link
            to="/login"
            className="text-xs font-medium text-gray-900 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
