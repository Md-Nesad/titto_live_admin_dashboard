export default function TitleSubTitle({ title, subtitle }) {
  return (
    <div aria-label="rate transaction header" className="mb-5">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-lg text-[#85878D]">{subtitle}</p>
    </div>
  );
}
