import SetGoal from './SetGoal';
import PostItem from '../board/PostItem';
export default function MyThreads() {
  return (
    <>
      <SetGoal />
      <div className="mx-auto mt-[200px] flex w-full max-w-[720px] flex-col items-center gap-[20px]">
        <PostItem />
        <PostItem />
      </div>
    </>
  );
}
