
// "use client";

// import { useStore } from "@/lib/store";
// import { formatCurrency } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { FaTrashAlt } from "react-icons/fa";
// import Image from "next/image";
// import Link from "next/link";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useState } from "react";

// export default function Checkout() {
//   const { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } =
//     useStore();

//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     paymentMethod: "credit_card",
//   });

//   const calculateTotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setUserInfo({ ...userInfo, [name]: value });
//   };

//   const handleSubmit = () => {
//     if (!userInfo.name || !userInfo.address || !userInfo.phone) {
//       alert("Mohon lengkapi data sebelum melanjutkan.");
//       return;
//     }
//     // Proses pembayaran atau kirim data ke backend
//     console.log("Data Pengguna:", userInfo);
//     console.log("Keranjang:", cartItems);
//     alert("Pesanan Anda sedang diproses.");
//   };

//   return (
//     <div className="px-4 pt-40 pb-12">
//       <h2 className="text-2xl font-semibold">Checkout</h2>

//       <div className="my-4">
//         {cartItems.length === 0 ? (
//           <div>
//             <p>Keranjang Anda kosong.</p>
//             <Link href="/products">
//               <Button>Ayo Belanja Dahulu!</Button>
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <ScrollArea className="h-80">
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between py-2 border-b"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <Image
//                         src={String(item.imageUrl)}
//                         width={64}
//                         height={64}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded-md"
//                       />
//                       <div>
//                         <p className="font-medium">{item.name}</p>
//                         <p className="text-sm text-gray-500">
//                           Rp {formatCurrency(item.price)}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                       <Button
//                         variant="outline"
//                         onClick={() => decreaseCartItem(String(item.id))}
//                       >
//                         -
//                       </Button>
//                       <span>{item.quantity}</span>
//                       <Button
//                         variant="outline"
//                         onClick={() => increaseCartItem(String(item.id))}
//                       >
//                         +
//                       </Button>
//                     </div>

//                     <Button
//                       variant="outline"
//                       className="text-red-500"
//                       onClick={() => removeCartItem(String(item.id))}
//                     >
//                       <FaTrashAlt />
//                     </Button>
//                   </div>
//                 ))}
//               </ScrollArea>
//               <div className="flex justify-between items-center py-4 mt-4 border-t">
//                 <p className="text-xl font-semibold">Total:</p>
//                 <p className="text-xl font-semibold">
//                   Rp {formatCurrency(calculateTotal())}
//                 </p>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-medium">Informasi Pembayaran</h3>
//               <form className="space-y-4 mt-4">
//                 <div>
//                   <label className="block text-sm font-medium">
//                     Nama Lengkap
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={userInfo.name}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                     placeholder="Nama Lengkap"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">
//                     Alamat Pengiriman
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={userInfo.address}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                     placeholder="Alamat"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">
//                     Nomor Telepon
//                   </label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={userInfo.phone}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                     placeholder="081234567890"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">
//                     Metode Pembayaran
//                   </label>
//                   <select
//                     name="paymentMethod"
//                     value={userInfo.paymentMethod}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded-md"
//                   >
//                     <option value="credit_card">Kartu Kredit</option>
//                     <option value="bank_transfer">Transfer Bank</option>
//                     <option value="cash_on_delivery">Bayar di Tempat</option>
//                   </select>
//                 </div>
//               </form>
//               <Button className="w-full mt-4" onClick={handleSubmit}>
//                 Lanjutkan Pembayaran
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Checkout() {
  const { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } =
    useStore();

  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "credit_card",
  });

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = () => {
    if (!userInfo.name || !userInfo.address || !userInfo.phone) {
      alert("Mohon lengkapi data sebelum melanjutkan.");
      return;
    }
    console.log("Data Pengguna:", userInfo);
    console.log("Keranjang:", cartItems);
    alert("Pesanan Anda sedang diproses.");
  };

  return (
    <div className="px-4 pt-40 pb-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <div className="my-4">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">Keranjang Anda kosong.</p>
            <Link href="/products">
              <Button className="mt-4">Ayo Belanja Dahulu!</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Daftar Produk */}
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
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => increaseCartItem(String(item.id))}
                      >
                        +
                      </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                      onClick={() => removeCartItem(String(item.id))}
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

            {/* Form Pembayaran */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Informasi Pembayaran</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    placeholder="Nama Lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Alamat Pengiriman
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    placeholder="Alamat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    placeholder="081234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Metode Pembayaran
                  </label>
                  <select
                    name="paymentMethod"
                    value={userInfo.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                  >
                    <option value="credit_card">Kartu Kredit</option>
                    <option value="bank_transfer">Transfer Bank</option>
                    <option value="cash_on_delivery">Bayar di Tempat</option>
                  </select>
                </div>
              </form>
              <Button className="w-full mt-6" onClick={handleSubmit}>
                Lanjutkan Pembayaran
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

