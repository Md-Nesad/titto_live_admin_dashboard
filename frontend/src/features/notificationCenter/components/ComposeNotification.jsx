import React, { useState } from "react";
// import Notification from "../../assests/Notification";
import { ChevronDown, Eye, RotateCw, Send } from "lucide-react";
// import useFetch from "../../hooks/useFetch";
// import { BASE_URL } from "../../utility/utility";
// import useJsonPost from "../../hooks/useJsonPost";
// import { toast } from "react-toastify";

export default function ComposeNotification({ setRefresh }) {
  //   const [targetType, setTargetType] = useState("");
  //   const [targetIds, setTargetIds] = useState([]);
  //   const [category, setCategory] = useState("");
  //   const [title, setTitle] = useState("");
  //   const [message, setMessage] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const handleSubmit = useJsonPost(`${BASE_URL}/admin/notification-center`);

  //   const data = {
  //     targetType,
  //     targetIds,
  //     category,
  //     title,
  //     message,
  //   };

  //   const reset = () => {
  //     setTargetType("");
  //     setTargetIds([]);
  //     setCategory("");
  //     setTitle("");
  //     setMessage("");
  //   };

  //get users list
  //   const { data: userList } = useFetch(
  //     `${BASE_URL}/admin/users?page=1&limit=100&search=&status=&type=`,
  //   );
  //   const users = userList?.users || [];

  //get agencies list
  //   const { data: agencyList } = useFetch(
  //     `${BASE_URL}/admin/agencies?page=1&limit=100&search=&status=&type=`,
  //   );
  //   const agencies = agencyList?.agencies || [];

  //   const handleRadioChange = (type) => {
  //     setTargetType(type);
  //     setTargetIds([]);
  //   };

  //   const handleCheckboxChange = (id, checked) => {
  //     if (checked) {
  //       setTargetIds((prev) => [...prev, id]);
  //     } else {
  //       setTargetIds((prev) => prev.filter((item) => item !== id));
  //     }
  //   };

  //handle submit
  //   const handleNotificationSend = async () => {
  //     if (!targetType || !category || !title || !message) {
  //       return toast.error(
  //         "Recipient type, category, title and message are required",
  //       );
  //     }
  //     setLoading(true);
  //     const result = await handleSubmit(data);
  //     setLoading(false);
  //     toast.success(result.message);
  //     setRefresh((prev) => !prev);
  //   };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
        {/* Left Panel */}
        <div className="bg-white border border-border_primary rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-5">
          <h3 className="text-xl font-semibold mb-1">Select Recipients</h3>
          <p className="text-sm text-gray-500 mb-3">
            Choose who will receive this notification
          </p>

          <div className="space-y-5">
            {/* Recipient Type */}
            <div>
              <p className="text-lg font-medium mb-3">Recipient Type</p>

              <div className="space-y-2">
                {[
                  { label: "Individual User", value: "user" },
                  { label: "Individual Agency", value: "agency" },
                  { label: "Master Agency", value: "master_agency" },
                ].map((item) => (
                  <label
                    key={item.value}
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="recipient"
                      //   checked={targetType === item.value}
                      //   onChange={() => handleRadioChange(item.value)}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <hr className="text-[#0000001C]" />

            {/* Broadcast Options */}
            <div className="space-y-2">
              {[
                { label: "All Users", value: "all_users" },
                { label: "All Agencies", value: "all_agencies" },
                { label: "Broadcast to Entire App", value: "broadcast" },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2 font-medium text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    name="recipient"
                    // checked={targetType === item.value}
                    // onChange={() => handleRadioChange(item.value)}
                  />
                  {item.label}
                </label>
              ))}
            </div>

            {/* Individual User List */}
            {/* {targetType === "user" && (
              <div className="border rounded-md py-2 px-3 space-y-1.5 h-35 overflow-y-scroll">
                {users.map((user) => (
                  <label
                    key={user._id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      className="cursor-pointer"
                      type="checkbox"
                      checked={targetIds.includes(user._id)}
                      onChange={(e) =>
                        handleCheckboxChange(user._id, e.target.checked)
                      }
                    />
                    {user.name}
                  </label>
                ))}
              </div>
            )} */}

            {/* Individual / Master Agency List */}
            {/* {targetType === "agency" && (
              <div className="border rounded-md py-2 px-3 space-y-1.5  h-35 overflow-y-scroll">
                {agencies.map((agency) => (
                  <label
                    key={agency._id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={targetIds.includes(agency._id)}
                      onChange={(e) =>
                        handleCheckboxChange(agency._id, e.target.checked)
                      }
                    />
                    {agency.name}
                  </label>
                ))}
              </div>
            )} */}

            {/* Broadcast Info */}
            {/* {targetType === "broadcast" && (
              <div className="bg-[#E6E6E6] text-center text-sm py-3 mt-10 rounded-md font-medium">
                This notification will be{" "}
                <span className="font-semibold">BROADCAST TO ENTIRE APP</span>
              </div>
            )} */}
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white border border-border_primary rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-5 relative">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold">Compose Notification</h3>
              <p className="text-sm text-gray-500 mb-4">
                Create your notification message
              </p>
            </div>
            {/* <button className="bg-red-500 hover:bg-red-700 hover:transition hover:duration-300 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <Notification /> Set Automatic Notification
            </button> */}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">
                Notification Category
              </label>
              <div className="relative">
                <select
                  //   value={category}
                  //   onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 text-gray-800 font-medium"
                >
                  <option>Select Notification Category</option>
                  <option value="warning">Warning</option>
                  <option value="system">System</option>
                  <option value="promotion">Promotion</option>
                  <option value="update">Update</option>
                  <option value="security">Security</option>
                </select>
                <ChevronDown className="absolute top-3 right-4 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title..."
                className="mt-1 w-full border border-[#D6D6D6] rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                // value={message}
                // onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
                rows={5}
                className="mt-1 w-full border border-[#D6D6D6] rounded-md px-3 py-2 text-sm"
              />
            </div>

            {/* <div>
              <label className="text-sm font-medium">
                Attachment (Optional)
              </label>
              <div className="mt-1 flex items-center border rounded-md overflow-hidden">
                <button className="bg-gray-200 px-4 py-2 text-sm font-medium">
                  Choose File
                </button>
                <span className="px-3 text-sm text-gray-500">
                  No chosen file
                </span>
              </div>
            </div> */}

            <div className="flex items-center gap-5 pt-2">
              <button
                type="button"
                // onClick={handleNotificationSend}
                className="flex items-center gap-3 px-4 py-2 btn_gradient"
              >
                <Send size={18} />{" "}
                {/* {loading ? "Sending..." : "Send Notification"} */}
              </button>
              {/* <button className="flex items-center gap-2 text-[#FFFFFF] bg-[#CFCFCF] px-4 py-2 border rounded border-[#8D8D8D]">
                <Eye size={20} /> Preview
              </button> */}
              <button
                type="button"
                //onClick={reset}
                className="flex items-center btn_white py-2 px-6 rounded-md gap-2 text-md font-semibold text-gray-800"
              >
                <RotateCw size={20} /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
