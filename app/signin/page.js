
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import SigninForm from "@/components/SigninForm";
import Footer from "@/components/Footer";

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Header */}
      <Navbar />

      {/* Market Ticker */}
      <Ticker />

      {/* Sign In Main Section */}
      <main className="flex flex-col items-center px-5 py-12">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#1c2b20]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট ঢুকুন।
          </p>
        </div>

        {/* Sign In Form */}
        <SigninForm />

        {/* Back to Home */}
        <Link
          href="/"
          className="mt-6 text-sm font-medium text-gray-500 transition hover:text-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
