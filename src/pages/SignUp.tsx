import { useState, useEffect } from "react";
import GoogleMapsComponent from "../components/others/GoogleMapsComponent";

function SignUp() {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 10.360149,
    lng: -84.511006,
  });

  return (
    <div className="flex flex-col-reverse items-center justify-center w-11/12 h-full lg:w-10/12 lg:flex-row">
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
      <div className="flex flex-col items-center justify-center w-1/2 h-full">
        Form here
      </div>
    </div>
  )
}

export default SignUp;
