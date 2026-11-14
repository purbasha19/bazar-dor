
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import CategoryProducts from "@/components/CategoryProducts";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const category = slug.split("-").slice(-1)[0];

        const response = await fetch(
          `${BASE_URL}/products?category=${category}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch category products");
        }

        const result = await response.json();

        const productList = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

        setProducts(productList);
      } catch (error) {
        console.error("Category products error:", error);
        setError("পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryProducts();
    }
  }, [slug]);

  const categoryName = products[0]?.categoryNameBn || "ক্যাটাগরি";
  const categoryIcon = products[0]?.categoryIcon || "🛒";

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <Navbar />
      <Ticker />

      <main className="px-5 py-10 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          {loading ? (
            /* Category Skeleton Loader */
            <div className="animate-pulse">
              {/* Category Heading Skeleton */}
              <div className="mb-6 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200"></div>

                <div className="flex-1 space-y-3">
                  <div className="h-6 w-40 rounded bg-gray-200"></div>
                  <div className="h-4 w-64 max-w-full rounded bg-gray-200"></div>
                </div>
              </div>

              {/* Product Cards Skeleton */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gray-200"></div>

                      <div className="space-y-2">
                        <div className="h-4 w-24 rounded bg-gray-200"></div>
                        <div className="h-3 w-16 rounded bg-gray-200"></div>
                        <div className="h-3 w-20 rounded bg-gray-200"></div>
                        <div className="h-4 w-24 rounded bg-gray-200"></div>
                      </div>
                    </div>

                    <div className="h-6 w-14 rounded-full bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <p className="text-sm text-red-500">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-5 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                আবার চেষ্টা করুন
              </button>
            </div>
          ) : products.length === 0 ? (
            /* Invalid Category / Empty State */
            <div className="rounded-xl border border-gray-200 bg-white px-5 py-16 text-center">
              <div className="mb-5 text-6xl">🔍</div>

              <h1 className="text-2xl font-bold text-[#1c2b20]">
                ক্যাটাগরি পাওয়া যায়নি!
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
                দুঃখিত, এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                অন্য ক্যাটাগরি দেখতে হোম পেজে ফিরে যান।
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          ) : (
            <>
              {/* Category Title Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-4xl">
                    {categoryIcon}
                  </div>

                  <div>
                    <h1 className="text-2xl font-bold text-[#1c2b20]">
                      {categoryName}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                      {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                  </div>
                </div>
              </div>

              {/* Category Products */}
              <CategoryProducts products={products} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
