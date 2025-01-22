import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { FaRegCopy, FaTrashAlt } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
import { toast, useToast } from "@/hooks/use-toast";
import { TransactionResponse } from "midtrans-client";
import React, { SetStateAction, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaCircleInfo } from "react-icons/fa6";

type ToastFunction = (options: {
  variant: "destructive" | "success" | "info";
  title: string;
  description?: string;
}) => void;

//TODO : Buat form untuk melanjutkan pembayaran

export default function WithProducts() {
  const [token, setToken] = useState<string>("");
  const [redirectUrl, seteRedirectUrl] = useState<string>("");
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <ProductList token={token} />

      {token ? (
        <PaymentLink token={token} redirectUrl={redirectUrl} />
      ) : (
        <PaymentForm setToken={setToken} setRedirectUrl={seteRedirectUrl} />
      )}
    </div>
  );
}

const ProductList = ({ token }: { token: string }) => {
  const { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } =
    useStore();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const isCartLocked = Boolean(token); // Cart tidak dapat diubah jika token tersedia.

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Daftar Belanja</h2>
      <ScrollArea className="h-80">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex md:flex-row flex-col items-center justify-start gap-2 md:gap-0 md:justify-between py-4 border-b"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={String(item.imageUrl)}
                width={64}
                height={64}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Rp {formatCurrency(item.price)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => decreaseCartItem(String(item.id))}
                disabled={isCartLocked} // Tombol dinonaktifkan jika token tersedia.
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => increaseCartItem(String(item.id))}
                disabled={isCartLocked} // Tombol dinonaktifkan jika token tersedia.
              >
                +
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500"
                onClick={() => removeCartItem(String(item.id))}
                disabled={isCartLocked} // Tombol dinonaktifkan jika token tersedia.
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="flex justify-between items-center py-4 mt-4 border-t">
        <p className="text-xl font-semibold">Total:</p>
        <p className="text-xl font-semibold text-green-600">
          {formatCurrency(calculateTotal())}
        </p>
      </div>
    </div>
  );
};


const PaymentForm = ({
  setToken,
  setRedirectUrl,
}: {
  setToken: React.Dispatch<SetStateAction<string>>;
  setRedirectUrl: React.Dispatch<SetStateAction<string>>;
}) => {
  const { cartItems } = useStore();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Transaction.TransactionRequestBody>();
  const { toast } = useToast();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const onSubmit: SubmitHandler<Transaction.TransactionRequestBody> = async (
    data
  ) => {
    data.gross_amount = calculateTotal();

    try {
      const res = await axios.post<General.ApiResponse<TransactionResponse>>(
        "/api/checkout",
        data
      );

      const token = res.data.data?.token;
      const redirectUrl = res.data.data?.redirect_url;

      setToken(token as string);
      setRedirectUrl(redirectUrl as string);
    } catch (error) {
      errorHandling(error, toast as ToastFunction);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Informasi Pembayaran</h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium">Nama Lengkap</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
            placeholder="Nama Lengkap"
            disabled={isSubmitting}
            {...register("customer_details.full_name", {
              required: "Nama lengkap wajib diisi",
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
            placeholder="Alamat email"
            disabled={isSubmitting}
            {...register("customer_details.email")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nomor Telepon</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
            placeholder="081234567890"
            disabled={isSubmitting}
            {...register("customer_details.phone")}
          />
        </div>
        <Button className="w-full mt-6" disabled={isSubmitting}>
          {isSubmitting ? "Mohon tunggu..." : "Lanjutkan Pembayaran"}
        </Button>
      </form>
    </div>
  );
};

// const PaymentLink = ({
//   token,
//   redirectUrl,
// }: {
//   token: string;
//   redirectUrl: string;
// }) => {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
//       <h2 className="text-2xl font-bold mb-6">
//         Link Pembayaran Berhasil Dibuat
//       </h2>
//       <p className="text-gray-600 mb-6 leading-relaxed">
//         Klik tombol di bawah untuk melanjutkan ke halaman pembayaran, atau
//         gunakan token pembayaran untuk menyelesaikan transaksi di lain waktu.
//       </p>
//       <a
//         href={redirectUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block w-full text-center bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
//       >
//         Lanjutkan ke Pembayaran
//       </a>
//       <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-2">
//             <h3 className="text-sm font-semibold">Token Pembayaran</h3>
//             <Popover>
//               <PopoverTrigger>
//                 <FaCircleInfo className="text-gray-500 hover:text-gray-700 cursor-pointer" />
//               </PopoverTrigger>
//               <PopoverContent>
//                 Simpan token ini jika Anda ingin melakukan pembayaran di lain
//                 waktu.
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 bg-white p-2 rounded border border-gray-300">
//           <p className="text-gray-800 font-mono text-sm break-all flex-1">
//             {token}
//           </p>
//           <Button
//             variant="ghost"
//             onClick={() => {
//               navigator.clipboard.writeText(token);
//               toast({
//                 title: "Berhasil disalin",
//                 description: "Token Pembayaran telah disalin",
//               });
//             }}
//           >
//             <FaRegCopy className="mr-2" />
//             Salin
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

const PaymentLink = ({
  token,
  redirectUrl,
}: {
  token: string;
  redirectUrl: string;
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
      <h2 className="text-2xl font-bold mb-6">
        Link Pembayaran Berhasil Dibuat
      </h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Klik tombol di bawah untuk melanjutkan ke halaman pembayaran, atau
        gunakan token pembayaran untuk menyelesaikan transaksi di lain waktu.
      </p>
      <a
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Lanjutkan ke Pembayaran
      </a>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Token Pembayaran</h3>
            <Popover>
              <PopoverTrigger>
                <FaCircleInfo className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent>
                Simpan token ini jika Anda ingin melakukan pembayaran di lain
                waktu.
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded border border-gray-300">
          <p className="text-gray-800 font-mono text-sm break-all flex-1">
            {token}
          </p>
          <Button
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(token);
              toast({
                title: "Berhasil disalin",
                description: "Token Pembayaran telah disalin",
              });
            }}
          >
            <FaRegCopy className="mr-2" />
            Salin
          </Button>
        </div>
        {/* Informasi bahwa input token sedang dalam pengembangan */}
        <p className="text-sm text-gray-500 mt-4">
          Fitur untuk memasukkan token secara manual masih dalam tahap
          pengembangan. Harap tunggu pembaruan selanjutnya.
        </p>
      </div>
    </div>
  );
};


const errorHandling = (error: unknown, toast: ToastFunction) => {
  if (isAxiosError(error)) {
    const data: General.ApiResponse<unknown, General.ValidationError[]> =
      error.response?.data;
    console.error(data);

    toast({
      variant: "destructive",
      title: data.errors![0]?.message || "Terjadi kesalahan validasi",
      description: `Periksa Konsol untuk info lebih lanjut`,
    });
  } else {
    console.error("Unexpected error:", error);

    toast({
      variant: "destructive",
      title: "Kesalahan Tidak Diketahui",
      description:
        "Terjadi kesalahan tak terduga. Periksa konsol untuk detail lebih lanjut.",
    });
  }
};
