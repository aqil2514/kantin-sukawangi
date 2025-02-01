import { signOut, useSession } from "next-auth/react"; // Import useSession untuk mendapatkan session
import Link from "next/link";
import {
  FaUser,
  FaBox,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa"; // Menambahkan ikon untuk admin

const DropdownSessionMenu = () => {
  const auth = useSession(); // Mengambil session data;

  const session = auth.data;
  const user = session?.user as Auth.User;

  // Jika session tidak ada atau data role kosong
  if (!session || !user) {
    return null; // Bisa return null atau komponen fallback lainnya
  }

  // Menyaring role admin
  const isAdmin = user.role === "admin"; // Sesuaikan role dengan struktur data sesi

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10 border border-gray-200">
      <ul className="space-y-3 p-4">
        {/* Admin Dashboard Link (Hanya tampil untuk admin) */}
        {isAdmin && (
          <li>
            <Link
              href="/admin"
              className="flex items-center gap-3 text-gray-800 hover:text-green-500 transition-colors duration-200"
            >
              <FaUserShield size={18} className="text-green-500" />
              <span className="font-medium">Admin Dashboard</span>
            </Link>
          </li>
        )}

        {/* Profile */}
        <li>
          <Link
            href="/profile"
            className="flex items-center gap-3 text-gray-800 hover:text-red-500 transition-colors duration-200"
          >
            <FaUser size={18} className="text-red-500" />
            <span className="font-medium">Profile</span>
          </Link>
        </li>

        {/* Orders */}
        <li>
          <Link
            href="/orders"
            className="flex items-center gap-3 text-gray-800 hover:text-yellow-500 transition-colors duration-200"
          >
            <FaBox size={18} className="text-yellow-500" />
            <span className="font-medium">Orders</span>
          </Link>
        </li>

        {/* Settings */}
        <li>
          <Link
            href="/settings"
            className="flex items-center gap-3 text-gray-800 hover:text-blue-500 transition-colors duration-200"
          >
            <FaCog size={18} className="text-blue-500" />
            <span className="font-medium">Settings</span>
          </Link>
        </li>

        {/* Sign Out */}
        <li>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 w-full text-left text-gray-800 hover:text-red-600 transition-colors duration-200"
          >
            <FaSignOutAlt size={18} className="text-red-600" />
            <span className="font-medium">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropdownSessionMenu;
