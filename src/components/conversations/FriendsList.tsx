import { ChatCard, Input } from '@/ui';
import { useUserSearch } from '@/services/Hooks';
import React, { useContext, useEffect, useMemo } from 'react';
import { useSearch } from '@/hooks';
import Link from 'next/link';
import SearchResults from './SearchResults';
import { ConversationsContext } from '@/context';

export const FriendsList = () => {
  const { searchTerm, debouncedSearchTerm, isSearching, setIsSearching, setSearchTerm } = useSearch();

  const userSearchParams = useMemo(() => ({ search: debouncedSearchTerm }), [debouncedSearchTerm]);

  const { data: searchData, isFetching, refetch } = useUserSearch(userSearchParams);

  const { conversations } = useContext(ConversationsContext);

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!isFetching && isSearching) setIsSearching(false);
  }, [isFetching, isSearching]);

  return (
    <div className='min-w-[390px] md:w-fit w-full h-full md:border-r bg-white'>
      <div className='sticky flex justify-start items-center gap-[18px] top-0 max-h-[54px] py-2.5 px-3'>
        <Input
          placeholder='search'
          className='h-[35px] !text-base rounded-full font-normal'
          onChange={({ target }) => setSearchTerm(target.value)}
          value={searchTerm}
        />
      </div>
      <div className='w-full h-fit'>
        {!!debouncedSearchTerm?.length && (
          <>
            <div className='h-6 bg-[#f1f1f1] w-full px-2 font-medium text-[#8D8E90]'>Search result</div>
            <SearchResults searchData={searchData} />
            <div className='h-6 bg-[#f1f1f1] w-full px-2 font-medium text-[#8D8E90]'>Conversations</div>
          </>
        )}

        {!!conversations?.length &&
          conversations?.map((user: any) => (
            <Link key={`${user.username} ${user._id}`} href={`/conversations/${user._id}`}>
              <ChatCard
                username={user?.username}
                profileImage={user?.profileImage?.url}
                blurHashProfileImage={user?.profileImage?.blurHash}
                isActive={user?.isActive}
                lastMessage={user.message}
                lastMessageDate={user.timestamp}
                messageState={user.messageState}
                isTyping={user?.isTyping}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;
