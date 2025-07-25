import { ApiResponse, PopularPostRes, WritePostReq, PostRes, CommentRes } from '../types/boardType';

export const boardApi = {

  // 인기글 리스트
  getPopularPosts: async (): Promise<PopularPostRes[]> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + 
        '/api/community/posts/top',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
        },
      }
    );

    if (!res.ok) {
      throw new Error('인기글 요청 실패');
    } 

    const json: ApiResponse<PopularPostRes[]> = await res.json();
    return json.data;
  },

  // 게시글 작성
  postBoardCreate: async (body: WritePostReq): Promise<PostRes> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + 
        '/api/community/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
       throw new Error('게시글 작성 실패');
    }
    
    const json: ApiResponse<PostRes> = await res.json();
    return json.data;
  },

  // 게시판 게시글 카테고리별 조회
  getPostsByCategory: async (
    category: 'MY_STORE' | 'CHALLENGE' | 'FREE',
    page = 1,
    size = 1
  ): Promise<PostRes[]> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/api/community/posts' +
        '?category=' + category +
        '&page=' + page +
        '&size=' + size,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
        },
      }
    );
    console.log('response:', res);
    if (!res.ok) {
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
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
        },
      }
    );

    if (!res.ok) {
      throw new Error('게시글 삭제 실패');
    }
  },

  // S3 URL 요청
  getPresignedUrl: async (): Promise<string> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/api/s3/presigned-url', 
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
        },
      }
    );

    if (!res.ok) {
      throw new Error('Presigned URL 요청 실패');
    }

    const { presignedUrl } = await res.json();
    return presignedUrl;
  },

  // S3 파일 업로드
  uploadFileToPresignedUrl: async (file: File, presignedUrl: string): Promise<string> => {
    console.log("presignedUrl API :"+presignedUrl);
    const res = await fetch(
        presignedUrl, 
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: file,
      }
    );

    if (!res.ok) {
        const errorText = await res.text();
        console.error('S3 업로드 실패 상세:', errorText);
        throw new Error('S3 업로드 실패: ' + errorText);
    } 
    return presignedUrl.split('?')[0];
  },


  getMyInfo: async (): Promise<{ memberId: number }> => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + 
        '/api/community/me',
    {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
      },
    }
  );

  if (!res.ok) {
    throw new Error('내 정보 가져오기 실패');
  }
    const json = await res.json();
    return json.data;
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
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
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
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
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
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
        },
      }
    );

    if (!res.ok) {
      throw new Error('댓글 삭제 실패');
    }
  },

  // 좋아요
  toggleLike: async (postId: number) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/api/community/posts/' + postId + '/like', 
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
      },
    }
  );
    const result = await res.json();
    console.log('좋아요res', result);
    if (!res.ok) {
      throw new Error('좋아요 실패');
    } 
  },

  // 북마크
  toggleBookmark: async (postId: number) => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        '/api/community/posts/' + postId + '/bookmark', 
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_API_KEY, 
        },
      }
    );
    const result = await res.json();
    console.log('북마크res', result);
    if (!res.ok) {
      throw new Error('북마크 실패');
    } 
  },


};