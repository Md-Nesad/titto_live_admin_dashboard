const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatMonthlyRevenue = (result) => {
  const now = new Date();

  const revenueMap = new Map();

  result.forEach((item) => {
    const key = `${item._id.year}-${item._id.month}`;

    revenueMap.set(key, item.revenue);
  });

  const data = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const key = `${year}-${month}`;

    data.push({
      month: MONTHS[month - 1],
      revenue: revenueMap.get(key) || 0,
    });
  }

  return data;
};

module.exports = {
  formatMonthlyRevenue,
};
