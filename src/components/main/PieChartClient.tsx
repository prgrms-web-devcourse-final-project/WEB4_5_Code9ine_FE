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
  const customLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    payload,
  }: PieLabelRenderProps) => {
    if (
      cx === undefined ||
      cy === undefined ||
      percent === undefined ||
      outerRadius === undefined
    )
      return null;

    const RADIAN = Math.PI / 180;

    // 문자열로 들어오는 경우 숫자로 변환
    const radius =
      (typeof outerRadius === 'function'
        ? outerRadius(payload) + 40
        : parseFloat(String(outerRadius))) + 40;

    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="var(--text-color)"
        fontSize={8}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {payload.name} {percent * 100}%
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 3 }}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={75}
          label={customLabel}
          labelLine={true}
        >
          {' '}
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
