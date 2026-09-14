import {
  createContext,
  useContext,
  useState,
} from "react";
import api from "../lib/axiosInstance";
import { Outlet } from "react-router-dom";
import { sellerDashboardMock } from "../data/dashboard";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
};

export type Order = {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  paymentMethod: "upi" | "card" | "cod";
  status: "To Ship" | "Processing" | "Delivered"
  createdAt: string;
};

export type ProductQuery = {
  search?: string;
  category?: string;
  sort?: string;
  page: number;
  limit: number;
};

export type OrderQuery = {
  search?: string;
  status?: string;
  sort?: string;
  page: number;
  limit: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type DashboardStats = {
  totalOrdersThisMonth: number;
  revenueThisMonth: number;
  totalProducts: number;
  ordersToDeliver: number;
};

type SalesOverview = {
  date: string;
  revenue: number;
  orders: number;
};

export type SellerDashboard = {
  stats: DashboardStats;
  salesOverview: SalesOverview[];
  recentOrders: Order[];
  lowStockProducts: Product[];
};

type SellerContextType = {
  // Products
  products: Product[];
  productPagination: Pagination | null;
  productsLoading: boolean;
  productError: string | null;

  // Orders
  orders: Order[];
  orderPagination: Pagination | null;
  ordersLoading: boolean;
  orderError: string | null;

  // Dashboard
  dashboard: SellerDashboard | null;
  dashboardLoading: boolean;
  dashboardError: string | null;

  // Functions
  fetchProducts: (query: ProductQuery) => Promise<void>;
  fetchOrders: (query: OrderQuery) => Promise<void>;
  fetchDashboard: () => Promise<void>;
};

const SellerContext = createContext<SellerContextType | undefined>(
  undefined
);

export const SellerProvider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productPagination, setProductPagination] =
    useState<Pagination | null>(null);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);
  const [orderPagination, setOrderPagination] =
    useState<Pagination | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  
  const [dashboard, setDashboard] =
  useState<SellerDashboard | null>(null);
  
  const [dashboardLoading, setDashboardLoading] =
  useState(false);
  
  const [dashboardError, setDashboardError] =
  useState<string | null>(null);


  const fetchDashboard = async () => {
  setDashboardLoading(true);
  setDashboardError(null);

  try {
    // const response = await api.get("/seller/dashboard");

    // setDashboard(response.data);
    setDashboard(sellerDashboardMock);
  } catch (error) {
    console.error("Failed to fetch dashboard:", error);

    setDashboardError("Unable to load dashboard.");
  } finally {
    setDashboardLoading(false);
  }
};

  const fetchProducts = async (query: ProductQuery) => {
    setProductsLoading(true);
    setProductError(null);


    try {
      const response = await api.get("/seller/products", {
        params: query,
      });

      setProducts(response.data.products);
      setProductPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch products:", error);

      setProductError("Unable to load products.");
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchOrders = async (query: OrderQuery) => {
    setOrdersLoading(true);
    setOrderError(null);

    try {
      const response = await api.get("/seller/orders", {
        params: query,
      });

      setOrders(response.data.orders);
      setOrderPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch orders:", error);

      setOrderError("Unable to load orders.");
    } finally {
      setOrdersLoading(false);
    }
  };

  return (
    <SellerContext.Provider
      value={{
        products,
        productPagination,
        productsLoading,
        productError,

        orders,
        orderPagination,
        ordersLoading,
        orderError,

        fetchProducts,
        fetchOrders,
        dashboard,
        dashboardLoading,
        dashboardError,
        fetchDashboard,
      }}
    >
      <Outlet />
    </SellerContext.Provider>
  );
};

export const useSeller = () => {
  const context = useContext(SellerContext);

  if (!context) {
    throw new Error("useSeller must be used inside SellerProvider");
  }

  return context;
};