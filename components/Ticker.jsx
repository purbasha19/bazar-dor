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
      <div className="h-[37px] border-y border-gray-200 bg-white flex items-center justify-center text-sm text-gray-500">
        Loading market prices...
      </div>
    );
  }

  return (
    // Height 37px এর কাছাকাছি রাখতে py-1.5 বা py-2 ব্যবহার করা হলো
    <section className="w-full overflow-hidden border-y border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center gap-6 overflow-x-auto whitespace-nowrap px-4 py-1.5 lg:px-12 hide-scrollbar">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex shrink-0 items-center gap-2 text-sm"
          >
            {/* Emoji Size কমানো হয়েছে */}
            <span className="text-base">
              {product.image}
            </span>

            {/* Name, Price এবং Percentage এক লাইনে আনা হয়েছে */}
            <span className="font-medium text-gray-700">
              {product.nameBn}
            </span>

            <span className="text-gray-600">
              {product.today.toLocaleString("bn-BD")} টাকা/{getUnit(product.unit)}
            </span>

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
              {Math.abs(product.change.pct).toLocaleString("bn-BD")}
              %
            </span>

            {/* লম্বা বর্ডারের বদলে ডিজাইনের মতো ছোট ডট/স্পেসার দেওয়া হলো */}
            <span className="ml-4 h-1 w-1 rounded-full bg-gray-300"></span>
          </div>
        ))}
      </div>
    </section>
  );
}