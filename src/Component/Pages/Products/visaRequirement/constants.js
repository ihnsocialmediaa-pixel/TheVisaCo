// ============================================================
// VISA REQUIREMENTS — CONSTANTS
// All data, config, and static values live here.
// ============================================================

// ── Passport / From Countries ────────────────────────────────
export const PASSPORT_COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳", region: "Asia" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", region: "Asia" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", region: "Asia" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", region: "Asia" },
  { code: "NP", name: "Nepal", flag: "🇳🇵", region: "Asia" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", region: "Asia" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", region: "Asia" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", region: "Asia" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", region: "Asia" },
  { code: "CN", name: "China", flag: "🇨🇳", region: "Asia" },
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", region: "Asia" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", region: "Asia" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", region: "Africa" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", region: "Africa" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", region: "Africa" },
  { code: "EG", name: "Egypt", flag: "🇪🇬", region: "Africa" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", region: "Africa" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", region: "Americas" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", region: "Americas" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", region: "Americas" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", region: "Americas" },
  { code: "US", name: "United States", flag: "🇺🇸", region: "Americas" },
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "Americas" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe" },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe" },
  { code: "IT", name: "Italy", flag: "🇮🇹", region: "Europe" },
  { code: "ES", name: "Spain", flag: "🇪🇸", region: "Europe" },
  { code: "AU", name: "Australia", flag: "🇦🇺", region: "Oceania" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", region: "Oceania" },
  { code: "AE", name: "UAE", flag: "🇦🇪", region: "Middle East" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", region: "Middle East" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", region: "Middle East" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", region: "Middle East" },
];

// ── Destination Countries ────────────────────────────────────
export const DESTINATION_COUNTRIES = [
  { code: "US", name: "United States", flag: "🇺🇸", region: "Americas" },
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "Americas" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe" },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe" },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe" },
  { code: "IT", name: "Italy", flag: "🇮🇹", region: "Europe" },
  { code: "ES", name: "Spain", flag: "🇪🇸", region: "Europe" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", region: "Europe" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", region: "Europe" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", region: "Europe" },
  { code: "AT", name: "Austria", flag: "🇦🇹", region: "Europe" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", region: "Europe" },
  { code: "NO", name: "Norway", flag: "🇳🇴", region: "Europe" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", region: "Europe" },
  { code: "GR", name: "Greece", flag: "🇬🇷", region: "Europe" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿", region: "Europe" },
  { code: "HU", name: "Hungary", flag: "🇭🇺", region: "Europe" },
  { code: "PL", name: "Poland", flag: "🇵🇱", region: "Europe" },
  { code: "AU", name: "Australia", flag: "🇦🇺", region: "Oceania" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", region: "Oceania" },
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", region: "Asia" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", region: "Asia" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", region: "Asia" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", region: "Asia" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", region: "Asia" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", region: "Asia" },
  { code: "AE", name: "UAE", flag: "🇦🇪", region: "Middle East" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", region: "Middle East" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", region: "Middle East" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", region: "Middle East" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭", region: "Middle East" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", region: "Africa" },
  { code: "MA", name: "Morocco", flag: "🇲🇦", region: "Africa" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", region: "Africa" },
  { code: "MV", name: "Maldives", flag: "🇲🇻", region: "Asia" },
  { code: "MX", name: "Mexico", flag: "🇲🇽", region: "Americas" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", region: "Americas" },
  { code: "IN", name: "India", flag: "🇮🇳", region: "Asia" },
  { code: "CN", name: "China", flag: "🇨🇳", region: "Asia" },
  { code: "RU", name: "Russia", flag: "🇷🇺", region: "Europe" },
];

// ── Visa Types ────────────────────────────────────────────────
export const VISA_TYPES = {
  TOURIST: "tourist",
  BUSINESS: "business",
  STUDENT: "student",
  WORK: "work",
  TRANSIT: "transit",
};

export const VISA_TYPE_LABELS = {
  tourist: "Tourist",
  business: "Business",
  student: "Student",
  work: "Work",
  transit: "Transit",
};

// ── Visa Access Status ────────────────────────────────────────
export const VISA_STATUS = {
  VISA_FREE: "visa_free",
  VISA_ON_ARRIVAL: "visa_on_arrival",
  E_VISA: "e_visa",
  VISA_REQUIRED: "visa_required",
  NO_ENTRY: "no_entry",
};

export const VISA_STATUS_LABELS = {
  visa_free: "Visa Free",
  visa_on_arrival: "Visa on Arrival",
  e_visa: "e-Visa",
  visa_required: "Visa Required",
  no_entry: "Entry Restricted",
};

export const VISA_STATUS_COLORS = {
  visa_free: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7", dot: "#10b981" },
  visa_on_arrival: { bg: "#fef3c7", text: "#92400e", border: "#fcd34d", dot: "#f59e0b" },
  e_visa: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd", dot: "#3b82f6" },
  visa_required: { bg: "#ffe4e6", text: "#9f1239", border: "#fca5a5", dot: "#ef4444" },
  no_entry: { bg: "#f3f4f6", text: "#374151", border: "#d1d5db", dot: "#6b7280" },
};

// ── Document Labels ───────────────────────────────────────────
export const DOCUMENT_LABELS = {
  passport: "Valid Passport",
  photo: "Passport-size Photos",
  bankStatement: "Bank Statement",
  itr: "Income Tax Returns",
  flightTicket: "Flight Tickets",
  hotelBooking: "Hotel Booking",
  insurance: "Travel Insurance",
  invitationLetter: "Invitation Letter",
  employmentLetter: "Employment Letter",
  noc: "No Objection Certificate",
  birthCertificate: "Birth Certificate",
  marriageCertificate: "Marriage Certificate",
  sponsorLetter: "Sponsor Letter",
  coverLetter: "Cover Letter",
  itin: "Travel Itinerary",
  visaFee: "Visa Fee",
  biometrics: "Biometric Data",
  medicalCert: "Medical Certificate",
  educationDocs: "Education Documents",
};

// ── Document lucide-react icon names ────────────────────────
export const DOCUMENT_ICONS = {
  passport: "FileText",
  photo: "Camera",
  bankStatement: "CreditCard",
  itr: "Receipt",
  flightTicket: "Plane",
  hotelBooking: "Building2",
  insurance: "Shield",
  invitationLetter: "Mail",
  employmentLetter: "Briefcase",
  noc: "FileCheck",
  birthCertificate: "Baby",
  marriageCertificate: "Heart",
  sponsorLetter: "Users",
  coverLetter: "FileEdit",
  itin: "MapPin",
  visaFee: "DollarSign",
  biometrics: "Fingerprint",
  medicalCert: "Stethoscope",
  educationDocs: "GraduationCap",
};

// ── Core Visa Data: "FROM-TO" → requirements ─────────────────
export const VISA_DATA = {

  // ── INDIA → DESTINATIONS ──────────────────────────────────
  "IN-US": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "5–15 business days",
    stayDuration: "Up to 180 days",
    validity: "10 years (multiple entry)",
    fee: "USD 185",
    biometricsRequired: true,
    interviewRequired: true,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months beyond travel date, with 2 blank pages" },
      { key: "photo", detail: "2 photographs (2×2 inch, white background)" },
      { key: "bankStatement", detail: "Last 6 months statements showing sufficient funds" },
      { key: "itr", detail: "Last 3 years Income Tax Returns" },
      { key: "flightTicket", detail: "Confirmed round-trip flight booking" },
      { key: "hotelBooking", detail: "Hotel reservations for entire stay" },
      { key: "insurance", detail: "Travel insurance with USD 100,000 coverage" },
      { key: "employmentLetter", detail: "Letter from employer with salary, designation, and leave approval" },
      { key: "itin", detail: "Detailed day-by-day travel itinerary" },
      { key: "coverLetter", detail: "Cover letter explaining purpose of visit" },
    ],
    tips: [
      "Apply at least 3 months before travel",
      "DS-160 form must be filled online before appointment",
      "Biometrics are collected at the consulate",
      "Strong ties to India (property, job) improve approval chances",
    ],
    applyUrl: "https://ceac.state.gov/genniv/",
  },

  "IN-CA": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "14–40 days",
    stayDuration: "Up to 6 months",
    validity: "Up to 10 years",
    fee: "CAD 100",
    biometricsRequired: true,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months, all old passports if any" },
      { key: "photo", detail: "2 photographs (35×45 mm, white background)" },
      { key: "bankStatement", detail: "Last 6 months bank statements" },
      { key: "itr", detail: "Last 2 years Income Tax Returns" },
      { key: "flightTicket", detail: "Confirmed round-trip ticket" },
      { key: "hotelBooking", detail: "Hotel reservations" },
      { key: "insurance", detail: "Travel medical insurance" },
      { key: "employmentLetter", detail: "Letter from employer with designation, salary, and approved leave" },
      { key: "coverLetter", detail: "Cover letter with purpose of visit and travel history" },
      { key: "itin", detail: "Detailed itinerary" },
      { key: "biometrics", detail: "Biometrics must be submitted at a VAC" },
    ],
    tips: [
      "Apply online via IRCC portal for faster processing",
      "Biometrics valid for 10 years once submitted",
      "Prior travel to US/UK/Schengen is an advantage",
      "Show proof of ties to home country",
    ],
    applyUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html",
  },

  "IN-GB": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "3–6 weeks",
    stayDuration: "Up to 6 months",
    validity: "Up to 10 years",
    fee: "GBP 115",
    biometricsRequired: true,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Current passport + all previous passports" },
      { key: "photo", detail: "Recent colour photograph (35×45 mm)" },
      { key: "bankStatement", detail: "Last 6 months personal and/or business statements" },
      { key: "itr", detail: "Last 3 years Income Tax Returns" },
      { key: "flightTicket", detail: "Booked return flights" },
      { key: "hotelBooking", detail: "Accommodation proof for entire stay" },
      { key: "insurance", detail: "Travel insurance covering UK" },
      { key: "employmentLetter", detail: "Employer letter with leave sanction" },
      { key: "coverLetter", detail: "Detailed cover letter" },
      { key: "itin", detail: "Day-wise travel itinerary" },
    ],
    tips: [
      "Apply via UKVI online portal",
      "Biometrics required at VFS Global centre",
      "Bank balance should show at least £2,000 equivalent",
      "Property documents and family ties help approval",
    ],
    applyUrl: "https://www.gov.uk/standard-visitor-visa",
  },

  "IN-DE": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "10–15 business days",
    stayDuration: "Up to 90 days",
    validity: "Schengen Area (multiple entry possible)",
    fee: "EUR 80",
    biometricsRequired: true,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for 3 months beyond return date, minimum 2 blank pages" },
      { key: "photo", detail: "2 biometric photos (35×45 mm)" },
      { key: "bankStatement", detail: "Last 3 months statements, min EUR 45/day" },
      { key: "itr", detail: "Last 2 years ITR with Form 16" },
      { key: "flightTicket", detail: "Confirmed round-trip flight itinerary" },
      { key: "hotelBooking", detail: "Accommodation bookings for all nights" },
      { key: "insurance", detail: "Schengen travel insurance (min €30,000 coverage)" },
      { key: "employmentLetter", detail: "NOC/leave approval from employer" },
      { key: "coverLetter", detail: "Cover letter" },
      { key: "itin", detail: "Complete travel itinerary" },
    ],
    tips: [
      "Apply at the German Consulate/VFS Global",
      "For Schengen, apply to the country where you spend most time",
      "EUR 45/day spending capacity must be shown",
      "Insurance must cover entire Schengen zone",
    ],
    applyUrl: "https://india.diplo.de/in-en/service/visa-einreise",
  },

  "IN-FR": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "10–15 business days",
    stayDuration: "Up to 90 days",
    validity: "Schengen (single or multiple)",
    fee: "EUR 80",
    biometricsRequired: true,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for 3 months beyond return, 2 blank pages" },
      { key: "photo", detail: "2 biometric photos" },
      { key: "bankStatement", detail: "Last 3 months (EUR 45/day minimum)" },
      { key: "itr", detail: "ITR for last 2 years" },
      { key: "flightTicket", detail: "Confirmed round-trip flight" },
      { key: "hotelBooking", detail: "Hotel reservations" },
      { key: "insurance", detail: "Schengen insurance min €30,000" },
      { key: "employmentLetter", detail: "Leave letter from employer" },
      { key: "coverLetter", detail: "Cover letter" },
    ],
    tips: [
      "Apply via VFS France",
      "Schengen rules apply — apply to country of longest stay",
      "Paris is top destination — book hotels early",
    ],
    applyUrl: "https://france-visas.gouv.fr/",
  },

  "IN-AU": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "1–4 weeks",
    stayDuration: "Up to 3 months per visit (1 year validity)",
    validity: "1 year (multiple entry)",
    fee: "AUD 20",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid passport (at least 6 months validity)" },
      { key: "photo", detail: "Digital passport-size photo" },
      { key: "bankStatement", detail: "3 months bank statements" },
      { key: "flightTicket", detail: "Confirmed return ticket" },
      { key: "hotelBooking", detail: "Accommodation proof" },
      { key: "insurance", detail: "Travel insurance recommended" },
      { key: "itin", detail: "Travel itinerary" },
    ],
    tips: [
      "Apply online via ImmiAccount portal",
      "Fully digital process — no paper needed",
      "Usually approved within 72 hours",
      "No interview needed",
    ],
    applyUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601",
  },

  "IN-AE": {
    status: "visa_on_arrival",
    visaType: "tourist",
    processingTime: "On arrival (pre-registration recommended)",
    stayDuration: "Up to 30 days (extendable)",
    validity: "60 days",
    fee: "AED 0 (free on arrival)",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months" },
      { key: "photo", detail: "Passport-size photograph" },
      { key: "flightTicket", detail: "Return or onward flight ticket" },
      { key: "hotelBooking", detail: "Hotel booking or host invitation" },
      { key: "bankStatement", detail: "Sufficient funds proof (AED 3,000 min)" },
      { key: "insurance", detail: "Travel insurance recommended" },
    ],
    tips: [
      "Indians with valid US/UK/Schengen visa get visa on arrival",
      "Visa fee waived — completely free",
      "Can be extended for 30 more days at AED 250",
      "Pre-register via ICA UAE app for smoother entry",
    ],
    applyUrl: "https://icp.gov.ae/en/Services/ServicePages/VisaService",
  },

  "IN-TH": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate (on arrival)",
    stayDuration: "Up to 30 days",
    validity: "Single entry (visa free)",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months" },
      { key: "photo", detail: "Passport-size photo" },
      { key: "flightTicket", detail: "Confirmed return ticket" },
      { key: "bankStatement", detail: "THB 10,000 per person or THB 20,000 per family" },
      { key: "hotelBooking", detail: "Hotel booking or accommodation proof" },
    ],
    tips: [
      "No visa needed for Indian passport holders (30 days free)",
      "Extension possible for 30 days at local immigration",
      "Must show return ticket and sufficient funds at immigration",
      "For stays over 30 days, apply for tourist visa",
    ],
    applyUrl: null,
  },

  "IN-SG": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "3–7 business days",
    stayDuration: "30 days",
    validity: "30 days (single/multiple)",
    fee: "SGD 30",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months" },
      { key: "photo", detail: "Passport-size photograph" },
      { key: "bankStatement", detail: "Last 3 months statements" },
      { key: "flightTicket", detail: "Confirmed return ticket" },
      { key: "hotelBooking", detail: "Hotel booking confirmation" },
      { key: "employmentLetter", detail: "Letter from employer" },
      { key: "itin", detail: "Travel itinerary" },
    ],
    tips: [
      "Apply via a licensed Singapore travel agent",
      "Online application is quick and simple",
      "Show minimum SGD 1,000 per person in account",
      "Previous Singapore/US visa holders get expedited approval",
    ],
    applyUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa-information",
  },

  "IN-JP": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "5–7 business days",
    stayDuration: "Up to 90 days",
    validity: "3 or 5 years (multiple entry possible)",
    fee: "JPY 3,000 (single) / JPY 6,000 (multiple)",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid passport with blank pages" },
      { key: "photo", detail: "2 passport photos (45×45 mm, white background)" },
      { key: "bankStatement", detail: "Last 3–6 months statements" },
      { key: "itr", detail: "Latest ITR or salary slips" },
      { key: "flightTicket", detail: "Return flight booking" },
      { key: "hotelBooking", detail: "All hotel reservations" },
      { key: "itin", detail: "Day-wise itinerary" },
      { key: "employmentLetter", detail: "Employment certificate or NOC" },
      { key: "coverLetter", detail: "Covering letter" },
    ],
    tips: [
      "Apply through VFS Japan visa application centre",
      "Japan now offers 5-year multiple entry visas",
      "Itinerary should be very detailed (day by day)",
      "Photos must exactly meet 45×45 mm Japan spec",
    ],
    applyUrl: "https://www.in.emb-japan.go.jp/itprtop_en/index.html",
  },

  "IN-MV": {
    status: "visa_on_arrival",
    visaType: "tourist",
    processingTime: "On arrival",
    stayDuration: "30 days",
    validity: "30 days",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months" },
      { key: "photo", detail: "Passport-size photo" },
      { key: "flightTicket", detail: "Return/onward ticket" },
      { key: "hotelBooking", detail: "Resort/hotel booking confirmation" },
      { key: "bankStatement", detail: "Sufficient funds — USD 100/day" },
    ],
    tips: [
      "Free visa on arrival for all nationalities",
      "Resort booking is mandatory for entry",
      "Extendable by 60 days at USD 80",
    ],
    applyUrl: null,
  },

  "IN-MY": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "30 days",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "bankStatement", detail: "Sufficient funds" },
    ],
    tips: [
      "Indians enjoy visa-free access to Malaysia",
      "Up to 30 days per entry",
      "MDAC pre-arrival form recommended",
    ],
    applyUrl: null,
  },

  "IN-KR": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "3–7 business days",
    stayDuration: "Up to 90 days",
    validity: "Single or multiple entry",
    fee: "KRW 60,000",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for 6 months beyond stay" },
      { key: "photo", detail: "Passport-size photo (35×45 mm)" },
      { key: "bankStatement", detail: "3 months bank statements" },
      { key: "flightTicket", detail: "Confirmed return ticket" },
      { key: "hotelBooking", detail: "Accommodation bookings" },
      { key: "employmentLetter", detail: "Employment certificate" },
      { key: "itin", detail: "Travel itinerary" },
    ],
    tips: [
      "Apply at Korean Embassy or via VFS",
      "K-ETA required for visa-free eligible nationalities",
      "Show strong ties to India for faster approval",
    ],
    applyUrl: "https://www.hikorea.go.kr/",
  },

  // ── PAKISTAN → DESTINATIONS ──────────────────────────────
  "PK-AE": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "2–5 business days",
    stayDuration: "30 days",
    validity: "30–60 days",
    fee: "AED 300",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months" },
      { key: "photo", detail: "Passport-size photographs" },
      { key: "bankStatement", detail: "Last 3 months statements" },
      { key: "flightTicket", detail: "Confirmed return ticket" },
      { key: "hotelBooking", detail: "Hotel booking confirmation" },
      { key: "employmentLetter", detail: "Employment letter with salary" },
    ],
    tips: [
      "Apply via UAE embassy or online portal",
      "All documents should be attested",
      "Allow extra time for verification",
    ],
    applyUrl: "https://icp.gov.ae/en/Services/ServicePages/VisaService",
  },

  "PK-TR": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "90 days",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid Pakistani passport" },
      { key: "photo", detail: "Passport-size photos" },
      { key: "flightTicket", detail: "Return ticket" },
    ],
    tips: [
      "Pakistani nationals enjoy visa-free access to Turkey",
      "Stay up to 90 days without a visa",
      "Must show return ticket and sufficient funds",
    ],
    applyUrl: null,
  },

  "PK-MY": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "30 days",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for 6 months" },
      { key: "flightTicket", detail: "Return ticket" },
    ],
    tips: [
      "Pakistanis get visa-free entry to Malaysia for 30 days",
    ],
    applyUrl: null,
  },

  // ── BANGLADESH → DESTINATIONS ────────────────────────────
  "BD-IN": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "3–7 days",
    stayDuration: "30–180 days",
    validity: "Multiple entry possible",
    fee: "BDT 1,500–3,000",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for 6 months beyond visit" },
      { key: "photo", detail: "2 passport photos" },
      { key: "bankStatement", detail: "3 months bank statements" },
      { key: "flightTicket", detail: "Confirmed tickets" },
      { key: "hotelBooking", detail: "Hotel booking or invitation letter from Indian host" },
      { key: "itin", detail: "Travel itinerary" },
    ],
    tips: [
      "Apply at Indian High Commission in Dhaka",
      "e-Visa also available on Indian government portal",
      "Medical visa available with hospital reference letter",
    ],
    applyUrl: "https://indianvisaonline.gov.in/",
  },

  "BD-AE": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "3–7 days",
    stayDuration: "30 days",
    validity: "30 days",
    fee: "AED 300",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for 6 months" },
      { key: "photo", detail: "Photographs" },
      { key: "bankStatement", detail: "3 months statements" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "hotelBooking", detail: "Accommodation booking" },
      { key: "employmentLetter", detail: "Employment certificate" },
    ],
    tips: [
      "UAE visa mandatory for Bangladeshi nationals",
      "Apply through authorized travel agents",
      "Ensure documents are translated if necessary",
    ],
    applyUrl: "https://icp.gov.ae/en/Services/ServicePages/VisaService",
  },

  // ── NIGERIA → DESTINATIONS ──────────────────────────────
  "NG-GB": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "3–8 weeks",
    stayDuration: "Up to 6 months",
    validity: "Up to 10 years",
    fee: "GBP 115",
    biometricsRequired: true,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid passport (6 months minimum validity)" },
      { key: "photo", detail: "Passport photo" },
      { key: "bankStatement", detail: "6 months bank statements (GBP 2,000+ recommended)" },
      { key: "employmentLetter", detail: "Employment letter and pay slips" },
      { key: "flightTicket", detail: "Return/onward ticket" },
      { key: "hotelBooking", detail: "Accommodation details" },
      { key: "insurance", detail: "Travel insurance" },
      { key: "coverLetter", detail: "Cover letter explaining purpose" },
    ],
    tips: [
      "Apply online via UKVI and attend biometrics at VFS",
      "Previous UK/US/Schengen visas help significantly",
      "Show very strong financial proof",
    ],
    applyUrl: "https://www.gov.uk/standard-visitor-visa",
  },

  "NG-AE": {
    status: "visa_on_arrival",
    visaType: "tourist",
    processingTime: "On arrival",
    stayDuration: "30 days",
    validity: "30 days",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid Nigerian passport (6 months)" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "hotelBooking", detail: "Hotel booking" },
      { key: "bankStatement", detail: "Sufficient funds" },
    ],
    tips: [
      "Nigerians can get visa on arrival at UAE airports",
      "Must have hotel booking confirmation",
      "Pre-register with ICA UAE app for faster processing",
    ],
    applyUrl: null,
  },

  "NG-US": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "3–5 weeks",
    stayDuration: "Up to 6 months",
    validity: "10 years (multiple entry)",
    fee: "USD 185",
    biometricsRequired: true,
    interviewRequired: true,
    documents: [
      { key: "passport", detail: "Valid for 6 months beyond travel" },
      { key: "photo", detail: "2×2 inch white background photo" },
      { key: "bankStatement", detail: "6 months with strong balance" },
      { key: "employmentLetter", detail: "Employer letter, pay slips" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "hotelBooking", detail: "Hotel reservations" },
      { key: "itin", detail: "Itinerary" },
      { key: "itr", detail: "Tax returns or business registration" },
    ],
    tips: [
      "US visa interview required — prepare thoroughly",
      "DS-160 form filled online first",
      "Strong financial docs and ties to Nigeria critical",
    ],
    applyUrl: "https://ceac.state.gov/genniv/",
  },

  // ── USA → DESTINATIONS ──────────────────────────────────
  "US-JP": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "90 days",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid US passport (6 months validity)" },
      { key: "flightTicket", detail: "Return ticket" },
    ],
    tips: [
      "US citizens enjoy visa-free access to Japan",
      "90-day stay allowed per visit",
    ],
    applyUrl: null,
  },

  "US-IN": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "4–5 business days",
    stayDuration: "60 days per visit",
    validity: "1 year (double entry)",
    fee: "USD 25",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months from arrival" },
      { key: "photo", detail: "Digital colour photograph (80% face visible)" },
      { key: "flightTicket", detail: "Confirmed return/onward ticket" },
      { key: "bankStatement", detail: "Proof of sufficient funds" },
    ],
    tips: [
      "e-Visa available at indianvisaonline.gov.in",
      "Apply at least 4 days before travel",
      "e-Visa valid for entry at specific airports only",
    ],
    applyUrl: "https://indianvisaonline.gov.in/",
  },

  "US-DE": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "90 days (Schengen)",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid US passport" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "insurance", detail: "Travel insurance recommended" },
    ],
    tips: [
      "US citizens travel Schengen zone visa-free",
      "ETIAS registration required from late 2025",
      "90-day limit across entire Schengen area",
    ],
    applyUrl: null,
  },

  "US-AU": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "Instant – 72 hours",
    stayDuration: "Up to 3 months per visit",
    validity: "1 year",
    fee: "AUD 20",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid US passport" },
    ],
    tips: [
      "Apply for ETA (Electronic Travel Authority) online",
      "Approved instantly in most cases",
      "Valid for unlimited entries within 1 year",
    ],
    applyUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601",
  },

  // ── UK → DESTINATIONS ──────────────────────────────────
  "GB-US": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "Instant – 72 hours",
    stayDuration: "90 days",
    validity: "2 years",
    fee: "USD 21",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid UK passport" },
      { key: "flightTicket", detail: "Travel details" },
    ],
    tips: [
      "UK citizens use ESTA — apply at esta.cbp.dhs.gov",
      "Good for multiple entries within 2 years",
      "Not a visa — it's an electronic travel authorization",
    ],
    applyUrl: "https://esta.cbp.dhs.gov/",
  },

  "GB-AU": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "Instant – 24 hours",
    stayDuration: "Up to 3 months per visit",
    validity: "1 year",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid UK passport" },
    ],
    tips: [
      "UK citizens use eVisitor visa (subclass 651) — free",
      "Apply online via Australian IMMI portal",
      "Approved within minutes",
    ],
    applyUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/evisitor-651",
  },

  "GB-IN": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "4–5 business days",
    stayDuration: "60 days per visit",
    validity: "1 year (double entry)",
    fee: "USD 25",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months from arrival" },
      { key: "photo", detail: "Digital colour photograph" },
      { key: "flightTicket", detail: "Confirmed return/onward ticket" },
    ],
    tips: [
      "Apply at indianvisaonline.gov.in",
      "e-Visa fully online — no paper forms",
    ],
    applyUrl: "https://indianvisaonline.gov.in/",
  },

  // ── AUSTRALIA → DESTINATIONS ────────────────────────────
  "AU-ID": {
    status: "visa_on_arrival",
    visaType: "tourist",
    processingTime: "On arrival",
    stayDuration: "30 days",
    validity: "30 days",
    fee: "IDR 500,000 (~USD 35)",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid for 6 months" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "bankStatement", detail: "Proof of sufficient funds" },
      { key: "photo", detail: "Passport photo" },
    ],
    tips: [
      "Visa on arrival available at major Indonesian airports",
      "e-Visa also available online for easier entry",
      "Can extend for 30 more days for USD 35",
    ],
    applyUrl: "https://molina.imigrasi.go.id/",
  },

  "AU-JP": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "90 days",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid Australian passport" },
      { key: "flightTicket", detail: "Return ticket" },
    ],
    tips: [
      "No visa needed for Australia → Japan",
      "Show return ticket and accommodation details at immigration",
    ],
    applyUrl: null,
  },

  "AU-IN": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "4–5 business days",
    stayDuration: "60 days per visit",
    validity: "1 year",
    fee: "USD 25",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid Australian passport" },
      { key: "photo", detail: "Digital photograph" },
      { key: "flightTicket", detail: "Return ticket" },
    ],
    tips: [
      "e-Visa available at indianvisaonline.gov.in",
    ],
    applyUrl: "https://indianvisaonline.gov.in/",
  },

  // ── SOUTH AFRICA → DESTINATIONS ─────────────────────────
  "ZA-AE": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "30 days",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid South African passport" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "hotelBooking", detail: "Accommodation proof" },
      { key: "bankStatement", detail: "Sufficient funds" },
    ],
    tips: [
      "South Africans get visa-free entry to UAE",
      "Show return ticket and accommodation",
    ],
    applyUrl: null,
  },

  "ZA-US": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "5–10 business days",
    stayDuration: "Up to 6 months",
    validity: "10 years (multiple entry)",
    fee: "USD 185",
    biometricsRequired: true,
    interviewRequired: true,
    documents: [
      { key: "passport", detail: "Valid for at least 6 months beyond travel" },
      { key: "photo", detail: "2×2 inch photo, white background" },
      { key: "bankStatement", detail: "6 months statements showing USD 5,000+" },
      { key: "employmentLetter", detail: "Employer letter with position and salary" },
      { key: "flightTicket", detail: "Confirmed return ticket" },
      { key: "hotelBooking", detail: "Hotel reservations" },
      { key: "itin", detail: "Travel itinerary" },
      { key: "coverLetter", detail: "Cover letter for consular officer" },
    ],
    tips: [
      "Fill DS-160 form online before booking interview",
      "Consulate interview is mandatory",
      "Show strong ties to South Africa",
    ],
    applyUrl: "https://ceac.state.gov/genniv/",
  },

  // ── GERMANY → DESTINATIONS ──────────────────────────────
  "DE-US": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "Instant",
    stayDuration: "90 days",
    validity: "2 years",
    fee: "USD 21",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid German passport" },
    ],
    tips: [
      "Germans use ESTA — apply at esta.cbp.dhs.gov",
      "No visa required — ESTA is an electronic authorization",
    ],
    applyUrl: "https://esta.cbp.dhs.gov/",
  },

  "DE-JP": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "90 days",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid German passport" },
      { key: "flightTicket", detail: "Return ticket" },
    ],
    tips: [
      "Germans enjoy visa-free access to Japan for 90 days",
    ],
    applyUrl: null,
  },

  // ── UAE → DESTINATIONS ──────────────────────────────────
  "AE-US": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "Instant – 72 hours",
    stayDuration: "90 days",
    validity: "2 years",
    fee: "USD 21",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid UAE passport" },
    ],
    tips: [
      "UAE passport holders use ESTA for the US",
      "Apply at esta.cbp.dhs.gov",
    ],
    applyUrl: "https://esta.cbp.dhs.gov/",
  },

  "AE-GB": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "3–6 weeks",
    stayDuration: "Up to 6 months",
    validity: "Up to 10 years",
    fee: "GBP 115",
    biometricsRequired: true,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid UAE passport" },
      { key: "photo", detail: "Passport photo" },
      { key: "bankStatement", detail: "6 months statements" },
      { key: "employmentLetter", detail: "Employer letter" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "hotelBooking", detail: "Accommodation proof" },
      { key: "coverLetter", detail: "Cover letter" },
    ],
    tips: [
      "Apply via UKVI portal",
      "UAE residents with strong finances have good approval rates",
    ],
    applyUrl: "https://www.gov.uk/standard-visitor-visa",
  },

  // ── CANADA → DESTINATIONS ───────────────────────────────
  "CA-US": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "6 months",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid Canadian passport" },
    ],
    tips: [
      "Canadians travel to the US without a visa",
      "Show passport and proof of ties to Canada",
      "Entry at land border requires NEXUS or enhanced ID",
    ],
    applyUrl: null,
  },

  "CA-IN": {
    status: "e_visa",
    visaType: "tourist",
    processingTime: "4–5 business days",
    stayDuration: "60 days per visit",
    validity: "1 year (double entry)",
    fee: "USD 25",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid Canadian passport" },
      { key: "photo", detail: "Digital photograph" },
      { key: "flightTicket", detail: "Return ticket" },
    ],
    tips: [
      "e-Visa available at indianvisaonline.gov.in",
      "Fully digital process",
    ],
    applyUrl: "https://indianvisaonline.gov.in/",
  },

  // ── BRAZIL → DESTINATIONS ───────────────────────────────
  "BR-US": {
    status: "visa_required",
    visaType: "tourist",
    processingTime: "2–4 weeks",
    stayDuration: "Up to 6 months",
    validity: "10 years",
    fee: "USD 185",
    biometricsRequired: true,
    interviewRequired: true,
    documents: [
      { key: "passport", detail: "Valid for 6 months beyond travel" },
      { key: "photo", detail: "2×2 inch white background photo" },
      { key: "bankStatement", detail: "6 months statements" },
      { key: "employmentLetter", detail: "Employer letter or business proof" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "hotelBooking", detail: "Hotel reservations" },
      { key: "itin", detail: "Travel itinerary" },
      { key: "itr", detail: "Tax returns" },
    ],
    tips: [
      "Fill DS-160 online before booking interview",
      "Interview at US Embassy in Brasília or consulate",
      "Financial strength and ties to Brazil are key",
    ],
    applyUrl: "https://ceac.state.gov/genniv/",
  },

  "BR-DE": {
    status: "visa_free",
    visaType: "tourist",
    processingTime: "Immediate",
    stayDuration: "90 days (Schengen)",
    validity: "Visa-free",
    fee: "Free",
    biometricsRequired: false,
    interviewRequired: false,
    documents: [
      { key: "passport", detail: "Valid Brazilian passport" },
      { key: "flightTicket", detail: "Return ticket" },
      { key: "insurance", detail: "Travel insurance" },
      { key: "bankStatement", detail: "Sufficient funds" },
    ],
    tips: [
      "Brazilians travel Schengen zone visa-free",
      "90-day limit across all Schengen countries",
      "ETIAS may be required from 2025",
    ],
    applyUrl: null,
  },
};

