import { ChatCard, Input } from '@/UI';
import { useGetAllConversations, useUserSearch } from '@/services/Hooks';
import React, { useEffect, useMemo } from 'react';
import { useSearch } from '@/hooks';
import Link from 'next/link';

export const FriendsList = () => {
  const { searchTerm, debouncedSearchTerm, isSearching, setIsSearching, setSearchTerm } = useSearch();

  const userSearchParams = useMemo(() => ({ search: debouncedSearchTerm }), [debouncedSearchTerm]);

  const { data: searchData, isFetching, refetch } = useUserSearch(userSearchParams);

  const { data: dataConversations } = useGetAllConversations();

  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!isFetching && isSearching) setIsSearching(false);
  }, [isFetching, isSearching]);

  return (
    <div className='min-w-[390px] h-full border-r bg-white relative'>
      <div className='sticky flex justify-start items-center gap-[18px] top-0 max-h-[54px] py-2.5 px-3'>
        <Input
          placeholder='search'
          className='h-[35px] !text-base rounded-full font-normal'
          onChange={({ target }) => setSearchTerm(target.value)}
          value={searchTerm}
        />
      </div>
      <div className='w-full h-fit'>
        {!!searchData?.users?.length && (
          <>
            <div className='h-6 bg-[#f1f1f1] w-full px-2 font-medium text-[#8D8E90]'>Search result</div>
            {searchData?.users?.map((item: any) => (
              <Link
                href={{
                  pathname: '/conversations/[id]',
                  query: { id: item._id },
                }}
                key={item.name}
              >
                <ChatCard
                  username={item.username}
                  profileImage={item.profileImage.url}
                  blurHashProfileImage={item.profileImage.blurHash}
                />
              </Link>
            ))}
            <div className='h-6 bg-[#f1f1f1] w-full px-2 font-medium text-[#8D8E90]'>Conversations</div>
          </>
        )}

        {!!dataConversations?.length &&
          dataConversations?.map((item: any) => (
            <Link key={item.name} href={`/conversations/${item._id}`}>
              <ChatCard
                username={item?.username}
                profileImage={item?.profileImage?.url}
                blurHashProfileImage={item?.profileImage?.blurHash}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;
