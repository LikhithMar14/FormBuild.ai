"use client"
import HeroSection from "@/components/HeroSection";
import PricingPage from "@/components/PricingPage";
import Footer from "@/components/Footer";

const HomePage = () => {
    return ( 
        <div className="min-h-screen grid items-center justify-items-center p-8 gap-16 sm:p-20">
        <HeroSection/>
        <PricingPage/>
        <Footer/>
        
        </div>
    );
}
 
export default HomePage;