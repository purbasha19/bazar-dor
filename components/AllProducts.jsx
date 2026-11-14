
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

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

  // Sort Products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return Number(a.today) - Number(b.today);
    }

    if (sortOrder === "high-to-low") {
      return Number(b.today) - Number(a.today);
    }

    return 0;
  });

  // Skeleton Loader
  if (loading) {
    return (
      <section className="w-full bg-[#f8faf8] px-5 py-10 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6">
            <div className="mb-2 h-6 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-56 animate-pulse rounded bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-200"></div>

                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>

                <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      className="w-full bg-[#f8faf8] px-5 py-10 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">

        {/* Heading and Sort Dropdown */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#1c2b20]">
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-products"
              className="shrink-0 text-sm font-medium text-gray-600"
            >
              সাজান:
            </label>

            <div className="relative">
              <select
                id="sort-products"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-9 text-sm text-gray-700 outline-none transition focus:border-green-600 sm:w-52"
              >
                <option value="default">ডিফল্ট</option>
                <option value="low-to-high">
                  দাম: কম থেকে বেশি
                </option>
                <option value="high-to-low">
                  দাম: বেশি থেকে কম
                </option>
              </select>

              {/* Chevron Icon */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ▼
              </span>
            </div>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => {
              const isUp = product.change?.dir === "up";
              const isDown = product.change?.dir === "down";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:border-green-400 hover:shadow-sm"
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
                        {Number(product.today).toLocaleString("bn-BD")} টাকা
                      </p>
                    </div>
                  </div>

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
                    {Math.abs(
                      Number(product.change?.pct || 0)
                    ).toLocaleString("bn-BD")}
                    %
                  </span>
                </Link>
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
