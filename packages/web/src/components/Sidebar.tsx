import { useLocation, useNavigate } from "react-router-dom";
import { SessionsIcon, SearchIcon } from "./icons";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose?.();
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/sessions";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)]
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        <div className="p-4">
          <button
            className="btn-primary w-full"
            onClick={() => handleNavigation("/")}
          >
            New Session
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-thin">
          <div className="space-y-1">
            <NavItem
              icon={<SessionsIcon className="w-5 h-5" />}
              label="Sessions"
              active={isActive("/")}
              onClick={() => handleNavigation("/sessions")}
            />
            <NavItem
              icon={<SearchIcon className="w-5 h-5" />}
              label="Search"
              active={isActive("/search")}
              onClick={() => handleNavigation("/search")}
            />
          </div>
        </nav>
      </aside>
    </>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={active ? "sidebar-item-active w-full" : "sidebar-item w-full"}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
