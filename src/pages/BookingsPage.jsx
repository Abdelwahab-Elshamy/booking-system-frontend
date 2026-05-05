import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { toast } from "react-toastify";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: "", details: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings/mine");
      setBookings(res.data.data.bookings);
    } catch {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/bookings", form);
      setShowModal(false);
      setForm({ date: "", details: "" });
      toast.success("Booking created successfully! 🎉");
    } catch {
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
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

  return (
    <MainLayout>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h2 style={{ color: "#fff", fontWeight: 700 }}>My Bookings</h2>
          <p style={{ color: "#a0aec0", marginTop: "4px" }}>
            {bookings.length} booking(s) total
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "linear-gradient(135deg, #6c63ff, #574fd6)",
            border: "none",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          + New Booking
        </button>
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

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#a0aec0" }}>
          Loading...
        </div>
      ) : bookings.length === 0 ? (
        <div
          style={{
            background: "#21253a",
            border: "1px solid #2d3250",
            borderRadius: "12px",
            padding: "60px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📅</div>
          <p style={{ color: "#a0aec0" }}>
            No bookings yet. Create your first one!
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "#21253a",
            border: "1px solid #2d3250",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1a1d27" }}>
                {["#", "Details", "Date", "Status", "Created"].map((h) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id} style={{ borderBottom: "1px solid #2d3250" }}>
                  <td style={{ padding: "16px 20px", color: "#a0aec0" }}>
                    {i + 1}
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
                  <td style={{ padding: "16px 20px", color: "#a0aec0" }}>
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#21253a",
              border: "1px solid #2d3250",
              borderRadius: "16px",
              padding: "32px",
              width: "100%",
              maxWidth: "460px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h5 style={{ color: "#fff", margin: 0 }}>New Booking</h5>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#a0aec0",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    color: "#a0aec0",
                    fontSize: "0.9rem",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label
                  style={{
                    color: "#a0aec0",
                    fontSize: "0.9rem",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Details
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.details}
                  onChange={(e) =>
                    setForm({ ...form, details: e.target.value })
                  }
                  placeholder="Booking details..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(135deg, #6c63ff, #574fd6)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {submitting ? "⏳ Creating..." : "Create Booking →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default BookingsPage;
