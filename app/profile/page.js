"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load logged-in user's name
  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  // Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        setError(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      setSuccess("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      router.push("/signin");
      router.refresh();
    } catch (err) {
      console.error("Signout error:", err);
      setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  if (isPending || !user) {
    return (
      <div className="min-h-screen bg-[#f8faf8]">
        <Navbar />
        <div className="py-20 text-center text-gray-500">
          Loading profile...
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
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div>
                <h2 className="text-base font-bold text-[#1c2b20]">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              type="button"
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

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                {/* Success Message */}
                {success && (
                  <p className="text-sm text-green-700">{success}</p>
                )}

                {/* Update Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
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