interface ModalProps {
  title: string;
  description?: string;
  buttons?: React.ReactNode;
  onClose?: () => void;
}
export default function Modal({
  title, // 제목 : 게시글을 삭제하시겠어요?
  description, // 설명
  buttons, // 아니요/예
  onClose,
}: ModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="h-[180px] w-[250px] rounded-[10px] bg-[var(--white-color)] p-[20px] shadow-md">
          {title && (
            <h1 className="text-center text-[20px] leading-relaxed font-semibold whitespace-pre-line">
              {title}
            </h1>
          )}
          {description && (
            <h1 className="text-center text-[16px] font-semibold text-[var(--main-color-3)]">
              {description}
            </h1>
          )}
          <div className="mt-[10px] flex justify-center gap-[20px]">
            {buttons}
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* 
예시
<Modal
  title="로그인 후 이용 가능해요!"
  buttons={
    <>
      <button className="">로그인 하러가기</button>
      <button className="">취소</button>
    </>
  }
/> */
}
