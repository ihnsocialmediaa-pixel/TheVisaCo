// ─────────────────────────────────────────────
//  Profile.jsx  —  Profile Page (UI Only)
//  All state & logic is imported from ProfileLogic.js
// ─────────────────────────────────────────────

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useProfileState } from "./ProfileLogic.js";

// ── Sidebar Nav Items ─────────────────────────
const NAV_ITEMS = [
  { key: "overview",   icon: "⊞",  label: "Overview"   },
  { key: "documents",  icon: "📁", label: "Documents"  },
  { key: "settings",   icon: "⚙️", label: "Settings"   },
];

// ── Stat Card ─────────────────────────────────
function StatCard({ icon, value, label, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: `${color}1a`, color }}>
        {icon}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

// ── Doc Card ──────────────────────────────────
function DocCard({ doc, uploaded, staged, onFilePick, onCamera }) {
  const fileInputRef = useRef();
  const isUploaded = !!uploaded;
  const isStaged   = !!staged;

  return (
    <div className={`doc-card ${isUploaded ? "uploaded" : ""}`}>
      <div className="doc-card-top">
        <div className="doc-card-icon">{doc.icon}</div>
        <div className="doc-card-label">{doc.label}</div>
        {isUploaded
          ? <span className="doc-badge done">✓ Done</span>
          : doc.required
            ? <span className="doc-badge required">Required</span>
            : <span className="doc-badge optional">Optional</span>
        }
      </div>

      {isStaged && (
        <div className="doc-file-preview">
          📎 {staged.info.name} — {staged.info.size}
        </div>
      )}
      {isUploaded && !isStaged && (
        <div className="doc-file-preview" style={{ color: "var(--green)" }}>
          ✓ {uploaded.name}
          <span style={{ color: "var(--text-muted)", marginLeft: "auto" }}>
            {uploaded.size}
          </span>
        </div>
      )}

      <div className="doc-actions">
        <button className="doc-btn" onClick={() => fileInputRef.current?.click()}>
          📤 Upload File
        </button>
        <button className="doc-btn camera-btn" onClick={() => onCamera(doc.key)}>
          📷 Photo
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: "none" }}
        onChange={(e) => onFilePick(doc.key, e.target.files?.[0])}
      />
    </div>
  );
}

// ── Camera Modal ──────────────────────────────
function CameraModal({ videoRef, onCapture, onClose }) {
  return (
    <div className="camera-modal">
      <p style={{ color: "var(--teal)", fontFamily: "'Syne', sans-serif", fontSize: 16 }}>
        📷 Position your document in the frame
      </p>
      <video ref={videoRef} autoPlay muted className="camera-video" />
      <div className="camera-controls">
        <button className="btn btn-primary" onClick={onCapture}>
          ⊙ Capture
        </button>
        <button className="btn btn-outline" onClick={onClose}>
          ✕ Cancel
        </button>
      </div>
    </div>
  );
}

