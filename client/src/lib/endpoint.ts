export const endpoint: Record<string, string> = {
  production: `${process.env.PRODUCTION_SERVER}`,
  development: `${process.env.DEVELOPMENT_SERVER}`,
};

const isProduction = process.env.NODE_ENV === "production"

export const apiKeyGuard = `Bearer ${process.env.API_KEY}`;
export const ksEndpoint = isProduction ? endpoint.production: endpoint.development
export const publicEnpoint = isProduction ? "http://localhost:3000/images/logo.png" : "https://kantin-sukawangi.vercel.app/images/logo.png"; 