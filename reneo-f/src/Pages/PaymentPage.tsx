
import { useState } from "react";
import {
  ArrowLeft,
  Banknote,
  Check,
  ChevronRight,
  CreditCard,
  Smartphone,
} from "lucide-react";

type PaymentMethod = "upi" | "card" | "cod";

const paymentMethods = [
  {
    id: "upi" as const,
    title: "UPI",
    description: "Pay using your preferred UPI app",
    icon: Smartphone,
  },
  {
    id: "card" as const,
    title: "Debit / Credit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "cod" as const,
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
];

export default function CheckoutPayment() {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("upi");

  const subtotal = 2150;
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    console.log("Payment method:", paymentMethod);

    // Later:
    // UPI/Card → payment provider
    // COD → create order directly
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <button
          type="button"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back to Address
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Payment
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Choose a payment method to complete your order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* Payment Methods */}
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const isSelected = paymentMethod === method.id;
              const Icon = method.icon;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full rounded-xl border bg-white p-5 text-left transition ${
                    isSelected
                      ? "border-gray-900 ring-1 ring-gray-900"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Radio */}
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <Check size={13} strokeWidth={3} />
                      )}
                    </div>

                    {/* Icon */}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900">
                        {method.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {method.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={18}
                      className={
                        isSelected
                          ? "text-gray-900"
                          : "text-gray-300"
                      }
                    />
                  </div>
                </button>
              );
            })}

            {/* Selected Payment Information */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              {paymentMethod === "upi" && (
                <div>
                  <h2 className="font-medium text-gray-900">
                    UPI Payment
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    You will be redirected to the payment provider
                    to complete your UPI payment securely.
                  </p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div>
                  <h2 className="font-medium text-gray-900">
                    Card Payment
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    You will be redirected to the payment provider
                    to enter your card details securely.
                  </p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <div>
                  <h2 className="font-medium text-gray-900">
                    Cash on Delivery
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Pay ₹{total.toLocaleString("en-IN")} in cash when
                    your order is delivered.
                  </p>

                  <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                    Please keep the exact amount ready if possible.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-5 lg:sticky lg:top-6">
            <h2 className="font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">
                    Total
                  </span>

                  <span className="text-lg font-semibold text-gray-900">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="mt-6 w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              {paymentMethod === "cod"
                ? "Place Order"
                : "Continue to Payment"}
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Your payment information is securely processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
