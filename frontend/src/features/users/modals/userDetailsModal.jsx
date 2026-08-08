export default function UserDetailsModal({ open, onClose, user }) {
  if (!open) return null;
  //download function
  //   const downloadImage = async (url, filename = "image.jpg") => {
  //     try {
  //       const res = await fetch(url, { mode: "cors" });
  //       const blob = await res.blob();

  //       const blobUrl = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");

  //       a.href = blobUrl;
  //       a.download = filename;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();

  //       window.URL.revokeObjectURL(blobUrl);
  //     } catch (err) {
  //       console.error("Download failed", err);
  //     }
  //   };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FDFDFD] w-full max-w-md rounded-xl shadow-lg sm:px-6 sm:py-4 p-4 relative animatefadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-md sm:text-xl"
        >
          ✕
        </button>

        {/* Name */}
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          user Details
        </h2>

        {/* Rows */}
        <div className="space-y-2 text-sm sm:text-lg">
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">user Name :</p>
            <p className="text-gray-800">{user?.name}</p>
          </div>
          {/* ID */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">user ID :</p>
            <p className="text-gray-800">{user?.displayId}</p>
          </div>

          {/* User */}
          {/* <div className="flex justify-between items-center">
            <p className="font-medium text-gray-700">Name :</p>
            <div className="flex items-center gap-3">
              <img
                src={user?.profilePic}
                className="sm:w-10 w-7 h-7 sm:h-10 rounded-full object-cover"
                fetchPriority="true"
              />
              <p className="text-gray-800">{user?.name}</p>
            </div>
          </div> */}

          {/* Country */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Country :</p>
            <p className="text-gray-800">Bangladesh</p>
          </div>

          {/* Phone Number */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Phone Number :</p>
            <p className="text-gray-800">{user?.phone}</p>
          </div>

          {/* Coin Balance */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Email :</p>
            <p className="text-gray-800">{user?.email}</p>
          </div>

          {/* Coin Spend */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">WhatsApp :</p>
            <p className="text-gray-800">{user?.whatsapp}</p>
          </div>

          {/* Earning Balance */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Type :</p>
            <p className="text-gray-800">{user?.type}</p>
          </div>

          {/* Total Earning */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Balance :</p>
            <p className="text-gray-800">78787</p>
          </div>

          {/* Video Live Time */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Diamonds :</p>
            <p className="text-gray-800">8787</p>
          </div>

          {/* Video Live Time */}
          {/* <div className="flex justify-between">
            <p className="font-medium text-gray-700">Status :</p>
            <span
              className={`px-3 py-1 text-sm block text-center ${
                user.status === "active" && !user.ban.isTemporary
                  ? "bg-linear-to-r from-[#79D49B] to-[#25C962]"
                  : "bg-[#FF929296] text-[#D22B20]"
              } text-[#005D23] rounded-full font-semibold`}
            >
              {user.ban.isTemporary ? "Temp. ban" : user.status}
            </span>
          </div> */}

          {/* Audio Live Time */}
          <div className="flex justify-between">
            <p className="font-medium text-gray-700">Document Type :</p>
            <p className="text-gray-800">{user?.documentType}</p>
          </div>

          {/* Registration Time */}
          {/* <div className="flex justify-between">
            <p className="font-medium text-gray-700">Registration Time :</p>
            <p className="text-gray-800">{formatOnlyDate(user?.createdAt)}</p>
          </div> */}

          {/* <div className="flex items-center justify-between gap-4 mx-5 pt-3">
            <div className="flex flex-col gap-1.5 items-center">
              <img
                src={user?.profilePic}
                alt="user profile"
                className="w-32 h-23 rounded-sm object-contain blur-xs hover:blur-none cursor-pointer"
                loading="lazy"
                onClick={() =>
                  downloadImage(
                    user?.profilePic,
                    `${user?.name}-profile.jpg`,
                  )
                }
              />
              <span className="text-sm">Profile</span>
            </div>

            <div className="flex flex-col gap-1.5 items-center">
              <img
                src={user?.documentFrontURL}
                alt="Document Front"
                className="w-32 h-23 rounded-sm object-contain blur-xs hover:blur-none cursor-pointer"
                loading="lazy"
                onClick={() =>
                  downloadImage(
                    user?.documentFrontURL,
                    `${user?.name}-front.jpg`,
                  )
                }
              />
              <span className="text-sm">Doc. Front</span>
            </div>

            <div className="flex flex-col gap-1.5 items-center">
              <img
                src={user?.documentBackURL}
                alt="Document Back"
                className="w-32 h-23 rounded-sm object-contain blur-xs hover:blur-none cursor-pointer"
                loading="lazy"
                onClick={() =>
                  downloadImage(
                    user?.documentBackURL,
                    `${user?.name}-back.jpg`,
                  )
                }
              />
              <span className="text-sm">Doc. Back</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
