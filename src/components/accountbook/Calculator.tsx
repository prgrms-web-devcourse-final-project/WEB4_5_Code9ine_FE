export default function Calculator() {
  return (
    <>
      <div className="mt-[32px] flex size-[300px] rounded-[10px] bg-[var(--background)] shadow-md">
        <div className="grid grid-cols-3">
          <button className="size-[75px] cursor-pointer rounded-tl-[10px] text-[20px] active:bg-[var(--main-color-2)]">
            7
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            8
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            9
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            4
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            5
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            6
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            1
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            2
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            3
          </button>
          <button className="size-[75px] cursor-pointer rounded-bl-[10px] text-[20px] active:bg-[var(--main-color-2)]">
            0
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            00
          </button>
          <button className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]">
            ,000
          </button>
        </div>
        <div className="grid grid-cols-1">
          <button className="h-[60px] w-[75px] cursor-pointer rounded-tr-[10px] text-[20px] font-bold active:bg-[var(--main-color-2)]">
            +
          </button>
          <button className="h-[60px] w-[75px] cursor-pointer text-[20px] font-bold active:bg-[var(--main-color-2)]">
            -
          </button>
          <button className="h-[60px] w-[75px] cursor-pointer text-[20px] font-bold active:bg-[var(--main-color-2)]">
            ×
          </button>
          <button className="h-[60px] w-[75px] cursor-pointer text-[20px] font-bold active:bg-[var(--main-color-2)]">
            ÷
          </button>
          <button className="h-[60px] w-[75px] cursor-pointer rounded-br-[10px] text-[20px] font-bold active:bg-[var(--main-color-2)]">
            =
          </button>
        </div>
      </div>
    </>
  );
}
