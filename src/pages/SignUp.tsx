import Map from "../components/others/Map";

function SignUp() {
  return (
    <div className="flex flex-row items-center justify-center w-10/12 h-full">
      <div className="flex flex-col items-center justify-center w-1/2 h-full">
        <div className="w-full h-1/2 rounded-full">
          <Map />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-full">
        Form here
      </div>
    </div>
  )
}

export default SignUp;
