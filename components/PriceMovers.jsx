
"use client";

import { useEffect, useState } from "react";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export default function PriceMovers() {
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

        setProducts(productList);
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

  const renderSection = (title, direction) => {
    const filteredProducts = products
      .filter((product) => product.change?.dir === direction)
      .slice(0, 6);

    const isUp = direction === "up";

    return (
      <section className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#1c2b20]">
          <span className={isUp ? "text-red-600" : "text-green-600"}>
            {isUp ? "▲" : "▼"}
          </span>
          {title}
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#fbfdfb] p-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-xl">
                  {product.image}
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-gray-500">
                    প্রতি {getUnit(product.unit)}
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    আজকের দাম
                  </p>
                  <p className="text-sm font-bold text-[#1c2b20]">
                    {product.today.toLocaleString("bn-BD")} টাকা
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ${
                  isUp
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                }`}
              >
                {isUp ? "▲" : "▼"}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="py-8 text-center text-sm text-gray-500">
        Loading price movements...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-8 lg:px-12">
      {renderSection("আজ দাম বেড়েছে", "up")}
      {renderSection("আজ দাম কমেছে", "down")}
    </div>
  );
}
