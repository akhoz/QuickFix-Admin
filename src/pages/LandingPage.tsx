import CustomButton from "../components/common/CustomButton";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ToggleButton from "../components/common/ToggleButton";
import changeLanguage from "../functions/changeLanguage";
import changeTheme from "../functions/changeTheme";
import { useTheme } from "../contexts/ThemeContext";

function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogInClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleThemeChange = () => {
    changeTheme(isDarkMode, toggleTheme);
  };

  return (
    <div className={`relative flex flex-row items-center justify-between w-screen h-screen 
      ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} duration-150`}>
      <div className="flex flex-col items-center justify-center w-full space-y-10 lg:w-3/4">
        <div className="flex flex-col items-center justify-center w-2/3 space-y-3 md:w-1/2 lg:w-5/12">
          <h1 className="font-bold text-3xl">QuickFix</h1>
          <p className="text-center">{t('welcome_landing')}</p>
        </div>
        <div className="flex flex-row items-center justify-center space-x-3">
          <CustomButton onClick={handleLogInClick} text="Log In" />
          <CustomButton onClick={handleSignUpClick} text="Sign Up" />
        </div>
      </div>
      <div className="hidden lg:block w-1/4 h-screen">
        <img src="/images/hero.webp" className="h-screen" />
      </div>
      <div className="absolute inset-5 flex flex-col w-fit h-fit space-y-2">
        <ToggleButton
          onClick={changeLanguage}
          activeImage={"/images/spanish-icon.png"}
          inactiveImage={"/images/english-icon.png"}
        />
        <ToggleButton
          onClick={handleThemeChange}
          activeImage={"/images/moon.png"}
          inactiveImage={"/images/sun.png"}
        />
      </div>
    </div>
  );
}

export default LandingPage;
