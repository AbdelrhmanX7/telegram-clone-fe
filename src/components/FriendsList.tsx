import { ChatCard, Input } from "@/UI";
import { CHATS } from "@/mocks";
import React from "react";

export const FriendsList = () => {
  return (
    <div className="min-w-[390px] h-full border-r bg-white relative">
      <div className="sticky flex justify-start items-center gap-[18px] top-0 max-h-[54px] py-2.5 px-3">
        <Input
          placeholder="search"
          className="h-[35px] !text-base rounded-full font-normal"
        />
      </div>
      <div className="w-full h-fit">
        {CHATS.map((item) => (
          <ChatCard {...item} key={item.name} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
