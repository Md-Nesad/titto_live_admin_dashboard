export default function SellCoins({ setRefresh }) {
  //   const { data } = useFetch(`${BASE_URL}/coins/rates/latest`);
  //   const handleSubmit = useJsonPost(`${BASE_URL}/coins/sales/admin-to-all`);

  //   const [masterId, setMasterId] = useState("");
  //   const [coins, setCoins] = useState("");
  //   const [loading, setLoading] = useState(false);
  //   const [totalPrice, setTotalPrice] = useState(0);

  //   //API response values
  //   const [referenceType, setReferenceType] = useState("");
  //   const [referenceName, setReferenceName] = useState("");

  //   //Auto fetch when masterId exists
  //   const { data: referenceData } = useFetch(
  //     masterId
  //       ? `${BASE_URL}/coins/get-reference-user?displayId=${masterId}`
  //       : null,
  //   );

  //   //Set response values
  //   useEffect(() => {
  //     if (referenceData?.reference) {
  //       setReferenceType(referenceData.reference.type);
  //       setReferenceName(referenceData.reference.name);
  //     } else {
  //       setReferenceType("");
  //       setReferenceName("");
  //     }
  //   }, [referenceData]);

  //   useEffect(() => {
  //     if (!coins || !referenceType || !data?.coinRate) {
  //       setTotalPrice(0);
  //       return;
  //     }

  //     const amount = Number(coins);
  //     let rate = 0;

  //     if (referenceType === "master") {
  //       rate = Number(data.coinRate.masterRate);
  //     } else if (referenceType === "user") {
  //       rate = Number(data.coinRate.userRate);
  //     } else if (referenceType === "coin") {
  //       rate = Number(data.coinRate.agencyRate);
  //     }

  //     if (!rate || !amount) {
  //       setTotalPrice(0);
  //       return;
  //     }

  //     setTotalPrice(rate * amount);
  //   }, [coins, referenceType, data]);

  //   const handleCancel = () => {
  //     setMasterId("");
  //     setCoins("");
  //     setReferenceType("");
  //     setReferenceName("");
  //   };

  //   const handleCoinSell = async () => {
  //     if (!masterId || !coins)
  //       return toast.error("Please enter research ID and coins");

  //     setLoading(true);

  //     const result = await handleSubmit({
  //       displayId: masterId,
  //       coins,
  //       category: referenceType,
  //     });

  //     if (result.success === false) {
  //       setLoading(false);
  //       return toast.error(result.message);
  //     } else {
  //       setMasterId("");
  //       setCoins("");
  //       setReferenceType("");
  //       setReferenceName("");
  //       setLoading(false);
  //       setRefresh((prev) => !prev);
  //       return toast.success(result.message);
  //     }
  //   };

  return (
    <div className="bg-white rounded-md p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] mt-1">
      {/* Title */}
      <h2 className="text-[22px] font-semibold text-gray-800 mt-2">
        Sell Coins
      </h2>
      <p className="text-gray-500 text-md mb-7">Transfer coins from platform</p>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:ml-10">
        {/* Research ID */}
        <div className="flex flex-col gap-1 mb-3">
          <label className="text-[15px] font-medium text-gray-700">
            Research ID
          </label>
          <input
            type="number"
            // value={masterId}
            // onChange={(e) => setMasterId(e.target.value)}
            placeholder="Enter Agency Id"
            className="border border-[#626060] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1 mb-3">
          <label className="text-[15px] font-medium text-gray-700">
            Category
          </label>
          <div className="relative">
            <select
              disabled
              //   value={referenceType}
              className="border border-[#626060] rounded-md px-3 pl-4 py-2 w-full outline-none appearance-none text-[15px] text-[#636363]"
            >
              <option value="">Select</option>
              <option value="coin">Coin</option>
              <option value="master">Master</option>
              <option value="user">User</option>
            </select>

            {/* <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
              <img src={downArrow} alt="" />
            </span> */}
          </div>
        </div>
        {/* Name */}
        <div className="hidden">
          <label className="text-[15px] font-medium text-gray-700">Name</label>
          <input
            // value={referenceName}
            readOnly
            className="border border-[#626060] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Number of Coins */}
        <div className="flex flex-col gap-1">
          <label className="text-[15px] font-medium text-gray-700">
            Number of Coins
          </label>
          <input
            type="number"
            // value={coins}
            // onChange={(e) => setCoins(e.target.value)}
            placeholder="Enter Amount"
            className="border border-[#626060] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className="text-[15px] font-medium text-gray-700">
            Price (Coins)
          </label>
          <input
            // value={Number.isFinite(totalPrice) ? totalPrice.toFixed(2) : 0}
            type="number"
            readOnly
            className="border border-[#626060] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </form>

      {/* Buttons */}
      <div className="flex justify-center sm:justify-end items-center gap-2 mt-6">
        <button
          //   onClick={handleCancel}
          className="px-10 py-1 rounded-md border border-[#CCCCCC] text-[#181717] bg-white hover:bg-gray-200 font-[490]"
        >
          Cancel
        </button>

        <button
          //   onClick={handleCoinSell}
          className="px-12 py-1 rounded-md text-white font-medium bg-secondary hover:bg-primary transition-colors duration-100"
        >
          Sell Coins
        </button>
      </div>
    </div>
  );
}
