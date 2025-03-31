"use client"

import { Button } from "@/components/ui/button";
import { Search, ArrowDown } from "lucide-react";

const HeroSection = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.5, // Cuộn xuống 50% chiều cao màn hình
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#789F60] bg-gradient-to-tr opacity-90 from-[#ff80b5] to-[#9089fc] text-white text-center">
      <h1 className="text-4xl font-bold mt-8">Find the Best Courses for you</h1>
      <p className="font-light mt-2">
        Discover, Learn, Upskill with our wide range of courses
      </p>

      {/* Search Box */}
      <div className="my-10 flex justify-center drop-shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="text-gray-500 absolute left-4 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search Courses"
            className="w-140 px-4 py-2 pl-12 rounded-l-full text-gray-700 focus:outline-none bg-white"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-r-full text-white cursor-pointer hover:bg-blue-800">
            Search
          </button>
        </div>
      </div>

      {/* Explore Button */}
      <Button
        className="bg-blue-600 mb-8 px-4 py-2 rounded-full text-white drop-shadow-xl"
        onClick={handleScroll} // Gọi hàm khi nhấn
      >
        Explore Courses <ArrowDown className="inline-flex" size={20} />
      </Button>
    </section>
  );
};

export default HeroSection;