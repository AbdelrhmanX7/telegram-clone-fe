import { ConversationsProvider } from '@/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useReadLocalStorage } from 'usehooks-ts';
const queryClient = new QueryClient();

import { io } from 'socket.io-client';

export const socket = io(process.env.API ?? 'http://localhost:4000');

export const Layout = ({ children }: any) => {
  const user = useReadLocalStorage<any>('user');

  useEffect(() => {
    socket.emit('init', user?._id ?? '');
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: 'black',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'semibold',
          },
        }}
        position='bottom-right'
      />
      <ConversationsProvider>{children}</ConversationsProvider>
    </QueryClientProvider>
  );
};
export default Layout;
