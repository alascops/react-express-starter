declare global {
   type RequestError = {
      message: string,
      stack?: string
   }

   type Susceptible<T> = T & RequestError

   type Transpose<T> = {
      [key: string]: T
   }

   type Nullable<T> = T | null | undefined
}

export {}