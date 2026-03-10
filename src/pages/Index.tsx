import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import PackagesSection from "@/components/landing/PackagesSection";
import CoffeeMenuSection from "@/components/landing/CoffeeMenuSection";
import FridgeMenuSection from "@/components/landing/FridgeMenuSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <PackagesSection />
      <CoffeeMenuSection />
      <FridgeMenuSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
