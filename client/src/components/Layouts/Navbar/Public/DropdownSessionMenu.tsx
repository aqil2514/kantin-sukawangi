import { useGetUser } from "@/lib/utils";
import { signOut } from "next-auth/react"; // Import useSession untuk mendapatkan session
import Image from "next/image";
import Link from "next/link";
import {
  FaUser,
  FaBox,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa"; // Menambahkan ikon untuk admin

const DropdownSessionMenu = () => {
  const { session, user } = useGetUser();

  if (!session || !user) {
    return null;
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-72 z-10 border border-gray-200 transition-all duration-300 transform scale-95 hover:scale-100">
      <figure className="flex items-center space-x-2 p-4 border-b border-gray-200">
        <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-gray-300 transition-all duration-200 hover:scale-110">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name || "User Avatar"}
            fill
            className="object-cover"
          />
        </div>
        <figcaption className="font-medium text-gray-700 text-md line-clamp-1 truncate">{user.name}</figcaption>
      </figure>

      <ul className="space-y-3 py-2 px-4">
        {/* Admin Dashboard Link */}
        {isAdmin && (
          <li>
            <Link
              href="/admin"
              className="flex items-center gap-3 text-gray-800 hover:text-green-600 transition-colors duration-200 font-medium"
            >
              <FaUserShield size={18} className="text-green-500" />
              <span>Admin Dashboard</span>
            </Link>
          </li>
        )}

        {/* Profile */}
        <li>
          <Link
            href="/profile"
            className="flex items-center gap-3 text-gray-800 hover:text-red-600 transition-colors duration-200 font-medium"
          >
            <FaUser size={18} className="text-red-500" />
            <span>Profile</span>
          </Link>
        </li>

        {/* Orders */}
        <li>
          <Link
            href="/orders"
            className="flex items-center gap-3 text-gray-800 hover:text-yellow-600 transition-colors duration-200 font-medium"
          >
            <FaBox size={18} className="text-yellow-500" />
            <span>Orders</span>
          </Link>
        </li>

        {/* Settings */}
        <li>
          <Link
            href="/settings"
            className="flex items-center gap-3 text-gray-800 hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            <FaCog size={18} className="text-blue-500" />
            <span>Settings</span>
          </Link>
        </li>

        {/* Sign Out */}
        <li>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 w-full text-left text-gray-800 hover:text-red-600 transition-colors duration-200 font-medium"
          >
            <FaSignOutAlt size={18} className="text-red-600" />
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownSessionMenu;
