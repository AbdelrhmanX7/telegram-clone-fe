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
      userId: id,
      page: '1',
    }),
    [id],
  );

  return <ChatInterface params={params} />;
}

ChatId.getLayout = function getLayout(page: any) {
  return (
    <ChatsLayout>
      <Page>{page}</Page>
    </ChatsLayout>
  );
};
