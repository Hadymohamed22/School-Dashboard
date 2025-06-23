import HeaderIconBox from "../components/HeaderIconBox";
import adminPhoto from "../assets/images/admin-photo.jpg";
import { useLocation } from "react-router";
import SearchBox from "../components/SearchBox";

function HeaderLayout(props) {
  const location = useLocation();
  const headerRightPart = {
    search: <SearchBox />,
    userAndIcons: (
      <div className="icons-user hidden md:flex items-center gap-2">
        <div className="icons flex gap-2 items-center">
          <HeaderIconBox icon="ring" />
          <HeaderIconBox icon="setting" />
        </div>
        <div className="user flex items-center gap-2">
          <div className="text text-sm">
            <p className="font-semibold text-main">Hady M.</p>
            <p className="text-[#A098AE]">Admin</p>
          </div>
          <span className="block rounded-full overflow-hidden w-9 h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 border border-main">
            <img src={adminPhoto} alt="admin profile photo w-full h-full" />
          </span>
        </div>
      </div>
    ),
  };
  const renderHeaderRight = () => {
    switch (location.pathname) {
      case "/":
        return headerRightPart.search;
      case "/students":
      case "/teachers":
        return headerRightPart.userAndIcons;
      case "/finance":
        return (
          <>
            {headerRightPart.search}
            {headerRightPart.userAndIcons}
          </>
        );
      default:
        return null;
    }
  };
  return (
    <header className="flex flex-col gap-2 md:gap-0 md:flex-row items-center justify-between py-3 md:py-3 my-8">
      <h1 className="text-3xl lg:text-4xl font-bold">{props.title}</h1>
      <div className="right-part flex items-center gap-2 flex-col md:flex-row">
        {renderHeaderRight()}
      </div>
    </header>
  );
}
export default HeaderLayout;
