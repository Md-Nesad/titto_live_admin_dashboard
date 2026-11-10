const SUFFIXES = ["", "k", "m", "b", "t"];

export default function formatCompactNumber(value) {
  if (value === null || value === undefined || value === "") {
    return "0";
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    return String(value);
  }

  const absoluteValue = Math.abs(number);
  if (absoluteValue < 1000) {
    return number.toLocaleString();
  }

  let suffixIndex = Math.min(
    Math.floor(Math.log10(absoluteValue) / 3),
    SUFFIXES.length - 1,
  );
  let divisor = 1000 ** suffixIndex;
  let compactNumber = Number((number / divisor).toFixed(1));

  if (
    Math.abs(compactNumber) >= 1000 &&
    suffixIndex < SUFFIXES.length - 1
  ) {
    suffixIndex += 1;
    divisor *= 1000;
    compactNumber = Number((number / divisor).toFixed(1));
  }

  return `${compactNumber.toFixed(1).replace(/\.0$/, "")}${SUFFIXES[suffixIndex]}`;
}
