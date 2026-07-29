export default function GiftCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 sm:gap-10 sm:pr-2">
      <div className="bg-[#36A8FF52] py-5 px-8 rounded-md shadow-sm text-center">
        <p className="text-sm text-[#6F6E6E] font-medium mb-3">Romantic</p>
        <h3 className="text-xl font-bold text-[#0C00E6]">45</h3>
      </div>

      <div className="bg-[#FFDEFE52] py-5 px-8 rounded-md shadow-sm text-center">
        <p className="text-sm text-[#6F6E6E] font-medium mb-3">Premium</p>
        <h3 className="text-xl font-bold text-[#DE06ED]">28</h3>
      </div>

      <div className="bg-[#86ADFF52] py-5 px-8 rounded-md shadow-sm text-center">
        <p className="text-sm text-[#6F6E6E] font-medium mb-3">Luxury</p>
        <h3 className="text-xl font-bold text-[#170EBA]">18</h3>
      </div>

      <div className="bg-[#94FFFA52] py-5 px-8 rounded-md shadow-sm text-center">
        <p className="text-sm text-[#6F6E6E] font-medium mb-3">Special</p>
        <h3 className="text-xl font-bold text-[#00D7E6]">32</h3>
      </div>

      <div className="bg-[#95F7E852] py-5 px-8 rounded-md shadow-sm text-center">
        <p className="text-sm text-[#6F6E6E] font-medium mb-3">Seasonal</p>
        <h3 className="text-xl font-bold text-[#00D7E6]">19</h3>
      </div>
    </div>
  );
}
