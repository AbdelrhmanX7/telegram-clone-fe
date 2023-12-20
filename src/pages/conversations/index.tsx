import { ChatInterface } from '@/components';
import ChatsLayout from '@/components/layouts/ChatsLayout';
import React from 'react';

export function Page({ children }: { children: React.ReactNode }) {
  return <div className='w-full h-full'>{children}</div>;
}

export default function Transactions() {
  return <ChatInterface params={{ userIds: [''], page: '' }} />;
}

Transactions.getLayout = function getLayout(page: any) {
  return (
    <ChatsLayout>
      <Page>{page}</Page>
    </ChatsLayout>
  );
};
