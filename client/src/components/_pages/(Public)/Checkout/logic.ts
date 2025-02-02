import { isAxiosError } from "axios";

export type ToastFunction = (options: {
  variant: "destructive" | "success" | "info";
  title: string;
  description?: string;
}) => void;

export const errorHandling = (error: unknown, toast: ToastFunction) => {
    if (isAxiosError(error)) {
      const data: General.ApiResponse<unknown, General.ValidationError[]> =
        error.response?.data;
      console.error(data);
  
      toast({
        variant: "destructive",
        title: data.errors![0]?.message || "Terjadi kesalahan validasi",
        description: `Periksa Konsol untuk info lebih lanjut`,
      });
    } else {
      console.error("Unexpected error:", error);
  
      toast({
        variant: "destructive",
        title: "Kesalahan Tidak Diketahui",
        description:
          "Terjadi kesalahan tak terduga. Periksa konsol untuk detail lebih lanjut.",
      });
    }
  };
  