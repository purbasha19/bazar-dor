
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  const isSignupPage = pathname === "/signup";
  const isLoginPage = pathname === "/login";
  const isAuthPage = isSignupPage || isLoginPage;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories`);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result = await response.json();

        const categoryList = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

        setCategories(categoryList);
      } catch (error) {
        console.error("Category fetching error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">

        {/* Top Header */}
        <div className="flex items-center justify-between py-5">

          {/* Logo and Date */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-2xl">
              🛒
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                বাজার দর
              </h1>

              <p className="text-xs text-gray-500">
                {today}
              </p>
            </div>
          </Link>

          {/* Authentication Buttons / Profile */}
          {isAuthPage ? (
            <div className="flex items-center gap-3">

              {/* Sign In */}
              <Link
                href="/login"
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isLoginPage
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                সাইন ইন
              </Link>

              {/* Sign Up */}
              <Link
                href="/signup"
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isSignupPage
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                সাইন আপ
              </Link>

            </div>
          ) : (
            /* Existing Profile */
            <Link
              href="/profile"
              className="flex items-center gap-3 rounded-full border border-gray-200 px-4 py-2 transition hover:bg-gray-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                R
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Rezwan
                </p>

                <p className="text-xs text-gray-500">
                  View Profile
                </p>
              </div>
            </Link>
          )}
        </div>

        {/* Category Navigation */}
        <nav className="flex items-center gap-8 overflow-x-auto whitespace-nowrap border-t border-gray-100 py-4">

          {loading ? (
            <p className="text-sm text-gray-400">
              Loading categories...
            </p>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-600"
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            ))
          )}

        </nav>
      </div>
    </header>
  );
}
