import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudent } from "react-icons/pi";

function StatisticBox({ icon, num, statisticTitle, StatisticP, percentage }) {
  const icons = {
    student: <PiStudent className="text-3xl md:text-4xl lg:text-5xl" />,
    teacher: (
      <LiaChalkboardTeacherSolid className="text-3xl md:text-4xl lg:text-5xl" />
    ),
    money: <FaMoneyBillTrendUp className="text-2xl md:text-3xl lg:text-4xl" />,
  };
  const iconBg =
    icon === "student" ? "#4d44b5" : icon === "teacher" ? "#FB7D5B" : "#FCC43E";
  const percentageColor = percentage.includes("+") ? "#22c55e" : "#ef4444";
  return (
    <div className="statistic-box p-5 md:p-6 lg:p-7 bg-white rounded-2xl md:rounded-3xl flex items-center gap-3">
      <div
        className="icon w-16 h-16 md:w-20 md:h-20 rounded-full elements-center-center text-white"
        style={{ backgroundColor: iconBg }}
      >
        {icons[icon]}
      </div>
      <div className="content">
        <p className="text-secondary text-xs md:text-sm">{statisticTitle}</p>
        <h5 className="text-[#303972] font-bold text-2xl md:text-3xl lg:text-4xl my-1">
          {num}
        </h5>
        <p className="text-secondary text-xs md:text-sm">
          <span style={{ color: percentageColor }}>{percentage}</span>{" "}
          {StatisticP}
        </p>
      </div>
    </div>
  );
}
export default StatisticBox;
