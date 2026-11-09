import AgencyTable from "./AgencyTable";

export default function MasterAgencyTable({ agenciesQuery }) {
  return <AgencyTable type="master" agenciesQuery={agenciesQuery} />;
}
