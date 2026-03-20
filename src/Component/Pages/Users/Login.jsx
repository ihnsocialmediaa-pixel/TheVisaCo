// ─────────────────────────────────────────────
//  Login.jsx  —  Login / Signup Page (UI Only)
//  All logic is in Auth.js
//  All class names prefixed with "login-"
// ─────────────────────────────────────────────

import React, { useState } from "react";
import "./Login.css";
import {
  loginUser,
  signupUser,
  verifyOtp,
  googleSignIn,
  getSession,
} from "./Auth.js";

// ── User Type Data ────────────────────────────
const USER_TYPES = [
  {
    key: "individual",
    label: "Individual",
    categoryLabel: "Personal",
    subtitle: "Apply for visas personally — solo or small group travel.",
    features: [
      "Apply for one or multiple visas easily",
      "Simple and quick guided process",
      "Track applications in real-time",
      "Access exclusive discounts",
    ],
    showMembership: false,
  },
  {
    key: "member",
    label: "Member",
    categoryLabel: "Premium",
    subtitle: "For group or repeated visa applications at a premium tier.",
    features: [
      "Apply for multiple visas at once",
      "Manage all applications in one dashboard",
      "Faster processing for repeat users",
      "Special pricing & priority support",
    ],
    showMembership: true,
  },
  {
    key: "agent",
    label: "Agent",
    categoryLabel: "Business",
    subtitle: "Registered agencies handling bulk visa applications.",
    features: [
      "Bulk visa application handling",
      "Dedicated agent dashboard",
      "Higher commission & discounts",
      "Priority processing guarantee",
    ],
    showMembership: false,
  },
];

// ── Feature Item ──────────────────────────────
function FeatureItem({ text }) {
  return (
    <div className="login-feature-item">
      <span className="login-feature-dot" />
      <span>{text}</span>
    </div>
  );
}

