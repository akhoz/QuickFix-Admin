interface CustomButtonProps<F extends (...args: any[]) => any> {
  onClick: F;
  text: string;
}

function CustomButton<F extends (...args: any[]) => any>({ onClick, text }: CustomButtonProps<F>) {
  return (
    <button
      className="flex items-center justify-center bg-black text-white py-2 px-3 rounded-xl transition-transform transform hover:scale-110"
      onClick={onClick}>
      {text}
    </button>
  )
}

export default CustomButton;
