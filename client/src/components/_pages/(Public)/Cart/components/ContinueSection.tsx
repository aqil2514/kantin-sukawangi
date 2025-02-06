import { useEffect, useState } from "react";
import { useCartContext } from "../Providers";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";

type FormData = {
    token: string;
  };

// TODO : Komponen masih belum siap. Ini agak panjang dan lumayan ribet nanganinnya, fokus ke yang lain dulu ajah
export default function ContinueSection () {
    const { data } = useCartContext();
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const { setItems } = useCartContext();
    const router = useRouter();
  
    const isFeatureAvailable = false; // Ubah ke `true` jika ingin mengaktifkan fitur
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<FormData>();
  
    useEffect(() => {
      if (countdown === null || countdown <= 0) return;
  
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [countdown]);
  
    const onSubmit = async (data: FormData) => {
      if (!isFeatureAvailable) return; // **Mencegah eksekusi jika fitur belum aktif**
  
      setIsLoading(true);
      setResponseMessage(null);
      setRedirectUrl(null);
      setCountdown(null);
  
      try {
        const { data: resData } = await axios.get<
          General.ApiResponse<General.CartGetApiResponse>
        >("/api/cart", {
          params: { token: data.token },
        });
  
        if (!resData.data) return;
        const { status, statusMessage, cart_items, redirect_url, order_id } =
          resData.data;
  
        const token = redirect_url ? redirect_url.split("/").pop() : null;
        const items = JSON.stringify(cart_items);
  
        if (status === "awaiting_payment" || status === "pending") {
          setResponseMessage("Link pembayaran ditemukan, sedang mengalihkan...");
          reset();
          setCountdown(3);
  
          setTimeout(() => {
            sessionStorage.setItem(
              "checkoutData",
              JSON.stringify({ token, order_id, redirect_url, items })
            );
            router.push(`/checkout`);
          }, 3000);
        } else {
          setResponseMessage(statusMessage);
        }
  
        setItems(cart_items);
      } catch (error) {
        if (isAxiosError(error)) {
          const status = error.response?.status;
  
          if (status === 404) {
            setResponseMessage("Token tidak valid");
            return;
          }
        }
        console.error(error);
        setResponseMessage(
          "Terjadi kesalahan. Token tidak valid atau server bermasalah."
        );
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="py-4 p-6 bg-white shadow rounded-lg">
        <h3 className="text-lg font-bold mb-4">{data.continueOrder}</h3>
  
        {/* **Tambahkan Peringatan jika fitur belum tersedia** */}
        {!isFeatureAvailable && (
          <p className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded">
            🚧 Fitur ini dalam pengembangan. Harap tunggu update selanjutnya.
          </p>
        )}
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="token"
              className="block text-gray-700 font-medium mb-2"
            >
              {data.orderToken}
            </label>
            <input
              type="text"
              id="token"
              {...register("token", {
                required: "Token wajib diisi",
                minLength: {
                  value: 8,
                  message: "Token harus memiliki minimal 8 karakter",
                },
              })}
              placeholder={data.inputTokenPlaceholder}
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.token
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={!isFeatureAvailable} // **Nonaktifkan input jika fitur belum siap**
            />
            {errors.token && (
              <p className="text-red-500 text-sm mt-1">{errors.token.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition ${
              isLoading || !isFeatureAvailable
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading || !isFeatureAvailable} // **Nonaktifkan tombol jika fitur belum siap**
          >
            {isFeatureAvailable
              ? isLoading
                ? "Mengirim..."
                : data.sendToken
              : "Fitur Belum Tersedia"}
          </button>
        </form>
  
        {responseMessage && (
          <p
            className={`mt-4 text-sm ${responseMessage.includes("ditemukan") ? "text-green-500" : "text-red-500"}`}
          >
            {responseMessage}
          </p>
        )}
  
        {countdown !== null && countdown > 0 && (
          <p className="mt-2 text-blue-500 text-sm">
            Anda akan dialihkan dalam {countdown} detik...
          </p>
        )}
  
        {redirectUrl && (
          <a
            href={redirectUrl}
            className="mt-4 inline-block w-full text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            target="_blank"
          >
            Lanjutkan ke Pembayaran
          </a>
        )}
      </div>
    );
  };