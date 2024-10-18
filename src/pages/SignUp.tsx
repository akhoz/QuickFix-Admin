import { useState, useEffect } from "react";
import GoogleMapsComponent from "../components/others/GoogleMapsComponent";
import useInput from "../hooks/useInput";
import CustomButton from "../components/common/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const name = useInput('');
  const email = useInput('');
  const fiscalID = useInput('');
  const password = useInput('');
  const confirmationPassword = useInput('');
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 10.360149,
    lng: -84.511006,
  });

  const handleRegisterClick = () => {
    console.log("Register Workshop");
  }

  const handleGoBackClick = () => {
    navigate("/");
  }

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="flex flex-col-reverse items-center justify-center w-11/12 h-full my-10 space-y-10 lg:space-y-0 lg:my-0 lg:w-10/12 lg:flex-row">
        <div className="flex flex-col items-start justify-center h-full lg:h-2/3 lg:w-1/2">
          <GoogleMapsComponent position={position} setPosition={setPosition} />
          <p className="text-xs text-gray-500">* Drag the pin icon to set the location of your workshop</p>
          <div className="flex flex-col items-start justify-center w-full">
            <p>
              Latidud: {position.lat}
            </p>
            <p>
              Longitud: {position.lng}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-full space-y-3">
          <h1 className="font-bold text-2xl">Register a new Workshop</h1>
          <input
            type="text"
            className="border-0 border-b-2 w-full border-gray-500 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 lg:w-1/2"
            placeholder="Name"
            value={name.value}
            onChange={name.onChange}
          />
          <input
            type="text"
            className="border-0 border-b-2 w-full border-gray-500 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 lg:w-1/2"
            placeholder="Email"
            value={email.value}
            onChange={email.onChange}
          />
          <input
            type="text"
            className="border-0 border-b-2 w-full border-gray-500 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 lg:w-1/2"
            placeholder="Fiscal ID"
            value={fiscalID.value}
            onChange={fiscalID.onChange}
          />
          <input
            type="text"
            className="border-0 border-b-2 w-full border-gray-500 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 lg:w-1/2"
            placeholder="Password"
            value={password.value}
            onChange={password.onChange}
          />
          <input
            type="text"
            className="border-0 border-b-2 w-full border-gray-500 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 lg:w-1/2"
            placeholder="Confirm Password"
            value={confirmationPassword.value}
            onChange={confirmationPassword.onChange}
          />
          <div className="flex w-1/2 items-center justify-center py-5 lg:justify-end">
            <CustomButton onClick={handleRegisterClick} text="Register" />
          </div>
        </div>
        <FaArrowLeft
          className="absolute inset-5 transition-transform transform hover:scale-110"
          onClick={handleGoBackClick} />
      </div>

    </div>
  )
}

export default SignUp;
