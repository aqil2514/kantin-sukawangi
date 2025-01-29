"use client";
import { Suspense, useEffect, useState } from "react";
import Login from "./login";
import AuthProvider, { useAuthContext } from "./Provider";
import Register from "./register";

import { motion } from "framer-motion";

export default function Authentication() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <AuthProvider>
      <CurrentPage />
    </AuthProvider>
    </Suspense>
  );
}

const CurrentPage = () => {
  const { activePage } = useAuthContext();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    return activePage === "login" ? <Login /> : <Register />;
  }

  return (
    <motion.div
      key={activePage}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {activePage === "login" ? <Login /> : <Register />}
    </motion.div>
  );
};
