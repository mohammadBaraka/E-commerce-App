"use client";
import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useGetProductQuery } from "lib/apis/productSlice";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  const { data, isLoading } = useGetProductQuery({
    limit: 10,
    page: 1,
    categories: "",
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const animation = { duration: 6000, easing: (t) => t };

  const [slideRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: "performance",

    created(slider) {
      setLoaded(true);
      slider.moveToIdx(1, true, animation);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    animationEnded(slider) {
      slider.moveToIdx(slider.track.details.abs + 1, true, animation); // نحرك للعنصر التالي تلقائيًا
    },
    slides: {
      spacing: 8,
      perView: 2,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 16 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 5, spacing: 16 },
      },
    },
  });

  return (
    <section className="mx-auto xl:w-[90%] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 marginGlobal">
      <h2 className="text-left mb-6 font-bold text-3xl">New Arrivals</h2>

      <div className="relative">
        <div
          key={data?.data?.length || "slider"}
          ref={slideRef}
          className="keen-slider"
        >
          {data?.data?.map((item) => (
            <div
              key={item?.id}
              className="keen-slider__slide bg-gray-100 p-2 rounded-lg"
            >
              <div className="flex flex-col items-center gap-4">
                <h3 className="text-lg font-bold text-black">{item.name}</h3>
                <Link
                  href={`/product/${item?.id}`}
                  className="relative w-full h-40"
                >
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    fill
                    className=" w-full h-full"
                  />
                </Link>
                <div className="flex justify-between items-center w-full">
                  <p className="text-black">{item?.price}$</p>
                  <p className="text-black">
                    {item?.richDescription?.slice(0, 20)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
