import Link from "next/link";
import styles from "./Landing.module.css";
import Image from "next/image";
export default function Landing() {
  return (
    <div className="w-[100%] m-auto  xl:w-[90%] marginGlobal xl:shadow-2xl px-8 py-4">
      <div className="grid grid-cols-1 gap-10 md:grid md:grid-cols-2 xl:grid xl:grid-cols-2">
        <div className="flex flex-col gap-5 justify-center items-center text-center xl:text-left xl:flex xl:items-start xl:w-[100%]">
          <div>
            <h1 className="bg-gradient-to-r from-teal-400 via-teal-200 to-teal-600 bg-clip-text text-3xl font-extrabold text-transparent  sm:text-5xl">
              Understand User Flow.
              <span className="sm:block"> Increase Conversion. </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl md:text-lg sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>
          </div>

          <Link href="/">
            <button className={`${styles.button}`}>
              <p> Shop now</p>
            </button>
          </Link>
        </div>
        <div className="xl:w-[100%]">
          <Image
            src={"/shopping.svg"}
            width={600}
            height={600}
            alt="Shopping Image"
          />
        </div>
      </div>
    </div>
  );
}
