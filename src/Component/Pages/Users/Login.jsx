// ─────────────────────────────────────────────
//  Login.jsx  —  Login / Signup Page (UI Only)
//  All logic is in auth.js
// ─────────────────────────────────────────────

import React, { useState, useEffect } from "react";
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
    icon: "🧍",
    className: "card-individual",
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
    icon: "👥",
    className: "card-member",
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
    icon: "🏢",
    className: "card-agent",
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

// ── Floating Particles ────────────────────────
function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size:   Math.random() * 4 + 2,
    left:   Math.random() * 100,
    delay:  Math.random() * 12,
    duration: Math.random() * 14 + 10,
    color: ["var(--teal)", "var(--violet)", "var(--gold)"][i % 3],
  }));
  return (
    <div className="particles">
      {dots.map((d) => (
        <div
          key={d.id}
          className="particle"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.left}%`,
            background: d.color,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Feature Item ──────────────────────────────
function FeatureItem({ text }) {
  return (
    <div className="feature-item">
      <span className="feature-dot" />
      <span>{text}</span>
    </div>
  );
}

// ── Auth Modal ────────────────────────────────
function AuthModal({ type, role, onClose, onSuccess }) {
  const [mode, setMode]         = useState(type); // "login" | "signup" | "otp"
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp]           = useState(["", "", "", "", "", ""]);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  const roleLabel = USER_TYPES.find((u) => u.key === role)?.label || role;

  function handleOtpChange(index, value) {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
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
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-top">
          <h3>
            {mode === "login"   && "Welcome Back"}
            {mode === "signup"  && "Create Account"}
            {mode === "otp"     && "Verify Email"}
          </h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="role-badge">
          {USER_TYPES.find((u) => u.key === role)?.icon} {roleLabel} Account
        </div>

        {error   && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        {/* ── OTP MODE ── */}
        {mode === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 8 }}>
              Enter the 6-digit code sent to your email.
            </p>
            <div className="otp-inputs">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  className="form-group otp-input"
                  style={{ width: 52, textAlign: "center" }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                />
              ))}
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : "Verify OTP"}
            </button>
          </form>
        )}

        {/* ── LOGIN MODE ── */}
        {mode === "login" && (
          <>
            <button className="btn-google" type="button" onClick={handleGoogleSignIn}>
              <span className="google-icon" />
              Continue with Google
            </button>
            <div className="divider">or</div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Sign In →"}
              </button>
            </form>
            <div className="toggle-auth">
              Don't have an account?
              <button onClick={() => { setMode("signup"); setError(""); }}>Sign Up</button>
            </div>
          </>
        )}

        {/* ── SIGNUP MODE ── */}
        {mode === "signup" && (
          <>
            <button className="btn-google" type="button" onClick={handleGoogleSignIn}>
              <span className="google-icon" />
              Sign up with Google
            </button>
            <div className="divider">or</div>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
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
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : "Create Account →"}
              </button>
            </form>
            <div className="toggle-auth">
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
    <div className={`user-type-card ${data.className}`}>
      <div className="card-header">
        <div className="card-icon">{data.icon}</div>
        <div className="card-title-wrap">
          <h2>{data.label}</h2>
          <p className="card-subtitle">{data.subtitle}</p>
        </div>
      </div>

      <div className="feature-list">
        {data.features.map((f, i) => (
          <FeatureItem key={i} text={f} />
        ))}
      </div>

      <div className="card-actions">
        <button
          className="btn btn-primary"
          onClick={() => onAction("login", data.key)}
        >
          Login as {data.label}
        </button>
        <button
          className="btn btn-outline"
          onClick={() => onAction("signup", data.key)}
        >
          Sign Up as {data.label}
        </button>
        {isMember && (
          <button className="btn btn-membership" onClick={handleMembership}>
            ✦ Buy Membership
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
      // Already logged in — trigger payment flow
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
      <Particles />

      {/* Header */}
      <header className="login-header">
        <div className="logo-wrap">
          <div className="logo-icon">🌐</div>
          <div className="logo-text">Visa<span>Gate</span></div>
        </div>
        <span className="header-tagline">Your global visa processing partner</span>
      </header>

      {/* Hero */}
      <section className="login-hero">
        <div className="hero-badge">Trusted by 50,000+ travelers</div>
        <h1>
          Your Visa Journey<br />
          Starts <span className="accent">Here</span>
        </h1>
        <p>
          Choose your account type below to get started with fast, transparent,
          and hassle-free visa applications worldwide.
        </p>
      </section>

      {/* User Type Cards */}
      <section className="user-types-grid">
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