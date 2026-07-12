"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#1e2a28",
          color: "#fbf7f0",
          fontFamily: "var(--font-body)",
        },
        success: { iconTheme: { primary: "#e8963c", secondary: "#fbf7f0" } },
      }}
    />
  );
}
