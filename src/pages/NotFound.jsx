import { useNavigate } from "react-router";
import Image404 from "../assets/images/404-image.png";

function NotFound() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="not-found-page flex flex-col justify-center items-center gap-2 min-h-screen">
      <img
        src={Image404}
        alt="404 illustration"
        className="w-[300px] md:w-[350px] lg:w-[400px]"
      />
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center">
        Page Not Found
      </h1>
      <div
        role="button"
        aria-label="go back button"
        onClick={goBack}
        className="py-3 px-9 mt-3 font-semibold rounded-lg bg-main text-white transition duration-300"
      >
        Go Back
      </div>
    </div>
  );
}

export default NotFound;
