
"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        console.error("BetterAuth signup error:", error);
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      console.log("Signup successful:", data);
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      setTimeout(() => {
        window.location.href = "/signin";
      }, 1000);

    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.message || "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[416px] rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSignup} className="space-y-4">
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
            placeholder="যেমন: রহিম উদ্দিন"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="আবার লিখুন"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="text-xs text-gray-400">অথবা</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-2.5 text-xs font-medium text-gray-700 opacity-60"
        >
          <span className="text-base font-bold text-blue-600">G</span>
          Google দিয়ে চালিয়ে যান
        </button>

        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-2.5 text-xs font-medium text-gray-700 opacity-60"
        >
          <span className="text-base font-bold text-gray-900">●</span>
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-gray-500">
        অ্যাকাউন্ট আছে?{" "}
        <Link
          href="/signin"
          className="font-semibold text-green-700 hover:text-green-800"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
