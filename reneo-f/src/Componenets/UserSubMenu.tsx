
import { useEffect, useRef, useState } from "react";
import { ChevronDown, User, Package, Heart, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contextAPI/auth";

export default function UserMenu() {
  const { user, signOut } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  const name =
    user.user_metadata?.name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "User";

  const initial = name.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setOpen(false);
    await signOut();
  };

  return (
    <div ref={menuRef} className="relative">

      {/* User button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100"
      >
        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
          {initial}
        </div>

        {/* Name */}
        <span className="max-w-28 truncate text-sm font-medium text-gray-800">
          {name}
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border bg-white shadow-lg">

          {/* User info */}
          <div className="border-b px-4 py-3">
            <p className="truncate text-sm font-semibold text-gray-900">
              {name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <div className="p-1">

            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User size={18} />
              Profile
            </Link>

            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Package size={18} />
              My Orders
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Heart size={18} />
              Wishlist
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
