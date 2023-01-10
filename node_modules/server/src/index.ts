import express, { json, static as _static, urlencoded, type Application } from "express"
import { join } from "path"
import { loggerMiddleware } from "@middlewares/logger"
import { sessionMiddleware } from "@middlewares/session"
import { corsMiddleware } from "@middlewares/cors"
// import { userRouter } from "@routers/user.router"
import { errorMiddleware } from "@middlewares/error"

const app: Application = express()

if (process.env["NODE_ENV"] === "production") {
   app.set("trust proxy", 1)
}

if (process.env["NODE_ENV"] === "development") {
   app.use(loggerMiddleware)
}

app.use(sessionMiddleware)

app.use(json())

app.use(urlencoded({
   extended: true
}))

app.use(_static(join(__dirname, "public")))

app.use(corsMiddleware)

// app.use("/api/users", userRouter)

app.use(errorMiddleware)

app.listen(process.env["PORT"] || 5000)