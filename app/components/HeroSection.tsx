"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Search from "./Search";

const HeroSection = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.4, // Cuộn xuống 50% chiều cao màn hình
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#789F60] bg-gradient-to-tr opacity-90 from-[#ff80b5] to-[#9089fc] text-white text-center pt-16">
      <h1 className="text-4xl font-bold mt-8">Find the Best Courses for you</h1>
      <p className="font-light mt-2 mx-1">
        Discover, Learn, Upskill with our wide range of courses
      </p>

      <div className="my-10 flex justify-center drop-shadow-sm">
        <Search placeholder="Search courses here" />
      </div>

      {/* Explore Button */}
      <Button
        className="bg-blue-600 mb-8 px-4 py-2 rounded-full text-white drop-shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-lg"
        onClick={handleScroll} // Gọi hàm khi nhấn
      >
        Explore Courses <ArrowDown className="inline-flex" size={20} />
      </Button>
    </section>
  );
};

export default HeroSection;
