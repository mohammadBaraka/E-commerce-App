"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollAnimation from "components/ScrollAnimation/ScrollAnimation";

export default function Services() {
  const dataServices = [
    {
      id: 1,
      title: "Services1",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              felis ligula.`,
      img: "/about-1.jpg",
    },

    {
      id: 2,
      title: "Services2",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
             felis ligula.`,
      img: "/shopping2.jpg",
    },

    {
      id: 3,
      title: "Services3",
      des: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
    felis ligula.`,
      img: "/shopping3.jpg",
    },
  ];
  return (
    <ScrollAnimation>
      <motion.div
        id="services"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-lg text-center"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">About Our Services</h2>
        <p className="mt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
          aliquam doloribus nesciunt eos fugiat. Vitae aperiam fugit
          consequuntur saepe laborum.
        </p>
      </motion.div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-[90%] m-auto lg:grid lg:grid-cols-3 lg:gap-8 
       md:grid md:grid-cols-2 md:gap-8
      "
      >
        {dataServices?.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="marginGlobal relative flex items-center flex-col"
            >
              <div
                className="relative w-full h-[300px] mx-6 -mt-6 overflow-hidden
              rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg 
              shadow-blue-gray-500/40 bg-gradient-to-r from-teal-500 to-teal-600"
              >
                <Image src={item.img} alt="image" fill />
              </div>
              <div className="p-6 flex flex-col">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {item.title}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {item.des}
                </p>
              </div>
              <div className="p-6 w-[100%]">
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-ripple-light="true"
                    type="button"
                    className="absolute bottom-0 select-none rounded-lg bg-teal-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-teal-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  >
                    Read More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.section>
    </ScrollAnimation>
  );
}
