import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Nama Website";
  const description = searchParams.get("desc") || "Deskripsi singkat";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          backgroundColor: "#15803D", // Hijau (Tailwind green-700)
          color: "white",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "48px",
          fontWeight: "bold",
          padding: "20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Logo KS */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "150px",
            height: "150px",
            backgroundColor: "white",
            color: "#15803D",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "64px",
            fontWeight: "bold",
            borderRadius: "50%",
          }}
        >
          KS
        </div>

        {/* Title */}
        <h1 style={{ marginTop: "200px" }}>{title}</h1>

        {/* Description */}
        <p style={{ fontSize: "24px", marginTop: "10px", maxWidth: "900px" }}>
          {description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
