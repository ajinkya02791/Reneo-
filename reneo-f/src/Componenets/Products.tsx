import { useNavigate } from 'react-router-dom';
import type { Product } from '../types/Products'

type ProductPage = {
    filteredProducts: Product[];
    productsPerPage: number;
    page: number;
}


function Products( {filteredProducts, productsPerPage , page} : ProductPage ) {


  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );


  const navigate = useNavigate();
  const viewProduct = (id:number) => {
    
    navigate(`/products/${id}`);
  }

  return (
    <>

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


     {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedProducts.map((product: Product) => (
                  <article
                    key={product.id}

                    onClick={() => viewProduct(product.id)}
                    className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm backdrop-blur hover:bg-white">
                        ♡
                      </button>
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-gray-500">
                        {product.category}
                      </p>

                      <h3 className="mt-1 line-clamp-2 text-sm font-medium">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-xs text-gray-500">
                        by {product.seller}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-semibold">
                          ${product.price}
                        </span>

                        <button className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-700">
                          Add
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border bg-white py-20 text-center">
                <p className="font-medium">No products found</p>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
    </>
  )
}

export default Products