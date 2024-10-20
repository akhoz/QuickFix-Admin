import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative flex items-center justify-center w-screen h-full
            ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'} duration-150`}>
      <Navbar />
      <div className="flex items-center justify-center w-full h-full mt-40 mb-20">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;
