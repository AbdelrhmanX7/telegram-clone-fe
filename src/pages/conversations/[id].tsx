import React, { useMemo } from 'react';
import { Page } from '.';
import { ChatsLayout } from '@/components/layouts';
import { ChatInterface } from '@/components';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (req) => {
  return {
    props: {
      id: req.query.id,
    },
  };
};

export default function ChatId({ id }: any) {
  const params = useMemo(
    () => ({
      userIds: id,
      page: '1',
    }),
    [id],
  );

  return (
    <div className='w-full h-full'>
      <ChatInterface params={params} />
    </div>
  );
}

ChatId.getLayout = function getLayout(page: any) {
  return (
    <ChatsLayout>
      <Page>{page}</Page>
    </ChatsLayout>
  );
};
