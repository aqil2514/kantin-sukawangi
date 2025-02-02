"use client";
import Container from "@/components/Layouts/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaKey, FaRegUserCircle } from "react-icons/fa";
import TogglePage from "./TogglePage";
import { FaGoogle } from "react-icons/fa"; // Import ikon Google dari react-icons
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";


export default function Login() {
  return (
    <Container
      type="main"
      className="grid grid-cols-1 md:grid-cols-2 !p-0 !bg-white"
    >
      <div className="relative hidden md:block">
        <div className="absolute top-[100px] w-full h-[calc(100vh-80px)] bg-[url(/images/illustration/login.jpg)] bg-center bg-contain bg-no-repeat" />
      </div>

      <div className="bg-[#088F8F] px-4 pt-40 pb-12">
        <h2 className="font-mono text-2xl font-extrabold text-white underline">
          Selamat Datang!
        </h2>
        <TogglePage />
        <LoginForm />
      </div>
    </Container>
  );
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const session = useSession();

  console.log(session);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const credentialsAction = async (formData: FormData) => {
    setError(""); // Reset error sebelum mencoba login
    setIsLoading(true); // Set loading ke true saat mulai proses login

    const data = Object.fromEntries(formData); // Convert FormData ke object
    const result = await signIn("credentials", {
      ...data,
      redirect: false, // Hindari redirect otomatis
    });

    setIsLoading(false); // Set loading ke false setelah login selesai

    console.log(`Result Login`, result);

    if (result?.error) {
      setError("Login gagal! Periksa kembali email/username dan password.");
    }
  };

  return (
    <form
      className="w-full sm:w-1/2 mx-auto my-16 bg-white p-8 rounded-lg shadow-lg"
      onSubmit={(e) => {
        e.preventDefault();
        credentialsAction(new FormData(e.target as HTMLFormElement));
      }}
    >
      {/* Username Input */}
      <div className="relative mb-6">
        <Label
          htmlFor="emailOrUsername"
          className="block text-lg font-medium text-gray-700"
        >
          Email or Username
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 top-[40%] text-gray-400">
            <FaRegUserCircle size={16} />
          </span>
          <Input
            id="emailOrUsername"
            name="emailOrUsername"
            required
            className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Masukkan username atau email..."
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="relative mb-6">
        <Label
          htmlFor="password"
          className="block text-lg font-medium text-gray-700"
        >
          Password
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 top-[40%] text-gray-400">
            <FaKey size={16} />
          </span>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Masukkan password..."
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[40%] text-gray-400"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Loading Message */}
      {isLoading && (
        <p className="text-yellow-500 text-sm mb-4">
          Fitur ini masih dalam tahap pengembangan. Harap bersabar.
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition"
        disabled={isLoading} // Disable button saat loading
      >
        {isLoading ? "Loading..." : "Login"}
      </Button>

      {/* Google Login Button */}
      <Button
        type="button"
        onClick={() => signIn("google", {redirectTo:"/"})}
        className="w-full mt-4 flex items-center justify-center py-2 px-4 border bg-gray-50 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
      >
        <FaGoogle size={20} className="mr-2" />
        Login with Google
      </Button>
    </form>
  );
};


