import CardLayout from "./components/CardLayout";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Sidebar from "./components/Sidebar";

export default function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>; // Type as Promise
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <Sidebar />
      <HeroSection />
      <p className="text-center my-4 text-4xl font-extrabold text-[#4B4B4B]">
        Our Courses
      </p>
      <CardLayout searchParams={searchParams} />
      <Footer />
    </main>
  );
}