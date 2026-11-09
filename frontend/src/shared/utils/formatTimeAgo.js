const timeUnits = [
  { label: "year", seconds: 365 * 24 * 60 * 60 },
  { label: "month", seconds: 30 * 24 * 60 * 60 },
  { label: "week", seconds: 7 * 24 * 60 * 60 },
  { label: "day", seconds: 24 * 60 * 60 },
  { label: "hour", seconds: 60 * 60 },
  { label: "minute", seconds: 60 },
];

export default function formatTimeAgo(value) {
  const timestamp = new Date(value).getTime();
  if (!Number.isFinite(timestamp)) return "time unavailable";

  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (elapsedSeconds < 60) return "just now";

  const unit = timeUnits.find(({ seconds }) => elapsedSeconds >= seconds);
  const count = Math.floor(elapsedSeconds / unit.seconds);
  const paddedCount = String(count).padStart(2, "0");

  return `${paddedCount} ${unit.label}${count === 1 ? "" : "s"} ago`;
}
