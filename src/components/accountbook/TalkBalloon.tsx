export default function TalkBalloon({ message }: { message: string }) {
  return (
    <>
      <div className="h-auto w-auto max-w-[250px] rounded-t-[5px] rounded-bl-[5px] bg-[var(--main-color-2)] px-[25px] py-[5px]">
        {message}
      </div>
    </>
  );
}
