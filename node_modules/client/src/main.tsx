import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from "react-helmet-async"
import { client } from "@config/client"
import App from "@sourceroot/App"
import "@sourceroot/index.scss"

createRoot(document.querySelector("#root") as HTMLDivElement).render(
   <StrictMode>
      <BrowserRouter>
         <QueryClientProvider client={ client }>
            <HelmetProvider>
               <App />
            </HelmetProvider>
         </QueryClientProvider>
      </BrowserRouter>
   </StrictMode>
)
