import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket;
export const useWebSocket = (init = false): { socket: Socket; isReady: boolean } => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (init) {
      socket = io(process.env.API ?? 'http://localhost:4000');
      return () => {
        socket?.disconnect();
      };
    }
    setIsReady(true);
  }, []);

  return { socket, isReady };
};
