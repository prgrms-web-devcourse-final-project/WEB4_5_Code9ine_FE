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

const dummyData = [
  {
    name: '2월',
    price: 4000,
  },
  {
    name: '3월',
    price: 3000,
  },
  {
    name: '4월',
    price: 2000,
  },
  {
    name: '5월',
    price: 2780,
  },
  {
    name: '6월',
    price: 1890,
  },
  {
    name: '7월',
    price: 2390,
  },
];

export default function BarChartClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dummyData}
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
          {dummyData.map((_, index) => (
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
