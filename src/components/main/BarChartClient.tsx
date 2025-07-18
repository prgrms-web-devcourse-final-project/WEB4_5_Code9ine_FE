'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from 'recharts';

interface MonthlyExpense {
  month: string;
  amount: number;
}

interface BarChartClientProps {
  monthlyExpenses: MonthlyExpense[];
}

export default function BarChartClient({
  monthlyExpenses,
}: BarChartClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  //2025-02 → 2월 형식으로 변환
  const chartData = monthlyExpenses.map((item) => {
    const monthNumber = parseInt(item.month.split('-')[1], 10);
    return {
      name: `${monthNumber}월`,
      price: item.amount,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 40, left: 5 }}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <Tooltip
          cursor={{ fill: 'transparent' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-[10px] border bg-[var(--white-color)] px-2 py-1 text-[14px]">
                  {`${payload[0].value.toLocaleString()}원`}
                </div>
              );
            }
            return null;
          }}
        />

        <Bar barSize={20} dataKey="price" animationDuration={1800}>
          {chartData.map((_, index) => (
            <Cell
              width={19}
              key={`cell-${index}`}
              cursor="pointer"
              fill={
                index === activeIndex
                  ? 'var(--main-color-3)'
                  : 'var(--main-color-2)'
              }
              onMouseEnter={() => setActiveIndex(index)}
            />
          ))}
        </Bar>
        <XAxis
          dataKey="name"
          interval={0}
          tick={{ fill: 'var(--text-color)', fontSize: 14 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
