// 마이 칭호 관련 타입
export interface MyTitle {
  titleId: number;
  name: string;
  icon: string;
  description: string;
  achieved: boolean;
  minCount: number;
}

// 모든 칭호 데시보드
export interface Title {
  challengeId: number;
  name: string;
  type: string;
  description: string;
  total: number;
  progress: number;
  icon: string;
}

// 유저 정보
export interface UserData {
  memberId: number;
  email: string;
  name: string;
  nickname: string;
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
  equippedTitle: MyTitle[];
  achievedTitles: MyTitle[];
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

// 목표 설정 데이터
export interface changeInfoData {
  code: string;
  message: string;
  data: {
    nickname: string;
    profileImage: string;
    phoneNumber: string;
    newPassword: string;
  };
}
// 챌린지 데이터
export interface Challenge {
  challengeId: number;
  name: string;
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
  data: { challenges: Challenge[] };
}

// 북마크한 글, 내가 쓴 글
export interface Post {
  postId: number;
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

// 기본 북마크 타입
export interface BaseBookmark {
  placeId: string;
  name: string;
  address: string;
  type: 'store' | 'festival' | 'library';
  bookmarkedAt: string;
}

// 장소 북마크
export interface StoreBookmark extends BaseBookmark {
  type: 'store';
  storeId: string;
  category: string;
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
  endAt: string;
}

// 도서관 북마크
export interface LibraryBookmark extends BaseBookmark {
  type: 'library';
  libraryId: string;
  url: string;
}

export type BookmarkItem = StoreBookmark | FestivalBookmark | LibraryBookmark;

// 전체 북마크 타입
export interface BookmarkData {
  code: string;
  message: string;
  data: BookmarkItem[];
}
