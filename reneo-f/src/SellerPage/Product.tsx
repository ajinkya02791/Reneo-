
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  Plus,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Package,
  Pencil,
  Eye,
} from "lucide-react";

import { useSeller, type ProductAtSellerSide } from "../contextAPI/sellerContext";
import { ProductSkeleton } from "../Componenets/ProductSkeleton";

type FilterState = {
  category: string;
  stock: string;
  sort: string;
};

const FALLBACK_IMAGE = "/src/assets/product-placeholder.png";

export default function SellerProducts() {
  const {
    products,
    productPagination,
    productsLoading,
    productError,
    fetchProducts,
  } = useSeller();

  // =========================
  // Page / search state
  // =========================

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Desktop/tablet/mobile page sizes
  const [limit, setLimit] = useState(8);

  // =========================
  // Filter state
  // =========================

  const [filters, setFilters] = useState<FilterState>({
    category: "",
    stock: "",
    sort: "newest",
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // =========================
  // Responsive page size
  // =========================

  useEffect(() => {
    const updateLimit = () => {
      if (window.innerWidth < 640) {
        setLimit(4);
      } else if (window.innerWidth < 1024) {
        setLimit(6);
      } else {
        setLimit(8);
      }
    };

    updateLimit();

    window.addEventListener("resize", updateLimit);

    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, []);

  // If page size changes, go back to first page.
  useEffect(() => {
    setPage(1);
  }, [limit]);

  // =========================
  // Debounced search
  // =========================

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // Fetch products
  // =========================

  useEffect(() => {
    fetchProducts({
      search: search.trim() || undefined,
      category: filters.category || undefined,
      sort: filters.sort || undefined,
      page,
      limit,
    });
  }, [
    search,
    filters.category,
    filters.sort,
    page,
    limit,
  ]);

  // =========================
  // Apply stock filter
  // =========================
  //
  // If your backend supports stock filtering,
  // add `stock` to ProductQuery and send it here.
  //
  // For now this is kept as a UI filter and
  // applied to the current returned products.
  //
  const displayedProducts = useMemo(() => {
    if (!filters.stock) {
      return products;
    }

    return products.filter((product) => {
      if (filters.stock === "in_stock") {
        return product.stock > 0;
      }

      if (filters.stock === "low_stock") {
        return product.stock > 0 && product.stock <= 5;
      }

      if (filters.stock === "out_of_stock") {
        return product.stock <= 0;
      }

      return true;
    });
  }, [products, filters.stock]);

    console.log(displayedProducts);
  // =========================
  // Filter helpers
  // =========================

  const updateFilter = (
    key: keyof FilterState,
    value: string
  ) => {
    setPage(1);

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setPage(1);

    setFilters({
      category: "",
      stock: "",
      sort: "newest",
    });
  };

  const hasFilters =
    filters.category !== "" ||
    filters.stock !== "" ||
    filters.sort !== "newest";

  // =========================
  // Pagination
  // =========================

  const totalPages = productPagination?.totalPages ?? 1;

  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <section className="w-full">

      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6 flex items-center justify-between gap-3">

        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your products and inventory.
          </p>
        </div>

        <Link
          to="/seller/products/new"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gray-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:px-4"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">
            Add Product
          </span>
          <span className="sm:hidden">
            Add
          </span>
        </Link>

      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="mb-5 flex gap-3">

        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />

        </div>

        {/* Mobile/tablet filter button */}
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
        >
          <Filter size={18} />
          <span className="hidden sm:inline">
            Filters
          </span>
        </button>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="flex items-start gap-6">

        {/* =========================
            DESKTOP FILTER SIDEBAR
        ========================= */}

        <aside className="hidden w-56 shrink-0 rounded-xl border border-gray-200 bg-white p-4 lg:block">

          <FilterContent
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
            hasFilters={hasFilters}
          />

        </aside>

        {/* =========================
            PRODUCTS
        ========================= */}

        <div className="min-w-0 flex-1">

          {/* Loading */}
          {productsLoading && (
            <ProductSkeleton limit={limit} />
          )}

          {/* Error */}
          {!productsLoading && productError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm font-medium text-red-700">
                {productError}
              </p>

              <button
                type="button"
                onClick={() =>
                  fetchProducts({
                    search: search.trim() || undefined,
                    category: filters.category || undefined,
                    sort: filters.sort || undefined,
                    page,
                    limit,
                  })
                }
                className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-100"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!productsLoading &&
            !productError &&
            displayedProducts?.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white px-6 py-14 text-center">

                <Package
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <h2 className="mt-4 text-base font-semibold text-gray-900">
                  No products found
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 text-sm font-medium text-gray-900 underline"
                  >
                    Clear filters
                  </button>
                )}

              </div>
            )}

          {/* Product grid */}
          {!productsLoading &&
            !productError &&
            displayedProducts.length > 0 && (
              <>

                <div
                  className="
                    grid grid-cols-1 gap-4
                    sm:grid-cols-2
                    lg:grid-cols-4
                  "
                >
                  {displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  canGoPrevious={canGoPrevious}
                  canGoNext={canGoNext}
                  onPrevious={() =>
                    setPage((prev) => Math.max(1, prev - 1))
                  }
                  onNext={() =>
                    setPage((prev) =>
                      Math.min(totalPages, prev + 1)
                    )
                  }
                  onPageChange={setPage}
                />

              </>
            )}

        </div>
      </div>

      {/* =========================
          MOBILE FILTER DRAWER
      ========================= */}

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 h-full w-[min(20rem,85vw)] overflow-y-auto bg-white shadow-xl">

            <div className="flex items-center justify-between border-b px-5 py-4">

              <h2 className="font-semibold text-gray-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-5">
              <FilterContent
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              />

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Apply Filters
              </button>
            </div>

          </aside>

        </div>
      )}

    </section>
  );
}

