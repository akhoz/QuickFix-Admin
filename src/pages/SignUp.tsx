import { useState, useEffect } from "react";
import GoogleMapsComponent from "../components/others/GoogleMapsComponent";
import useInput from "../hooks/useInput";
import CustomButton from "../components/common/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import ROUTES from "../constants/routes";
import Loading from "../components/common/Loading";

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

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    fiscalID?: string;
    password?: string;
    confirmationPassword?: string;
  }>({});

  const { data: invalidFiscalID, loading: loading, error: error, execute: checkIfWorkshopExists } = useAxios<WorkshopExistsType>({
    url: `${ROUTES.workshops}/verify/${fiscalID.value}`,
    method: "GET",
    auto: false
  }, [fiscalID.value])

  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 10.360149,
    lng: -84.511006,
  });

  const handleRegisterClick = async () => {
    // Primero, validar el formulario
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      // Verificar si el Fiscal ID ya existe
      await checkIfWorkshopExists();

      // Después de la verificación, manejar la respuesta
      if (invalidFiscalID?.exists) {
        // Si isValid es true, significa que el Fiscal ID ya existe
        setErrors(prev => ({ ...prev, fiscalID: "El Fiscal ID ya está en uso." }));
      } else {
        // Si isValid es false, proceder con el registro
        // Aquí puedes agregar la lógica para registrar el taller
        console.log("Registro exitoso");
        // Por ejemplo, navegar a otra página
        navigate("/success"); // Asegúrate de tener una ruta para "/success"
      }
    } catch (err) {
      // Manejo de errores en la verificación
      console.error("Error al verificar el Fiscal ID:", err);
      alert("Ocurrió un error al verificar el Fiscal ID. Por favor, intenta nuevamente.");
    }
  };

  const handleGoBackClick = () => {
    navigate("/");
  }

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      fiscalID?: string;
      password?: string;
      confirmationPassword?: string;
    } = {};

    if (!name.value.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    if (!email.value.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        newErrors.email = "Formato de correo electrónico inválido.";
      }
    }

    if (!fiscalID.value.trim()) {
      newErrors.fiscalID = "El Fiscal ID es obligatorio.";
    }

    if (!password.value.trim()) {
      newErrors.password = "La contraseña es obligatoria.";
    }

    if (!confirmationPassword.value.trim()) {
      newErrors.confirmationPassword = "La confirmación de la contraseña es obligatoria.";
    } else if (password.value !== confirmationPassword.value) {
      newErrors.confirmationPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  console.log(errors)

  if (loading) {
    return (
      <Loading />
    )
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
