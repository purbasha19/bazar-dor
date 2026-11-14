
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export default function ProductDetailsPage() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

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

        const selectedProduct = productList.find(
          (item) => item.slug === slug
        );

        if (!selectedProduct) {
          throw new Error("Product not found");
        }

        setProduct(selectedProduct);
      } catch (error) {
        console.error("Product fetching error:", error);
        setError("পণ্যের তথ্য পাওয়া যায়নি।");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const formatPrice = (price) =>
    Number(price).toLocaleString("bn-BD");

  const getUnit = (unit) => {
    const units = {
      kg: "কেজি",
      litre: "লিটার",
      dozen: "ডজন",
      piece: "পিস",
    };

    return units[unit] || unit;
  };

  const getPriceChange = () => {
    if (!product) return 0;
    return product.today - product.yesterday;
  };

  const markets = product?.markets || [];

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : 0;

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : 0;

  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) =>
              total + (market.min + market.max) / 2,
            0
          ) / markets.length
        )
      : 0;

  const isUp = product?.change?.dir === "up";
  const isDown = product?.change?.dir === "down";

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <Navbar />
      <Ticker />

      <main className="px-5 py-10 lg:px-12">
        <div className="mx-auto max-w-[1440px]">

          {loading ? (
            <p className="py-20 text-center text-gray-500">
              পণ্যের তথ্য লোড হচ্ছে...
            </p>
          ) : error ? (
            <p className="py-20 text-center text-red-500">
              {error}
            </p>
          ) : product ? (
            <>

              {/* Breadcrumbs */}
              <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="transition hover:text-green-700">
                  হোম
                </Link>

                <span>›</span>

                <Link
                  href={`/category/${product.category}`}
                  className="transition hover:text-green-700"
                >
                  {product.categoryNameBn}
                </Link>

                <span>›</span>

                <span className="font-medium text-[#1c2b20]">
                  {product.nameBn}
                </span>
              </nav>

              {/* Product Hero Card */}
              <section className="flex flex-col items-center justify-between gap-6 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:p-8">

                {/* Product Information */}
                <div className="flex w-full items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-green-50 text-5xl">
                    {product.image}
                  </div>

                  <div>
                    <h1 className="text-xl font-bold text-[#1c2b20] sm:text-2xl">
                      {product.nameBn}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                      প্রতি {getUnit(product.unit)} • {product.categoryNameBn}
                    </p>

                    <p className="mt-3 text-xs text-gray-500">
                      {getPriceChange() > 0
                        ? `গতকালের তুলনায় আজ দাম বেড়েছে - ${formatPrice(getPriceChange())} টাকা`
                        : getPriceChange() < 0
                          ? `গতকালের তুলনায় আজ দাম কমেছে - ${formatPrice(Math.abs(getPriceChange()))} টাকা`
                          : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
                    </p>
                  </div>
                </div>

                {/* Today's Price */}
                <div className="w-full text-left sm:w-auto sm:shrink-0 sm:text-right">
                  <p className="text-sm text-gray-500">
                    আজকের দাম
                  </p>

                  <h2 className="mt-1 text-3xl font-bold text-[#1c2b20]">
                    {formatPrice(product.today)}
                  </h2>

                  <p className="text-xs text-gray-500">
                    টাকা / {getUnit(product.unit)}
                  </p>

                  <p
                    className={`mt-2 text-sm font-bold ${
                      isUp
                        ? "text-red-600"
                        : isDown
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {formatPrice(Math.abs(product.change?.pct || 0))}%
                  </p>
                </div>
              </section>

              {/* Price Summary */}
              <section className="mt-8">
                <h2 className="mb-4 text-lg font-bold text-[#1c2b20]">
                  দামের সারসংক্ষেপ
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {/* Lowest Price */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <p className="text-sm text-gray-500">
                      সর্বনিম্ন দাম
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-green-700">
                      {formatPrice(lowestPrice)} টাকা
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      সবচেয়ে কম দামের বাজার
                    </p>
                  </div>

                  {/* Highest Price */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <p className="text-sm text-gray-500">
                      সর্বোচ্চ দাম
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-red-600">
                      {formatPrice(highestPrice)} টাকা
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      সবচেয়ে বেশি দামের বাজার
                    </p>
                  </div>

                  {/* Average Price */}
                  <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <p className="text-sm text-gray-500">
                      গড় দাম
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-green-700">
                      {formatPrice(averagePrice)} টাকা
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      প্রতি {getUnit(product.unit)}-এর হিসাবে
                    </p>
                  </div>

                </div>
              </section>

              {/* Market-wise Price Table */}
              <section className="mt-8">
                <h2 className="mb-4 text-lg font-bold text-[#1c2b20]">
                  বাজারভিত্তিক আজকের দাম
                </h2>

                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <table className="w-full min-w-[650px] text-left">
                    <thead className="bg-gray-50">
                      <tr className="border-b border-gray-200 text-sm text-gray-600">
                        <th className="px-5 py-4 font-semibold">
                          বাজার
                        </th>

                        <th className="px-5 py-4 font-semibold">
                          বিভাগ
                        </th>

                        <th className="px-5 py-4 font-semibold">
                          সর্বনিম্ন
                        </th>

                        <th className="px-5 py-4 font-semibold">
                          সর্বোচ্চ
                        </th>

                        <th className="px-5 py-4 font-semibold">
                          গড়
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {markets.map((market, index) => {
                        const marketAverage = Math.round(
                          (market.min + market.max) / 2
                        );

                        return (
                          <tr
                            key={`${market.market}-${index}`}
                            className="border-b border-gray-100 text-sm last:border-0"
                          >
                            <td className="px-5 py-4 font-medium text-gray-800">
                              {market.market}
                            </td>

                            <td className="px-5 py-4 text-gray-500">
                              {market.division}
                            </td>

                            <td className="px-5 py-4 font-medium text-green-700">
                              {formatPrice(market.min)} টাকা
                            </td>

                            <td className="px-5 py-4 font-medium text-red-600">
                              {formatPrice(market.max)} টাকা
                            </td>

                            <td className="px-5 py-4 font-medium text-gray-800">
                              {formatPrice(marketAverage)} টাকা
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

            </>
          ) : null}

        </div>
      </main>

      <Footer />
    </div>
  );
}
