import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import CategoriesSection from "@/components/CategoriesSection";
import GiftSection from "@/components/GiftSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCollection />
        <CategoriesSection />
        <GiftSection />
        <InstagramSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
