// booking.jsx  —  TheVisa · Country Visa Detail Page
import { useState, useEffect, useRef, useCallback } from "react";
import { getVisaData, rewardsData } from "./bookingdata";
import "./Booking.css";
import { useParams, useNavigate } from "react-router-dom";

// ─── LOGIN GATE IMPORT ────────────────────────────────────────────────────
import Login from "../Users/Login";
import { getSession } from "../Users/Auth";


// ─── LOGIN GATE MODAL ────────────────────────────────────────────────────
function LoginGate({ open, onClose, onSuccess }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  function handleLoginSuccess(user) {
    onSuccess(user);
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "lgFadeIn .2s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes lgFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes lgSlideUp { from { transform:translateY(28px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        .lg-inner { animation: lgSlideUp .32s cubic-bezier(.34,1.56,.64,1); }
      `}</style>

      <div
        className="lg-inner"
        style={{
          width: "100%",
          maxWidth: 520,
          maxHeight: "92vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          borderRadius: 24,
          boxShadow: "0 40px 100px rgba(0,0,0,.65)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16, right: 16,
            zIndex: 10,
            width: 36, height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.14)",
            color: "#aab",
            fontSize: 18,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            lineHeight: 1,
          }}
        >✕</button>

        <style>{`
          .lg-inner .login-page { min-height: unset !important; }
          .lg-inner .login-header { display: none !important; }
          .lg-inner .login-hero   { padding: 32px 24px 20px !important; }
          .lg-inner .user-types-grid {
            grid-template-columns: 1fr !important;
            padding: 0 20px 32px !important;
            gap: 16px !important;
          }
          .lg-inner .particles { display: none !important; }
          .lg-inner .login-page::before,
          .lg-inner .login-page::after { display: none !important; }
        `}</style>

        {/*
          Key change: onLoginSuccess here does NOT navigate to /profile.
          It just calls the local onSuccess so the booking page can
          run the pending action (navigate to /application-form).
        */}
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}


// ─── useLoginGate HOOK ────────────────────────────────────────────────────
function useLoginGate() {
  const [gateOpen,      setGateOpen]      = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [loggedInUser,  setLoggedInUser]  = useState(() => getSession());

  const requireLogin = useCallback((action) => {
    const session = getSession();
    if (session) {
      action(session);
    } else {
      setPendingAction(() => action);
      setGateOpen(true);
    }
  }, []);

  const handleLoginSuccess = useCallback((user) => {
    setLoggedInUser(user);
    setGateOpen(false);
    if (pendingAction) {
      pendingAction(user);
      setPendingAction(null);
    }
  }, [pendingAction]);

  const closeGate = useCallback(() => {
    setGateOpen(false);
    setPendingAction(null);
  }, []);

  return { gateOpen, loggedInUser, requireLogin, handleLoginSuccess, closeGate };
}


// ─── STEP ICONS ───────────────────────────────────────────────────────────
const STEP_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <path d="M9 7h6M9 11h6M9 15h4"/>
    <circle cx="16.5" cy="16.5" r="3.5"/>
    <path d="m18.5 18.5 1.5 1.5"/>
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7"/>
    <path d="m21 21-4.35-4.35M8 11h6M11 8v6"/>
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/>
    <path d="M5 21V7l7-4 7 4v14"/>
    <rect x="9" y="13" width="6" height="8"/>
    <path d="M9 9h.01M15 9h.01"/>
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <path d="M9 14l2 2 4-4"/>
  </svg>,
];

// ─── PLANE SVG ────────────────────────────────────────────────────────────
function PlaneSVG() {
  return (
    <svg width="60" height="28" viewBox="0 0 120 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0,2)">
        <ellipse cx="60" cy="26" rx="46" ry="11" fill="currentColor" opacity="0.88"/>
        <path d="M104 24 Q118 26 104 28Z" fill="currentColor" opacity="0.88"/>
        <path d="M14 26 Q6 16 14 6 L26 16Z" fill="currentColor" opacity="0.6"/>
        <path d="M58 19 L44 2 L76 12 L80 19Z" fill="currentColor" opacity="0.7"/>
        <path d="M58 33 L44 50 L76 40 L80 33Z" fill="currentColor" opacity="0.7"/>
        <circle cx="72" cy="25" r="2.5" fill="white" opacity="0.55"/>
        <circle cx="80" cy="25" r="2.5" fill="white" opacity="0.55"/>
        <circle cx="88" cy="25" r="2.5" fill="white" opacity="0.55"/>
        <ellipse cx="56" cy="15" rx="6" ry="3" fill="currentColor" opacity="0.4"/>
        <ellipse cx="56" cy="37" rx="6" ry="3" fill="currentColor" opacity="0.4"/>
      </g>
    </svg>
  );
}

// ─── RUNWAY PROCESS COMPONENT ─────────────────────────────────────────────
function RunwayProcess({ steps }) {
  const trackRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [planeLeft, setPlaneLeft] = useState(0);
  const [progWidth, setProgWidth] = useState(0);
  const [hintGone, setHintGone] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startLeft = useRef(0);

  const getPositions = useCallback(() => {
    if (!trackRef.current) return [];
    const w = trackRef.current.offsetWidth;
    return steps.map((_, i) => Math.round((i / (steps.length - 1)) * w));
  }, [steps]);

  const nearestStep = useCallback((x) => {
    const pos = getPositions();
    const w = trackRef.current?.offsetWidth ?? 0;
    x = Math.max(0, Math.min(w, x));
    return pos.reduce((best, p, i) => (Math.abs(x - p) < Math.abs(x - pos[best]) ? i : best), 0);
  }, [getPositions]);

  const snapToStep = useCallback((step) => {
    const pos = getPositions();
    if (!pos.length) return;
    setPlaneLeft(pos[step] - 30);
    setProgWidth(pos[step]);
    setActiveStep(step);
  }, [getPositions]);

  useEffect(() => { const t = setTimeout(() => snapToStep(0), 50); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const onResize = () => snapToStep(activeStep);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeStep, snapToStep]);

  useEffect(() => {
    const onMove = (cx) => {
      if (!dragging.current || !trackRef.current) return;
      const w = trackRef.current.offsetWidth;
      const nl = Math.max(-30, Math.min(w - 30, startLeft.current + cx - startX.current));
      setPlaneLeft(nl);
      setProgWidth(Math.max(0, Math.min(w, nl + 30)));
      setActiveStep(nearestStep(nl + 30));
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setPlaneLeft((prev) => { const s = nearestStep(prev + 30); snapToStep(s); return prev; });
    };
    window.addEventListener("mousemove", (e) => onMove(e.clientX));
    window.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX), { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", (e) => onMove(e.clientX));
      window.removeEventListener("touchmove", (e) => onMove(e.touches[0].clientX));
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [nearestStep, snapToStep]);

  const positions = getPositions();
  const onMouseDown = (e) => { dragging.current = true; startX.current = e.clientX; startLeft.current = planeLeft; if (!hintGone) setHintGone(true); };
  const onTouchStart = (e) => { dragging.current = true; startX.current = e.touches[0].clientX; startLeft.current = planeLeft; if (!hintGone) setHintGone(true); };

  return (
    <div className="rw-process">
      <div className="rw-labels">
        {steps.map((step, i) => (
          <div key={i} className="rw-lbl" style={{ left: positions[i] ?? 0 }} onClick={() => snapToStep(i)}>
            <div className={["rw-lbl__icon", i < activeStep ? "passed" : "", i === activeStep ? "active" : ""].filter(Boolean).join(" ")}>
              {STEP_ICONS[i] ?? STEP_ICONS[0]}
            </div>
            <div className="rw-lbl__title">{step.title}</div>
          </div>
        ))}
      </div>
      <div className="rw-track" ref={trackRef}>
        <div className="rw-prog" style={{ width: progWidth }} />
        <div className="rw-dash" />
        {positions.map((pos, i) => (
          <div key={i} className="rw-cp" style={{ left: pos }} onClick={() => snapToStep(i)}>
            <div className={`rw-cp__bar${i <= activeStep ? " passed" : ""}`} />
            <div className={["rw-cp__dot", i < activeStep ? "passed" : "", i === activeStep ? "active" : ""].filter(Boolean).join(" ")} />
          </div>
        ))}
        <div className="rw-plane" style={{ left: planeLeft, transition: dragging.current ? "none" : "left 0.4s cubic-bezier(0.25,0.8,0.25,1)" }} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
          <PlaneSVG />
          {!hintGone && <span className="rw-plane__hint">drag ›</span>}
        </div>
      </div>
      <div className="rw-nums">
        {positions.map((pos, i) => (
          <div key={i} className="rw-num-wrap" style={{ left: pos }} onClick={() => snapToStep(i)}>
            <div className={`rw-num${i <= activeStep ? " passed" : ""}`}>{i + 1}</div>
          </div>
        ))}
      </div>
      <div className="rw-info">
        <div className="rw-info__icon">{STEP_ICONS[activeStep] ?? STEP_ICONS[0]}</div>
        <div className="rw-info__body">
          <span className="rw-info__tag">Step {activeStep + 1} of {steps.length}</span>
          <div className="rw-info__title">{steps[activeStep]?.title}</div>
          <div className="rw-info__desc">{steps[activeStep]?.desc}</div>
        </div>
      </div>
    </div>
  );
}

// ─── AVATAR COLORS ────────────────────────────────────────────────────────
const AVATAR_COLORS = ["#d97706","#059669","#0ea5e9","#7c3aed","#dc2626","#0891b2","#65a30d"];
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function Stars({ n }) { return <span>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>; }
function SectionHead({ label, title }) {
  return (
    <div className="bk-section__head">
      <div className="bk-section__label">{label}</div>
      <h2 className="bk-section__title">{title}</h2>
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────
function FaqItem({ q, a, isLast }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bk-faq ${open ? "open" : ""} ${isLast ? "bk-faq--last" : ""}`}>
      <button className="bk-faq__q" onClick={() => setOpen(!open)}>
        <span className="bk-faq__q-text">{q}</span>
        <span className="bk-faq__chevron">{open ? "−" : "+"}</span>
      </button>
      <div className="bk-faq__body">
        <div className="bk-faq__body-inner">
          <div className="bk-faq__answer">{a}</div>
        </div>
      </div>
    </div>
  );
}

