import CardLayout from "./components/CardLayout";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Sidebar from "./components/Sidebar";

const Page = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Sidebar />
      <HeroSection />
      <p className="text-center my-4 text-4xl font-extrabold text-[#4B4B4B]">Our Courses</p>
      {/* Card Layout */}
      <CardLayout />
      <Footer />
    </main>
  );
};

export default Page;
