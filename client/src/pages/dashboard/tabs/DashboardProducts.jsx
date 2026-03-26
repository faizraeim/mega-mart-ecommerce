import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { productTableTitle } from "../../../data/data";
import { useServerData } from "../../../utils/ServerData";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import CapitalizeFirstLetter from "../../../utils/CapitalizeFirstLetter";
import { AiFillStar } from "react-icons/ai";
import DetailModal from "../../../components/Dashboard/DetailModal";
import AddProductModal from "../../../components/Dashboard/AddProductModal";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

function DashboardProducts() {
  // get all the products from the server with custom hook
  const { data: serverData, loading, error } = useServerData();

  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    availabilityStatus: "",
  });

  const categories = Array.from(
    new Set(serverData.map((product) => product.category)),
  );
  const brands = Array.from(
    new Set(serverData.map((product) => product.brand)),
  );
  const availabilityStatuses = Array.from(
    new Set(serverData.map((stat) => stat.availabilityStatus)),
  );

  // open and close the view details modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const filtered = serverData.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.brand && product.brand !== filters.brand) return false;
      if (filters.availabilityStatus && product.availabilityStatus !== filters.availabilityStatus) return false;
      return true;
    });
    setProducts(filtered);
  }, [serverData, filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: "", brand: "", availabilityStatus: "" });
  };

  const handleDelete = async (product) => {
    const productId = product._id || product.id;

    if (!window.confirm(`Delete "${product.title}"?`)) return;

    try {
      const response = await fetch(`${API_BASE}/delete/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== productId));
    } catch (error) {
      console.error("Error deleting product: ", error);
      alert("Error deleting product!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={closeSidebar}
          />
        )}
        <Topbar onMenuClick={openSidebar} />
        <div className="flex-1 flex items-center justify-center text-text mt-15">
          Loading products....
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={closeSidebar}
          />
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
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={openSidebar} />

        <div className="flex-1 flex flex-col mt-15 ml-0 lg:ml-64 w-full overflow-x-hidden max-w-[85vw] ">
          <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-4">
            <section className="bg-background border border-border rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-heading mb-1">
                  Products
                </h2>
                <p className="text-xs sm:text-sm text-text">
                  Product list management, pricing updates, and stock controls
                  will be managed here.
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 bg-blue-100 text-blue-600 font-medium rounded-md px-3 py-1.5 hover:bg-blue-200 cursor-pointer whitespace-nowrap text-sm"
                onClick={() => setIsAddOpen(true)}
              >
                <FiPlus size={18} /> Add
              </button>
            </section>

            {/* Filter products for search */}
            <section className="bg-background border border-border rounded-2xl p-3 sm:p-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-heading">Filters</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {/* Category Filter */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-text uppercase tracking-wide">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      className="px-3 py-2 bg-white border border-border rounded-lg text-sm text-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {CapitalizeFirstLetter(category)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-text uppercase tracking-wide">
                      Brand
                    </label>
                    <select
                      value={filters.brand}
                      onChange={(e) => handleFilterChange("brand", e.target.value)}
                      className="px-3 py-2 bg-white border border-border rounded-lg text-sm text-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">All Brands</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-text uppercase tracking-wide">
                      Status
                    </label>
                    <select
                      value={filters.availabilityStatus}
                      onChange={(e) =>
                        handleFilterChange("availabilityStatus", e.target.value)
                      }
                      className="px-3 py-2 bg-white border border-border rounded-lg text-sm text-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">All Status</option>
                      {availabilityStatuses.map((stat) => (
                        <option key={stat} value={stat}>
                          {stat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filter Button */}
                  <div className="flex flex-col gap-2 justify-end">
                    <label className="text-xs font-medium text-text uppercase tracking-wide invisible">
                      Action
                    </label>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <main className="bg-white border border-border rounded-2xl overflow-hidden">
              {/* Mobile Card View */}
              <div className="md:hidden p-3 sm:p-4 space-y-3">
                {products.length === 0 ? (
                  <p className="text-center text-text py-8">
                    No products found
                  </p>
                ) : (
                  products.map((data) => (
                    <div
                      key={data._id}
                      className="border border-border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-3">
                        <img
                          src={data.thumbnail}
                          alt={data.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-heading truncate">
                            {data.title}
                          </h3>
                          <p className="text-xs text-text">
                            {CapitalizeFirstLetter(data.category)}
                          </p>
                          <p className="text-xs text-text">{data.brand}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-light">Price</p>
                          <p className="font-semibold text-heading">
                            ${data.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-light">Stock</p>
                          <p className="font-semibold text-heading">
                            {data.stock}
                          </p>
                        </div>
                        <div>
                          <p className="text-light">Rating</p>
                          <p className="font-semibold text-heading flex items-center gap-1">
                            <AiFillStar color="#ffab10db" size={14} />{" "}
                            {data.rating}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-border">
                        <span
                          className={`flex-1 text-center px-2 py-1.5 rounded-lg text-xs font-medium ${
                            data.availabilityStatus === "In Stock"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {data.availabilityStatus}
                        </span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-2 text-yellow-600 bg-yellow-50 rounded-lg py-2 hover:bg-yellow-100 transition text-sm font-medium"
                          onClick={() => openModal(data)}
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-2 text-blue-600 bg-blue-50 rounded-lg py-2 hover:bg-blue-100 transition text-sm font-medium"
                          onClick={() => {
                            setEditingProduct(data);
                            setIsEditOpen(true);
                          }}
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          type="button"
                          className="flex-1 flex items-center justify-center gap-2 text-red-600 bg-red-50 rounded-lg py-2 hover:bg-red-100 transition text-sm font-medium"
                          onClick={() => handleDelete(data)}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block w-full">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-max">
                    <thead>
                      <tr className="bg-background border-b border-border sticky top-0">
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-12">
                          ID
                        </th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-40">
                          Product
                        </th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-24">
                          Category
                        </th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-20">
                          Brand
                        </th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-16">
                          Price
                        </th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-16">
                          Stock
                        </th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-16">
                          Rating
                        </th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-20">
                          Status
                        </th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading min-w-20">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr>
                          <td
                            colSpan="9"
                            className="px-3 lg:px-4 py-8 text-center text-text"
                          >
                            No products found
                          </td>
                        </tr>
                      ) : (
                        products.map((data) => (
                          <tr
                            key={data._id}
                            className="border-b border-border hover:bg-background transition-colors"
                          >
                            <td className="px-3 lg:px-4 py-3 text-xs lg:text-sm text-text">
                              {data.id}
                            </td>
                            <td className="px-3 lg:px-4 py-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={data.thumbnail}
                                  alt={data.title}
                                  className="w-8 h-8 rounded-lg object-cover shrink-0"
                                />
                                <span className="text-xs lg:text-sm text-heading truncate">
                                  {data.title}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 lg:px-4 py-3 text-xs lg:text-sm text-text">
                              {CapitalizeFirstLetter(data.category)}
                            </td>
                            <td className="px-3 lg:px-4 py-3 text-xs lg:text-sm text-text">
                              {data.brand}
                            </td>
                            <td className="px-3 lg:px-4 py-3 text-xs lg:text-sm font-semibold text-heading">
                              ${data.price}
                            </td>
                            <td className="px-3 lg:px-4 py-3 text-xs lg:text-sm text-text">
                              {data.stock}
                            </td>
                            <td className="px-3 lg:px-4 py-3 text-xs lg:text-sm">
                              <div className="flex items-center gap-1 text-heading">
                                <AiFillStar
                                  color="#ffab10db"
                                  size={12}
                                  className="lg:w-[14px] lg:h-[14px]"
                                />{" "}
                                {data.rating}
                              </div>
                            </td>
                            <td className="px-3 lg:px-4 py-3">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                  data.availabilityStatus === "In Stock"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {data.availabilityStatus}
                              </span>
                            </td>
                            <td className="px-3 lg:px-4 py-3">
                              <div className="flex gap-1">
                                <button
                                  type="button"
                                  className="p-1 lg:p-1.5 text-yellow-600 hover:bg-yellow-100 rounded-lg transition"
                                  onClick={() => openModal(data)}
                                  title="View"
                                >
                                  <FiEye size={14} className="lg:w-4 lg:h-4" />
                                </button>
                                <button
                                  type="button"
                                  className="p-1 lg:p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                                  onClick={() => {
                                    setEditingProduct(data);
                                    setIsEditOpen(true);
                                  }}
                                  title="Edit"
                                >
                                  <FiEdit2
                                    size={14}
                                    className="lg:w-4 lg:h-4"
                                  />
                                </button>
                                <button
                                  type="button"
                                  className="p-1 lg:p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition"
                                  title="Delete"
                                  onClick={() => handleDelete(data)}
                                >
                                  <FiTrash2
                                    size={14}
                                    className="lg:w-4 lg:h-4"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>

            <DetailModal
              data={selectedProduct}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
            {isAddOpen && (
              <AddProductModal
                onClose={() => setIsAddOpen(false)}
                onCreated={(createdProduct) => {
                  setProducts((prev) => [...prev, createdProduct]);
                }}
              />
            )}

            {isEditOpen && (
              <AddProductModal
                initialData={editingProduct}
                onClose={() => {
                  setIsEditOpen(false);
                  setEditingProduct(null);
                }}
                onCreated={(updated) => {
                  // update list in place
                  setProducts((prev) =>
                    prev.map((p) => (p._id === updated._id ? updated : p)),
                  );
                }}
                mode="edit"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardProducts;
