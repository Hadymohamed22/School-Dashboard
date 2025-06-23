export const financeChartOptions = {
  chart: {
    id: "school-finance-chart",
  },
  xaxis: {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  toolbar: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      borderRadiusApplication: "end",
    },
  },
  colors: ["#FCC43E", "#FB7D5B"],
  grid: {
    show: true,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
};
export const financeChartSeries = [
  {
    name: "this week",
    data: [100, 70, 65, 85, 35, 90, 60],
  },
  {
    name: "last week",
    data: [40, 55, 40, 45, 65, 80, 50],
  },
];
