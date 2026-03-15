// RefundPolicy.jsx
import { useState, useMemo, useEffect, useCallback } from "react";
import "./Refund.css";
import {
  PRODUCT_TABS,
  POLICY_STAGES_BY_TAB,
  TESTIMONIALS,
} from "./Policy.js";

/* ─── Helpers ─────────────────────────────────────────── */
function StarRating({ count = 5, total = 5 }) {
  return (
    <div className="RefundStars">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`RefundStar${i >= count ? " RefundStar--empty" : ""}`}>★</span>
      ))}
    </div>
  );
}

function Badge({ type, label }) {
  return <span className={`RefundBadge RefundBadge--${type}`}>{label}</span>;
}

/* ─── Hero ────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="RefundHero">
      <div className="RefundContainer">
        
        <h1 className="RefundHero__title">
          Refund Clarity You <em>Can Count On</em>
        </h1>
      </div>
    </section>
  );
}

/* ─── Policy Table ────────────────────────────────────── */
function PolicyTable({ stages }) {
  return (
    <div className="RefundTableWrap">
      <table className="RefundTable">
        <thead className="RefundTable__head">
          <tr>
            <th className="RefundTable__th">Application Stage</th>
            <th className="RefundTable__th">Refund Eligibility</th>
            <th className="RefundTable__th">Reason</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((row) => (
            <tr key={row.id} className="RefundTable__tr">
              <td className="RefundTable__td">
                <div className="RefundTable__stage-name">
                  <span className="RefundTable__stage-icon">{row.icon}</span>
                  {row.stage}
                </div>
                <div className="RefundTable__stage-sub">{row.substage}</div>
              </td>
              <td className="RefundTable__td">
                <Badge type={row.refundType} label={row.refundStatus} />
              </td>
              <td className="RefundTable__td">
                <div className="RefundTable__reason-wrap">
                  <span className="RefundTable__reason-dot" />
                  {row.reason}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Policy Section ──────────────────────────────────── */
function PolicySection() {
  const [activeTab, setActiveTab] = useState("evisa");
  const stages = POLICY_STAGES_BY_TAB[activeTab] || [];

  return (
    <section className="RefundPolicy">
      <div className="RefundContainer">
        <div className="RefundPolicy__header">
          <div className="RefundPolicy__tabs">
            {PRODUCT_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`RefundPolicy__tab${activeTab === tab.id ? " RefundPolicy__tab--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                title={tab.description}
              >
                <span className="RefundPolicy__tab-dot" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <PolicyTable stages={stages} />
      </div>
    </section>
  );
}

/* ─── Review Card ─────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <div className="RefundReviewCard">
      <div className="RefundReviewCard__header">
        <div className="RefundAvatar">{review.initials}</div>
        <div className="RefundReviewCard__meta">
          <div className="RefundReviewCard__name">{review.name}</div>
          <div className="RefundReviewCard__info">
            <span>{review.date}</span>
            <span className="RefundReviewCard__info-dot" />
            <span>{review.location}</span>
          </div>
        </div>
      </div>
      <StarRating count={review.rating} />
      <span className="RefundReviewCard__tag">{review.tag}</span>
      <p className="RefundReviewCard__text">{review.review}</p>
      <div className="RefundReviewCard__quote-mark">"</div>
    </div>
  );
}

/* ─── Carousel (tablet 2x2 pages / mobile 1 card pages) ── */
function ReviewCarousel({ reviews }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setIsTablet(w >= 641 && w <= 1024);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => { setPageIndex(0); }, [reviews.length]);

  const perPage = isTablet ? 4 : 1;

  const pages = [];
  for (let i = 0; i < reviews.length; i += perPage) {
    pages.push(reviews.slice(i, i + perPage));
  }

  const maxPage = Math.max(0, pages.length - 1);
  const prev = useCallback(() => setPageIndex((p) => Math.max(0, p - 1)), []);
  const next = useCallback(() => setPageIndex((p) => Math.min(maxPage, p + 1)), [maxPage]);

  if (reviews.length === 0) {
    return (
      <div className="RefundCarousel">
        <div className="RefundReviews__empty">
          <div className="RefundReviews__empty-icon">🔍</div>
          No reviews match your search. Try a different keyword.
        </div>
      </div>
    );
  }

  return (
    <div className="RefundCarousel">
      <div className="RefundCarousel__track-wrap">
        <div
          className="RefundCarousel__track"
          style={{ transform: `translateX(${-pageIndex * 100}%)` }}
        >
          {pages.map((pageCards, pi) => (
            <div key={pi} className="RefundCarousel__slide">
              {isTablet ? (
                <div className="RefundCarousel__page-grid">
                  {pageCards.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              ) : (
                pageCards.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="RefundCarousel__controls">
        <button
          className="RefundCarousel__btn"
          onClick={prev}
          disabled={pageIndex === 0}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        <div className="RefundCarousel__dots">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`RefundCarousel__dot${pageIndex === i ? " RefundCarousel__dot--active" : ""}`}
              onClick={() => setPageIndex(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        <button
          className="RefundCarousel__btn"
          onClick={next}
          disabled={pageIndex >= maxPage}
          aria-label="Next page"
        >
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Star Picker ─────────────────────────────────────── */
function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="RefundWriteReview__star-picker">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`RefundWriteReview__star-btn${n <= (hover || value) ? " RefundWriteReview__star-btn--lit" : ""}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* ─── Write a Review Form ─────────────────────────────── */
function WriteReview({ onSubmit }) {
  const emptyForm = { name: "", location: "", tag: "", rating: 0, review: "" };
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  function handleSubmit() {
    if (!form.name.trim()) return setError("Please enter your name.");
    if (form.rating === 0) return setError("Please select a star rating.");
    if (form.review.trim().length < 20) return setError("Review must be at least 20 characters.");

    const initials = form.name
      .trim()
      .split(" ")
      .map((w) => w[0]?.toUpperCase() || "")
      .join("")
      .slice(0, 2);

    onSubmit({
      id: Date.now(),
      initials,
      name: form.name.trim(),
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      location: form.location.trim() || "India",
      rating: form.rating,
      tag: form.tag || "e-visa",
      review: form.review.trim(),
    });

    setForm(emptyForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div className="RefundWriteReview">
      <div className="RefundWriteReview__title">Share your experience</div>
      <div className="RefundWriteReview__desc">
        Had a refund experience with Atlys? Your feedback helps others and helps us improve.
      </div>

      <div className="RefundWriteReview__form">
        <div className="RefundWriteReview__field">
          <label className="RefundWriteReview__label">Your Name *</label>
          <input
            className="RefundWriteReview__input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Riya Sharma"
            maxLength={60}
          />
        </div>

        <div className="RefundWriteReview__field">
          <label className="RefundWriteReview__label">Location</label>
          <input
            className="RefundWriteReview__input"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Mumbai, India"
            maxLength={60}
          />
        </div>

        <div className="RefundWriteReview__field">
          <label className="RefundWriteReview__label">Visa Category</label>
          <select className="RefundWriteReview__select" name="tag" value={form.tag} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="e-visa">e-visa</option>
            <option value="United States">United States</option>
            <option value="Schengen">Schengen</option>
            <option value="Passport">Passport Collection</option>
          </select>
        </div>

        <div className="RefundWriteReview__field">
          <label className="RefundWriteReview__label">Rating *</label>
          <StarPicker
            value={form.rating}
            onChange={(v) => { setForm((p) => ({ ...p, rating: v })); setError(""); }}
          />
        </div>

        <div className="RefundWriteReview__field RefundWriteReview__field--full">
          <label className="RefundWriteReview__label">Your Review *</label>
          <textarea
            className="RefundWriteReview__textarea"
            name="review"
            value={form.review}
            onChange={handleChange}
            placeholder="Tell us about your refund experience with Atlys…"
            maxLength={600}
          />
        </div>

        <div className="RefundWriteReview__footer">
          <span className="RefundWriteReview__note">
            {error
              ? <span style={{ color: "var(--Refund-none-text)" }}>{error}</span>
              : `${form.review.length} / 600 characters`}
          </span>
          <button
            className="RefundWriteReview__submit"
            onClick={handleSubmit}
            disabled={!form.name || !form.review}
          >
            Post Review →
          </button>
        </div>
      </div>

      {submitted && (
        <div className="RefundToast">
          <span className="RefundToast__icon">✅</span>
          <span className="RefundToast__text">
            Thank you! Your review has been posted and is now visible.
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Reviews Section ─────────────────────────────────── */
function ReviewsSection() {
  const [reviews, setReviews] = useState(TESTIMONIALS);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return reviews;
    return reviews.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.review.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
    );
  }, [query, reviews]);

  function handleNewReview(review) {
    setReviews((prev) => [review, ...prev]);
  }

  return (
    <section className="RefundReviews">
      <div className="RefundContainer">

        {/* Write review — ABOVE the reviews list */}
        <WriteReview onSubmit={handleNewReview} />

        {/* Divider */}
        <div className="RefundReviews__divider" />

        {/* Header: title + search */}
        <div className="RefundReviews__top">
          <div>
            <h2 className="RefundReviews__heading">Our refund promise, proven in real stories</h2>
            <p className="RefundReviews__subheading">
              {reviews.length} verified customer experiences
            </p>
          </div>

          <div className="RefundReviews__search-wrap">
            <span className="RefundReviews__search-icon">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
            </span>
            <input
              className="RefundReviews__search"
              type="text"
              placeholder="Search by keyword…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop: scrollable 3-col grid */}
        <div className="RefundReviews__viewport">
          <div className="RefundReviews__grid">
            {filtered.length > 0 ? (
              filtered.map((r) => <ReviewCard key={r.id} review={r} />)
            ) : (
              <div className="RefundReviews__empty">
                <div className="RefundReviews__empty-icon">🔍</div>
                No reviews match <strong>"{query}"</strong>. Try a different keyword.
              </div>
            )}
          </div>
        </div>
        <div className="RefundReviews__fade" />

        {/* Tablet + Mobile: carousel */}
        <ReviewCarousel reviews={filtered} />

      </div>
    </section>
  );
}

/* ─── Root ────────────────────────────────────────────── */
export default function RefundPolicy() {
  return (
    <div className="RefundPage">
      <Hero />
      <PolicySection />
      <ReviewsSection />
    </div>
  );
}