import React, { type SetStateAction } from "react";
import type { Product } from "../types/Products";

type PaginationPage = {
    filteredProducts: Product[];
    productsPerPage: number;
    setPage: React.Dispatch<SetStateAction<number>>
    page: number
}

function Pagination({ filteredProducts, productsPerPage, setPage , page} : PaginationPage) {

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );


  return (
    <>
      {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-lg border bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ←
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`h-9 w-9 rounded-lg text-sm ${
                      page === pageNumber
                        ? "bg-gray-900 text-white"
                        : "border bg-white hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </div>
            )}
        </>
  )
}

export default Pagination