import { BsCalendar4Event } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { PiForkKnifeBold, PiStudentBold } from "react-icons/pi";

function StatisticBox(props) {
  const icons = {
    student: {
      icon: (
        <PiStudentBold className="w-5 md:w-6 lg:w-7 md:h-6 lg:h-7 md:min-w-[24px] lg:min-w-[28px] md:min-h-24px lg:min-h-[28px]" />
      ),
      bg: "#4D44B5",
    },
    teacher: {
      icon: (
        <FaUserTie className="w-4 md:w-6 lg:w-7 md:h-6 lg:h-7 md:min-w-[24px] lg:min-w-[28px] md:min-h-24px lg:min-h-[28px]" />
      ),
      bg: "#FB7D5B",
    },
    calendar: {
      icon: (
        <BsCalendar4Event className="w-4 md:w-6 lg:w-7 md:h-6 lg:h-7 md:min-w-[24px] lg:min-w-[28px] md:min-h-24px lg:min-h-[28px]" />
      ),
      bg: "#FCC43E",
    },
    eat: {
      icon: (
        <PiForkKnifeBold className="w-4 md:w-6 lg:w-7 md:h-6 lg:h-7 md:min-w-[24px] lg:min-w-[28px] md:min-h-24px lg:min-h-[28px]" />
      ),
      bg: "#303972",
    },
  };
  return (
    <div className="statistic-box flex items-center gap-4 md:gap-5 lg:gap-6 justify-center">
      <div
        className="icon flex items-center justify-center rounded-[40px] w-[50px] md:w-[60px] lg:w-[70px] text-white py-2 md:py-3"
        style={{ backgroundColor: icons[props.iconText].bg }}
      >
        {icons[props.iconText].icon}
      </div>
      <div className="text">
        <p className="text-sm md:text-base text-[#A098AE]">{props.title}</p>
        <p className="text-2xl md:text-3xl lg:text-4xl text-[#303972] font-bold">
          {props.num}
        </p>
      </div>
    </div>
  );
}

export default StatisticBox;
