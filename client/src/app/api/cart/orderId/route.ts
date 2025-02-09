import { ksEndpoint } from "@/lib/endpoint";
import axios, { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Pastikan API Key tersedia
    if (!process.env.API_KEY) {
      console.error("API Key tidak ditemukan");
      return NextResponse.json(
        { message: "API Key tidak ditemukan" },
        { status: 500 }
      );
    }

    // Ambil data dari request body
    const clientData =
      (await req.json()) as Transaction.TransactionDbWaClientData;

    // Validasi data sebelum dikirim ke server
    if (!clientData || !clientData.amount || !clientData.order_details) {
      return NextResponse.json(
        { message: "Data yang dikirim tidak valid" },
        { status: 400 }
      );
    }

    // Kirim permintaan ke backend
    const { data } = await axios.post<
      General.ApiResponse<Transaction.TransactionDbWa>
    >(`${ksEndpoint}/api/cart/orderId`, clientData, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    // Berhasil, kirim respons ke frontend
    return NextResponse.json(data);
  } catch (error) {
    // Tangani error axios
    if (isAxiosError(error)) {
      console.error("Error fetching orderId:", error);
      return NextResponse.json(
        { message: "Gagal mengambil orderId", error: error.message },
        { status: error.response?.status || 500 }
      );
    }

    // Tangani error lainnya
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}
