import { useTheme } from "../../contexts/ThemeContext";

interface CustomButtonProps<F extends (...args: any[]) => any> {
  onClick: F;
  text: string;
}

function CustomButton<F extends (...args: any[]) => any>({ onClick, text }: CustomButtonProps<F>) {
  const { isDarkMode } = useTheme();

  return (
    <button
      className={`flex items-center justify-center  py-2 px-3 rounded-xl transition-transform transform hover:scale-110
        ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} duration-150`}
      onClick={onClick}>
      {text}
    </button>
  )
}

export default CustomButton;
