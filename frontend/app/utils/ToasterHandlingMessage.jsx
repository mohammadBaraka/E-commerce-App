"use client";
import { Toaster } from "react-hot-toast";
import * as React from "react";
// import { ThemeContext } from "@/Context/ToggleMode";
export default function ToasterHandlingMessage() {
  // const { mode } = React.useContext(ThemeContext);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          style: {
            color: "#333",
            backgroundColor: "#fff",
            width: "300px",
          },
        }}
      />
    </>
  );
}
