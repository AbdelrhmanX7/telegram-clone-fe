import { Button, Input } from '@/ui';
import { useGetConversation } from '@/services/Hooks';
import { useGetInvalidateQueries } from '@/services/InvalidateQueries';
import { classNames, formatDate } from '@/utils';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useLocalStorage } from 'usehooks-ts';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ConversationsContext } from '@/context';
import { socket } from '../layouts';

export const ChatInterface = ({
  params,
}: {
  params: {
    userId: string;
    page: string;
  };
}) => {
  const { data, refetch, isSuccess } = useGetConversation(params);
  const [conversationMessages, setConversationMessages] = useState<any>([]);
  useEffect(() => {
    refetch();
  }, [params]);
  useEffect(() => {
    if (isSuccess && data?.messages?.length) {
      setConversationMessages(data.messages);
    }
  }, [data, isSuccess]);
  const { invalidateGetAllConversations } = useGetInvalidateQueries();
  const [userInfo, setUserInfo] = useLocalStorage<any>('user', {});
  const { conversations, setConversations } = useContext(ConversationsContext);
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState('');
  const [userState, setUserState] = useState({
    senderId: '',
    isTyping: false,
    isActive: false,
    lastSeenAt: '',
  });

  useEffect(() => {
    const getConversation = conversations.find((user: any) => user._id === params?.userId);
    setUserState({ ...getConversation });
  }, [conversations, params]);

  useEffect(() => {
    socket.on('direct:message', async (message) => {
      if (message?.isFirstMsg) {
        refetch();
      }
      window.scrollTo(0, document.body.scrollHeight);
      delete message.isFirstMsg;
      invalidateGetAllConversations();
      conversations.map((user: any) => {
        if (user.conversationId === message.conversationId) {
          user.message = message.message;
          user.messageState = message.messageState;
          user.timestamp = message.timestamp;
        }
        return user;
      });
      setConversations([...conversations]);
      setConversationMessages([...conversationMessages, message]);
    });
    return () => {
      socket.off('direct:message');
    };
  }, [conversationMessages]);

  function sendMessage() {
    socket.emit('message', {
      message: currentMessage,
      senderId: userInfo?._id,
      receiverId: data.user._id,
      conversationId: data?.conversationId,
    });
    setCurrentMessage('');
  }

  const isChatInActive = !data?.user?.username?.length || !userInfo?.username?.length;

  return (
    <motion.div
      className={classNames(
        'w-full h-full flex flex-col justify-start items-center bg-[#7d8991] md:relative fixed md:opacity-100 top-0 left-0 right-0',
        isChatInActive ? 'opacity-0' : 'opacity-100',
      )}
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      {isChatInActive ? (
        <div className='w-full h-full bg-[#7d8991]' />
      ) : (
        <>
          <div className='sticky w-full flex justify-between items-center gap-[18px] top-0 h-fit py-3 px-4 border-b bg-white'>
            <div className='flex justify-start items-center gap-4 h-full'>
              <Link href={'/conversations'}>
                <Button type='default' className='px-0 w-10 h-full text-2xl'>
                  <IoIosArrowBack />
                </Button>
              </Link>
              <div className='flex flex-col'>
                <p className='font-semibold text-[#222222]'>{data?.user?.username}</p>
                {userState.isTyping ? (
                  <p className='text-xs text-green-600 '>Typing...</p>
                ) : userState.isActive ? (
                  <p className='text-xs text-green-600 '>Online</p>
                ) : (
                  <p className='text-xs text-[#8D8E90]'>
                    {userState?.lastSeenAt ? `Last seen at ${formatDate(userState.lastSeenAt)}` : 'last seen recenlty'}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  setUserInfo({});
                  setCookie('token', '');
                  router.push('/login');
                }}
                danger
              >
                Logout
              </Button>
            </div>
          </div>
          <div className='h-full w-full overflow-auto py-2.5 px-2'>
            {!!conversationMessages.length &&
              conversationMessages?.map((item: any, index: any) => (
                <div
                  className={classNames(
                    'bg-white my-2 p-4 w-fit font-medium shadow-md border text-lg max-w-[350px] rounded-lg',
                    item?.senderId === userInfo?._id ? 'bg-[#effedd] ml-auto' : 'bg-white',
                    item.messageState === 'sent' ? 'bg-red-300' : item.messageState === 'received' && 'bg-yellow-300',
                  )}
                  key={`${item.message}-${index}`}
                >
                  <p>{item?.message}</p>
                </div>
              ))}
          </div>
          <div className='sticky w-full flex justify-center items-center gap-[18px] bottom-0 max-h-[54px] min-h-[54px] py-3 px-4 border-t bg-white'>
            <Input
              placeholder='Write a message...'
              className='h-[35px] !text-base rounded-none !border-none !shadow-none font-normal'
              onChange={({ target }) => setCurrentMessage(target.value)}
              value={currentMessage}
              onFocus={() => {
                socket.emit('typing', {
                  isTyping: true,
                  senderId: userInfo?._id,
                  receiverId: params.userId,
                  conversationId: data?.conversationId,
                });
              }}
              onBlur={() => {
                socket.emit('typing', {
                  isTyping: false,
                  senderId: userInfo?._id,
                  receiverId: params.userId,
                  conversationId: data?.conversationId,
                });
              }}
            />
            <div className='hover:bg-[#f1f1f1] duration-300 cursor-pointer' onClick={sendMessage}>
              <RiSendPlaneFill className='w-7 h-7 rotate-45' color='0F80D7' />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ChatInterface;
