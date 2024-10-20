import { IconType } from 'react-icons';
import { IoMdClose } from "react-icons/io";
import CustomButton from './CustomButton';

interface ModalProps<F extends (...args: any[]) => any> {
  title: string;
  description: string;
  Icon: IconType;
  buttonText: string;
  onClickButton: F;
  onClose: () => void;
}

function ActionModal<F extends (...args: any[]) => any>({ title, description, Icon, buttonText, onClickButton, onClose }: ModalProps<F>) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 w-screen h-screen">
      <div className="relative flex flex-col items-center justify-center bg-white w-2/3 py-5 rounded-xl overflow-hidden md:w-1/2 lg:w-1/3">
        <Icon className="text-3xl" />
        <div className="flex flex-col items-center justify-center text-center my-5">
          <p className="font-bold text-lg">
            {title}
          </p>
          <p className="w-3/4">
            {description}
          </p>
        </div>
        <CustomButton onClick={onClickButton} text={buttonText} />
        <IoMdClose
          className="absolute cursor-pointer right-5 top-5 transition-transform transform hover:scale-110"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default ActionModal;
