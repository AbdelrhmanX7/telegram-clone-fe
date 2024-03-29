import { ChatCardProps } from '@/ui/chatCard/type';

export const CHATS: ChatCardProps[] = [
  {
    isMuted: false,
    isPinned: true,
    isActive: true,
    messageState: 'empty',
    lastMessage: 'Hello there!',
    newMessagesCount: 2,
    username: 'John',
    profileImage: 'https://images.freeimages.com/images/large-previews/c31/colors-1383652.jpg',
    lastMessageDate: new Date('2023-12-15T12:00:00Z'),
  },
  {
    isMuted: true,
    isPinned: false,
    isActive: false,
    messageState: 'seen',
    lastMessage: 'Goodbye!',
    newMessagesCount: 0,
    username: 'Alice',
    profileImage: 'https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg',
    lastMessageDate: new Date('2023-12-14T15:30:00Z'),
  },
];
