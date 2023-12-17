import ChatsLayout from "@/components/ChatsLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Page } from ".";
import { ChatInterface } from "@/components";
import { useGetConversation } from "@/services/Hooks";

export default function ChatId() {
  const { query } = useRouter();
  const id: any = query["id"];
  const [conversationId, setConversationId] = useState(id);

  const { data, refetch } = useGetConversation({ page: "1", conversationId });

  useEffect(() => {
    setConversationId(id);
    refetch();
  }, [id]);

  console.log(data);
  return (
    <div className="w-full h-full">
      <ChatInterface
        messages={data?.messages ?? []}
        username={data?.user?.username}
      />
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
