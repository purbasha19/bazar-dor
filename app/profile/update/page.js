
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");

      setTimeout(() => {
        router.replace("/profile");
        router.refresh();
      }, 800);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="min-h-screen bg-[#f8faf8]">
        <Navbar />
        <div className="mx-auto max-w-3xl animate-pulse px-5 py-20">
          <div className="h-8 w-48 rounded bg-gray-200"></div>
          <div className="mt-6 h-40 rounded-xl bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <Navbar />
      <Ticker />

      <main className="px-5 py-12">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-[#1c2b20]">
            Update Information
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইলের তথ্য পরিবর্তন করুন।
          </p>

          <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#1c2b20]"
                >
                  Name
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

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "আপডেট হচ্ছে..." : "Update Information"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
