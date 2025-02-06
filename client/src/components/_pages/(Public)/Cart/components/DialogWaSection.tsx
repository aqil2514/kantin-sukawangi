import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface WaFormData {
  name: string;
  additionalMessage?: string;
}

function ChatForm({ onSubmit }: { onSubmit: (data: WaFormData) => void }) {
  const { register, handleSubmit } = useForm<WaFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">*Nama Anda : </Label>
        <Input
          id="name"
          {...register("name", { required: "Nama harus diisi" })}
        />
      </div>
      <div>
        <Label htmlFor="additionalMessage">Pesan : </Label>
        <Textarea id="additionalMessage" {...register("additionalMessage")} />
      </div>
      <Button className="bg-green-700 hover:bg-green-500 text-white duration-200">
        <FaWhatsapp />
        Kirim Pesan ke WA
      </Button>
    </form>
  );
}

export default function DialogChatWa() {
  const submitHandler = (data: WaFormData) => {
    const isContinued = confirm(
      `Ini akan mengirim pesan ke WhatsApp: \nNama: ${data.name}\nPesan: ${data.additionalMessage || "(Tidak ada pesan)"}`
    );

    // TODO : Tangani ini nanti di server
    if (isContinued) {
        const transactionId = "ORD-2353612-asdsa-xzczxc";
      const phoneNumber = "6281779174118"; // Ganti dengan nomor tujuan dalam format internasional tanpa "+"
      const message = encodeURIComponent(
        `Halo Kantin Sukawangi!\nSaya ${data.name}, telah order pesanan dengan transaksi ID: ${transactionId} .\n${data.additionalMessage || ""}`
      );
      const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      window.open(waUrl, "_blank");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Chat Wa
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Chat Via Wa</DialogTitle>
          <DialogDescription>
            Masukkan nama dan pesan (opsional)
          </DialogDescription>
        </DialogHeader>
        <ChatForm onSubmit={submitHandler} />
      </DialogContent>
    </Dialog>
  );
}
