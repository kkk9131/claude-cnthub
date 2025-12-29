import { SessionsIcon, SearchIcon, SettingsIcon } from "./icons";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
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
          w-64 bg-gray-900 border-r border-gray-800
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        <div className="p-4">
          <button className="btn-primary w-full">New Session</button>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-thin">
          <div className="space-y-1">
            <NavItem
              icon={<SessionsIcon className="w-5 h-5" />}
              label="Sessions"
              active
            />
            <NavItem icon={<SearchIcon className="w-5 h-5" />} label="Search" />
          </div>
        </nav>

        <div className="p-3 border-t border-gray-800">
          <NavItem
            icon={<SettingsIcon className="w-5 h-5" />}
            label="Settings"
          />
        </div>
      </aside>
    </>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <button
      className={active ? "sidebar-item-active w-full" : "sidebar-item w-full"}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
