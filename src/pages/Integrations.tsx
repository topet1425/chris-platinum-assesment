import { useState, useMemo } from "react";

interface Integration {
  id: number;
  integration: string;
  name: string;
  source: string;
  entityGroup: string;
  interval: string;
  connectorUrl: string;
  instruction: string;
}

const ITEMS_PER_PAGE = 5;

const initialData: Integration[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  integration: `INT-${i + 1}`,
  name: `Integration ${i + 1}`,
  source: "API",
  entityGroup: "Group A",
  interval: "5 mins",
  connectorUrl: "https://api.example.com",
  instruction: "Sync daily",
}));

const Integrations = () => {
  const [data, setData] = useState<Integration[]>(initialData);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState<Integration | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const filtered = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = () => {
    if (!selectedItem) return;
    setData((prev) => prev.filter((item) => item.id !== selectedItem.id));
    closeModal();
  };

  const handleEditConfirm = () => {
    // For demo purposes, just log
    console.log("Edited:", selectedItem);
    closeModal();
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Integrations</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-64 rounded"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Integration</th>
              <th className="p-3">Name</th>
              <th className="p-3">Source</th>
              <th className="p-3">EntityGroup</th>
              <th className="p-3">Interval</th>
              <th className="p-3">Connector URL</th>
              <th className="p-3">Instruction</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.integration}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.source}</td>
                <td className="p-3">{item.entityGroup}</td>
                <td className="p-3">{item.interval}</td>
                <td className="p-3">{item.connectorUrl}</td>
                <td className="p-3">{item.instruction}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setModalType("edit");
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setModalType("delete");
                    }}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded ${
              page === p ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalType && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            {modalType === "delete" && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Remove {" "} {selectedItem.name} {" "} Connection?
                </h2>
                <p className="mb-4">
                  Are you sure you want to remove {" "}
                  <strong>{selectedItem.integration}</strong> {" "} connection?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={closeModal}
                    className="px-3 py-1 border rounded"
                  >
                    Undo
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              </>
            )}

            {modalType === "edit" && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Change to Existing Connection
                </h2>
                <p className="mb-4">
                  Changes may distrupt functionality and impact data flow
                </p>
                <p className="mb-4">
                 Are you sure you want to make changes to {" "}
                  <strong>{selectedItem.integration}</strong>{" "} connection?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={closeModal}
                    className="px-3 py-1 border rounded"
                  >
                    Undo
                  </button>
                  <button
                    onClick={handleEditConfirm}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;
