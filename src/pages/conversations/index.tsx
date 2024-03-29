import ChatsLayout from '@/components/layouts/ChatsLayout';
import React from 'react';

export function Page({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function Transactions() {
  return <div className='w-full h-full bg-[#7d8991] md:block hidden'></div>;
}

Transactions.getLayout = function getLayout(page: any) {
  return (
    <ChatsLayout>
      <Page>{page}</Page>
    </ChatsLayout>
  );
};
