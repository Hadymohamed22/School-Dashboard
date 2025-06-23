import { IoSettingsOutline } from "react-icons/io5";
import { PiBellRinging } from "react-icons/pi";

function HeaderIconBox(props) {
  const icons = {
    ring: <PiBellRinging />,
    setting: <IoSettingsOutline />,
  };
  return (
    <div className="header-icon-box bg-white rounded-full text-[#A098AE] border border-transparent hover:border-main hover:text-main text-lg md:text-xl lg:text-2xl w-9 h-9 md:w-10 md:h-10  lg:w-13 lg:h-13 flex items-center justify-center transition-all duration-300 cursor-pointer">
      {icons[props.icon]}
    </div>
  );
}

export default HeaderIconBox;
