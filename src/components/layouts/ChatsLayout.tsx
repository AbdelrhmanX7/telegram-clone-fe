import React from 'react';
import { FriendsList } from '../conversations';
import { GetInvalidateQueries } from '@/services/InvalidateQueries';
import { useEffect } from 'react';
import { useWebSocket } from '@/hooks';
export const ChatsLayout = ({ children }: any) => {
  const { invalidateGetAllConversations, invalidateGetConversation } = GetInvalidateQueries();
  const { socket, isReady } = useWebSocket();
  useEffect(() => {
    if (isReady && !!socket.on) {
      socket.on('user_connect', () => {
        invalidateGetAllConversations();
        invalidateGetConversation();
      });
      socket.on('user_disconnect', () => {
        invalidateGetAllConversations();
        invalidateGetConversation();
      });
    }
  }, [socket, isReady]);
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <FriendsList />
      {children}
    </div>
  );
};

export default ChatsLayout;
