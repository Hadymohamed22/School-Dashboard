export const performanceChartOptions = {
  chart: {
    id: "school performance",
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
export const performanceChartSeries = [
  {
    name: "this week",
    data: [10, 25, 45, 85, 65, 10, 60, 40, 55, 35, 20, 80],
  },
  {
    name: "last week",
    data: [30, 15, 25, 45, 80, 50, 25, 75, 40, 55, 60, 20],
  },
];
