import Link from "next/link";
import { dataSction } from "./dataSection";

export default function About() {
  return (
    <>
      <div className="mx-auto xl:w-[90%] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 marginGlobal">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">About Our Site</h2>
          <p className="mt-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae aperiam
            fugit consequuntur saepe laborum.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dataSction?.map((item) => {
            return (
              <span
                key={item.id}
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
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
