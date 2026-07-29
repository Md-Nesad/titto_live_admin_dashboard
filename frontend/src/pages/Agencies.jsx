import React from "react";
import AgencisTabs from "../features/agencies/components/AgenciesTab";
import TitleSubTitle from "../shared/components/TitleSubTitle";

export default function Agencies() {
  return (
    <div>
      <TitleSubTitle
        title="Agency Management"
        subtitle="Manage all agencies from here"
      />
      <AgencisTabs />
    </div>
  );
}
