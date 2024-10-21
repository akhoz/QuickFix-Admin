import { useTheme } from "../contexts/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import CustomButton from "../components/common/CustomButton";
import useAxios from "../hooks/useAxios";
import WorkshopType from "../types/Workshop";
import ROUTES from "../constants/routes";
import Loading from "../components/common/Loading";
import { useEffect, useState } from "react";
import { useWorkshop } from "../contexts/WorkshopContext";
import Modal from "../components/common/Modal";
import ActionModal from "../components/common/ActionModal";
import { BiSolidError } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

function LogIn() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const fiscalID = useInput('');
  const password = useInput('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { data: workshopData, loading: loading, execute: getWorkshopData } = useAxios<WorkshopType>({
    url: `${ROUTES.workshops}/${fiscalID.value}`,
    method: "GET",
    auto: false
  }, [fiscalID, password]);
  const { workshop: workshop, setWorkshop: setWorkshop } = useWorkshop();

  const handleGoHomeClick = () => {
    navigate("/");
  }

  const handleLogInClick = async () => {
    await getWorkshopData({ data: fiscalID });
  }

  useEffect(() => {
    if (workshopData && workshopData.password) {
      if (workshopData?.password === password.value) {
        console.log("Logged In");
        setWorkshop(workshopData);
        setShowSuccessModal(true);
      } else {
        setShowErrorModal(true);
        console.log("Invalid password");
      }
    }
  }, [workshopData])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className={`relative flex flex-row items-center justify-between w-screen h-screen 
      ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'} duration-150`}>
        <div className="flex flex-col items-center justify-center w-full lg:w-3/4" data-aos="zoom-in">
          <div className="w-fit flex flex-col space-y-8 items-start justify-center">
            <h1 className=" w-full font-bold text-2xl text-center">
              Log In
            </h1>
            <input
              type="text"
              className="border-0 border-b-2 w-full border-gray-500 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 lg:w-full"
              placeholder="Fiscal ID"
              value={fiscalID.value}
              onChange={fiscalID.onChange}
            />
            <input
              type="password"
              className="border-0 border-b-2 w-full border-gray-500 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 lg:w-full"
              placeholder="Password"
              value={password.value}
              onChange={password.onChange}
            />
            <button className="text-gray-500">
              Forgot your password?
            </button>
            <CustomButton text="Log In" onClick={handleLogInClick} />
          </div>
        </div>
        <div className="hidden lg:block w-1/4 h-screen">
          <img src="/images/hero.webp" className="h-screen" />
        </div>

        <div className="absolute inset-5 flex flex-col w-fit h-fit space-y-2">
          <FaArrowLeft
            className="absolute cursor-pointer inset-5 transition-transform transform hover:scale-110"
            onClick={handleGoHomeClick} />
        </div>
      </div>
      {showErrorModal && (
        <Modal
          title={"Invalid Password"}
          description={"Invalid password, please write your password again"}
          Icon={BiSolidError}
          onClose={() => { setShowErrorModal(false) }}
        />
      )}
      {showSuccessModal && (
        <ActionModal
          title={"Logged in successfully"}
          description={"Logged in successfully, now you can start using the app"}
          Icon={FaCheckCircle}
          buttonText="Go home"
          onClickButton={handleGoHomeClick}
          onClose={() => { setShowSuccessModal(false) }}
        />
      )}
    </>
  )
}

export default LogIn;
