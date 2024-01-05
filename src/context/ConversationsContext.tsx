import React, { createContext, useState } from 'react';

export const ConversationsContext = createContext<any | undefined>(undefined);

export const ConversationsProvider = ({ children }: { children: React.ReactNode }) => {
  const initialUsersData: any[] = [];

  const [conversations, setConversations] = useState<any[]>(initialUsersData);

  return (
    <ConversationsContext.Provider value={{ conversations, setConversations }}>
      {children}
    </ConversationsContext.Provider>
  );
};
