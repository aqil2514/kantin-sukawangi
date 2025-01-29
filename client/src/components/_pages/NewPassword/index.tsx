"use client";
import Container from "@/components/Layouts/Container";
import { toast } from "@/hooks/use-toast";
import axios, { isAxiosError } from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ZodError } from "zod";

interface NewPasswordFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function NewPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const refEmail = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const [passwordComplexity, setPasswordComplexity] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

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
    setPasswordComplexity({
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password),
    });
  };

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
            <input
              type="email"
              disabled
              ref={refEmail}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password diperlukan",
                minLength: { value: 8, message: "Password minimal 8 karakter" },
              })}
              disabled={isLoading}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {/* Indikator Kompleksitas */}
            <div className="mt-2 space-y-1 text-sm text-gray-500">
              <p
                className={`flex items-center ${
                  passwordComplexity.uppercase
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordComplexity.uppercase ? "✔" : "❌"} Minimal satu huruf
                besar
              </p>
              <p
                className={`flex items-center ${
                  passwordComplexity.lowercase
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordComplexity.lowercase ? "✔" : "❌"} Minimal satu huruf
                kecil
              </p>
              <p
                className={`flex items-center ${
                  passwordComplexity.number ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordComplexity.number ? "✔" : "❌"} Minimal satu angka
              </p>
              <p
                className={`flex items-center ${
                  passwordComplexity.specialChar
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {passwordComplexity.specialChar ? "✔" : "❌"} Minimal satu
                karakter khusus
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              disabled={isLoading}
              {...register("confirmPassword", {
                required: "Konfirmasi password diperlukan",
                validate: (value) =>
                  value === password || "Password tidak cocok",
              })}
              className="w-full p-2 border rounded"
            />
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
