import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import ROUTES from "../constants/routes";
import RepairRequestType from "../types/RepairRequest";
import useAxios from "../hooks/useAxios";
import Loading from "../components/common/Loading";
import RepairRequest from "../components/requests/RepairRequest";
import { useTheme } from "../contexts/ThemeContext";
import { useWorkshop } from "../contexts/WorkshopContext";
import NotFound from "../components/common/NotFound";

function RepairRequests() {
  const { isDarkMode } = useTheme();
  const { workshop: workshop } = useWorkshop();
  const [filteredRequests, setFilteredRequests] = useState<RepairRequestType[]>([]);
  const [currentItems, setCurrentItems] = useState<RepairRequestType[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const {
    data: repairRequests,
    loading: repairRequestsLoading,
    error: noRequestsFound,
    execute: getRepairRequests
  } = useAxios<RepairRequestType[]>({
    url: `${ROUTES.workshops}/repair-requests/${workshop?.fiscalID}`,
    method: "GET",
    auto: false
  }, []);

  useEffect(() => {
    getRepairRequests();
  }, [workshop])

  useEffect(() => {
    if (repairRequests) {
      const receivedRequests = repairRequests.filter(request => request.status === "received");
      setFilteredRequests(receivedRequests);
    }
  }, [repairRequests]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredRequests.slice(itemOffset, endOffset));
  }, [itemOffset, filteredRequests]);

  const pageCount = Math.ceil(filteredRequests.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredRequests.length;
    setItemOffset(newOffset);
  };

  if (repairRequestsLoading) {
    return <Loading />;
  }

  if (noRequestsFound) {
    return (
      <NotFound text="No repair requests found" />
    )
  }

  return (
    <div className={`flex flex-col items-center w-full h-full space-y-10 ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-black'} duration-150`}>
      <div className="grid grid-cols-1 w-2/3 h-full place-items-center gap-2 md:grid-cols-2 lg:w-1/2" data-aos="zoom-in">
        {currentItems.map((request) => (
          <RepairRequest
            key={request._id}
            requestId={request._id}
            clientCedula={request.clientCedula}
            clientName={request.clientName}
            description={request.description}
          />
        ))}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="->"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<-"
        renderOnZeroPageCount={null}
        containerClassName="flex mt-4 space-x-2"
        activeClassName="font-bold"
        pageLinkClassName="px-2 py-1 border rounded"
        previousLinkClassName="px-2 py-1 border rounded"
        nextLinkClassName="px-2 py-1 border rounded"
        breakLinkClassName="px-2 py-1 border rounded"
      />
    </div>
  );
}

export default RepairRequests;

