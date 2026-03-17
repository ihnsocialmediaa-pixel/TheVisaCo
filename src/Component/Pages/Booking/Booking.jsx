// booking.jsx  —  TheVisa · Country Visa Detail Page
// Usage: <BookingPage visaId="uae" /> or <BookingPage visaId="japan" /> etc.

import { useState, useEffect, useRef, useCallback } from "react";
import { getVisaData, rewardsData } from "./bookingdata";
import "./booking.css";
import { useParams } from "react-router-dom";


// ─── PROFESSIONAL PLANE ICON (SVG) ────────────────────────────────────────
function PlaneIcon({ size = 16, color = "currentColor", className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8l-8.2 1.8C1.8 10 1 11 2 12l3 2 2 3 2-2 1 3c1 1 2 .2 2.2-1L17.8 19.2z"/>
    </svg>
  );
}

// ─── APPLY BUTTON WITH PLANE ───────────────────────────────────────────────
function ApplyBtn({ onClick, children, className = "bk-hero__btn-start" }) {
  return (
    <button className={className} onClick={onClick}>
      <PlaneIcon size={15} />
      <span style={{ marginLeft: "6px" }}>{children}</span>
    </button>
  );
}

// ─── AVATAR COLORS ────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  "#d97706","#059669","#0ea5e9","#7c3aed","#dc2626","#0891b2","#65a30d",
];

function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffffffff;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

