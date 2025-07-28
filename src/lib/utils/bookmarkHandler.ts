import { patchBookmark } from '@/api/godplaces';
import toast from 'react-hot-toast';

const bookmarkHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    const message = await patchBookmark('store', 1);

    if (message.code === '0000') {
      toast.success('북마크 완료');
    } else {
      toast.error('북마크 실패');
    }
  } catch (err) {
    console.error('북마크 실패: ', err);
  }
};

export default bookmarkHandler;
