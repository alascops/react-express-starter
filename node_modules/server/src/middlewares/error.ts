import { type ErrorRequestHandler } from "express"

export const errorMiddleware: ErrorRequestHandler = (err, _, res, next) => {
   if (err) {
      res.status(res.statusCode).json({
         message: err.message,
         stack: process.env["NODE_ENV"] === "development" ? err.stack : undefined
      })
   }
   
   next()
}