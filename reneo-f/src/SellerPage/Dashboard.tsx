import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSeller } from "../contextAPI/sellerContext";

const SellerHome = () => {
  const {
    dashboard,
    dashboardLoading,
    dashboardError,
    fetchDashboard,
  } = useSeller();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (dashboardLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  if (dashboardError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {dashboardError}
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your shop.
          </p>
        </div>

        <Link
          to="/seller/products/new"
          className="inline-flex w-fit items-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={dashboard.stats.totalOrdersThisMonth}
          subtitle="This month"
        />

        <StatCard
          title="Revenue"
          value={`₹${dashboard.stats.revenueThisMonth.toLocaleString()}`}
          subtitle="This month"
        />

        <StatCard
          title="Products Listed"
          value={dashboard.stats.totalProducts}
          subtitle="Active products"
        />

        <StatCard
          title="Orders To Deliver"
          value={dashboard.stats.ordersToDeliver}
          subtitle="Need attention"
        />
      </div>

      {/* Sales + Inventory */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Sales Overview */}
        <section className="rounded-xl border bg-white p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Sales Overview
              </h2>

              <p className="text-sm text-gray-500">
                Revenue over the last 30 days
              </p>
            </div>
          </div>

          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
            <p className="text-sm text-gray-400">
              Revenue chart goes here
            </p>
          </div>
        </section>

        {/* Inventory Alerts */}
        <section className="rounded-xl border bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Inventory Alerts
              </h2>

              <p className="text-sm text-gray-500">
                Products needing attention
              </p>
            </div>

            <Link
              to="/seller/products"
              className="text-sm font-medium text-gray-700 hover:underline"
            >
              View all
            </Link>
          </div>

          {dashboard.lowStockProducts.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No inventory alerts.
            </p>
          ) : (
            <div className="space-y-4">
              {dashboard.lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {product.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {product.stock === 0
                        ? "Out of stock"
                        : `${product.stock} left`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Recent Orders */}
      <section className="rounded-xl border bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Orders
            </h2>

            <p className="text-sm text-gray-500">
              Your latest customer orders
            </p>
          </div>

          <Link
            to="/seller/orders"
            className="text-sm font-medium text-gray-700 hover:underline"
          >
            View all
          </Link>
        </div>

        {dashboard.recentOrders.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No recent orders.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Quantity</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="h-10 w-10 rounded-md object-cover"
                        />

                        <span className="text-sm text-gray-700">
                          {order.productName}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 text-sm text-gray-600">
                      {order.quantity}
                    </td>

                    <td className="py-4 text-sm font-medium text-gray-900">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
    </div>
  );
};

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
};

const StatCard = ({
  title,
  value,
  subtitle,
}: StatCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-2 text-2xl font-semibold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};

export default SellerHome;