// ── Popular Route Suggestions ────────────────────────────────
export const POPULAR_ROUTES = [
  { from: "IN", to: "US", label: "India → USA" },
  { from: "IN", to: "CA", label: "India → Canada" },
  { from: "IN", to: "GB", label: "India → UK" },
  { from: "IN", to: "DE", label: "India → Germany" },
  { from: "IN", to: "AU", label: "India → Australia" },
  { from: "IN", to: "AE", label: "India → UAE" },
  { from: "IN", to: "TH", label: "India → Thailand" },
  { from: "IN", to: "JP", label: "India → Japan" },
  { from: "NG", to: "GB", label: "Nigeria → UK" },
  { from: "US", to: "IN", label: "USA → India" },
  { from: "GB", to: "AU", label: "UK → Australia" },
  { from: "PK", to: "TR", label: "Pakistan → Turkey" },
];

// ── Fallback docs when route not in VISA_DATA ────────────────
export const FALLBACK_REQUIRED_DOCS = [
  { key: "passport", detail: "Valid passport (at least 6 months beyond travel date)" },
  { key: "photo", detail: "Recent passport-size photographs" },
  { key: "bankStatement", detail: "Recent bank statements (3–6 months)" },
  { key: "flightTicket", detail: "Confirmed return flight tickets" },
  { key: "hotelBooking", detail: "Hotel or accommodation booking" },
  { key: "insurance", detail: "Travel insurance" },
  { key: "itin", detail: "Travel itinerary" },
  { key: "coverLetter", detail: "Cover letter stating purpose of visit" },
];

