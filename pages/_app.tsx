import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material";
import AuthProvider from "@/contexts/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}
