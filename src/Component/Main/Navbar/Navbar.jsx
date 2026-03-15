import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

/* ── SVG Icons ─────────────────────────────────────────────────────────────── */
const IconWA = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.167 1.623 5.961L.057 23.714a.5.5 0 00.636.57l5.99-1.967A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.071-1.384l-.363-.217-3.755 1.232 1.151-3.645-.236-.374A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const IconProfile = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
  </svg>
);

const IconShare = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const IconPlane = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2 1.5 1.5 0 0010 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

const IconChevron = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

/* ── Feature sub-links ──────────────────────────────────────────────────────── */
const featureLinks = [
  {
    label: "Interview Prep",
    to: "/interview",
    desc: "Ace your visa interview",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    label: "Requirements",
    to: "/Requirements",
    desc: "Documents checklist",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    label: "Refund Policy",
    to: "/Refund",
    desc: "Our refund guidelines",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
      </svg>
    ),
  },
];

/* ── Main nav links (no Interview / Requirements / Refund here) ─────────────── */
const mainLinks = [
  { label: "Visa on Arrival",  to: "#" },
  { label: "Tourist Visa",     to: "#" },
  { label: "Business Visa",    to: "#" },
  { label: "Student Visa",     to: "#" },
  { label: "Travel Insurance", to: "#" },
];

/* ── Component ─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [featOpen,       setFeatOpen]       = useState(false);
  const [mobileFeatOpen, setMobileFeatOpen] = useState(false);
  const featRef = useRef(null);

  /* scroll listener */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* lock body scroll when mobile drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* close desktop dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (featRef.current && !featRef.current.contains(e.target)) {
        setFeatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      {/* ── NAV BAR ── */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : "nav--hero"}`}>
        <div className="nav__inner">

          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo__plane"><IconPlane /></span>
            <div className="logo__words">
              <span className="logo__main">TheVisaCo</span>
              <span className="logo__sub">VISAS ON TIME</span>
            </div>
          </Link>

          {/* Desktop links — visible only when scrolled */}
          <div className={`nav__links ${scrolled ? "nav__links--visible" : "nav__links--hidden"}`}>

            {mainLinks.map(l => (
              <Link to={l.to} className="nav__link" key={l.label}>{l.label}</Link>
            ))}

            {/* Features dropdown */}
            <div className="nav__feat" ref={featRef}>
              <button
                className={`nav__link nav__feat-btn${featOpen ? " nav__feat-btn--open" : ""}`}
                onClick={() => setFeatOpen(o => !o)}
                aria-haspopup="true"
                aria-expanded={featOpen}
              >
                Features
                <span className={`nav__feat-chevron${featOpen ? " nav__feat-chevron--up" : ""}`}>
                  <IconChevron />
                </span>
              </button>

              {featOpen && (
                <div className="nav__feat-menu" role="menu">
                  {featureLinks.map(f => (
                    <Link
                      key={f.label}
                      to={f.to}
                      className="nav__feat-item"
                      role="menuitem"
                      onClick={() => setFeatOpen(false)}
                    >
                      <span className="nav__feat-item-icon">{f.icon}</span>
                      <span className="nav__feat-item-body">
                        <span className="nav__feat-item-label">{f.label}</span>
                        <span className="nav__feat-item-desc">{f.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right icons */}
          <div className="nav__right">
            <Link to="#" className="nav__wa"      title="WhatsApp"><IconWA /></Link>
            <Link to="#" className="nav__profile" title="Profile / Login"><IconProfile /></Link>
            <Link to="#" className="nav__share"   title="Share"><IconShare /></Link>

            <button
              className="nav__hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-icon ${mobileOpen ? "is-open" : ""}`}>
                <span /><span /><span />
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* Overlay behind mobile drawer */}
      <div
        className={`mobile-overlay ${mobileOpen ? "is-open" : ""}`}
        onClick={closeMenu}
      />

      {/* ── MOBILE / TABLET DRAWER ── */}
      <div className={`mobile-menu ${mobileOpen ? "is-open" : ""}`}>

        {/* Header */}
        <div className="mobile-menu__header">
          <Link to="/" className="mobile-menu__logo" onClick={closeMenu}>
            <span className="mobile-menu__logo-plane"><IconPlane /></span>
            <span className="mobile-menu__logo-text">TheVisaCo</span>
          </Link>
          <button className="mobile-menu__close" onClick={closeMenu} aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="mobile-menu__links">

          {mainLinks.map(l => (
            <Link
              to={l.to}
              className="mobile-menu__link"
              key={l.label}
              onClick={closeMenu}
            >
              {l.label}
            </Link>
          ))}

          {/* Features accordion */}
          <div className="mobile-feat">
            <button
              className={`mobile-menu__link mobile-feat__toggle${mobileFeatOpen ? " mobile-feat__toggle--open" : ""}`}
              onClick={() => setMobileFeatOpen(o => !o)}
            >
              <span>Features</span>
              <span className={`mobile-feat__chevron${mobileFeatOpen ? " mobile-feat__chevron--up" : ""}`}>
                <IconChevron />
              </span>
            </button>

            <div
              className="mobile-feat__body"
              style={{
                maxHeight: mobileFeatOpen ? `${featureLinks.length * 76}px` : "0",
                opacity:   mobileFeatOpen ? 1 : 0,
                overflow:  "hidden",
                transition: "max-height .35s cubic-bezier(.4,0,.2,1), opacity .25s ease",
              }}
            >
              {featureLinks.map(f => (
                <Link
                  key={f.label}
                  to={f.to}
                  className="mobile-feat__item"
                  onClick={closeMenu}
                >
                  <span className="mobile-feat__item-icon">{f.icon}</span>
                  <span className="mobile-feat__item-body">
                    <span className="mobile-feat__item-label">{f.label}</span>
                    <span className="mobile-feat__item-desc">{f.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Footer icons */}
        <div className="mobile-menu__footer">
          <span className="mobile-menu__footer-label">Quick actions</span>
          <Link to="#" className="mobile-icon-btn" title="WhatsApp"       onClick={closeMenu}><IconWA /></Link>
          <Link to="#" className="mobile-icon-btn" title="Profile / Login" onClick={closeMenu}><IconProfile /></Link>
          <Link to="#" className="mobile-icon-btn" title="Share"           onClick={closeMenu}><IconShare /></Link>
        </div>

      </div>
    </>
  );
}