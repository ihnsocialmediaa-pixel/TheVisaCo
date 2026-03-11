import React, { useState, useEffect} from "react";
import "./ApplicationForm.css";

// ── Country codes ────────────────────────────────────────────────────────────
const COUNTRIES = [
  "International","Afghanistan","Åland Islands","Albania","Algeria","American Samoa",
  "Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba",
  "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados",
  "Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina",
  "Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon",
  "Canada","Cape Verde","Chile","China","Colombia","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Ecuador","Egypt","El Salvador","Estonia",
  "Ethiopia","Fiji","Finland","France","Georgia","Germany","Ghana","Greece","Guatemala",
  "Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Libya","Lithuania","Luxembourg","Malaysia","Maldives",
  "Malta","Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco","Myanmar",
  "Nepal","Netherlands","New Zealand","Nicaragua","Nigeria","Norway","Oman","Pakistan",
  "Palestine","Panama","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia",
  "Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden",
  "Switzerland","Syria","Taiwan","Tanzania","Thailand","Tunisia","Turkey","Uganda",
  "Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay",
  "Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

// ── Steps config ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, icon: "⚔️",  label: "Identity",    xp: 20  },
  { id: 2, icon: "🛡️",  label: "Passport",    xp: 40  },
  { id: 3, icon: "✈️",  label: "Flight",      xp: 65  },
  { id: 4, icon: "🏨",  label: "Hotel",       xp: 85  },
  { id: 5, icon: "🏆",  label: "Complete",    xp: 100 },
];

// ── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="af-particles" aria-hidden>
      {[...Array(20)].map((_, i) => (
        <span key={i} className={`af-particle af-particle--${(i % 5) + 1}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── XP Bar ───────────────────────────────────────────────────────────────────
function XPBar({ xp }) {
  return (
    <div className="af-xpbar">
      <div className="af-xpbar__track">
        <div className="af-xpbar__fill" style={{ width: `${xp}%` }}>
          <div className="af-xpbar__glow" />
        </div>
      </div>
      <span className="af-xpbar__label">{xp} XP</span>
    </div>
  );
}

// ── Step Nav ─────────────────────────────────────────────────────────────────
function StepNav({ current, completed }) {
  return (
    <div className="af-stepnav">
      {STEPS.map((s, i) => {
        const done = completed.includes(s.id);
        const active = current === s.id;
        return (
          <div key={s.id} className={`af-stepnav__item ${active ? "active" : ""} ${done ? "done" : ""}`}>
            <div className="af-stepnav__orb">
              {done ? "✓" : s.icon}
            </div>
            <span className="af-stepnav__label">{s.label}</span>
            {i < STEPS.length - 1 && <div className={`af-stepnav__line ${done ? "done" : ""}`} />}
          </div>
        );
      })}
    </div>
  );
}

// ── Field ────────────────────────────────────────────────────────────────────
function Field({ label, required, error, children, hint }) {
  return (
    <div className={`af-field ${error ? "af-field--error" : ""}`}>
      <label className="af-field__label">
        {label} {required && <span className="af-field__req">*</span>}
      </label>
      {children}
      {error && <div className="af-field__error">⚠ {error}</div>}
      {hint && !error && <div className="af-field__hint">{hint}</div>}
    </div>
  );
}

function Input({ ...props }) {
  return <input className="af-input" {...props} />;
}

function Select({ children, ...props }) {
  return (
    <div className="af-select-wrap">
      <select className="af-select" {...props}>{children}</select>
      <span className="af-select-arrow">▾</span>
    </div>
  );
}

// ── Step 1: Identity ──────────────────────────────────────────────────────────
function Step1({ data, setData, errors }) {
  return (
    <div className="af-step-body">
      <div className="af-step-header">
        <div className="af-step-icon">⚔️</div>
        <div>
          <h2 className="af-step-title">Identity Verification</h2>
          <p className="af-step-sub">Who is embarking on this quest?</p>
        </div>
      </div>

      <div className="af-grid-2">
        <Field label="First Name" required error={errors.firstName}>
          <Input placeholder="e.g. Arjun" value={data.firstName}
            onChange={e => setData({ ...data, firstName: e.target.value })} />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <Input placeholder="e.g. Sharma" value={data.lastName}
            onChange={e => setData({ ...data, lastName: e.target.value })} />
        </Field>
      </div>

      <div className="af-grid-2">
        <Field label="Date of Birth" required error={errors.dob}>
          <Input type="date" value={data.dob}
            onChange={e => setData({ ...data, dob: e.target.value })} />
        </Field>
        <Field label="Gender" required error={errors.gender}>
          <Select value={data.gender}
            onChange={e => setData({ ...data, gender: e.target.value })}>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
        </Field>
      </div>

      <Field label="Marital Status" required error={errors.marital}>
        <Select value={data.marital}
          onChange={e => setData({ ...data, marital: e.target.value })}>
          <option value="">Select marital status</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
        </Select>
      </Field>

      <Field label="Occupation" required error={errors.occupation}>
        <Input placeholder="e.g. Software Engineer" value={data.occupation}
          onChange={e => setData({ ...data, occupation: e.target.value })} />
      </Field>
    </div>
  );
}

// ── Step 2: Passport ──────────────────────────────────────────────────────────
function Step2({ data, setData, errors }) {
  return (
    <div className="af-step-body">
      <div className="af-step-header">
        <div className="af-step-icon">🛡️</div>
        <div>
          <h2 className="af-step-title">Travel Documents</h2>
          <p className="af-step-sub">Your shield for the journey ahead</p>
        </div>
      </div>

      <Field label="Passport Number" required error={errors.passport}>
        <Input placeholder="e.g. A1234567" value={data.passport}
          onChange={e => setData({ ...data, passport: e.target.value.toUpperCase() })} />
      </Field>

      <div className="af-grid-2">
        <Field label="Passport Valid Till" required error={errors.passportExpiry}>
          <Input type="date" value={data.passportExpiry}
            onChange={e => setData({ ...data, passportExpiry: e.target.value })} />
        </Field>
        <Field label="Place of Issue" required error={errors.passportIssue}>
          <Input placeholder="e.g. Mumbai" value={data.passportIssue}
            onChange={e => setData({ ...data, passportIssue: e.target.value })} />
        </Field>
      </div>

      <Field label="Email Address" required error={errors.email}>
        <Input type="email" placeholder="e.g. arjun@email.com" value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })} />
      </Field>

      <Field label="Phone Number" hint="Required for real-time visa updates">
        <div className="af-phone-wrap">
          <Select value={data.phoneCountry}
            onChange={e => setData({ ...data, phoneCountry: e.target.value })}>
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </Select>
          <Input placeholder="e.g. 9876543210" value={data.phone}
            onChange={e => setData({ ...data, phone: e.target.value })} />
        </div>
      </Field>
    </div>
  );
}

// ── Step 3: Flight ────────────────────────────────────────────────────────────
function Step3({ data, setData, errors }) {
  return (
    <div className="af-step-body">
      <div className="af-step-header">
        <div className="af-step-icon">✈️</div>
        <div>
          <h2 className="af-step-title">Flight Details</h2>
          <p className="af-step-sub">Plot your course through the skies</p>
        </div>
      </div>

      <div className="af-flight-section">
        <div className="af-flight-label">
          <span className="af-flight-label__icon">🛬</span> Arrival
        </div>
        <div className="af-toggle-group">
          {["Direct flight", "Multi Stop"].map(opt => (
            <button key={opt} type="button"
              className={`af-toggle ${data.arrivalType === opt ? "active" : ""}`}
              onClick={() => setData({ ...data, arrivalType: opt })}>
              {opt}
            </button>
          ))}
        </div>
        <div className="af-grid-2">
          <Field label="Flight Number" required error={errors.arrivalFlight}>
            <Input placeholder="e.g. AI-315" value={data.arrivalFlight}
              onChange={e => setData({ ...data, arrivalFlight: e.target.value.toUpperCase() })} />
          </Field>
          <Field label="Arrival Date" required error={errors.arrivalDate}>
            <Input type="date" value={data.arrivalDate}
              onChange={e => setData({ ...data, arrivalDate: e.target.value })} />
          </Field>
        </div>
      </div>

      <div className="af-flight-section">
        <div className="af-flight-label">
          <span className="af-flight-label__icon">🛫</span> Departure
        </div>
        <div className="af-toggle-group">
          {["Direct flight", "Multi Stop"].map(opt => (
            <button key={opt} type="button"
              className={`af-toggle ${data.departureType === opt ? "active" : ""}`}
              onClick={() => setData({ ...data, departureType: opt })}>
              {opt}
            </button>
          ))}
        </div>
        <div className="af-grid-2">
          <Field label="Flight Number" required error={errors.departureFlight}>
            <Input placeholder="e.g. TG-316" value={data.departureFlight}
              onChange={e => setData({ ...data, departureFlight: e.target.value.toUpperCase() })} />
          </Field>
          <Field label="Departure Date" required error={errors.departureDate}>
            <Input type="date" value={data.departureDate}
              onChange={e => setData({ ...data, departureDate: e.target.value })} />
          </Field>
        </div>
      </div>
    </div>
  );
}

// ── Step 4: Hotel ─────────────────────────────────────────────────────────────
function Step4({ data, setData, errors }) {
  return (
    <div className="af-step-body">
      <div className="af-step-header">
        <div className="af-step-icon">🏨</div>
        <div>
          <h2 className="af-step-title">Base Camp</h2>
          <p className="af-step-sub">Where will you rest between adventures?</p>
        </div>
      </div>

      <Field label="Hotel Name" required error={errors.hotelName}>
        <Input placeholder="e.g. Marriott Bangkok" value={data.hotelName}
          onChange={e => setData({ ...data, hotelName: e.target.value })} />
      </Field>

      <Field label="Location in Thailand" required error={errors.hotelLocation}>
        <Input placeholder="e.g. Bangkok, Pattaya, Phuket" value={data.hotelLocation}
          onChange={e => setData({ ...data, hotelLocation: e.target.value })} />
      </Field>

      {/* Summary card */}
      <div className="af-summary">
        <div className="af-summary__title">📋 Quest Summary</div>
        <div className="af-summary__grid">
          {[
            ["Traveller", `${data.firstName || "—"} ${data.lastName || ""}`],
            ["Passport",  data.passport || "—"],
            ["Email",     data.email || "—"],
            ["Arrival",   data.arrivalDate || "—"],
            ["Departure", data.departureDate || "—"],
          ].map(([k, v]) => (
            <div className="af-summary__row" key={k}>
              <span className="af-summary__key">{k}</span>
              <span className="af-summary__val">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Step 5: Success ───────────────────────────────────────────────────────────
function Step5({ data }) {
  return (
    <div className="af-step-body af-step-body--success">
      <div className="af-success-ring">
        <div className="af-success-icon">🏆</div>
      </div>
      <h2 className="af-success-title">Quest Complete!</h2>
      <p className="af-success-sub">
        Your visa application for <strong>Thailand</strong> has been submitted.<br />
        We'll send updates to <strong>{data.email}</strong>
      </p>
      <div className="af-success-badges">
        <div className="af-badge">🎯 Application Submitted</div>
        <div className="af-badge">⚡ Processing Started</div>
        <div className="af-badge">🛡️ On-Time Guaranteed</div>
      </div>
      <div className="af-success-ref">
        Ref# <strong>VE-{Math.random().toString(36).substr(2,8).toUpperCase()}</strong>
      </div>
    </div>
  );
}

// ── Validation ────────────────────────────────────────────────────────────────
function validate(step, data) {
  const e = {};
  if (step === 1) {
    if (!data.firstName.trim()) e.firstName = "First name is required";
    if (!data.lastName.trim())  e.lastName  = "Last name is required";
    if (!data.dob)              e.dob       = "Date of birth is required";
    if (!data.gender)           e.gender    = "Gender is required";
    if (!data.marital)          e.marital   = "Marital status is required";
    if (!data.occupation.trim())e.occupation= "Occupation is required";
  }
  if (step === 2) {
    if (!data.passport.trim())     e.passport     = "Passport number is required";
    if (!data.passportExpiry)      e.passportExpiry = "Expiry date is required";
    if (!data.passportIssue.trim())e.passportIssue = "Place of issue is required";
    if (!data.email.trim())        e.email        = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Enter a valid email";
  }
  if (step === 3) {
    if (!data.arrivalFlight.trim()) e.arrivalFlight = "Flight number required";
    if (!data.arrivalDate)          e.arrivalDate   = "Arrival date required";
    if (!data.departureFlight.trim())e.departureFlight = "Flight number required";
    if (!data.departureDate)        e.departureDate = "Departure date required";
  }
  if (step === 4) {
    if (!data.hotelName.trim())    e.hotelName    = "Hotel name is required";
    if (!data.hotelLocation.trim())e.hotelLocation= "Location is required";
  }
  return e;
}

// ── Main Form Modal ───────────────────────────────────────────────────────────
export default function ApplicationForm({ isOpen, onClose }) {
  const [step, setStep]       = useState(1);
  const [completed, setCompleted] = useState([]);
  const [errors, setErrors]   = useState({});
  const [xp, setXp]           = useState(0);
  const [animDir, setAnimDir] = useState("forward");
  const [data, setData]       = useState({
    firstName:"", lastName:"", dob:"", gender:"", marital:"", occupation:"",
    passport:"", passportExpiry:"", passportIssue:"", email:"",
    phoneCountry:"International", phone:"",
    arrivalType:"Direct flight", arrivalFlight:"", arrivalDate:"",
    departureType:"Direct flight", departureFlight:"", departureDate:"",
    hotelName:"", hotelLocation:"",
  });

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Update XP when step changes
  useEffect(() => {
    const target = STEPS.find(s => s.id === step)?.xp || 0;
    setXp(target);
  }, [step]);

  const handleNext = () => {
    if (step === 5) { onClose(); return; }
    const errs = validate(step, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setAnimDir("forward");
    setCompleted(prev => [...new Set([...prev, step])]);
    setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step === 1) return;
    setAnimDir("back");
    setErrors({});
    setStep(s => s - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="af-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`af-modal af-modal--${animDir}`} role="dialog" aria-modal>
        <Particles />

        {/* Header */}
        <div className="af-header">
          <div className="af-header__left">
            <div className="af-header__logo">⚡ VisaElite</div>
            <div className="af-header__quest">Quest: Thailand Visa Application</div>
          </div>
          <button className="af-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* XP Bar */}
        <XPBar xp={xp} />

        {/* Step Nav */}
        <StepNav current={step} completed={completed} />

        {/* Step Content */}
        <div className={`af-content af-content--${animDir}`} key={step}>
          {step === 1 && <Step1 data={data} setData={setData} errors={errors} />}
          {step === 2 && <Step2 data={data} setData={setData} errors={errors} />}
          {step === 3 && <Step3 data={data} setData={setData} errors={errors} />}
          {step === 4 && <Step4 data={data} setData={setData} errors={errors} />}
          {step === 5 && <Step5 data={data} />}
        </div>

        {/* Footer */}
        <div className="af-footer">
          {step > 1 && step < 5 && (
            <button className="af-btn af-btn--ghost" onClick={handleBack}>
              ← Back
            </button>
          )}
          <div className="af-footer__right">
            <span className="af-step-count">
              {step < 5 ? `Mission ${step} of 4` : "Complete!"}
            </span>
            <button className="af-btn af-btn--primary" onClick={handleNext}>
              {step === 4 ? "🚀 Submit Quest" : step === 5 ? "Close" : "Continue →"}
            </button>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="af-corner af-corner--tl" />
        <div className="af-corner af-corner--tr" />
        <div className="af-corner af-corner--bl" />
        <div className="af-corner af-corner--br" />
      </div>
    </div>
  );
}