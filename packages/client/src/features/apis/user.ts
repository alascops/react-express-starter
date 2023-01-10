import { useMutation, useQuery } from "@tanstack/react-query"
import { type User } from "@prisma/client"
import { type AxiosError } from "axios"
import { api } from "@sourceroot/config/axios"
import { client } from "@sourceroot/config/client"

export const useFetchUserQuery = ({ id }: Pick<User, "id">) => useQuery<Susceptible<User>, AxiosError>({
   queryKey: ["user", id],
   queryFn: async () => (await api.get(`/users/id=${ id }/fetch`)).data
})

export const useFetchUsersQuery = () => useQuery<Susceptible<User[]>, AxiosError>({
   queryKey: ["users"],
   cacheTime: 10 * 60 * 1000,
   queryFn: async () => (await api.get("/users/fetch")).data
})

export const useCreateUserMutation = () => useMutation<Susceptible<User>, AxiosError, Pick<User, "username" | "emailAddress" | "password">>({
   mutationFn: async (data) => (await api.post("/users/create", data)).data,
   onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] })
   }
})

export const useUpdateUserMutation = () => useMutation<Susceptible<User>, AxiosError, Pick<User, "id" | "username" | "emailAddress" | "password">>({
   mutationFn: async ({ id, ...data }) => (await api.patch(`/users/id=${ id }/update`, { ...data })).data,
   onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user"] })
      client.invalidateQueries({ queryKey: ["users"] })
   }
})

export const useDeleteUserMutation = () => useMutation<Susceptible<User>, AxiosError, Pick<User, "id">>({
   mutationFn: async ({ id }) => (await api.delete(`/users/id=${ id }/delete`)).data,
   onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] })
   }
})