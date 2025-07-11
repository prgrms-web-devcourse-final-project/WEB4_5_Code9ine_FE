import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
export default function MyThreads() {
  return (
    <>
      <SetGoal />
      <div className="mt-[200px] flex w-full flex-col gap-[20px] p-[20px]">
        <PostItem />
        <PostItem />
      </div>
    </>
  );
}
