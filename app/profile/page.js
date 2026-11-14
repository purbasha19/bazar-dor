
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [signingOut, setSigningOut] = useState(false);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  // Sign Out
  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছে!");

            setTimeout(() => {
              router.replace("/signin");
              router.refresh();
            }, 800);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "সাইন আউট করা যায়নি।");
            setSigningOut(false);
          },
        },
      });
    } catch (err) {
      console.error("Signout error:", err);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setSigningOut(false);
    }
  };

  // Loading Skeleton
  if (isPending || !user) {
    return (
      <div className="min-h-screen bg-[#f8faf8]">
        <Navbar />

        <div className="mx-auto w-full max-w-3xl animate-pulse px-5 py-20">
          <div className="mb-8 h-8 w-48 rounded bg-gray-200"></div>

          <div className="mb-8 flex items-center gap-4 rounded-xl bg-gray-100 p-5">
            <div className="h-16 w-16 rounded-full bg-gray-200"></div>

            <div className="flex-1 space-y-3">
              <div className="h-4 w-40 rounded bg-gray-200"></div>
              <div className="h-3 w-52 rounded bg-gray-200"></div>
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-white p-6">
            <div className="h-5 w-24 rounded bg-gray-200"></div>
            <div className="h-12 w-full rounded-lg bg-gray-200"></div>
          </div>
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
              disabled={signingOut}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signingOut ? "সাইন আউট হচ্ছে..." : "← সাইন আউট"}
            </button>
          </div>

          {/* Update Information */}
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-bold text-[#1c2b20]">
              তথ্য
            </h2>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="mb-5 text-sm text-gray-500">
                আপনার প্রোফাইলের তথ্য পরিবর্তন করতে নিচের বাটনে ক্লিক করুন।
              </p>

              <button
                type="button"
                onClick={() => router.push("/profile/update")}
                className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                Update Information
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
