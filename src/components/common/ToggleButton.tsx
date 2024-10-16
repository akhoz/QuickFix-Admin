import React, { useState } from 'react';

interface ToggleButtonProps {
  onClick: () => void;
  activeImage: string;
  inactiveImage: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick, activeImage, inactiveImage }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <div onClick={handleClick} className="w-12 h-6 flex items-center bg-gray-300 rounded-full cursor-pointer">
      <div
        className={`w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isActive ? 'translate-x-6' : ''
          }`}
      >
        <img src={isActive ? activeImage : inactiveImage} alt="Toggle Icon" className="w-full h-full rounded-full" />
      </div>
    </div>
  );
};

export default ToggleButton;
