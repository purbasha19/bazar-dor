
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const [name, setName] = useState("Rezwan Ahmed");
  const [updatedName, setUpdatedName] = useState("Rezwan Ahmed");

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdatedName(name);
    alert("প্রোফাইল আপডেট হয়েছে!");
  };

  const handleSignOut = () => {
    alert("Sign out functionality will be connected with BetterAuth.");
  };

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <Header />
      <Ticker />

      <main className="px-5 py-12">
        <div className="mx-auto w-full max-w-3xl">

          {/* Page Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#1c2b20]">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
            </p>
          </div>

          {/* User Information Card */}
          <div className="flex flex-col items-center justify-between gap-5 rounded-xl border border-gray-200 bg-[#f0f3f0] p-5 sm:flex-row">

            {/* Avatar and User Details */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
                R
              </div>

              <div>
                <h2 className="text-base font-bold text-[#1c2b20]">
                  {updatedName}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  rezwanahmed@gmail.com
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              ← সাইন আউট
            </button>
          </div>

          {/* Update Information */}
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-bold text-[#1c2b20]">
              তথ্য
            </h2>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <form onSubmit={handleUpdate} className="space-y-5">

                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[#1c2b20]"
                  >
                    নাম
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    required
                  />
                </div>

                {/* Update Button */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  আপডেট
                </button>

              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
