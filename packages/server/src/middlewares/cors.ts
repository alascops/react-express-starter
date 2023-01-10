import cors, { type CorsOptions } from "cors"

const corsOptions: CorsOptions = {
   credentials: true,
   optionsSuccessStatus: 200,
   origin: process.env["CLIENT_BASE_URL"]
}

export const corsMiddleware = cors(corsOptions)