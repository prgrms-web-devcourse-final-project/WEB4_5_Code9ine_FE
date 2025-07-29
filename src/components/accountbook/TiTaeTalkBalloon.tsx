export default function TitaeTalkBalloon({ message }: { message: string }) {
  return (
    <>
      <div className="h-auto w-auto max-w-[250px] rounded-t-[5px] rounded-br-[5px] bg-[var(--main-color-2)] px-[25px] py-[5px] text-start">
        {message}
      </div>
    </>
  );
}
