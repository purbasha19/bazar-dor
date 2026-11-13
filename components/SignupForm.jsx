
import Link from "next/link";

export default function SignupForm() {
  return (
    <div className="w-full max-w-[416px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <form className="space-y-4">

        {/* Name */}
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
            placeholder="যেমন: রহিম উদ্দিন"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#1c2b20]"
          >
            ইমেইল
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-[#1c2b20]"
          >
            পাসওয়ার্ড
          </label>

          <input
            id="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-[#1c2b20]"
          >
            পাসওয়ার্ড নিশ্চিত করুন
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="আবার লিখুন"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          অ্যাকাউন্ট তৈরি করুন
        </button>

      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-xs text-gray-400">অথবা</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3">

        {/* Google */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <span className="text-base font-bold text-blue-600">G</span>
          Google দিয়ে চালিয়ে যান
        </button>

        {/* GitHub */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <span className="text-base font-bold text-gray-900">●</span>
          GitHub দিয়ে চালিয়ে যান
        </button>

      </div>

      {/* Sign In Link */}
      <p className="mt-5 text-center text-sm text-gray-500">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/login"
          className="font-semibold text-green-700 hover:text-green-800"
        >
          সাইন ইন করুন
        </Link>
      </p>

    </div>
  );
}
