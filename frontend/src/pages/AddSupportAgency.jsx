import TitleSubTitle from "../shared/components/TitleSubTitle";
import AddSupportAgencyForm from "../features/supportAgency/components/AddSupportAgency";

export default function AddSupportAgency() {
  return (
    <>
      <TitleSubTitle
        title="Add Support Agency"
        subtitle="Manage Support Agency details and information"
      />
      <AddSupportAgencyForm />
    </>
  );
}
