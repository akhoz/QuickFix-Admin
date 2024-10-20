import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../common/CustomButton';
import useAxios from '../../hooks/useAxios';
import ROUTES from '../../constants/routes';

interface RepairRequestProps {
  requestId: string,
  clientCedula: number,
  description: string
}

function RepairRequest({ requestId, clientCedula, description }: RepairRequestProps) {
  const { isDarkMode } = useTheme();

  const { execute: declineRequest } = useAxios({
    url: `${ROUTES.requests}/${requestId}`,
    method: "PUT",
    auto: false
  }, [requestId])

  const handleAcceptClick = () => {
    console.log("Request Accepted");
  }

  const handleDeclineClick = async () => {
    try {
      await declineRequest({ data: { status: "declined" } })
      console.log("Request Declined");
    } catch (error) {
      console.error("Error declining a request: ", error);
    }
  }

  return (
    <div className={`flex flex-col items-start justify-center rounded-lg overflow-hidden p-3 space-y-5 w-full
      ${isDarkMode ? 'bg-zinc-900 text-white' : 'bg-gray-200 text-black'}`}>
      <div className="flex flex-col items-start justify-center">
        <p className="font-bold text-lg">
          {clientCedula}
        </p>
        <p>
          {description}
        </p>
      </div>
      <div className="flex items-center justify-start space-x-5">
        <CustomButton text="Accept" onClick={handleAcceptClick} />
        <CustomButton text="Decline" onClick={handleDeclineClick} />
      </div>
    </div>
  )
}

export default RepairRequest;
