const getLast12MonthsRange = () => {
  const now = new Date();

  const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );

  return {
    startDate,
    endDate,
  };
};

module.exports = {
  getLast12MonthsRange,
};
