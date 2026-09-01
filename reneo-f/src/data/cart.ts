import type { CartItem } from "../types/cart";

export const initialCart: CartItem[] = [
  {
    id: "1",
    name: "Handmade African Basket",
    price: 1200,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    quantity: 2,
    availableStock: 5,
  },
  {
    id: "2",
    name: "Traditional Woven Bag",
    price: 850,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    quantity: 1,
    availableStock: 3,
  },
];