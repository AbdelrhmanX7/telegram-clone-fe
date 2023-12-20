import '@/styles/globals.css';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => <Layout>{page}</Layout>);
  const token = getCookie('token');
  axios.defaults.headers.common.Authorization = token;

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}
