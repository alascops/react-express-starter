import { type RequestHandler } from "express"
import asyncHandler from "express-async-handler"
import { z } from "zod"
import { genSalt, hash } from "bcrypt"
import { prisma } from "@config/prisma"

export const fetchUser: RequestHandler = asyncHandler(async (req, res) => {
   const { id } = req.params

   const fetch = await prisma.user.findUnique({
      where: {
         id
      }
   })

   if (!fetch) {
      res.status(400)
      throw new Error("Failed to fetch user.")
   }

   res.status(200).json(fetch)
})

export const fetchUsers: RequestHandler = asyncHandler(async (_, res) => {
   const fetch = await prisma.user.findMany()

   if (!fetch) {
      res.status(400)
      throw new Error("Failed to fetch users.")
   }

   res.status(200).json(fetch)
})

export const createUser: RequestHandler = asyncHandler(async (req, res) => {
   const validation = z.object({
      username: z.string().trim().min(3).max(15).regex(/^[a-zA-Z0-9]([a-zA-Z0-9]|[._-](?![._-])){1,13}[a-zA-Z0-9]$/gm),
      emailAddress: z.string().trim().email().max(320).regex(/^([a-z0-9]+[a-z0-9!#$%&'*+/=?^_`{|}~-]?(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/gm),
      password: z.string().trim().min(8).max(15).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_])[\w!@#$%^&*-]+$/gm)
   })

   const result = validation.safeParse(req.body)

   if (!result.success) {
      throw new Error("Unable to create new user. Invalid or incomplete input.")
   } 

   const { username, emailAddress, password } = result.data

   try {
      const create = await prisma.user.create({
         data: {
            username,
            emailAddress,
            password: await hash(password, await genSalt())
         }
      })

      if (!create) {
         throw new Error("Unable to create new user. User creation failed.")
      }
   
      res.status(201).json(create)
   } catch (err) {
      throw new Error("Unable to create new user. User creation failed.")
   }
})

export const updateUser: RequestHandler = asyncHandler(async (req, res) => {
   const validation = z.object({
      username: z.string().trim().min(3).max(15).regex(/^[a-zA-Z0-9]([a-zA-Z0-9]|[._-](?![._-])){1,13}[a-zA-Z0-9]$/gm),
      emailAddress: z.string().trim().email().max(320).regex(/^([a-z0-9]+[a-z0-9!#$%&'*+/=?^_`{|}~-]?(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/gm),
      password: z.string().trim().min(8).max(15).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_])[\w!@#$%^&*-]+$/gm)
   })

   const { id } = req.params

   const result = validation.safeParse(req.body)

   if (!result.success) {
      throw new Error("Failed to update user. Incomplete or invalid input.")
   } 

   const { username, emailAddress, password } = result.data

   try {
      const update = await prisma.user.update({
         where: {
            id
         },
         data: {
            username,
            emailAddress,
            password: await hash(password, await genSalt())
         }
      })

      if (!update) {
         throw new Error("Failed to update user. User update failed.")
      }

      res.status(200).json(update)
   } catch (err) {
      throw new Error("Failed to update user. User update failed.")
   }
})

export const deleteUser: RequestHandler = asyncHandler(async (req, res) => {
   const { id } = req.params

   const _delete = await prisma.user.delete({
      where: {
         id
      }
   })

   if (!_delete) {
      res.status(400)
      throw new Error("Failed to delete user.")
   }

   res.status(200).json(_delete)
})