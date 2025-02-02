import NewPassword from "@/components/_pages/(Protected)/NewPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buat Password Baru",
};

export default function NewPasswordPage() {
  return <NewPassword />;
}
