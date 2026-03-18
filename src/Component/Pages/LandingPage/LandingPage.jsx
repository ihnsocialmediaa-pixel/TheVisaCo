import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import USA from "../../../assets/usa.png"
import UK from "../../../assets/uk.png"
import Canada from "../../../assets/canada.jpg"
import Australia from "../../../assets/australia.jpg"
import Germany from "../../../assets/germany.png"
import France from "../../../assets/france.png"
import UAE from "../../../assets/uae.jpg"
import Japan from "../../../assets/japan.png"
import Singapore from "../../../assets/singapore.png"
import India from "../../../assets/india.png"
import Italy from "../../../assets/italy.png"
import Spain from "../../../assets/spain.png"
import { Link } from "react-router-dom";


// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: "✈️",
    title: "Tourist Visa",
    desc: "Explore the world with our hassle-free tourist visa processing for 180+ countries.",
    tag: "Most Popular",
  },
  {
    icon: "💼",
    title: "Business Visa",
    desc: "Accelerate your business expansion with fast-tracked business visa solutions.",
    tag: "",
  },
  {
    icon: "🎓",
    title: "Student Visa",
    desc: "Pursue your academic dreams abroad with our comprehensive student visa support.",
    tag: "",
  },
  {
    icon: "🏠",
    title: "Immigrant Visa",
    desc: "Begin your new life with expert permanent residency and immigration assistance.",
    tag: "Premium",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Visa",
    desc: "Reunite with your loved ones through our family sponsorship visa services.",
    tag: "",
  },
  {
    icon: "🩺",
    title: "Medical Visa",
    desc: "Access world-class healthcare abroad with dedicated medical visa assistance.",
    tag: "",
  },
];

const stats = [
  { number: "180+", label: "Countries Covered" },
  { number: "98%", label: "Approval Rate" },
  { number: "24/7", label: "Expert Support" },
  { number: "100%", label: "Transparent Process" },
];

const steps = [
  {
    step: "01",
    title: "Submit Documents",
    desc: "Upload your documents securely through our encrypted online portal in minutes.",
  },
  {
    step: "02",
    title: "Expert Review",
    desc: "Our certified consultants personally review and prepare your complete application.",
  },
  {
    step: "03",
    title: "Application Filing",
    desc: "We submit your application to the embassy with precision and full accuracy.",
  },
  {
    step: "04",
    title: "Visa Approved",
    desc: "Receive your visa and our post-approval travel guidance and support.",
  },
];

const countries = [
  { name: "USA", img: USA },
  { name: "UK", img: UK },
  { name: "Canada", img: Canada },
  { name: "Australia", img: Australia },
  { name: "Germany", img: Germany },
  { name: "France", img: France },
  { name: "UAE", img: UAE },
  { name: "Japan", img: Japan },
  { name: "Singapore", img: Singapore },
  { name: "India", img: India },
  { name: "Italy", img: Italy },
  { name: "Spain", img: Spain },
];

const faqs = [
  {
    q: "How long does visa processing take?",
    a: "Processing times vary by visa type and destination. Tourist visas typically take 5–10 business days, while immigration visas may take 2–6 months. We always provide an accurate timeline upfront.",
  },
  {
    q: "What documents are generally required?",
    a: "Requirements vary by visa type, but generally include a valid passport, photographs, application form, financial statements, travel itinerary, and supporting documents specific to your visa category.",
  },
  {
    q: "Do you offer refunds if the visa is rejected?",
    a: "Yes. If your visa is rejected despite our complete processing, we offer a partial refund of our service fee. Embassy fees, however, are non-refundable as per embassy policy.",
  },
  {
    q: "Can you handle urgent or express visa applications?",
    a: "Absolutely. We offer an express service for urgent applications. Depending on the destination, we can expedite processing within 24–72 hours at an additional service charge.",
  },
  {
    q: "Is my personal data safe with you?",
    a: "Yes. We use bank-grade encryption and strict data privacy protocols. Your documents and personal information are never shared with third parties without your explicit consent.",
  },
];

