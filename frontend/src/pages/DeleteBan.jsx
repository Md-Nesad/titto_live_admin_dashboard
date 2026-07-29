import React from "react";
import TitleSubTitle from "../shared/components/TitleSubTitle";
import BanUserList from "../features/deleteBan/components/BanUserList";

export default function DeleteBan() {
  return (
    <div>
      <TitleSubTitle
        title="Delete Ban"
        subtitle="Manage and remove bans for users or agencies."
      />

      <BanUserList />
    </div>
  );
}
