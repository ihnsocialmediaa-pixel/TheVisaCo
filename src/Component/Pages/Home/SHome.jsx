import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { visaList } from "../Booking/visaData";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const destinations = [
  { id:1,  name:"United Arab Emirates", visaCount:"53K+", img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", tag:"eVisa",   fee:"₹999",   originalFee:"₹1,499", popularity:"Most Visited" },
  { id:2,  name:"Thailand",             visaCount:"32K+", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", tag:"eVisa",   fee:"₹699",   originalFee:"₹999",   popularity:"Top Pick"     },
  { id:3,  name:"Switzerland",          visaCount:"30K+", img:"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80", tag:"Sticker", fee:"₹3,999", originalFee:"₹4,999", popularity:"Trending"     },
  { id:4,  name:"Vietnam",              visaCount:"27K+", img:"https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=600&q=80", tag:"eVisa",   fee:"₹1,299", originalFee:"₹1,799", popularity:"Best Deal"    },
  { id:5,  name:"Indonesia",            visaCount:"16K+", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tag:"eVisa",   fee:"₹599",   originalFee:"₹799",   popularity:"Top Pick"     },
  { id:6,  name:"Maldives",             visaCount:"17K+", img:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", tag:"Free",    fee:"Free",   originalFee:null,      popularity:"Most Loved"   },
  { id:7,  name:"United States",        visaCount:"25K+", img:"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80", tag:"Sticker", fee:"₹9,999", originalFee:"₹12,999",popularity:"Most Visited" },
  { id:8,  name:"Hong Kong",            visaCount:"19K+", img:"https://images.unsplash.com/photo-1506970845246-18f21d533b20?w=600&q=80", tag:"eVisa",   fee:"₹899",   originalFee:"₹1,299", popularity:"Trending"     },
  { id:9,  name:"Egypt",                visaCount:"24K+", img:"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&q=80", tag:"eVisa",   fee:"₹1,999", originalFee:"₹2,499", popularity:"Best Deal"    },
  { id:10, name:"Malaysia",             visaCount:"37K+", img:"https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=600&q=80", tag:"eVisa",   fee:"₹399",   originalFee:"₹599",   popularity:"Most Visited" },
  { id:11, name:"Singapore",            visaCount:"22K+", img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80", tag:"eVisa",   fee:"₹2,299", originalFee:"₹2,999", popularity:"Top Pick"     },
  { id:12, name:"Turkey",               visaCount:"21K+", img:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80", tag:"eVisa",   fee:"₹1,399", originalFee:"₹1,899", popularity:"Trending"     },
  { id:13, name:"France",               visaCount:"18K+", img:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80", tag:"Sticker", fee:"₹4,999", originalFee:"₹6,499", popularity:"Most Loved"   },
  { id:14, name:"Japan",                visaCount:"29K+", img:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80", tag:"Sticker", fee:"₹2,699", originalFee:"₹3,499", popularity:"Most Visited" },
  { id:15, name:"Canada",               visaCount:"14K+", img:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", tag:"eTA",     fee:"₹3,199", originalFee:"₹4,199", popularity:"Top Pick"     },
  { id:16, name:"Australia",            visaCount:"20K+", img:"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80", tag:"eVisa",   fee:"₹4,299", originalFee:"₹5,499", popularity:"Trending"     },
  { id:17, name:"New Zealand",          visaCount:"11K+", img:"https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80", tag:"eTA",     fee:"₹2,999", originalFee:"₹3,999", popularity:"Best Deal"    },
  { id:18, name:"Germany",              visaCount:"15K+", img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80", tag:"Sticker", fee:"₹5,599", originalFee:"₹7,299", popularity:"Most Visited" },
  { id:19, name:"Spain",                visaCount:"13K+", img:"https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=600&q=80", tag:"Sticker", fee:"₹5,299", originalFee:"₹6,799", popularity:"Most Loved"   },
  { id:20, name:"Italy",                visaCount:"16K+", img:"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80", tag:"Sticker", fee:"₹5,499", originalFee:"₹6,999", popularity:"Trending"     },
];

const faqs = [
  {
    q: "How long does the visa process take?",
    a: "Processing times vary by country and visa type. eVisas are typically approved within 24–72 hours. Sticker visas for embassies like the US, UK, or Schengen may take 5–15 business days. We always show the expected timeline before you apply.",
    tag: "Processing",
  },
  {
    q: "What documents do I need to submit?",
    a: "At minimum, you'll need a scanned copy of your passport (valid for at least 6 months), a recent passport-size photo, and basic travel details. Some countries require bank statements, hotel bookings, or travel insurance. Our smart checklist tells you exactly what's needed for your destination.",
    tag: "Documents",
  },
  {
    q: "Is my payment and personal data secure?",
    a: "Absolutely. We use 256-bit SSL encryption for all transactions. Your documents are stored on encrypted servers, shared only with the relevant embassy or immigration authority, and deleted after processing. We never sell your data.",
    tag: "Security",
  },
  {
    q: "What happens if my visa is rejected?",
    a: "In the rare event of a rejection, our team will analyse the reason and advise on reapplication options. If the rejection is due to an error on our end, we offer a full refund. Government visa fees are non-refundable by policy, but our service fee is.",
    tag: "Refunds",
  },
  {
    q: "Can I apply for multiple visas at once?",
    a: "Yes! You can manage multiple applications from a single dashboard — ideal for multi-country itineraries or family travel. Each application is tracked separately with real-time status updates.",
    tag: "Applications",
  },
  {
    q: "Do you offer emergency or express processing?",
    a: "Yes. We offer express processing for most eVisa destinations, with approvals possible in as little as 4–6 hours. Select 'Express' during checkout. An additional fee applies for expedited handling.",
    tag: "Processing",
  },
  {
    q: "How will I receive my approved visa?",
    a: "eVisas and eTAs are delivered directly to your registered email as a PDF, ready to print or show digitally at the airport. For sticker visas, we coordinate with the relevant embassy — your passport is collected and returned via courier.",
    tag: "Delivery",
  },
  {
    q: "Can I get a refund if I cancel my trip?",
    a: "Our service fee is refundable if your application hasn't been submitted to the embassy yet. Once submitted, government processing fees are non-refundable. Please check our full refund policy for details.",
    tag: "Refunds",
  },
];
// ─── POPULARITY BADGE CONFIG ──────────────────────────────────────────────────
const POPULARITY_STYLES = {
  "Most Visited": { color: "#1e40af", bg: "#dbeafe" },   // blue
  "Top Pick":     { color: "#065f46", bg: "#d1fae5" },   // green
  "Trending":     { color: "#92400e", bg: "#fef3c7" },   // amber
  "Best Deal":    { color: "#6d28d9", bg: "#ede9fe" },   // purple
  "Most Loved":   { color: "#9f1239", bg: "#ffe4e6" },   // rose
};
const countries = [
  { name:"USA" }, { name:"UK" }, { name:"Canada" }, { name:"Australia" },
  { name:"Germany" }, { name:"France" }, { name:"UAE" }, { name:"Japan" },
  { name:"Singapore" }, { name:"India" }, { name:"Italy" }, { name:"Spain" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getVisaIdForDestination(name) {
  const normalized = name.trim().toLowerCase();
  const exact = visaList.find(v => v.country.toLowerCase() === normalized);
  if (exact) return exact.id;
  if (normalized.includes("united arab emirates") || normalized === "uae") return "uae-30";
  if (normalized.includes("united states") || normalized === "usa") return "usa";
  return "uae-30";
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ search, setSearch }) {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1"/>
        <div className="hero__orb hero__orb--2"/>
        <div className="hero__orb hero__orb--3"/>
        <div className="hero__orb hero__orb--4"/>
        <div className="hero__orb hero__orb--5"/>
        <div className="hero__orb hero__orb--6"/>
        <div className="hero__grid"/>
      </div>

      <div className="hero__inner">
        <h1 className="hero__title" data-aos="fade-up" data-aos-delay="100">
          Get Your Visa<br/>
          <span className="hero__title-accent">On Time</span>
        </h1>

        <p className="hero__sub" data-aos="fade-up" data-aos-delay="200">
          Fast, expert visa processing for 180+ countries — approved on time, guaranteed.
        </p>

        <div className="search-wrap" data-aos="zoom-in-up" data-aos-delay="300">
          <div className="search">
            <svg className="search__icon" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="#003a5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
            <span className="search__divider"/>
            <input
              className="search__input"
              type="text"
              placeholder="Select destination country…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search__clear" onClick={() => setSearch("")} aria-label="Clear">✕</button>
            )}
            <button className="search__btn">Search</button>
          </div>

          <div className="search__suggestions">
            {["UAE 🇦🇪","Thailand 🇹🇭","Japan 🇯🇵","USA 🇺🇸","UK 🇬🇧"].map(s => (
              <button key={s} className="search__pill"
                onClick={() => setSearch(s.split(" ")[0])}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COUNTRY MARQUEE ──────────────────────────────────────────────────────────

function CountryMarquee() {
  return (
    <section className="ve-marquee-section">
      <div className="ve-marquee-track">
        <div className="ve-marquee-inner">
          {[...countries, ...countries].map((c, i) => {
            const visaId = getVisaIdForDestination(c.name);
            return (
              <Link key={i} to={`/visa/${visaId}`} className="ve-marquee-item">
                <span className="ve-marquee-name">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── DEST CARD ────────────────────────────────────────────────────────────────
function DestCard({ dest, index }) {
  const visaId = getVisaIdForDestination(dest.name);
  const popStyle = POPULARITY_STYLES[dest.popularity] || { color: "#374151", bg: "#f3f4f6" };

  return (
    <Link
      to={`/visa/${visaId}`}
      className="dcard"
      aria-label={`View ${dest.name} visa options`}
      data-aos="fade-up"
      data-aos-delay={Math.min((index % 5) * 60, 240)}
    >
      {/* ── Image block ── */}
      <div className="dcard__img-wrap">
        <img
          className="dcard__img"
          src={dest.img}
          alt={dest.name}
          loading="lazy"
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="dcard__fallback">🌍</div>

        {/* Visa type — top right */}
        <div className="dcard__tag">{dest.tag}</div>

        {/* Visa count — bottom left */}
        <div className="dcard__badge">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955
              11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9
              11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          {dest.visaCount} Visas
        </div>
      </div>

      {/* ── Body ── */}
      <div className="dcard__body">

        {/* Name row + popularity badge */}
        <div className="dcard__name-row">
          <h3 className="dcard__name">{dest.name}</h3>
          {dest.popularity && (
            <span
              className="dcard__popularity"
              style={{ color: popStyle.color, background: popStyle.bg }}
            >
              {dest.popularity}
            </span>
          )}
        </div>

        <div className="dcard__divider" />

        {/* Footer: best price + strikethrough left · discounted fee right */}
        <div className="dcard__footer">
          <div className="dcard__price-block">
            <span className="dcard__best-label">
              {/* small tick icon */}
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                style={{ display:"inline-block", verticalAlign:"middle", marginRight:"3px", marginTop:"-1px" }}>
                <polyline points="2 6 5 9 10 3"/>
              </svg>
              Actual Price
            </span>
            {dest.originalFee && (
              <span className="dcard__original-fee">{dest.originalFee}</span>
            )}
          </div>
          <span className="dcard__fee ">{dest.fee}</span>
        </div>

      </div>
    </Link>
  );
}

// ─── DEST GRID ────────────────────────────────────────────────────────────────
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

function DestGrid({ search }) {
  const [filter, setFilter] = React.useState("All");
  const filters = ["All", "eVisa", "Sticker", "Free", "eTA"];
  const limit = useCardLimit();

  const filtered = destinations.filter(d => {
    const q = d.name.toLowerCase().includes(search.toLowerCase());
    const f = filter === "All" || d.tag === filter;
    return q && f;
  });

  const shown = filtered.slice(0, limit);

  return (
    <section className="dest-section">
      <div className="dest-section__inner">

        <div className="dest-section__head" data-aos="fade-up">
          <div>
            <span className="sec-tag sec-tag--dark">Explore Destinations</span>
            <h2 className="dest-section__title">Where do you want to go?</h2>
          </div>
        </div>

        <div className="filter-bar" data-aos="fade-up" data-aos-delay="100">
          <div className="filter-bar__tabs">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-tab${filter === f ? " filter-tab--active" : ""}`}
                onClick={() => setFilter(f)}
              >{f}</button>
            ))}
          </div>
          <span className="filter-bar__count">{filtered.length} destinations</span>
        </div>

        {shown.length > 0 ? (
          <div className="dest-grid">
            {shown.map((d, i) => <DestCard key={d.id} dest={d} index={i} />)}
          </div>
        ) : (
          <div className="empty" data-aos="fade-up">
            <div className="empty__emoji">🔍</div>
            <h3>No results for "{search}"</h3>
            <p>Try a different country name or clear filters.</p>
          </div>
        )}

      </div>
    </section>
  );
}
// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
// ─── HOW IT WORKS — replace your existing HowItWorks function with this ───────

const steps = [
  {
    num: "01", icon: "🌐",
    title: "Choose Your Destination",
    desc: "Browse 180+ countries with live availability, processing timelines, and fee breakdowns. Find exactly the visa type your journey requires.",
  },
  {
    num: "02", icon: "📄",
    title: "Upload Your Documents",
    desc: "Securely submit your passport scan and supporting documents through our encrypted portal. Our checklist ensures nothing is missed.",
  },
  {
    num: "03", icon: "⚙️",
    title: "We Process Your Application",
    desc: "Dedicated visa consultants review, verify, and submit your application to the relevant embassy — with real-time status updates at every step.",
  },
  {
    num: "04", icon: "⏰",
    title: "Visa Delivered On Time",
    desc: "Receive your approved visa digitally, delivered before your travel date. On-time guarantee — or we refund you in full.",
  },
];

function HowItWorks() {
  const [current, setCurrent] = React.useState(0);
  const [exitDir, setExitDir]   = React.useState(null); // "left" | "right" | null
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
    // We override setCurrent inside go's timeout, but we need target i
    // So use a small helper:
    setExitDir(i > current ? "left" : "right");
    setTimeout(() => { setExitDir(null); setCurrent(i); }, 490);
  };

  const getPos = (i) => {
    const diff = i - current;
    return diff < 0 ? null : diff;
  };

  // Shared arrow button markup
  const PrevBtn = () => (
    <button
      className="how__nav-btn"
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
      className="how__nav-btn"
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
    <section className="how">
      <div className="how__inner">

        {/* ── Centred heading ── */}
        <div className="how__head" data-aos="fade-up">
          <div className="how__head-text">
            <span className="sec-tag">How It Works</span>
            <h2 className="how__head-title">
              Your visa, handled<br/>from start to finish
            </h2>
            <p className="how__head-sub">
              No embassy visits. No paperwork confusion. Just your approved visa, on time.
            </p>
          </div>
        </div>

        {/* ── Desktop/Tablet: [←]  [stack]  [→] ── */}
        <div className="how__deck-row" data-aos="fade-up" data-aos-delay="100">

          {/* Left arrow — desktop/tablet only (hidden on mobile via CSS) */}
          <PrevBtn />

          {/* Card stack */}
          <div className="how__stage">
            {steps.map((step, i) => {
              const pos = getPos(i);
              if (pos === null) return null;

              const isExiting = exitDir !== null && i === current;
              const exitClass = isExiting
                ? ` how__card--exit-${exitDir}`
                : "";

              return (
                <div
                  key={step.num}
                  className={`how__card${exitClass}`}
                  data-pos={Math.min(pos, 4)}
                  data-step={step.num}   /* drives per-card gradient */
                >
                  <div className="how__card-icon">{step.icon}</div>
                  <div className="how__card-step">Step {step.num}</div>
                  <h3 className="how__card-title">{step.title}</h3>
                  <p className="how__card-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Right arrow — desktop/tablet only */}
          <NextBtn />

          {/* Mobile nav row — sits below stage, shown only on ≤600px */}
          <div className="how__mobile-nav">
            <PrevBtn />
            <span className="how__nav-counter">{current + 1} / {total}</span>
            <NextBtn />
          </div>

        </div>

        {/* ── Progress dots ── */}
        <div className="how__footer">
          <div className="how__dots">
            {steps.map((_, i) => (
              <button
                key={i}
                className={`how__dot${i === current ? " how__dot--active" : ""}`}
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
// ─── TESTIMONIALS + FEEDBACK — full drop-in replacement ──────────────────────
// Paste this entire block into Home.jsx in place of your existing Testimonials()

function Testimonials() {
  // ── Existing reviews ──
  const reviews = [
    { name:"Priya S.",  country:"Mumbai → Dubai",     rating:5, text:"Got my UAE visa in 4 hours. Unbelievable speed. The whole process was seamless from start to finish.",         avatar:"P" },
    { name:"Arjun K.",  country:"Delhi → Thailand",   rating:5, text:"Applied at night, visa in my inbox by morning. The document checklist saved me from making mistakes.",         avatar:"A" },
    { name:"Sneha R.",  country:"Bangalore → Japan",  rating:5, text:"Japan visa is notoriously tough but they guided me through every step. Got it on the first attempt.",          avatar:"S" },
    { name:"Vikram T.", country:"Hyderabad → USA",    rating:5, text:"The mock interview feature is brilliant. Felt confident walking into the embassy. Visa approved!",             avatar:"V" },
    { name:"Meera P.",  country:"Chennai → UK",       rating:5, text:"Customer support is genuinely helpful. They answered my Schengen questions at 11pm on a Sunday.",             avatar:"M" },
    { name:"Rohan M.",  country:"Pune → Singapore",   rating:5, text:"Super fast and transparent. Loved the live status tracking — knew exactly where my application stood.",       avatar:"R" },
  ];

  // ── Feedback form state ──
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

  return (
    <section className="testi">
      {/* ── Animated background ── */}
      <div className="testi__bg" aria-hidden="true">
        <div className="testi__orb testi__orb--1"/>
        <div className="testi__orb testi__orb--2"/>
        <div className="testi__orb testi__orb--3"/>
        <div className="testi__grid"/>
        {/* floating quote marks */}
        <span className="testi__deco testi__deco--1">"</span>
        <span className="testi__deco testi__deco--2">"</span>
        <span className="testi__deco testi__deco--3">★</span>
      </div>

      <div className="testi__inner">

        {/* ── Heading ── */}
        <div className="testi__head" data-aos="fade-up">
          <span className="sec-tag" style={{ color:"#F4B342", background:"rgba(244,179,66,.15)" }}>
            What Travellers Say
          </span>
          <h2 className="testi__title">Trusted by <span className="testi__title-accent">180,000+</span> travellers</h2>
          <p className="testi__sub">Real people. Real visas. Real stories.</p>

          {/* aggregate stars */}
          <div className="testi__aggregate">
            <div className="testi__stars-row">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="testi__aggregate-score">4.9</span>
            <span className="testi__aggregate-count">from 12,400+ reviews</span>
          </div>
        </div>

        {/* ── Review cards grid ── */}
        <div className="testi__grid-reviews">
          {allReviews.map((r, i) => (
            <div
              key={i}
              className={`testi__card${r.isNew ? " testi__card--new" : ""}`}
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 70, 350)}
            >
              {/* quote watermark */}
              <span className="testi__card-watermark">"</span>

              {/* stars */}
              <div className="testi__card-stars">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24"
                    fill={s <= r.rating ? "#f59e0b" : "#d4dde6"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                {r.isNew && <span className="testi__card-new-badge">New</span>}
              </div>

              <p className="testi__card-text">"{r.text}"</p>

              <div className="testi__card-author">
                <div className="testi__card-avatar"
                  style={{ background: avatarGradients[i % avatarGradients.length] }}>
                  {r.avatar}
                </div>
                <div>
                  <div className="testi__card-name">{r.name}</div>
                  <div className="testi__card-route">
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

        {/* ══════════════════════════════════════════════════════════
            FEEDBACK FORM
        ══════════════════════════════════════════════════════════ */}
        <div className="feedback" data-aos="fade-up" data-aos-delay="100">

          <div className="feedback__left">
            <span className="sec-tag" style={{ color:"#002236", background:"white" }}>
              Share Your Experience
            </span>
            <h3 className="feedback__title">How was your<br/>visa journey?</h3>
            <p className="feedback__desc">
              Your review helps thousands of other travellers make the right choice.
              It takes less than a minute.
            </p>
            {/* decorative stat pills */}
            <div className="feedback__stats">
              <div className="feedback__stat">
                <span className="feedback__stat-num">12K+</span>
                <span className="feedback__stat-lbl">Reviews</span>
              </div>
              <div className="feedback__stat-divider"/>
              <div className="feedback__stat">
                <span className="feedback__stat-num">4.9★</span>
                <span className="feedback__stat-lbl">Avg Rating</span>
              </div>
              <div className="feedback__stat-divider"/>
              <div className="feedback__stat">
                <span className="feedback__stat-num">98%</span>
                <span className="feedback__stat-lbl">Recommend</span>
              </div>
            </div>
          </div>

          <div className="feedback__right">
            {submitted ? (
              /* ── Success state ── */
              <div className="feedback__success">
                <div className="feedback__success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                    stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h4 className="feedback__success-title">Thank you for your review!</h4>
                <p className="feedback__success-sub">Your feedback has been added above and helps other travellers.</p>
                <button className="feedback__submit feedback__submit--ghost" onClick={handleReset}>
                  Write another review
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <div className="feedback__form">

                {/* Row 1: Name + Country */}
                <div className="feedback__row">
                  <div className="feedback__field">
                    <label className="feedback__label">Your Name</label>
                    <input
                      className={`feedback__input${errors.name ? " feedback__input--err" : ""}`}
                      placeholder="e.g. Priya S."
                      value={form.name}
                      onChange={e => { setForm(p=>({...p,name:e.target.value})); setErrors(p=>({...p,name:""})); }}
                    />
                    {errors.name && <span className="feedback__err">{errors.name}</span>}
                  </div>
                  <div className="feedback__field">
                    <label className="feedback__label">Your Route</label>
                    <input
                      className={`feedback__input${errors.country ? " feedback__input--err" : ""}`}
                      placeholder="e.g. Delhi → Paris"
                      value={form.country}
                      onChange={e => { setForm(p=>({...p,country:e.target.value})); setErrors(p=>({...p,country:""})); }}
                    />
                    {errors.country && <span className="feedback__err">{errors.country}</span>}
                  </div>
                </div>

                {/* Row 2: Star rating */}
                <div className="feedback__field">
                  <label className="feedback__label">Your Rating</label>
                  <div className="feedback__stars">
                    {[1,2,3,4,5].map(s => (
                      <button
                        key={s}
                        type="button"
                        className="feedback__star-btn"
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
                      <span className="feedback__rating-label">
                        {["","Poor","Fair","Good","Great","Excellent!"][form.rating]}
                      </span>
                    )}
                  </div>
                  {errors.rating && <span className="feedback__err">{errors.rating}</span>}
                </div>

                {/* Row 3: Review text */}
                <div className="feedback__field">
                  <label className="feedback__label">Your Review</label>
                  <textarea
                    className={`feedback__textarea${errors.text ? " feedback__input--err" : ""}`}
                    placeholder="Tell us about your visa experience — the process, speed, support…"
                    rows={4}
                    value={form.text}
                    onChange={e => { setForm(p=>({...p,text:e.target.value})); setErrors(p=>({...p,text:""})); }}
                  />
                  <div className="feedback__char">
                    <span>{errors.text ? <span className="feedback__err">{errors.text}</span> : ""}</span>
                    <span style={{color: form.text.length < 20 ? "#94a3b8" : "#16a34a"}}>
                      {form.text.length} / 20+ chars
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button className="feedback__submit" onClick={handleSubmit}>
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
        {/* end feedback */}

      </div>
    </section>
  );
}
// ─── POPULAR — Square Card Globe Carousel ────────────────────────────────────
// Replace your entire Popular() function with this.

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
    <section className="popular">
      <div className="popular__inner">

        <div className="popular__head sec-head sec-head--light" data-aos="fade-up">
          <span className="sec-tag sec-tag--light">Trending Now</span>
          <h2 className="dest-section__title" style={{ marginTop: ".5rem" }}>
            Most Popular Destinations
          </h2>
        </div>

        <div className="popular__scene" data-aos="fade-up" data-aos-delay="80">
          <div
            className="popular__track"
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
                  className="popular__slide"
                  style={{
                    transform: `rotateY(${seatAngle}deg) translateZ(${RADIUS}px)`,
                    opacity: visible ? opacity : 0,
                    pointerEvents: visible ? "auto" : "none",
                  }}
                >
                  <div className={`popular__item${isActive ? " popular__item--active" : ""}`}>

                    {/* Image strip */}
                    <div className="popular__thumb-wrap">
                      <img
                        src={d.img}
                        alt={d.name}
                        className="popular__thumb"
                        onError={e => (e.target.style.display = "none")}
                      />
                      {/* rank — top left */}
                      <span className="popular__rank">#{i + 1}</span>
                      {/* visa type — top right */}
                      <span className="popular__thumb-tag">{d.tag}</span>
                    </div>

                    {/* Info body */}
                    <div className="popular__body">
                      <div>
                        <div className="popular__pname">{d.name}</div>
                        <div className="popular__pmeta">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.2">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                          </svg>
                          {d.visaCount} issued
                        </div>
                      </div>

                      <div className="popular__footer-row">
                        <div className="popular__price-col">
                          {d.originalFee && (
                            <span className="popular__pfee-orig">{d.originalFee}</span>
                          )}
                          <span className="popular__pfee">{d.fee}</span>
                        </div>
                        <Link to={`/visa/${visaId}`} className="popular__btn">
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

        {/* Nav */}
        <div className="popular__nav">
          <button className="popular__nav-btn" onClick={() => rotate(-1)} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <div className="popular__dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`popular__dot${i === active ? " popular__dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${items[i].name}`}
              />
            ))}
          </div>

          <button className="popular__nav-btn" onClick={() => rotate(1)} aria-label="Next">
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
  const [progress, setProgress] = React.useState(0);   // 0–100
  const [launched, setLaunched] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const runwayRef  = React.useRef(null);
  const planeRef   = React.useRef(null);
  const startXRef  = React.useRef(null);

  const LAUNCH_THRESHOLD = 88; // % at which launch triggers

  // ── clamp helper ──
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  // ── compute progress from clientX ──
  const calcProgress = (clientX) => {
    const rw = runwayRef.current;
    if (!rw) return 0;
    const { left, width } = rw.getBoundingClientRect();
    // account for plane thumb size (~56px = half of 48px thumb + padding)
    const usable = width - 56;
    const raw = (clientX - left - 28) / usable * 100;
    return clamp(raw, 0, 100);
  };

  // ── Mouse events ──
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
    if (!launched) setProgress(0); // snap back unless launched
    setDragging(false);
  }, [launched]);

  // ── Touch events ──
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

  // ── Global listeners ──
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

  // speed label
  const speed = Math.round(progress * 2.8);  // 0 → 280 knots
  const speedLabel = launched ? "AIRBORNE 🛫" : progress > 60 ? `${speed} kts` : progress > 20 ? `${speed} kts` : "READY";

  return (
    <section className="cta-banner">

      {/* ── Animated background ── */}
      <div className="cta-banner__bg" aria-hidden="true">
        <div className="cta-orb cta-orb--1"/>
        <div className="cta-orb cta-orb--2"/>
        <div className="cta-orb cta-orb--3"/>
        <div className="cta-banner__stars">
          {Array.from({length:28}).map((_,i) => (
            <div key={i} className="cta-star"
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
        {/* Cloud strips */}
        <div className="cta-cloud cta-cloud--1"/>
        <div className="cta-cloud cta-cloud--2"/>
        <div className="cta-cloud cta-cloud--3"/>
      </div>

      <div className="cta-banner__inner">

        {/* ── Heading ── */}
        <div className="cta-banner__head" data-aos="fade-up">
          <span className="sec-tag" style={{color:"#F4B342",background:"rgba(244,179,66,.15)"}}>
            Limited Time Offer
          </span>
          <h2 className="cta-banner__title">
            Your Next Trip<br/>
            <span className="cta-banner__title-accent">Starts Here</span>
          </h2>
          <p className="cta-banner__sub">
            Drag the plane down the runway to take off.
          </p>
        </div>

        {/* ── RUNWAY SLIDER ── */}
        <div className="cta-runway-wrap" data-aos="fade-up" data-aos-delay="150">

          {/* Speed + status HUD */}
          <div className="cta-hud">
            <div className="cta-hud__item">
              <span className="cta-hud__label">STATUS</span>
              <span className="cta-hud__val" style={{color: launched?"#22c55e": progress>60?"#F4B342":"rgba(255,255,255,.7)"}}>
                {speedLabel}
              </span>
            </div>
            <div className="cta-hud__sep"/>
            <div className="cta-hud__item">
              <span className="cta-hud__label">PROGRESS</span>
              <span className="cta-hud__val">{Math.round(progress)}%</span>
            </div>
            <div className="cta-hud__sep"/>
            <div className="cta-hud__item">
              <span className="cta-hud__label">DESTINATION</span>
              <span className="cta-hud__val">BOOKING</span>
            </div>
          </div>

          {/* Runway track */}
          <div className="cta-runway" ref={runwayRef}>

            {/* Tarmac fill */}
            <div className="cta-runway__tarmac">
              {/* Centre dashes */}
              <div className="cta-runway__dashes">
                {Array.from({length:12}).map((_,i) => (
                  <div key={i} className="cta-runway__dash"
                    style={{ opacity: (i / 12) < (progress / 100) ? 0.15 : 0.45 }}
                  />
                ))}
              </div>

              {/* Progress fill glow */}
              <div className="cta-runway__fill"
                style={{ width: `${progress}%` }}
              />

              {/* THRESHOLD marker */}
              <div className="cta-runway__marker" style={{ left:`${LAUNCH_THRESHOLD}%` }}>
                <span className="cta-runway__marker-label">TAKEOFF</span>
              </div>
            </div>

            {/* ── PLANE THUMB ── */}
            <div
              ref={planeRef}
              className={`cta-plane${dragging?" cta-plane--drag":""}${launched?" cta-plane--launch":""}`}
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
              {/* Engine heat shimmer */}
              {progress > 30 && (
                <div className="cta-plane__heat"
                  style={{ opacity: Math.min((progress - 30) / 70, 0.6) }}
                />
              )}

              {/* SVG plane icon */}
              <svg className="cta-plane__svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Body */}
                <ellipse cx="32" cy="32" rx="22" ry="7" fill="white" opacity="0.95"/>
                {/* Nose */}
                <path d="M54 32 Q62 32 58 28 L54 29Z" fill="white" opacity="0.9"/>
                {/* Tail fin */}
                <path d="M12 32 L8 20 L18 28Z" fill="white" opacity="0.85"/>
                {/* Main wing */}
                <path d="M28 32 L18 18 L42 28 Z" fill="white" opacity="0.9"/>
                <path d="M28 32 L18 46 L42 36 Z" fill="white" opacity="0.85"/>
                {/* Small rear wing */}
                <path d="M14 32 L10 26 L20 30Z" fill="white" opacity="0.7"/>
                <path d="M14 32 L10 38 L20 34Z" fill="white" opacity="0.65"/>
                {/* Window strip */}
                <ellipse cx="38" cy="30" rx="6" ry="2.5" fill="#0ea5e9" opacity="0.6"/>
                <ellipse cx="38" cy="34" rx="6" ry="2.5" fill="#0ea5e9" opacity="0.4"/>
              </svg>

              {/* Engine exhaust trail */}
              {progress > 10 && (
                <div className="cta-plane__trail">
                  {[1,2,3].map(i => (
                    <div key={i} className="cta-plane__trail-puff"
                      style={{ animationDelay: `${i * 0.1}s`, opacity: Math.min(progress/80, 0.7) }}
                    />
                  ))}
                </div>
              )}
            </div>

            

            {/* Launched overlay */}
            {launched && (
              <div className="cta-runway__launched">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Redirecting to booking…
              </div>
            )}

          </div>

          {/* Runway edge lights */}
          <div className="cta-runway__lights">
            {Array.from({length:10}).map((_,i) => (
              <div key={i} className="cta-runway__light"
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

          <p className="cta-runway__caption">
            {progress < LAUNCH_THRESHOLD
              ? "Begin your application"
              : launched
                ? "Cleared for takeoff — bon voyage! ✈️"
                : "Release to confirm takeoff!"}
          </p>

        </div>
        {/* end runway wrap */}

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

  // Highlight matching text
  const highlight = (text) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="faq__highlight">{part}</mark>
        : part
    );
  };

  return (
    <section className="faq">
      {/* ── Decorative background ── */}
      <div className="faq__bg" aria-hidden="true">
        <div className="faq__blob faq__blob--1" />
        <div className="faq__blob faq__blob--2" />
        <div className="faq__blob faq__blob--3" />
        {/* Floating geometric shapes */}
        <div className="faq__geo faq__geo--ring1" />
        <div className="faq__geo faq__geo--ring2" />
        <div className="faq__geo faq__geo--dot1" />
        <div className="faq__geo faq__geo--dot2" />
        <div className="faq__geo faq__geo--dot3" />
        <div className="faq__geo faq__geo--line1" />
        <div className="faq__geo faq__geo--line2" />
      </div>

      <div className="faq__inner">

        {/* ── Heading ── */}
        <div className="faq__head" data-aos="fade-up">
          <span className="faq__eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4M12 8h.01"/>
            </svg>
            Got Questions?
          </span>
          <h2 className="faq__title">
            Frequently Asked
            <span className="faq__title-accent"> Questions</span>
          </h2>
          <p className="faq__sub">
            Everything you need to know — answered clearly and quickly.
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="faq__search-wrap" data-aos="fade-up" data-aos-delay="80">
          <div className={`faq__search${focused ? " faq__search--focused" : ""}${query ? " faq__search--has-val" : ""}`}>

            {/* Search icon */}
            <span className="faq__search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>

            <input
              ref={inputRef}
              className="faq__search-input"
              type="text"
              placeholder="Search questions — e.g. documents, refund, express…"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(null); }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Search FAQ"
            />

            {/* Live count badge */}
            {query && (
              <span className="faq__search-count">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            )}

            {/* Clear button */}
            {query && (
              <button className="faq__search-clear" onClick={clearSearch} aria-label="Clear search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}

            {/* Search button */}
            <button className="faq__search-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </button>
          </div>

          {/* Quick suggestion pills */}
          {!query && (
            <div className="faq__suggestions">
              <span className="faq__suggestions-label">Try:</span>
              {["processing time", "documents needed", "express visa", "refund policy"].map(s => (
                <button key={s} className="faq__suggestion-pill"
                  onClick={() => { setQuery(s); setOpen(null); }}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Tag filter chips ── */}
        <div className="faq__tags" data-aos="fade-up" data-aos-delay="100">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`faq__tag${activeTag === tag ? " faq__tag--active" : ""}`}
              onClick={() => { setTag(tag); setOpen(null); }}
            >
              {tag}
              {tag !== "All" && (
                <span className="faq__tag-count">
                  {faqs.filter(f => f.tag === tag).length}
                </span>
              )}
            </button>
          ))}
          <span className="faq__tag-total">{filtered.length} of {faqs.length} shown</span>
        </div>

        {/* ── Accordion list ── */}
        <div className="faq__list">
          {filtered.length === 0 ? (
            <div className="faq__empty" data-aos="fade-up">
              <div className="faq__empty-icon">🔍</div>
              <h3 className="faq__empty-title">No results for "{query}"</h3>
              <p className="faq__empty-sub">Try a different keyword or clear the filter.</p>
              <button className="faq__empty-btn" onClick={clearSearch}>Clear search</button>
            </div>
          ) : (
            filtered.map((item, i) => {
              const globalIdx = faqs.indexOf(item);
              const isOpen    = open === globalIdx;
              return (
                <div
                  key={globalIdx}
                  className={`faq__item${isOpen ? " faq__item--open" : ""}`}
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <button
                    className="faq__q"
                    onClick={() => toggle(globalIdx)}
                    aria-expanded={isOpen}
                  >
                    {/* Number */}
                    <span className="faq__q-num">
                      {String(globalIdx + 1).padStart(2, "0")}
                    </span>

                    {/* Question text */}
                    <span className="faq__q-text">{highlight(item.q)}</span>

                    {/* Tag pill */}
                    <span className="faq__q-tag">{item.tag}</span>

                    {/* Chevron */}
                    <span className="faq__chevron">
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

                  {/* Answer panel */}
                  <div
                    className="faq__a-wrap"
                    style={{
                      maxHeight: isOpen ? "320px" : "0",
                      opacity:   isOpen ? 1 : 0,
                      transition: "max-height .44s cubic-bezier(.4,0,.2,1), opacity .3s ease",
                      overflow: "hidden",
                    }}
                  >
                    <div className="faq__a-inner">
                      <div className="faq__a-bar" />
                      <p className="faq__a">{highlight(item.a)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer CTA ── */}
        <div className="faq__footer" data-aos="fade-up">
          <div className="faq__footer-card">
            <div className="faq__footer-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <div className="faq__footer-text-wrap">
              <strong className="faq__footer-title">Still have questions?</strong>
              <span className="faq__footer-sub">Our visa experts reply within 2 hours.</span>
            </div>
            <a href="#contact" className="faq__footer-btn">
              Contact Support →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
// ─── CONTACT US SECTION ───────────────────────────────────────────────────────
// • Only 2 contact channels: Email Us + Schedule Google Meet
// • Message form: Enquiry Type dropdown, phone required
// • Meeting scheduler: Google Calendar URL with auto guest ihnexperience@gmail.com
// • Guest email ALWAYS added: ihnexperience@gmail.com

function ContactUs() {
  const GUEST_EMAIL = "ihnexperience@gmail.com";

  const [tab, setTab] = React.useState("message");

  // ── Message form ──
  const [form, setForm]         = React.useState({ name:"", email:"", phone:"", destination:"", message:"", enquiry:"" });
  const [errors, setErrors]     = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending]     = React.useState(false);

  const enquiryOptions = [
    { value:"",            label:"Select enquiry type…" },
    { value:"general",     label:"General Enquiry" },
    { value:"application", label:"Application Status" },
    { value:"refund",      label:"Refund / Cancellation" },
    { value:"documents",   label:"Document Help" },
    { value:"emergency",   label:"Emergency / Urgent" },
  ];

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

  // ── Meeting form ──
  const [meet, setMeet]               = React.useState({ name:"", email:"", phone:"", date:"", time:"", topic:"", notes:"" });
  const [meetErrors, setMeetErrors]   = React.useState({});
  const [meetScheduled, setMeetScheduled] = React.useState(false);
  const [meetLink, setMeetLink]       = React.useState("");

  const timeSlots = ["09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];
  const topics    = ["Visa Application Guidance","Document Checklist Review","Application Status Update","Refund / Cancellation Help","Emergency Visa Processing","Other"];
  const today     = new Date().toISOString().split("T")[0];

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
    <section className="contact" id="contact">
      <div className="contact__bg" aria-hidden="true">
        <div className="contact__orb contact__orb--1" />
        <div className="contact__orb contact__orb--2" />
        <div className="contact__grid-bg" />
      </div>

      <div className="contact__inner">

        {/* Heading */}
        <div className="contact__head" data-aos="fade-up">
          <span className="sec-tag sec-tag--dark">Get In Touch</span>
          <h2 className="contact__title">We're here to<br /><span className="contact__title-accent">help you travel</span></h2>
          <p className="contact__sub">Reach out via email or book a free Google Meet consultation.</p>
        </div>

        {/* Channel cards */}
        <div className="contact__channels-row" data-aos="fade-up" data-aos-delay="60">
          {channels.map((ch, i) => (
            <div key={i} className="contact__channel" style={{ background:ch.bg, borderColor:ch.border }}>
              <div className="contact__channel-icon" style={{ color:ch.color, background:ch.bg }}>{ch.icon}</div>
              <div className="contact__channel-body">
                <div className="contact__channel-label">{ch.label}</div>
                <div className="contact__channel-value" style={{ color:ch.color }}>{ch.value}</div>
                <div className="contact__channel-sub">{ch.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="contact__tabs" data-aos="fade-up" data-aos-delay="80">
          <button className={`contact__tab${tab==="message"?" contact__tab--active":""}`} onClick={()=>setTab("message")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Send a Message
          </button>
          <button className={`contact__tab${tab==="meeting"?" contact__tab--active":""}`} onClick={()=>setTab("meeting")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Schedule a Meeting
          </button>
        </div>

        {/* ── MESSAGE PANEL ── */}
        {tab === "message" && (
          <div className="contact__panel" data-aos="fade-up" data-aos-delay="100">
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-ring">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="contact__success-title">Message sent!</h3>
                <p className="contact__success-sub">Your email client opened with your message pre-filled. We'll reply within 2 hours.</p>
                <button className="contact__submit contact__submit--ghost" onClick={()=>{setForm({name:"",email:"",phone:"",destination:"",message:"",enquiry:""});setSubmitted(false);setErrors({});}}>Send another message</button>
              </div>
            ) : (
              <div className="contact__form">
                <div className="contact__form-header">
                  <h3 className="contact__form-title">Send us a message</h3>
                  <p className="contact__form-note">We reply to every message within 2 hours on working days.</p>
                </div>

                {/* Enquiry dropdown */}
                <div className="contact__field">
                  <label className="contact__label">Enquiry Type *</label>
                  <div className="contact__select-wrap">
                    <select className={`contact__select${errors.enquiry?" contact__input--err":""}`} value={form.enquiry} onChange={e=>{setForm(p=>({...p,enquiry:e.target.value}));setErrors(p=>({...p,enquiry:""}));}}>
                      {enquiryOptions.map(o=><option key={o.value} value={o.value} disabled={o.value===""} hidden={o.value===""&&form.enquiry!==""?false:undefined}>{o.label}</option>)}
                    </select>
                    <span className="contact__select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                  </div>
                  {errors.enquiry && <span className="contact__err">{errors.enquiry}</span>}
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label className="contact__label">Full Name *</label>
                    <input className={`contact__input${errors.name?" contact__input--err":""}`} placeholder="e.g. Priya Sharma" value={form.name} onChange={e=>{setForm(p=>({...p,name:e.target.value}));setErrors(p=>({...p,name:""}));}} />
                    {errors.name && <span className="contact__err">{errors.name}</span>}
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Email Address *</label>
                    <input type="email" className={`contact__input${errors.email?" contact__input--err":""}`} placeholder="you@example.com" value={form.email} onChange={e=>{setForm(p=>({...p,email:e.target.value}));setErrors(p=>({...p,email:""}));}} />
                    {errors.email && <span className="contact__err">{errors.email}</span>}
                  </div>
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label className="contact__label">Phone Number *</label>
                    <input className={`contact__input${errors.phone?" contact__input--err":""}`} placeholder="+91 98765 43210" value={form.phone} onChange={e=>{setForm(p=>({...p,phone:e.target.value}));setErrors(p=>({...p,phone:""}));}} />
                    {errors.phone && <span className="contact__err">{errors.phone}</span>}
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Destination Country</label>
                    <input className="contact__input" placeholder="e.g. Japan, UAE, UK…" value={form.destination} onChange={e=>setForm(p=>({...p,destination:e.target.value}))} />
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__label">Your Message *</label>
                  <textarea className={`contact__textarea${errors.message?" contact__input--err":""}`} placeholder="Describe your visa requirements, travel dates, or concerns…" rows={4} value={form.message} onChange={e=>{setForm(p=>({...p,message:e.target.value}));setErrors(p=>({...p,message:""}));}} />
                  {errors.message && <span className="contact__err">{errors.message}</span>}
                </div>

                <button className={`contact__submit${sending?" contact__submit--sending":""}`} onClick={handleMsgSubmit} disabled={sending}>
                  {sending ? (<><span className="contact__spinner"/> Sending…</>) : (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Message</>)}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── MEETING PANEL ── */}
        {tab === "meeting" && (
          <div className="contact__panel contact__panel--meet" data-aos="fade-up" data-aos-delay="100">
            {meetScheduled ? (
              <div className="contact__success">
                <div className="contact__success-ring" style={{background:"rgba(16,185,129,.1)",borderColor:"rgba(16,185,129,.3)"}}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="contact__success-title">Meeting Scheduled! 🎉</h3>
                <p className="contact__success-sub">
                  Google Calendar opened in a new tab. Once you confirm, a Meet link is sent to <strong>{meet.email}</strong> and <strong>{GUEST_EMAIL}</strong>.
                </p>
                <a href={meetLink} target="_blank" rel="noopener noreferrer" className="contact__submit" style={{textDecoration:"none",marginTop:".5rem"}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Open Google Calendar Again
                </a>
                <button className="contact__submit contact__submit--ghost" onClick={()=>{setMeet({name:"",email:"",phone:"",date:"",time:"",topic:"",notes:""});setMeetScheduled(false);setMeetErrors({});}}>Schedule another meeting</button>
              </div>
            ) : (
              <div className="contact__form">
                <div className="contact__form-header">
                  <div className="contact__meet-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                    Google Meet · 45 min · Free
                  </div>
                  <h3 className="contact__form-title">Schedule a Consultation</h3>
                  <p className="contact__form-note">Pick a slot — a Google Meet invite is sent to you and our expert automatically.</p>
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label className="contact__label">Full Name *</label>
                    <input className={`contact__input${meetErrors.name?" contact__input--err":""}`} placeholder="e.g. Arjun Kapoor" value={meet.name} onChange={e=>{setMeet(p=>({...p,name:e.target.value}));setMeetErrors(p=>({...p,name:""}));}} />
                    {meetErrors.name && <span className="contact__err">{meetErrors.name}</span>}
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Email Address *</label>
                    <input type="email" className={`contact__input${meetErrors.email?" contact__input--err":""}`} placeholder="you@example.com" value={meet.email} onChange={e=>{setMeet(p=>({...p,email:e.target.value}));setMeetErrors(p=>({...p,email:""}));}} />
                    {meetErrors.email && <span className="contact__err">{meetErrors.email}</span>}
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__label">Phone Number *</label>
                  <input className={`contact__input${meetErrors.phone?" contact__input--err":""}`} placeholder="+91 98765 43210" value={meet.phone} onChange={e=>{setMeet(p=>({...p,phone:e.target.value}));setMeetErrors(p=>({...p,phone:""}));}} />
                  {meetErrors.phone && <span className="contact__err">{meetErrors.phone}</span>}
                </div>

                <div className="contact__field">
                  <label className="contact__label">Meeting Topic *</label>
                  <div className="contact__select-wrap">
                    <select className={`contact__select${meetErrors.topic?" contact__input--err":""}`} value={meet.topic} onChange={e=>{setMeet(p=>({...p,topic:e.target.value}));setMeetErrors(p=>({...p,topic:""}));}}>
                      <option value="">Select a topic…</option>
                      {topics.map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                    <span className="contact__select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                  </div>
                  {meetErrors.topic && <span className="contact__err">{meetErrors.topic}</span>}
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label className="contact__label">Preferred Date *</label>
                    <input type="date" className={`contact__input${meetErrors.date?" contact__input--err":""}`} min={today} value={meet.date} onChange={e=>{setMeet(p=>({...p,date:e.target.value}));setMeetErrors(p=>({...p,date:""}));}} />
                    {meetErrors.date && <span className="contact__err">{meetErrors.date}</span>}
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Time Slot *</label>
                    <div className="contact__select-wrap">
                      <select className={`contact__select${meetErrors.time?" contact__input--err":""}`} value={meet.time} onChange={e=>{setMeet(p=>({...p,time:e.target.value}));setMeetErrors(p=>({...p,time:""}));}}>
                        <option value="">Choose a slot…</option>
                        {timeSlots.map(t=><option key={t} value={t}>{t}</option>)}
                      </select>
                      <span className="contact__select-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                    </div>
                    {meetErrors.time && <span className="contact__err">{meetErrors.time}</span>}
                  </div>
                </div>

                {/* Quick time slot buttons */}
                {meet.date && (
                  <div className="contact__timegrid">
                    <span className="contact__timegrid-label">Quick select time:</span>
                    <div className="contact__timegrid-slots">
                      {timeSlots.map(t=>(
                        <button key={t} className={`contact__timeslot${meet.time===t?" contact__timeslot--active":""}`} onClick={()=>{setMeet(p=>({...p,time:t}));setMeetErrors(p=>({...p,time:""}));}}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="contact__field">
                  <label className="contact__label">Additional Notes <span style={{color:"#94a3b8",fontWeight:400,fontSize:".7rem",textTransform:"none"}}>(optional)</span></label>
                  <textarea className="contact__textarea" placeholder="Any specific questions before the call…" rows={3} value={meet.notes} onChange={e=>setMeet(p=>({...p,notes:e.target.value}))} />
                </div>

                {/* Guest notice */}
                <div className="contact__guest-notice">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  Invite will be sent to <strong>{meet.email||"your email"}</strong> and our team at <strong>{GUEST_EMAIL}</strong>
                </div>

                <button className="contact__submit contact__submit--meet" onClick={handleSchedule}>
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
  const GUEST_EMAIL = "ihnexperience@gmail.com";

  const [open, setOpen]               = React.useState(false);
  const [meetScheduled, setMeetScheduled] = React.useState(false);
  const [meetLink, setMeetLink]       = React.useState("");

  const [meet, setMeet] = React.useState({
    name: "", email: "", phone: "", date: "", time: "", topic: "", notes: "",
  });
  const [meetErrors, setMeetErrors] = React.useState({});

  const timeSlots = [
    "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
    "02:00 PM","03:00 PM","04:00 PM","05:00 PM",
  ];
  const topics = [
    "Visa Application Guidance",
    "Document Checklist Review",
    "Application Status Update",
    "Refund / Cancellation Help",
    "Emergency Visa Processing",
    "Other",
  ];
  const today = new Date().toISOString().split("T")[0];

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
      {/* ── Overlay ── */}
      {open && (
        <div className="smf__overlay" onClick={handleClose} />
      )}

      {/* ── Floating button ── */}
      <button
        className={`smf__fab${open ? " smf__fab--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Schedule a Meeting"
      >
        {open ? (
          /* Close X */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          /* Calendar icon */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        )}
        <span className="smf__fab-label">{open ? "Close" : "Schedule Meeting"}</span>
      </button>

      {/* ── Sliding card ── */}
      <div className={`smf__card${open ? " smf__card--open" : ""}`}>

        {/* Card header */}
        <div className="smf__card-header">
          <div className="smf__card-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
            </svg>
            Google Meet · 45 min · Free
          </div>
          <h3 className="smf__card-title">Schedule a Consultation</h3>
          <p className="smf__card-sub">Book a free slot with our visa expert.</p>
        </div>

        {/* Card body */}
        <div className="smf__card-body">
          {meetScheduled ? (
            /* ── Success ── */
            <div className="smf__success">
              <div className="smf__success-ring">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4 className="smf__success-title">Meeting Scheduled! 🎉</h4>
              <p className="smf__success-sub">
                Google Calendar opened in a new tab. Once confirmed, the Meet link is sent to <strong>{meet.email}</strong> and our team.
              </p>
              <a href={meetLink} target="_blank" rel="noopener noreferrer" className="smf__btn smf__btn--meet" style={{textDecoration:"none"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Open Google Calendar Again
              </a>
              <button className="smf__btn smf__btn--ghost" onClick={() => { setMeet({name:"",email:"",phone:"",date:"",time:"",topic:"",notes:""}); setMeetScheduled(false); setMeetErrors({}); }}>
                Schedule another
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <div className="smf__form">

              {/* Name */}
              <div className="smf__field">
                <label className="smf__label">Full Name *</label>
                <input className={`smf__input${meetErrors.name?" smf__input--err":""}`} placeholder="e.g. Priya Sharma" value={meet.name} onChange={e=>{setMeet(p=>({...p,name:e.target.value}));setMeetErrors(p=>({...p,name:""}));}} />
                {meetErrors.name && <span className="smf__err">{meetErrors.name}</span>}
              </div>

              {/* Email */}
              <div className="smf__field">
                <label className="smf__label">Email Address *</label>
                <input type="email" className={`smf__input${meetErrors.email?" smf__input--err":""}`} placeholder="you@example.com" value={meet.email} onChange={e=>{setMeet(p=>({...p,email:e.target.value}));setMeetErrors(p=>({...p,email:""}));}} />
                {meetErrors.email && <span className="smf__err">{meetErrors.email}</span>}
              </div>

              {/* Phone */}
              <div className="smf__field">
                <label className="smf__label">Phone Number *</label>
                <input className={`smf__input${meetErrors.phone?" smf__input--err":""}`} placeholder="+91 98765 43210" value={meet.phone} onChange={e=>{setMeet(p=>({...p,phone:e.target.value}));setMeetErrors(p=>({...p,phone:""}));}} />
                {meetErrors.phone && <span className="smf__err">{meetErrors.phone}</span>}
              </div>

              {/* Topic */}
              <div className="smf__field">
                <label className="smf__label">Meeting Topic *</label>
                <div className="smf__select-wrap">
                  <select className={`smf__input smf__select${meetErrors.topic?" smf__input--err":""}`} value={meet.topic} onChange={e=>{setMeet(p=>({...p,topic:e.target.value}));setMeetErrors(p=>({...p,topic:""}));}}>
                    <option value="">Select a topic…</option>
                    {topics.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className="smf__select-arrow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </div>
                {meetErrors.topic && <span className="smf__err">{meetErrors.topic}</span>}
              </div>

              {/* Date */}
              <div className="smf__field">
                <label className="smf__label">Preferred Date *</label>
                <input type="date" className={`smf__input${meetErrors.date?" smf__input--err":""}`} min={today} value={meet.date} onChange={e=>{setMeet(p=>({...p,date:e.target.value}));setMeetErrors(p=>({...p,date:""}));}} />
                {meetErrors.date && <span className="smf__err">{meetErrors.date}</span>}
              </div>

              {/* Time slot dropdown + quick grid */}
              <div className="smf__field">
                <label className="smf__label">Time Slot *</label>
                <div className="smf__select-wrap">
                  <select className={`smf__input smf__select${meetErrors.time?" smf__input--err":""}`} value={meet.time} onChange={e=>{setMeet(p=>({...p,time:e.target.value}));setMeetErrors(p=>({...p,time:""}));}}>
                    <option value="">Choose a slot…</option>
                    {timeSlots.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <span className="smf__select-arrow">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </span>
                </div>
                {meetErrors.time && <span className="smf__err">{meetErrors.time}</span>}
              </div>

              {/* Quick time buttons (shown after date picked) */}
              {meet.date && (
                <div className="smf__timegrid">
                  <span className="smf__timegrid-label">Quick select:</span>
                  <div className="smf__timegrid-slots">
                    {timeSlots.map(t => (
                      <button key={t} className={`smf__timeslot${meet.time===t?" smf__timeslot--active":""}`} onClick={()=>{setMeet(p=>({...p,time:t}));setMeetErrors(p=>({...p,time:""}));}}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="smf__field">
                <label className="smf__label">Notes <span className="smf__optional">(optional)</span></label>
                <textarea className="smf__input smf__textarea" placeholder="Any questions before the call…" rows={2} value={meet.notes} onChange={e=>setMeet(p=>({...p,notes:e.target.value}))} />
              </div>

              {/* Guest notice */}
              <div className="smf__guest-notice">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                Invite sent to <strong>{meet.email || "your email"}</strong> &amp; <strong>{GUEST_EMAIL}</strong>
              </div>

              <button className="smf__btn smf__btn--meet" onClick={handleSchedule}>
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
    <div className="app">
      <Hero search={search} setSearch={setSearch} />
      <CountryMarquee />
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