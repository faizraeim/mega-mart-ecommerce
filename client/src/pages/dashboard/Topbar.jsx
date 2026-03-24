import { FiBell, FiSearch, FiUser, FiMenu } from "react-icons/fi"
import auth from "../../utils/auth.mjs"

function Topbar({ onMenuClick }) {
  const today = new Date().toDateString()
  const user = auth.getUser()

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 h-15 border-b border-border bg-white z-30">
      <div className="h-full px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex items-center gap-2 sm:gap-3 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 hover:bg-background rounded-lg transition flex-shrink-0"
            aria-label="Open menu"
          >
            <FiMenu size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="font-bold text-sm sm:text-base lg:text-lg text-heading truncate">
              Welcome back, {user?.username || "User"}
            </h1>
            <p className="text-xs text-light truncate">{today}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
          <button
            type="button"
            className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-border text-heading hover:bg-background flex-shrink-0 transition"
            aria-label="Notifications"
          >
            <FiBell size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:flex flex-col text-xs text-light">
              <span className="text-heading font-semibold text-xs sm:text-sm">{user?.username || "User"}</span>
              <span className="text-xs capitalize">{user?.role || "user"}</span>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-primary flex-shrink-0">
              <FiUser size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar