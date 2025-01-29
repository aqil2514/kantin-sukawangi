"use client";
import { useEffect, useState } from "react";
import Login from "./login";
import AuthProvider, { useAuthContext } from "./Provider";
import Register from "./register";

import { motion } from "framer-motion";

export default function Authentication() {
  return (
    <AuthProvider>
      <CurrentPage />
    </AuthProvider>
  );
}

// const CurrentPage = () => {
//   const { activePage } = useAuthContext();

//   return (
//     <motion.div
//       key={activePage} // Animasi akan di-trigger ulang saat ada perubahan activePage
//       initial={{ opacity: 0, x: 50 }} // Animasi awal
//       animate={{ opacity: 1, x: 0 }} // Animasi saat muncul
//       exit={{ opacity: 0, x: -50 }} // Animasi saat keluar
//       transition={{ duration: 0.5 }} // Durasi transisi
//     >
//       {activePage === "login" ? <Login /> : <Register />}
//     </motion.div>
//   );
// };

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
