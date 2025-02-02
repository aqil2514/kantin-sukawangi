"use client";
import Container from "@/components/Layouts/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useState } from "react";
import { FaKey, FaRegUserCircle } from "react-icons/fa";
import TogglePage from "./TogglePage";
import { useForm } from "react-hook-form";

export default function Register() {
  return (
    <Container
      type="main"
      className="grid grid-cols-1 md:grid-cols-2 !p-0 !bg-white"
    >
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
  email: string;
  confirmPassword: string;
}

// const RegisterForm = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false); // To handle loading state

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword(!showConfirmPassword);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//   } = useForm<RegisterFormData>();

//   const submitHandler = async (data: RegisterFormData) => {
//     setLoading(true);
//     // Simulate API call here
//     setTimeout(() => {
//       console.log("Form Submitted", data);
//       setLoading(false);
//     }, 2000);
//   };

//   return (
//     <form
//       className="w-full sm:w-1/2 mx-auto my-16 bg-white p-8 rounded-lg shadow-lg"
//       onSubmit={handleSubmit(submitHandler)}
//     >
//       {/* Username Input */}
//       <div className="relative mb-6">
//         <Label
//           htmlFor="username"
//           className="block text-lg font-medium text-gray-700"
//         >
//           Username
//         </Label>
//         <div className="relative flex items-center">
//           <span className="absolute left-3 top-[40%] text-gray-400">
//             <FaRegUserCircle size={16} />
//           </span>
//           <Input
//             id="username"
//             {...register("username", { required: "Username diperlukan" })}
//             className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.username ? "border-red-500" : "focus:ring-blue-500"
//             }`}
//             disabled={loading}
//             placeholder="Masukkan username..."
//           />
//         </div>
//         {errors.username && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.username.message}
//           </span>
//         )}
//       </div>

//       {/* Email Input */}
//       <div className="relative mb-6">
//         <Label
//           htmlFor="email"
//           className="block text-lg font-medium text-gray-700"
//         >
//           Email
//         </Label>
//         <div className="relative flex items-center">
//           <span className="absolute left-3 top-[40%] text-gray-400">
//             <Mail size={16} />
//           </span>
//           <Input
//             id="email"
//             {...register("email", { required: "Email diperlukan" })}
//             className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.username ? "border-red-500" : "focus:ring-blue-500"
//             }`}
//             disabled={loading}
//             placeholder="Masukkan email..."
//           />
//         </div>
//         {errors.email && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.email.message}
//           </span>
//         )}
//       </div>

//       {/* Password Input */}
//       <div className="relative mb-6">
//         <Label
//           htmlFor="password"
//           className="block text-lg font-medium text-gray-700"
//         >
//           Password
//         </Label>
//         <div className="relative flex items-center">
//           <span className="absolute left-3 top-[40%] text-gray-400">
//             <FaKey size={16} />
//           </span>
//           <Input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             disabled={loading}
//             {...register("password", {
//               required: "Password diperlukan",
//               minLength: {
//                 value: 6,
//                 message: "Password minimal 6 karakter",
//               },
//             })}
//             className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.password ? "border-red-500" : "focus:ring-blue-500"
//             }`}
//             placeholder="Masukkan password..."
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="absolute right-3 top-[40%] text-gray-400"
//             aria-label="Toggle password visibility"
//           >
//             {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
//           </button>
//         </div>
//         {errors.password && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.password.message}
//           </span>
//         )}
//       </div>

//       {/* Confirm Password Input */}
//       <div className="relative mb-6">
//         <Label
//           htmlFor="confirmPassword"
//           className="block text-lg font-medium text-gray-700"
//         >
//           Confirm Password
//         </Label>
//         <div className="relative flex items-center">
//           <span className="absolute left-3 top-[40%] text-gray-400">
//             <FaKey size={16} />
//           </span>
//           <Input
//             id="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             {...register("confirmPassword", {
//               required: "Harap konfirmasi password",
//               validate: (value) =>
//                 value === watch("password") || "Password tidak sama",
//             })}
//             disabled={loading}
//             className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.confirmPassword ? "border-red-500" : "focus:ring-blue-500"
//             }`}
//             placeholder="Konfirmasi password..."
//           />
//           <button
//             type="button"
//             onClick={toggleConfirmPasswordVisibility}
//             className="absolute right-3 top-[40%] text-gray-400"
//             aria-label="Toggle password visibility"
//           >
//             {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
//           </button>
//         </div>
//         {errors.confirmPassword && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.confirmPassword.message}
//           </span>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={loading || isSubmitting}
//         className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition ${
//           (loading || isSubmitting) && "bg-indigo-300 cursor-not-allowed"
//         }`}
//       >
//         {loading || isSubmitting ? "Loading..." : "Register"}
//       </button>
//     </form>
//   );
// };

// const RegisterForm = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] =
//     useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false); // To handle loading state
//   const [isSuccess, setIsSuccess] = useState<boolean>(false); // Track registration success

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleConfirmPasswordVisibility = () =>
//     setShowConfirmPassword(!showConfirmPassword);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//   } = useForm<RegisterFormData>();

//   const submitHandler = async (data: RegisterFormData) => {
//     setLoading(true);
//     // Simulate API call here
//     setTimeout(() => {
//       console.log("Form Submitted", data);
//       setLoading(false);
//       setIsSuccess(true); // Set success state after submission
//     }, 2000);
//   };

//   return (
//     <form
//       className="w-full sm:w-1/2 mx-auto my-16 bg-white p-8 rounded-lg shadow-lg"
//       onSubmit={handleSubmit(submitHandler)}
//     >
//       {/* Username Input */}
//       <div className="relative mb-6">
//         <Label
//           htmlFor="username"
//           className="block text-lg font-medium text-gray-700"
//         >
//           Username
//         </Label>
//         <div className="relative flex items-center">
//           <span className="absolute left-3 top-[40%] text-gray-400">
//             <FaRegUserCircle size={16} />
//           </span>
//           <Input
//             id="username"
//             {...register("username", { required: "Username diperlukan" })}
//             className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.username ? "border-red-500" : "focus:ring-blue-500"
//             }`}
//             disabled={loading}
//             placeholder="Masukkan username..."
//           />
//         </div>
//         {errors.username && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.username.message}
//           </span>
//         )}
//       </div>

//       {/* Email Input */}
//       <div className="relative mb-6">
//         <Label
//           htmlFor="email"
//           className="block text-lg font-medium text-gray-700"
//         >
//           Email
//         </Label>
//         <div className="relative flex items-center">
//           <span className="absolute left-3 top-[40%] text-gray-400">
//             <Mail size={16} />
//           </span>
//           <Input
//             id="email"
//             {...register("email", { required: "Email diperlukan" })}
//             className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.username ? "border-red-500" : "focus:ring-blue-500"
//             }`}
//             disabled={loading}
//             placeholder="Masukkan email..."
//           />
//         </div>
//         {errors.email && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.email.message}
//           </span>
//         )}
//       </div>

//       {/* Password Input */}
//       <div className="relative mb-6">
//         <Label
//           htmlFor="password"
//           className="block text-lg font-medium text-gray-700"
//         >
//           Password
//         </Label>
//         <div className="relative flex items-center">
//           <span className="absolute left-3 top-[40%] text-gray-400">
//             <FaKey size={16} />
//           </span>
//           <Input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             disabled={loading}
//             {...register("password", {
//               required: "Password diperlukan",
//               minLength: {
//                 value: 6,
//                 message: "Password minimal 6 karakter",
//               },
//             })}
//             className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.password ? "border-red-500" : "focus:ring-blue-500"
//             }`}
//             placeholder="Masukkan password..."
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="absolute right-3 top-[40%] text-gray-400"
//             aria-label="Toggle password visibility"
//           >
//             {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
//           </button>
//         </div>
//         {errors.password && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.password.message}
//           </span>
//         )}
//       </div>

//       {/* Confirm Password Input */}
//       <div className="relative mb-6">
//         <Label
//           htmlFor="confirmPassword"
//           className="block text-lg font-medium text-gray-700"
//         >
//           Confirm Password
//         </Label>
//         <div className="relative flex items-center">
//           <span className="absolute left-3 top-[40%] text-gray-400">
//             <FaKey size={16} />
//           </span>
//           <Input
//             id="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             {...register("confirmPassword", {
//               required: "Harap konfirmasi password",
//               validate: (value) =>
//                 value === watch("password") || "Password tidak sama",
//             })}
//             disabled={loading}
//             className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//               errors.confirmPassword ? "border-red-500" : "focus:ring-blue-500"
//             }`}
//             placeholder="Konfirmasi password..."
//           />
//           <button
//             type="button"
//             onClick={toggleConfirmPasswordVisibility}
//             className="absolute right-3 top-[40%] text-gray-400"
//             aria-label="Toggle password visibility"
//           >
//             {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
//           </button>
//         </div>
//         {errors.confirmPassword && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.confirmPassword.message}
//           </span>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={loading || isSubmitting}
//         className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition ${
//           (loading || isSubmitting) && "bg-indigo-300 cursor-not-allowed"
//         }`}
//       >
//         {loading || isSubmitting ? "Loading..." : "Register"}
//       </button>

//       {/* Success Message */}
//       {isSuccess && (
//         <div className="mt-6 text-green-500 text-sm font-medium">
//           Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.
//         </div>
//       )}
//     </form>
//   );
// };

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To handle error message

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>();

  const submitHandler = async (data: RegisterFormData) => {
    setLoading(true);
    setErrorMessage(null); // Clear any previous error messages
    // Simulate API call here
    setTimeout(() => {
      // Simulating success
      const isSuccess = Math.random() > 0.5; // Randomly decide success or failure
      if (isSuccess) {
        console.log("Form Submitted", data);
        setLoading(false);
        alert("Registrasi berhasil!"); // Show success message
      } else {
        // Simulating failure
        setLoading(false);
        setErrorMessage("Gagal melakukan registrasi. Coba lagi nanti."); // Set error message
      }
    }, 2000);
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
            {...register("username", { required: "Username diperlukan" })}
            className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.username ? "border-red-500" : "focus:ring-blue-500"
            }`}
            disabled={loading}
            placeholder="Masukkan username..."
          />
        </div>
        {errors.username && (
          <span className="text-red-500 text-sm mt-1">
            {errors.username.message}
          </span>
        )}
      </div>

      {/* Email Input */}
      <div className="relative mb-6">
        <Label
          htmlFor="email"
          className="block text-lg font-medium text-gray-700"
        >
          Email
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 top-[40%] text-gray-400">
            <Mail size={16} />
          </span>
          <Input
            id="email"
            {...register("email", { required: "Email diperlukan" })}
            className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.username ? "border-red-500" : "focus:ring-blue-500"
            }`}
            disabled={loading}
            placeholder="Masukkan email..."
          />
        </div>
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </span>
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
            type={showPassword ? "text" : "password"}
            disabled={loading}
            {...register("password", {
              required: "Password diperlukan",
              minLength: {
                value: 6,
                message: "Password minimal 6 karakter",
              },
            })}
            className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.password ? "border-red-500" : "focus:ring-blue-500"
            }`}
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
          <span className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </span>
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
              required: "Harap konfirmasi password",
              validate: (value) =>
                value === watch("password") || "Password tidak sama",
            })}
            disabled={loading}
            className={`w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.confirmPassword ? "border-red-500" : "focus:ring-blue-500"
            }`}
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
          <span className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 text-red-500 p-2 rounded mb-6">
          {errorMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || isSubmitting}
        className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition ${
          (loading || isSubmitting) && "bg-indigo-300 cursor-not-allowed"
        }`}
      >
        {loading || isSubmitting ? "Loading..." : "Register"}
      </button>
    </form>
  );
};
