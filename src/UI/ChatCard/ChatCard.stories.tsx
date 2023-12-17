import React from "react";

import { ChatCard } from ".";
import { AnimateChangeInSize } from "../Animations";
import { ChatCardProps } from "./type";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "UI/ChatCard",
  component: ChatCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    isActive: true,
    isMuted: false,
    isPinned: true,
    lastMessage: "That is how you do it!",
    messageState: "empty",
    username: "Abdelrhman",
    profileImage:
      "https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg",
    lastMessageDate: "Last seen recently",
    newMessagesCount: 10,
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args: ChatCardProps) => (
  <ChatCard className="!max-w-[320px]" {...args} />
);

export const ChatCardElement: any = Template.bind({});
