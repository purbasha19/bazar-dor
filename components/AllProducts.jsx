
"use client";

import { useEffect, useState } from "react";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export default function AllProducts() {
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

  if (loading) {
    return (
      <div className="py-8 text-center text-sm text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <section className="w-full bg-[#f8faf8] px-5 py-10 lg:px-12">
      <div className="mx-auto max-w-[1440px]">

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#1c2b20]">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => {
              const isUp = product.change?.dir === "up";
              const isDown = product.change?.dir === "down";

              return (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#fbfdfb] p-3"
                >

                  {/* Product Information */}
                  <div className="flex min-w-0 items-center gap-3">

                    {/* Product Image */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-xl">
                      {product.image}
                    </div>

                    {/* Product Details */}
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
                        {Number(product.today).toLocaleString("bn-BD")} টাকা
                      </p>
                    </div>
                  </div>

                  {/* Price Change */}
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-xs font-bold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {Math.abs(Number(product.change?.pct || 0)).toLocaleString("bn-BD")}%
                  </span>

                </div>
              );
            })}

          </div>
        ) : (
          <p className="py-8 text-center text-sm text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}

      </div>
    </section>
  );
}
