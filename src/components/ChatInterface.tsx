import { Button, Input } from "@/UI";
import { classNames } from "@/utils";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useLocalStorage } from "usehooks-ts";

export const ChatInterface = ({
  username,
  lastActiveDate = "last seen recently",
  messages = [],
}: {
  username?: string;
  lastActiveDate?: string;
  messages?: { isSentByYou: boolean; message: string }[];
}) => {
  const [_, setUser] = useLocalStorage<any>("user", {});
  const router = useRouter();
  if (!username?.length) return <div className="w-full h-full bg-[#7d8991]" />;
  return (
    <div className="w-full h-full flex flex-col relative justify-start items-center bg-[#7d8991]">
      <div className="sticky w-full flex justify-between items-center gap-[18px] top-0 max-h-[54px] min-h-[54px] py-3 px-4 border-b bg-white">
        <div className="flex flex-col">
          <p className="font-semibold text-[#222222]">{username}</p>
          <p className="text-xs text-[#8D8E90]">{lastActiveDate}</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setUser({});
              setCookie("token", "");
              router.push("/login");
            }}
            danger
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="h-full w-full overflow-auto py-2.5 px-2">
        {!!messages.length &&
          messages?.map((item, index) => (
            <div
              className={classNames(
                "bg-white my-2 p-4 w-fit font-medium shadow-md border text-lg max-w-[350px] rounded-lg",
                item.isSentByYou ? "bg-[#effedd] ml-auto" : "bg-white"
              )}
              key={`${item.message}-${index}`}
            >
              <p>{item?.message}</p>
            </div>
          ))}
      </div>
      <div className="sticky w-full flex justify-center items-center gap-[18px] bottom-0 max-h-[54px] min-h-[54px] py-3 px-4 border-t bg-white">
        <Input
          placeholder="Write a message..."
          className="h-[35px] !text-base rounded-none !border-none !shadow-none font-normal"
        />
        <div>
          <RiSendPlaneFill className="w-7 h-7 rotate-45" color="0F80D7" />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
