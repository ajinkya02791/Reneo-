
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  CreditCard,
  MapPin,
  Package,
  Search,
  User,
} from "lucide-react";

import { demoOrders } from "../data/sellerOrders";
import type { OrderStatus } from "../types/orders";

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Processing: "bg-blue-50 text-blue-700 border-blue-200",
  Shipped: "bg-purple-50 text-purple-700 border-purple-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
};

export default function SellerOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");

  const filteredOrders = useMemo(() => {
    return demoOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your customer orders.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "All" | OrderStatus)
              }
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm outline-none focus:border-gray-400 sm:w-44"
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              {/* Card Header */}
              <div className="flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold text-gray-900">
                      #{order.id}
                    </h2>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                    <CalendarDays size={14} />
                    {order.date}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Package size={17} />
                  {order.items} {order.items === 1 ? "item" : "items"}
                </div>
              </div>

              {/* Three Main Sections */}
              <div className="grid grid-cols-1 divide-y divide-gray-100 py-5 md:grid-cols-3 md:divide-x md:divide-y-0">
                {/* Customer */}
                <div className="pb-5 md:px-5 md:pb-0 md:first:pl-0">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    <User size={15} />
                    Customer
                  </div>

                  <p className="font-medium text-gray-900">
                    {order.customerName}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {order.customerPhone}
                  </p>
                </div>

                {/* Delivery */}
                <div className="py-5 md:px-5 md:py-0">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    <MapPin size={15} />
                    Delivery
                  </div>

                  <p className="text-sm font-medium text-gray-900">
                    {order.address}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {order.city}, {order.state}
                  </p>

                  <p className="text-sm text-gray-500">{order.postcode}</p>
                </div>

                {/* Payment */}
                <div className="pt-5 md:px-5 md:pt-0 md:last:pr-0">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    <CreditCard size={15} />
                    Payment
                  </div>

                  <p className="font-medium text-gray-900">
                    {order.paymentMethod}
                  </p>

                  <p
                    className={`mt-1 text-sm ${
                      order.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-sm text-gray-500">Order total</span>
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{order.total.toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  View Order
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
              <Package className="mx-auto text-gray-300" size={40} />

              <h3 className="mt-3 font-medium text-gray-900">
                No orders found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
