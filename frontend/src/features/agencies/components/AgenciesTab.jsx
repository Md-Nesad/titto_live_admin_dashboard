import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DollarSign, Users } from "lucide-react";
import Commission from "../../../assets/Commission";
import HostAgencyTable from "./HostAgencyTable";
import CoinAgencyTable from "./CoinAgencyTable";
import MasterAgencyTable from "./MasterAgencyTable";
import Average from "../../../assets/Average";
import StatsCards from "../../dashboard/components/StatsCard";
import useAgencies from "../../../hooks/useAgencies";

export default function AgencisTabs() {
  const { agenciesQuery } = useAgencies();
  const agencies = agenciesQuery.data ?? [];
  const getStats = (type) => {
    const typeAgencies = agencies.filter(
      (agency) => agency.type?.toLowerCase() === type,
    );
    const count =
      agenciesQuery.isError
        ? "—"
        : agenciesQuery.isPending
          ? "..."
          : typeAgencies.length.toLocaleString();
    const totalCoinBuy =
      agenciesQuery.isError
        ? "—"
        : agenciesQuery.isPending
          ? "..."
          : typeAgencies
              .reduce((sum, agency) => sum + Number(agency.coinBuy || 0), 0)
              .toLocaleString();

    return [
      {
        title: "Total Agencies",
        value: count,
        icon: <Users className="w-5 h-5 text-gray-600" />,
        footer: count,
        agency: "agencies",
        bar: true,
      },
      {
        title: "Total Coin Sales",
        value: totalCoinBuy,
        icon: (
          <DollarSign className="w-5 h-5 text-[#1C1D1D] border-2 border-[#1C1D1D] rounded-full" />
        ),
      },
      {
        title: "Avg Commission",
        value: "—",
        icon: <Average className="w-5 h-5 text-blue-500" />,
        change: "Not provided by agency API",
      },
      {
        title: "Platform Revenue",
        value: "—",
        icon: <Commission className="w-5 h-5 text-blue-500" />,
        change: "Not provided by agency API",
      },
    ];
  };

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
        <StatsCards data={getStats("host")} />
        <HostAgencyTable agenciesQuery={agenciesQuery} />
      </TabPanel>

      <TabPanel>
        <StatsCards data={getStats("coin")} />
        <CoinAgencyTable agenciesQuery={agenciesQuery} />
      </TabPanel>

      <TabPanel>
        <StatsCards data={getStats("master")} />
        <MasterAgencyTable agenciesQuery={agenciesQuery} />
      </TabPanel>

      {/* <TabPanel>
        <StatsCards data={stats} />
        <AdminAgencyTable />
      </TabPanel> */}
    </Tabs>
  );
}
