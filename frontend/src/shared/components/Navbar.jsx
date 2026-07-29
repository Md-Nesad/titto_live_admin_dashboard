import { LogOut, Menu, SquareMenu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isToogleNav, setIsToogleNav] = useState(false);
  const [isToekn, setIsToken] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full bg-white shadow-md border-b border-gray-100 lg:px-12 px-7 max-sm:pr-5 max-sm:pl-2 pt-10 pb-4 flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-13 h-13 rounded-full  lg:block hidden"
              loading="lazy"
            />
          </Link>

          <div>
            <button
              onClick={() => setIsToogleNav(!isToogleNav)}
              className="mt-2 bg-linear-to-b from-primary to-secondary p-1 rounded-md opacity-70 hidden max-lg:block mr-1"
            >
              {isToogleNav ? (
                <X size={32} className="text-white" />
              ) : (
                <Menu size={32} className="text-white" />
              )}
            </button>
          </div>

          <div>
            <h1 className="text-lg font-semibold bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text">
              StreamDoing
            </h1>
            <p className="text-sm text-secondary font-semibold max-sm:-mt-0.5">
              Admin Panel
            </p>
          </div>
        </div>
        {isToekn ? (
          <>
            <button
              onClick={() => {
                const confirm = window.confirm("Are you sure to logout?");
                if (!confirm) return;
                localStorage.removeItem("admin_token");
                setIsToken(false);
                navigate("/login");
              }}
              className="flex items-center gap-2 text-[18px] font-medium text-secondary hover:text-[#da9b9c] transition-colors duration-300"
            >
              <LogOut size={18} />
              <span>LogOut</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="flex items-center gap-2 text-[18px] font-medium text-secondary hover:text-[#da9b9c] transition-colors duration-300">
                <LogOut size={18} />
                <span>Login</span>
              </button>
            </Link>
          </>
        )}
      </div>
      {isToogleNav && (
        <Sidebar
          isToogleNav={isToogleNav}
          onClose={() => setIsToogleNav(false)}
        />
      )}
    </>
  );
}
