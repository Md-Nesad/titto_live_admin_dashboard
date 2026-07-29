import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DollarSign, Users } from "lucide-react";
import Commission from "../../../assets/Commission";
import AgenciesTable from "./HostAgencyTable";
import HostAgencyTable from "./HostAgencyTable";
import CoinAgencyTable from "./CoinAgencyTable";
import MasterAgencyTable from "./MasterAgencyTable";
import AdminAgencyTable from "./AdminAgencyTable";
import Average from "../../../assets/Average";
import StatsCards from "../../dashboard/components/StatsCard";

export default function AgencisTabs() {
  const stats = [
    {
      title: "Total Agencies",
      value: "+3 this month",
      icon: <Users className="w-5 h-5 text-gray-600" />,
      footer: "14",
      agency: "agencies",
      bar: true,
    },
    {
      title: "Total Coin Sales",
      value: "5.3M",
      icon: (
        <DollarSign className="w-5 h-5 text-[#1C1D1D] border-2 border-[#1C1D1D] rounded-full" />
      ),
      change: "+3 this month",
    },
    {
      title: "Avg Commission",
      value: "10.0%",
      icon: <Average className="w-5 h-5 text-blue-500" />,
      change: "+3 this month",
    },
    {
      title: "Platform Revenue",
      value: "৳2.4M",
      icon: <Commission className="w-5 h-5 text-blue-500" />,
      change: "+3 this month",
    },
  ];
  return (
    <Tabs>
      <TabList className="flex items-center gap-4 bg-[#F4F4F433] border border-[#E4E4E4] w-full sm:w-fit overflow-x-auto px-2 py-1 rounded mb-5 text-nowrap hide_scrollbar shadow-sm">
        <Tab className="cursor-pointer" selectedClassName="active-tab">
          Host Agencies
        </Tab>
        <Tab className="cursor-pointer" selectedClassName="active-tab">
          Coin Agencies
        </Tab>
        <Tab className="cursor-pointer" selectedClassName="active-tab">
          Master Agencies
        </Tab>
        {/* <Tab className="cursor-pointer" selectedClassName="active-tab">
          Mother Portal
        </Tab> */}
      </TabList>

      <TabPanel>
        <StatsCards data={stats} />
        <HostAgencyTable />
      </TabPanel>

      <TabPanel>
        <StatsCards data={stats} />
        <CoinAgencyTable />
      </TabPanel>

      <TabPanel>
        <StatsCards data={stats} />
        <MasterAgencyTable />
      </TabPanel>

      {/* <TabPanel>
        <StatsCards data={stats} />
        <AdminAgencyTable />
      </TabPanel> */}
    </Tabs>
  );
}
