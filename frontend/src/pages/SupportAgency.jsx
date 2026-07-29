import React from "react";
import TitleSubTitle from "../shared/components/TitleSubTitle";
import SupportAgencyList from "../features/supportAgency/components/SupportAgencyList";

export default function SupportAgency() {
  return (
    <div>
      <TitleSubTitle
        title="Support Agency"
        subtitle="Manage support agencies and their details."
      />

      <SupportAgencyList />
    </div>
  );
}
