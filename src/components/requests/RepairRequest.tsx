import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../common/CustomButton';

interface RepairRequestProps {
  clientCedula: number,
  description: string
}

function RepairRequest({ clientCedula, description }: RepairRequestProps) {
  const { isDarkMode } = useTheme();

  const handleAcceptClick = () => {
    console.log("Request Accepted");
  }

  const handleDeclineClick = () => {
    console.log("Request Declined");
  }

  return (
    <div
      className={`flex flex-col items-start justify-center rounded-lg overflow-hidden p-3 space-y-5 w-1/2
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
