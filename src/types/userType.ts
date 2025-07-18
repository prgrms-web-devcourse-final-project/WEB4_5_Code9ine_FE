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
export interface Post {
  postId: number;
  title: string;
}

// 장소
export interface Place {
  placeId: number;
  name: string;
}

// 유저 정보
export interface UserData {
  userId: number;
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
  bookmarkedPlaces: Place[];
  equippedTitle: Title;
  achievedTitles: Title[];
}

// 마이페이지 API 전체 응답
export interface GetMyPageData {
  code: string; // "0000"
  message: string;
  data: {
    code: number; // 2000
    message: string;
    data: UserData;
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
