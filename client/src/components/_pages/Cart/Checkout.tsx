import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/lib/store-cart";
import axios from "axios";
import Link from "next/link";
import React, { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { useCartContext, ValueState } from "./Providers";

type FormData = {
  token: string;
};

export default function Checkout() {
  const {setValue, value} = useCartContext()
  const renderPage: Record<string, React.ReactNode> = {
    checkout: <CheckoutSection />,
    continue: <ContinueSection />,
  };

  return (
    <div className="w-full p-4 shadow-md bg-white rounded-xl">
      <Radio setValue={setValue} />
      {renderPage[value]}
    </div>
  );
}

const CheckoutSection = () => {
  const { cartItems } = useCartStore();

  const totalPrice = cartItems.length
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;
  const costPrice = 0;

  return (
    <div className="py-4 rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Rincian Pemesanan</h3>

      {cartItems.length > 0 ? (
        <>
          <div className="flex justify-between text-gray-700">
            <strong>Total Belanja:</strong>
            <p className="font-medium">Rp {totalPrice.toLocaleString()}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <strong>Total Ongkir:</strong>
            <p className="font-medium">Rp {costPrice}</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <strong>Estimasi Total:</strong>
            <p className="font-medium">
              Rp {(totalPrice + costPrice).toLocaleString()}
            </p>
          </div>
          <Link href={"/checkout"}>
            <Button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              Checkout
            </Button>
          </Link>
        </>
      ) : (
        <div className="text-center text-gray-500">
          <p className="mb-4">Keranjang Anda kosong.</p>
          <Link href={"/products"}>
            <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Mulai Belanja
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const ContinueSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null); // URL Redirect
  const {setItems} = useCartContext()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResponseMessage(null);
    setRedirectUrl(null); // Reset URL setiap kali form disubmit

    try {
      const { data: resData } = await axios.get<
        General.ApiResponse<General.CartGetApiResponse>
      >("/api/cart", {
        params: { token: data.token },
      });

      if (!resData.data) return;
      const { status, redirect_url, statusMessage, cart_items } = resData.data;

      if (status === "awaiting_payment" || status === "pending") {
        setRedirectUrl(`${redirect_url}`);
        setResponseMessage(`Link pembayaran berhasil dibuat`);
        reset();
      } else {
        setResponseMessage(`${statusMessage}`);
      }
      
      setItems(cart_items)
    } catch (error) {
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
      <h3 className="text-lg font-bold mb-4">Lanjutkan Pembayaran</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="token"
            className="block text-gray-700 font-medium mb-2"
          >
            Token Pembayaran
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
            placeholder="Masukkan Token Pembayaran atau Order Id"
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.token
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.token && (
            <p className="text-red-500 text-sm mt-1">{errors.token.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full text-white py-2 rounded-lg transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Mengirim..." : "Kirim Token"}
        </button>
      </form>

      {/* Pesan Respon */}
      {responseMessage && (
        <p
          className={`mt-4 text-sm ${
            responseMessage.includes("berhasil")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {responseMessage}
        </p>
      )}

      {/* Tombol Redirect */}
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
  return (
    <RadioGroup
      className="flex gap-4"
      defaultValue="checkout"
      onValueChange={(e) => setValue(e as ValueState)}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="checkout" id="r1" />
        <Label htmlFor="r1">Checkout</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="continue" id="r2" />
        <Label htmlFor="r2">Lanjutkan Pembayaran</Label>
      </div>
    </RadioGroup>
  );
};
