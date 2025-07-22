'use client';
import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
import ThreadsTab from './ThreadsTab';
import DetailBox from '../godplaces/detail/DetailBox';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  getMyThreads,
  getBookmarkedThreads,
  getBookmarkedPlaces,
} from '@/api/profile';
import { BookmarkPostData, Post } from '@/types/userType';
import { PostRes } from '../../types/boardType';

// type SimpleProps = {
//   id: string;
//   name: string;
//   type: 'store' | 'festival' | 'library';
// };

export default function MyThreads() {
  const [selectedTab, setSelectedTab] = useState<'thread' | 'saved' | 'place'>(
    'thread',
  );

  // const [myThreads, setMyThreads] = useState<Post[]>([]);
  // const [savedThreads, setSavedThreads] = useState<Post[]>([]);
  // const [bookmarkedPlaces, setBookmarkedPlaces] = useState<SimpleProps[]>([]);

  // 내가 쓴 글, 내가 찜한 글, 내가 찜한 갓플
  const { data: myThreads, isLoading: isLoadingMyThreads } =
    useQuery<BookmarkPostData>({
      queryKey: ['myThreads'],
      queryFn: getMyThreads,
      enabled: selectedTab === 'thread',
    });

  const { data: savedThreads, isLoading: isLoadingSaved } =
    useQuery<BookmarkPostData>({
      queryKey: ['saveThreads'],
      queryFn: getBookmarkedThreads,
      enabled: selectedTab === 'saved',
    });

  const { data: bookmarkedPlaces = [], isLoadingBookmarked } = useQuery({
    queryKey: ['bookmarkedPlaces'],
    queryFn: getBookmarkedPlaces,
    enabled: selectedTab === 'place',
    select: (res) =>
      res.data.map((item) => {
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
      }),
  });

  // useEffect(() => {
  //   if (selectedTab === 'thread') {
  //     getMyThreads()
  //       .then((res) => {
  //         console.log('내가 쓴 글 가져오기 성공!', res);
  //         setMyThreads(res.data);
  //       })
  //       .catch((err) => console.log('내가 쓴 글 가져오기 실패', err));
  //   }

  //   if (selectedTab === 'saved') {
  //     getBookmarkedThreads()
  //       .then((res) => {
  //         console.log('내가 찜한 글 가져오기 성공', res);
  //         setSavedThreads(res.data);
  //       })
  //       .catch((err) => console.log('내가 찜한 글 가져오기 실패', err));
  //   }

  //   if (selectedTab === 'place') {
  //     getBookmarkedPlaces().then((res) => {
  //       console.log('성공', res);
  //       const finalId = res.data.map((item) => {
  //         let id = '';
  //         switch (item.type) {
  //           case 'store':
  //             id = item.storeId;
  //             break;
  //           case 'festival':
  //             id = item.festivalId;
  //             break;
  //           case 'library':
  //             id = item.libraryId;
  //             break;
  //         }
  //         return {
  //           type: item.type,
  //           id,
  //           name: item.name,
  //         };
  //       });
  //       setBookmarkedPlaces(finalId);
  //     });
  //   }
  // }, [selectedTab]);

  const categoryEng = (
    korCategory: string,
  ): 'CHALLENGE' | 'FREE' | 'MYSTORE' => {
    switch (korCategory) {
      case '챌린지':
        return 'CHALLENGE';
      case '자유':
        return 'FREE';
      case '나가게':
        return 'MYSTORE';
      default:
        return 'FREE';
    }
  };

  const isValidChallengeCategory = (
    value: string | null,
  ): value is PostRes['challengeCategory'] => {
    return (
      value === 'NO_MONEY' ||
      value === 'KIND_CONSUMER' ||
      value === 'DETECTIVE' ||
      value === 'MASTER' ||
      value === 'COOK_KING'
    );
  };
  const convertPostToPostRes = (post: Post): PostRes => ({
    ...post,
    postId: post.postid,
    category: categoryEng(post.category),
    challengeCategory: isValidChallengeCategory(post.challengeCategory)
      ? post.challengeCategory
      : 'NO_MONEY',
  });
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
        {selectedTab === 'thread' &&
          myThreads?.data.map((post) => (
            <PostItem key={post.postid} post={convertPostToPostRes(post)} />
          ))}
        {selectedTab === 'saved' &&
          savedThreads?.data.map((post) => (
            <PostItem key={post.postid} post={convertPostToPostRes(post)} />
          ))}
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
