interface ModalProps {
  title: string;
  description?: string;
  buttons?: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ title, description, buttons }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[250px] rounded-[10px] bg-[var(--white-color)] p-[20px] shadow-[var(--shadow-md)]">
        <h1 className="text-center text-[20px] font-semibold whitespace-pre-line">
          {title}
        </h1>

        {description && (
          <p className="mt-[10px] text-center text-[16px] font-semibold text-[var(--main-color-3)]">
            {description}
          </p>
        )}

        {buttons && (
          <div className={`mt-[20px] flex justify-center gap-[10px]`}>
            {buttons}
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* 
예시
  <Modal
    title="로그인 후 이용해 주세요!"
    buttons={
      <button className="cursor-pointer rounded-[10px] bg-[var(--main-color-1)] px-4 py-1 hover:bg-[var(--main-color-3)] dark:text-[#2b2e34]">
        로그인 하러가기
      </button>
    }
  />*/
}
