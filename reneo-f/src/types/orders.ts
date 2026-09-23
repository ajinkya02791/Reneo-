export type OrderItem = {
    id: string;
    productName: string;
    sellerName: string;
    quantity: number;
    price: number;
};

export type Order = {
    id: string;
    createdAt: string;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    items: OrderItem[];
    deliveryFee: number;
    deliveryAddress: string;
    paymentMethod: string;
};


export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

export type SellerOrder = {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  paymentMethod: "UPI" | "Card" | "COD";
  paymentStatus: "Paid" | "Pending";
  status: OrderStatus;
  items: number;
  total: number;
  date: string;
};
