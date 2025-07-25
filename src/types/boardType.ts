export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface PopularPostRes {
  memberId: number; // 유저번호
  postId: number; // 게시글 아이디
  title: string; // 게시글 제목
  writerNickname: string; // 작성자 닉네임
  writerProfileImage: string; // 프로필 이미지
  writerSymbol: string; // 휘장
  writerTitle: string; // 칭호
  createdAt: string; // 작성일
  category: string; // 카테고리
}

export interface WritePostReq {
  title: string; // 제목
  content: string; // 내용
  category: string; // 게시글 종류
  imageUrls: string[]; // 이미지URL
  challengeCategory?: string | null; // 챌린지 종류
}

export interface WritePostRes {
  postId: number;
  createdAt: string;
}

export interface PostListRes {
  content: PostRes[]; // 게시글 목록
  page: number; // 기본값 1
  size: number; // 기본값 10
}

export interface PostRes {
  postId: number; // 게시글 번호
  memberId: number; // 유저번호
  category: 'MY_STORE' | 'CHALLENGE' | 'FREE'; // 게시글 카테고리
  challengeCategory:
    | 'NO_MONEY'
    | 'KIND_CONSUMER'
    | 'DETECTIVE'
    | 'MASTER'
    | 'COOK_KING'
    | null; // 챌린지 카테고리
  title: string; // 게시글 제목
  content: string; // 게시글 내용
  createdAt: string; // 게시글 작성일
  imageUrls: string[]; // 게시글 이미지
  commentCount: number; //댓글 개수
  likeCount: number; // 좋아요 개수
  isLiked: boolean; // 좋아요 여부
  isBookmarked: boolean; // 북마크 여부
  challengeAchieved: boolean; // 챌린지 달성여부
  writerNickname: string; // 게시글 작성자 닉네임
  writerTitle: string; // 게시글 작성자 칭호
  writerLevel: number; // 게시글 작성자 레벨
  writerProfileImage: string; // 게시글 작성자 프로필 이미지
}

export interface CommentRes {
  commentId: number;
  memberId: number;
  content: string;
  writerNickname: string;
  writerProfileImage: string;
  writerTitle: string;
  writerLevel: number;
  createdAt: string;
  modifiedAt: string;
}

export interface MyInfo {
  memberId: number;
  userNickname: string;
  userProfileImg: string
  userTitle: string;
  userLevel: number;
}

export interface UpdatePostReq {
  postId: number;
  title: string;
  content: string;
  category: 'MY_STORE' | 'CHALLENGE' | 'FREE';
  imageUrls: string[];
  challengeCategory: 
    | 'NO_MONEY'
    | 'KIND_CONSUMER'
    | 'DETECTIVE'
    | 'MASTER'
    | 'COOK_KING'
    | null;
}