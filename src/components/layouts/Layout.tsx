import { useWebSocket } from '@/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useReadLocalStorage } from 'usehooks-ts';
const queryClient = new QueryClient();
export const Layout = ({ children }: any) => {
  const { socket } = useWebSocket(true);
  const { query } = useRouter();
  const user = useReadLocalStorage<any>('user');
  useEffect(() => {
    if (socket && socket.io && user?._id) {
      socket.emit('init', user?._id ?? '');
    }
  }, [user]);

  useEffect(() => {
    if (!!socket?.on && user?._id) {
      socket.on('receive:message', (data: any, callback) => {
        socket.emit('message:received', data, query?.id === data?.senderId);
        callback('', 'check if it works??!!');
      });
    }
  }, [socket, user, query]);

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
      <AnimatePresence mode='sync' initial={false}>
        <div key={Math.random().toString()}>{children}</div>
      </AnimatePresence>
    </QueryClientProvider>
  );
};
export default Layout;
