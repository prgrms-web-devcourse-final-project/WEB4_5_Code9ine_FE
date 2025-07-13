type TabType = 'daily' | 'weekly' | 'monthly' | 'community';

interface MissionTabsProps {
  selectedTab: TabType;
  onChange: (tab: TabType) => void;
}

export default function MissionTabs({
  selectedTab,
  onChange,
}: MissionTabsProps) {
  const tabs: { key: TabType; label: string }[] = [
    { key: 'daily', label: '일일 미션' },
    { key: 'weekly', label: '주간 미션' },
    { key: 'monthly', label: '월간 미션' },
    { key: 'community', label: '커뮤니티 미션' },
  ];

  return (
    <div className="relative flex justify-around border-b-[2px] border-[var(--main-color-1)]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative mx-[7px] py-2 text-[16px] font-medium transition-colors duration-300 ${
            selectedTab === tab.key
              ? 'font-semibold text-[var(--main-color-3)]'
              : 'hover:text-[var(--main-color-3)]'
          }`}
        >
          {tab.label}
          {selectedTab === tab.key && (
            <span className="animate-draw-underline absolute right-0 bottom-[-2px] h-[2px] bg-[var(--main-color-3)]" />
          )}
        </button>
      ))}
    </div>
  );
}
