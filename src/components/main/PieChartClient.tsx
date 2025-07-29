'use client';

import {
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
} from 'recharts';

export default function PieChartClient({
  data,
  colors,
}: {
  data: { name: string; value: number }[];
  colors: string[];
}) {
  //  음수 값 필터링
  const filteredData = data.filter((d) => d.value > 0);

  //  총합 계산
  const total = filteredData.reduce((sum, d) => sum + d.value, 0);

  // 커스텀 라벨 함수
  const customLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    payload,
  }: PieLabelRenderProps) => {
    if (
      cx === undefined ||
      cy === undefined ||
      outerRadius === undefined ||
      !payload
    ) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = parseFloat(String(outerRadius)) + 40;

    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

    const percent = total > 0 ? Math.round((payload.value / total) * 100) : 0;

    return (
      <text
        x={x}
        y={y}
        fill="var(--text-color)"
        fontSize={8}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {payload.name} {percent}%
      </text>
    );
  };

  //  합계가 0이면 차트를 표시하지 않음
  if (total === 0 || filteredData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[14px] text-[var(--text-color)]">
        유효한 데이터가 없습니다.
      </div>
    );
  }

  //  차트 렌더링
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 3 }}>
        <Pie
          dataKey="value"
          data={filteredData}
          cx="50%"
          cy="50%"
          outerRadius={75}
          label={customLabel}
          labelLine={true}
        >
          {filteredData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
