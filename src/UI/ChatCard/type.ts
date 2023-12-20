export type MessageStateProps = {
  messageState?: 'empty' | 'sending' | 'sent' | 'arrived' | 'seen';
};

export type ChatCardProps = {
  isMuted?: boolean;
  isPinned?: boolean;
  isActive?: boolean;
  messageState?: MessageStateProps['messageState'];
  lastMessage?: string;
  newMessagesCount?: number;
  username?: string;
  profileImage?: string;
  blurHashProfileImage?: string;
  lastMessageDate?: Date | string;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
};
