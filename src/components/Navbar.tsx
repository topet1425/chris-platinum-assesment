import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

      <Link to="/" className="block hover:text-gray-300">Manage</Link>
      <Link to="/users" className="block hover:text-gray-300">Users</Link>
      <Link to="/tags" className="block hover:text-gray-300">Tags</Link>
      <Link to="/integrations" className="block hover:text-gray-300">
        Integrations
      </Link>
    </div>
  );
};

export default Navbar;
