import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAgencies from "../../../hooks/useAgencies";

const initialFormData = {
  agencyName: "",
  type: "",
  email: "",
  phone: "",
  country: "",
  documentType: "",
  nidFront: null,
  nidBack: null,
  profilePic: null,
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function AddAgencyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const { countriesQuery, createMutation } = useAgencies({
    includeCountries: true,
  });
  const countries = countriesQuery.data ?? [];
  const inputClassName =
    "w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm";

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => navigate("/dashboard/agencies"),
    });
  };

  const fileInput = (name, label) => (
    <label className="block">
      {label}
      <div className="relative mt-1 w-full cursor-pointer">
        <input
          name={name}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={handleChange}
          required
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <div className="flex items-center gap-3 rounded-md border border-gray-300 px-3 text-sm">
          <span className="py-2 font-medium text-[#686868A6]">Choose File</span>
          <span className="h-7 w-px bg-gray-300" />
          <span className="truncate font-medium text-[#686868A6]">
            {formData[name]?.name ?? "No file chosen"}
          </span>
        </div>
      </div>
    </label>
  );

  return (
    <div className="w-full flex justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] mb-10 border-border_primary">
      <div className="w-full bg-white rounded-xl py-5 sm:py-8 px-3 sm:px-7 border border-border_primary">
        <form
          id="add-agency-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <label>
            Agency Type
            <div className="relative mt-1">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className={inputClassName}
              >
                <option value="">Select</option>
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
              type="text"
              value={formData.agencyName}
              onChange={handleChange}
              placeholder="StreamDoing Agency"
              required
              className={inputClassName}
            />
          </label>

          <label>
            Agency ID
            <input
              type="text"
              value="Assigned automatically"
              readOnly
              className={`${inputClassName} bg-gray-50 text-gray-500`}
            />
          </label>

          <label>
            E-mail
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jon.doe@example.com"
              required
              className={inputClassName}
            />
          </label>

          <label>
            Phone Number
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (737)-123-3265"
              required
              className={inputClassName}
            />
          </label>

          <label>
            Country
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
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
                Unable to load countries: {getErrorMessage(countriesQuery.error)}
              </span>
            )}
            {!countriesQuery.isPending &&
              !countriesQuery.isError &&
              countries.length === 0 && (
                <span className="mt-1 block text-xs text-red-600">
                  No countries are available.
                </span>
              )}
          </label>

          <label>
            Document Type
            <div className="relative">
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                required
                className={inputClassName}
              >
                <option value="">Select</option>
                <option value="NID">NID</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </label>

          {fileInput("nidFront", "NID Front")}
          {fileInput("nidBack", "NID Back")}
          {fileInput("profilePic", "Profile Pic")}
        </form>

        {createMutation.isError && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            Unable to create agency: {getErrorMessage(createMutation.error)}
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
            form="add-agency-form"
            disabled={
              createMutation.isPending ||
              countriesQuery.isPending ||
              countries.length === 0
            }
            className="px-10 py-1 rounded-md text-white text-sm font-medium bg-secondary hover:bg-primary transition-colors disabled:opacity-60"
          >
            {createMutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
