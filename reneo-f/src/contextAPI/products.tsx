
import React, { createContext, useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { Product } from "../types/Products";
import { demoProducts } from "../data/products";
import type { CartItem } from "../types/cart";
import { initialCart } from "../data/cart";
import type { ToastProps, ToastType } from "../types/toast";




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
    toast: ToastProps | null,
    setToast: React.Dispatch<React.SetStateAction<ToastProps | null>>,
    showToast: (message : string, type?: ToastType ) => void 
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
  const [toast, setToast] = useState<ToastProps | null>(null);

  const productsPerPage = 4;


    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    setToast({ message, type });
  };



  
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
        setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
}, [toast]);

  return (
    <ProductsContext.Provider
      value={{
        search, setSearch, page, setPage, productsPerPage, products,
         setProducts, handleSearch, cart, setCart, toast, setToast, showToast
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
