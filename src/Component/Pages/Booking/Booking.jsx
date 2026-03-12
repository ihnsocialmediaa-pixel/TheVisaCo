import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./Booking.css";

import { getVisaData } from "./visaData"; // ← import data helper

// ─── INTERSECTION OBSERVER HOOK ──────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
const ShieldCheck = ({ size = 16, stroke = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);

const UserIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
  </svg>
);

const BoltIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// ─── ANIMATED SECTION WRAPPER ─────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`book-reveal ${visible ? "book-reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── HERO BANNER ─────────────────────────────────────────────────────────────
function HeroBanner({ data }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="book-hero">
      <div className="book-hero__media">
        <img
          className={`book-hero__img ${loaded ? "book-hero__img--loaded" : ""}`}
          src={data.heroImg}
          alt={data.heroAlt}
          onLoad={() => setLoaded(true)}
        />
        <div className="book-hero__overlay" />
        <div className="book-hero__particles">
          {[...Array(6)].map((_, i) => (
            <span key={i} className={`book-hero__particle book-hero__particle--${i + 1}`} />
          ))}
        </div>
      </div>

      <div className="book-hero__content">
        {/* Breadcrumb */}
        <div className="book-hero__breadcrumb">
          {data.breadcrumb.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="book-hero__bc-sep">›</span>}
              <span className={i === data.breadcrumb.length - 1 ? "book-hero__bc-active" : ""}>{crumb}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Title */}
        <h1 className="book-hero__title">
          <span className="book-hero__title-flag">{data.flag}</span> <br />
          {data.title} Visa
        </h1>

        {/* Pills */}
        <div className="book-hero__pills">
          {data.pills.map((pill, i) =>
            pill.strong ? (
              <div key={i} className="book-hero__pill book-hero__pill--guarantee">
                <ShieldCheck size={15} stroke="currentColor" />
                {pill.text} <strong>{pill.strong}</strong>
              </div>
            ) : (
              <div key={i} className="book-hero__pill book-hero__pill--stat">{pill.text}</div>
            )
          )}
        </div>

        {/* Actions */}
        <div className="book-hero__actions">
          <Link to='/application-form' className="book-hero__btn-primary">
            Start Application
            <ArrowRight size={16} />
          </Link>
          <button className="book-hero__btn-secondary">View Requirements</button>
        </div>

        {/* Stats */}
        <div className="book-hero__stats">
          {data.stats.map(([v, l]) => (
            <div className="book-hero__stat" key={l}>
              <span className="book-hero__stat-val">{v}</span>
              <span className="book-hero__stat-lab">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BOOKING SIDEBAR ─────────────────────────────────────────────────────────
function BookingSidebar({ data }) {
  const [travellers, setTravellers] = useState(1);
  const [visaType, setVisaType]     = useState(data.visaTypes[0]);
  const [pulse, setPulse]           = useState(false);

  // reset visa type when data changes (different visa page)
  useEffect(() => {
    setVisaType(data.visaTypes[0]);
    setTravellers(1);
  }, [data]);

  const govFee  = data.govFee;
  const svcFee  = data.svcFee;
  const svcOrig = data.svcOrig;
  const total   = (govFee + svcFee) * travellers;

  const handleTravellers = (n) => {
    setTravellers(Math.max(1, n));
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  return (
    <aside className="book-sb">
      {/* Guarantee bar */}
      <div className="book-sb__topbar">
        <div className="book-sb__topbar-left">
          <ShieldCheck size={13} stroke="#b45309" />
          <span>{data.guaranteeText}</span>
        </div>
        <div className="book-sb__topbar-right">
          <BoltIcon size={12} />
          <span>{data.fasterText}</span>
        </div>
      </div>

      <div className="book-sb__body">
        {/* Visa Type */}
        <div className="book-sb__field">
          <label className="book-sb__label">Visa Type</label>
          <div className="book-sb__select-wrap">
            <select
              className="book-sb__select"
              value={visaType}
              onChange={e => setVisaType(e.target.value)}
            >
              {data.visaTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <svg className="book-sb__select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Travellers */}
        <div className="book-sb__field book-sb__field--row">
          <label className="book-sb__label book-sb__label--inline">
            <UserIcon size={15} /> Travellers
          </label>
          <div className="book-sb__counter">
            <button className="book-sb__counter-btn" onClick={() => handleTravellers(travellers - 1)}>−</button>
            <span className={`book-sb__counter-val ${pulse ? "book-sb__counter-val--pulse" : ""}`}>{travellers}</span>
            <button className="book-sb__counter-btn book-sb__counter-btn--plus" onClick={() => handleTravellers(travellers + 1)}>+</button>
          </div>
        </div>

        {/* Price */}
        <div className="book-sb__price-block">
          <div className={`book-sb__price ${pulse ? "book-sb__price--pulse" : ""}`}>
            ₹{(govFee * travellers).toLocaleString()}
          </div>
          <div className="book-sb__price-label">TO BE PAID NOW</div>
          <div className="book-sb__price-note">Government fee only · Service fee after visa</div>
        </div>

        {/* CTA */}
        <button className="book-sb__cta">
          <span>Start Application</span>
          <ArrowRight size={16} />
        </button>

        {/* Fee breakdown */}
        <div className="book-sb__breakdown">
          <div className="book-sb__fee-row">
            <div className="book-sb__fee-left">
              <span className="book-sb__fee-icon">🏛️</span>
              <div>
                <div className="book-sb__fee-title">Pay Now</div>
                <div className="book-sb__fee-sub">Government fee</div>
              </div>
            </div>
            <div className="book-sb__fee-amount">₹{(govFee * travellers).toLocaleString()}</div>
          </div>

          <div className="book-sb__fee-row book-sb__fee-row--deferred">
            <div className="book-sb__fee-left">
              <span className="book-sb__fee-icon">⏰</span>
              <div>
                <div className="book-sb__fee-title">Pay After Approval</div>
                <div className="book-sb__fee-sub">TheVisa service fees</div>
              </div>
            </div>
            <div className="book-sb__fee-right">
              <span className="book-sb__fee-amount">₹{(svcFee * travellers).toLocaleString()}</span>
              <span className="book-sb__fee-strike">₹{(svcOrig * travellers).toLocaleString()}</span>
            </div>
          </div>

          <div className="book-sb__divider" />

          <div className="book-sb__fee-row book-sb__fee-row--total">
            <div className="book-sb__fee-left">
              <span className="book-sb__fee-icon">💳</span>
              <div className="book-sb__fee-title">Total Amount</div>
            </div>
            <div className="book-sb__fee-amount book-sb__fee-amount--total">₹{total.toLocaleString()}</div>
          </div>

          <Link to="#" className="book-sb__unlock">🔒 Unlock a lower price</Link>
        </div>

        {/* Protect card */}
        <div className="book-sb__protect">
          <div className="book-sb__protect-inner">
            <div className="book-sb__protect-head">
              <div className="book-sb__protect-icon"><ShieldCheck size={18} stroke="#fff" /></div>
              <div>
                <div className="book-sb__protect-title">TheVisa Protect</div>
                <div className="book-sb__protect-tagline">Zero risk, guaranteed</div>
              </div>
              <span className="book-sb__protect-badge">FREE</span>
            </div>
            <div className="book-sb__protect-items">
              <div className="book-sb__protect-item">
                <span className="book-sb__protect-check">✓</span>
                <span>Visa delayed? <strong>No service fee</strong></span>
              </div>
              <div className="book-sb__protect-item">
                <span className="book-sb__protect-check">✓</span>
                <span>Visa rejected? <strong>100% refund</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Helpline */}
        <div className="book-sb__help">
          <div>
            <div className="book-sb__help-title">Have Questions?</div>
            <div className="book-sb__help-sub">Docs, process, price, anything</div>
          </div>
          <Link to="tel:18002028597" className="book-sb__help-btn">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.22 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            1800-202-8597
          </Link>
        </div>
      </div>
    </aside>
  );
}

// ─── MAIN CONTENT ─────────────────────────────────────────────────────────────
function MainContent({ data }) {
  const [openFaq, setOpenFaq]           = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(0);

  // Reset state when visa data changes
  useEffect(() => {
    setOpenFaq(null);
    setSelectedSlot(0);
  }, [data]);

  return (
    <div className="book-main">

      {/* ── AUTH BADGE ─────────────────────────────────────────────── */}
      <Reveal>
        <div className="book-auth-badge">
          <ShieldCheck size={14} stroke="#fff" />
          {data.authBadge}
        </div>
      </Reveal>

      {/* ── VISA INFO ──────────────────────────────────────────────── */}
      <Reveal className="book-section">
        <h2 className="book-sec-title">{data.title} Visa Information</h2>
        <div className="book-info-grid">
          {data.visaInfo.map((item, i) => (
            <Reveal key={i} delay={i * 60} className="book-info-card">
              <div className="book-info-card__icon">{item.icon}</div>
              <div>
                <div className="book-info-card__label">{item.label}</div>
                {item.link
                  ? <Link to="#" className="book-info-card__val book-info-card__val--link">{item.value}</Link>
                  : <div className="book-info-card__val">{item.value}</div>
                }
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── TIMESLOTS ──────────────────────────────────────────────── */}
      <Reveal className="book-section">
        <h2 className="book-sec-title">
          <span className="book-sec-title__dot" />
          {data.slotSectionTitle}
        </h2>
        <div className="book-slots">
          {data.timeslots.map((slot, i) => (
            <div
              key={i}
              className={`book-slot ${selectedSlot === i ? "book-slot--active" : ""}`}
              onClick={() => setSelectedSlot(i)}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="book-slot__badge">{slot.days}</div>
              <div className="book-slot__row">
                <div className="book-slot__icon-wrap">
                  <ShieldCheck size={16} stroke={selectedSlot === i ? "#002236" : "#9ca3af"} />
                </div>
                <div className="book-slot__info">
                  <div className="book-slot__datetime">{slot.date} at {slot.time}</div>
                  <Link to="#" className="book-slot__timeline">⊙ View Timeline</Link>
                </div>
                {selectedSlot === i
                  ? <div className="book-slot__selected">✓ Selected</div>
                  : <button className="book-slot__btn">Select</button>
                }
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── DESTINATION GRID ───────────────────────────────────────── */}
      <Reveal className="book-section">
        <h2 className="book-sec-title">{data.emiratesSectionTitle}</h2>
        <div className="book-em-grid">
          <div className="book-em-row book-em-row--top">
            {data.emirates.slice(0, 3).map((em, i) => (
              <div className="book-em-card" key={i} style={{ animationDelay: `${i * 80}ms` }}>
                <img src={em.img} alt={em.name} className="book-em-card__img"
                  onError={e => e.target.style.display = "none"} />
                <div className="book-em-card__overlay" />
                <span className="book-em-card__name">{em.name}</span>
              </div>
            ))}
          </div>
          <div className="book-em-row book-em-row--bottom">
            {data.emirates.slice(3, 7).map((em, i) => (
              <div className="book-em-card" key={i} style={{ animationDelay: `${(i + 3) * 80}ms` }}>
                <img src={em.img} alt={em.name} className="book-em-card__img"
                  onError={e => e.target.style.display = "none"} />
                <div className="book-em-card__overlay" />
                <span className="book-em-card__name">{em.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── REQUIREMENTS ───────────────────────────────────────────── */}
      <Reveal className="book-section">
        <h2 className="book-sec-title">{data.title} Visa Requirements</h2>
        <div className="book-req-grid">
          {data.requirements.map((r, i) => (
            <Reveal key={i} delay={i * 55} className="book-req-card">
              <div className="book-req-card__icon">{r.icon}</div>
              <div>
                <div className="book-req-card__title">{r.title}</div>
                <div className="book-req-card__desc">{r.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── PARTNERS ───────────────────────────────────────────────── */}
      <Reveal className="book-section">
        <h2 className="book-sec-title">Partners We Work With</h2>
        <div className="book-partners-row">
          {data.partners.map((p, i) => (
            <Reveal key={i} delay={i * 80} className="book-partner-card">
              <div className="book-partner-card__abbr" style={{ color: p.color }}>{p.abbr}</div>
              <div className="book-partner-card__name">{p.name}</div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── PROCESS STEPS ──────────────────────────────────────────── */}
      <Reveal className="book-section">
        <h2 className="book-sec-title">How {data.title} Visa Process Works</h2>
        <div className="book-steps">
          {data.steps.map((s, i) => (
            <Reveal key={i} delay={i * 100} className="book-step">
              <div className="book-step__spine">
                <div className="book-step__circle">{s.icon}</div>
                {i < data.steps.length - 1 && <div className="book-step__line" />}
              </div>
              <div className="book-step__card">
                <div className="book-step__num">{s.num}</div>
                <div className="book-step__title">{s.title}</div>
                <div className="book-step__desc">{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── REVIEWS ────────────────────────────────────────────────── */}
      <Reveal className="book-section">
        <div className="book-reviews-top">
          <div>
            <h2 className="book-sec-title" style={{ marginBottom: ".3rem" }}>What Travellers Say</h2>
            <p className="book-reviews-sub">Real reviews from verified applicants</p>
          </div>
          <div className="book-reviews-score">
            <div className="book-reviews-score__num">{data.reviewScore}</div>
            <div>
              <div className="book-reviews-score__stars">★★★★★</div>
              <div className="book-reviews-score__count">{data.reviewCount} reviews</div>
            </div>
          </div>
        </div>
        <div className="book-reviews-grid">
          {data.reviews.map((r, i) => (
            <Reveal key={i} delay={i * 60} className="book-review-card">
              <div className="book-review-card__top">
                <div className="book-review-card__avatar"
                  style={{ background: `hsl(${(i * 47 + 20) % 360},55%,45%)` }}>
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="book-review-card__name">{r.name} {r.flag}</div>
                  <div className="book-review-card__date">{r.date}</div>
                </div>
                <div className="book-review-card__stars">{"★".repeat(r.rating)}</div>
              </div>
              <div className="book-review-card__title">"{r.title}"</div>
              <div className="book-review-card__body">{r.body}</div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <Reveal className="book-section">
        <h2 className="book-sec-title">Frequently Asked Questions</h2>

        <div className="book-faq">
          {data.faqs.map((faq, i) => {
            const isOpen = openFaq === i;

            return (
              <div
                key={i}
                className={`book-faq__item ${isOpen ? "book-faq__item--open" : ""}`}
              >
                <button
                  className="book-faq__q"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span className="book-faq__q-text">{faq.q}</span>
                  <span className={`book-faq__icon ${isOpen ? "book-faq__icon--open" : ""}`}>
                    +
                  </span>
                </button>

                <div className={`book-faq__a-wrap ${isOpen ? "book-faq__a-wrap--open" : ""}`}>
                  <div className="book-faq__a">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

    </div>
  );
}

export default function Booking({ visaId: propVisaId } = {}) {
  const { visaId: paramVisaId } = useParams();
  const visaId = propVisaId || paramVisaId || "uae-30";
  const data = getVisaData(visaId);

  // Scroll to top when visa changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [visaId]);

  return (
    <div className="book-app">
      <HeroBanner data={data} />
      <div className="book-layout">

        {/* LEFT */}
        <div className="book-layout__content">
          <MainContent data={data} />
        </div>

        {/* RIGHT */}
        <div className="book-layout__sidebar-sticky">
          <BookingSidebar data={data} />
        </div>

      </div>
    </div>
  );
}