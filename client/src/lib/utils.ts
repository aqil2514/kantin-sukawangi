import { clsx, type ClassValue } from "clsx";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertProductToCartItem(
  product: Product.ProductAttributes
): General.CartItem {
  const newValue: General.CartItem = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    quantity: 1,
  };

  return newValue;
}

/**
 * Fungsi untuk memformat angka ke dalam format mata uang.
 * @param amount - Nominal yang akan diformat.
 * @param locale - Locale yang digunakan (default: 'id-ID').
 * @param currency - Jenis mata uang (default: 'IDR').
 * @returns String dalam format mata uang.
 */
export function formatCurrency(
  amount: number,
  locale: string = "id-ID",
  currency: string = "IDR"
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
}

export function useGetUser() {
  const auth = useSession();

  const session = auth.data;
  const user = session?.user as Auth.User;
  return { user, session };
}

export const toTitleCase = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

export const wait = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
