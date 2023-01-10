declare namespace NodeJS {
   export interface ProcessEnv {
      readonly NODE_ENV: "development" | "production"
      readonly PORT: string | number
      readonly CLIENT_BASE_URL: string
      readonly SESSION_SECRET: string
      readonly DATABASE_URL: string
   }
}