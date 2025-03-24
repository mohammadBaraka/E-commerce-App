import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "../globals.css";
import StoreProvider from "lib/StoreProvider";
import ToasterHandlingMessage from "utils/ToasterHandlingMessage";
import Nav from "./dashboard/components/Nav";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>
          <div className="flex mt-5 ">
            <div className="w-[15%]">
              <Nav />
              <ToasterHandlingMessage />
            </div>
            <div className="w-[85%] flex flex-col justify-center items-center px-4">
              {children}
            </div>
          </div>
          <ToasterHandlingMessage />
        </StoreProvider>
      </body>
    </html>
  );
}
