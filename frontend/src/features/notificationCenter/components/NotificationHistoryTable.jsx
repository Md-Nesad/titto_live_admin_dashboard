import { LoaderCircle, Pen, Trash2 } from "lucide-react";
import TitleSubTitle from "../../../shared/components/TitleSubTitle";
// import useFetch from "../../hooks/useFetch";
// import { BASE_URL, formatOnlyDate } from "../../utility/utility";
// import Loading from "../Loading";
// import Error from "../Error";
// import { useEffect, useState } from "react";
// import Pagination from "../Pagination";
// import useDelete from "../../hooks/useDelete";
// import { useGlobalConfirm } from "../../context/ConfirmProvider";
// import { toast } from "react-toastify";

export default function NotificationHistoryTable() {
  return (
    <>
      <div className="py-4 bg-[#FFFFFF] border border-border_primary rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] w-full overflow-x-auto mb-10">
        <div className="pl-5 mt-1">
          <TitleSubTitle
            title="See Notification History"
            subtitle="View all previously sent notifications"
          />
        </div>
        <table className="w-full text-left border-collapse text-nowrap">
          <thead>
            <tr className="text-[#535353] text-md font-medium">
              <th className="p-3 pl-10">Notification ID</th>
              <th className="p-3">Category</th>
              <th className="p-3">Title</th>
              <th className="p-3">Recipient Type</th>
              <th className="p-3">Recipient ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md">
              <td className="p-3 pl-10 font-medium">67676</td>
              <td className="p-3 ">656 Notice</td>
              <td className="p-3">65456456</td>
              <td className="p-3">564565</td>
              <td className="p-3">56456456</td>
              <td className="p-3">dfasdfdf</td>
              <td className="p-3 mt-1.5 text-[#181717] text-sm font-medium cursor-pointer">
                <span className="flex items-center gap-4">
                  <button>
                    <Pen size={17} />
                  </button>

                  {/* <button onClick={() => handleDelete(notification._id)}>
                        {isLoading === notification._id ? (
                          <LoaderCircle size={17} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} className="text-[#FF0037]" />
                        )}
                      </button> */}

                  <button>
                    <Trash2 size={18} className="text-[#FF0037]" />
                  </button>
                </span>
              </td>
            </tr>
            {/* ))
            ) : (
              <tr className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md">
                <td colSpan={9} className="p-3 text-center">
                  No notifications found.
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
        {/* <Pagination
          page={pagination?.page}
          limit={pagination?.limit}
          total={pagination?.total}
          onPageChange={setPage}
        /> */}
      </div>
    </>
  );
}
