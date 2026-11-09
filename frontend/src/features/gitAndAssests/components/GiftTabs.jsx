import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import GiftListTable from "./GiftList";
import RecentGiftActivity from "./RecentGiftActivity";
import useGifts from "../../../hooks/useGifts";

export default function GiftTabs() {
  const { giftsQuery } = useGifts({ includeStats: false });

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
          <GiftListTable giftsQuery={giftsQuery} />
        </TabPanel>

        <TabPanel>
          <RecentGiftActivity giftsQuery={giftsQuery} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
