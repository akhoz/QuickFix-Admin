import CustomButton from "../components/common/CustomButton";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/login");
  }

  const handleSignUpClick = () => {
    navigate("/signup");
  }

  return (
    <div className="flex items-center justify-between w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-3/4 space-y-10">
        <div className="flex flex-col items-center justify-center w-5/12 space-y-3">
          <h1 className="font-bold text-3xl">
            QuickFix Admin
          </h1>
          <p className="text-center">
            Welcome to the QuickFix workshop manager. From here, you can manage
            your workshop with complete freedom.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center space-x-3">
          <CustomButton onClick={handleLogInClick} text="Log In" />
          <CustomButton onClick={handleSignUpClick} text="Sign Up" />
        </div>
      </div>
      <div className="w-1/4 h-screen">
        <img src="/images/hero.webp" className="h-screen" />
      </div>
    </div>
  )
}

export default LandingPage;
