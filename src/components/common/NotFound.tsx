import { FaCarCrash } from "react-icons/fa";

interface NotFoundProps {
  text: string
}

function NotFound({ text }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-40">
      <FaCarCrash className="text-9xl" />
      <p>
        {text}
      </p>
    </div>
  )
}

export default NotFound;
