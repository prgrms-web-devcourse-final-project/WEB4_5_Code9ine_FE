export interface ApiResponse {
  code: string;
  message: string;
  data: PopularPostRes[];
}

export interface PopularPostRes {
  postId: number; // 게시글 아이디
  title: string; // 게시글 제목
  writerNickname: string; // 작성자 닉네임
  writerProfileImage: string; // 프로필 이미지
  writerSymbol: string; // 휘장
  writerTitle: string; // 칭호
  createdAt: string; // 작성일
  //category: string; // 카테고리
}

export interface WritePostReq {
  title: string; // 제목
  content: string; // 내용
  category: string; // 게시글 종류
  imageUrls: string[]; // 이미지URL
  challengeCategory?: string; // 챌린지 종류
}

export interface WritePostRes {
  postId: number;
  createdAt: string;
}