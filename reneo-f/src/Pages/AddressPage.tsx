
import { useState } from "react";
import { ArrowLeft, MapPin, Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../contextAPI/products";


export default function CheckoutAddress() {
  const [selectedAddress, setSelectedAddress] = useState("address-1");

  const navigate = useNavigate();
  const { addresses } = useProducts();
  

  const handleContinue = () => {
    const address = addresses.find(
      (address) => address.id === selectedAddress
    );


    console.log("Selected address:", address);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back */}
        <button
          type="button"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Checkout
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Delivery Address
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Choose where you want your order delivered.
          </p>
        </div>

        {/* Saved Addresses */}
                <div className="space-y-4">
            {addresses.map((address) => {
                const isSelected = selectedAddress === address.id;

                return (
                <button
                    key={address.id}
                    type="button"
                    onClick={() => setSelectedAddress(address.id)}
                    className={`w-full rounded-xl border bg-white p-5 text-left transition ${
                    isSelected
                        ? "border-gray-900 ring-1 ring-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                >
                    <div className="flex gap-4">
                    {/* Selection */}
                    <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-300"
                        }`}
                    >
                        {isSelected && <Check size={13} strokeWidth={3} />}
                    </div>

                    {/* Address */}
                    <div className="min-w-0 flex-1">
                        {/* Label */}
                        <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-gray-900">
                            {address.label}
                        </h2>

                        {isSelected && (
                            <span className="text-xs font-medium text-gray-500">
                            Selected
                            </span>
                        )}
                        </div>

                        {/* Name */}
                        <p className="mt-2 text-sm font-medium text-gray-800">
                        {address.fullName}
                        </p>

                        {/* Address */}
                        <p className="mt-1 text-sm leading-6 text-gray-500">
                        {address.flatHouseNo}, {address.streetArea}
                        <br />
                        {address.city}, {address.district}
                        <br />
                        {address.state} - {address.pincode}
                        </p>

                        {/* Mobile */}
                        <p className="mt-1 text-sm text-gray-500">
                        +91 {address.mobile}
                        </p>
                    </div>

                    {/* Icon */}
                    <MapPin
                        size={19}
                        className={`hidden shrink-0 sm:block ${
                        isSelected ? "text-gray-900" : "text-gray-300"
                        }`}
                    />
                    </div>
                </button>
                );
            })}
            </div>
        {/* Add New Address */}
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-5 py-4 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:text-gray-900"
          onClick={() => navigate("/add-new-address")}
        >
          <Plus size={18} />
          Add New Address
        </button>

        {/* Continue */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedAddress}
            className="w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
