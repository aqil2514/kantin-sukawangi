import { useCartStore } from "@/lib/store-cart";
import { useCartContext, ValueState } from "../Providers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DialogChatWa from "./DialogWaSection";

export default function CheckoutSection({value}:{ value: ValueState }){
    const { cartItems } = useCartStore();
    const { data } = useCartContext();
  
    const totalPrice = cartItems.length
      ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
    const costPrice = 0;
  
    return (
      <div className="py-4 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">{data.detailOrder}</h3>
  
        {cartItems.length > 0 ? (
          <>
            <div className="flex justify-between text-gray-700">
              <strong>{data.amountOrder}:</strong>
              <p className="font-medium">Rp {totalPrice.toLocaleString()}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <strong>{data.amountShip}:</strong>
              <p className="font-medium">Rp {costPrice}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <strong>{data.totalAmount}:</strong>
              <p className="font-medium">
                Rp {(totalPrice + costPrice).toLocaleString()}
              </p>
            </div>
            {value === "checkout" && (
              <Link href={"/checkout"}>
                <Button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                  {data.checkout}
                </Button>
              </Link>
            )}
            {value === "chatWa" && <DialogChatWa />}
          </>
        ) : (
          <div className="text-center text-gray-500">
            <p className="mb-4">{data.noItems}</p>
            <Link href={"/products"}>
              <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                {data.shoppingCta}
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  };