import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { visaList } from "../Booking/bookingdata";

// ─── DATA IMPORTS ─────────────────────────────────────────────────────────────
import { destinations, REGIONS, VISA_TYPES} from "./homeData/destinations";
import { faqs } from "./homeData/faqs";
import { POPULARITY_STYLES } from "./homeData/popularityStyles";
import { countries } from "./homeData/countries";
import { steps } from "./homeData/steps";
import { reviews } from "./homeData/reviews";
import { GUEST_EMAIL, enquiryOptions, topics, timeSlots } from "./homeData/contactData";


// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getVisaIdForDestination(name) {
  const normalized = name.trim().toLowerCase();
  
  // Try exact match first
  const exact = visaList.find(v => v.country.toLowerCase() === normalized);
  if (exact) return exact.id;
  
  // Handle special cases where destination name differs from visaList country name
  const nameMap = {
    "united arab emirates": "uae",
    "united states": "usa",
    "new zealand": "new-zealand",
    "hong kong": "hong-kong",
  };
  
  for (const [key, id] of Object.entries(nameMap)) {
    if (normalized.includes(key)) return id;
  }
  
  // Fuzzy match — check if any visaList country contains the name or vice versa
  const fuzzy = visaList.find(v =>
    v.country.toLowerCase().includes(normalized) ||
    normalized.includes(v.country.toLowerCase())
  );
  if (fuzzy) return fuzzy.id;
  
  // Last resort fallback
  return "uae";
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ search, setSearch }) {
  return (
    <section className="home-hero">
      <div className="home-hero__bg">
        <div className="home-hero__orb home-hero__orb--1"/>
        <div className="home-hero__orb home-hero__orb--2"/>
        <div className="home-hero__orb home-hero__orb--3"/>
        <div className="home-hero__orb home-hero__orb--4"/>
        <div className="home-hero__orb home-hero__orb--5"/>
        <div className="home-hero__orb home-hero__orb--6"/>
        <div className="home-hero__grid"/>
      </div>

      <div className="home-hero__inner">
        <h1 className="home-hero__title" data-aos="fade-up" data-aos-delay="100">
          Get Your Visa<br/>
          <span className="home-hero__title-accent">On Time</span>
        </h1>

        

        <div className="home-search-wrap" data-aos="zoom-in-up" data-aos-delay="300">
          <div className="home-search">
            <svg className="home-search__icon" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="#003a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
            <span className="home-search__divider"/>
            <input
              id="hero-search"
              name="hero-search"
              className="home-search__input"
              type="text"
              placeholder="Select destination country…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="home-search__clear" onClick={() => setSearch("")} aria-label="Clear">✕</button>
            )}
            <button className="home-search__btn">Search</button>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── DEST CARD ────────────────────────────────────────────────────────────────
function DestCard({ dest, index }) {
  const visaId = getVisaIdForDestination(dest.name);
  const popStyle = POPULARITY_STYLES[dest.popularity] || { color: "#e5e7eb", bg: "rgba(255,255,255,.15)" };

  return (
    <Link
      to={`/visa/${visaId}`}
      className="home-dcard"
      aria-label={`View ${dest.name} visa options`}
      data-aos="fade-up"
      data-aos-delay={Math.min((index % 5) * 60, 240)}
    >
      {/* ── Full-bleed image ── */}
      <div className="home-dcard__img-wrap">
        <img
          className="home-dcard__img"
          src={dest.img}
          alt={dest.name}
          loading="lazy"
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="home-dcard__fallback">🌍</div>
      </div>

      {/* ── Gradient scrim ── */}
      <div className="home-dcard__scrim" />

      {/* ── Visa type — top right ── */}
      <div className="home-dcard__tag">{dest.tag}</div>

      {/* ── Visa count — top left ── */}
      <div className="home-dcard__badge">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955
            11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9
            11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
        {dest.visaCount} Visas
      </div>

      {/* ── Body — pinned to bottom ── */}
      <div className="home-dcard__body">

        {/* Name row + popularity badge */}
        <div className="home-dcard__name-row">
          <h3 className="home-dcard__name">{dest.name}</h3>
          {dest.popularity && (
            <span
              className="home-dcard__popularity"
              style={{ color: popStyle.color, background: popStyle.bg }}
            >
              {dest.popularity}
            </span>
          )}
        </div>

        {/* Timing */}
        {dest.timing && (
          <p className="home-dcard__timing">{dest.timing}</p>
        )}

        <div className="home-dcard__divider" />

        {/* Footer: best price + strikethrough left · discounted fee right */}
        <div className="home-dcard__footer">
          <div className="home-dcard__price-block">
            <span className="home-dcard__best-label">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                style={{ display:"inline-block", verticalAlign:"middle", marginRight:"3px", marginTop:"-1px" }}>
                <polyline points="2 6 5 9 10 3"/>
              </svg>
              Actual Price
            </span>
            {dest.originalFee && (
              <span className="home-dcard__original-fee">{dest.originalFee}</span>
            )}
          </div>
          <span className="home-dcard__fee">{dest.fee}</span>
        </div>

      </div>
    </Link>
  );
}
// ─── useCardLimit hook (must be before DestGrid) ──────────────────────────────
function useCardLimit() {
  const [limit, setLimit] = React.useState(15);
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 600)      setLimit(4);
      else if (w <= 991) setLimit(9);
      else               setLimit(15);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return limit;
}


// ─── REPLACE the entire DestGrid function with this ──────────────────────────
 
