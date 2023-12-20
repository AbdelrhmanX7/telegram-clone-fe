import { Button, Input } from '@/ui';
import { useWebSocket } from '@/hooks';
import { useGetConversation } from '@/services/Hooks';
import { GetInvalidateQueries } from '@/services/InvalidateQueries';
import { classNames } from '@/utils';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useLocalStorage } from 'usehooks-ts';

export const ChatInterface = ({
  lastActiveDate = 'last seen recently',
  params,
}: {
  lastActiveDate?: string;
  params: {
    userIds: [string];
    page: string;
  };
}) => {
  const { data, refetch } = useGetConversation(params);
  useEffect(() => {
    refetch();
  }, [params]);
  const { invalidateGetAllConversations } = GetInvalidateQueries();
  const [userData, setUserData] = useLocalStorage<any>('user', {});
  const [user, setUser] = useState<any>({});
  useEffect(() => setUser(userData), [userData]);
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState('');
  const { socket, isReady } = useWebSocket(user?._id);
  useEffect(() => {
    if (isReady && !!socket?.on) {
      socket.on('message', async () => {
        refetch();
        invalidateGetAllConversations();
      });
    }
  }, [isReady, socket]);

  const sendMessage = () => {
    socket.emit(
      'message',
      JSON.stringify({
        message: currentMessage,
        senderId: user?._id,
        receiverId: data?.user?._id,
        conversationId: data?.conversationId,
      }),
    );
    setCurrentMessage('');
  };
  if (!data?.user?.username?.length || !user?.username?.length) return <div className='w-full h-full bg-[#7d8991]' />;

  return (
    <div className='w-full h-full flex flex-col relative justify-start items-center bg-[#7d8991]'>
      <div className='sticky w-full flex justify-between items-center gap-[18px] top-0 max-h-[54px] min-h-[54px] py-3 px-4 border-b bg-white'>
        <div className='flex flex-col'>
          <p className='font-semibold text-[#222222]'>{data?.user?.username}</p>
          <p className='text-xs text-[#8D8E90]'>{lastActiveDate}</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setUserData({});
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
        {!!data?.messages.length &&
          data?.messages?.map((item: any, index: any) => (
            <div
              className={classNames(
                'bg-white my-2 p-4 w-fit font-medium shadow-md border text-lg max-w-[350px] rounded-lg',
                item?.senderId === user?._id ? 'bg-[#effedd] ml-auto' : 'bg-white',
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
        />
        <div className='hover:bg-[#f1f1f1] duration-300 cursor-pointer' onClick={sendMessage}>
          <RiSendPlaneFill className='w-7 h-7 rotate-45' color='0F80D7' />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;