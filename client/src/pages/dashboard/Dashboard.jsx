import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useServerData } from "../../utils/ServerData";
import CapitalizeFirstLetter from "../../utils/CapitalizeFirstLetter";
import { AiFillStar, AiOutlineShop, AiOutlineTags, AiOutlineStock, AiOutlineDollar } from "react-icons/ai";
import { FiTrendingUp, FiTrendingDown, FiPackage, FiAlertTriangle } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

function Dashboard() {
  const { data: products, loading, error } = useServerData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  const stats = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        totalProducts: 0,
        totalCategories: 0,
        totalBrands: 0,
        totalStock: 0,
        averageRating: 0,
        averagePrice: 0,
        inStockCount: 0,
        outOfStockCount: 0,
        lowStockCount: 0,
        categoryData: [],
        topRatedProducts: [],
        recentProducts: [],
        lowStockProducts: [],
      };
    }

    const categories = new Set(products.map((p) => p.category));
    const brands = new Set(products.map((p) => p.brand));
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const averageRating = (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1);
    const averagePrice = (products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length).toFixed(2);
    const inStockCount = products.filter((p) => p.availabilityStatus === "In Stock").length;
    const outOfStockCount = products.filter((p) => p.availabilityStatus === "Out of Stock" || p.stock === 0).length;
    const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;

    const categoryData = Array.from(categories).map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
    })).sort((a, b) => b.count - a.count);

    const topRatedProducts = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
    const recentProducts = [...products].slice(0, 5);
    const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 10).slice(0, 5);

    return {
      totalProducts: products.length,
      totalCategories: categories.size,
      totalBrands: brands.size,
      totalStock,
      averageRating,
      averagePrice,
      inStockCount,
      outOfStockCount,
      lowStockCount,
      categoryData,
      topRatedProducts,
      recentProducts,
      lowStockProducts,
    };
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeSidebar} />
        )}
        <Topbar onMenuClick={openSidebar} />
        <div className="flex-1 flex items-center justify-center text-text mt-15">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeSidebar} />
        )}
        <Topbar onMenuClick={openSidebar} />
        <div className="flex-1 flex items-center justify-center text-red mt-15">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeSidebar} />
      )}

      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={openSidebar} />
        <div className="flex-1 flex flex-col mt-15 ml-0 lg:ml-64 w-full overflow-x-hidden max-w-[85vw]">
          <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-4">
            <section className="bg-background border border-border rounded-2xl p-3 sm:p-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-heading mb-1">Dashboard</h2>
                <p className="text-xs sm:text-sm text-text">Overview of your store performance and metrics.</p>
              </div>
            </section>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard
                icon={<AiOutlineShop size={20} />}
                label="Total Products"
                value={stats.totalProducts}
                color="blue"
              />
              <StatCard
                icon={<BiCategory size={20} />}
                label="Categories"
                value={stats.totalCategories}
                color="green"
              />
              <StatCard
                icon={<AiOutlineTags size={20} />}
                label="Brands"
                value={stats.totalBrands}
                color="purple"
              />
              <StatCard
                icon={<AiOutlineStock size={20} />}
                label="Total Stock"
                value={stats.totalStock}
                color="orange"
              />
              <StatCard
                icon={<AiOutlineDollar size={20} />}
                label="Avg Price"
                value={`$${stats.averagePrice}`}
                color="emerald"
              />
              <StatCard
                icon={<AiFillStar size={20} />}
                label="Avg Rating"
                value={stats.averageRating}
                color="yellow"
                suffix="/5"
              />
              <StatCard
                icon={<FiTrendingUp size={20} />}
                label="In Stock"
                value={stats.inStockCount}
                color="green"
              />
              <StatCard
                icon={<FiTrendingDown size={20} />}
                label="Out of Stock"
                value={stats.outOfStockCount}
                color="red"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <section className="bg-background border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-heading">Top Rated Products</h3>
                  <span className="flex items-center gap-1 text-yellow-500 text-sm">
                    <AiFillStar size={14} /> Best performers
                  </span>
                </div>
                <div className="space-y-3">
                  {stats.topRatedProducts.map((product) => (
                    <div key={product._id || product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors">
                      <img src={product.thumbnail} alt={product.title} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-heading truncate">{product.title}</p>
                        <p className="text-xs text-text">{CapitalizeFirstLetter(product.category)}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <AiFillStar color="#ffab10db" size={14} />
                        <span className="font-medium text-heading">{product.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-background border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-heading">Stock Status</h3>
                  {stats.lowStockCount > 0 && (
                    <span className="flex items-center gap-1 text-orange-500 text-sm">
                      <FiAlertTriangle size={14} /> {stats.lowStockCount} low stock
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-xl p-3 border border-border">
                    <p className="text-xs text-text uppercase tracking-wide mb-1">In Stock</p>
                    <p className="text-2xl font-bold text-green-600">{stats.inStockCount}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-border">
                    <p className="text-xs text-text uppercase tracking-wide mb-1">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600">{stats.outOfStockCount}</p>
                  </div>
                </div>
                {stats.lowStockProducts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-text uppercase tracking-wide">Low Stock Alert</p>
                    {stats.lowStockProducts.map((product) => (
                      <div key={product._id || product.id} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2 min-w-0">
                          <FiPackage size={14} className="text-orange-500 shrink-0" />
                          <span className="text-sm text-heading truncate">{product.title}</span>
                        </div>
                        <span className="text-sm font-semibold text-orange-600 shrink-0 ml-2">{product.stock} left</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            <section className="bg-background border border-border rounded-2xl p-4">
              <h3 className="text-base font-semibold text-heading mb-4">Category Distribution</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {stats.categoryData.map((cat) => (
                  <div key={cat.name} className="bg-white rounded-xl p-3 border border-border text-center">
                    <p className="text-xs sm:text-sm font-medium text-heading truncate mb-1">{CapitalizeFirstLetter(cat.name)}</p>
                    <p className="text-lg sm:text-xl font-bold text-primary">{cat.count}</p>
                    <p className="text-xs text-text">products</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, suffix = "" }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    emerald: "bg-emerald-100 text-emerald-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-3 sm:p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        <div>
          <p className="text-xs sm:text-sm text-text">{label}</p>
          <p className="text-lg sm:text-xl font-bold text-heading">{value}{suffix}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