// ─── DESTINATION GRID ─────────────────────────────────────────────────────
function DestGrid({ items }) {
  const top = items.slice(0, 2);
  const bottom = items.slice(2, 6);
  return (
    <div className="bk-dest-grid">
      {top.map((d, i) => (
        <div key={d.name} className={`bk-dest-card${i === 0 ? " bk-dest-card--wide" : ""}`}>
          <img src={d.img} alt={d.name} className="bk-dest-card__img" loading="lazy" />
          <div className="bk-dest-card__overlay" />
          <span className="bk-dest-card__name">{d.name}</span>
        </div>
      ))}
      {bottom.map((d) => (
        <div key={d.name} className="bk-dest-card">
          <img src={d.img} alt={d.name} className="bk-dest-card__img" loading="lazy" />
          <div className="bk-dest-card__overlay" />
          <span className="bk-dest-card__name">{d.name}</span>
        </div>
      ))}
    </div>
  );
}

// ─── TIER DATA ────────────────────────────────────────────────────────────
const TIER_CONFIG = [
  {
    id: "client",
    name: "Client",
    desc: "Your first step into the programme",
    badge: "Tier 1",
    stripeColor: "#4a7cbf",
    badgeColor: "#4a7cbf",
    badgeBg: "#eef3fb",
    badgeBorder: "#c8d8f0",
    perks: [
      "Redeemable points on every visa application fee",
      "Access to member codes",
      "Welcome bonus OF Rs 100",
    ],
    hasBecome: true,
  },
  {
    id: "member",
    name: "Member",
    desc: "Unlocked from your 2nd application onwards",
    badge: "Tier 2",
    stripeColor: "#0d1b4b",
    badgeColor: "#0d1b4b",
    badgeBg: "#e8edf8",
    badgeBorder: "#c5cfe8",
    perks: [
      "Redeemable points on every visa application fee",
      "Access to member codes",
      "Welcome bonus OF Rs 100",
      "Dedicated agent code — every application using your code helps you earn commission",
      "Milestone rewards — achieve volume targets to unlock extra benefits",
    ],
    hasBecome: false,
  },
  {
    id: "agent",
    name: "Agent",
    desc: "For high-volume applicants & travel professionals",
    badge: "Tier 3",
    stripeColor: "#1e3a8a",
    badgeColor: "#1e3a8a",
    badgeBg: "#eef1fb",
    badgeBorder: "#c5d0f0",
    perks: [
      "Redeemable points on every visa application fee",
      "Access to member codes",
      "Welcome bonus OF Rs 100",
      "Dedicated agent code — every application using your code helps you earn commission",
      "Milestone rewards — achieve volume targets to unlock extra benefits",
      "Dedicated account support and priority service",
    ],
    hasBecome: false,
  },
];

