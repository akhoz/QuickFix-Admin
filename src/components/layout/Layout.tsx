import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout;
