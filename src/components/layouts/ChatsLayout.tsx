import React, { useContext, useEffect } from 'react';
import { FriendsList } from '../conversations';
import { ConversationsContext } from '@/context';
import { useGetAllConversations } from '@/services/Hooks';
import { useGetInvalidateQueries } from '@/services/InvalidateQueries';
import { useRouter } from 'next/router';
import { socket } from './Layout';
import { useReadLocalStorage } from 'usehooks-ts';

export const ChatsLayout = ({ children }: any) => {
  const { conversations, setConversations } = useContext(ConversationsContext);
  const { data } = useGetAllConversations();
  const { query } = useRouter();
  useEffect(() => {
    if (data) setConversations(data);
  }, [data]);
  const { invalidateGetAllConversations, invalidateGetConversation } = useGetInvalidateQueries();
  const userInfo = useReadLocalStorage<any>('user');
  useEffect(() => {
    socket.on('seen:message', () => {
      invalidateGetAllConversations();
      invalidateGetConversation();
    });
    return () => {
      socket.off('seen:message');
    };
  }, []);

  useEffect(() => {
    socket.on('user_connect', (conversationId) => {
      const newConversations = conversations.map((user: any) => ({
        ...user,
        isActive: user.conversationId === conversationId ? true : user.isActive,
      }));
      setConversations([...newConversations]);
    });
    socket.on('user_disconnect', (conversationId) => {
      const newConversations = conversations.map((user: any) => ({
        ...user,
        isActive: user.conversationId === conversationId ? false : user.isActive,
        lastSeenAt: new Date(),
      }));
      setConversations([...newConversations]);
    });
    socket.on('typing', (typingDetails) => {
      const newConversations = conversations.map((user: any) => ({
        ...user,
        isTyping: user.conversationId === typingDetails.conversationId ? typingDetails.isTyping : false,
      }));
      setConversations([...newConversations]);
    });
    return () => {
      socket.off('user_connect');
      socket.off('user_disconnect');
      socket.off('typing');
    };
  }, [conversations]);

  useEffect(() => {
    socket.on('receive:message', (data: any, callback) => {
      socket.emit('message:received', data, query?.id === data?.senderId);
      callback({ status: 'ok' });
    });
    socket.on('incoming:message', () => {
      invalidateGetAllConversations();
    });

    return () => {
      socket.off('receive:message');
      socket.off('incoming:message');
    };
  }, []);

  useEffect(() => {
    const getConversationDetails = data?.find((item: any) => item._id === query.id);
    if (getConversationDetails?.conversationId) {
      const { conversationId, _id: receiverId } = getConversationDetails;
      socket.emit('message:seen', {
        senderId: userInfo?._id,
        receiverId,
        conversationId,
      });
    }
  }, [query, data]);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <FriendsList />
      {children}
    </div>
  );
};

export default ChatsLayout;
