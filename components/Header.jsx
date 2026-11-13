
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const pathname = usePathname();

  const isSignupPage = pathname === "/signup";
  const isSigninPage = pathname === "/signin";
  const isAuthPage = isSignupPage || isSigninPage;

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
                href="/signin"
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isSigninPage
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

            /* User Profile Dropdown */
            <div className="relative">

              {/* Profile Button */}
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
                className="flex items-center gap-3 rounded-full border border-gray-200 px-4 py-2 transition hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                  R
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-gray-800">
                    Rezwan
                  </p>

                  <p className="text-xs text-gray-500">
                    View Profile
                  </p>
                </div>

                <span className="text-xs text-gray-500">
                  {isUserMenuOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-xl border border-gray-100 bg-white p-4 shadow-lg">

                  {/* User Information */}
                  <div className="border-b border-gray-100 pb-3">
                    <h3 className="text-sm font-bold text-gray-900">
                      Rezwan Ahmed
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      rezwanahmed@gmail.com
                    </p>
                  </div>

                  {/* My Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75c-2.7 0-5.25-.6-7.5-1.65Z"
                      />
                    </svg>

                    <span>আমার প্রোফাইল</span>
                  </Link>

                  {/* Sign Out */}
                  <Link
                    href="/signin"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M18 15l3-3m0 0-3-3m3 3H9"
                      />
                    </svg>

                    <span>সাইন আউট</span>
                  </Link>

                </div>
              )}
            </div>
          )}
        </div>

        {/* Category Navigation */}
        <nav className="flex items-center gap-3 overflow-x-auto whitespace-nowrap border-t border-gray-100 py-4">
          {loading ? (
            <p className="text-sm text-gray-400">
              Loading categories...
            </p>
          ) : (
            categories.map((category) => {
              const categoryPath = `/category/${category.slug}`;
              const isActive = pathname === categoryPath;

              return (
                <Link
                  key={category.id}
                  href={categoryPath}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              );
            })
          )}
        </nav>

      </div>
    </header>
  );
}
