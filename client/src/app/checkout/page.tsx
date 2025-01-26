import Checkout from "@/components/_pages/Checkout";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Checkout",
    description:"Pembayaran"
  }

export default function CheckoutPage(){
    return <Checkout />
}