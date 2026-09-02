
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* -----------------------------
   Validation Schemas
----------------------------- */

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailFormData = z.infer<typeof emailSchema>;
type OtpFormData = z.infer<typeof otpSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const ForgotPassword = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  /* -----------------------------
     Email Form
  ----------------------------- */

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  /* -----------------------------
     OTP Form
  ----------------------------- */

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  /* -----------------------------
     Password Form
  ----------------------------- */

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  /* -----------------------------
     Step 1
  ----------------------------- */

  const onEmailSubmit = async (data: EmailFormData) => {
    console.log("Email:", data.email);

    // API:
    // await sendOtp(data.email);

    setStep(2);
  };

  /* -----------------------------
     Step 2
  ----------------------------- */

  const onOtpSubmit = async (data: OtpFormData) => {
    console.log("OTP:", data.otp);

    // API:
    // await verifyOtp(data.otp);

    setStep(3);
  };

  /* -----------------------------
     Step 3
  ----------------------------- */

  const onPasswordSubmit = async (data: PasswordFormData) => {
    console.log("New password:", data.password);

    // API:
    // await resetPassword({
    //   password: data.password,
    // });

    // Redirect to login after successful reset
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-5">

        {/* Heading */}

        <h1 className="text-xl font-bold text-center">
          Forgot Password
        </h1>

        <p className="text-xs text-gray-500 text-center mt-1 mb-5">
          {step === 1 && "Enter your email to continue"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Create your new password"}
        </p>

        {/* -----------------------------
             STEP 1 — EMAIL
        ----------------------------- */}

        {step === 1 && (
          <form
            onSubmit={handleEmailSubmit(onEmailSubmit)}
            className="space-y-3"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...registerEmail("email")}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              {emailErrors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {emailErrors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 text-sm rounded-lg hover:bg-blue-700"
            >
              Proceed
            </button>
          </form>
        )}

        {/* -----------------------------
             STEP 2 — OTP
        ----------------------------- */}

        {step === 2 && (
          <form
            onSubmit={handleOtpSubmit(onOtpSubmit)}
            className="space-y-3"
          >
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium mb-1"
              >
                OTP
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                {...registerOtp("otp")}
                className="w-full border rounded-lg px-3 py-2 text-sm text-center tracking-widest outline-none focus:ring-2 focus:ring-blue-500"
              />

              {otpErrors.otp && (
                <p className="text-xs text-red-500 mt-1">
                  {otpErrors.otp.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 text-sm rounded-lg hover:bg-blue-700"
            >
              Verify OTP
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-xs text-gray-500 hover:text-blue-600"
            >
              Change email
            </button>
          </form>
        )}

        {/* -----------------------------
             STEP 3 — PASSWORD
        ----------------------------- */}

        {step === 3 && (
          <form
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
            className="space-y-3"
          >
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                {...registerPassword("password")}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              {passwordErrors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {passwordErrors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                {...registerPassword("confirmPassword")}
                className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />

              {passwordErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 text-sm rounded-lg hover:bg-blue-700"
            >
              Reset Password
            </button>
          </form>
        )}

        {/* Login */}

        <p className="text-center text-sm text-gray-600 mt-4">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;
