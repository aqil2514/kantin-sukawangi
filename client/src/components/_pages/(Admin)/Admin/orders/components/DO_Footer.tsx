// import React from "react";
// import { DialogClose } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";

// const Footer: React.FC<{ data?: Transaction.TransactionDb }> = ({ data }) => {
//   if (!data) return null;

//   const handleUpdateStatus = (status: string) => {
//     console.log(`Pesanan ${data.order_id} diperbarui ke status: ${status}`);
//   };

//   const handlePrintInvoice = () => {
//     console.log(`Mencetak invoice untuk pesanan ${data.order_id}`);
//   };

//   const handleDownloadTransaction = () => {
//     console.log(`Mengunduh data transaksi ${data.order_id}`);
//   };

//   const handleResendNotification = () => {
//     console.log(`Mengirim ulang notifikasi untuk pesanan ${data.order_id}`);
//   };

//   return (
//     <div className="flex flex-wrap gap-2 p-4 border-t border-gray-200">
//       {/* Tutup Dialog */}
//       <DialogClose className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition">
//         Tutup
//       </DialogClose>

//       {/* Pengaturan Status Pesanan */}
//       <Popover>
//         <PopoverTrigger className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//           Pengaturan Status
//         </PopoverTrigger>
//         <PopoverContent className="w-56 p-2 bg-white rounded-lg shadow-lg border">
//           <div className="flex flex-col space-y-2">
//             {data.status === "pending" && (
//               <Button 
//                 className="w-full bg-green-500 text-white hover:bg-green-600 transition" 
//                 onClick={() => handleUpdateStatus("completed")}
//               >
//                 Tandai sebagai Selesai
//               </Button>
//             )}
//             {(data.status === "pending" || data.status === "awaiting_payment") && (
//               <Button
//                 className="w-full bg-red-500 text-white hover:bg-red-600 transition"
//                 onClick={() => handleUpdateStatus("cancelled")}
//               >
//                 Batalkan Pesanan
//               </Button>
//             )}
//             {data.status === "settlement" && (
//               <Button
//                 className="w-full bg-yellow-500 text-white hover:bg-yellow-600 transition"
//                 onClick={() => handleUpdateStatus("refund")}
//               >
//                 Refund
//               </Button>
//             )}
//           </div>
//         </PopoverContent>
//       </Popover>

//       {/* CTA Tambahan */}
//       <Button 
//         className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition" 
//         onClick={handlePrintInvoice}
//       >
//         Cetak Invoice
//       </Button>

//       <Button 
//         className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition" 
//         onClick={handleDownloadTransaction}
//       >
//         Unduh Data Transaksi
//       </Button>

//       <Button 
//         className="px-4 py-2 border border-gray-500 text-gray-700 rounded-lg hover:bg-gray-200 transition" 
//         onClick={handleResendNotification}
//       >
//         Kirim Ulang Notifikasi
//       </Button>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check, X, RotateCcw, Printer, Download, Bell } from "lucide-react";

const Footer: React.FC<{ data?: Transaction.TransactionDb }> = ({ data }) => {
  if (!data) return null;

  const handleUpdateStatus = (status: string) => {
    console.log(`Pesanan ${data.order_id} diperbarui ke status: ${status}`);
  };

  const handlePrintInvoice = () => {
    console.log(`Mencetak invoice untuk pesanan ${data.order_id}`);
  };

  const handleDownloadTransaction = () => {
    console.log(`Mengunduh data transaksi ${data.order_id}`);
  };

  const handleResendNotification = () => {
    console.log(`Mengirim ulang notifikasi untuk pesanan ${data.order_id}`);
  };

  return (
    <div className="flex flex-wrap gap-2 p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
      {/* Tutup Dialog */}
      <DialogClose className="px-4 py-2 flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition">
        <X size={16} />
        Tutup
      </DialogClose>

      {/* Pengaturan Status Pesanan */}
      <Popover>
        <PopoverTrigger className="px-4 py-2 flex items-center gap-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
          <Check size={16} />
          Pengaturan Status
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2 bg-white rounded-lg shadow-lg border">
          <div className="flex flex-col space-y-2">
            {data.status === "pending" && (
              <Button
                className="w-full flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 transition shadow"
                onClick={() => handleUpdateStatus("completed")}
              >
                <Check size={16} />
                Tandai sebagai Selesai
              </Button>
            )}
            {(data.status === "pending" || data.status === "awaiting_payment") && (
              <Button
                className="w-full flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 transition shadow"
                onClick={() => handleUpdateStatus("cancelled")}
              >
                <X size={16} />
                Batalkan Pesanan
              </Button>
            )}
            {data.status === "settlement" && (
              <Button
                className="w-full flex items-center gap-2 bg-yellow-500 text-white hover:bg-yellow-600 transition shadow"
                onClick={() => handleUpdateStatus("refund")}
              >
                <RotateCcw size={16} />
                Refund
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* CTA Tambahan */}
      <Button
        className="px-4 py-2 flex items-center gap-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition shadow"
        onClick={handlePrintInvoice}
      >
        <Printer size={16} />
        Cetak Invoice
      </Button>

      <Button
        className="px-4 py-2 flex items-center gap-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition shadow"
        onClick={handleDownloadTransaction}
      >
        <Download size={16} />
        Unduh Data Transaksi
      </Button>

      <Button
        className="px-4 py-2 flex items-center gap-2 border bg-cyan-300 text-gray-700 rounded-lg hover:bg-cyan-200 transition shadow"
        onClick={handleResendNotification}
      >
        <Bell size={16} />
        Kirim Ulang Notifikasi
      </Button>
    </div>
  );
};

export default Footer;
