import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

const socials = [
  { icon: <Facebook size={16} />, href: "#" },
  { icon: <Linkedin size={16} />, href: "#" },
  { icon: <Twitter size={16} />, href: "#" },
  { icon: <Youtube size={16} />, href: "#" },
];

/* ── Same plane icon as Navbar ── */
const IconPlane = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2 1.5 1.5 0 0010 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="ve-footer text-light">
      <div className="container">
        <div className="row g-4 mb-4">

          {/* ── Brand column ── */}
          <div className="col-lg-4">

            {/* Logo — identical structure to Navbar */}
            <Link to="/" className="ve-footer__logo">
              <span className="ve-footer__logo-plane">
                <IconPlane />
              </span>
              <div className="ve-footer__logo-words">
                <span className="ve-footer__logo-main">TheVisaCo</span>
                <span className="ve-footer__logo-sub">VISAS ON TIME</span>
              </div>
            </Link>

            <p className="ve-footer__about">
              A fresh, expert-led visa consultancy built on transparency, speed,
              and genuine care for every client. New company. Experienced team.
            </p>

            <div className="ve-footer__socials">
              {socials.map((s, i) => (
                <Link className="ve-social" key={i} to={s.href}>
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Services</h6>
            <ul className="ve-footer__list">
              {["Tourist Visa","Business Visa","Student Visa","Immigrant Visa","Family Visa","Medical Visa"].map(s => (
                <li key={s}><Link to="#services">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Company</h6>
            <ul className="ve-footer__list">
              {["About Us","Meet the Team","How It Works","Our Promise","Careers","Blog"].map(s => (
                <li key={s}><Link to="#">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* ── Support ── */}
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Support</h6>
            <ul className="ve-footer__list">
              {["FAQ","Contact Us","Track Application","Document Checklist","Privacy Policy","Terms of Service"].map(s => (
                <li key={s}><Link to="#">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
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

        {/* ── Bottom bar ── */}
        <div className="ve-footer__bottom">
          <span>© 2026 TheVisaCo. All rights reserved.</span>
          <span>Licensed Visa &amp; Immigration Consultancy</span>
        </div>
      </div>
    </footer>
  );
}