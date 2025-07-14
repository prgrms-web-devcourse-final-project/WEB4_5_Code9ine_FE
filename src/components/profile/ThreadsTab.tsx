type TabType = 'thread' | 'saved' | 'place';

interface MissionTabsProps {
  selectedTab: TabType;
  onChange: (tab: TabType) => void;
}

export default function ThreadsTab({
  selectedTab,
  onChange,
}: MissionTabsProps) {
  const tabs: { key: TabType; label: string }[] = [
    { key: 'thread', label: '내가 쓴 글' },
    { key: 'saved', label: '내가 찜한 글' },
    { key: 'place', label: '내가 찜한 갓플' },
  ];

  return (
    <div className="border-b-2px relative mx-auto mt-[40px] flex w-fit justify-center border-[var(--main-color-1)]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative mx-[7px] cursor-pointer py-2 text-[16px] font-medium transition-colors duration-300 md:text-[20px] ${
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
