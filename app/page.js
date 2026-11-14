
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import HeroSection from "@/components/HeroSection";
import PriceMovers from "@/components/PriceMovers";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Ticker />
      <HeroSection />
      <PriceMovers />
      <AllProducts />
      <Footer />
    </main>
  );
}
