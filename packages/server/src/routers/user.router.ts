import { Router } from "express"
import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from "@controllers/user.controller"

export const userRouter = Router()

userRouter.get("/fetch", fetchUsers)
userRouter.get("/id=:id/fetch", fetchUser)
userRouter.post("/create", createUser)
userRouter.patch("/id=:id/update", updateUser)
userRouter.delete("/id=:id/delete", deleteUser)