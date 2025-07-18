'use client';
import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
import ThreadsTab from './ThreadsTab';
import DetailBox from '../godplaces/detail/DetailBox';
import { useEffect, useState } from 'react';
import {
  getMyThreads,
  getBookmarkedThreads,
  getBookmarkedPlaces,
} from '@/api/profile';
import { Post } from '@/types/userType';

type SimpleProps = {
  id: string;
  name: string;
  type: 'store' | 'festival' | 'library';
};
export default function MyThreads() {
  const [selectedTab, setSelectedTab] = useState<'thread' | 'saved' | 'place'>(
    'thread',
  );

  const [myThreads, setMyThreads] = useState<Post[]>([]);
  const [savedThreads, setSavedThreads] = useState<Post[]>([]);
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<SimpleProps[]>([]);

  // 내가 쓴 글, 내가 찜한 글, 내가 찜한 갓플
  useEffect(() => {
    if (selectedTab === 'thread') {
      getMyThreads()
        .then((res) => {
          console.log('내가 쓴 글 가져오기 성공!', res);
          // userId는 로그인한 계정의 memberId
          // const my = res.data.filter((post) => post.memberId === userId)
          // setMyThreads(my);
        })
        .catch((err) => console.log('내가 쓴 글 가져오기 실패', err));
    }

    if (selectedTab === 'saved') {
      getBookmarkedThreads()
        .then((res) => {
          console.log('내가 찜한 글 가져오기 성공', res);
          setSavedThreads(res.data);
        })
        .catch((err) => console.log('내가 찜한 글 가져오기 실패', err));
    }

    if (selectedTab === 'place') {
      getBookmarkedPlaces().then((res) => {
        console.log('성공', res);
        const finalId = res.data.map((item) => {
          let id = '';
          switch (item.type) {
            case 'store':
              id = item.storeId;
              break;
            case 'festival':
              id = item.festivalId;
              break;
            case 'library':
              id = item.libraryId;
              break;
          }
          return {
            type: item.type,
            id,
            name: item.name,
          };
        });
        console.log('타입 추출', finalId);
        setBookmarkedPlaces(finalId);
      });
    }
  }, [selectedTab]);

  return (
    <>
      <SetGoal />
      <ThreadsTab selectedTab={selectedTab} onChange={setSelectedTab} />
      <div
        className={`mt-[40px] w-full gap-[20px] p-[20px] ${
          selectedTab === 'place'
            ? 'grid grid-cols-1 md:grid-cols-2'
            : 'flex flex-col'
        }`}
      >
        {/* {selectedTab === 'thread' && myThreads.map((post) => <PostItem />)}
        {selectedTab === 'saved' && savedThreads.map((post) => <PostItem />)} */}
        {selectedTab === 'place' &&
          bookmarkedPlaces.map((place) => (
            <div
              key={place.id}
              className="rounded-[10px] shadow dark:shadow-md"
            >
              <DetailBox
                type={place.type}
                id={place.id}
                showBackButton={false}
              />
            </div>
          ))}
      </div>
    </>
  );
}
