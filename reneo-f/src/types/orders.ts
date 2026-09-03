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


