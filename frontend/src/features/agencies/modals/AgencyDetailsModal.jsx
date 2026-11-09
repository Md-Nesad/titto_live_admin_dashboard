export default function AgencyDetailsModal({ open, onClose, agency }) {
  if (!open) return null;

  const country =
    typeof agency?.country === "object"
      ? agency.country?.name
      : agency?.country;
  const details = [
    ["Agency Name", agency?.agencyName],
    ["Agency ID", agency?.agencyId],
    ["Country", country],
    ["Phone Number", agency?.phone],
    ["Email", agency?.email],
    ["Type", agency?.type],
    ["Status", agency?.status],
    ["Coin Buy", agency?.coinBuy ?? 0],
    ["Beans", agency?.beans ?? 0],
    ["Document Type", agency?.documentType],
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FDFDFD] w-full max-w-md rounded-xl shadow-lg sm:px-6 sm:py-4 p-4 relative animatefadeIn">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close agency details"
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-md sm:text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Agency Details
        </h2>

        <div className="space-y-2 text-sm sm:text-base">
          {details.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <p className="font-medium text-gray-700">{label}:</p>
              <p className="break-all text-right text-gray-800">
                {value ?? "—"}
              </p>
            </div>
          ))}
        </div>

        {(agency?.profilePic || agency?.nidFront || agency?.nidBack) && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            {[
              ["Profile", agency.profilePic],
              ["NID Front", agency.nidFront],
              ["NID Back", agency.nidBack],
            ]
              .filter(([, image]) => image)
              .map(([label, image]) => (
                <a
                  key={label}
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1 text-xs text-gray-600"
                >
                  <img
                    src={image}
                    alt={label}
                    className="h-20 w-24 rounded-md object-cover"
                  />
                  {label}
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
