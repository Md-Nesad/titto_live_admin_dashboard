import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RateTransactionTable from "./RateTransactionTable";
import ExchangeRatetTable from "./ExchangeRatetTable";

export default function CoinManagementTabs() {
  return (
    <div>
      {/* Left side tab */}
      <Tabs>
        <div className="flex items-center justify-between gap-3 sm:gap-4 text-nowrap max-sm:w-full overflow-x-auto hide_scrollbar">
          <TabList className="flex items-center gap-4 bg-[#F4F4F433] border border-[#E4E4E4] w-full sm:w-fit overflow-x-auto px-2 py-1 rounded mb-5 text-nowrap hide_scrollbar shadow-sm">
            <Tab className="cursor-pointer" selectedClassName="active-tab">
              Rate Transaction
            </Tab>
            <Tab className="cursor-pointer" selectedClassName="active-tab">
              Exchange Ratet
            </Tab>
          </TabList>

          <div className="flex items-center gap-3 sm:gap-4 text-nowrap max-sm:w-full overflow-x-auto hide_scrollbar">
            <button className="px-4 py-1.5 rounded-md border border-secondary text-secondary font-medium text-md bg-white">
              Refund Coin
            </button>
            <button className="px-4 py-1.5 rounded-md border border-secondary text-secondary font-medium text-md bg-white">
              Manual Adjustment
            </button>
            <button className="px-4 py-1.5 rounded-md border border-secondary text-white text-md font-medium bg-secondary">
              $ Update Rate
            </button>
          </div>
        </div>

        <TabPanel>
          <RateTransactionTable />
        </TabPanel>

        <TabPanel>
          <ExchangeRatetTable />
        </TabPanel>
      </Tabs>
    </div>
  );
}