// ─── REWARDS MODAL ────────────────────────────────────────────────────────
function RewardsModal({ open, onClose, onApply }) {
  const [openTier, setOpenTier] = useState(null);
  const [becomeOpen, setBecomeOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleOverlay = (e) => { if (e.target === e.currentTarget) onClose(); };
  const toggleTier = (id) => setOpenTier((prev) => (prev === id ? null : id));

  const handleApply = () => { onClose(); onApply(); };

  return (
    <div className={`bk-modal-overlay ${open ? "open" : ""}`} onClick={handleOverlay}>
      <div className="bk-modal">

        <div className="bk-modal__head">
          <button className="bk-modal__close" onClick={onClose}>✕</button>
          <div className="bk-modal__title">Earn as you travel</div>
          <div className="bk-modal__sub">Every application brings you closer to exclusive benefits. All rewards apply on visa application fees charged.</div>
        </div>

        <div className="bk-modal__body">

          <div>
            <div className="bk-modal__section-label">Welcome Bonus</div>
            <div className="bk-modal__bonus">
              <div>
                <div className="bk-modal__bonus-title">Joining reward</div>
                <div className="bk-modal__bonus-desc">Join us and unlock your welcome reward instantly</div>
              </div>
              <div className="bk-modal__bonus-amount">
                <span className="bk-currency">₹</span>
                100
              </div>
            </div>
          </div>

          <div>
            <div className="bk-modal__section-label">Referral &amp; Discount Codes</div>
            <div className="bk-modal__codes">
              <div className="bk-modal__code-row">
                <div className="bk-modal__code-pill">MEMBERCODE</div>
                <div>
                  <div className="bk-modal__code-title">Member code</div>
                  <div className="bk-modal__code-desc">Use the member code — you'll receive a discount on the visa fee.</div>
                </div>
              </div>
              <div className="bk-modal__code-row">
                <div className="bk-modal__code-pill">AGENTCODE</div>
                <div>
                  <div className="bk-modal__code-title">Agent code</div>
                  <div className="bk-modal__code-desc">Agents receive a dedicated code that can be applied to applications, helping users get an extra discount.</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bk-modal__tiers-title">Three-Tier Membership</div>
            <div className="bk-modal__tiers">
              {TIER_CONFIG.map((tier) => (
                <div key={tier.id} className={`bk-modal__tier ${openTier === tier.id ? "open" : ""}`}>
                  <div className="bk-modal__tier-head" onClick={() => toggleTier(tier.id)}>
                    <div className="bk-modal__tier-stripe" style={{ background: tier.stripeColor }} />
                    <div className="bk-modal__tier-info">
                      <div className="bk-modal__tier-name">{tier.name}</div>
                      <div className="bk-modal__tier-desc">{tier.desc}</div>
                    </div>
                    <span className="bk-modal__tier-arrow">&#9658;</span>
                  </div>
                  <div className="bk-modal__tier-body">
                    <div className="bk-modal__tier-body-inner">
                      <div className="bk-modal__tier-perks">
                        {tier.perks.map((perk, i) => (
                          <div key={i} className="bk-modal__tier-perk">
                            <div className="bk-modal__tier-perk-dot" style={{ background: tier.stripeColor }} />
                            <div className="bk-modal__tier-perk-text">{perk}</div>
                          </div>
                        ))}
                        {tier.hasBecome && (
                          <>
                            <button
                              className="bk-modal__become-btn"
                              onClick={(e) => { e.stopPropagation(); setBecomeOpen((v) => !v); }}
                            >
                              {becomeOpen ? "Hide Details" : "*Become a Member"}
                            </button>
                            <div className={`bk-modal__become-panel ${becomeOpen ? "open" : ""}`}>
                              <div className="bk-modal__become-panel-inner">
                                <div className="bk-modal__become-content">
                                  <div className="bk-modal__become-title">Membership is closer than you think</div>
                                  <div className="bk-modal__become-desc">
                                    Become a member on your 2nd application — even a transit visa counts. Applying for family or friends also qualifies. One more application is all it takes.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bk-modal__ms-title">Milestone Benefits</div>
            <div className="bk-modal__milestone-card">
              <div className="bk-modal__milestone-heading">Achieve milestones</div>
              <div className="bk-modal__milestone-desc">
                The more you apply — for yourself, family, or clients — the more milestone rewards you unlock.
              </div>
            </div>
          </div>

          <button className="bk-modal__cta" onClick={handleApply}>
            <span>Start Application</span>
          </button>

          <div className="bk-modal__tc">
            T&amp;C apply. All rewards and discounts are applicable only on the visa application fees charged by TheVisaCo.
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────
function Sidebar({ data, onApply }) {
  const { visaCard } = data;
  const total = visaCard.govFee + visaCard.svcFee;
  return (
    <div className="bk-sb">
      <div className="bk-sb__topbar">
        <div className="bk-sb__guarantee"><span>{visaCard.guarantee}</span></div>
        <span className="bk-sb__faster">{visaCard.badge}</span>
      </div>
      <div className="bk-sb__body">
        <div className="bk-sb__price-wrap">
          <div className="bk-sb__price-main">₹{total.toLocaleString("en-IN")}</div>
          <div className="bk-sb__price-sub">Total per person</div>
          <div className="bk-sb__price-note">Govt fee + service fee included</div>
        </div>
        <button
          className="bk-sb__cta"
          onClick={onApply}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          <span>Start Application</span>
        </button>
        <div className="bk-sb__fees">
          <div className="bk-sb__fee-row">
            <div style={{ flex: 1 }}>
              <div className="bk-sb__fee-name">Govt Fee</div>
              <div className="bk-sb__fee-note">Paid upfront</div>
            </div>
            <div className="bk-sb__fee-right">
              <span className="bk-sb__fee-amount">
                {visaCard.govFee === 0
                  ? <span className="bk-sb__fee-amount--green">FREE</span>
                  : `₹${visaCard.govFee.toLocaleString("en-IN")}`}
              </span>
            </div>
          </div>
          <div className="bk-sb__fee-row">
            <div style={{ flex: 1 }}>
              <div className="bk-sb__fee-name">Service Fee</div>
              <div className="bk-sb__fee-note">Paid only after approval</div>
            </div>
            <div className="bk-sb__fee-right">
              <span className="bk-sb__fee-amount">₹{visaCard.svcFee.toLocaleString("en-IN")}</span>
              <span className="bk-sb__fee-amount--strike">₹{visaCard.svcOrig.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="bk-sb__divider" />
          <div className="bk-sb__fee-row bk-sb__fee-row--total">
            <div style={{ flex: 1 }}><div className="bk-sb__fee-name" style={{ fontWeight: 800 }}>Total</div></div>
            <span className="bk-sb__fee-amount bk-sb__fee-amount--total">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
        <div className="bk-sb__trust">
          {["Secure", "Verified", "Trusted"].map((t) => (
            <div key={t} className="bk-sb__trust-item"><span>{t}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH BAR HELPER ────────────────────────────────────────────────────
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="bk-rev-search">
      <svg className="bk-rev-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input className="bk-rev-search__input" type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      {value && <button className="bk-rev-search__clear" onClick={() => onChange("")}>✕</button>}
    </div>
  );
}

// ─── VIEW MORE BUTTON ─────────────────────────────────────────────────────
function ViewMoreBtn({ expanded, onToggle, moreCount }) {
  return (
    <div className="bk-view-more">
      <button className="bk-view-more__btn" onClick={onToggle}>
        {expanded ? (
          <>
            <span>Show Less</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </>
        ) : (
          <>
            <span>View More{moreCount > 0 ? ` (${moreCount} more)` : ""}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </>
        )}
      </button>
    </div>
  );
}

// ─── FLOATING ACTION TOGGLE ───────────────────────────────────────────────
function FloatingToggle({ onApply, onRewards }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  const handleApply   = () => { setOpen(false); onApply(); };
  const handleRewards = () => { setOpen(false); onRewards(); };

  return (
    <div className={`bk-fab-toggle${open ? " open" : ""}`} ref={ref}>
      <div className="bk-fab-actions">
        <button className="bk-fab-action bk-fab-action--rewards" onClick={handleRewards} tabIndex={open ? 0 : -1} aria-hidden={!open}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#C9A000" strokeWidth="2"/>
            <circle cx="12" cy="12" r="6" fill="#FFEC8B" stroke="#C9A000" strokeWidth="1.5"/>
            <ellipse cx="9" cy="9" rx="3" ry="2" fill="white" opacity="0.3"/>
          </svg>
          <span>Rewards</span>
        </button>
        <button className="bk-fab-action bk-fab-action--apply" onClick={handleApply} tabIndex={open ? 0 : -1} aria-hidden={!open}>
          <span className="bk-fab-action__dot" />
          <span>Apply Now</span>
        </button>
      </div>
      <button className="bk-fab-main" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open actions"} aria-expanded={open}>
        <span className="bk-fab-main__icon" aria-hidden="true">
          {open ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#C9A000" strokeWidth="2"/>
              <circle cx="12" cy="12" r="6" fill="#FFEC8B" stroke="#C9A000" strokeWidth="1.5"/>
              <ellipse cx="9" cy="9" rx="3" ry="2" fill="white" opacity="0.3"/>
            </svg>
          )}
        </span>
        <span className="bk-fab-main__label">{open ? "Close" : "Rewards"}</span>
      </button>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────

const REVIEWS_INITIAL = 4;
const FAQS_INITIAL    = 4;

export default function BookingPage({ visaId: propVisaId }) {
  const { visaId: paramVisaId } = useParams();
  const visaId = paramVisaId || propVisaId || "uae";
  const data = getVisaData(visaId);

  // ── navigate — used to go to /application-form after login ──────────────
  const navigate = useNavigate();

  const [heroLoaded,      setHeroLoaded]      = useState(false);
  const [activeSection,   setActiveSection]   = useState("Info");
  const [rewardsOpen,     setRewardsOpen]     = useState(false);
  const [reviewSearch,    setReviewSearch]    = useState("");
  const [reviewFilter,    setReviewFilter]    = useState(0);
  const [faqSearch,       setFaqSearch]       = useState("");
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [faqsExpanded,    setFaqsExpanded]    = useState(false);

  const { gateOpen, loggedInUser, requireLogin, handleLoginSuccess, closeGate } = useLoginGate();

  const sectionRefs = useRef({});

  const filteredReviews = data.reviews.filter((r) => {
    const matchStar   = reviewFilter === 0 || r.rating === reviewFilter;
    const q           = reviewSearch.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.body.toLowerCase().includes(q);
    return matchStar && matchSearch;
  });

  const filteredFaqs = data.faqs.filter((f) => {
    const q = faqSearch.toLowerCase();
    return !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
  });

  const isReviewFiltered  = reviewSearch || reviewFilter !== 0;
  const isFaqFiltered     = !!faqSearch;
  const visibleReviews    = isReviewFiltered ? filteredReviews : (reviewsExpanded ? filteredReviews : filteredReviews.slice(0, REVIEWS_INITIAL));
  const visibleFaqs       = isFaqFiltered   ? filteredFaqs   : (faqsExpanded    ? filteredFaqs    : filteredFaqs.slice(0, FAQS_INITIAL));
  const showReviewToggle  = !isReviewFiltered && filteredReviews.length > REVIEWS_INITIAL;
  const showFaqToggle     = !isFaqFiltered   && filteredFaqs.length   > FAQS_INITIAL;

  const registerRef = useCallback((id) => (el) => { if (el) sectionRefs.current[id] = el; }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.dataset.section); }); },
      { threshold: 0.35 }
    );
    Object.values(sectionRefs.current).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [data]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".bk-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [data]);

  const scrollTo = (sec) => sectionRefs.current[sec]?.scrollIntoView({ behavior: "smooth", block: "start" });

  // ── THE FIX: replace alert() with navigate("/application-form") ──────────
  const handleApply = useCallback(() => {
    requireLogin((_user) => {
      navigate("/Profile");
    });
  }, [requireLogin, navigate]);

  const handleRewardsApply = useCallback(() => {
    setRewardsOpen(false);
    handleApply();
  }, [handleApply]);

  return (
    <div className="bk">

      <LoginGate
        open={gateOpen}
        onClose={closeGate}
        onSuccess={handleLoginSuccess}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bk-hero">
        <div className="bk-hero__bg">
          <img src={data.heroImg} alt={data.heroAlt} className={`bk-hero__img ${heroLoaded ? "loaded" : ""}`} onLoad={() => setHeroLoaded(true)} />
          <div className="bk-hero__overlay" />
          <div className="bk-hero__grain" />
        </div>
        <div className="bk-hero__content">
          <div className="bk-hero__breadcrumb">
            {data.breadcrumb.map((b, i) => (
              <span key={b}>
                {i > 0 && <span className="bk-hero__bc-sep"> / </span>}
                <span className={i === data.breadcrumb.length - 1 ? "bk-hero__bc-last" : ""}>{b}</span>
              </span>
            ))}
          </div>
          <div className="bk-hero__eyebrow"><span style={{ marginLeft: "6px" }}>{visaCard_eyebrow(data)}</span></div>
          <h1 className="bk-hero__title">{data.country}</h1>
          <p className="bk-hero__tagline">{data.tagline}</p>
          <div className="bk-hero__cta-row">
            <button
              className="bk-hero__btn-start"
              onClick={handleApply}
              style={{ display: "flex", alignItems: "center", gap: "7px" }}
            >
              <span>Start Application</span>
            </button>
            <button className="bk-hero__btn-learn" onClick={() => scrollTo("Info")}>View Details</button>
          </div>
        </div>
        <div className="bk-hero__badge">
          <div>
            <div className="bk-hero__badge-title">{data.visaCard.guarantee}</div>
            <div className="bk-hero__badge-sub">{data.authBadge}</div>
          </div>
        </div>
      </section>

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav className="bk-nav">
        <div className="bk-nav__inner">
          {data.navLinks.map((sec) => (
            <button key={sec} className={`bk-nav__btn ${activeSection === sec ? "active" : ""}`} onClick={() => scrollTo(sec)}>{sec}</button>
          ))}
          <button
            className="bk-nav__apply"
            onClick={handleApply}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span>Apply Now</span>
          </button>
        </div>
      </nav>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────────── */}
      <div className="bk-layout">
        <main className="bk-main">

          {/* ── INFO ─────────────────────────────────────────────────── */}
          <section className="bk-section" data-section="Info" ref={registerRef("Info")}>
            <div className="bk-reveal">
              <SectionHead label="Visa Info" title={`${data.country} Visa Details`} />
              <div className="bk-info-grid" style={{ marginBottom: "1.5rem" }}>
                {[
                  { label: "Visa Type", val: data.visaCard.type },
                  { label: "Validity",  val: data.visaCard.validity },
                  { label: "Guarantee", val: data.visaCard.guarantee },
                ].map((c) => (
                  <div key={c.label} className="bk-info-card">
                    <div>
                      <div className="bk-info-card__label">{c.label}</div>
                      <div className="bk-info-card__val">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ESSENTIALS ───────────────────────────────────────────── */}
          <section className="bk-section" data-section="Essentials" ref={registerRef("Essentials")}>
            <div className="bk-reveal">
              <SectionHead label="Required Documents" title="What You'll Need" />
              <div className="bk-essentials">
                {/* Passport */}
                <div className="bk-ess-card">
                  <div className="bk-ess-card__visual">
                    <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-ess-svg">
                      <rect x="20" y="10" width="180" height="120" rx="10" fill="#1a2744" />
                      <rect x="20" y="10" width="180" height="30" rx="10" fill="#243260" />
                      <rect x="20" y="30" width="180" height="10" fill="#243260" />
                      <circle cx="110" cy="55" r="16" fill="none" stroke="#c9a84c" strokeWidth="1.2" />
                      <circle cx="110" cy="55" r="11" fill="none" stroke="#c9a84c" strokeWidth="0.7" />
                      <ellipse cx="110" cy="55" rx="6" ry="16" fill="none" stroke="#c9a84c" strokeWidth="0.7" />
                      <line x1="94" y1="55" x2="126" y2="55" stroke="#c9a84c" strokeWidth="0.7" />
                      <line x1="96" y1="48" x2="124" y2="48" stroke="#c9a84c" strokeWidth="0.6" />
                      <line x1="96" y1="62" x2="124" y2="62" stroke="#c9a84c" strokeWidth="0.6" />
                      <rect x="36" y="80" width="64" height="8" rx="2" fill="#c9a84c" opacity="0.15" />
                      <rect x="36" y="92" width="44" height="6" rx="2" fill="#c9a84c" opacity="0.1" />
                      <rect x="120" y="80" width="64" height="5" rx="1.5" fill="#8899bb" opacity="0.25" />
                      <rect x="120" y="89" width="50" height="5" rx="1.5" fill="#8899bb" opacity="0.2" />
                      <rect x="120" y="98" width="56" height="5" rx="1.5" fill="#8899bb" opacity="0.2" />
                      <text x="110" y="27" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="serif" letterSpacing="2" opacity="0.9">PASSPORT</text>
                      <rect x="28" y="112" width="164" height="3" rx="1" fill="#8899bb" opacity="0.18" />
                      <rect x="28" y="118" width="164" height="3" rx="1" fill="#8899bb" opacity="0.13" />
                    </svg>
                  </div>
                  <div className="bk-ess-card__body"><div className="bk-ess-card__title">Passport</div></div>
                </div>
                {/* Return Ticket */}
                <div className="bk-ess-card">
                  <div className="bk-ess-card__visual">
                    <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-ess-svg">
                      <rect x="10" y="18" width="200" height="104" rx="10" fill="#0d1e4a"/>
                      <rect x="10" y="18" width="200" height="26" rx="10" fill="#c9a84c"/>
                      <rect x="10" y="34" width="200" height="10" fill="#c9a84c"/>
                      <text x="20" y="31" fill="#0d1e4a" fontSize="7.5" fontFamily="monospace" fontWeight="700" letterSpacing="1.5">AIR INDIA</text>
                      <text x="200" y="31" textAnchor="end" fill="#0d1e4a" fontSize="6.5" fontFamily="monospace" fontWeight="700" opacity="0.75">AI — 117</text>
                      <text x="20" y="64" fill="#c9a84c" fontSize="20" fontFamily="monospace" fontWeight="700" letterSpacing="-1">DEL</text>
                      <text x="20" y="73" fill="#8fa0c0" fontSize="5.5" fontFamily="monospace" letterSpacing="0.5">NEW DELHI</text>
                      <line x1="42" y1="63" x2="110" y2="63" stroke="#c9a84c" strokeWidth="0.6" opacity="0.5"/>
                      <text x="113" y="64" fill="#c9a84c" fontSize="20" fontFamily="monospace" fontWeight="700" letterSpacing="-1">CDG</text>
                      <text x="113" y="73" fill="#8fa0c0" fontSize="5.5" fontFamily="monospace" letterSpacing="0.5">PARIS</text>
                      <rect x="17" y="78" width="132" height="14" rx="3" fill="#162455"/>
                      <text x="22" y="87" fill="#8fa0c0" fontSize="5.5" fontFamily="monospace">DATE</text>
                      <text x="46" y="87" fill="white" fontSize="6" fontFamily="monospace" fontWeight="700">14 MAR 2025</text>
                      <text x="94" y="87" fill="#8fa0c0" fontSize="5.5" fontFamily="monospace">DEP</text>
                      <text x="110" y="87" fill="white" fontSize="6" fontFamily="monospace" fontWeight="700">06:40</text>
                      <text x="22" y="100" fill="#8fa0c0" fontSize="5.5" fontFamily="monospace">CLASS</text>
                      <text x="46" y="100" fill="white" fontSize="6" fontFamily="monospace" fontWeight="700">ECONOMY</text>
                      <text x="94" y="100" fill="#8fa0c0" fontSize="5.5" fontFamily="monospace">PAX</text>
                      <text x="110" y="100" fill="white" fontSize="6" fontFamily="monospace" fontWeight="700">01</text>
                      {[0,2,4.5,6.5,9,11,14,15.5,18,20.5,23,25,27.5,30,32,34.5,37,39,41.5].map((x, i) => (
                        <rect key={i} x={17 + x} y="108" width={i % 4 === 0 ? 1.8 : i % 3 === 0 ? 1.3 : 0.9} height="10" rx="0.2" fill="white" opacity={i % 5 === 0 ? 0.7 : 0.4}/>
                      ))}
                      <text x="164" y="62" textAnchor="middle" fill="#8fa0c0" fontSize="5.5" fontFamily="monospace" letterSpacing="0.5">SEAT</text>
                      <text x="164" y="76" textAnchor="middle" fill="white" fontSize="16" fontFamily="monospace" fontWeight="700">14A</text>
                      <text x="164" y="87" textAnchor="middle" fill="#8fa0c0" fontSize="5.5" fontFamily="monospace">GATE</text>
                      <text x="164" y="97" textAnchor="middle" fill="#c9a84c" fontSize="9" fontFamily="monospace" fontWeight="700">C12</text>
                      <text x="164" y="108" textAnchor="middle" fill="#8fa0c0" fontSize="5" fontFamily="monospace">BOARDING</text>
                      <text x="164" y="116" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" fontWeight="700">05:50</text>
                    </svg>
                  </div>
                  <div className="bk-ess-card__body"><div className="bk-ess-card__title">Return Ticket</div></div>
                </div>
                {/* Bank Statement */}
                <div className="bk-ess-card">
                  <div className="bk-ess-card__visual">
                    <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-ess-svg">
                      <rect x="20" y="30" width="180" height="104" rx="4" fill="#fafaf7" stroke="#e0dbd0" strokeWidth="0.8" />
                      <rect x="20" y="20" width="180" height="22" rx="4" fill="#1a2744" />
                      <rect x="20" y="40" width="144" height="10" fill="#1a2744" />
                      <text x="40" y="38" fill="#c9a84c" fontSize="7.5" fontFamily="monospace" fontWeight="700" letterSpacing="1">BANK STATEMENT</text>
                      <rect x="127" y="40" width="72" height="20" rx="3" fill="#f0fdf4" stroke="#16a34a" strokeWidth="0.8" />
                      <text x="146" y="48" textAnchor="middle" fill="#15803d" fontSize="6" fontFamily="monospace">BALANCE</text>
                      <text x="137" y="57" textAnchor="middle" fill="#15803d" fontSize="9" fontFamily="monospace" fontWeight="700">₹</text>
                      <text x="148" y="58.5" textAnchor="middle" fill="#15803d" fontSize="9" fontFamily="monospace" fontWeight="700">***</text>
                      {[
                        { label: "Jun 01  Credit Salary", amt: "****",  color: "#15803d" },
                        { label: "Jun 15  UPI Transfer",  amt: "-****", color: "#dc2626" },
                        { label: "Jul 01  Credit Salary", amt: "+****", color: "#15803d" },
                        { label: "Jul 22  Shopping",      amt: "-****", color: "#dc2626" },
                      ].map((row, i) => (
                        <g key={i}>
                          <rect x="42" y={69 + i * 13} width="132" height="11" rx="1.5" fill={i % 2 === 0 ? "#f5f5f0" : "transparent"} />
                          <text x="46" y={75 + i * 13} fill="#555" fontSize="6" fontFamily="monospace">{row.label}</text>
                          <text x="170" y={75 + i * 13} textAnchor="end" fill={row.color} fontSize="6.5" fontFamily="monospace" fontWeight="700">{row.amt}</text>
                        </g>
                      ))}
                      <line x1="42" y1="124" x2="170" y2="124" stroke="#e0dbd0" strokeWidth="0.8" />
                    </svg>
                  </div>
                  <div className="bk-ess-card__body"><div className="bk-ess-card__title">Bank Statement</div></div>
                </div>
                {/* Travel Insurance */}
                <div className="bk-ess-card">
                  <div className="bk-ess-card__visual">
                    <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-ess-svg">
                      <path d="M110 18 L152 34 L152 76 C152 100 134 118 110 126 C86 118 68 100 68 76 L68 34 Z" fill="#1a2744" />
                      <path d="M110 24 L146 38 L146 76 C146 97 130 113 110 120 C90 113 74 97 74 76 L74 38 Z" fill="#243260" />
                      <path d="M110 30 L140 42 L140 76 C140 94 126 108 110 114 C94 108 80 94 80 76 L80 42 Z" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5" />
                      <path d="M96 72 L106 82 L126 60" stroke="#c9a84c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="138" y="18" width="62" height="26" rx="5" fill="#0f2557" stroke="#c9a84c" strokeWidth="0.8" />
                      <text x="169" y="28" textAnchor="middle" fill="#c9a84c" fontSize="6" fontFamily="monospace" letterSpacing="0.5">COVERAGE</text>
                      <text x="169" y="38" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="700">****</text>
                      <ellipse cx="110" cy="130" rx="30" ry="5" fill="#1a2744" opacity="0.15" />
                    </svg>
                  </div>
                  <div className="bk-ess-card__body"><div className="bk-ess-card__title">Travel Insurance</div></div>
                </div>
              </div>
            </div>
          </section>

        </main>

        <aside className="bk-sidebar-wrap">
          <Sidebar data={data} onApply={handleApply} />
        </aside>
      </div>

      <div className="bk-layout_2">
        {/* ── PROCESS ──────────────────────────────────────────────── */}
        <section className="bk-section" data-section="Process" ref={registerRef("Process")}>
          <div className="bk-reveal">
            <SectionHead label="How It Works" title="Simple 4-Step Process" />
            <RunwayProcess steps={data.process} />
          </div>
        </section>

        {/* ── REVIEWS ──────────────────────────────────────────────── */}
        <section className="bk-section" data-section="Why Us" ref={registerRef("Why Us")}>
          <div className="bk-reveal">
            <SectionHead label="Customer Reviews" title="What Our Customers Say" />
            <div className="bk-reviews-toolbar">
              <div className="bk-reviews-score">
                <div className="bk-reviews-score__num">{data.reviewScore}</div>
                <div>
                  <div className="bk-reviews-score__stars">★★★★★</div>
                  <div className="bk-reviews-score__count">{data.reviewCount} verified reviews</div>
                </div>
              </div>
              <div className="bk-reviews-controls">
                <SearchBar value={reviewSearch} onChange={setReviewSearch} placeholder="Search reviews…" />
                <div className="bk-rev-filters">
                  {[0, 5, 4, 3].map((star) => (
                    <button key={star} className={`bk-rev-filter${reviewFilter === star ? " active" : ""}`} onClick={() => setReviewFilter(reviewFilter === star ? 0 : star)}>
                      {star === 0 ? "All" : `${star}★`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bk-reviews-grid">
              {visibleReviews.length > 0 ? visibleReviews.map((r) => (
                <div key={r.name} className="bk-review">
                  <div className="bk-review__top">
                    <div className="bk-review__avatar" style={{ background: avatarColor(r.name) }}>{r.name.charAt(0)}</div>
                    <div>
                      <div className="bk-review__name">{r.name}</div>
                      <div className="bk-review__date">{r.date}</div>
                    </div>
                    <div className="bk-review__stars"><Stars n={r.rating} /></div>
                  </div>
                  <div className="bk-review__title">"{r.title}"</div>
                  <div className="bk-review__body">{r.body}</div>
                </div>
              )) : (
                <div className="bk-reviews-empty">No reviews match your search.</div>
              )}
            </div>
            {showReviewToggle && (
              <ViewMoreBtn
                expanded={reviewsExpanded}
                onToggle={() => setReviewsExpanded((v) => !v)}
                moreCount={filteredReviews.length - REVIEWS_INITIAL}
              />
            )}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="bk-section" data-section="FAQ" ref={registerRef("FAQ")}>
          <div className="bk-reveal">
            <SectionHead label={`${data.country} FAQ`} title="Frequently Asked Questions" />
            <div className="bk-faq-toolbar">
              <SearchBar value={faqSearch} onChange={setFaqSearch} placeholder="Search questions…" />
            </div>
            <div className="bk-faqs">
              {visibleFaqs.length > 0 ? visibleFaqs.map((f, idx) => (
                <FaqItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  isLast={idx === visibleFaqs.length - 1 && !showFaqToggle}
                />
              )) : (
                <div className="bk-reviews-empty" style={{ padding: "1.5rem 0" }}>No questions match your search.</div>
              )}
            </div>
            {showFaqToggle && (
              <ViewMoreBtn
                expanded={faqsExpanded}
                onToggle={() => setFaqsExpanded((v) => !v)}
                moreCount={filteredFaqs.length - FAQS_INITIAL}
              />
            )}

            <div style={{ marginTop: "2rem", textAlign: "center", padding: "2rem", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--rl)" }}>
              <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--ink)", marginBottom: ".5rem" }}>Ready to Visit {data.country}?</div>
              <div style={{ fontFamily: "var(--ff2)", color: "var(--ink-soft)", fontSize: ".9rem", marginBottom: "1.2rem" }}>
                Join 50,000+ Indians who trust TheVisa for their travel documents.
              </div>
              <button
                className="bk-hero__btn-start"
                onClick={handleApply}
                style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}
              >
                <span>Apply for {data.country} Visa</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <FloatingToggle onApply={handleApply} onRewards={() => setRewardsOpen(true)} />

      <RewardsModal
        open={rewardsOpen}
        onClose={() => setRewardsOpen(false)}
        onApply={handleRewardsApply}
      />

    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────
function visaCard_eyebrow(data) {
  const vc = data.visaCard;
  if (vc.govFee === 0) return `${vc.type} · FREE Govt Fee`;
  return `${vc.type} · ${vc.guarantee}`;
}