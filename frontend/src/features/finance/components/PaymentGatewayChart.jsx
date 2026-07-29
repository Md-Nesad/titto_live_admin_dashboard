import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useLayoutEffect } from "react";

export default function PaymentChart() {
  const paymentData = [
    { name: "Stripe", value: 25800 },
    { name: "PayPal", value: 19600 },
    { name: "Gpay", value: 26000 },
    { name: "Bank", value: 18000 },
  ];

  useLayoutEffect(() => {
    const hideGrids = () => {
      // Hide top horizontal grid
      const hLines = document.querySelectorAll(
        ".recharts-cartesian-grid-horizontal line",
      );
      if (hLines.length) hLines[hLines.length - 1].style.display = "none";

      // Hide right vertical grid
      const vLines = document.querySelectorAll(
        ".recharts-cartesian-grid-vertical line",
      );
      if (vLines.length) vLines[vLines.length - 1].style.display = "none";
    };

    // Run initially
    hideGrids();

    // Observe chart redraw
    const observer = new MutationObserver(() => hideGrids());

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

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
        Payment Gateway Distribution
      </h2>

      <BarChart
        data={paymentData}
        barCategoryGap="28%"
        margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
        width="100%"
        height={300}
        responsive
      >
        <CartesianGrid stroke="#e5e7eb" />

        <XAxis
          dataKey="name"
          tick={{ fill: "#6b7280", fontSize: 14, dy: 6 }}
          tickLine={false}
          axisLine={{ stroke: "#000", strokeWidth: 1 }}
        />

        <YAxis
          tick={{ fill: "#6b7280", fontSize: 13 }}
          axisLine={{ stroke: "#000", strokeWidth: 1 }}
          tickLine={false}
          domain={[6500, 27000]}
          ticks={[6500, 12500, 19500, 26000]} // 👈 extra grid value added
          padding={{ top: 10 }}
          // tickFormatter={(val) => {
          //   // Hide the 10000 label but keep grid line
          //   if (val === 10000 || val === 16000 || val === 22000) return "";
          //   return val;
          // }}
        />

        <Tooltip cursor={false} />

        <Bar
          dataKey="value"
          fill="#7dd3fc"
          radius={[6, 6, 0, 0]}
          barSize={60}
        />
      </BarChart>
    </div>
  );
}
