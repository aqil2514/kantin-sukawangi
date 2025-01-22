import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NoProducts() {
  return (
    <div className="text-center">
      <p className="text-lg text-gray-600">Keranjang Anda kosong.</p>
      <Link href="/products">
        <Button className="mt-4">Ayo Belanja Dahulu!</Button>
      </Link>
    </div>
  );
}
