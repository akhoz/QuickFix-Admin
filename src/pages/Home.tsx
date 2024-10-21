import { useTheme } from "../contexts/ThemeContext";
import { useWorkshop } from "../contexts/WorkshopContext";

function Home() {
  const { isDarkMode } = useTheme();
  const { workshop: workshop } = useWorkshop();

  return (
    <div className={`flex flex-col items-center w-full h-full space-y-10 ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'} duration-150`}>
      <p>
        {workshop?.name}
      </p>
      <p>
        {workshop?.fiscalID}
      </p>
      <p>
        {workshop?.email}
      </p>
    </div>
  )
}

export default Home;
