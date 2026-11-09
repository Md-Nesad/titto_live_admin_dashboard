import AgencyTable from "./AgencyTable";

export default function HostAgencyTable({ agenciesQuery }) {
  return <AgencyTable type="host" agenciesQuery={agenciesQuery} />;
}
