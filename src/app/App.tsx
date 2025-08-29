import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient.ts";
import { ConfigGate } from "../components/ConfigGate";


export default function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <ConfigGate>
      <RouterProvider router={router} />
      </ConfigGate>
    </QueryClientProvider>
  )
}