const team = [
  {
    name: "Ravi Mehta",
    role: "Founder & Lead Consultant",
    exp: "12 Years in Immigration Law",
    icon: "👨‍💼",
    bio: "Former embassy officer with deep expertise in US, UK & Schengen visa systems.",
  },
  {
    name: "Priya Nair",
    role: "Co-Founder & Operations Head",
    exp: "8 Years Visa Processing",
    icon: "👩‍💼",
    bio: "Specialist in student and immigrant visa pathways across 40+ countries.",
  },
  {
    name: "Arjun Das",
    role: "Senior Visa Consultant",
    exp: "10 Years Consultancy",
    icon: "🧑‍💼",
    bio: "Expert in business visas, corporate immigration, and work permit applications.",
  },
];

const promises = [
  {
    icon: "🎯",
    title: "Precision-First Approach",
    desc: "Every application is reviewed 3 times before submission to eliminate errors that cause rejections.",
  },
  {
    icon: "🔍",
    title: "Full Transparency",
    desc: "No hidden fees, no vague timelines. You see exactly what we're doing and why — every step.",
  },
  {
    icon: "🤝",
    title: "Personal Consultant",
    desc: "You're never passed around. One dedicated consultant manages your entire application journey.",
  },
  {
    icon: "⚡",
    title: "Fast & Reliable",
    desc: "We work with urgency. Standard processing in 5 days, express options available in 24 hours.",
  },
];

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ve-navbar ${scrolled ? "ve-navbar--scrolled" : ""}`}>
      <div className="container">
        <a className="navbar-brand ve-brand" href="#">
          <span className="ve-brand__icon">✦</span>
          <span className="ve-brand__text">The<span>Visa</span></span>
        </a>
        <button
          className="navbar-toggler ve-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span><span></span><span></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {["Home", "Services", "About", "Countries", "Contact"].map((item) => (
              <li className="nav-item" key={item}>
                <a
                  className="nav-link ve-nav-link"
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-3">
              <a href="#contact" className=" ve-btn-primary" onClick={() => setMenuOpen(false)}>
                Free Consultation
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="ve-hero" id="home">
      <div className="ve-hero__bg">
        <div className="ve-hero__orb ve-hero__orb--1"></div>
        <div className="ve-hero__orb ve-hero__orb--2"></div>
        <div className="ve-hero__grid"></div>
      </div>
      <div className="container ve-hero__container">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-7 ve-hero__left">
            <div className="ve-hero__badge">
              <span className="ve-badge">🚀 New Visa Consultancy — Built Different</span>
            </div>
            <h1 className="ve-hero__title">
              Your Passport to<br />
              <span className="ve-hero__title--accent">Global Freedom</span>
            </h1>
            <p className="ve-hero__subtitle text-center taxt-lg-start">
              A fresh approach to visa consulting — transparent pricing, dedicated experts, and a relentless focus on getting your visa approved. We're new, but our team isn't.
            </p>
            <div className="ve-hero__cta d-flex flex-wrap gap-3">
              <a href="#services" className=" ve-btn-primary ve-btn-lg">
                Explore Services <span>→</span>
              </a>
              <a href="#contact" className=" ve-btn-outline ve-btn-lg">
                Talk to an Expert
              </a>
            </div>
            <div className="ve-hero__stats row g-3 mt-4">
              {stats.map((s) => (
                <div className="col-6 col-sm-3" key={s.label}>
                  <div className="ve-stat-card">
                    <div className="ve-stat-card__num">{s.number}</div>
                    <div className="ve-stat-card__label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5 d-none d-lg-flex justify-content-center">
            <div className="ve-hero__visual">
              <div className="ve-passport">
                <div className="ve-passport__cover">
                  <div className="ve-passport__emblem">✦</div>
                  <div className="ve-passport__text">PASSPORT</div>
                  <div className="ve-passport__sub">THEVISA APPROVED</div>
                </div>
                <div className="ve-passport__stamps">
                  {["🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇩🇪", "🇫🇷"].map((f, i) => (
                    <div className="ve-stamp" key={i} style={{ animationDelay: `${i * 0.15}s` }}>
                      <span>{f}</span>
                      <div className="ve-stamp__label">APPROVED</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ve-hero__float ve-hero__float--1">✈ 24hr Support</div>
              <div className="ve-hero__float ve-hero__float--2">✔ Expert Team</div>
            </div>
          </div>
        </div>
      </div>
      <div className="ve-hero__scroll">
        <div className="ve-scroll-indicator"><span></span></div>
      </div>
    </section>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────

function CountryMarquee() {
  return (
    <section className="ve-marquee-section">
      <div className="ve-marquee-track">
        <div className="ve-marquee-inner">
          {[...countries, ...countries].map((c, i) => (
            <div className="ve-marquee-item" key={i}>
              <span className="ve-marquee-flag">{c.flag}</span>
              <span className="ve-marquee-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section className="ve-section ve-services" id="services">
      <div className="container">
        <div className="ve-section__header text-center mb-5">
          <span className="ve-section__tag">What We Offer</span>
          <h2 className="ve-section__title">Comprehensive Visa <span>Services</span></h2>
          <p className="ve-section__sub">Tailored visa solutions for every traveler, student, professional, and family — handled with care from day one.</p>
        </div>
        <div className="row g-4">
          {services.map((s, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="ve-service-card">
                {s.tag && <div className="ve-service-card__tag">{s.tag}</div>}
                <div className="ve-service-card__icon">{s.icon}</div>
                <h4 className="ve-service-card__title">{s.title}</h4>
                <p className="ve-service-card__desc">{s.desc}</p>
                <a href="#contact" className="ve-service-card__link">Apply Now <span>→</span></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <section className="ve-section ve-how" id="about">
      <div className="ve-how__bg"></div>
      <div className="container position-relative">
        <div className="ve-section__header text-center mb-5">
          <span className="ve-section__tag ve-section__tag--light">Simple Process</span>
          <h2 className="ve-section__title ve-section__title--light">How It <span>Works</span></h2>
          <p className="ve-section__sub ve-section__sub--light">Four streamlined steps from application to approval — no confusion, no surprises.</p>
        </div>
        <div className="row g-4 justify-content-center">
          {steps.map((s, i) => (
            <div className="col-sm-6 col-lg-3" key={i}>
              <div className="ve-step-card">
                <div className="ve-step-card__num">{s.step}</div>
                <h5 className="ve-step-card__title">{s.title}</h5>
                <p className="ve-step-card__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── OUR PROMISE (replaces fake reviews) ─────────────────────────────────────

function OurPromise() {
  return (
    <section className="ve-section ve-promise">
      <div className="container">
        <div className="ve-section__header text-center mb-5">
          <span className="ve-section__tag">Our Commitment</span>
          <h2 className="ve-section__title">The TheVisa <span>Promise</span></h2>
          <p className="ve-section__sub">We're just getting started — but these are the principles we're building every client relationship on.</p>
        </div>
        <div className="row g-4">
          {promises.map((p, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="ve-promise-card">
                <div className="ve-promise-card__icon">{p.icon}</div>
                <h5 className="ve-promise-card__title">{p.title}</h5>
                <p className="ve-promise-card__desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MEET THE TEAM ─────────────────────────────────────────────────────────────

function Team() {
  return (
    <section className="ve-section ve-team">
      <div className="ve-team__bg"></div>
      <div className="container position-relative">
        <div className="ve-section__header text-center mb-5">
          <span className="ve-section__tag ve-section__tag--light">The People Behind It</span>
          <h2 className="ve-section__title ve-section__title--light">Meet Our <span>Expert Team</span></h2>
          <p className="ve-section__sub ve-section__sub--light">No reviews yet — but our team's credentials speak for themselves. Decades of combined experience, now in one place.</p>
        </div>
        <div className="row g-4 justify-content-center">
          {team.map((member, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="ve-team-card">
                <div className="ve-team-card__avatar">{member.icon}</div>
                <div className="ve-team-card__exp">{member.exp}</div>
                <h5 className="ve-team-card__name">{member.name}</h5>
                <div className="ve-team-card__role">{member.role}</div>
                <p className="ve-team-card__bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────

function WhyUs() {
  const features = [
    { icon: "⚡", title: "Lightning Fast Processing", desc: "Express processing available in as little as 24 hours for urgent applications." },
    { icon: "🔒", title: "100% Secure & Confidential", desc: "Bank-grade encryption and strict privacy protocols for all your documents." },
    { icon: "🧑‍💼", title: "Certified Consultants", desc: "All our visa consultants are government-certified with 8–12 years of real experience." },
    { icon: "📞", title: "24/7 Dedicated Support", desc: "Round-the-clock assistance via chat, call, or email — we are always available." },
    { icon: "🌐", title: "180+ Countries Covered", desc: "Comprehensive visa services for virtually every destination around the globe." },
    { icon: "💯", title: "Money-Back Guarantee", desc: "Partial refund on service fees for any rejection despite our complete processing." },
  ];

  return (
    <section className="ve-section ve-why">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <div className="ve-why__left">
              <span className="ve-section__tag">Why TheVisa</span>
              <h2 className="ve-section__title mt-2">Built on <br /><span>Expert Foundations</span></h2>
              <p className="ve-section__sub">We may be a new company — but our consultants have been navigating visa systems for over a decade. We built TheVisa to do it better.</p>
              <div className="ve-why__startup-note">
                <div className="ve-why__startup-icon">🚀</div>
                <div className="ve-why__startup-text">
                  <strong>Startup Advantage</strong> — No bureaucracy, no outsourcing. Every application is personally handled by a senior consultant, not a junior clerk.
                </div>
              </div>
              <a href="#contact" className=" ve-btn-primary mt-4">Start Your Application →</a>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="row g-3">
              {features.map((f, i) => (
                <div className="col-sm-6" key={i}>
                  <div className="ve-feature-card">
                    <div className="ve-feature-card__icon">{f.icon}</div>
                    <div>
                      <h6 className="ve-feature-card__title">{f.title}</h6>
                      <p className="ve-feature-card__desc">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COUNTRIES ────────────────────────────────────────────────────────────────

function Countries() {
  return (
    <section className="ve-section ve-countries" id="countries">
      <div className="ve-countries__bg"></div>
      <div className="container position-relative">
        <div className="ve-section__header text-center mb-5">
          <span className="ve-section__tag ve-section__tag--light">We Cover</span>
          <h2 className="ve-section__title ve-section__title--light">Top Visa <span>Destinations</span></h2>
          <p className="ve-section__sub ve-section__sub--light">From world-class cities to serene destinations — we process visas for 180+ countries worldwide.</p>
        </div>
        <div className="row g-3 justify-content-center">
{countries.map((c, i) => (
  <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={i}>
    
    <div
      className="ve-country-card"
      style={{ "--flag": `url(${c.img})` }}
    >
      
      <div className="ve-country-overlay"></div>

      <span className="ve-country-card__name">
        {c.name}
      </span>

    </div>

  </div>
))}
        </div>
        <div className="text-center mt-5">
          <p className="ve-countries__more">+ 168 more countries available</p>
          <a href="#contact" className=" ve-btn-amber mt-2">Check Eligibility Free →</a>
        </div>
      </div>
    </section>
  );
}

// ─── BE OUR FIRST CLIENT (replaces testimonials for startup) ──────────────────

function BeFirst() {
  return (
    <section className="ve-section ve-befirst">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="ve-section__tag">Early Access</span>
            <h2 className="ve-section__title mt-2">Be Among Our <span>First Clients</span></h2>
            <p className="ve-section__sub" style={{ margin: 0 }}>
              We're launching fresh and looking for our founding clients. Get priority attention, personal consultant access, and an exclusive founding-client discount on your first visa application.
            </p>
            <div className="ve-befirst__perks mt-4">
              {[
                { icon: "🎁", text: "Exclusive 20% discount for first 50 clients" },
                { icon: "👤", text: "Direct access to senior consultants" },
                { icon: "📋", text: "Free document checklist & review" },
                { icon: "⭐", text: "Shape our service with your feedback" },
              ].map((perk, i) => (
                <div className="ve-befirst__perk" key={i}>
                  <span className="ve-befirst__perk-icon">{perk.icon}</span>
                  <span className="ve-befirst__perk-text">{perk.text}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="ve-btn-primary ve-btn-lg mt-4">
              Claim Your Spot →
            </a>
          </div>
          <div className="col-lg-6">
            <div className="ve-befirst__visual">
              <div className="ve-befirst__card">
                <div className="ve-befirst__card-badge">🚀 Founding Client Offer</div>
                <h3 className="ve-befirst__card-title">Limited Spots Available</h3>
                <div className="ve-befirst__slots">
                  <div className="ve-befirst__slot-bar">
                    <div className="ve-befirst__slot-fill" style={{ width: "34%" }}></div>
                  </div>
                  <div className="ve-befirst__slot-text">17 of 50 spots claimed</div>
                </div>
                <div className="ve-befirst__card-perks">
                  <div className="ve-befirst__card-perk">✓ Personal Senior Consultant</div>
                  <div className="ve-befirst__card-perk">✓ Priority Processing</div>
                  <div className="ve-befirst__card-perk">✓ 20% Founding Discount</div>
                  <div className="ve-befirst__card-perk">✓ Free Follow-up Support</div>
                </div>
                <a href="#contact" className="ve-btn-primary w-100 mt-3">
                  Reserve My Spot
                </a>
                <p className="ve-befirst__card-note">No payment needed to reserve. Just a quick consultation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="ve-section ve-faq">
      <div className="ve-faq__bg"></div>
      <div className="container position-relative">
        <div className="row align-items-start g-5">
          <div className="col-lg-4">
            <span className="ve-section__tag ve-section__tag--light">Got Questions?</span>
            <h2 className="ve-section__title ve-section__title--light mt-2">Frequently Asked <span>Questions</span></h2>
            <p className="ve-section__sub ve-section__sub--light">Can't find your answer? Our experts are available 24/7 and happy to help.</p>
            <a href="#contact" className=" ve-btn-amber mt-3">Ask an Expert →</a>
          </div>
          <div className="col-lg-8">
            {faqs.map((faq, i) => (
              <div
                className="ve-faq-item"
                key={i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="ve-faq-item__q">
                  <span>{faq.q}</span>
                  <span className={`ve-faq-item__icon ${open === i ? "ve-faq-item__icon--open" : ""}`}>＋</span>
                </div>
                {open === i && <div className="ve-faq-item__a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", visa: "", country: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycby-VHMZt3MQeda07pd4HDJP0624FWc2DlAl6eoTF2lbDm5V_xED23Nka3LgoAF8ZvyZ/exec",
      {
        method: "POST",
        mode: "no-cors",   // ⭐ IMPORTANT
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    setSubmitted(true);

    setForm({
      name: "",
      email: "",
      visa: "",
      country: "",
      message: ""
    });

  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="ve-section ve-contact" id="contact">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <span className="ve-section__tag">Get Started</span>
            <h2 className="ve-section__title mt-2">Free Visa <span>Consultation</span></h2>
            <p className="ve-section__sub">
              Tell us your visa needs — a senior consultant will personally reach out within 2 hours with a tailored plan.
            </p>
            <div className="ve-contact__info mt-4" style={{justifyContent:"center"}}>
              {[
                { icon: "📧", label: "Email", val: "experience@indianhospitalitynetwork.com" },
                { icon: "📞", label: "Phone", val: "+91 98100 44015" },
                { icon: "📍", label: "Office", val: "Punjabi Bagh West, Delhi" },
                { icon: "⏰", label: "Hours", val: "24 / 7 — Always Available" },
              ].map((info, i) => (
                <div className="ve-contact__info-item" key={i}>
                  <span className="ve-contact__info-icon">{info.icon}</span>
                  <div>
                    <div className="ve-contact__info-label">{info.label}</div>
                    <div className="ve-contact__info-val">{info.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-7">
            <div className="ve-contact__form-wrap">
              {submitted ? (
                <div className="ve-contact__success">
                  <div className="ve-contact__success-icon">✓</div>
                  <h4>You're on the list!</h4>
                  <p>A senior consultant will personally reach out to you within 2 hours with your free consultation plan.</p>
                  <button className=" ve-btn-primary mt-3" onClick={() => setSubmitted(false)}>
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="ve-label">Full Name *</label>
                      <input className="ve-input" type="text" placeholder="John Smith" required
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="col-sm-6">
                      <label className="ve-label">Email Address *</label>
                      <input className="ve-input" type="email" placeholder="john@example.com" required
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="col-sm-6">
                      <label className="ve-label">Visa Type *</label>
                      <select className="ve-input" required value={form.visa}
                        onChange={e => setForm({ ...form, visa: e.target.value })}>
                        <option value="">Select visa type</option>
                        <option>Tourist Visa</option>
                        <option>Business Visa</option>
                        <option>Student Visa</option>
                        <option>Immigrant Visa</option>
                        <option>Family Visa</option>
                        <option>Medical Visa</option>
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label className="ve-label">Destination Country *</label>
                      <input className="ve-input" type="text" placeholder="e.g. United States" required
                        value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <label className="ve-label">Message</label>
                      <textarea className="ve-input ve-textarea"
                        placeholder="Tell us about your travel plans or any specific concerns..."
                        rows={4} value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <div className="col-12">
                      <button type="submit" className=" ve-btn-primary w-100 ve-btn-lg">
                        Get My Free Consultation →
                      </button>
                      <p className="ve-form-note">✓ No payment required &nbsp;·&nbsp; ✓ Response within 2 hours &nbsp;·&nbsp; ✓ Zero obligation</p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section className="ve-cta-banner">
      <div className="ve-cta-banner__bg"></div>
      <div className="container position-relative text-center">
        <div className="ve-cta-banner__startup-tag">🚀 New · Focused · Expert</div>
        <h2 className="ve-cta-banner__title">Start Your Visa Journey<br /><span>With People Who Care</span></h2>
        <p className="ve-cta-banner__sub">We're building TheVisa one successful visa at a time. Be part of our story — and let us be part of yours.</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
          <a href="#contact" className=" ve-btn-white ve-btn-lg">Apply Now — It's Free →</a>
          <a href="tel:+91 98100 44015" className="ve-btn-outline-white ve-btn-lg">📞 Call Us Now</a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="ve-footer">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4">
            <div className="ve-brand mb-3">
              <span className="ve-brand__icon">✦</span>
              <span className="ve-brand__text">The<span>Visa</span></span>
            </div>
            <p className="ve-footer__about">
              A fresh, expert-led visa consultancy built on transparency, speed, and genuine care for every client. New company. Experienced team.
            </p>
            <div className="ve-footer__socials">
              {["f", "in", "tw", "yt"].map((s, i) => (
                <a className="ve-social" key={i} href="#">{s}</a>
              ))}
            </div>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Services</h6>
            <ul className="ve-footer__list">
              {["Tourist Visa", "Business Visa", "Student Visa", "Immigrant Visa", "Family Visa", "Medical Visa"].map(s => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Company</h6>
            <ul className="ve-footer__list">
              {["About Us", "Meet the Team", "How It Works", "Our Promise", "Careers", "Blog"].map(s => (
                <li key={s}><a href="#">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Support</h6>
            <ul className="ve-footer__list">
              {["FAQ", "Contact Us", "Track Application", "Document Checklist", "Privacy Policy", "Terms of Service"].map(s => (
                <li key={s}><a href="#">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Contact</h6>
            <ul className="ve-footer__list ve-footer__list--contact">
              <li>📧 support@thevisa.com</li>
              <li>📞 +91 98100 44015</li>
              <li>📍 Punjabi Bagh West, Delhi</li>
              <li>⏰ Available 24/7</li>
            </ul>
          </div>
        </div>
        <div className="ve-footer__bottom">
          <span>© 2025 TheVisa. All rights reserved.</span>
          <span>Licensed Visa & Immigration Consultancy</span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="ve-app">
      <Navbar />
      <Hero />
      <CountryMarquee />
      <Services />
      <HowItWorks />
      <OurPromise />
      <WhyUs />
      <Team />
      <Countries />
      <BeFirst />
      <FAQ />
      <Contact />
      <CTABanner />
      <Footer />
    </div>
  );
}