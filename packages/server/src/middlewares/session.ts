import session, { type CookieOptions, type SessionOptions } from "express-session"
import { store } from "@config/prisma"

const cookieOptions: CookieOptions = {
   maxAge: 24 * 60 * 60 * 1000,
   secure: process.env["NODE_ENV"] === "production",
   sameSite: process.env["NODE_ENV"] === "production" ? "none" : "lax",
   httpOnly: true
}

const sessionOptions: SessionOptions = {
   secret: process.env["SESSION_SECRET"].split(" "),
   resave: true,
   saveUninitialized: false,
   rolling: true,
   store: store,
   cookie: cookieOptions
}

export const sessionMiddleware = session(sessionOptions)