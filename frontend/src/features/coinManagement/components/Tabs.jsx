import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import RateTransactionTable from "./RateTransactionTable";
import ExchangeRatetTable from "./CurrentExchangeRate";
import CurrentExchangeRate from "./CurrentExchangeRate";
import UpdateExchangeRate from "./UpdateExchangeRate";
import SellCoins from "./SellCoinsToAgencies";

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
              Sell Coins
            </Tab>
            <Tab className="cursor-pointer" selectedClassName="active-tab">
              Exchange Ratet
            </Tab>
            <Tab className="cursor-pointer" selectedClassName="active-tab">
              $ Update Rate
            </Tab>
          </TabList>
        </div>

        <TabPanel>
          <RateTransactionTable />
        </TabPanel>

        <TabPanel>
          <SellCoins />
        </TabPanel>

        <TabPanel>
          <CurrentExchangeRate />
        </TabPanel>

        <TabPanel>
          <UpdateExchangeRate />
        </TabPanel>
      </Tabs>
    </div>
  );
}
