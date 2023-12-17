import { Button } from "@/UI";
import { ChatInterface, FriendsList } from "@/components";
import ChatsLayout from "@/components/ChatsLayout";
import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

export function Page({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full">{children}</div>;
}

export default function Transactions() {
  return <ChatInterface />;
}

Transactions.getLayout = function getLayout(page: any) {
  return (
    <ChatsLayout>
      <Page>{page}</Page>
    </ChatsLayout>
  );
};
