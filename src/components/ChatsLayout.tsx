import React from "react";
import FriendsList from "./FriendsList";

const ChatsLayout = ({ children }: any) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <FriendsList />
      {children}
    </div>
  );
};

export default ChatsLayout;
