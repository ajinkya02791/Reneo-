
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

const addressSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  flatHouseNo: z
    .string()
    .min(1, "Flat / House No. is required")
    .max(50, "Flat / House No. is too long"),

  streetArea: z
    .string()
    .min(2, "Street / Area is required")
    .max(120, "Street / Area is too long"),

  city: z
    .string()
    .min(2, "City is required")
    .max(50, "City is too long"),

  district: z
    .string()
    .min(2, "District is required")
    .max(50, "District is too long"),

  state: z
    .string()
    .min(2, "State is required")
    .max(50, "State is too long"),

  pincode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode"),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function AddNewAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      flatHouseNo: "",
      streetArea: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
  });

  const onSubmit = async (data: AddressFormData) => {
    console.log("Address:", data);

    // Later:
    // 1. Save address to Supabase
    // 2. Select the newly created address
    // 3. Navigate to payment
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Back */}
        <button
          type="button"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Addresses
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Add New Address
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Enter your delivery details.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="space-y-5">
            {/* Full Name */}
            <FormField
              label="Full Name"
              required
              error={errors.fullName?.message}
            >
              <input
                {...register("fullName")}
                type="text"
                placeholder="Enter full name"
                className={inputClass(!!errors.fullName)}
              />
            </FormField>

            {/* Mobile */}
            <FormField
              label="Mobile Number"
              required
              error={errors.mobile?.message}
            >
              <div className="flex">
                <span className="flex items-center rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
                  +91
                </span>

                <input
                  {...register("mobile")}
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className={`${inputClass(
                    !!errors.mobile
                  )} rounded-l-none`}
                />
              </div>
            </FormField>

            {/* Flat / House */}
            <FormField
              label="Flat / House No."
              required
              error={errors.flatHouseNo?.message}
            >
              <input
                {...register("flatHouseNo")}
                type="text"
                placeholder="e.g. Flat 204 / House No. 12"
                className={inputClass(!!errors.flatHouseNo)}
              />
            </FormField>

            {/* Street / Area */}
            <FormField
              label="Street / Area"
              required
              error={errors.streetArea?.message}
            >
              <input
                {...register("streetArea")}
                type="text"
                placeholder="e.g. MG Road, Near City Center"
                className={inputClass(!!errors.streetArea)}
              />
            </FormField>

            {/* City + District */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                label="City"
                required
                error={errors.city?.message}
              >
                <input
                  {...register("city")}
                  type="text"
                  placeholder="Enter city"
                  className={inputClass(!!errors.city)}
                />
              </FormField>

              <FormField
                label="District"
                required
                error={errors.district?.message}
              >
                <input
                  {...register("district")}
                  type="text"
                  placeholder="Enter district"
                  className={inputClass(!!errors.district)}
                />
              </FormField>
            </div>

            {/* State + Pincode */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                label="State"
                required
                error={errors.state?.message}
              >
                <input
                  {...register("state")}
                  type="text"
                  placeholder="Enter state"
                  className={inputClass(!!errors.state)}
                />
              </FormField>

              <FormField
                label="Pincode"
                required
                error={errors.pincode?.message}
              >
                <input
                  {...register("pincode")}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit pincode"
                  className={inputClass(!!errors.pincode)}
                />
              </FormField>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

function FormField({
  label,
  required,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-gray-200 focus:border-gray-900"
  }`;
}