import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import auth from "../../../utils/auth.mjs";

function DashboardUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, user: null });

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  const fetchUsers = async () => {
    try {
      const response = await auth.authenticatedFetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!deleteModal.user) return;
    try {
      const response = await auth.authenticatedFetch(`/api/users/${deleteModal.user._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((u) => u._id !== deleteModal.user._id));
      setDeleteModal({ open: false, user: null });
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeSidebar} />}
        <Topbar onMenuClick={openSidebar} />
        <div className="flex-1 flex items-center justify-center text-text mt-15">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeSidebar} />}
        <Topbar onMenuClick={openSidebar} />
        <div className="flex-1 flex items-center justify-center text-red mt-15">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={closeSidebar} />}

      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={openSidebar} />
        <div className="flex-1 flex flex-col mt-15 ml-0 lg:ml-64 w-full overflow-x-hidden max-w-[85vw]">
          <div className="p-3 sm:p-4 flex-1 overflow-y-auto space-y-4">
            <section className="bg-background border border-border rounded-2xl p-3 sm:p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-heading mb-1">Users</h2>
                  <p className="text-xs sm:text-sm text-text">Manage user accounts and permissions.</p>
                </div>
                <div className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium">
                  Total: {users.length}
                </div>
              </div>
            </section>

            <main className="bg-white border border-border rounded-2xl overflow-hidden">
              <div className="hidden md:block w-full">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-max">
                    <thead>
                      <tr className="bg-background border-b border-border">
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading">Username</th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading">Email</th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading">Role</th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading">Created</th>
                        <th className="px-3 lg:px-4 py-3 text-left text-xs font-semibold text-heading">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-3 lg:px-4 py-8 text-center text-text">No users found</td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user._id} className="border-b border-border hover:bg-background transition-colors">
                            <td className="px-3 lg:px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                                  {user.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-xs lg:text-sm text-heading font-medium">{user.username}</span>
                              </div>
                            </td>
                            <td className="px-3 lg:px-4 py-3 text-xs lg:text-sm text-text">{user.email}</td>
                            <td className="px-3 lg:px-4 py-3">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-3 lg:px-4 py-3 text-xs lg:text-sm text-text">{formatDate(user.createdAt)}</td>
                            <td className="px-3 lg:px-4 py-3">
                              <button
                                onClick={() => setDeleteModal({ open: true, user })}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                disabled={user.role === "admin"}
                                title={user.role === "admin" ? "Cannot delete admin" : "Delete user"}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="md:hidden p-3 space-y-3">
                {users.map((user) => (
                  <div key={user._id} className="border border-border rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-heading truncate">{user.username}</p>
                        <p className="text-xs text-text truncate">{user.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                      }`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-xs text-text">{formatDate(user.createdAt)}</span>
                      <button
                        onClick={() => setDeleteModal({ open: true, user })}
                        disabled={user.role === "admin"}
                        className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-sm disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteModal({ open: false, user: null })}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-heading mb-2">Delete User</h3>
            <p className="text-sm text-text mb-4">
              Are you sure you want to delete <strong>{deleteModal.user?.username}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteModal({ open: false, user: null })} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardUser;
