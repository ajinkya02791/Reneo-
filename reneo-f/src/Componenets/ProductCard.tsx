import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Products"; 
type LikeProductProps = { product: Product; }; 
const LikeProduct = ({ product }: LikeProductProps) => { 

  const navigate = useNavigate();

  return ( 
  <article className="w-full max-w-[220px] overflow-hidden rounded-lg border bg-white shadow-sm"
    onClick={() => navigate(`/products/${product.id}`)}> 
  {/* Product Image */} 
  <div className="aspect-square overflow-hidden"> 
    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" /> 
  </div> {/* Product Details */} 
    <div className="p-3"> 
      <p className="text-xs text-gray-500">
       {product.category} </p>
        <h2 className="mt-1 truncate text-sm font-semibold"> {product.name} </h2> 
        <p className="mt-1 text-base font-bold"> ${product.price} </p> 
        <p className="mt-1 truncate text-xs text-gray-500"> {product.shop.name} </p> 
      </div> 
    </article> );
}
export default LikeProduct;