import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../common/CustomButton';
import useAxios from '../../hooks/useAxios';
import ROUTES from '../../constants/routes';
import ActionModal from '../common/ActionModal';
import { useState } from 'react';
import { BiSolidError } from "react-icons/bi";

interface RepairRequestProps {
  requestId: string,
  clientCedula: number,
  description: string
}

function RepairRequest({ requestId, clientCedula, description }: RepairRequestProps) {
  const { isDarkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const { execute: declineRequest } = useAxios({
    url: `${ROUTES.requests}/${requestId}`,
    method: "PUT",
    auto: false
  }, [requestId])

  const handleAcceptClick = () => {
    console.log("Request Accepted");
  }

  const handleDeclineClick = () => {
    setShowModal(true);
  }

  const handleConfirmClick = async () => {
    try {
      await declineRequest({ data: { status: "declined" } });
      window.location.reload();
      console.log("Request Declined");
    } catch (error) {
      console.error("Error declining a request: ", error);
    }
  }

  return (
    <>
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
      {showModal && (
        <ActionModal
          title="Decline repair request"
          description="Are you sure you want to decline this request? This action can not be undone"
          Icon={BiSolidError}
          buttonText="Confirm"
          onClickButton={handleConfirmClick}
          onClose={() => { setShowModal(false) }}
        />
      )}

    </>
  )
}

export default RepairRequest;
