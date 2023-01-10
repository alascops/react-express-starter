import { Fragment, type MouseEventHandler, type FunctionComponent } from "react"
import { Helmet } from "react-helmet-async"
import { type UseQueryResult } from "@tanstack/react-query"
import { type User } from "@prisma/client"
import { useFetchUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from "@apis/user"
import { useAuthStore } from "@stores/auth"

const Home: FunctionComponent = () => {
   const createUserMutation = useCreateUserMutation()

   const updateUserMutation = useUpdateUserMutation()

   const deleteUserMutation = useDeleteUserMutation()

   const { data: users }: UseQueryResult<User[]> = useFetchUsersQuery()

   const { user, authenticate, deauthenticate } = useAuthStore((state) => state)

   const createUser: MouseEventHandler = async (evt) => {
      evt.preventDefault()

      const create = await createUserMutation.mutateAsync({
         username: "test1",
         emailAddress: "test1@gmail.com",
         password: "Styx&Ston35"
      })

      if (create.id) {
         console.log(create.id)
      } else {
         console.log(create.message)
      }
   }

   const updateUser: MouseEventHandler = async (evt) => {
      evt.preventDefault()

      const update = await updateUserMutation.mutateAsync({
         id: "f71c638f-4f2e-4bf1-9146-05f006319925",
         username: "superuser",
         emailAddress: "superuser@superuser.com",
         password: "Styx&Ston35"
      })

      if (update.id) {
         console.log("updated")
      } else {
         console.log("failed")
      }
   }

   const deleteUser = async (id: string) => {
      const _delete = await deleteUserMutation.mutateAsync({
         id
      })

      if (_delete.id) {
         console.log("deleted")
      } else {
         console.log("failed")
      }
   }

   return (
      <Fragment>
         {/* <Helmet>
            <title>{ import.meta.env.VITE_APP_NAME } | Welcome</title>
         </Helmet>

         <main className="flex flex-col gap-y-3 justify-center items-center bg-gray-800 w-full min-h-screen">
            <h1 className="text-5xl font-bold text-white text-center">App Template</h1>

            <button type="button" className="text-white" onClick={ createUser }>Create User</button>

            {
               users?.map((user) => (
                  <div className="flex gap-5" key={ user.id }>
                     <p className="text-white" >{ user.username }</p>
                     <button className="bg-red-500 text-white font-bold px-2 py-1 rounded" type="button" onClick={ (evt) =>  { evt.preventDefault(); deleteUser(user.id) } }>Delete User</button>
                  </div>
               ))
            }
         </main> */}

         <div>
            <input type="color"/>
         </div>
      </Fragment>
   )
}

export default Home