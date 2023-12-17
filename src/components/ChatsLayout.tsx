import React from "react";
import FriendsList from "./FriendsList";
import Layout from "./Layout";

const ChatsLayout = ({ children }: any) => {
  return (
    <Layout>
      <div className="w-screen h-screen flex justify-center items-center">
        <FriendsList />
        {children}
      </div>
    </Layout>
  );
};

export default ChatsLayout;
