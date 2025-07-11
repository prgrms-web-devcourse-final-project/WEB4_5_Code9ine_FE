'use client';

import React, { useState } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis } from 'recharts';

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
  const [activeIndex, setActiveIndex] = useState(5);
  const activeItem = dummyData[activeIndex];

  const handleClick = (_, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={368}
        height={140}
        data={dummyData}
        className="items-center"
      >
        <Bar dataKey="price" onClick={handleClick}>
          {dummyData.map((_, index) => (
            <Cell
              width={10}
              key={`cell-${index}`}
              cursor="pointer"
              fill={
                index === activeIndex
                  ? 'var(--main-color-3)'
                  : 'var(--main-color-2)'
              }
            />
          ))}
        </Bar>
        <XAxis dataKey="name" />
      </BarChart>
    </ResponsiveContainer>
  );
}
