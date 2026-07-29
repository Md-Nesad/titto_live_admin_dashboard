import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { renderMenuItems } from "../utils/utils";
import { menuItems } from "../../data/data";

export default function Sidebar({ isToogleNav, onClose }) {
  const [isToogleDataStore, setIsToogleDataStore] = useState(false);
  const location = useLocation();

  const handleToogle = () => {
    setIsToogleDataStore(!isToogleDataStore);
  };

  return (
    <>
      {/* Mobile Sidebar */}
      {isToogleNav && (
        <aside
          className={`space-y-2 lg:w-55 shrink-0 overflow-y-auto bg-[#FFFFFF] px-1 py-2 shadow-lg rounded-md fixed top-26.5 z-10 left-0 h-[83vh] hide_scrollbar animatefadeInLeft block lg:hidden`}
        >
          <nav aria-label="dashboard_navbar">
            {renderMenuItems(menuItems, isToogleNav)}
          </nav>
        </aside>
      )}

      {/* Desktop Sidebar */}
      <aside className="space-y-2 fixed lg:w-55 md:w-50 shrink-0 overflow-y-auto bg-[#FFFFFF] px-1 py-2 lg:ml-13 shadow-lg border border-border_primary rounded-md hidden lg:block h-[80vh] hide_scrollbar">
        <nav aria-label="dashboard_navbar">
          {renderMenuItems(menuItems, isToogleNav)}
        </nav>
      </aside>
    </>
  );
}
