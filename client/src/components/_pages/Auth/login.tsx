"use client";
import Container from "@/components/Layouts/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaKey, FaRegUserCircle } from "react-icons/fa";
import TogglePage from "./TogglePage";
import { FaGoogle } from "react-icons/fa"; // Import ikon Google dari react-icons
import { useForm } from "react-hook-form";

interface LoginFormData {
  username: string;
  password: string;
}

export default function Login() {
  return (
    <Container type="main" className="grid grid-cols-1 md:grid-cols-2 !p-0 !bg-white">
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const submitHandler = (data: LoginFormData) => {
    console.log("Form Submitted", data);
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
  };

  return (
    <form
      className="w-full sm:w-1/2 mx-auto my-16 bg-white p-8 rounded-lg shadow-lg"
      method="post"
      onSubmit={handleSubmit(submitHandler)}
    >
      {/* Username Input */}
      <div className="relative mb-6">
        <Label
          htmlFor="username"
          className="block text-lg font-medium text-gray-700"
        >
          Username
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 top-[40%] text-gray-400">
            <FaRegUserCircle size={16} />
          </span>
          <Input
            id="username"
            {...register("username", { required: "Username is required" })}
            className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Masukkan username atau email..."
          />
        </div>
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
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
            {...register("password", { required: "Password is required" })}
            type={showPassword ? "text" : "password"} // Tampilkan atau sembunyikan password
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
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Login
      </button>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full mt-4 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
      >
        <FaGoogle size={20} className="mr-2" />
        Login with Google
      </button>
    </form>
  );
};