function DestGrid({ search }) {
  const [region, setRegion] = React.useState("All");
  const [type,   setType]   = React.useState("All");
 
  // Track which dropdown is open
  const [openDrop, setOpenDrop] = React.useState(null); // "region" | "type" | null
 
  const limit = useCardLimit();
 
  const filtered = destinations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === "All" || d.region === region;
    const matchType   = type   === "All" || d.tag    === type;
    return matchSearch && matchRegion && matchType;
  });
 
  const shown = filtered.slice(0, limit);
 
  const activeRegionLabel = REGIONS.find(r => r.value === region)?.label || "🌍 All Regions";
  const activeTypeLabel   = VISA_TYPES.find(t => t.value === type)?.label   || "🗂️ All Types";
 
  const hasFilters = region !== "All" || type !== "All";
 
  const clearAll = () => { setRegion("All"); setType("All"); };
 
  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handler = () => setOpenDrop(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
 
  return (
    <section className="home-dest-section">
      <div className="home-dest-section__inner">
 
        <div className="home-dest-section__head" data-aos="fade-up">
          <div>
            <span className="home-sec-tag home-sec-tag--dark">Explore Destinations</span>
            <h2 className="home-dest-section__title">Where do you want to go?</h2>
          </div>
        </div>
 
        {/* ── Filter Bar with two dropdowns ── */}
        <div className="home-filter-bar" data-aos="fade-up" data-aos-delay="100">
 
          {/* Region Dropdown */}
          <div
            className="home-filter-dropdown"
            onClick={e => { e.stopPropagation(); setOpenDrop(openDrop === "region" ? null : "region"); }}
          >
            <button className={`home-filter-dropdown__btn${region !== "All" ? " home-filter-dropdown__btn--active" : ""}`}>
              <span>{activeRegionLabel}</span>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: "transform .22s ease", transform: openDrop === "region" ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
 
            {openDrop === "region" && (
              <div className="home-filter-dropdown__menu" onClick={e => e.stopPropagation()}>
                {REGIONS.map(r => (
                  <button
                    key={r.value}
                    className={`home-filter-dropdown__item${region === r.value ? " home-filter-dropdown__item--active" : ""}`}
                    onClick={() => { setRegion(r.value); setOpenDrop(null); }}
                  >
                    {r.label}
                    {region === r.value && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
 
          {/* Visa Type Dropdown */}
          <div
            className="home-filter-dropdown"
            onClick={e => { e.stopPropagation(); setOpenDrop(openDrop === "type" ? null : "type"); }}
          >
            <button className={`home-filter-dropdown__btn${type !== "All" ? " home-filter-dropdown__btn--active" : ""}`}>
              <span>{activeTypeLabel}</span>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: "transform .22s ease", transform: openDrop === "type" ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
 
            {openDrop === "type" && (
              <div className="home-filter-dropdown__menu" onClick={e => e.stopPropagation()}>
                {VISA_TYPES.map(t => (
                  <button
                    key={t.value}
                    className={`home-filter-dropdown__item${type === t.value ? " home-filter-dropdown__item--active" : ""}`}
                    onClick={() => { setType(t.value); setOpenDrop(null); }}
                  >
                    {t.label}
                    {type === t.value && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
 
          {/* Clear filters pill (only when filters are active) */}
          {hasFilters && (
            <button className="home-filter-clear" onClick={clearAll}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear
            </button>
          )}
 
          <span className="home-filter-bar__count">{filtered.length} destinations</span>
        </div>
 
        {shown.length > 0 ? (
          <div className="home-dest-grid">
            {shown.map((d, i) => <DestCard key={d.id} dest={d} index={i} />)}
          </div>
        ) : (
          <div className="home-empty" data-aos="fade-up">
            <div className="home-empty__emoji">🔍</div>
            <h3>No results found</h3>
            <p>Try a different region, visa type, or search term.</p>
          </div>
        )}
 
      </div>
    </section>
  );
}
// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const [current, setCurrent] = React.useState(0);
  const [exitDir, setExitDir]   = React.useState(null);
  const total = steps.length;

  const go = (dir) => {
    const next = dir === "left" ? current + 1 : current - 1;
    if (next < 0 || next >= total) return;
    setExitDir(dir);
    setTimeout(() => { setExitDir(null); setCurrent(next); }, 490);
  };

  const handleDot = (i) => {
    if (i === current) return;
    go(i > current ? "left" : "right");
    setExitDir(i > current ? "left" : "right");
    setTimeout(() => { setExitDir(null); setCurrent(i); }, 490);
  };

  const getPos = (i) => {
    const diff = i - current;
    return diff < 0 ? null : diff;
  };

  const PrevBtn = () => (
    <button
      className="home-how__nav-btn"
      onClick={() => go("right")}
      disabled={current === 0}
      aria-label="Previous step"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
  );

  const NextBtn = () => (
    <button
      className="home-how__nav-btn"
      onClick={() => go("left")}
      disabled={current === total - 1}
      aria-label="Next step"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  );

  return (
    <section className="home-how">
      <div className="home-how__inner">

        <div className="home-how__head" data-aos="fade-up">
          <div className="home-how__head-text">
            <span className="home-sec-tag">How It Works</span>
            <h2 className="home-how__head-title">
              Your visa, handled<br/>from start to finish
            </h2>
            <p className="home-how__head-sub">
              No embassy visits. No paperwork confusion. Just your approved visa, on time.
            </p>
          </div>
        </div>

        <div className="home-how__deck-row" data-aos="fade-up" data-aos-delay="100">

          <PrevBtn />

          <div className="home-how__stage">
            {steps.map((step, i) => {
              const pos = getPos(i);
              if (pos === null) return null;

              const isExiting = exitDir !== null && i === current;
              const exitClass = isExiting
                ? ` home-how__card--exit-${exitDir}`
                : "";

              return (
                <div
                  key={step.num}
                  className={`home-how__card${exitClass}`}
                  data-pos={Math.min(pos, 4)}
                  data-step={step.num}
                >
                  <div className="home-how__card-icon">{step.icon}</div>
                  <div className="home-how__card-step">Step {step.num}</div>
                  <h3 className="home-how__card-title">{step.title}</h3>
                  <p className="home-how__card-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <NextBtn />

          <div className="home-how__mobile-nav">
            <PrevBtn />
            <span className="home-how__nav-counter">{current + 1} / {total}</span>
            <NextBtn />
          </div>

        </div>

        <div className="home-how__footer">
          <div className="home-how__dots">
            {steps.map((_, i) => (
              <button
                key={i}
                className={`home-how__dot${i === current ? " home-how__dot--active" : ""}`}
                onClick={() => handleDot(i)}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
// ─── TESTIMONIALS + FEEDBACK ──────────────────────────────────────────────────

function Testimonials() {
  const [submitted, setSubmitted]   = React.useState(false);
  const [hoveredStar, setHoveredStar] = React.useState(0);
  const [form, setForm] = React.useState({ name:"", country:"", rating:0, text:"" });
  const [errors, setErrors] = React.useState({});
  const [userReviews, setUserReviews] = React.useState([]);

  const avatarGradients = [
    "linear-gradient(135deg,#002236,#003a5c)",
    "linear-gradient(135deg,#003a5c,#b45309)",
    "linear-gradient(135deg,#0d9488,#002236)",
    "linear-gradient(135deg,#6d28d9,#002236)",
    "linear-gradient(135deg,#b45309,#92400e)",
  ];

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.country.trim()) e.country = "Route is required (e.g. Delhi → Paris)";
    if (!form.rating)         e.rating  = "Please select a star rating";
    if (form.text.trim().length < 20) e.text = "Please write at least 20 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setUserReviews(prev => [{
      name: form.name.trim(),
      country: form.country.trim(),
      rating: form.rating,
      text: form.text.trim(),
      avatar: form.name.trim()[0].toUpperCase(),
      isNew: true,
    }, ...prev]);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name:"", country:"", rating:0, text:"" });
    setErrors({});
    setSubmitted(false);
  };

  const allReviews = [...userReviews, ...reviews];
  const [visibleReviews, setVisibleReviews] = React.useState(3);
  const shownReviews = allReviews.slice(0, visibleReviews);

  return (
    <section className="home-testi">
      <div className="home-testi__bg" aria-hidden="true">
        <div className="home-testi__orb home-testi__orb--1"/>
        <div className="home-testi__orb home-testi__orb--2"/>
        <div className="home-testi__orb home-testi__orb--3"/>
        <div className="home-testi__grid"/>
        <span className="home-testi__deco home-testi__deco--1">"</span>
        <span className="home-testi__deco home-testi__deco--2">"</span>
        <span className="home-testi__deco home-testi__deco--3">★</span>
      </div>

      <div className="home-testi__inner">

        <div className="home-testi__head" data-aos="fade-up">
          <span className="home-sec-tag" style={{ color:"#F4B342", background:"rgba(244,179,66,.15)" }}>
            What Travellers Say
          </span>
          <h2 className="home-testi__title">Trusted by <span className="home-testi__title-accent">180,000+</span> travellers</h2>
          <p className="home-testi__sub">Real people. Real visas. Real stories.</p>

          <div className="home-testi__aggregate">
            <div className="home-testi__stars-row">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="home-testi__aggregate-score">4.9</span>
            <span className="home-testi__aggregate-count">from 12,400+ reviews</span>
          </div>
        </div>

        <div className="home-testi__grid-reviews">
         {shownReviews.map((r, i) => (
            <div
              key={i}
              className={`home-testi__card${r.isNew ? " home-testi__card--new" : ""}`}
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 70, 350)}
            >
              <span className="home-testi__card-watermark">"</span>

              <div className="home-testi__card-stars">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24"
                    fill={s <= r.rating ? "#f59e0b" : "#d4dde6"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                {r.isNew && <span className="home-testi__card-new-badge">New</span>}
              </div>

              <p className="home-testi__card-text">"{r.text}"</p>

              <div className="home-testi__card-author">
                <div className="home-testi__card-avatar"
                  style={{ background: avatarGradients[i % avatarGradients.length] }}>
                  {r.avatar}
                </div>
                <div>
                  <div className="home-testi__card-name">{r.name}</div>
                  <div className="home-testi__card-route">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" style={{marginRight:"4px",verticalAlign:"middle"}}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    {r.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {allReviews.length > 3 && (
          <div className="home-view-more-wrap">
            <button
              className="home-view-more-btn"
              onClick={() => setVisibleReviews(v => v < allReviews.length ? Math.min(v + 3, allReviews.length) : 3)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points={visibleReviews >= allReviews.length ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
              </svg>
              {visibleReviews >= allReviews.length
                ? "Show Less"
                : `View More Reviews (${allReviews.length - visibleReviews} remaining)`}
            </button>
          </div>
        )}

        {/* FEEDBACK FORM */}
        <div className="home-feedback" data-aos="fade-up" data-aos-delay="100">

          <div className="home-feedback__left">
            <span className="home-sec-tag" style={{ color:"#002236", background:"white" }}>
              Share Your Experience
            </span>
            <h3 className="home-feedback__title">How was your<br/>visa journey?</h3>
            <p className="home-feedback__desc">
              Your review helps thousands of other travellers make the right choice.
              It takes less than a minute.
            </p>
            <div className="home-feedback__stats">
              <div className="home-feedback__stat">
                <span className="home-feedback__stat-num">12K+</span>
                <span className="home-feedback__stat-lbl">Reviews</span>
              </div>
              <div className="home-feedback__stat-divider"/>
              <div className="home-feedback__stat">
                <span className="home-feedback__stat-num">4.9★</span>
                <span className="home-feedback__stat-lbl">Avg Rating</span>
              </div>
              <div className="home-feedback__stat-divider"/>
              <div className="home-feedback__stat">
                <span className="home-feedback__stat-num">98%</span>
                <span className="home-feedback__stat-lbl">Recommend</span>
              </div>
            </div>
          </div>

          <div className="home-feedback__right">
            {submitted ? (
              <div className="home-feedback__success">
                <div className="home-feedback__success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h4 className="home-feedback__success-title">Thank you for your review!</h4>
                <p className="home-feedback__success-sub">Your feedback has been added above and helps other travellers.</p>
                <button className="home-feedback__submit home-feedback__submit--ghost" onClick={handleReset}>
                  Write another review
                </button>
              </div>
            ) : (
              <div className="home-feedback__form">

                <div className="home-feedback__row">
                  <div className="home-feedback__field">
                    <label className="home-feedback__label" htmlFor="feedback-name">Your Name</label>
                    <input
                      id="feedback-name"
                      name="feedback-name"
                      className={`home-feedback__input${errors.name ? " home-feedback__input--err" : ""}`}
                      placeholder="e.g. Priya S."
                      value={form.name}
                      onChange={e => { setForm(p=>({...p,name:e.target.value})); setErrors(p=>({...p,name:""})); }}
                    />
                    {errors.name && <span className="home-feedback__err">{errors.name}</span>}
                  </div>
                  <div className="home-feedback__field">
                    <label className="home-feedback__label" htmlFor="feedback-country">Your Route</label>
                    <input
                      id="feedback-country"
                      name="feedback-country"
                      className={`home-feedback__input${errors.country ? " home-feedback__input--err" : ""}`}
                      placeholder="e.g. Delhi → Paris"
                      value={form.country}
                      onChange={e => { setForm(p=>({...p,country:e.target.value})); setErrors(p=>({...p,country:""})); }}
                    />
                    {errors.country && <span className="home-feedback__err">{errors.country}</span>}
                  </div>
                </div>

                <div className="home-feedback__field">
                  <label className="home-feedback__label">Your Rating</label>
                  <div className="home-feedback__stars">
                    {[1,2,3,4,5].map(s => (
                      <button
                        key={s}
                        type="button"
                        className="home-feedback__star-btn"
                        onMouseEnter={() => setHoveredStar(s)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => { setForm(p=>({...p,rating:s})); setErrors(p=>({...p,rating:""})); }}
                        aria-label={`Rate ${s} star${s>1?"s":""}`}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24"
                          fill={s <= (hoveredStar || form.rating) ? "#f59e0b" : "none"}
                          stroke={s <= (hoveredStar || form.rating) ? "#f59e0b" : "#d4dde6"}
                          strokeWidth="1.8"
                          style={{
                            transition:"all .18s ease",
                            transform: s <= (hoveredStar || form.rating) ? "scale(1.18)" : "scale(1)",
                            filter: s <= (hoveredStar || form.rating) ? "drop-shadow(0 2px 6px rgba(245,158,11,.45))" : "none",
                          }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </button>
                    ))}
                    {form.rating > 0 && (
                      <span className="home-feedback__rating-label">
                        {["","Poor","Fair","Good","Great","Excellent!"][form.rating]}
                      </span>
                    )}
                  </div>
                  {errors.rating && <span className="home-feedback__err">{errors.rating}</span>}
                </div>

                <div className="home-feedback__field">
                  <label className="home-feedback__label" htmlFor="feedback-text">Your Review</label>
                  <textarea
                    id="feedback-text"
                    name="feedback-text"
                    className={`home-feedback__textarea${errors.text ? " home-feedback__input--err" : ""}`}
                    placeholder="Tell us about your visa experience — the process, speed, support…"
                    rows={4}
                    value={form.text}
                    onChange={e => { setForm(p=>({...p,text:e.target.value})); setErrors(p=>({...p,text:""})); }}
                  />
                  <div className="home-feedback__char">
                    <span>{errors.text ? <span className="home-feedback__err">{errors.text}</span> : ""}</span>
                    <span style={{color: form.text.length < 20 ? "#94a3b8" : "#16a34a"}}>
                      {form.text.length} / 20+ chars
                    </span>
                  </div>
                </div>

                <button className="home-feedback__submit" onClick={handleSubmit}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Submit Review
                </button>

              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
// ─── POPULAR — Square Card Globe Carousel ────────────────────────────────────

function Popular() {
  const items = destinations.slice(0, 6);
  const total = items.length;
  const RADIUS    = 380;
  const ANGLE_STEP = 360 / total;

  const [active, setActive] = React.useState(0);
  const [deg, setDeg]       = React.useState(0);
  const [locked, setLocked] = React.useState(false);

  const rotate = React.useCallback((steps) => {
    if (locked) return;
    setLocked(true);
    setDeg(d => d - steps * ANGLE_STEP);
    setActive(a => (a + steps + total) % total);
    setTimeout(() => setLocked(false), 780);
  }, [locked, ANGLE_STEP, total]);

  const goTo = React.useCallback((i) => {
    if (locked || i === active) return;
    let diff = i - active;
    if (diff >  total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    rotate(diff);
  }, [locked, active, total, rotate]);

  React.useEffect(() => {
    const id = setInterval(() => rotate(1), 3200);
    return () => clearInterval(id);
  }, [rotate]);

  return (
    <section className="home-popular">
      <div className="home-popular__inner">

        <div className="home-popular__head home-sec-head home-sec-head--light" data-aos="fade-up">
          <span className="home-sec-tag home-sec-tag--light">Trending Now</span>
          <h2 className="home-dest-section__title" style={{ marginTop: ".5rem" }}>
            Most Popular Destinations
          </h2>
        </div>

        <div className="home-popular__scene" data-aos="fade-up" data-aos-delay="80">
          <div
            className="home-popular__track"
            style={{ transform: `rotateY(${deg}deg)` }}
          >
            {items.map((d, i) => {
              const seatAngle  = i * ANGLE_STEP;
              const angleDiff  = ((seatAngle - active * ANGLE_STEP) % 360 + 360) % 360;
              const norm       = angleDiff > 180 ? angleDiff - 360 : angleDiff;
              const absDiff    = Math.abs(norm);
              const depthRatio = Math.cos((absDiff * Math.PI) / 180);
              const opacity    = 0.15 + 0.85 * Math.max(0, depthRatio);
              const visible    = absDiff < 105;
              const isActive   = i === active;
              const visaId     = getVisaIdForDestination(d.name);

              return (
                <div
                  key={d.id}
                  className="home-popular__slide"
                  style={{
                    transform: `rotateY(${seatAngle}deg) translateZ(${RADIUS}px)`,
                    opacity: visible ? opacity : 0,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <div className={`home-popular__item${isActive ? " home-popular__item--active" : ""}`}>

                    {/* ── Full-bleed image ── */}
                    <div className="home-popular__thumb-wrap">
                      <img
                        src={d.img}
                        alt={d.name}
                        className="home-popular__thumb"
                        onError={e => (e.target.style.display = "none")}
                      />
                    </div>

                    {/* ── Gradient scrim ── */}
                    <div className="home-popular__scrim" />

                    {/* ── Rank — top left ── */}
                    <span className="home-popular__rank">#{i + 1}</span>

                    {/* ── Visa type — top right ── */}
                    <span className="home-popular__thumb-tag">{d.tag}</span>

                    {/* ── Body — pinned to bottom ── */}
                    <div className="home-popular__body">
                      <div className="home-popular__pname">{d.name}</div>
                      <div className="home-popular__pmeta">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.2">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                        </svg>
                        {d.visaCount} issued
                      </div>

                      <div className="home-popular__footer-row">
                        <div className="home-popular__price-col">
                          {d.originalFee && (
                            <span className="home-popular__pfee-orig">{d.originalFee}</span>
                          )}
                          <span className="home-popular__pfee">{d.fee}</span>
                        </div>
                        <Link to={`/visa/${visaId}`} className="home-popular__btn">
                          Apply →
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="home-popular__nav">
          <button className="home-popular__nav-btn" onClick={() => rotate(-1)} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="home-popular__dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`home-popular__dot${i === active ? " home-popular__dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${items[i].name}`}
              />
            ))}
          </div>

          <button className="home-popular__nav-btn" onClick={() => rotate(1)} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
// ─── CTA BANNER — Runway Scroll ───────────────────────────────────────────────

function CTABanner() {
  const [progress, setProgress] = React.useState(0);
  const [launched, setLaunched] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const runwayRef  = React.useRef(null);
  const planeRef   = React.useRef(null);
  const startXRef  = React.useRef(null);

  const LAUNCH_THRESHOLD = 88;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const calcProgress = (clientX) => {
    const rw = runwayRef.current;
    if (!rw) return 0;
    const { left, width } = rw.getBoundingClientRect();
    const usable = width - 56;
    const raw = (clientX - left - 28) / usable * 100;
    return clamp(raw, 0, 100);
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    startXRef.current = e.clientX;
  };
  const onMouseMove = React.useCallback((e) => {
    if (!dragging) return;
    const p = calcProgress(e.clientX);
    setProgress(p);
    if (p >= LAUNCH_THRESHOLD && !launched) triggerLaunch();
  }, [dragging, launched]);
  const onMouseUp = React.useCallback(() => {
    if (!launched) setProgress(0);
    setDragging(false);
  }, [launched]);

  const onTouchStart = (e) => {
    setDragging(true);
    startXRef.current = e.touches[0].clientX;
  };
  const onTouchMove = React.useCallback((e) => {
    if (!dragging) return;
    const p = calcProgress(e.touches[0].clientX);
    setProgress(p);
    if (p >= LAUNCH_THRESHOLD && !launched) triggerLaunch();
  }, [dragging, launched]);
  const onTouchEnd = React.useCallback(() => {
    if (!launched) setProgress(0);
    setDragging(false);
  }, [launched]);

  const triggerLaunch = () => {
    setLaunched(true);
    setProgress(100);
    setTimeout(() => {
      window.location.href = "/booking";
    }, 1400);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  const speed = Math.round(progress * 2.8);
  const speedLabel = launched ? "AIRBORNE 🛫" : progress > 60 ? `${speed} kts` : progress > 20 ? `${speed} kts` : "READY";

  return (
    <section className="home-cta-banner">

      <div className="home-cta-banner__bg" aria-hidden="true">
        <div className="home-cta-orb home-cta-orb--1"/>
        <div className="home-cta-orb home-cta-orb--2"/>
        <div className="home-cta-orb home-cta-orb--3"/>
        <div className="home-cta-banner__stars">
          {Array.from({length:28}).map((_,i) => (
            <div key={i} className="home-cta-star"
              style={{
                left: `${Math.random()*100}%`,
                top:  `${Math.random()*80}%`,
                animationDelay: `${Math.random()*4}s`,
                animationDuration: `${2 + Math.random()*3}s`,
                width: `${1 + Math.random()*2}px`,
                height:`${1 + Math.random()*2}px`,
              }}
            />
          ))}
        </div>
        <div className="home-cta-cloud home-cta-cloud--1"/>
        <div className="home-cta-cloud home-cta-cloud--2"/>
        <div className="home-cta-cloud home-cta-cloud--3"/>
      </div>

      <div className="home-cta-banner__inner">

        <div className="home-cta-banner__head" data-aos="fade-up">
          <span className="home-sec-tag" style={{color:"#F4B342",background:"rgba(244,179,66,.15)"}}>
            Limited Time Offer
          </span>
          <h2 className="home-cta-banner__title">
            Your Next Trip<br/>
            <span className="home-cta-banner__title-accent">Starts Here</span>
          </h2>
          <p className="home-cta-banner__sub">
            Drag the plane down the runway to take off.
          </p>
        </div>

        <div className="home-cta-runway-wrap" data-aos="fade-up" data-aos-delay="150">

          <div className="home-cta-hud">
            <div className="home-cta-hud__item">
              <span className="home-cta-hud__label">STATUS</span>
              <span className="home-cta-hud__val" style={{color: launched?"#22c55e": progress>60?"#F4B342":"rgba(255,255,255,.7)"}}>
                {speedLabel}
              </span>
            </div>
            <div className="home-cta-hud__sep"/>
            <div className="home-cta-hud__item">
              <span className="home-cta-hud__label">PROGRESS</span>
              <span className="home-cta-hud__val">{Math.round(progress)}%</span>
            </div>
            <div className="home-cta-hud__sep"/>
            <div className="home-cta-hud__item">
              <span className="home-cta-hud__label">DESTINATION</span>
              <span className="home-cta-hud__val">BOOKING</span>
            </div>
          </div>

          <div className="home-cta-runway" ref={runwayRef}>

            <div className="home-cta-runway__tarmac">
              <div className="home-cta-runway__dashes">
                {Array.from({length:12}).map((_,i) => (
                  <div key={i} className="home-cta-runway__dash"
                    style={{ opacity: (i / 12) < (progress / 100) ? 0.15 : 0.45 }}
                  />
                ))}
              </div>

              <div className="home-cta-runway__fill"
                style={{ width: `${progress}%` }}
              />

              <div className="home-cta-runway__marker" style={{ left:`${LAUNCH_THRESHOLD}%` }}>
                <span className="home-cta-runway__marker-label">TAKEOFF</span>
              </div>
            </div>

            <div
              ref={planeRef}
              className={`home-cta-plane${dragging?" home-cta-plane--drag":""}${launched?" home-cta-plane--launch":""}`}
              style={{ left: `calc(${progress}% - 28px + ${progress/100 * 0}px)` }}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Drag to apply for visa"
              tabIndex={0}
            >
              {progress > 30 && (
                <div className="home-cta-plane__heat"
                  style={{ opacity: Math.min((progress - 30) / 70, 0.6) }}
                />
              )}

              <svg className="home-cta-plane__svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="32" cy="32" rx="22" ry="7" fill="white" opacity="0.95"/>
                <path d="M54 32 Q62 32 58 28 L54 29Z" fill="white" opacity="0.9"/>
                <path d="M12 32 L8 20 L18 28Z" fill="white" opacity="0.85"/>
                <path d="M28 32 L18 18 L42 28 Z" fill="white" opacity="0.9"/>
                <path d="M28 32 L18 46 L42 36 Z" fill="white" opacity="0.85"/>
                <path d="M14 32 L10 26 L20 30Z" fill="white" opacity="0.7"/>
                <path d="M14 32 L10 38 L20 34Z" fill="white" opacity="0.65"/>
                <ellipse cx="38" cy="30" rx="6" ry="2.5" fill="#0ea5e9" opacity="0.6"/>
                <ellipse cx="38" cy="34" rx="6" ry="2.5" fill="#0ea5e9" opacity="0.4"/>
              </svg>

              {progress > 10 && (
                <div className="home-cta-plane__trail">
                  {[1,2,3].map(i => (
                    <div key={i} className="home-cta-plane__trail-puff"
                      style={{ animationDelay: `${i * 0.1}s`, opacity: Math.min(progress/80, 0.7) }}
                    />
                  ))}
                </div>
              )}
            </div>

            {launched && (
              <div className="home-cta-runway__launched">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Redirecting to booking…
              </div>
            )}

          </div>

          <div className="home-cta-runway__lights">
            {Array.from({length:10}).map((_,i) => (
              <div key={i} className="home-cta-runway__light"
                style={{
                  background: i / 10 < progress / 100
                    ? (progress > LAUNCH_THRESHOLD ? "#22c55e" : "#F4B342")
                    : "rgba(255,255,255,.2)",
                  boxShadow: i / 10 < progress / 100
                    ? (progress > LAUNCH_THRESHOLD
                        ? "0 0 8px #22c55e, 0 0 16px rgba(34,197,94,.5)"
                        : "0 0 8px #F4B342, 0 0 16px rgba(244,179,66,.4)")
                    : "none",
                }}
              />
            ))}
          </div>

          <p className="home-cta-runway__caption">
            {progress < LAUNCH_THRESHOLD
              ? "Begin your application"
              : launched
                ? "Cleared for takeoff — bon voyage! ✈️"
                : "Release to confirm takeoff!"}
          </p>

        </div>

      </div>
    </section>
  );
}
// ─── FAQ SECTION ─────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen]       = React.useState(null);
  const [query, setQuery]     = React.useState("");
  const [activeTag, setTag]   = React.useState("All");
  const [focused, setFocused] = React.useState(false);
  const inputRef              = React.useRef(null);
  const [visibleFaqs, setVisibleFaqs] = React.useState(4);
  React.useEffect(() => { setVisibleFaqs(4); }, [query, activeTag]);

  const allTags = ["All", ...Array.from(new Set(faqs.map(f => f.tag)))];

  const filtered = faqs.filter(item => {
    const matchTag   = activeTag === "All" || item.tag === activeTag;
    const matchQuery = !query.trim() ||
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQuery;
  });

  const toggle = (i) => setOpen(open === i ? null : i);

  const clearSearch = () => { setQuery(""); inputRef.current?.focus(); };

  const highlight = (text) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="home-faq__highlight">{part}</mark>
        : part
    );
  };

  return (
    <section className="home-faq">
      <div className="home-faq__bg" aria-hidden="true">
        <div className="home-faq__blob home-faq__blob--1" />
        <div className="home-faq__blob home-faq__blob--2" />
        <div className="home-faq__blob home-faq__blob--3" />
        <div className="home-faq__geo home-faq__geo--ring1" />
        <div className="home-faq__geo home-faq__geo--ring2" />
        <div className="home-faq__geo home-faq__geo--dot1" />
        <div className="home-faq__geo home-faq__geo--dot2" />
        <div className="home-faq__geo home-faq__geo--dot3" />
        <div className="home-faq__geo home-faq__geo--line1" />
        <div className="home-faq__geo home-faq__geo--line2" />
      </div>

      <div className="home-faq__inner">

        <div className="home-faq__head" data-aos="fade-up">
          <span className="home-faq__eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            Got Questions?
          </span>
          <h2 className="home-faq__title">
            Frequently Asked
            <span className="home-faq__title-accent"> Questions</span>
          </h2>
          <p className="home-faq__sub">
            Everything you need to know — answered clearly and quickly.
          </p>
        </div>

        <div className="home-faq__search-wrap" data-aos="fade-up" data-aos-delay="80">
          <div className={`home-faq__search${focused ? " home-faq__search--focused" : ""}${query ? " home-faq__search--has-val" : ""}`}>

            <span className="home-faq__search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>

            <input
              ref={inputRef}
              id="faq-search"
              name="faq-search"
              className="home-faq__search-input"
              type="text"
              placeholder="Search questions — e.g. documents, refund, express…"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(null); }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Search FAQ"
            />

            {query && (
              <span className="home-faq__search-count">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}

            {query && (
              <button className="home-faq__search-clear" onClick={clearSearch} aria-label="Clear search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}

            <button className="home-faq__search-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </button>
          </div>

          {!query && (
            <div className="home-faq__suggestions">
              <span className="home-faq__suggestions-label">Try:</span>
              {["processing time", "documents needed", "express visa", "refund policy"].map(s => (
                <button key={s} className="home-faq__suggestion-pill"
                  onClick={() => { setQuery(s); setOpen(null); }}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="home-faq__tags" data-aos="fade-up" data-aos-delay="100">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`home-faq__tag${activeTag === tag ? " home-faq__tag--active" : ""}`}
              onClick={() => { setTag(tag); setOpen(null); }}
            >
              {tag}
              {tag !== "All" && (
                <span className="home-faq__tag-count">
                  {faqs.filter(f => f.tag === tag).length}
                </span>
              )}
            </button>
          ))}
          <span className="home-faq__tag-total">{filtered.length} of {faqs.length} shown</span>
        </div>

        <div className="home-faq__list">
          {filtered.length === 0 ? (
            <div className="home-faq__empty" data-aos="fade-up">
              <div className="home-faq__empty-icon">🔍</div>
              <h3 className="home-faq__empty-title">No results for "{query}"</h3>
              <p className="home-faq__empty-sub">Try a different keyword or clear the filter.</p>
              <button className="home-faq__empty-btn" onClick={clearSearch}>Clear search</button>
            </div>
          ) : (
            <>
              {filtered.slice(0, visibleFaqs).map((item, i) => {
                const globalIdx = faqs.indexOf(item);
                const isOpen    = open === globalIdx;
                return (
                  <div
                    key={globalIdx}
                    className={`home-faq__item${isOpen ? " home-faq__item--open" : ""}`}
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    <button
                      className="home-faq__q"
                      onClick={() => toggle(globalIdx)}
                      aria-expanded={isOpen}
                    >
                      <span className="home-faq__q-num">
                      {String(globalIdx + 1).padStart(2, "0")}
                    </span>

                    <span className="home-faq__q-text">{highlight(item.q)}</span>

                    <span className="home-faq__q-tag">{item.tag}</span>

                    <span className="home-faq__chevron">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.3"
                        strokeLinecap="round" strokeLinejoin="round"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform .38s cubic-bezier(.4,0,.2,1)",
                        }}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </button>

                    <div
                      className="home-faq__a-wrap"
                      style={{
                        maxHeight: isOpen ? "320px" : "0",
                        opacity:   isOpen ? 1 : 0,
                        transition: "max-height .44s cubic-bezier(.4,0,.2,1), opacity .3s ease",
                        overflow: "hidden",
                      }}
                    >
                      <div className="home-faq__a-inner">
                        <div className="home-faq__a-bar" />
                        <p className="home-faq__a">{highlight(item.a)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ── View More button — only shown when more FAQs exist ── */}
              {filtered.length > 4 && (
                <div className="home-view-more-wrap--faq">
                <button
                  className="home-view-more-btn"
                  onClick={() => setVisibleFaqs(v => v < filtered.length ? Math.min(v + 3, filtered.length) : 3)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points={visibleFaqs >= filtered.length ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                  </svg>
                  {visibleFaqs >= filtered.length
                    ? "Show Less"
                    : `View More FAQs (${filtered.length - visibleFaqs} remaining)`}
                </button>
              </div>
              )}
            </>
          )}
        </div>      

        <div className="home-faq__footer" data-aos="fade-up">
          <div className="home-faq__footer-card">
            <div className="home-faq__footer-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <div className="home-faq__footer-text-wrap">
              <strong className="home-faq__footer-title">Still have questions?</strong>
              <span className="home-faq__footer-sub">Our visa experts reply within 2 hours.</span>
            </div>
            <a href="#contact" className="home-faq__footer-btn">
              Contact Support →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
// ─── CONTACT US SECTION ───────────────────────────────────────────────────────

// ─── HELPER: get tomorrow's date string (YYYY-MM-DD) ─────────────────────────
function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// ─── HELPER: check if a date string is a weekend ─────────────────────────────
function isWeekend(dateStr) {
  if (!dateStr) return false;
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.getDay() === 0 || d.getDay() === 6; // 0 = Sunday, 6 = Saturday
}

// ─── HELPER: get next valid weekday from a date string ───────────────────────
function nextWeekday(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().split("T")[0];
}

// ─── WEEKDAY DATE INPUT ───────────────────────────────────────────────────────
function WeekdayDateInput({ value, onChange, className, min, id, name }) {
  const handleChange = (e) => {
    const val = e.target.value;
    if (isWeekend(val)) {
      onChange(nextWeekday(val));
    } else {
      onChange(val);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="date"
        id={id}
        name={name}
        className={className}
        min={min || getTomorrow()}
        value={value}
        onChange={handleChange}
      />
      {value && isWeekend(value) && (
        <span style={{ fontSize: "0.7rem", color: "#f59e0b", marginTop: "2px", display: "block" }}>
          Weekends unavailable — moved to next weekday.
        </span>
      )}
    </div>
  );
}

function ContactUs() {
  const [tab, setTab] = React.useState("message");

  const [form, setForm]         = React.useState({ name:"", email:"", phone:"", destination:"", message:"", enquiry:"" });
  const [errors, setErrors]     = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending]     = React.useState(false);

  const validateMsg = () => {
    const e = {};
    if (!form.name.trim())  e.name    = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone   = "Phone number is required";
    if (!form.enquiry)      e.enquiry = "Please select an enquiry type";
    if (form.message.trim().length < 10) e.message = "Write at least 10 characters";
    return e;
  };

  const handleMsgSubmit = () => {
    const e = validateMsg();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true);
    const label   = enquiryOptions.find(o => o.value === form.enquiry)?.label || "";
    const subject = encodeURIComponent(`[${label}] – ${form.name}`);
    const body    = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDestination: ${form.destination || "N/A"}\nEnquiry: ${label}\n\nMessage:\n${form.message}`
    );
    setTimeout(() => {
      window.location.href = `mailto:${GUEST_EMAIL}?subject=${subject}&body=${body}`;
      setSending(false);
      setSubmitted(true);
    }, 1200);
  };

  const [meet, setMeet]               = React.useState({ name:"", email:"", phone:"", date:"", time:"", topic:"", notes:"" });
  const [meetErrors, setMeetErrors]   = React.useState({});
  const [meetScheduled, setMeetScheduled] = React.useState(false);
  const [meetLink, setMeetLink]       = React.useState("");

  const tomorrow = getTomorrow();

  const validateMeet = () => {
    const e = {};
    if (!meet.name.trim())  e.name  = "Name is required";
    if (!meet.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!meet.phone.trim()) e.phone = "Phone number is required";
    if (!meet.date)  e.date  = "Select a date";
    if (!meet.time)  e.time  = "Select a time slot";
    if (!meet.topic) e.topic = "Select a meeting topic";
    return e;
  };

  const handleSchedule = () => {
    const e = validateMeet();
    if (Object.keys(e).length) { setMeetErrors(e); return; }

    const [year, month, day] = meet.date.split("-").map(Number);
    const [hm, ampm] = meet.time.split(" ");
    let [hh, mm] = hm.split(":").map(Number);
    if (ampm === "PM" && hh !== 12) hh += 12;
    if (ampm === "AM" && hh === 12) hh = 0;
    const pad = n => String(n).padStart(2, "0");
    const startDT = `${year}${pad(month)}${pad(day)}T${pad(hh)}${pad(mm)}00`;
    const endDate = new Date(year, month - 1, day, hh, mm + 45);
    const endDT   = `${endDate.getFullYear()}${pad(endDate.getMonth()+1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;

    const title   = encodeURIComponent(`Visa Consultation – ${meet.name}`);
    const details = encodeURIComponent(`Visa Consultation\n\nClient: ${meet.name}\nPhone: ${meet.phone}\nTopic: ${meet.topic}${meet.notes ? `\nNotes: ${meet.notes}` : ""}\n\nScheduled via Visa Expert`);
    const guests  = encodeURIComponent(`${meet.email},${GUEST_EMAIL}`);
    const calURL  = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDT}/${endDT}&details=${details}&add=${guests}&sf=true&output=xml`;

    setMeetLink(calURL);
    setMeetScheduled(true);
    setTimeout(() => window.open(calURL, "_blank"), 500);
  };

  const channels = [
    {
      icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>),
      label:"Email Us", value:GUEST_EMAIL, sub:"Response within 2 hours",
      color:"#0ea5e9", bg:"rgba(14,165,233,.08)", border:"rgba(14,165,233,.2)",
    },
  ];

  return (
    <section className="home-contact" id="contact">
      <div className="home-contact__bg" aria-hidden="true">
        <div className="home-contact__orb home-contact__orb--1" />
        <div className="home-contact__orb home-contact__orb--2" />
        <div className="home-contact__grid-bg" />
      </div>

      <div className="home-contact__inner">

        <div className="home-contact__head" data-aos="fade-up">
          <span className="home-sec-tag home-sec-tag--dark">Get In Touch</span>
          <h2 className="home-contact__title">We're here to<br /><span className="home-contact__title-accent">help you travel</span></h2>
          <p className="home-contact__sub">Reach out via email or book a free Google Meet consultation.</p>
        </div>

        <div className="home-contact__channels-row" data-aos="fade-up" data-aos-delay="60">
          {channels.map((ch, i) => (
            <div key={i} className="home-contact__channel" style={{ background:ch.bg, borderColor:ch.border }}>
              <div className="home-contact__channel-icon" style={{ color:ch.color, background:ch.bg }}>{ch.icon}</div>
              <div className="home-contact__channel-body">
                <div className="home-contact__channel-label">{ch.label}</div>
                <div className="home-contact__channel-value" style={{ color:ch.color }}>{ch.value}</div>
                <div className="home-contact__channel-sub">{ch.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="home-contact__tabs" data-aos="fade-up" data-aos-delay="80">
          <button className={`home-contact__tab${tab==="message"?" home-contact__tab--active":""}`} onClick={()=>setTab("message")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Send a Message
          </button>
          <button className={`home-contact__tab${tab==="meeting"?" home-contact__tab--active":""}`} onClick={()=>setTab("meeting")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Schedule a Meeting
          </button>
        </div>

        {tab === "message" && (
          <div className="home-contact__panel" data-aos="fade-up" data-aos-delay="100">
            {submitted ? (
              <div className="home-contact__success">
                <div className="home-contact__success-ring">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="home-contact__success-title">Message sent!</h3>
                <p className="home-contact__success-sub">Your email client opened with your message pre-filled. We'll reply within 2 hours.</p>
                <button className="home-contact__submit home-contact__submit--ghost" onClick={()=>{setForm({name:"",email:"",phone:"",destination:"",message:"",enquiry:""});setSubmitted(false);setErrors({});}}>Send another message</button>
              </div>
            ) : (
              <div className="home-contact__form">
                <div className="home-contact__form-header">
                  <h3 className="home-contact__form-title">Send us a message</h3>
                  <p className="home-contact__form-note">We reply to every message within 2 hours on working days.</p>
                </div>

                <div className="home-contact__field">
                  <label className="home-contact__label" htmlFor="contact-enquiry">Enquiry Type *</label>
                  <div className="home-contact__select-wrap">
                    <select
                      id="contact-enquiry"
                      name="contact-enquiry"
                      className={`home-contact__select${errors.enquiry?" home-contact__input--err":""}`}
                      value={form.enquiry}
                      onChange={e=>{setForm(p=>({...p,enquiry:e.target.value}));setErrors(p=>({...p,enquiry:""}));}}
                    >
                      {enquiryOptions.map(o=><option key={o.value} value={o.value} disabled={o.value===""} hidden={o.value===""&&form.enquiry!==""?false:undefined}>{o.label}</option>)}
                    </select>
                    <span className="home-contact__select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                  </div>
                  {errors.enquiry && <span className="home-contact__err">{errors.enquiry}</span>}
                </div>

                <div className="home-contact__row">
                  <div className="home-contact__field">
                    <label className="home-contact__label" htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      name="contact-name"
                      className={`home-contact__input${errors.name?" home-contact__input--err":""}`}
                      placeholder="e.g. Priya Sharma"
                      value={form.name}
                      onChange={e=>{setForm(p=>({...p,name:e.target.value}));setErrors(p=>({...p,name:""}));}}
                    />
                    {errors.name && <span className="home-contact__err">{errors.name}</span>}
                  </div>
                  <div className="home-contact__field">
                    <label className="home-contact__label" htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      name="contact-email"
                      type="email"
                      className={`home-contact__input${errors.email?" home-contact__input--err":""}`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e=>{setForm(p=>({...p,email:e.target.value}));setErrors(p=>({...p,email:""}));}}
                    />
                    {errors.email && <span className="home-contact__err">{errors.email}</span>}
                  </div>
                </div>

                <div className="home-contact__row">
                  <div className="home-contact__field">
                    <label className="home-contact__label" htmlFor="contact-phone">Phone Number *</label>
                    <input
                      id="contact-phone"
                      name="contact-phone"
                      className={`home-contact__input${errors.phone?" home-contact__input--err":""}`}
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e=>{setForm(p=>({...p,phone:e.target.value}));setErrors(p=>({...p,phone:""}));}}
                    />
                    {errors.phone && <span className="home-contact__err">{errors.phone}</span>}
                  </div>
                  <div className="home-contact__field">
                    <label className="home-contact__label" htmlFor="contact-destination">Destination Country</label>
                    <input
                      id="contact-destination"
                      name="contact-destination"
                      className="home-contact__input"
                      placeholder="e.g. Japan, UAE, UK…"
                      value={form.destination}
                      onChange={e=>setForm(p=>({...p,destination:e.target.value}))}
                    />
                  </div>
                </div>

                <div className="home-contact__field">
                  <label className="home-contact__label" htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    name="contact-message"
                    className={`home-contact__textarea${errors.message?" home-contact__input--err":""}`}
                    placeholder="Describe your visa requirements, travel dates, or concerns…"
                    rows={4}
                    value={form.message}
                    onChange={e=>{setForm(p=>({...p,message:e.target.value}));setErrors(p=>({...p,message:""}));}}
                  />
                  {errors.message && <span className="home-contact__err">{errors.message}</span>}
                </div>

                <button className={`home-contact__submit${sending?" home-contact__submit--sending":""}`} onClick={handleMsgSubmit} disabled={sending}>
                  {sending ? (<><span className="home-contact__spinner"/> Sending…</>) : (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Message</>)}
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "meeting" && (
          <div className="home-contact__panel home-contact__panel--meet" data-aos="fade-up" data-aos-delay="100">
            {meetScheduled ? (
              <div className="home-contact__success">
                <div className="home-contact__success-ring" style={{background:"rgba(16,185,129,.1)",borderColor:"rgba(16,185,129,.3)"}}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="home-contact__success-title">Meeting Scheduled! 🎉</h3>
                <p className="home-contact__success-sub">
                  Google Calendar opened in a new tab. Once you confirm, a Meet link is sent to <strong>{meet.email}</strong> and <strong>{GUEST_EMAIL}</strong>.
                </p>
                <a href={meetLink} target="_blank" rel="noopener noreferrer" className="home-contact__submit" style={{textDecoration:"none",marginTop:".5rem"}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Open Google Calendar Again
                </a>
                <button className="home-contact__submit home-contact__submit--ghost" onClick={()=>{setMeet({name:"",email:"",phone:"",date:"",time:"",topic:"",notes:""});setMeetScheduled(false);setMeetErrors({});}}>Schedule another meeting</button>
              </div>
            ) : (
              <div className="home-contact__form">
                <div className="home-contact__form-header">
                  <div className="home-contact__meet-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                    Google Meet · 45 min · Free
                  </div>
                  <h3 className="home-contact__form-title">Schedule a Consultation</h3>
                  <p className="home-contact__form-note">Pick a slot — a Google Meet invite is sent to you and our expert automatically.</p>
                </div>

                <div className="home-contact__row">
                  <div className="home-contact__field">
                    <label className="home-contact__label" htmlFor="meet-name">Full Name *</label>
                    <input
                      id="meet-name"
                      name="meet-name"
                      className={`home-contact__input${meetErrors.name?" home-contact__input--err":""}`}
                      placeholder="e.g. Arjun Kapoor"
                      value={meet.name}
                      onChange={e=>{setMeet(p=>({...p,name:e.target.value}));setMeetErrors(p=>({...p,name:""}));}}
                    />
                    {meetErrors.name && <span className="home-contact__err">{meetErrors.name}</span>}
                  </div>
                  <div className="home-contact__field">
                    <label className="home-contact__label" htmlFor="meet-email">Email Address *</label>
                    <input
                      id="meet-email"
                      name="meet-email"
                      type="email"
                      className={`home-contact__input${meetErrors.email?" home-contact__input--err":""}`}
                      placeholder="you@example.com"
                      value={meet.email}
                      onChange={e=>{setMeet(p=>({...p,email:e.target.value}));setMeetErrors(p=>({...p,email:""}));}}
                    />
                    {meetErrors.email && <span className="home-contact__err">{meetErrors.email}</span>}
                  </div>
                </div>

                <div className="home-contact__field">
                  <label className="home-contact__label" htmlFor="meet-phone">Phone Number *</label>
                  <input
                    id="meet-phone"
                    name="meet-phone"
                    className={`home-contact__input${meetErrors.phone?" home-contact__input--err":""}`}
                    placeholder="+91 98765 43210"
                    value={meet.phone}
                    onChange={e=>{setMeet(p=>({...p,phone:e.target.value}));setMeetErrors(p=>({...p,phone:""}));}}
                  />
                  {meetErrors.phone && <span className="home-contact__err">{meetErrors.phone}</span>}
                </div>

                <div className="home-contact__field">
                  <label className="home-contact__label" htmlFor="meet-topic">Meeting Topic *</label>
                  <div className="home-contact__select-wrap">
                    <select
                      id="meet-topic"
                      name="meet-topic"
                      className={`home-contact__select${meetErrors.topic?" home-contact__input--err":""}`}
                      value={meet.topic}
                      onChange={e=>{setMeet(p=>({...p,topic:e.target.value}));setMeetErrors(p=>({...p,topic:""}));}}
                    >
                      <option value="">Select a topic…</option>
                      {topics.map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                    <span className="home-contact__select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                  </div>
                  {meetErrors.topic && <span className="home-contact__err">{meetErrors.topic}</span>}
                </div>

                <div className="home-contact__row">
                  <div className="home-contact__field">
                    <label className="home-contact__label" htmlFor="meet-date">Preferred Date *</label>
                    <WeekdayDateInput
                      id="meet-date"
                      name="meet-date"
                      className={`home-contact__input${meetErrors.date?" home-contact__input--err":""}`}
                      min={tomorrow}
                      value={meet.date}
                      onChange={val=>{setMeet(p=>({...p,date:val}));setMeetErrors(p=>({...p,date:""}));}}
                    />
                    {meetErrors.date && <span className="home-contact__err">{meetErrors.date}</span>}
                  </div>
                  <div className="home-contact__field">
                    <label className="home-contact__label" htmlFor="meet-time">Time Slot *</label>
                    <div className="home-contact__select-wrap">
                      <select
                        id="meet-time"
                        name="meet-time"
                        className={`home-contact__select${meetErrors.time?" home-contact__input--err":""}`}
                        value={meet.time}
                        onChange={e=>{setMeet(p=>({...p,time:e.target.value}));setMeetErrors(p=>({...p,time:""}));}}
                      >
                        <option value="">Choose a slot…</option>
                        {timeSlots.map(t=><option key={t} value={t}>{t}</option>)}
                      </select>
                      <span className="home-contact__select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                    </div>
                    {meetErrors.time && <span className="home-contact__err">{meetErrors.time}</span>}
                  </div>
                </div>

                {meet.date && (
                  <div className="home-contact__timegrid">
                    <span className="home-contact__timegrid-label">Quick select time:</span>
                    <div className="home-contact__timegrid-slots">
                      {timeSlots.map(t=>(
                        <button key={t} className={`home-contact__timeslot${meet.time===t?" home-contact__timeslot--active":""}`} onClick={()=>{setMeet(p=>({...p,time:t}));setMeetErrors(p=>({...p,time:""}));}}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="home-contact__field">
                  <label className="home-contact__label" htmlFor="meet-notes">Additional Notes <span style={{color:"#94a3b8",fontWeight:400,fontSize:".7rem",textTransform:"none"}}>(optional)</span></label>
                  <textarea
                    id="meet-notes"
                    name="meet-notes"
                    className="home-contact__textarea"
                    placeholder="Any specific questions before the call…"
                    rows={3}
                    value={meet.notes}
                    onChange={e=>setMeet(p=>({...p,notes:e.target.value}))}
                  />
                </div>

                <div className="home-contact__guest-notice">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  Invite will be sent to <strong>{meet.email||"your email"}</strong> and our team at <strong>{GUEST_EMAIL}</strong>
                </div>

                <button className="home-contact__submit home-contact__submit--meet" onClick={handleSchedule}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Schedule Google Meet
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

function ScheduleMeetingFloat() {
  const [open, setOpen]               = React.useState(false);
  const [meetScheduled, setMeetScheduled] = React.useState(false);
  const [meetLink, setMeetLink]       = React.useState("");

  const [meet, setMeet] = React.useState({
    name: "", email: "", phone: "", date: "", time: "", topic: "", notes: "",
  });
  const [meetErrors, setMeetErrors] = React.useState({});

  const tomorrow = getTomorrow();

  const validateMeet = () => {
    const e = {};
    if (!meet.name.trim())  e.name  = "Name is required";
    if (!meet.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!meet.phone.trim()) e.phone = "Phone number is required";
    if (!meet.date)  e.date  = "Select a date";
    if (!meet.time)  e.time  = "Select a time slot";
    if (!meet.topic) e.topic = "Select a meeting topic";
    return e;
  };

  const handleSchedule = () => {
    const e = validateMeet();
    if (Object.keys(e).length) { setMeetErrors(e); return; }

    const [year, month, day] = meet.date.split("-").map(Number);
    const [hm, ampm] = meet.time.split(" ");
    let [hh, mm] = hm.split(":").map(Number);
    if (ampm === "PM" && hh !== 12) hh += 12;
    if (ampm === "AM" && hh === 12) hh = 0;
    const pad = n => String(n).padStart(2, "0");
    const startDT = `${year}${pad(month)}${pad(day)}T${pad(hh)}${pad(mm)}00`;
    const endDate = new Date(year, month - 1, day, hh, mm + 45);
    const endDT   = `${endDate.getFullYear()}${pad(endDate.getMonth()+1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;

    const title   = encodeURIComponent(`Visa Consultation – ${meet.name}`);
    const details = encodeURIComponent(
      `Visa Consultation Meeting\n\nClient: ${meet.name}\nPhone: ${meet.phone}\nEmail: ${meet.email}\nTopic: ${meet.topic}${meet.notes ? `\nNotes: ${meet.notes}` : ""}\n\nScheduled via Visa Expert`
    );
    const guests  = encodeURIComponent(`${meet.email},${GUEST_EMAIL}`);
    const calURL  = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDT}/${endDT}&details=${details}&add=${guests}&sf=true&output=xml`;

    setMeetLink(calURL);
    setMeetScheduled(true);
    setTimeout(() => window.open(calURL, "_blank"), 500);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setMeet({ name:"", email:"", phone:"", date:"", time:"", topic:"", notes:"" });
      setMeetErrors({});
      setMeetScheduled(false);
      setMeetLink("");
    }, 350);
  };

  return (
    <>
      {open && (
        <div className="home-smf__overlay" onClick={handleClose} />
      )}

      <button
        className={`home-smf__fab${open ? " home-smf__fab--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Schedule a Meeting"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        )}
        <span className="home-smf__fab-label">{open ? "Close" : "Schedule Meeting"}</span>
      </button>

      <div className={`home-smf__card${open ? " home-smf__card--open" : ""}`}>

        <div className="home-smf__card-header">
          <div className="home-smf__card-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
            </svg>
            Google Meet · 45 min · Free
          </div>
          <h3 className="home-smf__card-title">Schedule a Consultation</h3>
          <p className="home-smf__card-sub">Book a free slot with our visa expert.</p>
        </div>

        <div className="home-smf__card-body">
          {meetScheduled ? (
            <div className="home-smf__success">
              <div className="home-smf__success-ring">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4 className="home-smf__success-title">Meeting Scheduled! 🎉</h4>
              <p className="home-smf__success-sub">
                Google Calendar opened in a new tab. Once confirmed, the Meet link is sent to <strong>{meet.email}</strong> and our team.
              </p>
              <a href={meetLink} target="_blank" rel="noopener noreferrer" className="home-smf__btn home-smf__btn--meet" style={{textDecoration:"none"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Open Google Calendar Again
              </a>
              <button className="home-smf__btn home-smf__btn--ghost" onClick={() => { setMeet({name:"",email:"",phone:"",date:"",time:"",topic:"",notes:""}); setMeetScheduled(false); setMeetErrors({}); }}>
                Schedule another
              </button>
            </div>
          ) : (
            <div className="home-smf__form">

              <div className="home-smf__field">
                <label className="home-smf__label" htmlFor="smf-name">Full Name *</label>
                <input
                  id="smf-name"
                  name="smf-name"
                  className={`home-smf__input${meetErrors.name?" home-smf__input--err":""}`}
                  placeholder="e.g. Priya Sharma"
                  value={meet.name}
                  onChange={e=>{setMeet(p=>({...p,name:e.target.value}));setMeetErrors(p=>({...p,name:""}));}}
                />
                {meetErrors.name && <span className="home-smf__err">{meetErrors.name}</span>}
              </div>

              <div className="home-smf__field">
                <label className="home-smf__label" htmlFor="smf-email">Email Address *</label>
                <input
                  id="smf-email"
                  name="smf-email"
                  type="email"
                  className={`home-smf__input${meetErrors.email?" home-smf__input--err":""}`}
                  placeholder="you@example.com"
                  value={meet.email}
                  onChange={e=>{setMeet(p=>({...p,email:e.target.value}));setMeetErrors(p=>({...p,email:""}));}}
                />
                {meetErrors.email && <span className="home-smf__err">{meetErrors.email}</span>}
              </div>

              <div className="home-smf__field">
                <label className="home-smf__label" htmlFor="smf-phone">Phone Number *</label>
                <input
                  id="smf-phone"
                  name="smf-phone"
                  className={`home-smf__input${meetErrors.phone?" home-smf__input--err":""}`}
                  placeholder="+91 98765 43210"
                  value={meet.phone}
                  onChange={e=>{setMeet(p=>({...p,phone:e.target.value}));setMeetErrors(p=>({...p,phone:""}));}}
                />
                {meetErrors.phone && <span className="home-smf__err">{meetErrors.phone}</span>}
              </div>

              <div className="home-smf__field">
                <label className="home-smf__label" htmlFor="smf-topic">Meeting Topic *</label>
                <div className="home-smf__select-wrap">
                  <select
                    id="smf-topic"
                    name="smf-topic"
                    className={`home-smf__input home-smf__select${meetErrors.topic?" home-smf__input--err":""}`}
                    value={meet.topic}
                    onChange={e=>{setMeet(p=>({...p,topic:e.target.value}));setMeetErrors(p=>({...p,topic:""}));}}
                  >
                    <option value="">Select a topic…</option>
                    {topics.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className="home-smf__select-arrow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </div>
                {meetErrors.topic && <span className="home-smf__err">{meetErrors.topic}</span>}
              </div>

              <div className="home-smf__field">
                <label className="home-smf__label" htmlFor="smf-date">Preferred Date *</label>
                <WeekdayDateInput
                  id="smf-date"
                  name="smf-date"
                  className={`home-smf__input${meetErrors.date?" home-smf__input--err":""}`}
                  min={tomorrow}
                  value={meet.date}
                  onChange={val=>{setMeet(p=>({...p,date:val}));setMeetErrors(p=>({...p,date:""}));}}
                />
                {meetErrors.date && <span className="home-smf__err">{meetErrors.date}</span>}
              </div>

              <div className="home-smf__field">
                <label className="home-smf__label" htmlFor="smf-time">Time Slot *</label>
                <div className="home-smf__select-wrap">
                  <select
                    id="smf-time"
                    name="smf-time"
                    className={`home-smf__input home-smf__select${meetErrors.time?" home-smf__input--err":""}`}
                    value={meet.time}
                    onChange={e=>{setMeet(p=>({...p,time:e.target.value}));setMeetErrors(p=>({...p,time:""}));}}
                  >
                    <option value="">Choose a slot…</option>
                    {timeSlots.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className="home-smf__select-arrow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </div>
                {meetErrors.time && <span className="home-smf__err">{meetErrors.time}</span>}
              </div>

              {meet.date && (
                <div className="home-smf__timegrid">
                  <span className="home-smf__timegrid-label">Quick select:</span>
                  <div className="home-smf__timegrid-slots">
                    {timeSlots.map(t => (
                      <button key={t} className={`home-smf__timeslot${meet.time===t?" home-smf__timeslot--active":""}`} onClick={()=>{setMeet(p=>({...p,time:t}));setMeetErrors(p=>({...p,time:""}));}}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="home-smf__field">
                <label className="home-smf__label" htmlFor="smf-notes">Notes <span className="home-smf__optional">(optional)</span></label>
                <textarea
                  id="smf-notes"
                  name="smf-notes"
                  className="home-smf__input home-smf__textarea"
                  placeholder="Any questions before the call…"
                  rows={2}
                  value={meet.notes}
                  onChange={e=>setMeet(p=>({...p,notes:e.target.value}))}
                />
              </div>

              <div className="home-smf__guest-notice">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                Invite sent to <strong>{meet.email || "your email"}</strong> &amp; <strong>{GUEST_EMAIL}</strong>
              </div>

              <button className="home-smf__btn home-smf__btn--meet" onClick={handleSchedule}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Schedule Google Meet
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
// ─── HOME PAGE (single default export) ───────────────────────────────────────

export default function Home() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 900,
        once: true,
        offset: 80,
        easing: "ease-out-cubic",
        delay: 50,
        mirror: false,
      });
    }
  }, []);

  return (
    <div className="home-app">
      <Hero search={search} setSearch={setSearch} />
      
      <DestGrid search={search} />
      <HowItWorks />   
      <Popular />
      <CTABanner />
      <Testimonials />
      <FAQ />
      <ContactUs />
      <ScheduleMeetingFloat />
    </div>
  );
}