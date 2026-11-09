import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TitleSubTitle from "../../../shared/components/TitleSubTitle";
import useAgencies from "../../../hooks/useAgencies";
import Skeleton from "../../../shared/components/loading/Skeleton";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function UpdateAgencyDetails() {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const [isTempOn, setIsTempOn] = useState(null);
  const [isPerOn, setIsPerOn] = useState(null);
  const [files, setFiles] = useState({});
  const { agencyQuery, countriesQuery, updateMutation } = useAgencies({
    agencyId,
    includeAgencies: false,
    includeCountries: true,
  });
  const agency = agencyQuery.data;
  const countries = countriesQuery.data ?? [];
  const inputClassName =
    "w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm";

  const handleFileChange = (event) => {
    setFiles((current) => ({
      ...current,
      [event.target.name]: event.target.files?.[0] ?? null,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateMutation.mutate(
      {
        agencyId,
        payload: {
          agencyName: formData.get("agencyName"),
          type: formData.get("type"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          country: formData.get("country"),
          documentType: formData.get("documentType"),
          status: formData.get("status"),
          temporaryBan: isTempOn ?? agency.temporaryBan ?? false,
          permanentBan: isPerOn ?? agency.permanentBan ?? false,
          ...files,
        },
      },
      { onSuccess: () => navigate("/dashboard/agencies") },
    );
  };

  return (
    <>
      <TitleSubTitle
        title="Update Agency Details"
        subtitle="Modify the details of the selected agency"
      />

      {agencyQuery.isPending && (
        <div
          role="status"
          aria-label="Loading agency details"
          className="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-white p-5 sm:grid-cols-2 sm:p-8"
        >
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      )}

      {agencyQuery.isError && (
        <div role="alert" className="mb-10 rounded-xl bg-white p-5 text-sm text-red-600">
          Unable to load agency: {getErrorMessage(agencyQuery.error)}{" "}
          <button
            type="button"
            onClick={() => agencyQuery.refetch()}
            disabled={agencyQuery.isFetching}
            className="underline disabled:opacity-60"
          >
            {agencyQuery.isFetching ? "Retrying..." : "Retry"}
          </button>
        </div>
      )}

      {!agencyQuery.isPending &&
        !agencyQuery.isError &&
        !agency && (
          <p className="mb-10 rounded-xl bg-white p-5 text-sm text-gray-600">
            Agency not found.
          </p>
        )}

      {agency && (
        <div className="w-full flex justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] mb-10">
          <div className="w-full bg-white rounded-xl py-5 sm:py-8 px-3 sm:px-8 border border-gray-100">
            <form
              id="update-agency-form"
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
            >
              <label>
                Agency Type
                <div className="relative mt-1">
                  <select
                    name="type"
                    defaultValue={agency.type}
                    required
                    className={inputClassName}
                  >
                    <option value="host">Host</option>
                    <option value="coin">Coin</option>
                    <option value="master">Master</option>
                    <option value="admin">Admin</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </label>

              <label>
                Agency Name
                <input
                  name="agencyName"
                  defaultValue={agency.agencyName}
                  required
                  className={inputClassName}
                />
              </label>

              <label>
                Agency ID
                <input
                  value={agency.agencyId ?? ""}
                  readOnly
                  className={`${inputClassName} bg-gray-50 text-gray-500`}
                />
              </label>

              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  defaultValue={agency.email}
                  required
                  className={inputClassName}
                />
              </label>

              <label>
                Phone Number
                <input
                  name="phone"
                  defaultValue={agency.phone}
                  required
                  className={inputClassName}
                />
              </label>

              <label>
                Country
                <div className="relative">
                  <select
                    name="country"
                    defaultValue={
                      typeof agency.country === "object"
                        ? agency.country?._id
                        : agency.country
                    }
                    required
                    disabled={countriesQuery.isPending || countries.length === 0}
                    className={`${inputClassName} appearance-none`}
                  >
                    <option value="">Select</option>
                    {countries.map((country) => (
                      <option key={country._id} value={country._id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3 text-gray-400" />
                </div>
                {countriesQuery.isPending && (
                  <span className="mt-1 block text-xs text-gray-500">
                    Loading countries...
                  </span>
                )}
                {countriesQuery.isError && (
                  <span role="alert" className="mt-1 block text-xs text-red-600">
                    Unable to load countries:{" "}
                    {getErrorMessage(countriesQuery.error)}{" "}
                    <button
                      type="button"
                      onClick={() => countriesQuery.refetch()}
                      className="underline"
                    >
                      Retry
                    </button>
                  </span>
                )}
              </label>

              <label>
                Document Type
                <div className="relative">
                  <select
                    name="documentType"
                    defaultValue={agency.documentType}
                    required
                    className={inputClassName}
                  >
                    <option value="NID">NID</option>
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </label>

              <label>
                Status
                <div className="relative">
                  <select
                    name="status"
                    defaultValue={agency.status}
                    required
                    className={inputClassName}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </label>

              <div className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2">
                <span className="text-sm">Temporary Ban</span>
                <input
                  type="checkbox"
                  checked={isTempOn ?? agency.temporaryBan ?? false}
                  onChange={(event) => {
                    setIsTempOn(event.target.checked);
                    if (event.target.checked) setIsPerOn(false);
                  }}
                  className="h-4 w-4 accent-pink-500"
                />
              </div>

              <div className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2">
                <span className="text-sm">Permanent Ban</span>
                <input
                  type="checkbox"
                  checked={isPerOn ?? agency.permanentBan ?? false}
                  onChange={(event) => {
                    setIsPerOn(event.target.checked);
                    if (event.target.checked) setIsTempOn(false);
                  }}
                  className="h-4 w-4 accent-pink-500"
                />
              </div>
            </form>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["nidFront", "NID Front", agency.nidFront],
                ["nidBack", "NID Back", agency.nidBack],
                ["profilePic", "Profile Pic", agency.profilePic],
              ].map(([name, label, currentImage]) => (
                <label key={name} className="block text-sm font-medium">
                  {label}
                  {currentImage && (
                    <a
                      href={currentImage}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 text-blue-700 underline"
                    >
                      View current
                    </a>
                  )}
                  <div className="relative mt-1 w-full cursor-pointer">
                    <input
                      name={name}
                      type="file"
                      accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <div className="flex items-center gap-3 rounded-md border border-gray-300 px-3 text-sm">
                      <span className="py-2 font-medium text-[#686868A6]">
                        Choose File
                      </span>
                      <span className="h-7 w-px bg-gray-300" />
                      <span className="truncate font-medium text-[#686868A6]">
                        {files[name]?.name ?? "No file chosen"}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {countriesQuery.isError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                Country data could not be loaded; retry before saving.
              </p>
            )}
            {updateMutation.isError && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                Unable to update agency: {getErrorMessage(updateMutation.error)}
              </p>
            )}

            <div className="flex justify-center sm:justify-end mt-8 gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-8 py-1 border border-gray-300 rounded-md text-[#181717]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="update-agency-form"
                disabled={
                  updateMutation.isPending ||
                  countriesQuery.isPending ||
                  countriesQuery.isError
                }
                className="px-10 py-1 rounded-md text-white text-sm font-medium bg-secondary hover:bg-primary transition-all duration-300 ease-in-out disabled:opacity-60"
              >
                {updateMutation.isPending ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
