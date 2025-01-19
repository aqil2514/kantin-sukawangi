import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Fungsi untuk memformat angka ke dalam format mata uang.
 * @param amount - Nominal yang akan diformat.
 * @param locale - Locale yang digunakan (default: 'id-ID').
 * @param currency - Jenis mata uang (default: 'IDR').
 * @returns String dalam format mata uang.
 */
export function formatCurrency(amount: number, locale: string = 'id-ID', currency: string = 'IDR'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
