"use client";
import Link from "next/link";
import { dataSction } from "./dataSection";
import { motion } from "framer-motion";
import ScrollAnimation from "components/ScrollAnimation/ScrollAnimation";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <ScrollAnimation>
      <div
        id="about"
        className="mx-auto xl:w-[90%] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 marginGlobal"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-lg text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">About Our Site</h2>
          <p className="mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae aperiam
            fugit consequuntur saepe laborum.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {dataSction?.map((item) => {
            return (
              <motion.span
                key={item.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 128, 128, 0.1), 0 10px 10px -5px rgba(0, 128, 128, 0.04)",
                }}
                className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-teal-500/10 hover:shadow-teal-500/10"
              >
                {item.icon}
                <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
                <p className="mt-1 text-sm">{item.desc}</p>
                <div className="mt-12 text-center">
                  <Link
                    href="/"
                    className="inline-block rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-teal-700 focus:outline-none focus:ring focus:ring-yellow-400"
                  >
                    Get Started Today
                  </Link>
                </div>
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </ScrollAnimation>
  );
}
