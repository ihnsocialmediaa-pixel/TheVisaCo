import { useState, useMemo, useRef, useEffect } from "react";
import {
  Globe, ArrowRight, Search, ChevronDown, FileText, Camera, CreditCard,
  Receipt, Plane, Building2, Shield, Mail, Briefcase, FileCheck, Baby,
  Heart, Users, FileEdit, MapPin, DollarSign, Fingerprint, Stethoscope,
  GraduationCap, Clock, CalendarDays, Banknote, ExternalLink, Lightbulb,
  TrendingUp, Star, CheckCircle2, AlertCircle, Zap, ChevronRight, Globe2
} from "lucide-react";
import {
  PASSPORT_COUNTRIES,
  DESTINATION_COUNTRIES,
  VISA_STATUS_LABELS,
  VISA_STATUS_COLORS,
  VISA_DATA,
  POPULAR_ROUTES,
  FALLBACK_REQUIRED_DOCS,
  DOCUMENT_LABELS,
  DOCUMENT_ICONS,
  UI_CONFIG,
  REGION_COLORS,
  HERO_STATS,
  getProcessingSpeed,
} from "./constants.js";
import "./visa.css";

// ── Icon Resolver ────────────────────────────────────────────
const ICON_MAP = {
  FileText, Camera, CreditCard, Receipt, Plane, Building2, Shield, Mail,
  Briefcase, FileCheck, Baby, Heart, Users, FileEdit, MapPin, DollarSign,
  Fingerprint, Stethoscope, GraduationCap,
};

function DocIcon({ iconName, size = 18 }) {
  const Comp = ICON_MAP[iconName] || FileText;
  return <Comp size={size} />;
}

