import React from "react";
import CoinManagementTabs from "../features/coinManagement/components/Tabs";
import TitleSubTitle from "../shared/components/TitleSubTitle";

export default function CoinManagement() {
  return (
    <div>
      <TitleSubTitle
        title="Coin Management"
        subtitle="Manage host and Coin Agencies"
      />
      <CoinManagementTabs />
    </div>
  );
}
