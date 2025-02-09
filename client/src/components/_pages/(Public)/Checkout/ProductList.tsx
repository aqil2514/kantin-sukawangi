// import { useCartStore } from "@/lib/store-cart";
// import { useWpContext } from "./Providers";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import Image from "next/image";
// import { formatCurrency } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { FaTrashAlt } from "react-icons/fa";

// export default function ProductList () {
//   const { token } = useWpContext();
//   const { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } =
//     useCartStore();

//   const calculateTotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const isCartLocked = Boolean(token); // Cart tidak dapat diubah jika token tersedia.

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Daftar Belanja</h2>
//       <ScrollArea className="h-80">
//         {cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex md:flex-row flex-col items-center justify-start gap-2 md:gap-0 md:justify-between py-4 border-b"
//           >
//             <div className="flex items-center space-x-4">
//               <Image
//                 src={String(item.imageUrl)}
//                 width={64}
//                 height={64}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded-md"
//               />
//               <div>
//                 <p className="font-medium">{item.name}</p>
//                 <p className="text-sm text-gray-500">
//                   Rp {formatCurrency(item.price)}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => decreaseCartItem(String(item.id))}
//                 disabled={isCartLocked} // Tombol dinonaktifkan jika token tersedia.
//               >
//                 -
//               </Button>
//               <span>{item.quantity}</span>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => increaseCartItem(String(item.id))}
//                 disabled={isCartLocked} // Tombol dinonaktifkan jika token tersedia.
//               >
//                 +
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="text-red-500"
//                 onClick={() => removeCartItem(String(item.id))}
//                 disabled={isCartLocked} // Tombol dinonaktifkan jika token tersedia.
//               >
//                 <FaTrashAlt />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </ScrollArea>
//       <div className="flex justify-between items-center py-4 mt-4 border-t">
//         <p className="text-xl font-semibold">Total:</p>
//         <p className="text-xl font-semibold text-green-600">
//           {formatCurrency(calculateTotal())}
//         </p>
//       </div>
//     </div>
//   );
// };

import { useCartStore } from "@/lib/store/cart";
import { useWpContext } from "./Providers";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";

export default function ProductList() {
  const { token, paymentStatus } = useWpContext(); // Ambil paymentStatus dari context
  const { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } = useCartStore();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const isCartLocked = Boolean(token) || paymentStatus === "awaiting_payment" || paymentStatus === "pending" || paymentStatus === "expire"; // Cek apakah cart terkunci

  const renderLockedMessage = () => {
    if (paymentStatus === "awaiting_payment") {
      return <p className="text-yellow-500 text-sm">Pembayaran sedang menunggu konfirmasi.</p>;
    }
    if (paymentStatus === "pending") {
      return <p className="text-orange-500 text-sm">Pembayaran sedang diproses.</p>;
    }
    if (paymentStatus === "expire") {
      return <p className="text-red-500 text-sm">Pembayaran Anda telah kedaluwarsa.</p>;
    }
    return null;
  };

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
                <p className="text-sm text-gray-500">Rp {formatCurrency(item.price)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => decreaseCartItem(String(item.id))}
                disabled={isCartLocked}
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => increaseCartItem(String(item.id))}
                disabled={isCartLocked}
              >
                +
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500"
                onClick={() => removeCartItem(String(item.id))}
                disabled={isCartLocked}
              >
                <FaTrashAlt />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>

      {/* Tampilkan pesan jika status pembayaran tidak normal */}
      {renderLockedMessage()}

      <div className="flex justify-between items-center py-4 mt-4 border-t">
        <p className="text-xl font-semibold">Total:</p>
        <p className="text-xl font-semibold text-green-600">
          {formatCurrency(calculateTotal())}
        </p>
      </div>
    </div>
  );
}
