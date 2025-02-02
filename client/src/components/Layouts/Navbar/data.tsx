import {
  FaHome,
  FaInfoCircle,
  FaUtensils,
  FaPhoneAlt,
  FaUserShield,
  FaUser,
  FaBox,
  FaCog,
} from "react-icons/fa";

export const navigatorLinks: General.LinkAttributes[] = [
  { text: "Home", href: "/", icon: <FaHome /> },
  { text: "Menu", href: "/products", icon: <FaUtensils /> },
  { text: "About", href: "/about", icon: <FaInfoCircle /> },
  { text: "Contact", href: "/contact", icon: <FaPhoneAlt /> },
];

export const navigatorUserLinks: General.LinkAttributes[] = [
  // Admin Dashboard Link (Hanya tampil untuk admin)
  {
    href: "/admin",
    text: "Admin Dashboard",
    icon: <FaUserShield size={18} className="text-green-500" />,
    target: "_self",
    rel: "noopener noreferrer", // Anda dapat menyesuaikan jika diperlukan
  },
  // Profile
  {
    href: "/profile",
    text: "Profile",
    icon: <FaUser size={18} className="text-red-500" />,
    target: "_self",
    rel: "noopener noreferrer",
  },
  // Orders
  {
    href: "/orders",
    text: "Orders",
    icon: <FaBox size={18} className="text-yellow-500" />,
    target: "_self",
    rel: "noopener noreferrer",
  },
  // Settings
  {
    href: "/settings",
    text: "Settings",
    icon: <FaCog size={18} className="text-blue-500" />,
    target: "_self",
    rel: "noopener noreferrer",
  },
];
