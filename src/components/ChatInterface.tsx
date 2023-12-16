import { Input } from "@/UI";
import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";

export const ChatInterface = () => {
  return (
    <div className="w-full h-full flex flex-col relative justify-start items-center bg-[#7d8991]">
      <div className="sticky w-full flex justify-start items-center gap-[18px] top-0 max-h-[54px] min-h-[54px] py-3 px-4 border-b bg-white">
        <div className="flex flex-col">
          <p className="font-semibold text-[#222222]">No 734 Nf</p>
          <p className="text-xs text-[#8D8E90]">last seen recently</p>
        </div>
      </div>
      <div className="h-full w-full overflow-auto py-2.5 px-2"></div>
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
