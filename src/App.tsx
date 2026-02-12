import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

import Manage from "./pages/Manage";
import Users from "./pages/Users";
import Tags from "./pages/Tags";
import Integrations from "./pages/Integrations";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Manage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/tags" element={<Tags />} />
              <Route path="/integrations" element={<Integrations />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
