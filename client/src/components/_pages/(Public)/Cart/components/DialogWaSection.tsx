import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useCartStore } from "@/lib/store-cart";
import { formatCurrency } from "@/lib/utils";

interface WaFormData {
  name: string;
  additionalMessage?: string;
}

interface ChatFormProps {
  onSubmit: (data: WaFormData) => void;
  isLoading?: boolean;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  isLoading?: boolean;
}

function ChatForm({ onSubmit, isLoading }: ChatFormProps) {
  const { register, handleSubmit } = useForm<WaFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">*Nama Anda : </Label>
        <Input
          id="name"
          {...register("name", { required: "Nama harus diisi" })}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor="additionalMessage">Pesan : </Label>
        <Textarea
          id="additionalMessage"
          {...register("additionalMessage")}
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        className="bg-green-700 hover:bg-green-500 text-white duration-200 flex items-center gap-2 my-4"
        disabled={isLoading}
      >
        {isLoading ? (
          "Mengirim..."
        ) : (
          <>
            <FaWhatsapp />
            Kirim Pesan ke WA
          </>
        )}
      </Button>
    </form>
  );
}

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi",
  message,
  isLoading,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-500"
          >
            {isLoading ? "Mengirim..." : "Lanjutkan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function DialogChatWa() {
  const { cartItems } = useCartStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<WaFormData | null>(null);

  const handleSubmit = (data: WaFormData) => {
    setFormData(data);
    setConfirmOpen(true);
  };

  const confirmSubmission = async () => {
    if (!formData) return;

    setConfirmOpen(false);
    setIsLoading(true);

    try {
      const { data } =
        await axios.get<General.ApiResponse<{ orderId: string }>>(
          "/api/cart/orderId"
        );
      const orderId = data.data?.orderId;

      if (!orderId) {
        toast({
          title: "Membuat orderId gagal",
          description: "Order Id tidak ada",
          variant: "destructive",
        });
        return;
      }

      const phoneNumber = "6285774885367";
      const message = encodeURIComponent(
        `Halo Kantin Sukawangi!\n\n` +
          `Saya ${formData.name}, telah order pesanan dengan:\n` +
          `ID Transaksi: ` +
          `${orderId}\n\n` +
          `Produk yang dipesan:\n` +
          cartItems
            .map(
              (item) =>
                `- ${item.name}\n  ${formatCurrency(item.price)} x ${item.quantity} = ${formatCurrency(item.price)} * ${item.quantity})}`
            )
            .join("\n") +
          `\n\nTotal Pesanan: ${formatCurrency(cartItems.reduce((acc, cur) => acc + cur.price * cur.quantity, 0))}\n\n` +
          `Keterangan Tambahan:\n${formData.additionalMessage}`
      );

      const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      window.open(waUrl, "_blank");
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error);
        toast({
          title: "Membuat orderId gagal",
          description: "Gagal mengambil Order ID. Silakan coba lagi",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Chat Wa
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Chat Via WhatsApp</DialogTitle>
            <DialogDescription>
              Masukkan nama dan pesan (opsional)
            </DialogDescription>
          </DialogHeader>
          <ChatForm onSubmit={handleSubmit} isLoading={isLoading} />
        </DialogContent>
      </Dialog>

      {/* Dialog Konfirmasi */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmSubmission}
        title="Konfirmasi Pengiriman"
        message={`Ini akan mengirim pesan ke WhatsApp Admin Kantin Sukawangi: \nNama: ${formData?.name}\nPesan: ${formData?.additionalMessage || "(Tidak ada pesan)"}`}
        isLoading={isLoading}
      />
    </>
  );
}
