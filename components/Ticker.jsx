
"use client";

import { useEffect, useState } from "react";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export default function Ticker() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const result = await response.json();

        const productList = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

        setProducts(productList.slice(0, 6));
      } catch (error) {
        console.error("Products fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getUnit = (unit) => {
    const units = {
      kg: "কেজি",
      litre: "লিটার",
      dozen: "ডজন",
      piece: "পিস",
    };

    return units[unit] || unit;
  };

  if (loading) {
    return (
      <div className="flex h-[37px] items-center justify-center border-y border-gray-200 bg-white text-sm text-gray-500">
        Loading market prices...
      </div>
    );
  }

  return (
    <section className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <div className="ticker-track gap-6 whitespace-nowrap px-4 py-1.5">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 text-sm"
          >
            {/* Product Emoji */}
            <span className="text-base">
              {product.image}
            </span>

            {/* Product Name */}
            <span className="font-medium text-gray-700">
              {product.nameBn}
            </span>

            {/* Product Price */}
            <span className="text-gray-600">
              {product.today.toLocaleString("bn-BD")} টাকা/
              {getUnit(product.unit)}
            </span>

            {/* Price Change */}
            <span
              className={`font-bold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </span>

            {/* Separator */}
            <span className="ml-4 h-1 w-1 rounded-full bg-gray-300"></span>
          </div>
        ))}
      </div>
    </section>
  );
}
