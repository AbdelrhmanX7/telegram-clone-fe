import React, { createContext, useState } from 'react';

interface UserData {
  userId: string;
  isActive: boolean;
  lastSeenAt: Date;
  lastMessage: string;
}

interface UsersContextProps {
  usersData: UserData[];
  setUsersData: React.Dispatch<React.SetStateAction<UserData[]>>;
}

export const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {
  const initialUsersData: UserData[] = [
    {
      userId: '1',
      isActive: true,
      lastSeenAt: new Date(),
      lastMessage: 'Hello!',
    },
    // Add more users as needed
  ];

  const [usersData, setUsersData] = useState<UserData[]>(initialUsersData);

  return <UsersContext.Provider value={{ usersData, setUsersData }}>{children}</UsersContext.Provider>;
};
