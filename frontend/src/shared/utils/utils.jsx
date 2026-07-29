import { NavLink, useLocation } from "react-router-dom";
// Helper function to handle parent + child route active
const isMenuActive = (item) => {
  if (item.hasChildren) {
    return (
      location.pathname === item.link ||
      location.pathname.startsWith(item.link + "/")
    );
  }
  return location.pathname === item.link;
};

// Render menu items
export const renderMenuItems = (items, isToogleNav) =>
  items.map((item) => (
    <NavLink
      key={item.title}
      to={item.link}
      className={() =>
        `flex items-center gap-3 px-3 py-3 rounded-md text-md font-medium 
          transition-all cursor-pointer hover:bg-primary hover:text-white
          ${
            isMenuActive(item) ? "text-primary font-semibold" : "text-[#181717]"
          }`
      }
      onClick={() => isToogleNav && setTimeout(onClose, 700)}
    >
      <item.icon size={16} />
      <span>{item.title}</span>
    </NavLink>
  ));
