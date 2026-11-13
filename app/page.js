
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import HeroSection from "@/components/HeroSection";
import PriceMovers from "@/components/PriceMovers";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Ticker />
      <HeroSection />
      <PriceMovers />
      <AllProducts />
      <Footer />
    </main>
  );
}