// ── Auth Modal ────────────────────────────────
function AuthModal({ type, role, onClose, onSuccess }) {
  const [mode, setMode]               = useState(type); // "login" | "signup" | "otp"
  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [otp, setOtp]                 = useState(["", "", "", "", "", ""]);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState("");
  const [loading, setLoading]         = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  const roleLabel = USER_TYPES.find((u) => u.key === role)?.label || role;

  function handleOtpChange(index, value) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      document.getElementById(`login-otp-${index + 1}`)?.focus();
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`login-otp-${index - 1}`)?.focus();
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = loginUser({ email, password });
    setLoading(false);
    if (!result.success) { setError(result.error); return; }
    onSuccess(result.user);
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = signupUser({ name, email, password, role });
    setLoading(false);
    if (!result.success) { setError(result.error); return; }
    setSignupEmail(email);
    setSuccess(`OTP sent to ${email} — [DEV: ${result.otp}]`);
    setMode("otp");
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    const otpStr = otp.join("");
    if (otpStr.length < 6) { setError("Enter all 6 digits."); return; }
    setError(""); setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const result = verifyOtp(signupEmail, otpStr);
    setLoading(false);
    if (!result.success) { setError(result.error); return; }
    setSuccess("Email verified! You can now log in.");
    setTimeout(() => { setMode("login"); setSuccess(""); }, 1500);
  }

  function handleGoogleSignIn() {
    const result = googleSignIn(role);
    if (result.success) onSuccess(result.user);
  }

  return (
    <div
      className="login-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="login-modal-box">
        <div className="login-modal-top">
          <h3>
            {mode === "login"  && "Welcome Back"}
            {mode === "signup" && "Create Account"}
            {mode === "otp"    && "Verify Email"}
          </h3>
          <button className="login-modal-close" onClick={onClose}>
            &#215;
          </button>
        </div>

        <div className="login-role-badge">{roleLabel} Account</div>

        {error   && <div className="login-form-error">{error}</div>}
        {success && <div className="login-form-success">{success}</div>}

        {/* ── OTP MODE ── */}
        {mode === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <p style={{ color: "#666666", fontSize: 14, marginBottom: 8, fontFamily: "inherit" }}>
              Enter the 6-digit code sent to your email.
            </p>
            <div className="login-otp-inputs">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`login-otp-${i}`}
                  className="login-form-group login-otp-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                />
              ))}
            </div>
            <button className="login-btn login-btn-primary" type="submit" disabled={loading}>
              {loading ? <span className="login-spinner" /> : "Verify OTP"}
            </button>
          </form>
        )}

        {/* ── LOGIN MODE ── */}
        {mode === "login" && (
          <>
            <button className="login-btn-google" type="button" onClick={handleGoogleSignIn}>
              <span className="login-google-icon" />
              Continue with Google
            </button>
            <div className="login-divider">or</div>
            <form onSubmit={handleLogin}>
              <div className="login-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="login-btn login-btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="login-spinner" /> : "Sign In →"}
              </button>
            </form>
            <div className="login-toggle-auth">
              Don't have an account?
              <button onClick={() => { setMode("signup"); setError(""); }}>Sign Up</button>
            </div>
          </>
        )}

        {/* ── SIGNUP MODE ── */}
        {mode === "signup" && (
          <>
            <button className="login-btn-google" type="button" onClick={handleGoogleSignIn}>
              <span className="login-google-icon" />
              Sign up with Google
            </button>
            <div className="login-divider">or</div>
            <form onSubmit={handleSignup}>
              <div className="login-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="login-form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <button className="login-btn login-btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="login-spinner" /> : "Create Account →"}
              </button>
            </form>
            <div className="login-toggle-auth">
              Already have an account?
              <button onClick={() => { setMode("login"); setError(""); }}>Sign In</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── User Type Card ────────────────────────────
function UserTypeCard({ data, onAction }) {
  const session = getSession();
  const isMember = data.key === "member";

  function handleMembership() {
    if (!session) {
      onAction("login", data.key);
    } else {
      onAction("membership", data.key);
    }
  }

  return (
    <div className="login-user-type-card">
      <div className="login-card-header">
        <div className="login-card-label">{data.categoryLabel}</div>
        <h2>{data.label}</h2>
        <p className="login-card-subtitle">{data.subtitle}</p>
      </div>

      <div className="login-card-divider" />

      <div className="login-feature-list">
        {data.features.map((f, i) => (
          <FeatureItem key={i} text={f} />
        ))}
      </div>

      <div className="login-card-actions">
        <button
          className="login-btn login-btn-primary"
          onClick={() => onAction("login", data.key)}
        >
          Login as {data.label}
        </button>
        <button
          className="login-btn login-btn-outline"
          onClick={() => onAction("signup", data.key)}
        >
          Sign Up as {data.label}
        </button>
        {isMember && (
          <button className="login-btn login-btn-membership" onClick={handleMembership}>
            Buy Membership
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Login Page ───────────────────────────
export default function Login({ onLoginSuccess }) {
  const [modal, setModal] = useState(null); // { type, role }

  function handleAction(type, role) {
    if (type === "membership") {
      alert("Redirecting to payment... (integrate payment gateway here)");
      return;
    }
    setModal({ type, role });
  }

  function handleSuccess(user) {
    setModal(null);
    if (onLoginSuccess) onLoginSuccess(user);
  }

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <div className="login-logo-wrap">
          <div className="login-logo-text">Visa<span>Gate</span></div>
        </div>
        <span className="login-header-tagline">Your global visa processing partner</span>
      </header>

      {/* Hero */}
      <section className="login-hero">
        
        <h1>
          Your Visa Journey<br />
          Starts <span className="login-accent">Here</span>
        </h1>
        <p>
          Choose your account type below to get started 
        </p>
      </section>

      {/* User Type Cards */}
      <section className="login-user-types-grid">
        {USER_TYPES.map((ut) => (
          <UserTypeCard key={ut.key} data={ut} onAction={handleAction} />
        ))}
      </section>

      {/* Auth Modal */}
      {modal && (
        <AuthModal
          type={modal.type}
          role={modal.role}
          onClose={() => setModal(null)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}