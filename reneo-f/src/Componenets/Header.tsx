import { Link, useNavigate } from "react-router-dom"

function Header() {

  const navigate = useNavigate();
  

  return (
      <header className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-2xl font-bold tracking-tight">
            Reneo
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            
            <Link className="text-sm font-medium hover:text-gray-600" to={"/"}>
              Home
            </Link>
            <Link className="text-sm font-medium hover:text-gray-600" to={"/products/"}>
              Products
            </Link>
            <Link className="text-sm font-medium hover:text-gray-600" to={"/orders/"}>
              Orders
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-gray-100">
              ♡
            </button>

            <button className="rounded-lg p-2 hover:bg-gray-100" onClick={() => navigate("/cart")}>
              🛒
            </button>

            <button className="hidden rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50 sm:block">
              Login
            </button>
          </div>
        </div>
      </header>

  )
}

export default Header