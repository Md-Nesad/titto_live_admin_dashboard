import { AlertCircle, RotateCw, Save } from "lucide-react";
import useSettings from "../../hooks/useSettings";
import SettingConfigurationSkeleton from "./SettingConfigurationSkeleton";

const getErrorMessage = (error) => {
  const message = error?.response?.data?.message || error?.message;

  if (!message) return "An unexpected error occurred. Please try again.";
  return typeof message === "string" ? message : JSON.stringify(message);
};

export default function SettingConfiguration() {
  const {
    formData,
    isLoading,
    isError,
    error,
    refetch,
    isPending,
    isSaveError,
    saveError,
    handleChange,
    handleNestedChange,
    handleSubmit,
  } = useSettings();

  if (isLoading) return <SettingConfigurationSkeleton />;

  if (isError) {
    return (
      <div
        role="alert"
        className="flex max-w-2xl items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
      >
        <AlertCircle size={22} className="mt-0.5 shrink-0 text-red-600" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Could not load settings</p>
          <p className="mt-1 wrap-break-words text-sm">
            {getErrorMessage(error)}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-800"
          >
            <RotateCw size={15} />
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!formData) return null;

  return (
    <div className="w-full min-h-screen mb-10">
      {/* Platform Configuration */}
      <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] rounded-xl px-5 py-4 space-y-6">
        <h2 className="font-semibold text-lg">Platform Configuration</h2>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-20">
          <div className="space-y-1">
            <label className="text-sm font-medium">TItoolive Live</label>
            <input
              className="border rounded-md w-full px-3 py-2 text-sm outline-none mt-1"
              type="text"
              value={formData.platformConfig.tittoLive}
              onChange={(e) =>
                handleChange("platformConfig", "tittoLive", e.target.value)
              }
            />
          </div>

          <div className="space-y-1 sm:w-80">
            <label className="text-sm font-medium">Support Email</label>
            <input
              className="border rounded-md w-full px-3 py-2 text-sm outline-none mt-1"
              type="email"
              value={formData.platformConfig.supportEmail}
              onChange={(e) =>
                handleChange("platformConfig", "supportEmail", e.target.value)
              }
            />
          </div>
        </div>

        {/* User Settings */}
        <div className="pt-4 border-t border-[#AAAAAA] mb-5">
          <h3 className="font-semibold text-md text-base">User Settings</h3>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm sm:text-md font-semibold">
                Livestream Unlock Level
              </p>
              <p className="text-xs sm:text-sm text-[#181717] max-sm:mt-1">
                Minimum level for users to go live
              </p>
            </div>
            <input
              type="number"
              value={formData.userSetting.liveStreamUnlockLevel}
              onChange={(e) =>
                handleChange(
                  "userSetting",
                  "liveStreamUnlockLevel",
                  Number(e.target.value),
                )
              }
              className="px-3 py-1 border border-[#AAAAAA] rounded w-15 text-center pl-5"
            />
          </div>
        </div>
      </div>

      {/* Currency Settings */}
      <div className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] rounded-xl p-6 space-y-3 mt-6">
        <h2 className="font-semibold text-lg">Currency Settings</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="space-y-1 w-full">
            <label className="text-sm font-medium">
              Diamond to BDT Conversion Rate
            </label>
            <input
              type="number"
              value={formData.currencySetting.diamondToBDT.diamonds}
              onChange={(e) =>
                handleNestedChange(
                  "currencySetting",
                  "diamondToBDT",
                  "diamonds",
                  Number(e.target.value),
                )
              }
              className="border rounded-md w-full px-3 py-2 mt-1"
            />
          </div>

          <span className="text-sm w-50 font-medium sm:mt-5">diamonds =</span>

          <input
            className="border rounded-md px-3 py-2 w-full sm:mt-5"
            type="number"
            value={formData.currencySetting.diamondToBDT.BDT}
            onChange={(e) =>
              handleNestedChange(
                "currencySetting",
                "diamondToBDT",
                "BDT",
                Number(e.target.value),
              )
            }
          />

          <span className="text-sm font-medium sm:mt-5">BDT</span>
        </div>

        {/* Commission Settings */}
        <div className="pt-4">
          <h3 className="font-semibold text-lg">User Settings</h3>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm sm:text-md font-semibold">
                Host Agency Commission
              </p>
              <p className="text-xs sm:text-sm text-[#181717]">
                Percentage of host earnings
              </p>
            </div>
            <div>
              <input
                type="number"
                value={formData.commissionSetting.hostAgencyCommission}
                onChange={(e) =>
                  handleChange(
                    "commissionSetting",
                    "hostAgencyCommission",
                    Number(e.target.value),
                  )
                }
                className="py-1 border border-[#AAAAAA] rounded w-15 text-center pl-5"
              />
              <span className="pl-1">%</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm sm:text-md font-semibold">
                Master Coin Portal
              </p>
              <p className="text-xs sm:text-sm text-[#181717]">
                Profit margin on coin sales
              </p>
            </div>
            <div>
              <input
                type="number"
                value={formData.commissionSetting.masterCoinPortal}
                onChange={(e) =>
                  handleChange(
                    "commissionSetting",
                    "masterCoinPortal",
                    Number(e.target.value),
                  )
                }
                className="py-1 border border-[#AAAAAA] rounded w-15 text-center pl-5.5"
              />
              <span className="pl-1">%</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm sm:text-md font-semibold">Coin Agency</p>
              <p className="text-xs sm:text-sm text-[#181717]">
                Profit margin on coin sales
              </p>
            </div>
            <div>
              <input
                type="number"
                value={formData.commissionSetting.coinAgency}
                onChange={(e) =>
                  handleChange(
                    "commissionSetting",
                    "coinAgency",
                    Number(e.target.value),
                  )
                }
                className="py-1 border border-[#AAAAAA] rounded w-15 text-center pl-5.5"
              />
              <span className="pl-1">%</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="max-sm:hidden">
              <p className="text-sm sm:text-md font-semibold">
                Monthly Diamond Reset
              </p>
              <p className="text-xs sm:text-sm text-[#181717]">
                Auto-reset host diamonds monthly
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              {isSaveError && (
                <div
                  role="alert"
                  className="flex max-w-xl items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-red-600"
                  />
                  <div className="min-w-0 wrap-break-words">
                    <p className="font-semibold">Unable to save settings</p>
                    <p className="mt-1">{getErrorMessage(saveError)}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-secondary text-white px-5 py-1 rounded-md flex items-center gap-2 shadow-sm hover:bg-primary transition text-nowrap disabled:opacity-50"
              >
                <Save size={18} />
                {isPending ? "Saving..." : "Save All Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
