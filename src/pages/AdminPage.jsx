import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("bookings");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, usersRes] = await Promise.all([
        api.get("/bookings"),
        api.get("/users"),
      ]);
      setBookings(bookingsRes.data.data.bookings);
      setUsers(usersRes.data.data.users);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}`, { status });
      fetchData();
      toast.success("Status updated successfully! 🎉");
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchData();
      toast.success("User deleted successfully! 🎉");
    } catch {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const statusConfig = {
    pending: {
      color: "#f6ad55",
      bg: "rgba(246,173,85,0.1)",
      label: "⏳ Pending",
    },
    approved: {
      color: "#48bb78",
      bg: "rgba(72,187,120,0.1)",
      label: "✅ Approved",
    },
    rejected: {
      color: "#fc5c7d",
      bg: "rgba(252,92,125,0.1)",
      label: "❌ Rejected",
    },
  };

  const tabStyle = (tab) => ({
    padding: "10px 20px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    color: activeTab === tab ? "#6c63ff" : "#a0aec0",
    borderBottom:
      activeTab === tab ? "2px solid #6c63ff" : "2px solid transparent",
    fontWeight: activeTab === tab ? 600 : 400,
    fontSize: "0.95rem",
    transition: "all 0.2s",
  });

  if (loading)
    return (
      <MainLayout>
        <div style={{ textAlign: "center", padding: "60px", color: "#a0aec0" }}>
          Loading...
        </div>
      </MainLayout>
    );

  return (
    <MainLayout>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ color: "#fff", fontWeight: 700 }}>Admin Panel 🛠️</h2>
        <p style={{ color: "#a0aec0", marginTop: "4px" }}>
          Manage users and bookings
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {[
          {
            label: "Total Users",
            value: users.length,
            icon: "👥",
            color: "#6c63ff",
          },
          {
            label: "Total Bookings",
            value: bookings.length,
            icon: "📅",
            color: "#48bb78",
          },
          {
            label: "Pending",
            value: bookings.filter((b) => b.status === "pending").length,
            icon: "⏳",
            color: "#f6ad55",
          },
          {
            label: "Approved",
            value: bookings.filter((b) => b.status === "approved").length,
            icon: "✅",
            color: "#48bb78",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#21253a",
              border: "1px solid #2d3250",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: `${s.color}22`,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
              }}
            >
              {s.icon}
            </div>
            <div>
              <div style={{ color: "#a0aec0", fontSize: "0.85rem" }}>
                {s.label}
              </div>
              <div
                style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem" }}
              >
                {s.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div
          style={{
            background: "rgba(252,92,125,0.1)",
            border: "1px solid rgba(252,92,125,0.3)",
            borderRadius: "8px",
            padding: "12px",
            color: "#fc5c7d",
            marginBottom: "20px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Tabs */}
      <div
        style={{
          background: "#21253a",
          border: "1px solid #2d3250",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", borderBottom: "1px solid #2d3250" }}>
          <button
            style={tabStyle("bookings")}
            onClick={() => setActiveTab("bookings")}
          >
            📅 Bookings ({bookings.length})
          </button>
          <button
            style={tabStyle("users")}
            onClick={() => setActiveTab("users")}
          >
            👥 Users ({users.length})
          </button>
        </div>

        {/* Bookings Table */}
        {activeTab === "bookings" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1a1d27" }}>
                {["#", "User", "Details", "Date", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "14px 20px",
                        textAlign: "left",
                        color: "#a0aec0",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        borderBottom: "1px solid #2d3250",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id} style={{ borderBottom: "1px solid #2d3250" }}>
                  <td style={{ padding: "16px 20px", color: "#a0aec0" }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ color: "#fff", fontSize: "0.9rem" }}>
                      {b.userId?.name}
                    </div>
                    <div style={{ color: "#a0aec0", fontSize: "0.8rem" }}>
                      {b.userId?.email}
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px", color: "#fff" }}>
                    {b.details}
                  </td>
                  <td style={{ padding: "16px 20px", color: "#a0aec0" }}>
                    {new Date(b.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        background: statusConfig[b.status]?.bg,
                        color: statusConfig[b.status]?.color,
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                      }}
                    >
                      {statusConfig[b.status]?.label}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {b.status === "pending" && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => updateStatus(b._id, "approved")}
                          style={{
                            background: "rgba(72,187,120,0.1)",
                            border: "1px solid rgba(72,187,120,0.3)",
                            color: "#48bb78",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                          }}
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => updateStatus(b._id, "rejected")}
                          style={{
                            background: "rgba(252,92,125,0.1)",
                            border: "1px solid rgba(252,92,125,0.3)",
                            color: "#fc5c7d",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                          }}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Users Table */}
        {activeTab === "users" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1a1d27" }}>
                {["#", "Name", "Email", "Role", "Joined", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "14px 20px",
                        textAlign: "left",
                        color: "#a0aec0",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        borderBottom: "1px solid #2d3250",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id} style={{ borderBottom: "1px solid #2d3250" }}>
                  <td style={{ padding: "16px 20px", color: "#a0aec0" }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          background:
                            "linear-gradient(135deg, #6c63ff, #574fd6)",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                        }}
                      >
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ color: "#fff" }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px", color: "#a0aec0" }}>
                    {u.email}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        background:
                          u.role === "admin"
                            ? "rgba(252,92,125,0.1)"
                            : "rgba(108,99,255,0.1)",
                        color: u.role === "admin" ? "#fc5c7d" : "#6c63ff",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "0.85rem",
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", color: "#a0aec0" }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    {u.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(u._id)}
                        style={{
                          background: "rgba(252,92,125,0.1)",
                          border: "1px solid rgba(252,92,125,0.3)",
                          color: "#fc5c7d",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminPage;
