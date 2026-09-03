import type { Order } from "../types/orders";

export const orders: Order[] = [
    {
        id: "ORD-1001",
        createdAt: "Sep 3, 2026",
        status: "Shipped",
        deliveryFee: 0,
        deliveryAddress: "Nashik, Maharashtra",
        paymentMethod: "Razorpay",
        items: [
            {
                id: "1",
                productName: "Wireless Headphones",
                sellerName: "Tech Store",
                quantity: 1,
                price: 999,
            },
            {
                id: "2",
                productName: "USB-C Cable",
                sellerName: "Mobile Hub",
                quantity: 2,
                price: 250,
            },
        ],
    },
    {
        id: "ORD-1002",
        createdAt: "Aug 28, 2026",
        status: "Delivered",
        deliveryFee: 40,
        deliveryAddress: "Jalgaon, Maharashtra",
        paymentMethod: "Cash on Delivery",
        items: [
            {
                id: "3",
                productName: "Bluetooth Speaker",
                sellerName: "Sound World",
                quantity: 1,
                price: 799,
            },
        ],
    },
];
