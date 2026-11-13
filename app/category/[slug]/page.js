
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/components/Header";
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
      <Header />
      <Ticker />

      <main className="px-5 py-10 lg:px-12">
        <div className="mx-auto max-w-[1440px]">

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
          {loading ? (
            <p className="py-12 text-center text-sm text-gray-500">
              পণ্য লোড হচ্ছে...
            </p>
          ) : error ? (
            <p className="py-12 text-center text-sm text-red-500">
              {error}
            </p>
          ) : (
            <CategoryProducts products={products} />
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
