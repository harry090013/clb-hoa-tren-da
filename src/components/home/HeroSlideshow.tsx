"use client";

import { useEffect, useState } from "react";

const slides = [
  "/images/haigiang_1.webp",
  "/images/tinh_nguyen_1.webp",
  "/images/tinhnguyen_2.webp",
  "/images/tinhnguyen_3.webp",
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // changes every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
      {slides.map((slide, idx) => (
        <div
          key={slide}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide}
            alt={`Hoa Trên Đá Activities Slide ${idx + 1}`}
            className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-7000"
          />
        </div>
      ))}
      {/* Decorative tag */}
      <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
        Hình ảnh hoạt động thực tế
      </div>
    </div>
  );
}