// ─── STAR RENDER ──────────────────────────────────────────────────────────
function Stars({ n }) {
  return <span>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

// ─── SMALL REUSABLES ─────────────────────────────────────────────────────
function SectionHead({ label, title }) {
  return (
    <div className="bk-section__head">
      <div className="bk-section__label">{label}</div>
      <h2 className="bk-section__title">{title}</h2>
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`bk-faq ${open ? "open" : ""}`}>
      <button className="bk-faq__q" onClick={() => setOpen(!open)}>
        <span className="bk-faq__q-text">{q}</span>
        <span className="bk-faq__chevron">▾</span>
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

// ─── REWARDS MODAL ────────────────────────────────────────────────────────
function RewardsModal({ open, onClose }) {
  const [openTier, setOpenTier] = useState(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleOverlay = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className={`bk-modal-overlay ${open ? "open" : ""}`} onClick={handleOverlay}>
      <div className="bk-modal">
        {/* HEAD */}
        <div className="bk-modal__head">
          <button className="bk-modal__close" onClick={onClose}>✕</button>
          <div className="bk-modal__title">🎁 TheVisa Rewards</div>
          <div className="bk-modal__sub">Earn while you travel. The more you apply, the more you save.</div>
        </div>

        <div className="bk-modal__body">
          {/* WELCOME BONUS */}
          <div className="bk-modal__bonus">
            <div className="bk-modal__bonus-icon">🎊</div>
            <div>
              <div className="bk-modal__bonus-title">Welcome Bonus</div>
              <div className="bk-modal__bonus-desc">{rewardsData.welcomeBonus.description}</div>
            </div>
            <div className="bk-modal__bonus-amount">₹{rewardsData.welcomeBonus.amount}</div>
          </div>

          {/* TRANSIT VISA NOTE */}
          <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: "var(--r)", padding: ".8rem 1.1rem", display: "flex", gap: ".65rem", alignItems: "flex-start" }}>
            <PlaneIcon size={18} color="#059669" />
            <div>
              <div style={{ fontSize: ".88rem", fontWeight: 700, color: "#065f46", marginBottom: ".2rem" }}>Transit Visa Benefit</div>
              <div style={{ fontFamily: "var(--ff2)", fontSize: ".8rem", color: "#047857" }}>{rewardsData.transitVisa.description}</div>
            </div>
          </div>

          {/* USER TIERS */}
          <div>
            <div className="bk-modal__tiers-title">👤 User Tiers</div>
            <div className="bk-modal__tiers">
              {rewardsData.userTiers.map((tier) => (
                <div key={tier.id} className={`bk-modal__tier ${openTier === tier.id ? "open" : ""}`}>
                  <div
                    className="bk-modal__tier-head"
                    style={{ background: openTier === tier.id ? `${tier.color}10` : "transparent" }}
                    onClick={() => setOpenTier(openTier === tier.id ? null : tier.id)}
                  >
                    <span className="bk-modal__tier-icon">{tier.icon}</span>
                    <div>
                      <div className="bk-modal__tier-name" style={{ color: tier.color }}>{tier.name}</div>
                      <div className="bk-modal__tier-desc">{tier.description}</div>
                    </div>
                    <span className="bk-modal__tier-arrow">▶</span>
                  </div>
                  <div className="bk-modal__tier-body">
                    <div className="bk-modal__tier-body-inner">
                      <div className="bk-modal__tier-perks">
                        {tier.perks.map((p, i) => (
                          <div key={i} className="bk-modal__tier-perk">{p}</div>
                        ))}
                        {tier.upgrade && (
                          <div className="bk-modal__tier-upgrade">💡 {tier.upgrade}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REFERRAL */}
          <div>
            <div className="bk-modal__tiers-title">🤝 Referral Commission</div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {Object.entries(rewardsData.referral).map(([tier, data]) => (
                <div key={tier} style={{ display: "flex", alignItems: "center", gap: ".8rem", background: "var(--surface-2)", borderRadius: "10px", padding: ".7rem 1rem", border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "1.1rem" }}>{rewardsData.userTiers.find(t => t.id === tier)?.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: ".86rem", fontWeight: 700, color: "var(--ink)", textTransform: "capitalize" }}>{tier}</div>
                    <div style={{ fontFamily: "var(--ff2)", fontSize: ".78rem", color: "var(--ink-soft)" }}>{data.description}</div>
                  </div>
                  <div style={{ fontWeight: 800, color: "var(--green)", fontSize: "1rem", whiteSpace: "nowrap" }}>₹{data.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* COUPONS */}
          <div>
            <div className="bk-modal__tiers-title">🏷️ Coupon Codes</div>
            <div className="bk-modal__coupons">
              {Object.entries(rewardsData.coupons).map(([tier, data]) => (
                <div key={tier} className="bk-modal__coupon">
                  <div>
                    <span className="bk-modal__coupon-badge">{data.example}</span>
                  </div>
                  <div>
                    <div className="bk-modal__coupon-title" style={{ textTransform: "capitalize" }}>{tier} — {data.discount}</div>
                    <div className="bk-modal__coupon-desc">{data.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MILESTONES */}
          <div>
            <div className="bk-modal__ms-title">🏆 Milestone Rewards</div>
            <div className="bk-modal__milestones">
              {rewardsData.milestones.map((m) => (
                <div key={m.target} className="bk-modal__milestone">
                  <span className="bk-modal__ms-icon">{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="bk-modal__ms-reward">{m.reward}</div>
                  </div>
                  <div className="bk-modal__ms-target">{m.target} visas</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            className="bk-sb__cta"
            onClick={onClose}
            style={{ fontFamily: "var(--ff)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
          >
            <PlaneIcon size={16} color="white" />
            <span>Start Earning Rewards — Apply Now</span>
          </button>
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
      {/* TOP BAR */}
      <div className="bk-sb__topbar">
        <div className="bk-sb__guarantee">
          <span>🛡️</span>
          <span>{visaCard.guarantee}</span>
        </div>
        <span className="bk-sb__faster">{visaCard.badge}</span>
      </div>

      <div className="bk-sb__body">
        {/* PRICE */}
        <div className="bk-sb__price-wrap">
          <div className="bk-sb__price-main">₹{total.toLocaleString("en-IN")}</div>
          <div className="bk-sb__price-sub">Total per person</div>
          <div className="bk-sb__price-note">Govt fee + service fee included</div>
        </div>

        {/* CTA */}
        <button className="bk-sb__cta" onClick={onApply} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          <PlaneIcon size={16} color="white" />
          <span>Start Application</span>
          <span>→</span>
        </button>

        <div className="bk-sb__divider" />

        {/* VISA INFO PILLS */}
        <div className="bk-sb__info-grid">
          {[
            { icon: "📋", label: visaCard.type },
            { icon: "📅", label: `Stay: ${visaCard.stay}` },
            { icon: "✅", label: `Valid: ${visaCard.validity}` },
            { icon: "🚪", label: `Entry: ${visaCard.entry}` },
          ].map((p) => (
            <div key={p.label} className="bk-sb__info-pill">
              <span className="bk-sb__info-pill-icon">{p.icon}</span>
              <span>{p.label}</span>
            </div>
          ))}
        </div>

        <div className="bk-sb__divider" />

        {/* FEE BREAKDOWN */}
        <div className="bk-sb__fees">
          <div className="bk-sb__fee-row">
            <span className="bk-sb__fee-icon">🏛️</span>
            <div style={{ flex: 1 }}>
              <div className="bk-sb__fee-name">Govt Fee</div>
              <div className="bk-sb__fee-note">Paid upfront</div>
            </div>
            <div className="bk-sb__fee-right">
              <span className="bk-sb__fee-amount">
                {visaCard.govFee === 0 ? <span className="bk-sb__fee-amount--green">FREE</span> : `₹${visaCard.govFee.toLocaleString("en-IN")}`}
              </span>
            </div>
          </div>

          <div className="bk-sb__fee-row">
            <span className="bk-sb__fee-icon">⭐</span>
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
            <span className="bk-sb__fee-icon">💰</span>
            <div style={{ flex: 1 }}>
              <div className="bk-sb__fee-name" style={{ fontWeight: 800 }}>Total</div>
            </div>
            <span className="bk-sb__fee-amount bk-sb__fee-amount--total">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        
        {/* TRUST */}
        <div className="bk-sb__trust">
          {["🔒 Secure", "✅ Verified", "⭐ Trusted"].map((t) => (
            <div key={t} className="bk-sb__trust-item">
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function BookingPage({ visaId: propVisaId }) {
  const { visaId: paramVisaId } = useParams();
  const visaId = paramVisaId || propVisaId || "uae";
  const data = getVisaData(visaId);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("Info");
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const sectionRefs = useRef({});

  // Register section refs
  const registerRef = useCallback((id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  }, []);

  // Scroll spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.dataset.section);
        });
      },
      { threshold: 0.35 }
    );
    Object.values(sectionRefs.current).forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [data]);

  // Reveal animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".bk-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [data]);

  const scrollTo = (sec) => {
    sectionRefs.current[sec]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleApply = () => {
    alert(`Starting application for ${data.country} visa!\n(Integrate your application form/route here)`);
  };

  return (
    <div className="bk">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bk-hero">
        <div className="bk-hero__bg">
          <img
            src={data.heroImg}
            alt={data.heroAlt}
            className={`bk-hero__img ${heroLoaded ? "loaded" : ""}`}
            onLoad={() => setHeroLoaded(true)}
          />
          <div className="bk-hero__overlay" />
          <div className="bk-hero__grain" />
        </div>

        <div className="bk-hero__content">
          {/* Breadcrumb */}
          <div className="bk-hero__breadcrumb">
            {data.breadcrumb.map((b, i) => (
              <span key={b}>
                {i > 0 && <span className="bk-hero__bc-sep"> / </span>}
                <span className={i === data.breadcrumb.length - 1 ? "bk-hero__bc-last" : ""}>{b}</span>
              </span>
            ))}
          </div>

          <div className="bk-hero__eyebrow">
            <PlaneIcon size={14} color="rgba(255,255,255,0.9)" />
            <span style={{ marginLeft: "6px" }}>{visaCard_eyebrow(data)}</span>
          </div>

          <h1 className="bk-hero__title">
            <span className="bk-hero__flag">{data.flag}</span>{" "}
            {data.country}
          </h1>
          <p className="bk-hero__tagline">{data.tagline}</p>

          <div className="bk-hero__cta-row">
            <button className="bk-hero__btn-start" onClick={handleApply} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <PlaneIcon size={16} color="white" />
              <span>Start Application</span>
            </button>
            <button className="bk-hero__btn-learn" onClick={() => scrollTo("Info")}>
              📋 View Details
            </button>
          </div>

         
        </div>

        {/* Floating trust badge */}
        <div className="bk-hero__badge">
          <span className="bk-hero__badge-icon">🛡️</span>
          <div>
            <div className="bk-hero__badge-title">{data.visaCard.guarantee}</div>
            <div className="bk-hero__badge-sub">{data.authBadge}</div>
          </div>
        </div>
      </section>

      {/* ── NAV TABS ─────────────────────────────────────────────────────── */}
      <nav className="bk-nav">
        <div className="bk-nav__inner">
          {data.navLinks.map((sec) => (
            <button
              key={sec}
              className={`bk-nav__btn ${activeSection === sec ? "active" : ""}`}
              onClick={() => scrollTo(sec)}
            >
              {navIcon(sec)} {sec}
            </button>
          ))}
          <button className="bk-nav__apply" onClick={handleApply} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <PlaneIcon size={14} color="white" />
            <span>Apply Now</span>
          </button>
        </div>
      </nav>

      {/* ── MAIN LAYOUT ──────────────────────────────────────────────────── */}
      <div className="bk-layout">
        {/* LEFT CONTENT */}
        <main className="bk-main">
          {/* ── INFO ───────────────────────────────────────────────────── */}
          <section
            className="bk-section"
            data-section="Info"
            ref={registerRef("Info")}
          >
            <div className="bk-reveal">
              <div className="bk-auth-badge">
                ✅ {data.authBadge}
              </div>
              <SectionHead label="Visa Info" title={`${data.country} Visa Details`} />

              {/* Visa info cards */}
              <div className="bk-info-grid" style={{ marginBottom: "1.5rem" }}>
                {[
                  { icon: "📋", label: "Visa Type", val: data.visaCard.type },
                  { icon: "📅", label: "Length of Stay", val: data.visaCard.stay },
                  { icon: "✅", label: "Validity", val: data.visaCard.validity },
                  { icon: "🚪", label: "Entry Type", val: data.visaCard.entry },
                  { icon: "🛡️", label: "Guarantee", val: data.visaCard.guarantee },
                  
                ].map((c) => (
                  <div key={c.label} className="bk-info-card">
                    <span className="bk-info-card__icon">{c.icon}</span>
                    <div>
                      <div className="bk-info-card__label">{c.label}</div>
                      <div className="bk-info-card__val">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              
            </div>
          </section>

          {/* ── PROCESS ────────────────────────────────────────────────── */}
          <section
            className="bk-section"
            data-section="Process"
            ref={registerRef("Process")}
          >
            <div className="bk-reveal">
              <SectionHead label="How It Works" title="Simple 4-Step Process" />
              <div className="bk-steps">
                {data.process.map((step, i) => (
                  <div key={step.step} className="bk-step">
                    <div className="bk-step__col">
                      <div className="bk-step__dot">{step.icon}</div>
                      {i < data.process.length - 1 && <div className="bk-step__line" />}
                    </div>
                    <div className="bk-step__body">
                      <div className="bk-step__num">STEP {step.step}</div>
                      <div className="bk-step__title">{step.title}</div>
                      <div className="bk-step__desc">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          
          <section
            className="bk-section"
            data-section="Why Us"
            ref={registerRef("Why Us")}
          >
            <div className="bk-reveal">
              
              

              {/* Reviews inline */}
              <div style={{ marginTop: "2rem" }}>
                <div className="bk-reviews-meta">
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: ".2rem" }}>Customer Reviews</div>
                    <div style={{ fontFamily: "var(--ff2)", fontSize: ".82rem", color: "var(--ink-soft)" }}>
                      {data.reviewCount} verified reviews
                    </div>
                  </div>
                  <div className="bk-reviews-score">
                    <div className="bk-reviews-score__num">{data.reviewScore}</div>
                    <div>
                      <div className="bk-reviews-score__stars">★★★★★</div>
                      <div className="bk-reviews-score__count">{data.reviewCount} reviews</div>
                    </div>
                  </div>
                </div>
                <div className="bk-reviews-grid">
                  {data.reviews.map((r) => (
                    <div key={r.name} className="bk-review">
                      <div className="bk-review__top">
                        <div
                          className="bk-review__avatar"
                          style={{ background: avatarColor(r.name) }}
                        >
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="bk-review__name">{r.name}</div>
                          <div className="bk-review__date">{r.date}</div>
                        </div>
                        <div className="bk-review__stars"><Stars n={r.rating} /></div>
                      </div>
                      <div className="bk-review__title">"{r.title}"</div>
                      <div className="bk-review__body">{r.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── ESSENTIALS ─────────────────────────────────────────────── */}
          <section
            className="bk-section"
            data-section="Essentials"
            ref={registerRef("Essentials")}
          >
            <div className="bk-reveal">
              <SectionHead label="Required Documents" title="What You'll Need" />
              <div className="bk-essentials">
                {data.essentials.map((e) => (
                  <div key={e.title} className="bk-ess-card">
                    <img src={e.img} alt={e.title} className="bk-ess-card__img" loading="lazy" />
                    <div className="bk-ess-card__body">
                      <div className="bk-ess-card__icon">{e.icon}</div>
                      <div className="bk-ess-card__title">{e.title}</div>
                      <div className="bk-ess-card__desc">{e.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Apply CTA inline */}
              <div style={{ marginTop: "1.5rem", background: "linear-gradient(90deg,#fffbeb,#fef3c7)", border: "1.5px solid #fde68a", borderRadius: "var(--r)", padding: "1.2rem 1.4rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--accent-dk)", marginBottom: ".25rem" }}>
                    Ready with your documents?
                  </div>
                  <div style={{ fontFamily: "var(--ff2)", fontSize: ".83rem", color: "var(--ink-soft)" }}>
                    Apply now and get your visa in {data.visaCard.guarantee.replace("Guaranteed in ", "").replace("Application in ", "")}
                  </div>
                </div>
                <button className="bk-hero__btn-start" onClick={handleApply} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <PlaneIcon size={15} color="white" />
                  <span>Start Application</span>
                </button>
              </div>
            </div>
          </section>

          {/* ── FAQ ────────────────────────────────────────────────────── */}
          <section
            className="bk-section"
            data-section="FAQ"
            ref={registerRef("FAQ")}
          >
            <div className="bk-reveal">
              <SectionHead label={`${data.country} FAQ`} title="Frequently Asked Questions" />
              <div className="bk-faqs">
                {data.faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>

              {/* Bottom CTA */}
              <div style={{ marginTop: "2rem", textAlign: "center", padding: "2rem", background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: "var(--rl)" }}>
                <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>🎯</div>
                <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--ink)", marginBottom: ".5rem" }}>
                  Ready to Visit {data.country}?
                </div>
                <div style={{ fontFamily: "var(--ff2)", color: "var(--ink-soft)", fontSize: ".9rem", marginBottom: "1.2rem" }}>
                  Join 50,000+ Indians who trust TheVisa for their travel documents.
                </div>
                <button className="bk-hero__btn-start" onClick={handleApply} style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                  <PlaneIcon size={15} color="white" />
                  <span>Apply for {data.country} Visa</span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="bk-sidebar-wrap">
          <Sidebar data={data} onApply={handleApply} />
        </aside>
      </div>

      {/* ── FLOATING APPLY BUTTON ─────────────────────────────────────── */}
      <button className="bk-fab" onClick={handleApply} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        <span className="bk-fab__dot" />
        <PlaneIcon size={15} color="white" />
        <span>Apply Now</span>
      </button>

      {/* ── REWARDS BUTTON ────────────────────────────────────────────── */}
      <button className="bk-rewards-btn" onClick={() => setRewardsOpen(true)}>
        <span className="bk-rewards-btn__coins">🪙</span>
        <span>Rewards</span>
      </button>

      {/* ── REWARDS MODAL ─────────────────────────────────────────────── */}
      <RewardsModal open={rewardsOpen} onClose={() => setRewardsOpen(false)} />
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────
function navIcon(sec) {
  const map = { Info: "ℹ️", Process: "⚙️", "Why Us": "⭐", Essentials: "📄", FAQ: "❓" };
  return map[sec] || "";
}

function visaCard_eyebrow(data) {
  const vc = data.visaCard;
  if (vc.govFee === 0) return `${vc.type} · FREE Govt Fee`;
  return `${vc.type} · ${vc.guarantee}`;
}