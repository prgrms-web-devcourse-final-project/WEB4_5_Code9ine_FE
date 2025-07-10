interface ProgressBarProps {
  completed: number; // 진행된 퍼센트
  width?: string;
  height?: string;
  bgColor?: string; // 진행된 영역 색상
  baseBgColor?: string; // 배경색
  labelVisible?: boolean; // 진행된 퍼센트 보일지 말지
}
export default function ProgressBar({
  completed,
  width,
  height,
  bgColor,
  baseBgColor,
  labelVisible = true,
}: ProgressBarProps) {
  return (
    <div
      className="overflow-hidden rounded-full border border-[var(--main-color-3)]"
      style={{
        width,
        height,
        backgroundColor: baseBgColor,
      }}
    >
      <div
        className="flex h-full items-center justify-end rounded-full text-xs transition-all duration-300"
        style={{
          width: `${completed}%`,
          backgroundColor: bgColor,
        }}
      >
        {labelVisible && (
          <span className="p-[10px] text-[var(--white-color)]">
            {completed}%
          </span>
        )}
      </div>
    </div>
  );
}
