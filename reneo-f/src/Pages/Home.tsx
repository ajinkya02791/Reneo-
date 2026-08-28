import { useMemo, useState } from "react";
import Hero from "../Componenets/Hero";
import Products from "../Componenets/Products";
import { products } from "../data/products";
import Pagination from "../Componenets/Pagination";



const categories = ["All", "Fashion", "Home", "Beauty", "Accessories"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const productsPerPage = 4;

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);

      return b.id - a.id;
    });

    return result;
  }, [search, category, sort]);



  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
    setShowFilters(false);
  };

  const handleSort = (value: string) => {
    setSort(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
        <Hero />
     
      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search */}
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

        {/* Mobile controls */}
        <div className="mt-6 flex gap-3 md:hidden">
          <button
            onClick={() => setShowFilters(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium"
          >
            ☰ Filters
          </button>

          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
            className="flex-1 rounded-lg border bg-white px-3 py-2.5 text-sm outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="mt-8 flex gap-8">
          {/* Desktop filters */}
          <aside className="hidden w-56 shrink-0 md:block">
            <div className="sticky top-24 rounded-xl border bg-white p-5">
              <h2 className="font-semibold">Filters</h2>

              <div className="mt-6">
                <h3 className="text-sm font-medium">Category</h3>

                <div className="mt-3 space-y-2">
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleCategory(item)}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                        category === item
                          ? "bg-gray-900 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium">Sort by</h3>

                <select
                  value={sort}
                  onChange={(e) => handleSort(e.target.value)}
                  className="mt-3 w-full rounded-lg border px-3 py-2 text-sm outline-none"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">
                    Price: Low to High
                  </option>
                  <option value="price-high">
                    Price: High to Low
                  </option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products */}
          
          <section className="min-w-0 flex-1">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Explore products
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {filteredProducts.length} products found
                </p>
              </div>
            </div>

           <Products filteredProducts={filteredProducts} productsPerPage={productsPerPage} page={page} /> 

            {/* Pagination */}

            <Pagination filteredProducts={filteredProducts} productsPerPage={productsPerPage} setPage={setPage} page={page} /> 

           </section>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />

          <aside className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>

              <button
                onClick={() => setShowFilters(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => handleCategory(item)}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-sm ${
                    category === item
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}


    </div>
  );
}