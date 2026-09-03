
import { useState } from "react";
import type { Order } from "../types/orders";
import { orders } from "../data/orders";


const getStatusClass = (status: Order["status"]) => {
    switch (status) {
        case "Delivered":
            return "bg-green-50 text-green-600";
        case "Shipped":
            return "bg-blue-50 text-blue-600";
        case "Processing":
            return "bg-yellow-50 text-yellow-600";
        case "Cancelled":
            return "bg-red-50 text-red-600";
        default:
            return "bg-gray-100 text-gray-600";
    }
};

const OrderPage = () => {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6">
            <div className="mx-auto max-w-2xl">

                {/* Page Header */}
                <div className="mb-5">
                    <h1 className="text-xl font-semibold text-gray-900">
                        My Orders
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View your recent orders and their details.
                    </p>
                </div>

                {/* Empty State */}
                {orders.length === 0 ? (
                    <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
                        <div className="mb-3 text-4xl">📦</div>

                        <h2 className="font-semibold text-gray-900">
                            No orders yet
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your orders will appear here after you make a
                            purchase.
                        </p>

                        <button
                            type="button"
                            className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {orders.map((order) => {
                            const isExpanded =
                                expandedOrder === order.id;

                            const subtotal = order.items.reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0
                            );

                            const total =
                                subtotal + order.deliveryFee;

                            return (
                                <div
                                    key={order.id}
                                    className="overflow-hidden rounded-xl border bg-white shadow-sm"
                                >
                                    {/* Order Header */}
                                    <div className="flex items-center justify-between px-4 py-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {order.id}
                                            </p>

                                            <p className="mt-0.5 text-xs text-gray-500">
                                                {order.createdAt}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>

                                    {/* Products */}
                                    <div className="space-y-2 px-4 pb-3">
                                        {order.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                                            >
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-medium text-gray-800">
                                                        {item.productName}
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-gray-500">
                                                        {item.sellerName} · Qty{" "}
                                                        {item.quantity}
                                                    </p>
                                                </div>

                                                <p className="ml-3 shrink-0 text-sm font-medium text-gray-800">
                                                    ₹
                                                    {item.price *
                                                        item.quantity}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Basic Footer */}
                                    <div className="flex items-center justify-between border-t px-4 py-3">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Total
                                            </p>

                                            <p className="text-sm font-semibold text-gray-900">
                                                ₹{total}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setExpandedOrder(
                                                    isExpanded
                                                        ? null
                                                        : order.id
                                                )
                                            }
                                            className="rounded-lg border px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                                        >
                                            {isExpanded
                                                ? "Hide Details"
                                                : "View Details"}
                                        </button>
                                    </div>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="border-t bg-gray-50 px-4 py-4">

                                            {/* Order Summary */}
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    Order Summary
                                                </h3>

                                                <div className="mt-2 space-y-1.5 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">
                                                            Subtotal
                                                        </span>

                                                        <span className="text-gray-800">
                                                            ₹{subtotal}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">
                                                            Delivery
                                                        </span>

                                                        <span className="text-gray-800">
                                                            {order.deliveryFee ===
                                                            0
                                                                ? "Free"
                                                                : `₹${order.deliveryFee}`}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between border-t pt-2 font-semibold">
                                                        <span>
                                                            Total
                                                        </span>

                                                        <span>
                                                            ₹{total}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery */}
                                            <div className="mt-4 border-t pt-4">
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    Delivery Address
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-600">
                                                    {order.deliveryAddress}
                                                </p>
                                            </div>

                                            {/* Payment */}
                                            <div className="mt-4 border-t pt-4">
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    Payment
                                                </h3>

                                                <p className="mt-1 text-sm text-gray-600">
                                                    {order.paymentMethod}
                                                </p>
                                            </div>

                                            {/* Order Status */}
                                            <div className="mt-4 border-t pt-4">
                                                <h3 className="text-sm font-semibold text-gray-900">
                                                    Order Status
                                                </h3>

                                                <p
                                                    className={`mt-1 w-fit rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default OrderPage;
