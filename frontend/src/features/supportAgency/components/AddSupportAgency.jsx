import { useNavigate } from "react-router-dom";
import useSupport from "../../../hooks/useSupport";
import { useState } from "react";

const initialFormData = {
  name: "",
  gender: "",
  phone: "",
  location: "",
  status: "active",
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function AddSupportAgencyForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);

  // Fetch countries and create support agency mutation
  const { countriesQuery, createMutation } = useSupport({
    includeCountries: true,
  });

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMutation.mutate(formData, {
      onSuccess: () => navigate("/dashboard/support-agency"),
    });
  };

  // Get countries data or default to an empty array
  const countries = countriesQuery.data ?? [];
  const inputClassName =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm";

  return (
    <div className="mb-10 flex w-full justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
      <div className="w-full rounded-xl border border-gray-100 bg-white px-3 py-5 sm:px-8 sm:py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <label className="text-sm font-medium">
              Agency Name
              <input
                type="text"
                name="name"
                placeholder="Enter agency name"
                value={formData.name}
                onChange={handleChange}
                minLength={2}
                required
                className={inputClassName}
              />
            </label>

            <label className="text-sm font-medium">
              Phone
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </label>

            <label className="text-sm font-medium">
              Gender
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className={inputClassName}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>

            <label className="text-sm font-medium">
              Location
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                disabled={countriesQuery.isPending || countries.length === 0}
                className={inputClassName}
              >
                <option value="">Select location</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {countriesQuery.isPending && (
                <span className="mt-1 block text-xs text-gray-500">
                  Loading locations...
                </span>
              )}
              {countriesQuery.isError && (
                <span role="alert" className="mt-1 block text-xs text-red-600">
                  Unable to load locations:{" "}
                  {getErrorMessage(countriesQuery.error)}
                </span>
              )}
              {!countriesQuery.isPending &&
                !countriesQuery.isError &&
                countries.length === 0 && (
                  <span className="mt-1 block text-xs text-red-600">
                    No locations are available.
                  </span>
                )}
            </label>

            <label className="text-sm font-medium">
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </label>
          </div>

          {createMutation.isError && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              Unable to create support agency:{" "}
              {getErrorMessage(createMutation.error)}
            </p>
          )}

          <div className="mt-8 flex justify-center gap-4 sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard/support-agency")}
              className="rounded-md border border-gray-300 px-8 py-1 text-[#181717]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                createMutation.isPending ||
                countriesQuery.isPending ||
                countries.length === 0
              }
              className="rounded-md bg-secondary px-10 py-1 text-sm font-medium text-white transition-colors duration-100 hover:bg-primary disabled:opacity-60"
            >
              {createMutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
