import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f1117 0%, #1a1d27 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 20px" }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <div
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #6c63ff, #574fd6)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "1.5rem",
            }}
          >
            🏨
          </div>
          <h2 style={{ color: "#fff", fontWeight: 700 }}>Create Account</h2>
          <p style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
            Join BookingSystem today
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#21253a",
            borderRadius: "16px",
            border: "1px solid #2d3250",
            padding: "32px",
          }}
        >
          {error && (
            <div
              style={{
                background: "rgba(252, 92, 125, 0.1)",
                border: "1px solid rgba(252, 92, 125, 0.3)",
                borderRadius: "8px",
                padding: "12px",
                color: "#fc5c7d",
                marginBottom: "20px",
                fontSize: "0.9rem",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
              style={{ padding: "12px", borderRadius: "8px", fontWeight: 600 }}
            >
              {loading ? "⏳ Creating..." : "Create Account →"}
            </button>
          </form>
        </div>

        <p
          className="text-center mt-3"
          style={{ color: "#a0aec0", fontSize: "0.9rem" }}
        >
          Already have an account?{" "}
          <a href="/login" style={{ color: "#6c63ff" }}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
