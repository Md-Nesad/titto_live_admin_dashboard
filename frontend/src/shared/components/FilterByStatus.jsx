export default function FilterByStatusDropdown({
  statusFilter,
  setStatusFilter,
  onClose,
}) {
  return (
    <div className="bg-white w-56 rounded-lg shadow-lg border p-4">
      <h4 className="font-semibold text-sm mb-3">Filter by Status</h4>

      <div className="space-y-2">
        {["all", "active", "pending", "suspended"].map((status) => (
          <label
            key={status}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="radio"
              name="status"
              value={status}
              checked={statusFilter === status}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
            <span className="capitalize">{status}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => {
            setStatusFilter("all");
            onClose();
          }}
          className="text-xs px-3 py-1 border rounded"
        >
          Reset
        </button>

        <button
          onClick={onClose}
          className="text-xs px-3 py-1 bg-black text-white rounded"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
