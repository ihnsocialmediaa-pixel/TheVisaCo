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



export default function Footer() {
  return (
    <footer className="ve-footer text-light">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4">
            <div className="ve-brand mb-3  " style={{textAlign:"center"}}>
              <span className="ve-brand__icon">✦</span>
              <span className="ve-brand__text">The<span>Visa</span></span>
            </div>
            <p className="ve-footer__about">
              A fresh, expert-led visa consultancy built on transparency, speed, and genuine care for every client. New company. Experienced team.
            </p>
            {/* Inside JSX, replace the socials block */}
            <div className="ve-footer__socials">
              {socials.map((s, i) => (
                <Link className="ve-social" key={i} to={s.href}>
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Services</h6>
            <ul className="ve-footer__list">
              {["Tourist Visa", "Business Visa", "Student Visa", "Immigrant Visa", "Family Visa", "Medical Visa"].map(s => (
                <li key={s}><Link to="#services">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Company</h6>
            <ul className="ve-footer__list">
              {["About Us", "Meet the Team", "How It Works", "Our Promise", "Careers", "Blog"].map(s => (
                <li key={s}><Link to="#">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6 className="ve-footer__heading">Support</h6>
            <ul className="ve-footer__list">
              {["FAQ", "Contact Us", "Track Application", "Document Checklist", "Privacy Policy", "Terms of Service"].map(s => (
                <li key={s}><Link to="#">{s}</Link></li>
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
          <span>© 2026 TheVisa. All rights reserved.</span>
          <span>Licensed Visa & Immigration Consultancy</span>
        </div>
      </div>
    </footer>
  );
}