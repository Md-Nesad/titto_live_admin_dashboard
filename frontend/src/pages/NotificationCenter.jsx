import React from "react";
import TitleSubTitle from "../shared/components/TitleSubTitle";
import ComposeNotification from "../features/notificationCenter/components/ComposeNotification";
import NotificationHistoryTable from "../features/notificationCenter/components/NotificationHistoryTable";

export default function NotificationCenter() {
  return (
    <div>
      <TitleSubTitle
        title="Notification Center"
        subtitle="Send notifications to users, agencies, and hosts"
      />

      <ComposeNotification />

      <NotificationHistoryTable />
    </div>
  );
}