// ── Welcome Document Upload Modal ─────────────
function WelcomeModal({
  user, roleConfig, docRequirements,
  docFiles, uploadedDocs,
  uploading, onFilePick, onCamera, onSubmit, onSkip,
}) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <div className="welcome-header">
          <span className="welcome-emoji">👋</span>
          <h2>Welcome, {user?.name?.split(" ")[0]}!</h2>
          <p>
            To get started, please upload your required documents. This keeps your profile
            verified and speeds up every future application.
          </p>
        </div>

        <div className="docs-grid">
          {docRequirements.map((doc) => (
            <DocCard
              key={doc.key}
              doc={doc}
              uploaded={uploadedDocs[doc.key]}
              staged={docFiles[doc.key]}
              onFilePick={onFilePick}
              onCamera={onCamera}
            />
          ))}
        </div>

        <div className="upload-submit-bar">
          <p>
            {Object.keys(docFiles).length} of{" "}
            {docRequirements.filter((d) => d.required).length} required docs selected
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-outline btn-sm" onClick={onSkip}>
              Skip for now
            </button>
            <button
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={uploading}
            >
              {uploading ? <span className="spinner" /> : "Save Documents →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Overview Tab ──────────────────────────────
function OverviewTab({ user, roleConfig, editMode, editName, editPhone, editCity, setEditName, setEditPhone, setEditCity, onEdit, onSave, uploading }) {
  return (
    <>
      <div className="stats-row">
        <StatCard icon="🛂" value="0"  label="Active Applications" color="var(--teal)"   />
        <StatCard icon="✅" value="0"  label="Approved Visas"       color="var(--green)"  />
        <StatCard icon="⏳" value="0"  label="Pending Review"       color="var(--gold)"   />
      </div>

      <div className="info-card">
        <div className="info-card-header">
          <h3>Profile Information</h3>
          {!editMode
            ? <button className="btn btn-outline btn-sm" onClick={onEdit}>✏️ Edit Profile</button>
            : (
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-outline btn-sm" onClick={() => onEdit(false)}>Cancel</button>
                <button className="btn btn-primary btn-sm" onClick={onSave} disabled={uploading}>
                  {uploading ? <span className="spinner" /> : "Save"}
                </button>
              </div>
            )
          }
        </div>

        <div className="info-grid">
          <div className="info-field">
            <label>Full Name</label>
            {editMode
              ? <input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Your name" />
              : <div className="field-value">{user?.name || "—"}</div>
            }
          </div>

          <div className="info-field">
            <label>Email</label>
            <div className="field-value">{user?.email || "—"}</div>
          </div>

          <div className="info-field">
            <label>Phone</label>
            {editMode
              ? <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="+91 98765 43210" />
              : <div className="field-value">{editPhone || "—"}</div>
            }
          </div>

          <div className="info-field">
            <label>City</label>
            {editMode
              ? <input value={editCity} onChange={(e) => setEditCity(e.target.value)} placeholder="Mumbai" />
              : <div className="field-value">{editCity || "—"}</div>
            }
          </div>

          <div className="info-field">
            <label>Account Type</label>
            <div className="field-value">
              <span style={{ color: roleConfig.color }}>{roleConfig.icon} {roleConfig.label}</span>
            </div>
          </div>

          <div className="info-field">
            <label>User ID</label>
            <div className="field-value">
              <span className="uid-chip">{user?.userId}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Documents Tab ─────────────────────────────
function DocumentsTab({ docRequirements, docFiles, uploadedDocs, uploading, onFilePick, onCamera, onSubmit }) {
  return (
    <>
      <div className="docs-grid">
        {docRequirements.map((doc) => (
          <DocCard
            key={doc.key}
            doc={doc}
            uploaded={uploadedDocs[doc.key]}
            staged={docFiles[doc.key]}
            onFilePick={onFilePick}
            onCamera={onCamera}
          />
        ))}
      </div>

      <div className="upload-submit-bar">
        <p>Keep your documents updated for faster processing.</p>
        <button className="btn btn-primary" onClick={onSubmit} disabled={uploading}>
          {uploading ? <span className="spinner" /> : "💾 Save Documents"}
        </button>
      </div>
    </>
  );
}

// ── Settings Tab ──────────────────────────────
function SettingsTab({ user, onLogout }) {
  return (
    <div className="info-card">
      <div className="info-card-header">
        <h3>Account Settings</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="info-field">
          <label>Account Status</label>
          <div className="field-value" style={{ color: "var(--green)" }}>● Active & Verified</div>
        </div>
        <div className="info-field">
          <label>Membership</label>
          <div className="field-value">{user?.membership ? "✦ Premium Member" : "Free Tier"}</div>
        </div>
        <div className="info-field">
          <label>Notifications</label>
          <div className="field-value">Email — Enabled</div>
        </div>
        <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          <button className="btn btn-outline" onClick={onLogout} style={{ color: "var(--rose)", borderColor: "rgba(251,113,133,0.3)" }}>
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Profile Page ─────────────────────────
export default function Profile({ onLogout }) {
  const navigate = useNavigate();   // ← added

  // Wrap logout so it also redirects to /login
  function handleLogoutAndRedirect() {
    if (onLogout) onLogout();
    navigate("/");
  }

  const {
    user,
    showWelcome, dismissWelcome,
    editMode, setEditMode,
    activeTab, setActiveTab,
    uploading, saveSuccess,
    cameraActive, videoRef,
    docFiles, uploadedDocs,
    editName, setEditName,
    editPhone, setEditPhone,
    editCity, setEditCity,
    docRequirements, roleConfig,
    handleFilePick,
    openCamera, capturePhoto, closeCamera,
    handleUploadDocuments,
    handleSaveProfile,
    handleLogout,
  } = useProfileState(handleLogoutAndRedirect);  // ← pass redirect logout

  if (!user) {
    return (
      <div className="profile-page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Not logged in.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Welcome Doc Upload Overlay */}
      {showWelcome && (
        <WelcomeModal
          user={user}
          roleConfig={roleConfig}
          docRequirements={docRequirements}
          docFiles={docFiles}
          uploadedDocs={uploadedDocs}
          uploading={uploading}
          onFilePick={handleFilePick}
          onCamera={openCamera}
          onSubmit={handleUploadDocuments}
          onSkip={dismissWelcome}
        />
      )}

      {/* Camera Modal */}
      {cameraActive && (
        <CameraModal
          videoRef={videoRef}
          onCapture={capturePhoto}
          onClose={closeCamera}
        />
      )}

      {/* Success Toast */}
      {saveSuccess && (
        <div className="success-toast">✓ Changes saved successfully</div>
      )}

      {/* Top Nav */}
      <nav className="profile-nav">
        <div className="nav-logo">Visa<span>Gate</span></div>
        <div className="nav-user-id">{user.userId}</div>
        <div className="nav-right">
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="profile-layout">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="avatar-block">
            <div className="avatar-ring">
              <div className="avatar-inner">
                {roleConfig.icon}
              </div>
            </div>
            <div className="avatar-name">{user.name}</div>
            <div className="avatar-role" style={{ borderColor: `${roleConfig.color}33`, color: roleConfig.color }}>
              {roleConfig.icon} {roleConfig.label}
            </div>
          </div>

          {NAV_ITEMS.map((item) => (
            <div
              key={item.key}
              className={`sidebar-nav-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}

          <div className="sidebar-divider" />

          <div className="sidebar-logout" onClick={handleLogout}>
            <span className="sidebar-nav-icon">🚪</span>
            Sign Out
          </div>
        </aside>

        {/* Main */}
        <main className="profile-main">
          <div className="section-header">
            <h2>
              {activeTab === "overview"  && "Dashboard"}
              {activeTab === "documents" && "My Documents"}
              {activeTab === "settings"  && "Settings"}
            </h2>
            <p>
              {activeTab === "overview"  && `Welcome back, ${user.name?.split(" ")[0]}`}
              {activeTab === "documents" && "Upload and manage your verification documents"}
              {activeTab === "settings"  && "Manage your account preferences"}
            </p>
          </div>

          {activeTab === "overview" && (
            <OverviewTab
              user={user}
              roleConfig={roleConfig}
              editMode={editMode}
              editName={editName}
              editPhone={editPhone}
              editCity={editCity}
              setEditName={setEditName}
              setEditPhone={setEditPhone}
              setEditCity={setEditCity}
              onEdit={(v) => setEditMode(v !== false ? true : false)}
              onSave={handleSaveProfile}
              uploading={uploading}
            />
          )}

          {activeTab === "documents" && (
            <DocumentsTab
              docRequirements={docRequirements}
              docFiles={docFiles}
              uploadedDocs={uploadedDocs}
              uploading={uploading}
              onFilePick={handleFilePick}
              onCamera={openCamera}
              onSubmit={handleUploadDocuments}
            />
          )}

          {activeTab === "settings" && (
            <SettingsTab user={user} onLogout={handleLogout} />
          )}
        </main>
      </div>
    </div>
  );
}