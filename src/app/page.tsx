import Certifications from "@/components/Certifications";
import { FloatingWhatsApp, Preloader, ScrollProgress } from "@/components/Chrome";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import OrderSection from "@/components/OrderSection";
import Products from "@/components/Products";
import RemedyFinder from "@/components/RemedyFinder";
import Story from "@/components/Story";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <Story />
        <Marquee />
        <Products />
        <RemedyFinder />
        <WhyUs />
        <Certifications />
        <Marquee reverse />
        <Gallery />
        <Faq />
        <OrderSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
