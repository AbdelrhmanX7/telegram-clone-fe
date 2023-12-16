export type MessageStateProps = {
  messageState?: "empty" | "sending" | "sent" | "arrived" | "seen";
};

export type ChatCardProps = {
  isMuted?: boolean;
  isPinned?: boolean;
  isActive?: boolean;
  messageState?: MessageStateProps["messageState"];
  lastMessage?: string;
  newMessagesCount?: number;
  name?: string;
  profileImage?: string;
  lastMessageDate?: Date;
};
