import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }: any) {
  return (
    <div className="tw-w-full tw-h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>

          <defs>
            <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5D87FF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#5D87FF" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9"/>

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <Tooltip
            cursor={{ stroke: "#e2e8f0" }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          />

          <Line
            type="monotone"
            dataKey="count"
            stroke="#5D87FF"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}