// ── Dropdown Component ───────────────────────────────────────
function CountryDropdown({ label, sublabel, options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [options, query]);

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((c) => {
      if (!groups[c.region]) groups[c.region] = [];
      groups[c.region].push(c);
    });
    return groups;
  }, [filtered]);

  const selected = options.find((c) => c.code === value);

  return (
    <div className="visa-dropdown" ref={ref}>
      <div className="visa-dropdown__label">
        <Globe2 size={12} />
        {label}
      </div>
      <button
        className={`visa-dropdown__trigger${open ? " is-open" : ""}`}
        onClick={() => { setOpen((o) => !o); setQuery(""); }}
        type="button"
      >
        {selected ? (
          <>
            <span className="visa-dropdown__flag">{selected.flag}</span>
            <span className="visa-dropdown__selected-name">{selected.name}</span>
          </>
        ) : (
          <>
            <Globe size={18} style={{ color: "var(--clr-text-faint)", flexShrink: 0 }} />
            <span className="visa-dropdown__placeholder">{placeholder}</span>
          </>
        )}
        <ChevronDown size={16} className={`visa-dropdown__chevron${open ? " is-open" : ""}`} />
      </button>

      {open && (
        <div className="visa-dropdown__menu">
          <div className="visa-dropdown__search">
            <div className="visa-dropdown__search-wrap" style={{ position: "relative" }}>
              <Search size={14} className="visa-dropdown__search-icon" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--clr-text-faint)" }} />
              <input
                ref={inputRef}
                className="visa-dropdown__search-input"
                placeholder={`Search ${sublabel || "country"}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="visa-dropdown__list">
            {Object.entries(grouped).map(([region, countries]) => (
              <div key={region}>
                <div className="visa-dropdown__group-label">{region}</div>
                {countries.map((c) => (
                  <button
                    key={c.code}
                    className={`visa-dropdown__item${value === c.code ? " is-selected" : ""}`}
                    onClick={() => { onChange(c.code); setOpen(false); setQuery(""); }}
                    type="button"
                  >
                    <span className="visa-dropdown__item-flag">{c.flag}</span>
                    <span className="visa-dropdown__item-name">{c.name}</span>
                    <span className="visa-dropdown__item-region">{c.code}</span>
                  </button>
                ))}
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: "24px", textAlign: "center", color: "var(--clr-text-faint)", fontSize: 14 }}>
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }) {
  const colors = VISA_STATUS_COLORS[status] || VISA_STATUS_COLORS["visa_required"];
  const label = VISA_STATUS_LABELS[status] || "Unknown";

  return (
    <span
      className="visa-status-badge"
      style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
    >
      <span className="visa-status-badge__dot" style={{ background: colors.dot }} />
      {label}
    </span>
  );
}

// ── Meta Item ────────────────────────────────────────────────
function MetaItem({ icon: Icon, iconBg, label, value }) {
  return (
    <div className="visa-meta-item">
      <div className="visa-meta-item__icon" style={{ background: iconBg }}>
        <Icon size={16} style={{ color: "var(--clr-primary)" }} />
      </div>
      <div className="visa-meta-item__label">{label}</div>
      <div className="visa-meta-item__value">{value}</div>
    </div>
  );
}

// ── Document Item ────────────────────────────────────────────
function DocItem({ docKey, detail }) {
  const iconName = DOCUMENT_ICONS[docKey] || "FileText";
  const label = DOCUMENT_LABELS[docKey] || docKey;
  return (
    <div className="visa-doc-item">
      <div className="visa-doc-item__icon-wrap">
        <DocIcon iconName={iconName} size={18} />
      </div>
      <div className="visa-doc-item__body">
        <div className="visa-doc-item__name">{label}</div>
        <div className="visa-doc-item__detail">{detail}</div>
      </div>
      <div className="visa-doc-item__required">
        <div className="visa-doc-required-dot" />
      </div>
    </div>
  );
}

// ── Visa Results ─────────────────────────────────────────────
function VisaResults({ fromCode, toCode }) {
  const fromCountry = PASSPORT_COUNTRIES.find((c) => c.code === fromCode);
  const toCountry = DESTINATION_COUNTRIES.find((c) => c.code === toCode);
  const dataKey = `${fromCode}-${toCode}`;
  const data = VISA_DATA[dataKey];
  const speed = data ? getProcessingSpeed(data.processingTime) : null;

  if (!data) {
    return (
      <div className="visa-results">
        <div className="visa-no-data">
          <div className="visa-no-data__icon">🔍</div>
          <div className="visa-no-data__title">Route Data Coming Soon</div>
          <div className="visa-no-data__desc">{UI_CONFIG.noDataText}</div>
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, color: "var(--clr-text-muted)", marginBottom: 12, fontWeight: 600 }}>
              General documents typically required:
            </div>
            <div className="visa-doc-list">
              {FALLBACK_REQUIRED_DOCS.map((doc) => (
                <DocItem key={doc.key} docKey={doc.key} detail={doc.detail} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visa-results">
      {/* Overview Card */}
      <div className="visa-overview-card">
        <div className="visa-overview-header">
          <div className="visa-route-display">
            <div className="visa-route-country">
              <span className="visa-route-country__flag">{fromCountry?.flag}</span>
              <div className="visa-route-country__info">
                <div className="visa-route-country__label">From (Passport)</div>
                <div className="visa-route-country__name">{fromCountry?.name}</div>
              </div>
            </div>
            <div className="visa-route-arrow">
              <ArrowRight size={22} />
            </div>
            <div className="visa-route-country">
              <span className="visa-route-country__flag">{toCountry?.flag}</span>
              <div className="visa-route-country__info">
                <div className="visa-route-country__label">Destination</div>
                <div className="visa-route-country__name">{toCountry?.name}</div>
              </div>
            </div>
          </div>
          <StatusBadge status={data.status} />
        </div>

        <div className="visa-meta-grid">
          <MetaItem
            icon={Clock}
            iconBg="var(--clr-primary-light)"
            label="Processing Time"
            value={data.processingTime}
          />
          <MetaItem
            icon={CalendarDays}
            iconBg="#fef3c7"
            label="Stay Duration"
            value={data.stayDuration}
          />
          <MetaItem
            icon={CheckCircle2}
            iconBg="#d1fae5"
            label="Visa Validity"
            value={data.validity}
          />
          <MetaItem
            icon={Banknote}
            iconBg="#ede9fe"
            label="Visa Fee"
            value={data.fee}
          />
        </div>

        <div className="visa-flags-row">
          <span
            className={`visa-flag-chip ${data.biometricsRequired ? "visa-flag-chip--required" : "visa-flag-chip--not-required"}`}
          >
            <Fingerprint size={13} />
            Biometrics {data.biometricsRequired ? "Required" : "Not Required"}
          </span>
          <span
            className={`visa-flag-chip ${data.interviewRequired ? "visa-flag-chip--required" : "visa-flag-chip--not-required"}`}
          >
            <Users size={13} />
            Interview {data.interviewRequired ? "Required" : "Not Required"}
          </span>
          <span
            className="visa-flag-chip"
            style={{ background: speed?.bg, color: speed?.color, borderColor: speed?.color + "66" }}
          >
            <Zap size={13} />
            {speed?.label} Processing
          </span>
        </div>
      </div>

      {/* Documents Card */}
      <div className="visa-docs-card">
        <div className="visa-card-header">
          <div className="visa-card-header__icon-wrap">
            <FileText size={20} />
          </div>
          <div>
            <div className="visa-card-header__title">Required Documents</div>
            <div className="visa-card-header__subtitle">Prepare all documents before applying</div>
          </div>
          <div className="visa-card-header__count">{data.documents.length} docs</div>
        </div>
        <div className="visa-doc-list">
          {data.documents.map((doc) => (
            <DocItem key={doc.key} docKey={doc.key} detail={doc.detail} />
          ))}
        </div>
      </div>

      {/* Tips Card */}
      {data.tips && data.tips.length > 0 && (
        <div className="visa-tips-card">
          <div className="visa-card-header" style={{ marginBottom: 0 }}>
            <div className="visa-card-header__icon-wrap" style={{ background: "#e0f2fe", color: "#0284c7" }}>
              <Lightbulb size={20} />
            </div>
            <div>
              <div className="visa-card-header__title">Pro Tips</div>
              <div className="visa-card-header__subtitle">Improve your approval chances</div>
            </div>
          </div>
          <div className="visa-tips-list">
            {data.tips.map((tip, i) => (
              <div key={i} className="visa-tip-item">
                <span className="visa-tip-item__bullet">{i + 1}</span>
                <span className="visa-tip-item__text">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apply CTA */}
      {data.applyUrl && (
        <div className="visa-apply-card">
          <div className="visa-apply-card__content">
            <div className="visa-apply-card__title">Ready to Apply?</div>
            <div className="visa-apply-card__desc">
              Start your official {toCountry?.name} visa application now on the government portal.
            </div>
          </div>
          <a
            href={data.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="visa-apply-btn"
          >
            <Globe size={16} />
            Apply Now
            <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────
export default function Requirements() {
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");

  const handlePopularRoute = (route) => {
    setFromCode(route.from);
    setToCode(route.to);
  };

  const showResults = fromCode && toCode && fromCode !== toCode;

  return (
    <div className="visa-app">
      
      {/* Hero */}
      <section className="visa-hero">
        
        <h1 className="visa-hero__title">
          Know Your Visa<br />
          Requirements <em>Instantly</em>
        </h1>
        <p className="visa-hero__sub">
          Select your passport country and destination to get complete visa requirements, documents checklist, and pro tips.
        </p>
      
      </section>

      {/* Search Panel */}
      <div className="visa-search-panel">
        <div className="visa-search-card">
          <div className="visa-search-card__title">
            <Search size={20} />
            Check Visa Requirements
          </div>
          <div className="visa-search-row">
            <CountryDropdown
              label="Your Passport"
              sublabel="passport country"
              options={PASSPORT_COUNTRIES}
              value={fromCode}
              onChange={setFromCode}
              placeholder={UI_CONFIG.searchPlaceholderFrom}
            />
            <div className="visa-search-arrow">
              <ArrowRight />
            </div>
            <CountryDropdown
              label="Destination Country"
              sublabel="destination"
              options={DESTINATION_COUNTRIES}
              value={toCode}
              onChange={setToCode}
              placeholder={UI_CONFIG.searchPlaceholderTo}
            />
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="visa-popular">
        <div className="visa-popular__title">
          <TrendingUp size={12} />
          Popular Routes
        </div>
        <div className="visa-popular__list">
          {POPULAR_ROUTES.map((route) => {
            const from = PASSPORT_COUNTRIES.find((c) => c.code === route.from);
            const to = DESTINATION_COUNTRIES.find((c) => c.code === route.to);
            return (
              <button
                key={`${route.from}-${route.to}`}
                className="visa-popular__chip"
                onClick={() => handlePopularRoute(route)}
                type="button"
              >
                {from?.flag} → {to?.flag}
                <span>{route.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="visa-content">
        {showResults ? (
          <VisaResults fromCode={fromCode} toCode={toCode} />
        ) : (
          <div className="visa-empty">
            <div className="visa-empty__icon">🌍</div>
            <div className="visa-empty__title">Where are you headed?</div>
            <div className="visa-empty__desc">{UI_CONFIG.emptyStateText}</div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="visa-footer">
        <p className="visa-footer__text">
          VisaCheck provides general guidance only. Always verify requirements with the{" "}
          <a href="#" rel="noopener noreferrer">official embassy</a> before travel.
          Visa rules change frequently.
        </p>
      </footer>
    </div>
  );
}