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

const mockData: Integration[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  integration: `INT-${i + 1}`,
  name: `Integration ${i + 1}`,
  source: "API",
  entityGroup: "Group A",
  interval: "5 mins",
  connectorUrl: "https://api.example.com",
  instruction: "Sync daily",
}));

const ITEMS_PER_PAGE = 5;

const Integrations = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return mockData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Integrations</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-64"
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
    </div>
  );
};

export default Integrations;
