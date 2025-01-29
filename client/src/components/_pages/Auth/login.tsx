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
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface LoginFormData {
  username: string;
  password: string;
}

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Simulasi loading
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // Simulasi status sukses
  const [isError, setIsError] = useState<boolean>(false); // Simulasi status error
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const submitHandler = (data: LoginFormData) => {
    signIn("credentials", { redirectTo: "/", user:data.username, password:data.username }, { data });
    setIsLoading(true); // Set loading saat form disubmit
    setIsSuccess(false); // Reset status sukses sebelum proses
    setIsError(false); // Reset error status sebelum proses

    // Simulasi delay loading
    setTimeout(() => {
      setIsLoading(false); // Hentikan loading setelah 2 detik
      // Simulasi sukses atau gagal
      if (data.username === "admin" && data.password === "@admin123") {
        setIsSuccess(true); // Set sukses jika login berhasil
      } else {
        setIsError(true); // Set error jika username/password salah
      }
    }, 2000);
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
            {...register("username", { required: "Username diperlukan" })}
            className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isLoading ? "bg-gray-200" : ""
            }`}
            placeholder="Masukkan username atau email..."
            disabled={isLoading} // Disable input during loading
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
            {...register("password", { required: "Password diperlukan" })}
            type={showPassword ? "text" : "password"} // Tampilkan atau sembunyikan password
            className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isLoading ? "bg-gray-200" : ""
            }`}
            placeholder="Masukkan password..."
            disabled={isLoading} // Disable input during loading
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[40%] text-gray-400"
            aria-label="Toggle password visibility"
            disabled={isLoading} // Disable the button during loading
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading} // Disable button during loading
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
          </div>
        ) : (
          "Login"
        )}
      </Button>

      {/* Google Login Button */}
      <Button
        type="button"
        // onClick={handleGoogleLogin}
        onClick={() => signIn("google", { redirectTo: "/" })}
        className={`w-full mt-4 flex items-center justify-center py-2 px-4 border bg-gray-50 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading} // Disable the button during loading
      >
        <FaGoogle size={20} className="mr-2" />
        Login with Google
      </Button>

      {/* Success Message */}
      {isSuccess && (
        <div className="mt-6 text-green-600">
          <p>Login successful! Welcome back.</p>
        </div>
      )}

      {/* Error Message */}
      {isError && (
        <div className="mt-6 text-red-600">
          <p>Login failed! Invalid username or password.</p>
        </div>
      )}
    </form>
  );
};
