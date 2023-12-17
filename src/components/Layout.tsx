import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }: any) => {
  const queryClient = new QueryClient();
  const token = getCookie("token");
  axios.defaults.headers.common.Authorization = token;

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "black",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "semibold",
          },
        }}
        position="bottom-right"
      />
      {children}
    </QueryClientProvider>
  );
};
export default Layout;