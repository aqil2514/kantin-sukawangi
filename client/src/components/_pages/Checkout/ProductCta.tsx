import { useCartStore } from "@/lib/store-cart";
import { useWpContext } from "./Providers";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, useToast } from "@/hooks/use-toast";
import axios, { isAxiosError } from "axios";
import { TransactionResponse } from "midtrans-client";
import { errorHandling, ToastFunction } from "./logic";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaCircleInfo } from "react-icons/fa6";
import {
  FaCheckCircle,
  FaRegCopy,
  FaRegSadCry,
  FaRegTimesCircle,
  FaTimesCircle,
  FaUndoAlt,
} from "react-icons/fa";

export default function ProjectCta() {
  const { paymentStatus } = useWpContext();

  if (paymentStatus === "nothing") return <PaymentForm />;
  else if (paymentStatus === "awaiting_payment" || paymentStatus === "pending")
    return <PaymentLink />;
  else if (paymentStatus === "expire") return <PaymentExpire />;
  else if (paymentStatus === "settlement") return <PaymentSettlement />;
  else if (paymentStatus === "deny") return <PaymentDeny />;
  else if (paymentStatus === "cancel") return <PaymentCancel />
  else if (paymentStatus === "refund") return <PaymentRefund />
}

const PaymentForm = () => {
  const { setToken, setRedirectUrl, setOrderId, setPaymentStatus } =
    useWpContext();
  const { cartItems } = useCartStore();
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
      const orderId = res.data.data?.token_id;

      setToken(token as string);
      setRedirectUrl(redirectUrl as string);
      setOrderId(orderId as string);
      setPaymentStatus("awaiting_payment");
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

const PaymentLink = () => {
  const { orderId, token, redirectUrl, setPaymentStatus } = useWpContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkStatusHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<
        General.ApiResponse<Transaction.CheckTransactionStatus>
      >("/api/checkout", {
        params: { orderId },
      });

      console.log(res.data.data);

      setPaymentStatus(res.data.data?.transaction_status ?? "awaiting_payment");

      toast({
        title: "Status Transaksi",
        description: res.data.message,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.status;
        const data = error.response?.data as General.ApiResponse;

        if (status === 404) {
          toast({
            variant: "destructive",
            title: "Tidak Ditemukan",
            description: data.message,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Terjadi Kesalahan",
            description: "Tidak dapat memproses permintaan. Coba lagi nanti.",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
      {/* Judul */}
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Link Pembayaran Berhasil Dibuat
      </h2>

      {/* Deskripsi */}
      <p className="text-gray-600 mb-6 text-center leading-relaxed">
        Klik tombol di bawah untuk melanjutkan ke halaman pembayaran, atau
        gunakan token pembayaran untuk menyelesaikan transaksi di lain waktu.
      </p>

      {/* Order ID */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Order ID</h3>
        <p className="text-gray-800 font-mono text-sm break-all">{orderId}</p>
      </div>

      {/* Tombol Cek Status Pesanan */}
      <button
        className="block w-full mb-4 text-center disabled:bg-green-300 disabled:cursor-not-allowed bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition-all duration-200"
        onClick={checkStatusHandler}
        aria-label="Cek Status Pesanan"
        disabled={isLoading}
      >
        {isLoading ? "Mengecek Status Pesanan...." : "Cek Status Pesanan"}
      </button>

      {/* Tombol Lanjutkan ke Pembayaran */}
      <a
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
        aria-label="Lanjutkan ke Pembayaran"
      >
        Lanjutkan ke Pembayaran
      </a>

      {/* Token Pembayaran */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Token Pembayaran</h3>
            <Popover>
              <PopoverTrigger>
                <FaCircleInfo
                  className="text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label="Informasi Token Pembayaran"
                />
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
            aria-label="Salin Token"
          >
            <FaRegCopy className="mr-2" />
            Salin
          </Button>
        </div>
        {/* Informasi bahwa input token sedang dalam pengembangan */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Fitur untuk memasukkan token secara manual masih dalam tahap
          pengembangan. Harap tunggu pembaruan selanjutnya.
        </p>
      </div>
    </div>
  );
};

const PaymentExpire = () => {
  const { setPaymentStatus } = useWpContext();

  const handleRetryPayment = () => {
    // Ubah status pembayaran untuk memungkinkan pengguna memulai kembali proses pembayaran
    setPaymentStatus("nothing");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
      {/* Icon atau ilustrasi */}
      <div className="text-center mb-6">
        <FaRegSadCry className="text-red-500 text-6xl mx-auto" />
      </div>

      {/* Judul */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-red-600">
        Pembayaran Kedaluwarsa
      </h2>

      {/* Deskripsi */}
      <p className="text-gray-600 mb-6 text-center leading-relaxed">
        Maaf, pembayaran link Pembayaran telah kedaluwarsa. Silakan buat
        pembayaran baru untuk melanjutkan transaksi.
      </p>

      {/* Tombol untuk memulai ulang pembayaran */}
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        onClick={handleRetryPayment}
        aria-label="Mulai Ulang Pembayaran"
      >
        Mulai Ulang Pembayaran
      </Button>
    </div>
  );
};

const PaymentSettlement = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
      {/* Ikon atau ilustrasi */}
      <div className="text-center mb-6">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto" />
      </div>

      {/* Judul */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">
        Pembayaran Berhasil
      </h2>

      {/* Deskripsi */}
      <p className="text-gray-600 mb-6 text-center leading-relaxed">
        Terima kasih! Pembayaran Anda telah berhasil diproses. Anda sekarang
        dapat melanjutkan ke dashboard untuk melihat detail layanan Anda.
      </p>

      {/* Tombol untuk ke dashboard */}
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        onClick={() => alert("Dalam pengembangan")}
        aria-label="Lihat Dashboard"
      >
        Lihat Dashboard
      </Button>
    </div>
  );
};

const PaymentDeny = () => {
  const handleRetryPayment = () => {
    alert("Under development");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
      {/* Ikon atau ilustrasi */}
      <div className="text-center mb-6">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto" />
      </div>

      {/* Judul */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-red-600">
        Pembayaran Ditolak
      </h2>

      {/* Deskripsi */}
      <p className="text-gray-600 mb-6 text-center leading-relaxed">
        Pembayaran Anda ditolak. Harap periksa kembali metode pembayaran yang
        Anda pilih atau coba metode lain. Jika masalah berlanjut, silakan
        hubungi layanan pelanggan.
      </p>

      {/* Tombol untuk mencoba ulang pembayaran */}
      <Button
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        onClick={handleRetryPayment}
        aria-label="Coba Pembayaran Ulang"
      >
        Coba Pembayaran Ulang
      </Button>
    </div>
  );
};

const PaymentCancel = () => {
  const handleReturnToShop = () => {
    // Arahkan pengguna kembali ke halaman utama atau ke halaman belanja
    alert("Dalam pengembangan"); // Ubah path sesuai dengan halaman yang relevan
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
      {/* Ikon atau ilustrasi */}
      <div className="text-center mb-6">
        <FaRegTimesCircle className="text-yellow-500 text-6xl mx-auto" />
      </div>

      {/* Judul */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-600">
        Pembayaran Dibatalkan
      </h2>

      {/* Deskripsi */}
      <p className="text-gray-600 mb-6 text-center leading-relaxed">
        Pembayaran Anda telah dibatalkan. Jika ini adalah kesalahan, Anda dapat
        mencoba lagi. Silakan kembali ke halaman belanja untuk memilih produk
        lain atau melanjutkan ke checkout.
      </p>

      {/* Tombol untuk kembali ke halaman belanja */}
      <Button
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg"
        onClick={handleReturnToShop}
        aria-label="Kembali ke Halaman Belanja"
      >
        Kembali ke Halaman Belanja
      </Button>
    </div>
  );
};

const PaymentRefund = () => {
    const handleRefundAlert = () => {
      alert("Pembayaran Anda telah dikembalikan. Terima kasih atas kesabarannya.");
    };
  
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
        {/* Ikon atau ilustrasi */}
        <div className="text-center mb-6">
          <FaUndoAlt className="text-green-500 text-6xl mx-auto" />
        </div>
  
        {/* Judul */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">
          Pembayaran Dikembalikan
        </h2>
  
        {/* Deskripsi */}
        <p className="text-gray-600 mb-6 text-center leading-relaxed">
          Pembayaran Anda telah diproses untuk pengembalian. Kami akan segera
          memproses refund sesuai kebijakan kami. Terima kasih atas kesabarannya.
        </p>
  
        {/* Tombol untuk menampilkan alert */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          onClick={handleRefundAlert}
          aria-label="Tampilkan Info Refund"
        >
          Tampilkan Info Refund
        </Button>
      </div>
    );
  };