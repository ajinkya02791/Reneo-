
import type { Product } from "../types/Products";

export const demoProducts: Product[] = [
  {
    id: "1",
    name: "Handmade Leather Bag",
    price: 45,
    stock: 11,
    description:
      "A beautifully handcrafted leather bag made with durable materials and traditional African craftsmanship.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Fashion",
    shop: {
      name: "Amina Crafts",
      city: "Accra",
      district: "Greater Accra",
    },
    isLive: true,
  },
  {
    id: "2",
    name: "Traditional Woven Basket",
    price: 28,
    stock: 11,
    description:
      "A traditional handwoven basket made by skilled local artisans. Perfect for home decoration and storage.",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Home",
    shop: {
      name: "Kofi Handmade",
      city: "Kumasi",
      district: "Ashanti",
    },
    isLive: false,
  },
  {
    id: "3",
    name: "Cotton Casual Shirt",
    price: 32,
    stock: 11,
    description:
      "A comfortable casual cotton shirt designed for everyday wear with a simple and modern style.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Fashion",
    shop: {
      name: "Mali Clothing",
      city: "Bamako",
      district: "Bamako District",
    },
    isLive: true,
  },
  {
    id: "4",
    name: "Handmade Ceramic Mug",
    price: 18,
    stock: 11,
    description:
      "A handmade ceramic mug with a unique finish, suitable for coffee, tea, and everyday use.",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Home",
    shop: {
      name: "Clay House",
      city: "Nairobi",
      district: "Nairobi County",
    },
    isLive: false,
  },
  {
    id: "5",
    name: "Natural Shea Butter",
    price: 15,
    stock: 11,
    description:
      "Pure natural shea butter traditionally processed and suitable for moisturizing and nourishing the skin.",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Beauty",
    shop: {
      name: "Pure Africa",
      city: "Tamale",
      district: "Northern Region",
    },
    isLive: true,
  },
  {
    id: "6",
    name: "Handmade Beaded Necklace",
    price: 24,
    stock: 11,
    description:
      "A handcrafted beaded necklace featuring colorful traditional designs made by local artisans.",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Accessories",
    shop: {
      name: "Nala Designs",
      city: "Lagos",
      district: "Lagos State",
    },
    isLive: false,
  },
  {
    id: "7",
    name: "Wooden Serving Board",
    price: 26,
    stock: 11,
    description:
      "A handcrafted wooden serving board made from quality wood, ideal for serving snacks, fruits, and meals.",
    images: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Home",
    shop: {
      name: "Wood & Co.",
      city: "Kampala",
      district: "Central Region",
    },
    isLive: true,
  },
  {
    id: "8",
    name: "Handwoven Scarf",
    price: 22,
    stock: 11,
    description:
      "A soft handwoven scarf featuring traditional patterns and colors, perfect for casual and special occasions.",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Fashion",
    shop: {
      name: "Kente Studio",
      city: "Kumasi",
      district: "Ashanti",
    },
    isLive: false,
  },
];
