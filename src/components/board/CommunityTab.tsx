type TabType = 'myHiddenStore' | 'challenge' | 'freeBoard';

interface MissionTabsProps {
  selectedTab: TabType;
  onChange: (tab: TabType) => void;
}

export default function CommunityTab({
  selectedTab,
  onChange,
}: MissionTabsProps) {
  const tabs: { key: TabType; label: string }[] = [
    { key: 'myHiddenStore', label: '나만 아는 가게' },
    { key: 'challenge', label: '챌린지' },
    { key: 'freeBoard', label: '자유 게시판' },
  ];

  return (
    <div className="border-b-2px relative mx-auto flex w-fit justify-center border-[var(--main-color-1)]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative mx-[7px] cursor-pointer py-2 text-[20px] font-medium transition-colors duration-300 ${
            selectedTab === tab.key
              ? 'font-semibold text-[var(--main-color-3)]'
              : 'hover:text-[var(--main-color-3)]'
          }`}
        >
          {tab.label}
          {selectedTab === tab.key && (
            <span className="animate-draw-underline absolute right-0 bottom-[-2px] left-0 h-[2px] bg-[var(--main-color-3)]" />
          )}
        </button>
      ))}
    </div>
  );
}
