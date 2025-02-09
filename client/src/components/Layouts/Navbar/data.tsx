import { BarChart, FileText, Home, Settings, Users } from "lucide-react";
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
import { FaCartShopping } from "react-icons/fa6";

export const navigatorLinks: General.LinkAttributes[] = [
  { text: "Home", href: "/", icon: <FaHome /> },
  { text: "Keranjang", href: "/cart", icon: <FaCartShopping /> },
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
    allowFor: "admin",
    rel: "noopener noreferrer", // Anda dapat menyesuaikan jika diperlukan
  },
  // Profile
  {
    href: "/profile",
    text: "Profile",
    icon: <FaUser size={18} className="text-red-500" />,
    target: "_self",
    allowFor:"all",
    rel: "noopener noreferrer",
  },
  // Orders
  {
    href: "/orders",
    text: "Orders",
    icon: <FaBox size={18} className="text-yellow-500" />,
    target: "_self",
    allowFor:"all",
    rel: "noopener noreferrer",
  },
  // Settings
  {
    href: "/settings",
    text: "Settings",
    icon: <FaCog size={18} className="text-blue-500" />,
    target: "_self",
    allowFor:"all",
    rel: "noopener noreferrer",
  },
];


export const adminSidebarLinks: General.LinkAttributes[] = [
  {
    href: "/admin/home",
    text: "Beranda Admin",
    icon: <Home size={20} />,
    allowFor: "admin",
  },
  {
    href: "/admin/users",
    text: "Kelola Pengguna",
    icon: <Users size={20} />,
    allowFor: "admin",
  },
  {
    href: "/admin/reports",
    text: "Laporan",
    icon: <FileText size={20} />,
    allowFor: "admin",
  },
  {
    href: "/admin/analytics",
    text: "Analitik",
    icon: <BarChart size={20} />,
    allowFor: "admin",
  },
  {
    href: "/admin/settings",
    text: "Pengaturan",
    icon: <Settings size={20} />,
    allowFor: "admin",
  },
];
