import { useProducts } from "../contextAPI/products";

function Search() {

    const { handleSearch, search } = useProducts();

  return (
    <div className="relative mx-auto max-w-2xl">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            ⌕
          </span>

          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

  )
}

export default Search