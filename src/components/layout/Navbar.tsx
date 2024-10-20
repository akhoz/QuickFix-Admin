import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ToggleButton from "../common/ToggleButton";
import changeLanguage from "../../functions/changeLanguage";
import changeTheme from "../../functions/changeTheme";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const handleThemeChange = () => {
    changeTheme(isDarkMode, toggleTheme);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white z-50">
      <div className="flex items-center justify-between w-full px-4 py-3 lg:px-8">
        <div className="flex flex-col items-start justify-center">
          <h1 className="font-bold text-3xl">
            QuickFix
          </h1>
          <p>
            Jose's Workshop
          </p>
        </div>
        <div className="hidden lg:flex flex-row items-center justify-start space-x-5">
          <Link
            to="/home"
            className={isActive("/home") ? "border-b-2 border-white" : ""}
          >
            Home
          </Link>
          <p>|</p>
          <Link
            to="/requests"
            className={isActive("/requests") ? "border-b-2 border-white" : ""}
          >
            {t('repair_requests')}
          </Link>
          <p>|</p>
          <Link
            to="/under-repair"
            className={isActive("/under-repair") ? "border-b-2 border-white" : ""}
          >
            Under Repair
          </Link>
          <p>|</p>
          <Link
            to="/history"
            className={isActive("/history") ? "border-b-2 border-white" : ""}
          >
            History
          </Link>
          <p>|</p>
          <Link
            to="/account"
            className={isActive("/account") ? "border-b-2 border-white" : ""}
          >
            Account
          </Link>
        </div>
        <div className="hidden lg:flex flex-col items-center justify-center space-y-2">
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

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <IoMdClose className="text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-black text-white">
          <div className="flex flex-col items-center space-y-5 py-5">
            <Link
              to="/home"
              onClick={toggleMenu}
              className={isActive("/home") ? "border-b-2 border-white" : ""}
            >
              Home
            </Link>
            <Link
              to="/requests"
              onClick={toggleMenu}
              className={isActive("/requests") ? "border-b-2 border-white" : ""}
            >
              {t('repair_requests')}
            </Link>
            <Link
              to="/under-repair"
              onClick={toggleMenu}
              className={isActive("/under-repair") ? "border-b-2 border-white" : ""}
            >
              Under Repair
            </Link>
            <Link
              to="/history"
              onClick={toggleMenu}
              className={isActive("/history") ? "border-b-2 border-white" : ""}
            >
              History
            </Link>
            <Link
              to="/account"
              onClick={toggleMenu}
              className={isActive("/account") ? "border-b-2 border-white" : ""}
            >
              Account
            </Link>
            <div className="flex items-center space-x-4">
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
        </div>
      )}
    </nav>
  );
}

export default Navbar;
