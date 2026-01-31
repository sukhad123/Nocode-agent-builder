import BackgroundGradients from "./components/home/BackgroundGradients";
import HeroSection from "./components/home/HeroSection";
import NavbarSection from "./components/home/NavbarSection";
import AnimatedDivider from "./components/home/AnimatedDivider";
import HomeClientWrapper from "./components/home/HomeClientWrapper";
import CTASection from "./components/home/CTASection";

export default function Home() {
  return (
    <main className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#000] text-white">
      <BackgroundGradients />
      <NavbarSection />

      <div className="relative z-10 pt-16">
        <HeroSection />
        <AnimatedDivider />
        <HomeClientWrapper />
        <CTASection />

        <footer className="py-8 px-4 border-t border-gray-800/50">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              No Code Agent Builder {new Date().getFullYear()} - The Future Codes
              Itself
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
