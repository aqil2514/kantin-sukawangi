"use client";
import Container from "@/components/Layouts/Container";
import { toast } from "@/hooks/use-toast";
import axios, { isAxiosError } from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodError } from "zod";
import PasswordComplexity from "./PasswordComplexity";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

interface NewPasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordComplexityProps {
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}

export default function NewPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const refEmail = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [passwordComplexities, setPasswordComplexities] =
    useState<PasswordComplexityProps>({
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewPasswordFormData>();

  useEffect(() => {
    if (!email) {
      return router.replace("/");
    }
    if (!refEmail.current) return;

    refEmail.current.value = email;
    return;
  }, [email, router]);

  const onSubmit = async (clientData: NewPasswordFormData) => {
    clientData.email = email as string;

    try {
      setIsLoading(true);
      const { data } = await axios.post<General.ApiResponse>(
        "/api/auth/new-password",
        clientData
      );

      toast({
        title: "Berhasil",
        description: data.message,
      });
      router.replace("/auth");
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.status;
        const data: General.ApiResponse = error.response?.data;

        if (status === 422) {
          const error = data.errors as ZodError;
          toast({
            title: "Ubah Password Gagal",
            variant: "destructive",
            description: error.issues[0].message,
          });
          return;
        }

        toast({
          title: "Gagal",
          description: data.message,
          variant: "destructive",
        });

        if (status === 403) {
          router.replace("/auth");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkPasswordComplexity = (password: string) => {
    setPasswordComplexities({
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password),
    });
  };

  const showPasswordHandler = (
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>
  ) => setIsVisible(!isVisible);

  const password = watch("password");

  useEffect(() => {
    checkPasswordComplexity(password || "");
  }, [password]);

  return (
    <Container type="main">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="my-4 text-center">Buat Password Baru</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <div className="relative"> {/* Add relative wrapper */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-400" /> {/* Email icon */}
              </div>
              <input
                type="email"
                disabled
                ref={refEmail}
                className="w-full p-2 border rounded pl-10" // Add padding for icon
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <div className="relative"> {/* Add relative wrapper */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" /> {/* Lock icon */}
              </div>
              <input
                type={isShowPassword ? "text" : "password"} // Toggle password visibility
                {...register("password", {
                  required: "Password diperlukan",
                  minLength: { value: 8, message: "Password minimal 8 karakter" },
                })}
                disabled={isLoading}
                className="w-full p-2 border rounded pl-10" // Add padding for icon
              />
              <button
                type="button"
                onClick={() => showPasswordHandler(isShowPassword, setIsShowPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {isShowPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />} {/* Eye/EyeSlash icon */}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <PasswordComplexity passwordComplexity={passwordComplexities} />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative"> {/* Add relative wrapper */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" /> {/* Lock icon */}
              </div>
              <input
                type={isShowConfirmPassword ? "text" : "password"} // Toggle password visibility
                disabled={isLoading}
                {...register("confirmPassword", {
                  required: "Konfirmasi password diperlukan",
                  validate: (value) => value === password || "Password tidak cocok",
                })}
                className="w-full p-2 border rounded pl-10" // Add padding for icon
              />
              <button
                type="button"
                onClick={() => showPasswordHandler(isShowConfirmPassword, setIsShowConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {isShowConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />} {/* Eye/EyeSlash icon */}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {isLoading ? "Mengubah Password" : "Ubah Password"}
          </button>
        </form>
      </div>
    </Container>
  );
}
