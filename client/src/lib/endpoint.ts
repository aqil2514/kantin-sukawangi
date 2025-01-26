export const endpoint: Record<string, string> = {
  production: `${process.env.PRODUCTION_SERVER}`,
  development: `${process.env.DEVELOPMENT_SERVER}`,
};

const isProduction = process.env.NODE_ENV === "production"

export const ksEndpoint = isProduction ? endpoint.production: endpoint.development