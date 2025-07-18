import { ApiResponse, PopularPostRes, WritePostReq, PostRes, CommentRes } from '../types/boardType';

export const boardApi = {

  // 인기글 리스트
  getPopularPosts: async (): Promise<PopularPostRes[]> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + 
        '/api/community/posts/top',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok){
      throw new Error('인기글 요청 실패');
    } 

    const json: ApiResponse<PopularPostRes[]> = await res.json();
    return json.data;
  },

  // 게시글 작성
  postBoardCreate: async (body: WritePostReq): Promise<void> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + 
        '/api/community/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok){
       throw new Error('게시글 작성 실패');
    }
  },

  // 게시판 게시글 카테고리별 조회
  getPostsByCategory: async (
    category: 'MYSTORE' | 'CHALLENGE' | 'FREE',
    page = 1,
    size = 1
  ): Promise<PostRes[]> => {
    
    //모킹용 개발기 올라가면 변경 category
    const categoryMap = {
      MYSTORE: '나가게',
      CHALLENGE: '챌린지',
      FREE: '자유 게시판',
    };

    const mookCategory = categoryMap[category];
    //모킹용

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/api/community/posts' +
        '?category=' + mookCategory +
        '&page=' + page +
        '&size=' + size,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    console.log('response:', res);
    if (!res.ok){
      throw new Error('게시글 목록 요청 실패');
    } 

    const json: ApiResponse<PostRes[]> = await res.json();
    return json.data;
  },

  // 게시글 삭제
  deletePost: async (postId: number): Promise<void> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/api/community/posts/' + postId +
        '/delete',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok){
      throw new Error('게시글 삭제 실패');
    }
  },









  // 댓글 리스트
  getCommentlist: async (postId: number): Promise<CommentRes[]> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/api/community/posts/' + postId + '/comments',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error('댓글 조회 실패');
    }

    const json: ApiResponse<CommentRes[]> = await res.json();
    return json.data;
  },
  
  // 댓글작성 
  postCommentCreate: async (postId: number, content: string): Promise<void> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/community/posts/${postId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!res.ok) {
      throw new Error('댓글 작성 실패');
    }
  },


  // 댓글삭제
  deleteComment: async (commentId: number): Promise<void> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/api/community/comments/' + commentId + '/delete',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) {
      throw new Error('댓글 삭제 실패');
    }
  }

};
