import { ChatCard } from '@/ui';
import Link from 'next/link';
import React from 'react';

export const SearchResults = ({ searchData }: { searchData: { users: any[] } }) => {
  if (!searchData?.users?.length) return <div className='text-2xl text-[#8D8E90] text-center py-2'>No data found</div>;
  return (
    <React.Fragment>
      {searchData?.users?.map((item: any) => (
        <Link
          href={{
            pathname: '/conversations/[id]',
            query: { id: item._id },
          }}
          key={`${item.name} ${item._id}`}
        >
          <ChatCard
            username={item.username}
            profileImage={item.profileImage.url}
            blurHashProfileImage={item.profileImage.blurHash}
          />
        </Link>
      ))}
    </React.Fragment>
  );
};

export default SearchResults;
