import { useState, useEffect } from "react";
import GoogleMapsComponent from "../components/others/GoogleMapsComponent";
import useInput from "../hooks/useInput";
import CustomButton from "../components/common/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import ROUTES from "../constants/routes";
import Loading from "../components/common/Loading";
import Modal from "../components/common/Modal";
import { BiSolidError } from "react-icons/bi";

interface WorkshopExistsType {
  exists: boolean
}

function SignUp() {
  const navigate = useNavigate();
  const name = useInput('');
  const email = useInput('');
  const fiscalID = useInput('');
  const password = useInput('');
  const confirmationPassword = useInput('');
  const [errorTitle, setErrorTitle] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data: verificationData, loading: verificationLoading, execute: checkIfWorkshopExists } = useAxios<WorkshopExistsType>({
    url: `${ROUTES.workshops}/verify/${fiscalID.value}`,
    method: "GET",
    auto: false
  }, [fiscalID.value])

  const { execute: createWorkshop } = useAxios({
    url: ROUTES.workshops,
    method: "POST",
    auto: false
  });

  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 10.360149,
    lng: -84.511006,
  });

  const handleGoBackClick = () => {
    navigate("/");
  }

  const handleRegisterClick = async () => {
    if (name.value.trim() === "") {
      setErrorTitle("Invalid name");
      setError("The Workshop name can not be empty, please enter a valid name");
      setShowModal(true);
      return;
    }

    if (email.value.trim() === "") {
      setErrorTitle("Invalid email");
      setError("The email cannot be empty, please enter a valid email address");
      setShowModal(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      setErrorTitle("Invalid email format");
      setError("Please enter a valid email address");
      setShowModal(true);
      return;
    }

    if (fiscalID.value.trim() === "") {
      setErrorTitle("Invalid Fiscal ID");
      setError("The Fiscal ID can not be empty, please enter a ID");
      setShowModal(true);
      return;
    }

    if (password.value.trim() === "") {
      setErrorTitle("Invalid password");
      setError("The password cannot be empty, please enter a valid password");
      setShowModal(true);
      return;
    }

    if (password.value !== confirmationPassword.value) {
      setErrorTitle("Password mismatch");
      setError("The passwords do not match, please confirm your password correctly");
      setShowModal(true);
      return;
    }

    await checkIfWorkshopExists();
  }

  useEffect(() => {
    if (verificationData?.exists) {
      setErrorTitle("That Workshop already exists");
      setError("The workshop's Fiscal ID already exists. You can register another workshop with the same email and name, but it must have a unique Fiscal ID.");
      setShowModal(true);
      return;
    }

    if (verificationData && !verificationData.exists) {
      const registerWorkshop = async () => {
        try {
          const workshopData = {
            name: name.value,
            email: email.value,
            password: password.value,
            fiscalID: fiscalID.value,
            latitude: position.lat,
            longitude: position.lng,
          };
          await createWorkshop({ data: workshopData });
          alert('Workshop created successfully');
          navigate("/");
        } catch (error) {
          setErrorTitle("Error creating workshop");
          setError("There was an error creating the workshop, please try again later.");
          setShowModal(true);
        }
      };

      registerWorkshop();
    }
  }, [verificationData?.exists])


  if (verificationLoading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className="relative flex items-center justify-center w-full h-screen">
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
              type="password"
              className="border-0 border-b-2 w-full border-gray-500 p-1 focus:border-b-2 focus:border-black focus:ring-0 focus:outline-0 lg:w-1/2"
              placeholder="Password"
              value={password.value}
              onChange={password.onChange}
            />
            <input
              type="password"
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
            className="absolute cursor-pointer inset-5 transition-transform transform hover:scale-110"
            onClick={handleGoBackClick} />
        </div>
      </div>
      {showModal && (
        <Modal
          title={errorTitle}
          description={error}
          Icon={BiSolidError}
          onClose={() => { setShowModal(false) }}
        />
      )}
    </>
  )
}

export default SignUp;