/* =====================================================
   FILTER CONTENT
===================================================== */

type FilterContentProps = {
  filters: FilterState;
  updateFilter: (
    key: keyof FilterState,
    value: string
  ) => void;
  clearFilters: () => void;
  hasFilters: boolean;
};

function FilterContent({
  filters,
  updateFilter,
  clearFilters,
  hasFilters,
}: FilterContentProps) {
  return (
    <div>

      <div className="flex items-center justify-between">

        <h2 className="text-sm font-semibold text-gray-900">
          Filters
        </h2>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-gray-500 hover:text-gray-900"
          >
            Clear
          </button>
        )}

      </div>

      {/* Category */}
      <div className="mt-5">

        <label
          htmlFor="category"
          className="mb-2 block text-xs font-medium text-gray-700"
        >
          Category
        </label>

        <select
          id="category"
          value={filters.category}
          onChange={(e) =>
            updateFilter("category", e.target.value)
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
        >
          <option value="">All categories</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="beauty">Beauty</option>
          <option value="food">Food</option>
          <option value="handmade">Handmade</option>
        </select>

      </div>

      {/* Stock */}
      <div className="mt-5">

        <label
          htmlFor="stock"
          className="mb-2 block text-xs font-medium text-gray-700"
        >
          Stock
        </label>

        <select
          id="stock"
          value={filters.stock}
          onChange={(e) =>
            updateFilter("stock", e.target.value)
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
        >
          <option value="">All stock</option>
          <option value="in_stock">In stock</option>
          <option value="low_stock">Low stock</option>
          <option value="out_of_stock">
            Out of stock
          </option>
        </select>

      </div>

      {/* Sort */}
      <div className="mt-5">

        <label
          htmlFor="sort"
          className="mb-2 block text-xs font-medium text-gray-700"
        >
          Sort by
        </label>

        <select
          id="sort"
          value={filters.sort}
          onChange={(e) =>
            updateFilter("sort", e.target.value)
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price_asc">
            Price: Low to High
          </option>
          <option value="price_desc">
            Price: High to Low
          </option>
          <option value="name_asc">
            Name: A-Z
          </option>
          <option value="name_desc">
            Name: Z-A
          </option>
        </select>

      </div>

    </div>
  );
}

/* =====================================================
   PRODUCT CARD
===================================================== */

function ProductCard({
  product,
}: {
  product: ProductAtSellerSide;
}) {
  const [imageSrc, setImageSrc] = useState(
    product.image || FALLBACK_IMAGE
  );

  useEffect(() => {
    setImageSrc(product.image || FALLBACK_IMAGE);
  }, [product.image]);

  const stockLabel =
    product.stock <= 0
      ? "Out of stock"
      : product.stock <= 5
        ? `Low stock · ${product.stock}`
        : `${product.stock} in stock`;

  const stockClass =
    product.stock <= 0
      ? "bg-red-50 text-red-700"
      : product.stock <= 5
        ? "bg-yellow-50 text-yellow-700"
        : "bg-green-50 text-green-700";

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md">

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">

        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover"
        />

      </div>

      {/* Content */}
      <div className="p-4">

        <h3 className="truncate text-sm font-semibold text-gray-900">
          {product.name}
        </h3>

        <p className="mt-1 text-base font-semibold text-gray-900">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        <span
          className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${stockClass}`}
        >
          {stockLabel}
        </span>

        {/* Actions */}
        <div className="mt-4 flex gap-2">

          <Link
            to={`/seller/products/${product.id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <Eye size={15} />
            View
          </Link>

          <Link
            to={`/seller/products/${product.id}/edit`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-900 px-2 py-2 text-xs font-medium text-white hover:bg-gray-800"
          >
            <Pencil size={15} />
            Edit
          </Link>

        </div>

      </div>

    </article>
  );
}

/* =====================================================
   PAGINATION
===================================================== */

type PaginationProps = {
  page: number;
  totalPages: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
};

function Pagination({
  page,
  totalPages,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-8 flex items-center justify-center gap-1">

      <button
        type="button"
        disabled={!canGoPrevious}
        onClick={onPrevious}
        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Show page numbers */}
      <div className="flex items-center gap-1">

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={`min-w-9 rounded-lg px-2 py-2 text-sm font-medium ${
              pageNumber === page
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        ))}

      </div>

      <button
        type="button"
        disabled={!canGoNext}
        onClick={onNext}
        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
}
