import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Toaster } from "react-hot-toast";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import Layout from "@/components/Layout";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const queryClient = new QueryClient();
  const token = getCookie("token");
  axios.defaults.headers.common.Authorization = token;

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}
