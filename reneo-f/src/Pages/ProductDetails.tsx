import { useState } from "react";
import type { Product } from "../types/Products";
import { useProducts } from "../contextAPI/products";

const product: Product = {
  id: "1",
  name: "Handmade Leather Bag",
  price: 45,
  stock: 8,
  category: "bags",
  description:
    "A handcrafted leather bag made by skilled local artisans. Designed for everyday use with a spacious interior and durable construction.",
  images: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
  ],
  shop: {
    name: "Amina Crafts",
    city: "Accra",
    district: "Greater Accra",
  },
  isLive: true,
};

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { setCart } = useProducts();

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((current) => current + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((current) => current - 1);
    }
  };

// type CartItem = { product_id: string; quantity: number; }; 
const addToCart = (product: Product) => {
    setCart((currentItems) => {
        const existingItem = currentItems.find(
            (item) => item.id === product.id
        );
        if (existingItem) {
            return currentItems.map((item) =>
                item.id === product.id
                    ? {
                          ...item,
                          quantity: Math.min(
                              item.quantity + 1,
                              item.availableStock
                          ),
                      }
                    : item
            );
        }

        return [
            ...currentItems,
            {
                id: crypto.randomUUID(),
                name: product.name,
                price: product.price,
                image: product.images[0],
                availableStock: product.stock,
                quantity: 1,
            },
        ];
    });
};

  const handleJoinStream = () => {
    console.log("Joining stream:", product.shop.name);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <button className="hover:text-gray-900">Home</button>
          <span>/</span>
          <span>Fashion</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              <button className="absolute right-4 top-4 rounded-full bg-white p-3 shadow-md hover:bg-gray-50">
                ♡
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 ${
                    selectedImage === index
                      ? "border-gray-900"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product information */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-sm font-medium text-gray-500">
              Fashion
            </p>

            {/* Name */}
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-5 text-3xl font-bold">
              ${product.price}
            </p>

            {/* Stock */}
            <div className="mt-3">
              {product.stock > 0 ? (
                <p className="text-sm font-medium text-green-600">
                  In stock · {product.stock} available
                </p>
              ) : (
                <p className="text-sm font-medium text-red-600">
                  Out of stock
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="my-6 border-t" />

            {/* Description */}
            <div>
              <h2 className="text-base font-semibold">
                Product details
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Shop */}
            <div className="mt-8 rounded-xl border bg-gray-50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Sold by
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                {product.shop.name}
              </h2>

              <div className="mt-2 flex flex-wrap gap-x-2 text-sm text-gray-500">
                <span>{product.shop.city}</span>
                <span>·</span>
                <span>{product.shop.district}</span>
              </div>
            </div>

            {/* Live stream */}
            {product.isLive && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-500" />

                  <div className="flex-1">
                    <h2 className="font-semibold">
                      {product.shop.name} is live
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                      Join the live stream and watch the seller
                      showcase their products.
                    </p>

                    <button
                      onClick={handleJoinStream}
                      className="mt-4 w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
                    >
                      Join Live Stream
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity + cart */}
            {product.stock > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium">Quantity</p>

                <div className="flex gap-5">
                  <div className="flex items-center rounded-lg border">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity === 1}
                      className="px-4 py-3 text-lg disabled:opacity-30"
                    >
                      −
                    </button>

                    <span className="w-10 text-center text-sm font-medium">
                      {quantity}
                    </span>

                    <button
                      onClick={increaseQuantity}
                      disabled={quantity === product.stock}
                      className="px-4 py-3 text-lg disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                     className="
                      rounded-lg bg-black px-4 py-2 text-white
                      transition-all duration-100
                      hover:bg-gray-800
                      active:scale-95
                      active:bg-gray-900
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      disabled:active:scale-100
                    "
                  >
                   {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}