import AgencyTable from "./AgencyTable";

export default function CoinAgencyTable({ agenciesQuery }) {
  return <AgencyTable type="coin" agenciesQuery={agenciesQuery} />;
}
