"use client";
import Container from "@/components/Layouts/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FaKey, FaRegUserCircle } from "react-icons/fa";
import TogglePage from "./TogglePage";
import { useForm } from "react-hook-form";

export default function Register() {
  return (
    <Container type="main" className="grid grid-cols-1 md:grid-cols-2 !p-0 !bg-white">
      <div className="bg-[#088F8F] px-4 pt-40 pb-12">
        <h2 className="font-mono text-2xl font-extrabold text-white underline">
          Buat Akun Kantin Sukawangi!
        </h2>
        <TogglePage />
        <RegisterForm />
      </div>

      <div className="relative hidden md:block">
        <div className="absolute top-[120px] w-full h-[calc(100vh-80px)] bg-[url(/images/illustration/register.png)] bg-center bg-contain bg-no-repeat" />
      </div>
    </Container>
  );
}

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const submitHandler = (data: RegisterFormData) => {
    console.log("Form Submitted", data);
  };

  return (
    <form
      className="w-full sm:w-1/2 mx-auto my-16 bg-white p-8 rounded-lg shadow-lg"
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
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
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

      {/* Confirm Password Input */}
      <div className="relative mb-6">
        <Label
          htmlFor="confirmPassword"
          className="block text-lg font-medium text-gray-700"
        >
          Confirm Password
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 top-[40%] text-gray-400">
            <FaKey size={16} />
          </span>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Konfirmasi password..."
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-[40%] text-gray-400"
            aria-label="Toggle password visibility"
          >
            {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Register
      </button>
    </form>
  );
};
