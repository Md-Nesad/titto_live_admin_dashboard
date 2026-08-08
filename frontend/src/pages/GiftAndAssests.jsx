import React from "react";
import TitleSubTitle from "../shared/components/TitleSubTitle";
import GiftCategories from "../features/gitAndAssests/components/GiftCategories";
import GiftListTable from "../features/gitAndAssests/components/GiftList";
import GiftTabs from "../features/gitAndAssests/components/GiftTabs";

export default function GiftAndAssests() {
  return (
    <div>
      <TitleSubTitle
        title="Gift and Assets"
        subtitle="Manage your gifts and assets here."
      />

      <section className="bg-[#FFFFFF] shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-[#E5E7EB] pb-10 pt-1 mt-5 pl-3 sm:pl-5 sm:pr-7 pr-3 rounded-md mb-5">
        <h3 className="mt-5 mb-6 font-semibold text-[#181717] text-xl">
          Gift Categories
        </h3>
        <GiftCategories />
      </section>

      <GiftTabs />
    </div>
  );
}
