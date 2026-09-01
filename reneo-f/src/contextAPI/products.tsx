
import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import type { Product } from "../types/Products";
import { demoProducts } from "../data/products";
import type { CartItem } from "../types/cart";
import { initialCart } from "../data/cart";

type ProductsContextType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    productsPerPage: number;    
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
    handleSearch: (value: string) => void;
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
};

const ProductsContext = createContext<ProductsContextType | undefined>(
    undefined
);



export const ProductsProvider = () => {
  // state and functions here
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState(demoProducts)
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  

  const productsPerPage = 4;


    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };


  return (
    <ProductsContext.Provider
      value={{
        search, setSearch, page, setPage, productsPerPage, products, setProducts, handleSearch, cart, setCart
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
