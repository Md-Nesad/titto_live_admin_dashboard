import AddAgencyForm from "../features/agencies/components/AddAgencyForm";
import TitleSubTitle from "../shared/components/TitleSubTitle";

export default function AddAgency() {
  return (
    <>
      <TitleSubTitle
        title="Add New Agency"
        subtitle="Add a new agency to the system by filling out the form below."
      />
      <AddAgencyForm />
    </>
  );
}
