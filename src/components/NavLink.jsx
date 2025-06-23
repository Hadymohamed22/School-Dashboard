import { FaUserTie } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { Link, useLocation } from "react-router";

function NavLink(props) {
  const location = useLocation();

  const icons = {
    home: (
      <FiHome className="w-5 md:w-6 lg:w-7 md:h-6 lg:h-7 md:min-w-[24px] lg:min-w-[28px] md:min-h-24px lg:min-h-[28px]" />
    ),
    student: (
      <PiStudentBold className="w-5 md:w-6 lg:w-7 md:h-6 lg:h-7 md:min-w-[24px] lg:min-w-[28px] md:min-h-24px lg:min-h-[28px]" />
    ),
    teacher: (
      <FaUserTie className="w-4 md:w-6 lg:w-7 md:h-6 lg:h-7 md:min-w-[24px] lg:min-w-[28px] md:min-h-24px lg:min-h-[28px]" />
    ),
    money: (
      <GiReceiveMoney className="w-5 md:w-6 lg:w-7 md:h-6 lg:h-7 md:min-w-[24px] lg:min-w-[28px] md:min-h-24px lg:min-h-[28px]" />
    ),
  };
  return (
    <li
      className={`nav-link py-2 md:py-3 lg:py-4 relative z-10 transition duration-300 ${
        location.pathname === props.pathname && window.innerWidth > 768
          ? "text-main"
          : location.pathname === props.pathname &&
            window.innerWidth < 768 &&
            "text-white"
      }`}
    >
      <Link
        to={props.link}
        className="flex justify-center md:justify-start items-center gap-4"
      >
        {icons[props.icon]}
        <span className="text-base hidden md:block">{props.linkText}</span>
      </Link>
    </li>
  );
}

export default NavLink;
