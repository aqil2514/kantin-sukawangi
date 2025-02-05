import Image from "next/image";

export default function NoProductsFound() {
  return (
    <div className="w-full flex justify-center flex-wrap items-center flex-col gap-4">
      <Image
        src="/images/illustration/not-products-found.webp"
        height={320}
        width={320}
        alt="No Product Found"
        className="max-w-sm"
      />
      <p className="text-lg font-semibold text-center text-gray-700">
        Ups... Produk tidak tersedia...
      </p>
    </div>
  );
}
