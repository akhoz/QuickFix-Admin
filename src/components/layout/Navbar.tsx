import { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleThemeChange = () => {
    changeTheme(isDarkMode, toggleTheme);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
          <Link to={"/home"}>Home</Link>
          <p>|</p>
          <Link to={"/requests"}>{t('repair_requests')}</Link>
          <p>|</p>
          <Link to={"/requests"}>Under repair</Link>
          <p>|</p>
          <Link to={"/requests"}>History</Link>
          <p>|</p>
          <Link to={"/requests"}>Account</Link>
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

        {/* Ícono del menú hamburguesa en pantallas pequeñas */}
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

      {/* Menú desplegable en pantallas pequeñas */}
      {isOpen && (
        <div className="lg:hidden bg-black text-white">
          <div className="flex flex-col items-center space-y-5 py-5">
            <Link to={"/home"} onClick={toggleMenu}>
              Home
            </Link>
            <Link to={"/requests"} onClick={toggleMenu}>
              {t('repair_requests')}
            </Link>
            <Link to={"/under-repair"} onClick={toggleMenu}>
              Under Repair
            </Link>
            <Link to={"/history"} onClick={toggleMenu}>
              History
            </Link>
            <Link to={"/account"} onClick={toggleMenu}>
              Account
            </Link>
            {/* Botones de idioma y tema en pantallas pequeñas */}
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
