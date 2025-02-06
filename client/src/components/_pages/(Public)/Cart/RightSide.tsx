import React, { SetStateAction } from "react";
import { useCartContext, ValueState } from "./Providers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CheckoutSection from "./components/CheckoutSection";
import ContinueSection from "./components/ContinueSection";

export default function Checkout() {
  const { setValue, value } = useCartContext();
  const renderPage: Record<ValueState, React.ReactNode> = {
    chatWa: <CheckoutSection value={value} />,
    checkout: <CheckoutSection value={value} />,
    continue: <ContinueSection />,
  };

  return (
    <div className="w-full p-4 shadow-md bg-white rounded-xl">
      <SelectAction setValue={setValue} />
      {renderPage[value]}
    </div>
  );
}

const SelectAction: React.FC<{
  setValue: React.Dispatch<SetStateAction<ValueState>>;
}> = ({ setValue }) => {
  return (
    <Select onValueChange={(e) => setValue(e as ValueState)}>
      <SelectTrigger className="w-[180px] mb-8">
        <SelectValue placeholder="Tindak Lanjut" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tindak Lanjut</SelectLabel>
          <SelectItem value="checkout">Checkout</SelectItem>
          <SelectItem value="continue">Lanjutkan</SelectItem>
          <SelectItem value="chatWa">Chat via WA</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
