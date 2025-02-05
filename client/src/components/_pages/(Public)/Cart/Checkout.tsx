import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/lib/store-cart";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import React, { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCartContext, ValueState } from "./Providers";
import { useRouter } from "next/navigation";

type FormData = {
  token: string;
};

export default function Checkout() {
  const { setValue, value } = useCartContext();
  const renderPage: Record<string, React.ReactNode> = {
    checkout: <CheckoutSection />,
    continue: <ContinueSection />,
  };

  return (
    <div className="w-full p-4 shadow-md bg-white rounded-xl">
      {/* TODO : Ganti jadi pakek selec ajah. Nanti, tambahin juga chat via WA */}
      <Radio setValue={setValue} />
      {renderPage[value]}
    </div>
  );
}

const CheckoutSection = () => {
  const { cartItems } = useCartStore();
  const { data } = useCartContext();

  const totalPrice = cartItems.length
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;
  const costPrice = 0;

  return (
    <div className="py-4 rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">{data.detailOrder}</h3>

      {cartItems.length > 0 ? (
        <>
          <div className="flex justify-between text-gray-700">
            <strong>{data.amountOrder}:</strong>
            <p className="font-medium">Rp {totalPrice.toLocaleString()}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <strong>{data.amountShip}:</strong>
            <p className="font-medium">Rp {costPrice}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <strong>{data.totalAmount}:</strong>
            <p className="font-medium">
              Rp {(totalPrice + costPrice).toLocaleString()}
            </p>
          </div>
          <Link href={"/checkout"}>
            <Button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              {data.checkout}
            </Button>
          </Link>
        </>
      ) : (
        <div className="text-center text-gray-500">
          <p className="mb-4">{data.noItems}</p>
          <Link href={"/products"}>
            <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              {data.shoppingCta}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

// TODO : Komponen masih belum siap. Ini agak panjang dan lumayan ribet nanganinnya, fokus ke yang lain dulu ajah
const ContinueSection = () => {
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

const Radio = ({
  setValue,
}: {
  setValue: React.Dispatch<SetStateAction<ValueState>>;
}) => {
  const { data } = useCartContext();
  return (
    <RadioGroup
      className="flex gap-4"
      defaultValue="checkout"
      onValueChange={(e) => setValue(e as ValueState)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="checkout" id="r1" />
        <Label htmlFor="r1">{data.checkout}</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="continue" id="r2" />
        <Label htmlFor="r2">{data.continueOrder}</Label>
      </div>
    </RadioGroup>
  );
};
