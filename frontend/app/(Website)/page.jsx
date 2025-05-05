"use client";
import About from "components/About/About";
import Categories from "components/Categories/Categories";
import Footer from "components/Footer/Footer";
import Landing from "components/Landing/Landing";
import Services from "components/Services/Services";
import dynamic from "next/dynamic";
const BackToTop = dynamic(() => import("components/BackToTop/BackToTop"), {
  ssr: false,
});
export default function Home() {
  return (
    <div>
      <Landing />
      <Categories />
      <About />
      <Services />
      <Footer />
      <div className="fixed bottom-10 right-5">
        <BackToTop />
      </div>
    </div>
  );
}
