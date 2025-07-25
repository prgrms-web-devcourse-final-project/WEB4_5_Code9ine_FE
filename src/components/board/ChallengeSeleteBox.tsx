import { useEffect, useRef, useState } from 'react';

const challengeOptions = [
  { value: 'NO_MONEY', label: '제로 마스터' },
  { value: 'KIND_CONSUMER', label: '착한 소비러' },
  { value: 'DETECTIVE', label: '숨.맛.탐' },
  { value: 'MASTER', label: '노노카페' },
  { value: 'COOK_KING', label: '냉털 요리왕' },
];

interface ChallengeSeleteBoxProps {
  selected: string | null;
  onChange: (value: string) => void;
}

export default function ChallengeSeleteBox({
  selected,
  onChange,
}: ChallengeSeleteBoxProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel =
    challengeOptions.find((o) => o.value === selected)?.label ?? '선택';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-[82px]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="mt-1 h-[30px] w-[82px] rounded-[10px] border border-[var(--main-color-1)] bg-[var(--white-color)] pl-2 text-left text-[14px] text-[var(--text-color)]"
      >
        {selectedLabel}
      </button>

      {open && (
        <ul className="mt-1 max-h-[200px] overflow-y-auto rounded-[10px] border border-[var(--main-color-1)] bg-[var(--white-color)]">
          {challengeOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-ful cursor-pointer rounded-[5px] px-2 py-1 text-[14px] text-[var(--text-color)] hover:bg-[var(--main-color-2)] ${
                selected === option.value
                  ? 'bg-[var(--main-color-2)] text-[var(--text-color)]'
                  : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
