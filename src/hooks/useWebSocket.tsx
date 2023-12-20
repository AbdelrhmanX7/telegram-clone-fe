import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

let socket: Socket; // Initialize with null
export const useWebSocket = (
  id?: string
): { socket: Socket; isReady: boolean } => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    socket = io(process.env.API ?? "http://localhost:4000");
    setIsReady(true);
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && socket.io) {
      socket.emit("init", id ?? "");
    }
  }, [id]);

  return { socket, isReady };
};
