
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import SignupForm from "@/components/SignupForm";
import Footer from "@/components/Footer";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Header */}
      <Navbar />

      {/* Market Ticker */}
      <Ticker />

      {/* Signup Main Section */}
      <main className="flex flex-col items-center px-5 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#1c2b20]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Signup Form Card */}
        <SignupForm />

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-6 text-sm font-medium text-green-700 hover:text-green-800"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