// ── UI Text Config ───────────────────────────────────────────
export const UI_CONFIG = {
  appName: "VisaCheck",
  tagline: "Instant visa requirements for every route",
  searchPlaceholderFrom: "Search passport country...",
  searchPlaceholderTo: "Search destination...",
  emptyStateText: "Select your passport country and destination to see visa requirements",
  noDataText: "Requirements for this route are being updated. Please contact the destination country's embassy for the most current information.",
};

// ── Region tag colors ────────────────────────────────────────
export const REGION_COLORS = {
  Asia: { bg: "#fef3c7", text: "#92400e" },
  Europe: { bg: "#dbeafe", text: "#1e40af" },
  Americas: { bg: "#dcfce7", text: "#166534" },
  Africa: { bg: "#fce7f3", text: "#9d174d" },
  Oceania: { bg: "#ede9fe", text: "#5b21b6" },
  "Middle East": { bg: "#ffedd5", text: "#9a3412" },
};

// ── Processing speed classifier ──────────────────────────────
export const PROCESSING_SPEED_BANDS = {
  instant: { label: "Instant", color: "#10b981", bg: "#d1fae5" },
  fast: { label: "Fast", color: "#3b82f6", bg: "#dbeafe" },
  standard: { label: "Standard", color: "#f59e0b", bg: "#fef3c7" },
  slow: { label: "Slow", color: "#ef4444", bg: "#fee2e2" },
};

export const getProcessingSpeed = (processingTime) => {
  const t = (processingTime || "").toLowerCase();
  if (t.includes("instant") || t.includes("arrival") || t.includes("immediate")) return PROCESSING_SPEED_BANDS.instant;
  if (t.includes("72") || t.includes("24") || t.includes("3–7") || t.includes("1–4 days")) return PROCESSING_SPEED_BANDS.fast;
  if (t.includes("week") || t.includes("14") || t.includes("15")) return PROCESSING_SPEED_BANDS.standard;
  return PROCESSING_SPEED_BANDS.slow;
};

// ── Stats shown in hero ──────────────────────────────────────
export const HERO_STATS = [
  { value: "40+", label: "Countries Covered" },
  { value: "100+", label: "Visa Routes" },
  { value: "Free", label: "Always" },
];