import { Outlet, useLocation } from "react-router-dom";
import siteImageBig from "../assets/images/site-logo.png";
import siteImageSmall from "../assets/images/site-logo-small-screen.png";
import NavLink from "../components/NavLink";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

function Layout() {
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const chevronIcon = useRef(null);
  const aside = useRef(null);
  const topMap = {
    "/": isTablet ? "0" : "0",
    "/students": isTablet ? "55px" : "63px",
    "/teachers": isTablet ? "112px" : "132px",
    "/finance": isTablet ? "168px" : "200px",
  };

  useEffect(() => {
    const handleResize1 = () => setIsTablet(window.innerWidth <= 1024);
    const handleResize2 = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize1);
    window.addEventListener("resize", handleResize2);
    return () => {
      window.removeEventListener("resize", handleResize1);
      window.removeEventListener("resize", handleResize2);
    };
  }, []);

  return (
    <div className="layout flex relative">
      <aside
        className={`w-[70px] md:w-[20%] lg:w-[15%] min-h-screen bg-main p-3 md:p-4 lg:p-5 text-[#C1BBEB] h-screen fixed left-0 top-0 md:relative md:h-auto z-50 ${
          isMobile && "close"
        }`}
        ref={aside}
      >
        <span>
          <img
            src={isMobile ? siteImageSmall : siteImageBig}
            alt="akademi site logo"
          />
        </span>
        <nav className="mt-3 relative">
          <ul className="flex flex-col gap-2">
            <NavLink icon="home" linkText="Dashboard" link="/" pathname="/" />
            <NavLink
              icon="student"
              linkText="Students"
              link="students"
              pathname="/students"
            />
            <NavLink
              icon="teacher"
              linkText="Teachers"
              link="teachers"
              pathname="/teachers"
            />
            <NavLink
              icon="money"
              linkText="Finance"
              link="finance"
              pathname="/finance"
            />
          </ul>
          <div
            className="hover-effect hidden md:block w-[117%] z-[1] absolute md:h-[50px] lg:h-[64px] bg-[#F3F4FF] rounded-tl-[40px] rounded-bl-[40px] md:right-[-20px] transition-all duration-300"
            style={{
              top: topMap[location.pathname],
            }}
          ></div>
        </nav>
        <div
          className="open-icon flex md:hidden absolute left-[98%] top-[20%] bg-main rounded-e-xl w-[30px] h-[50px] justify-center items-center cursor-pointer text-white"
          onClick={() => {
            aside.current.classList.toggle("close");
            if (aside.current.classList.contains("close")) {
              chevronIcon.current.style.rotate = "0deg";
            } else {
              chevronIcon.current.style.rotate = "180deg";
            }
          }}
        >
          <FaChevronRight
            ref={chevronIcon}
            className="transition-all duration-300"
          />
        </div>
        <div
          className="copyright absolute bottom-3 left-[50%] translate-x-[-50%]"
          aria-label="copyright"
        >
          <p className="text-secondary text-xs md:text-sm">
            Coding By
            <a
              href="https://www.linkedin.com/in/hady-elnifali/"
              target="_blank"
              className="font-bold text-white/90 underline"
            >
              {" "}
              Hady Elnifali
            </a>
          </p>
        </div>
      </aside>
      <main className="flex-grow px-3 md:px-5 lg:px-6 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
