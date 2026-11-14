
"use client";

import { useState } from "react";
import Link from "next/link";

export default function CategoryProducts({ products = [] }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return Number(a.today) - Number(b.today);
    }

    if (sortBy === "high-to-low") {
      return Number(b.today) - Number(a.today);
    }

    return a.id - b.id;
  });

  const getUnit = (unit) => {
    const units = {
      kg: "কেজি",
      litre: "লিটার",
      dozen: "ডজন",
      piece: "পিস",
    };

    return units[unit] || unit;
  };

  return (
    <section className="mt-6">
      {/* Sorting Bar */}
      <div className="flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4">
        <label
          htmlFor="sort"
          className="text-sm font-medium text-gray-600"
        >
          সাজান
        </label>

        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম কম থেকে বেশি</option>
          <option value="high-to-low">দাম বেশি থেকে কম</option>
        </select>
      </div>

      {/* Product Count */}
      <p className="mb-4 mt-5 text-sm text-gray-500">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
            const isUp = product.change?.dir === "up";
            const isDown = product.change?.dir === "down";

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#fbfdfb] p-3 transition hover:border-green-400 hover:shadow-sm"
              >
                {/* Product Information */}
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
        <p className="rounded-xl bg-white py-10 text-center text-sm text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
