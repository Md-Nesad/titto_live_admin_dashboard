import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import GiftListTable from "./GiftList";
import RecentGiftActivity from "./RecentGiftActivity";

export default function GiftTabs() {
  return (
    <div>
      <Tabs>
        <TabList className="flex items-center gap-4 bg-[#F4F4F433] border border-[#E4E4E4] w-full sm:w-fit overflow-x-auto px-2 py-1 rounded mb-5 text-nowrap hide_scrollbar shadow-sm">
          <Tab
            className="font-sans cursor-pointer"
            selectedClassName="active-tab"
          >
            All Gifts
          </Tab>
          <Tab
            className="font-sans cursor-pointer"
            selectedClassName="active-tab"
          >
            Recent Gift Activity
          </Tab>
        </TabList>

        <TabPanel>
          <GiftListTable />
        </TabPanel>

        <TabPanel>
          <RecentGiftActivity />
        </TabPanel>
      </Tabs>
    </div>
  );
}
