import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/mine");
        setBookings(res.data.data.bookings);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const approved = bookings.filter((b) => b.status === "approved").length;
  const rejected = bookings.filter((b) => b.status === "rejected").length;

  const stats = [
    {
      label: "My Bookings",
      value: loading ? "..." : total,
      icon: "📅",
      color: "#6c63ff",
    },
    {
      label: "Pending",
      value: loading ? "..." : pending,
      icon: "⏳",
      color: "#f6ad55",
    },
    {
      label: "Approved",
      value: loading ? "..." : approved,
      icon: "✅",
      color: "#48bb78",
    },
    {
      label: "Rejected",
      value: loading ? "..." : rejected,
      icon: "❌",
      color: "#fc5c7d",
    },
  ];

  return (
    <MainLayout>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ color: "#fff", fontWeight: 700 }}>
          Welcome back, {user?.name} 👋
        </h2>
        <p style={{ color: "#a0aec0", marginTop: "4px" }}>
          {user?.email} ·{" "}
          <span
            style={{
              background: "rgba(108,99,255,0.15)",
              color: "#6c63ff",
              padding: "2px 10px",
              borderRadius: "20px",
              fontSize: "0.8rem",
            }}
          >
            {user?.role}
          </span>
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {stats.map((s) => (
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

      {/* Profile Card */}
      <div
        style={{
          background: "#21253a",
          border: "1px solid #2d3250",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "400px",
        }}
      >
        <h5 style={{ color: "#fff", marginBottom: "16px" }}>Profile Info</h5>
        {[
          { label: "Name", value: user?.name },
          { label: "Email", value: user?.email },
          { label: "Role", value: user?.role },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #2d3250",
            }}
          >
            <span style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
              {item.label}
            </span>
            <span style={{ color: "#fff", fontSize: "0.9rem" }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
