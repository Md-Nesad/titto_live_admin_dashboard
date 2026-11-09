import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import Skeleton from "../../../shared/components/loading/Skeleton";
import useRevenue from "../../../hooks/useRevenue";

const chartContainerStyle = {
  width: "100%",
  height: 400,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  borderRadius: 10,
  padding: 20,
  border: "1px solid #e5e7eb",
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function RevenueChart() {
  const revenueQuery = useRevenue();
  const chartData = (revenueQuery.data ?? []).map((item) => ({
    name: item.month,
    revenue: Number(item.revenue) || 0,
  }));
  const maxRevenue = Math.max(0, ...chartData.map((item) => item.revenue));
  const yAxisMax = Math.max(
    2_000_000,
    Math.ceil(maxRevenue / 2_000_000) * 2_000_000,
  );
  const yAxisTicks = Array.from(
    { length: 5 },
    (_, index) => (yAxisMax / 4) * index,
  );

  if (revenueQuery.isPending) {
    return (
      <div
        style={chartContainerStyle}
        role="status"
        aria-label="Loading monthly revenue"
        aria-busy="true"
      >
        <Skeleton className="mb-5 h-6 w-48" />
        <div className="flex h-75 flex-col justify-between py-3">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-px w-full rounded-none" />
          ))}
          <div className="flex justify-between">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-3 w-8" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (revenueQuery.isError) {
    return (
      <div style={chartContainerStyle}>
        <h2 className="text-xl mb-3 font-semibold text-[#1a1a1a]">
          Monthly Revenue
        </h2>
        <div
          role="alert"
          className="flex h-75 flex-col items-center justify-center gap-3 text-center text-sm text-red-600"
        >
          <p>
            Unable to load monthly revenue:{" "}
            {getErrorMessage(revenueQuery.error)}
          </p>
          <button
            type="button"
            onClick={() => revenueQuery.refetch()}
            disabled={revenueQuery.isFetching}
            className="underline disabled:opacity-60"
          >
            {revenueQuery.isFetching ? "Retrying..." : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div style={chartContainerStyle}>
        <h2 className="text-xl mb-3 font-semibold text-[#1a1a1a]">
          Monthly Revenue
        </h2>
        <p className="flex h-75 items-center justify-center text-sm text-gray-500">
          No monthly revenue data available.
        </p>
      </div>
    );
  }

  return (
    <div style={chartContainerStyle}>
      <h2 className="text-xl mb-3 font-semibold text-[#1a1a1a]">
        Monthly Revenue
      </h2>

      <LineChart
        data={chartData}
        margin={{ top: 5, right: 5, left: 3, bottom: 0 }}
        width="100%"
        height={300}
        responsive
      >
        {yAxisTicks.slice(1).map((tick) => (
          <ReferenceLine
            key={`revenue-${tick}`}
            y={tick}
            stroke="#e5e7eb"
            strokeDasharray="0"
          />
        ))}
        {chartData.map(({ name }) => (
          <ReferenceLine
            key={`month-${name}`}
            x={name}
            stroke="#e5e7eb"
            strokeDasharray="0"
          />
        ))}

        <XAxis
          dataKey="name"
          tick={{ fill: "#6b7280", fontSize: 14, dy: 8 }}
          axisLine={{ stroke: "#000", strokeWidth: 1 }}
          tickLine={false}
          type="category"
          padding={{ left: 0, right: 30 }}
        />

        <YAxis
          tick={{ fill: "#6b7280", fontSize: 13 }}
          domain={[0, yAxisMax]}
          ticks={yAxisTicks}
          axisLine={{ stroke: "#000", strokeWidth: 1 }}
          tickLine={false}
        />

        <Tooltip cursor={false} contentStyle={{ borderRadius: "5px" }} />

        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 3, fill: "white", stroke: "#22c55e", strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </div>
  );
}
