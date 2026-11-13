
import Image from "next/image";

export default function HeroSection() {
  const today = new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-8 lg:px-12">
      <div className="flex min-h-[300px] flex-col items-center justify-between gap-8 rounded-2xl border border-gray-200 bg-[#fbfdfb] px-6 py-8 md:flex-row md:px-10 lg:px-12">
        
        {/* Hero Content */}
        <div className="flex-1">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {today}
          </span>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-[#1c2b20] md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারদরভিত্তিক বিশ্লেষণ, তথ্য, সর্বশেষ আপডেট এবং
            বাজারের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#products"
            className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Hero Image */}
        <div className="relative h-[180px] w-full max-w-[280px] shrink-0 md:h-[220px] md:w-[280px]">
          <Image
            src="/images/bazar-hero.png"
            alt="Grocery basket with fresh vegetables"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}
