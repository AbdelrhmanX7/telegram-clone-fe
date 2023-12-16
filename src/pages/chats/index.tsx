import { ChatInterface, FriendsList } from "@/components";
import React from "react";

export default function Chats() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <FriendsList />
      <ChatInterface />
    </div>
  );
}
