import { useTheme } from "../contexts/ThemeContext";

function Home() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex flex-col items-center w-full h-full space-y-10 ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'} duration-150`}>
      Home Page
    </div>
  )
}

export default Home;
