import { useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

function DashboardOrders() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeSidebar} />}

      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={openSidebar} />
        <div className="flex-1 flex flex-col mt-15 ml-0 lg:ml-64 w-full overflow-x-hidden max-w-[85vw]">
          <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-4">
            <section className="bg-background border border-border rounded-2xl p-3 sm:p-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-heading mb-1">Orders</h2>
                <p className="text-xs sm:text-sm text-text">
                  Orders, fulfillment status, and shipment tracking details will be handled here.
                </p>
              </div>
            </section>

            <main className="bg-white border border-border rounded-2xl overflow-hidden">
              <div className="p-8 text-center text-text">
                <p className="text-lg font-medium mb-2">Orders feature coming soon</p>
                <p className="text-sm">This section will display customer orders and their fulfillment status.</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOrders;
