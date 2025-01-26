import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/lib/store-cart";
import Image from "next/image";

// export default function Products(){
//     const {cartItems} = useCartStore()
//     return (
//         <ScrollArea className="bg-white shadow-md h-[432px]">
//         <div className="flex flex-col gap-4">
//           {cartItems.length === 0 ? (
//             <p className="text-gray-500">Keranjang Anda kosong.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
//               >
//                 {/* Gambar Produk */}
//                 <Image
//                   src={`${item.imageUrl}`}
//                   alt={item.name}
//                   width={64}
//                   height={64}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
    
//                 {/* Detail Produk */}
//                 <div className="flex-1">
//                   <h3 className="text-lg font-bold">{item.name}</h3>
//                   <p className="text-gray-500">
//                     {item.quantity} x Rp{item.price.toLocaleString("id-ID")}
//                   </p>
//                 </div>
    
//                 {/* Total Harga per Produk */}
//                 <p className="font-medium">
//                   Rp{(item.price * item.quantity).toLocaleString("id-ID")}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//         </ScrollArea>
//       );
// }

export default function Products() {
    const { cartItems } = useCartStore();
  
    return (
      <ScrollArea className="bg-white shadow-md h-[432px] p-4 rounded-lg">
        <div className="flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">
              Keranjang Anda kosong.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow"
              >
                {/* Gambar Produk */}
                <Image
                  src={`${item.imageUrl}`}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg"
                />
  
                {/* Detail Produk */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-700">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x Rp{item.price.toLocaleString("id-ID")}
                  </p>
                </div>
  
                {/* Total Harga per Produk */}
                <p className="font-medium text-gray-700">
                  Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    );
  }
  