import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import api from "../services/api";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      dispatch(setCredentials(res.data.data));
      toast.success("Logged in successfully! 🎉");
      const role = res.data.data.user.role;
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.data?.message || "Something went wrong");
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
          <h2 style={{ color: "#fff", fontWeight: 700 }}>BookingSystem</h2>
          <p style={{ color: "#a0aec0", fontSize: "0.9rem" }}>
            Sign in to your account
          </p>
        </div>

        <div
          style={{
            background: "#21253a",
            borderRadius: "16px",
            border: "1px solid #2d3250",
            padding: "32px",
          }}
        >
          <form onSubmit={handleSubmit}>
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
              {loading ? "⏳ Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>

        <p
          className="text-center mt-3"
          style={{ color: "#a0aec0", fontSize: "0.9rem" }}
        >
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#6c63ff" }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
