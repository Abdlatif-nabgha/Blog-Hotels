import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer>
            Footer
      </footer>
    </div>
  );
};

export default App;