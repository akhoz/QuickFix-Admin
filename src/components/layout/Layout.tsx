import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../../contexts/ThemeContext';

const Layout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`relative flex items-center justify-center w-screen h-screen
            ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'}`}>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout;
