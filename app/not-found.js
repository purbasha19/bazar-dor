
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8faf8] px-5 text-center">
      <h1 className="text-8xl font-bold text-green-700">
        404
      </h1>

      <h2 className="mt-5 text-2xl font-bold text-[#1c2b20]">
        পেজটি পাওয়া যায়নি!
      </h2>

      <p className="mt-3 max-w-md text-sm text-gray-500">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
        URL পরিবর্তিত হতে পারে অথবা পেজটি সরানো হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-7 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
