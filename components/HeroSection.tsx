"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  { src: "/img1.jpg", alt: "hero1" },
  { src: "/img2.png", alt: "hero2" },
  { src: "/img3.jpeg", alt: "hero3" },
  { src: "/img4.webp", alt: "hero4" },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-72 overflow-hidden rounded-xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}>
          <Image
            src={image.src}
            alt={image.alt}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute left-5 right-5 top-1/2 z-10 flex -translate-y-1/2 justify-between">
        <button className="btn btn-circle" onClick={prevSlide}>
          ❮
        </button>
        <button className="btn btn-circle" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
}
