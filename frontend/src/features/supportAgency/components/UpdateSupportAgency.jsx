import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TitleSubTitle from "../../../shared/components/TitleSubTitle";
import useSupport from "../../../hooks/useSupport";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function UpdateSupportAgencyForm() {
  const { supportId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const { agenciesQuery, countriesQuery, updateMutation } = useSupport({
    includeCountries: true,
  });

  const agency = agenciesQuery.data?.find((item) => item._id === supportId);
  const countries = countriesQuery.data ?? [];
  const inputClassName =
    "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm";

  useEffect(() => {
    if (agency) {
      setFormData({
        name: agency.name ?? "",
        gender: agency.gender ?? "",
        phone: agency.phone ?? "",
        location:
          typeof agency.location === "object"
            ? (agency.location?._id ?? "")
            : (agency.location ?? ""),
        status: agency.status ?? "active",
      });
    }
  }, [agency]);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateMutation.mutate(
      { id: supportId, payload: formData },
      { onSuccess: () => navigate("/dashboard/support-agency") },
    );
  };

  return (
    <>
      <TitleSubTitle
        title="Update Support Agency"
        subtitle="Update Support Agency details and information"
      />
      {agenciesQuery.isPending || countriesQuery.isPending ? (
        <p className="mb-10 text-sm text-gray-600">Loading support agency...</p>
      ) : agenciesQuery.isError || countriesQuery.isError ? (
        <div className="mb-10 text-sm text-red-600" role="alert">
          {agenciesQuery.isError && (
            <p>
              Unable to load support agencies:{" "}
              {getErrorMessage(agenciesQuery.error)}
              <button
                type="button"
                onClick={() => agenciesQuery.refetch()}
                className="ml-2 underline"
              >
                Retry
              </button>
            </p>
          )}
          {countriesQuery.isError && (
            <p>
              Unable to load locations: {getErrorMessage(countriesQuery.error)}
              <button
                type="button"
                onClick={() => countriesQuery.refetch()}
                className="ml-2 underline"
              >
                Retry
              </button>
            </p>
          )}
        </div>
      ) : !agency || !formData ? (
        <p className="mb-10 text-sm text-gray-600">Support agency not found.</p>
      ) : (
        <div className="mb-10 flex w-full justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <div className="w-full rounded-xl border border-gray-100 bg-white px-3 py-5 sm:px-8 sm:py-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <label className="text-sm">
                  Agency Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    minLength={2}
                    required
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm">
                  Phone
                  <input
                    type="tel"
                    name="phone"
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

                <label className="text-sm">
                  Location
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    disabled={countries.length === 0}
                    className={inputClassName}
                  >
                    <option value="">Select location</option>
                    {countries.map((country) => (
                      <option key={country._id} value={country._id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {countries.length === 0 && (
                    <span className="mt-1 block text-xs text-red-600">
                      No locations are available.
                    </span>
                  )}
                </label>

                <label className="text-sm">
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

              {updateMutation.isError && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                  Unable to update support agency:{" "}
                  {getErrorMessage(updateMutation.error)}
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
                  disabled={updateMutation.isPending || countries.length === 0}
                  className="rounded-md bg-secondary px-10 py-1 text-sm font-medium text-white transition-colors duration-100 hover:bg-primary disabled:opacity-60"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
