import store from "zustand"
import { persist } from "zustand/middleware"
import { type User } from "@prisma/client"

interface IAuthStore {
   user: Nullable<User>,
   authenticate: (user: User) => void,
   deauthenticate: () => void
}

export const useAuthStore = store<IAuthStore>()(
   persist<IAuthStore>(
      (set) => ({
         user: null,
         authenticate: (user) => set((state) => ({ ...state, user })),
         deauthenticate: () => set((state) => ({ ...state, user: null }))
      }), {
         name: "auth-store"
      }
   )
)