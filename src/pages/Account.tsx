import useLocalStorage from "../hooks/useLocalStorage"
import { useWorkshop } from "../contexts/WorkshopContext"
import CustomButton from "../components/common/CustomButton"
import WorkshopType from "../types/Workshop";
import { useNavigate } from "react-router-dom";

function Account() {
  const { clearStorage: clearWorkshopStorage } = useLocalStorage<WorkshopType | null>('workshop', null);
  const { clearWorkshop: clearWorkshopContext } = useWorkshop();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    clearWorkshopStorage();
    clearWorkshopContext();
    window.location.reload();
    navigate("/");
  }

  return (
    <div>
      <p>Account</p>
      <CustomButton text="Log Out" onClick={handleLogOutClick} />
    </div>
  )
}

export default Account;
