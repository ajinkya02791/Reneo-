
import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import type { Product } from "../types/Products";
import { demoProducts } from "../data/products";

type ProductsContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    productsPerPage: number;    
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
};

const ProductsContext = createContext<ProductsContextType | undefined>(
    undefined
);



export const ProductsProvider = () => {
  // state and functions here
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(demoProducts)

  const productsPerPage = 4;

  return (
    <ProductsContext.Provider
      value={{
        search, setSearch, page, setPage, productsPerPage, products, setProducts
    }}
    >
        <Outlet />
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductsProvider"
    );
  }

  return context;
};
