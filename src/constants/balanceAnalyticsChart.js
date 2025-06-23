export const balanceAnalyticsOptions = {
  chart: {
    id: "balance-analytics-chart",
  },
  xaxis: {
    categories: [
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
    ],
  },
  toolbar: {
    show: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#FCC43E", "#FB7D5B"],
  grid: {
    show: true,
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    show: false,
  },
};
export const balanceAnalyticsSeries = [
  { name: "expense", data: [0, 50, 75, 25, 5, 15, 45, 35, 25, 20, 75, 60] },
  { name: "income", data: [20, 30, 45, 25, 10, 35, 50, 30, 10, 60, 80, 45] },
];
