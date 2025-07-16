import { ApiResponse, PopularPostRes, WritePostReq } from '../types/boardType';

export const boardApi = {

  // 인기글 리스트
  getPopularPosts: async (): Promise<PopularPostRes[]> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/api/community/posts/top',
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error('인기글 요청 실패');

    const json: ApiResponse = await res.json();
    return json.data;
  },

  // 게시글 작성
  postBoardCreate: async (body: WritePostReq): Promise<void> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/api/community/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) throw new Error('게시글 작성 실패');
  },

};
