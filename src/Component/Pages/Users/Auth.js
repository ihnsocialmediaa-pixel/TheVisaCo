// ─────────────────────────────────────────────
//  auth.js  —  Authentication & User ID Logic
// ─────────────────────────────────────────────

// In-memory user store (replace with API/DB in production)
const users = {};

// Active session stored in sessionStorage
const SESSION_KEY = "visa_user_session";

// ── ID Generator ─────────────────────────────
export function generateUserId(role, name) {
  const prefixMap = { individual: "IND", member: "MEM", agent: "AGT" };
  const prefix = prefixMap[role] || "USR";
  const namePart = name.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${namePart}-${randomNum}`;
}

// ── OTP Generator ────────────────────────────
export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ── Signup ───────────────────────────────────
export function signupUser({ name, email, password, role }) {
  if (users[email]) {
    return { success: false, error: "Email already registered." };
  }
  const otp = generateOtp();
  const userId = generateUserId(role, name);
  users[email] = {
    name,
    email,
    password,
    role,
    userId,
    otp,
    verified: false,
    profileComplete: false,
    documents: {},
    membership: false,
    createdAt: new Date().toISOString(),
  };
  // In production: send OTP via email/SMS
  console.log(`[DEV] OTP for ${email}: ${otp}`);
  return { success: true, otp, userId };
}

// ── Verify OTP ───────────────────────────────
export function verifyOtp(email, inputOtp) {
  const user = users[email];
  if (!user) return { success: false, error: "User not found." };
  if (user.otp !== inputOtp) return { success: false, error: "Invalid OTP." };
  users[email].verified = true;
  return { success: true };
}

// ── Login ────────────────────────────────────
export function loginUser({ email, password }) {
  const user = users[email];
  if (!user) return { success: false, error: "No account found with this email." };
  if (!user.verified) return { success: false, error: "Please verify your email first." };
  if (user.password !== password) return { success: false, error: "Incorrect password." };

  const session = {
    name: user.name,
    email: user.email,
    role: user.role,
    userId: user.userId,
    profileComplete: user.profileComplete,
    membership: user.membership,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

// ── Google Sign-In (mock) ─────────────────────
export function googleSignIn(role) {
  const mockProfile = {
    name: "Google User",
    email: `google_${Date.now()}@gmail.com`,
    password: "google_oauth",
    role,
  };
  const existing = Object.values(users).find((u) => u.email === mockProfile.email);
  if (!existing) {
    users[mockProfile.email] = {
      ...mockProfile,
      userId: generateUserId(role, mockProfile.name),
      verified: true,
      profileComplete: false,
      documents: {},
      membership: false,
      createdAt: new Date().toISOString(),
    };
  }
  const user = users[mockProfile.email];
  const session = {
    name: user.name,
    email: user.email,
    role: user.role,
    userId: user.userId,
    profileComplete: user.profileComplete,
    membership: user.membership,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

// ── Session Helpers ───────────────────────────
export function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

// ── Document Upload (mock) ───────────────────
export function saveDocuments(email, documents) {
  if (!users[email]) return { success: false, error: "User not found." };
  users[email].documents = { ...users[email].documents, ...documents };
  users[email].profileComplete = true;

  const session = getSession();
  if (session) {
    session.profileComplete = true;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return { success: true };
}

export function getDocuments(email) {
  return users[email]?.documents || {};
}

// ── Membership ────────────────────────────────
export function activateMembership(email) {
  if (!users[email]) return { success: false, error: "User not found." };
  users[email].membership = true;
  const session = getSession();
  if (session) {
    session.membership = true;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return { success: true };
}

// ── Profile Update ────────────────────────────
export function updateProfile(email, updates) {
  if (!users[email]) return { success: false, error: "User not found." };
  users[email] = { ...users[email], ...updates };
  const session = getSession();
  if (session) {
    Object.assign(session, {
      name: updates.name || session.name,
    });
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return { success: true };
}