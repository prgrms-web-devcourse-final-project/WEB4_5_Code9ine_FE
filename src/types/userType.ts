// 칭호 관련 타입
export interface Title {
  challengeId: number;
  title: string;
  type: string;
  description: string;
  total: number;
  progress: number;
  icon: string;
}

// 게시글
// export interface Post {
//   postId: number;
//   title: string;
// }

// // 장소
// export interface Place {
//   placeId: number;
//   name: string;
// }

// 유저 정보
export interface UserData {
  memberId: number;
  email: string;
  name: string;
  profileImage?: string;
  level: number;
  currentExp: number;
  nextLevelExp: number;
  expProgress: number;
  myPosts: Post[];
  goalStuff: string;
  remainPrice: number;
  bookmarkedPosts: Post[];
  bookmarkedPlaces: BookmarkData[];
  equippedTitle: Title;
  achievedTitles: Title[];
}

// 마이페이지 API 전체 응답
export interface GetMyPageData {
  code: string;
  message: string;
  data: {
    code: number;
    message: string;
    data: UserData;
  };
}

// 내 초대 코드 복사
export interface myCodeCopy {
  code: string;
  message: string;
  data: {
    inviteCode: string;
  };
}

// 목표 설정 데이터
export interface SetGoalData {
  code: string;
  message: string;
  data: {
    goalStuff: string;
    goalAmount: number;
  };
}

// 챌린지 데이터
export interface Challenge {
  challengeId: number;
  title: string;
  type: '일일' | '월간' | '커뮤니티';
  description: string;
  total: number;
  progress: number;
  icon: string;
}

// 챌린지 목록 데이터
export interface ChallengeData {
  code: string;
  message: string;
  data: Challenge[];
}

// 북마크한 글, 내가 쓴 글
export interface Post {
  postid: number;
  memberId: number;
  category: '챌린지' | '자유' | '나가게';
  challengeCategory: string | null;
  title: string;
  createdAt: string;
  content: string;
  imageUrls: string[];
  commentCount: number;
  likeCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  challengeAchieved: boolean;
  writerNickname: string;
  writerTitle: string;
  writerLevel: number;
  writerProfileImage: string;
}

// 북마크 조회
export interface BookmarkPostData {
  code: string;
  message: string;
  data: Post[];
}

// 북마크
export interface BaseBookmark {
  name: string;
  address: string;
  type: 'store' | 'festival' | 'library';
  bookmarkedAt: string;
}

// 장소 북마크
export interface StoreBookmark extends BaseBookmark {
  type: 'store';
  storeId: string;
  categoey: string;
  contact: string;
  firstmenu: string;
  firstprice: string;
  secondmenu: string;
  secondprice: string;
  thirdmenu: string;
  thirdprice: string;
}

// 축제 북마크
export interface FestivalBookmark extends BaseBookmark {
  type: 'festival';
  festivalId: string;
  category: string;
  target: string;
  url: string;
  startAt: string;
  EndAt: string;
}

// 도서관 북마크
export interface LibraryBookmark extends BaseBookmark {
  type: 'library';
  libraryId: string;
  url: string;
}

type BookmarkItem = StoreBookmark | FestivalBookmark | LibraryBookmark;

export interface BookmarkData {
  status: string;
  data: BookmarkItem[];
}
