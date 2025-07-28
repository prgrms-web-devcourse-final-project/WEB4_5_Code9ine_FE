'use client';
import { useAccountData } from '@/stores/accountStore';
import { useState } from 'react';

export default function Calculator() {
  const [calculated, setCalculated] = useState<string[]>([]);
  const { calcString, setCalcString } = useAccountData();
  const handleCalculator = (input: string) => {
    if (input !== '=') {
      calculated.push(input);
      setCalcString(calculated.join(''));
    } else if (input === '=') {
      const value = Function(`return ${calculated.join('').toString()}`)();
      setCalcString(Number(value).toLocaleString('ko-KR'));
      console.log(value);
    }
  };

  const handleReset = () => {
    setCalculated([]);
    setCalcString('');
  };

  const handleDelete = () => {
    if (calculated.length > 0) {
      setCalculated(calculated.slice(0, calculated.length - 1));
      setCalcString(calculated.join(''));
    } else if (calcString !== null && calcString?.length > 0) {
      setCalcString(calcString?.slice(0, calcString.length - 1));
    }
  };
  // useEffect(() => {
  //   setCalcString(Array.join('').toString());
  // }, [Array]);
  return (
    <>
      <div className="max-size-[300px] mt-[32px] flex rounded-[10px] bg-[var(--background)] shadow-md">
        <div className="grid grid-cols-3">
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)] text-[var(--point-color-2)]"
            onClick={handleReset}
          >
            C
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={handleDelete}
          >
            CE
          </button>
          <button className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"></button>
          <button
            className="h-[60px] w-[75px] cursor-pointer rounded-tl-[10px] text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('7')}
          >
            7
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('8')}
          >
            8
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('9')}
          >
            9
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('4')}
          >
            4
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('5')}
          >
            5
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('6')}
          >
            6
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('1')}
          >
            1
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('2')}
          >
            2
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('3')}
          >
            3
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer rounded-bl-[10px] text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('0')}
          >
            0
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
            onClick={() => handleCalculator('00')}
          >
            00
          </button>
          <button
            className="h-[60px] w-[75px] cursor-pointer text-[20px] active:bg-[var(--main-color-2)]"
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
