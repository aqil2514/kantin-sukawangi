import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema, ZodError } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<unknown>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // Lakukan validasi menggunakan Zod
      console.log(value)
      return this.schema.parse(value);
    } catch (error) {
      console.error("Zod Validation Error:", error); // 🔍 Logging error

      if (error instanceof ZodError) {
        // Mapping error Zod ke dalam format ValidationError
        const validationErrors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));

        throw new BadRequestException({
          message: "Validasi Gagal",
          errors: validationErrors,
        });
      }

      // Lempar kesalahan jika bukan dari Zod
      throw new BadRequestException("Validasi Gagal: Kesalahan tidak dikenal.");
    }
  }
}
