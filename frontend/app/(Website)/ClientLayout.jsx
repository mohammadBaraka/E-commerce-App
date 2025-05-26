"use client";
import { AnimatePresence } from "framer-motion";
import PageTransition from "components/PageTransition/PageTransition";

export default function ClientLayout({ children }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>{children}</PageTransition>
    </AnimatePresence>
  );
}