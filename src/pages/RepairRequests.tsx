import ROUTES from "../constants/routes";
import RepairRequestType from "../types/RepairRequest";
import useAxios from "../hooks/useAxios";
import { useState, useEffect } from "react";
import Loading from "../components/common/Loading";
import RepairRequest from "../components/requests/RepairRequest";
import { useTheme } from "../contexts/ThemeContext";

function RepairRequests() {
  const { isDarkMode } = useTheme();
  const {
    data: repairRequests,
    loading: repairRequestsLoading } =
    useAxios<RepairRequestType[]>({
      url: `${ROUTES.workshops}/repair-requests/212323R`,
      method: "GET",
      auto: true
    }, []);

  const [filteredRequests, setFilteredRequests] = useState<RepairRequestType[]>([]);

  useEffect(() => {
    if (repairRequests) {
      const receivedRequests = repairRequests.filter(request => request.status === "accepted");
      setFilteredRequests(receivedRequests);
    }
  }, [repairRequests]);

  if (repairRequestsLoading) {
    return (
      <Loading />
    )
  }
  return (
    <div className={`grid grid-cols-1 w-full h-full items-center justify-center md:grid-cols-2 md:gap-2
      ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'}`}>
      {filteredRequests?.map((request) => (
        <RepairRequest
          key={request._id}
          clientCedula={request.clientCedula}
          description={request.description}
        />
      ))}
    </div>
  )
}

export default RepairRequests;
