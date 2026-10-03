
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Store,
  LogOut
} from "lucide-react";
import { useAuth } from "../contextAPI/auth";

const menuItems = [
  {
    label: "Dashboard",
    path: "/seller/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/seller/products",
    icon: Package,
  },
  {
    label: "Orders",
    path: "/seller/orders",
    icon: ShoppingCart,
  },
];

export default function SellerLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
   try {
     signOut()
     navigate("/login");
   } catch (error) {
    console.log(error);
   }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= MOBILE HEADER ================= */}
      <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="ml-3 flex items-center gap-2">
          <Store size={22} />
          <span className="font-semibold text-gray-900">
            Seller Dashboard
          </span>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen flex-col
          border-r bg-white transition-all duration-300

          ${collapsed ? "w-20" : "w-64"}

          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:block
        `}
      >

        {/* ================= SIDEBAR HEADER ================= */}
        <div className="flex h-16 items-center border-b px-4">

          {!collapsed && (
            <div className="flex flex-1 items-center gap-2">
              <Store size={22} />
              <span className="font-semibold text-gray-900">
                Seller Panel
              </span>
            </div>
          )}

          {/* Desktop collapse button */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:block"
            aria-label={
              collapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 space-y-1 p-3">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center rounded-lg px-3 py-2.5
                  text-sm font-medium transition-colors

                  ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }

                  ${collapsed ? "justify-center" : "gap-3"}
                  `
                }
              >
                <Icon size={20} className="shrink-0" />

                {!collapsed && (
                  <span>{item.label}</span>
                )}
              </NavLink>
            );
          })}

        </nav>

        <div className="mt-auto border-t border-gray-200 pt-4">
        {/* Seller */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 font-semibold text-gray-700">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              Amina Crafts
            </p>
            <p className="text-xs text-gray-500">
              Seller
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className={`
          min-h-screen transition-all duration-300

          ${collapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
