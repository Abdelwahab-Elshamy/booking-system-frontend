import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f1117" }}>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#1a1d27",
          borderBottom: "1px solid #2d3250",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "1.3rem" }}>🏨</span>
          <span
            style={{ color: "#6c63ff", fontWeight: 700, fontSize: "1.1rem" }}
          >
            BookingSystem
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              style={{
                color: "#a0aec0",
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "0.9rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.color = "#fff";
                e.target.style.background = "#2d3250";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#a0aec0";
                e.target.style.background = "transparent";
              }}
            >
              🛠️ Admin
            </Link>
          )}
          <Link
            to="/dashboard"
            style={{
              color: "#a0aec0",
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#fff";
              e.target.style.background = "#2d3250";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#a0aec0";
              e.target.style.background = "transparent";
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/bookings"
            style={{
              color: "#a0aec0",
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#fff";
              e.target.style.background = "#2d3250";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#a0aec0";
              e.target.style.background = "transparent";
            }}
          >
            My Bookings
          </Link>

          {/* User + Logout */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginLeft: "8px",
            }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                background: "linear-gradient(135deg, #6c63ff, #574fd6)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid #2d3250",
                color: "#a0aec0",
                padding: "6px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "0.85rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#fc5c7d";
                e.target.style.color = "#fc5c7d";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#2d3250";
                e.target.style.color = "#a0aec0";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main style={{ padding: "32px 24px" }}>{children}</main>
    </div>
  );
};

export default MainLayout;
