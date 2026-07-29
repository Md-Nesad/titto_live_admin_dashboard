import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

export default function RevenueChart() {
  // const chartData = apiData?.chartData?.revenueChart?.map((rev) => {
  //   const expense = apiData?.expenseData?.find(
  //     (exp) => exp.month === rev.month,
  //   );

  //   return {
  //     name: rev.month.slice(0, 3),
  //     revenue: rev.revenue,
  //     expense: expense?.totalAmount || 0,
  //   };
  // });
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        borderRadius: 10,
        padding: 20,
        border: "1px solid #e5e7eb",
      }}
    >
      <h2 className="text-xl mb-3 font-semibold text-[#1a1a1a]">
        Revenue vs Expenses
      </h2>

      <LineChart
        data={[
          { name: "Jan", revenue: 5000000, expense: 3000000 },
          { name: "Feb", revenue: 6000000, expense: 4000000 },
        ]}
        margin={{ top: 5, right: 5, left: 3, bottom: 0 }}
        width="100%"
        height={300}
        responsive
      >
        {/* Extra top space line manually */}
        <ReferenceLine y={8000000} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine y={6000000} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine y={4000000} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine y={2000000} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x="Aug" stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x="Jan" stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x="Feb" stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"Mar"} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"Apr"} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"May"} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"Jun"} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"Jul"} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"Sep"} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"Oct"} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"Nov"} stroke="#e5e7eb" strokeDasharray="0" />
        <ReferenceLine x={"Dec"} stroke="#e5e7eb" strokeDasharray="0" />

        {/* X Axis */}
        <XAxis
          dataKey="name"
          tick={{ fill: "#6b7280", fontSize: 14, dy: 8 }}
          axisLine={{ stroke: "#000", strokeWidth: 1 }}
          tickLine={false}
          type="category"
          padding={{ left: 0, right: 30 }}
        />

        {/* Y Axis */}
        <YAxis
          tick={{ fill: "#6b7280", fontSize: 13 }}
          domain={[0, 9000000]}
          ticks={[0, 2000000, 4000000, 6000000, 8000000]}
          axisLine={{ stroke: "#000", strokeWidth: 1 }}
          tickLine={false}
        />

        {/* Hover tooltip */}
        <Tooltip cursor={false} contentStyle={{ borderRadius: "5px" }} />

        {/* Smooth line */}
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 3, fill: "white", stroke: "#22c55e", strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />

        {/* Expense Line */}
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ r: 3, fill: "white", stroke: "#ef4444", strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </div>
  );
}
