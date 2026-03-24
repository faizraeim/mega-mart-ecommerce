import { general, sidebarMenu } from "../../data/data"
import { Link, useLocation, useNavigate } from "react-router-dom"
import CapitalizeFirstLetter from "../../utils/CapitalizeFirstLetter"
import auth from "../../utils/auth.mjs"
import {
  FiHome,
  FiBarChart2,
  FiBox,
  FiCreditCard,
  FiShoppingBag,
  FiMessageCircle,
  FiSettings,
  FiUser,
  FiLogOut,
  FiPhone,
  FiX,
} from "react-icons/fi"

const iconMap = {
  dashboard: FiHome,
  analytics: FiBarChart2,
  products: FiBox,
  payments: FiCreditCard,
  orders: FiShoppingBag,
  enquiry: FiMessageCircle,
  marketing: FiPhone,
  setting: FiSettings,
  user: FiUser,
  signout: FiLogOut,
}

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const user = auth.getUser()

  const handleLogout = () => {
    auth.logout()
    navigate("/signin")
  }

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen border-r border-border bg-white flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}>
      <div className="h-15 px-4 py-3 border-b border-border/60 flex items-center justify-between gap-2">
        <Link to="/dashboard" className="flex items-center gap-2 flex-1">
          <img
            src={general.logoWithText}
            alt="MegaMart logo"
            className="w-40 object-contain"
          />
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-background rounded-lg transition"
          aria-label="Close sidebar"
        >
          <FiX size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {sidebarMenu.map((menu) => {
          const path = `/dashboard/${menu.name === "dashboard" ? "" : menu.name}`.replace(/\/$/, "")
          const isActive = currentPath === path
          const Icon = iconMap[menu.name] || FiBox
          const isDestructive = menu.name === "signout"

          if (menu.name === "signout") {
            return (
              <button
                key={menu.id}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition text-red-500 hover:bg-red-50"
              >
                <Icon className="text-lg shrink-0" />
                <span className="truncate">{CapitalizeFirstLetter(menu.name)}</span>
              </button>
            )
          }

          return (
            <Link
              key={menu.id}
              to={menu.name === "dashboard" ? "/dashboard" : path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                ${isActive
                  ? "bg-primary text-white"
                  : "text-text hover:bg-background"
                }`}
            >
              <Icon className="text-lg shrink-0" />
              <span className="truncate">{CapitalizeFirstLetter(menu.name)}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-3 border-t border-border/60 text-xs text-light">
        <p className="font-semibold text-heading text-sm">{user?.username || "User"}</p>
        <p className="text-text">{user?.email || ""}</p>
        <p className="capitalize">{user?.role || "user"}</p>
      </div>
    </aside>
  )
}

export default Sidebar
