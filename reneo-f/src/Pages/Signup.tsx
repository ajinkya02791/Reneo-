
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";

const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["customer", "seller"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "customer",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setServerError("");
    setIsSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: data.role,
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      setServerError(error.message);
      return;
    }

    navigate("/verify-email");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-md">
        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Create Account
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-900"
            />

            {errors.name && (
              <p className="mt-0.5 text-[11px] text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-900"
            />

            {errors.email && (
              <p className="mt-0.5 text-[11px] text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register("password")}
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-900"
            />

            {errors.password && (
              <p className="mt-0.5 text-[11px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className="h-9 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-gray-900"
            />

            {errors.confirmPassword && (
              <p className="mt-0.5 text-[11px] text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <p className="mb-1.5 text-xs font-medium text-gray-700">
              Account Type
            </p>

            <div className="grid grid-cols-2 gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="customer"
                  {...register("role")}
                  className="peer sr-only"
                />

                <div className="rounded-md border border-gray-300 px-2 py-2 text-center text-xs transition peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:text-white">
                  Customer
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="seller"
                  {...register("role")}
                  className="peer sr-only"
                />

                <div className="rounded-md border border-gray-300 px-2 py-2 text-center text-xs transition peer-checked:border-gray-900 peer-checked:bg-gray-900 peer-checked:text-white">
                  Seller
                </div>
              </label>
            </div>
          </div>

          {/* Error */}
          {serverError && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600">
              {serverError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-9 w-full rounded-md bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-gray-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
