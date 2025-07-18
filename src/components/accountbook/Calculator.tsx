export default function Calculator() {
  let calculated = [''];
  const handleCalculator = (input: string) => {
    if (input !== '=') calculated.push(input);
    else if (input === '=') {
      const value = Function(`return ${calculated.join('').toString()}`)();
      console.log(value);
      calculated = [''];
    }
  };
  return (
    <>
      <div className="max-size-[300px] mt-[32px] flex rounded-[10px] bg-[var(--background)] shadow-md">
        <div className="grid grid-cols-3">
          <button
            className="size-[75px] cursor-pointer rounded-tl-[10px] text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('7')}
          >
            7
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('8')}
          >
            8
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('9')}
          >
            9
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('4')}
          >
            4
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('5')}
          >
            5
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('6')}
          >
            6
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('1')}
          >
            1
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('2')}
          >
            2
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('3')}
          >
            3
          </button>
          <button
            className="size-[75px] cursor-pointer rounded-bl-[10px] text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('0')}
          >
            0
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('00')}
          >
            00
          </button>
          <button
            className="size-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('000')}
          >
            ,000
          </button>
        </div>
        <div className="grid grid-cols-1">
          <button
            className="h-[60px] w-[75px] cursor-pointer rounded-tr-[10px] text-[20px] font-bold active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('+')}
          >
            +
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] font-bold active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('-')}
          >
            -
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] font-bold active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('*')}
          >
            ×
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] font-bold active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('/')}
          >
            ÷
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer rounded-br-[10px] text-[20px] font-bold active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('=')}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}
