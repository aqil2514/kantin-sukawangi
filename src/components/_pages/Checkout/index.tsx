"use client";

import { useStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import axios from "axios";

type ClientTransacationRequestBody = Omit<
  Transaction.TransactionRequestBody,
  "order_id"
>;

export default function Checkout() {
  const { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } =
    useStore();

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [userInfo, setUserInfo] = useState<ClientTransacationRequestBody>({
    customer_details: {
      email: "",
      full_name: "",
      phone: "",
    },
    gross_amount: calculateTotal(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      customer_details: { ...userInfo.customer_details, [name]: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !userInfo.customer_details.full_name ||
      !userInfo.customer_details.email ||
      !userInfo.customer_details.phone
    ) {
      alert("Mohon lengkapi data sebelum melanjutkan.");
      return;
    }

    return await axios.post("/api/checkout", userInfo);
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
              <h2 className="text-xl font-semibold mb-4">
                Informasi Pembayaran
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={userInfo.customer_details.full_name}
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
                    name="email"
                    value={userInfo.customer_details.email}
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
                    value={userInfo.customer_details.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-200"
                    placeholder="081234567890"
                  />
                </div>
                {/* Metode Pembayaran */}
                {/* <div>
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
                </div> */}
                <Button className="w-full mt-6">Lanjutkan Pembayaran</Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
