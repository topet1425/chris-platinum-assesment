import { useState } from "react";

const Header = () => {
  const [tenant, setTenant] = useState("Tenant A");

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <select
        value={tenant}
        onChange={(e) => setTenant(e.target.value)}
        className="border rounded px-3 py-1"
      >
        <option>Tenant A</option>
        <option>Tenant B</option>
        <option>Tenant C</option>
      </select>
    </div>
  );
};

export default Header;
