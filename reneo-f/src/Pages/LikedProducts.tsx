import { useProducts } from "../contextAPI/products";
import Product from "../Componenets/ProductCard";
import Pagination from "../Componenets/Pagination";

const LikePage = () => {
  const {
    products,
    page,
    setPage,
    productsPerPage,
    like
  } = useProducts();


//   // Get only liked products
//   const likedProducts = products.filter((product) =>
//     like.includes(product.id)
//   );
const likedProducts = like;
  // Pagination
  const startIndex = (page - 1) * productsPerPage;

  const currentProducts = likedProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="mb-6 text-2xl font-semibold">
        Liked Products
      </h1>

      {likedProducts.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mb-3 text-5xl">♡</div>

            <h2 className="text-xl font-semibold">
              No liked products
            </h2>

            <p className="mt-2 text-gray-500">
              Products you like will appear here.
            </p>
          </div>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"> 
          {likedProducts.map((product) => ( 
            <Product key={product.id} product={product} /> ))} 
          </div>

          <div className="mt-8">
            <Pagination
              page={page}
              setPage={setPage}
              filteredProducts={likedProducts}
              productsPerPage={productsPerPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LikePage;