import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar";
import Sidebar from "../shared/components/Sidebar";

export default function AdminDashboardLayout() {
  return (
    <>
      <header className="w-full shrink-0 fixed top-0 z-10">
        <Navbar />
      </header>

      <div className="flex flex-1 overflow-hidden hide_scrollbar pt-3 mt-30">
        <aside className="lg:w-55 lg:mr-13">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-auto sm:px-6 px-4 sm:mr-9 sm:ml-2 hide_scrollbar">
          <Outlet />
        </main>
      </div>
    </>
  );
}
