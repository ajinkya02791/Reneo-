export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  category: string;
  shop: {
    name: string;
    city: string;
    district: string;
  };
  isLive: boolean;
};