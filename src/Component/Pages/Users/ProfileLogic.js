// ─────────────────────────────────────────────
//  Profile.js  —  All Profile Logic & State
//  No JSX here — purely logic, data, constants
// ─────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { getSession, saveDocuments, getDocuments, updateProfile, logout } from "./Auth.js";

// ── Document Requirements Per Role ───────────
export const DOCUMENT_REQUIREMENTS = {
  individual: [
    { key: "passport",  label: "Passport",    icon: "🛂", required: true  },
    { key: "aadhaar",   label: "Aadhaar Card", icon: "🪪", required: true  },
    { key: "pan",       label: "PAN Card",     icon: "💳", required: true  },
  ],
  member: [
    { key: "passport",  label: "Passport",    icon: "🛂", required: true  },
    { key: "aadhaar",   label: "Aadhaar Card", icon: "🪪", required: true  },
    { key: "pan",       label: "PAN Card",     icon: "💳", required: true  },
  ],
  agent: [
    { key: "gst",       label: "GST Certificate",        icon: "📜", required: true  },
    { key: "pan",       label: "PAN Card",                icon: "💳", required: true  },
    { key: "aadhaar",   label: "Aadhaar Card",            icon: "🪪", required: true  },
    { key: "address",   label: "Office Address Proof",    icon: "🏢", required: true  },
    { key: "bank",      label: "Bank Statement (6 months)", icon: "🏦", required: false },
  ],
};

// ── Role Display Config ───────────────────────
export const ROLE_CONFIG = {
  individual: { label: "Individual",  color: "var(--teal)",   icon: "🧍" },
  member:     { label: "Member",      color: "var(--violet)", icon: "👥" },
  agent:      { label: "Agent",       color: "var(--gold)",   icon: "🏢" },
};

// ── Convert image/photo to PDF blob (mock) ────
export function convertImageToPdfBlob(imageDataUrl) {
  // In production integrate jspdf or similar
  // For now, return a Blob with a marker indicating PDF conversion
  const pdfContent = `%PDF-1.4 mock [converted from image]\n${imageDataUrl.substring(0, 100)}`;
  return new Blob([pdfContent], { type: "application/pdf" });
}

// ── Format file size ──────────────────────────
export function formatFileSize(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1048576)    return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

// ── Build file preview info ───────────────────
export function buildFileInfo(file) {
  return {
    name: file.name,
    size: formatFileSize(file.size),
    type: file.type,
    url:  URL.createObjectURL(file),
  };
}

// ════════════════════════════════════════════════
//  useProfileState — main profile hook
// ════════════════════════════════════════════════
export function useProfileState(onLogout) {
  const session = getSession();

  // ── Core State ─────────────────────────────
  const [user,            setUser]            = useState(session);
  const [showWelcome,     setShowWelcome]     = useState(!session?.profileComplete);
  const [editMode,        setEditMode]        = useState(false);
  const [activeTab,       setActiveTab]       = useState("overview");
  const [uploading,       setUploading]       = useState(false);
  const [saveSuccess,     setSaveSuccess]     = useState(false);
  const [cameraActive,    setCameraActive]    = useState(false);
  const [cameraDocKey,    setCameraDocKey]    = useState(null);
  const [docFiles,        setDocFiles]        = useState({});
  const [uploadedDocs,    setUploadedDocs]    = useState(getDocuments(session?.email) || {});
  const [editName,        setEditName]        = useState(session?.name || "");
  const [editPhone,       setEditPhone]       = useState("");
  const [editCity,        setEditCity]        = useState("");
  const videoRef  = useRef(null);
  const streamRef = useRef(null);

  const docRequirements = DOCUMENT_REQUIREMENTS[user?.role] || [];
  const roleConfig      = ROLE_CONFIG[user?.role] || {};

  // ── Welcome dismiss ─────────────────────────
  function dismissWelcome() { setShowWelcome(false); }

  // ── Handle file pick ────────────────────────
  function handleFilePick(docKey, file) {
    if (!file) return;
    const info = buildFileInfo(file);
    setDocFiles((prev) => ({ ...prev, [docKey]: { file, info } }));
  }

  // ── Open camera ─────────────────────────────
  async function openCamera(docKey) {
    setCameraDocKey(docKey);
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      alert("Camera access denied or unavailable.");
      setCameraActive(false);
    }
  }

  // ── Capture photo & convert to PDF blob ─────
  function capturePhoto() {
    if (!videoRef.current || !cameraDocKey) return;
    const canvas  = document.createElement("canvas");
    canvas.width  = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");
    const pdfBlob = convertImageToPdfBlob(dataUrl);
    const file    = new File([pdfBlob], `${cameraDocKey}_photo.pdf`, { type: "application/pdf" });
    const info    = buildFileInfo(file);
    setDocFiles((prev) => ({ ...prev, [cameraDocKey]: { file, info } }));
    closeCamera();
  }

  // ── Close camera ────────────────────────────
  function closeCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setCameraActive(false);
    setCameraDocKey(null);
  }

  // ── Upload all docs ──────────────────────────
  async function handleUploadDocuments() {
    const requiredKeys = docRequirements.filter((d) => d.required).map((d) => d.key);
    const missing = requiredKeys.filter((k) => !docFiles[k] && !uploadedDocs[k]);
    if (missing.length) {
      alert(`Please upload: ${missing.join(", ")}`);
      return;
    }
    setUploading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const docsToSave = {};
    Object.entries(docFiles).forEach(([key, { info }]) => {
      docsToSave[key] = { name: info.name, size: info.size, uploadedAt: new Date().toISOString() };
    });

    const result = saveDocuments(user.email, docsToSave);
    setUploading(false);
    if (result.success) {
      setUploadedDocs((prev) => ({ ...prev, ...docsToSave }));
      setSaveSuccess(true);
      setShowWelcome(false);
      setUser((prev) => ({ ...prev, profileComplete: true }));
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  }

  // ── Save profile edits ───────────────────────
  async function handleSaveProfile() {
    setUploading(true);
    await new Promise((r) => setTimeout(r, 600));
    updateProfile(user.email, { name: editName });
    setUser((prev) => ({ ...prev, name: editName }));
    setUploading(false);
    setEditMode(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  }

  // ── Logout ───────────────────────────────────
  function handleLogout() {
    logout();
    if (onLogout) onLogout();
  }

  return {
    user,
    showWelcome, dismissWelcome,
    editMode, setEditMode,
    activeTab, setActiveTab,
    uploading, saveSuccess,
    cameraActive, videoRef,
    cameraDocKey,
    docFiles, uploadedDocs,
    editName,  setEditName,
    editPhone, setEditPhone,
    editCity,  setEditCity,
    docRequirements, roleConfig,
    handleFilePick,
    openCamera, capturePhoto, closeCamera,
    handleUploadDocuments,
    handleSaveProfile,
    handleLogout,
  };
}