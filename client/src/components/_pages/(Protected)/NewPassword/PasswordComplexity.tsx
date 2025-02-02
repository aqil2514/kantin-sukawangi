import { PasswordComplexityProps } from ".";

export default function PasswordComplexity({
  passwordComplexity,
}: {
  passwordComplexity: PasswordComplexityProps;
}) {
  return (
    <>
      <div className="mt-2 space-y-1 text-sm text-gray-500">
        <p
          className={`flex items-center ${
            passwordComplexity.uppercase ? "text-green-500" : "text-red-500"
          }`}
        >
          {passwordComplexity.uppercase ? "✔" : "❌"} Minimal satu huruf besar
        </p>
        <p
          className={`flex items-center ${
            passwordComplexity.lowercase ? "text-green-500" : "text-red-500"
          }`}
        >
          {passwordComplexity.lowercase ? "✔" : "❌"} Minimal satu huruf kecil
        </p>
        <p
          className={`flex items-center ${
            passwordComplexity.number ? "text-green-500" : "text-red-500"
          }`}
        >
          {passwordComplexity.number ? "✔" : "❌"} Minimal satu angka
        </p>
        <p
          className={`flex items-center ${
            passwordComplexity.specialChar ? "text-green-500" : "text-red-500"
          }`}
        >
          {passwordComplexity.specialChar ? "✔" : "❌"} Minimal satu karakter
          khusus
        </p>
      </div>
    </>
  );
}
