
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../contextAPI/auth";
import { supabase } from "../lib/supabase";
import api from "../lib/axiosInstance";

const sellerOnboardingSchema = z.object({
  mobile: z
    .string()
    .trim()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number is too long")
    .regex(/^\+?[0-9\s-]+$/, "Enter a valid mobile number"),

  shopName: z
    .string()
    .trim()
    .min(2, "Shop name must be at least 2 characters")
    .max(100, "Shop name is too long"),

  plotFlatNo: z
    .string()
    .trim()
    .min(1, "Plot / Flat number is required")
    .max(50, "Plot / Flat number is too long"),

  streetName: z
    .string()
    .trim()
    .min(2, "Street name is required")
    .max(150, "Street name is too long"),

  city: z
    .string()
    .trim()
    .min(2, "City is required")
    .max(100, "City name is too long"),

  district: z
    .string()
    .trim()
    .min(2, "District is required")
    .max(100, "District name is too long"),

  state: z
    .string()
    .trim()
    .min(2, "State is required")
    .max(100, "State name is too long"),

  postCode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit post code"),
});

type SellerOnboardingFormData = z.infer<typeof sellerOnboardingSchema>;

const SellerOnboarding = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [profileName, setProfileName] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SellerOnboardingFormData>({
    resolver: zodResolver(sellerOnboardingSchema),
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfileLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id", user.id)
        .single();

      if (error) {
        setServerError("Unable to load your profile.");
        setProfileLoading(false);
        return;
      }

      setProfileName(data.name);
      setProfileLoading(false);
    };

    loadProfile();
  }, [user]);

  const onSubmit = async (data: SellerOnboardingFormData) => {
    setServerError("");

    try {
      const response = await api.post("/seller/onboarding", data);

      console.log(response.data);

      navigate("/seller", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ||
            "Unable to complete seller onboarding."
        );
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 mx-5">
      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Complete Seller Setup
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add your shop information to start selling.
          </p>
        </div>

        {serverError && (
          <div className="mb-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Basic Information */}
          <div>
            <h2 className="mb-4 text-base font-medium">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Name
                </label>

                <input
                  type="text"
                  value={profileName}
                  readOnly
                  className="w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-600"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={user?.email ?? ""}
                  readOnly
                  className="w-full rounded-md border bg-gray-100 px-3 py-2 text-gray-600"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Mobile
                </label>

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  {...register("mobile")}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                />

                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {/* Shop Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Shop Name
                </label>

                <input
                  type="text"
                  placeholder="Enter shop name"
                  {...register("shopName")}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                />

                {errors.shopName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.shopName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shop Address */}
          <div>
            <h2 className="mb-4 text-base font-medium">
              Shop Address
            </h2>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Plot / Flat No. */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Plot / Flat No.
                </label>

                <input
                  type="text"
                  placeholder="e.g. Flat 12 / Plot 24"
                  {...register("plotFlatNo")}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                />

                {errors.plotFlatNo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.plotFlatNo.message}
                  </p>
                )}
              </div>

              {/* Street Name */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Street Name
                </label>

                <input
                  type="text"
                  placeholder="Enter street name"
                  {...register("streetName")}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                />

                {errors.streetName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.streetName.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  City
                </label>

                <input
                  type="text"
                  placeholder="Enter city"
                  {...register("city")}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                />

                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  District
                </label>

                <input
                  type="text"
                  placeholder="Enter district"
                  {...register("district")}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                />

                {errors.district && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  State
                </label>

                <input
                  type="text"
                  placeholder="Enter state"
                  {...register("state")}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                />

                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.state.message}
                  </p>
                )}
              </div>

              {/* Post Code */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Post Code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 6-digit post code"
                  {...register("postCode")}
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                />

                {errors.postCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.postCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-black px-4 py-2.5 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Completing Setup..."
              : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerOnboarding;
