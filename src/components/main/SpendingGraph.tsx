'use client';
import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
} from 'recharts';

interface SpendingGraphProps {
  /** 일반 사용자 지출 금액 */
  userAmount: number;
  /** 티태 사용자 지출 금액 */
  titaeAmount: number;
}

const SpendingGraph: React.FC<SpendingGraphProps> = ({
  userAmount,
  titaeAmount,
}) => {
  // 차트용 데이터
  const data = [
    { name: '일반 사용자', amount: userAmount },
    { name: '티태 사용자', amount: titaeAmount },
  ];

  return (
    <div className="flex w-full flex-col items-center py-[30px] md:h-[430px] md:w-full">
      {/* 제목 */}
      <p className="mb-4 text-xl md:text-2xl">지출그래프 통계</p>

      {/* Recharts 막대그래프 */}
      <div className="h-[250px] w-full md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              axisLine={{ stroke: 'var(--text-color)', strokeWidth: 2 }}
              tickLine={false}
              tick={{ fontSize: 20 }}
            />

            <Bar
              dataKey="amount"
              animationBegin={0}
              animationDuration={1500}
              barSize={120}
            >
              {/* 값 레이블 */}
              <LabelList
                dataKey="amount"
                position="top"
                formatter={(label: React.ReactNode) =>
                  typeof label === 'number'
                    ? `${label.toLocaleString()}원`
                    : label
                }
                style={{ fill: 'var(--text-color)', fontSize: 18 }}
              />

              {data.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={
                    idx === 0 ? 'var(--point-color-1)' : 'var(--main-color-3)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 범례(legend)를 커스텀으로 쓰고 싶으면 아래 부분 지워도 됩니다 */}
    </div>
  );
};

export default SpendingGraph;
