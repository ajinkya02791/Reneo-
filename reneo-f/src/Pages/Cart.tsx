
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../contextAPI/products";



const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

export default function CartPage() {
  const navigate = useNavigate();

  const { cart, setCart } = useProducts();

  const updateQuantity = (id: string, change: number) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id !== id) return item;

        const newQuantity = item.quantity + change;

        if (newQuantity < 1) return item;
        if (newQuantity > item.availableStock) return item;

        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );
  };

  const removeItem = (id: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
              🛒
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-2 text-gray-500">
              Browse products and add something to your cart.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/products")}
            className="mb-4 text-sm text-gray-500 transition hover:text-gray-900"
          >
            ← Continue Shopping
          </button>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Cart
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <section className="space-y-4">
            {cart.map((item) => {
              const itemTotal = item.price * item.quantity;
              const isMaxQuantity =
                item.quantity >= item.availableStock;

              return (
                <article
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-28">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="line-clamp-2 font-semibold text-gray-900">
                            {item.name}
                          </h2>

                          <p className="mt-1 text-sm text-gray-500">
                            {formatPrice(item.price)} each
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 text-sm text-red-500 transition hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-5 flex items-end justify-between gap-4">
                        {/* Quantity */}
                        <div>
                          <p className="mb-1 text-xs text-gray-500">
                            Quantity
                          </p>

                          <div className="flex h-9 items-center rounded-lg border border-gray-300">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, -1)
                              }
                              disabled={item.quantity <= 1}
                              className="flex h-full w-9 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              −
                            </button>

                            <span className="flex h-full w-9 items-center justify-center border-x border-gray-300 text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.id, 1)
                              }
                              disabled={isMaxQuantity}
                              className="flex h-full w-9 items-center justify-center text-lg text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>

                          {isMaxQuantity && (
                            <p className="mt-1 text-xs text-orange-600">
                              Maximum available stock
                            </p>
                          )}
                        </div>

                        {/* Item Total */}
                        <p className="font-semibold text-gray-900">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  Items ({totalItems})
                </span>

                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>

                <span className="text-gray-500">
                  Calculated next
                </span>
              </div>

              <div className="my-4 border-t border-gray-200" />

              <div className="flex justify-between text-base font-semibold text-gray-900">
                <span>Total</span>

                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/address")}
              className="mt-6 w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Proceed to Address
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Delivery charges will be calculated after you provide
              your address.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
