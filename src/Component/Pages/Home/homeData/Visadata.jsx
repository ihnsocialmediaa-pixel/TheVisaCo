// ============================================================
//  VISA REQUIREMENTS — DATA
//  visaData.jsx
//  Source passport: India (IN)
//  Each entry describes what an Indian passport holder needs
//  to enter the destination country.
// ============================================================

import {
  Plane, Briefcase, GraduationCap, Building2,
  FileText, CreditCard, Camera, Shield,
  Hotel, Ticket, Globe, Clock, DollarSign,
  AlertCircle, CheckCircle2, Info
} from "lucide-react";

import {
  VISA_STATUS,
  DOC_LABELS,
  PROCESSING_TIMES,
} from "./constants.js";

// ── Helper to build a requirement object ────────────────────
const req = (docs = [], notes = "") => ({ docs, notes });

// ── Country data ─────────────────────────────────────────────
export const COUNTRIES_FROM = [
  { code: "IN", name: "India",          flag: "🇮🇳", region: "Asia"        },
  { code: "US", name: "United States",  flag: "🇺🇸", region: "Americas"    },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe"      },
  { code: "DE", name: "Germany",        flag: "🇩🇪", region: "Europe"      },
  { code: "AU", name: "Australia",      flag: "🇦🇺", region: "Oceania"     },
  { code: "CA", name: "Canada",         flag: "🇨🇦", region: "Americas"    },
  { code: "AE", name: "UAE",            flag: "🇦🇪", region: "Middle East" },
  { code: "SG", name: "Singapore",      flag: "🇸🇬", region: "Asia"        },
  { code: "FR", name: "France",         flag: "🇫🇷", region: "Europe"      },
  { code: "JP", name: "Japan",          flag: "🇯🇵", region: "Asia"        },
];

// ── Core visa database (from India → destination) ───────────
// Each record:
//  id, name, flag, region,
//  status (key of VISA_STATUS),
//  stayDays, fee (USD), currency,
//  processingTime (key of PROCESSING_TIMES),
//  requirements { docs[], notes }
//  tips[]

export const VISA_DATA = [
  // ── ASIA ──────────────────────────────────────────────────
  {
    id: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    region: "Asia",
    status: "VISA_FREE",
    stayDays: 30,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.BANK_STATEMENT],
      "Passport must be valid for at least 6 months. Show proof of sufficient funds (approx. ₹10,000/day)."
    ),
    tips: ["Keep a return ticket handy at immigration.", "Carry at least USD 20 per day in cash."],
  },
  {
    id: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    region: "Asia",
    status: "VISA_FREE",
    stayDays: 30,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Visa-free for tourism only. Extendable once for another 30 days."
    ),
    tips: ["Bali immigration is strict — always carry your hotel booking.", "Extension available at local immigration office."],
  },
  {
    id: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "Asia",
    status: "VISA_FREE",
    stayDays: 30,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.BANK_STATEMENT],
      "Passport must be valid for 6 months. No visa required for stays up to 30 days."
    ),
    tips: ["eNTRI is no longer required for Indian passport holders.", "KLIA2 immigration can be lengthy — arrive early."],
  },
  {
    id: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Asia",
    status: "VISA_REQUIRED",
    stayDays: 30,
    fee: 30,
    currency: "USD",
    processingTime: "ONE_THREE",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR],
      "Apply online via Singapore ICA e-service or through a travel agent."
    ),
    tips: ["Processing usually takes 3 business days.", "Ensure your bank statement shows at least SGD 3,000 per person."],
  },
  {
    id: "JP",
    name: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    status: "VISA_REQUIRED",
    stayDays: 15,
    fee: 25,
    currency: "USD",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.ITIN,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR],
      "Apply at the Japanese Embassy/Consulate. Single-entry tourist visa valid for 90 days from issue."
    ),
    tips: ["Submit 3 months of bank statements.", "Detailed day-by-day itinerary significantly helps approval.", "Japan Embassy Mumbai is fastest; Delhi takes longer."],
  },
  {
    id: "KR",
    name: "South Korea",
    flag: "🇰🇷",
    region: "Asia",
    status: "VISA_REQUIRED",
    stayDays: 30,
    fee: 50,
    currency: "USD",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.EMPLOYMENT],
      "K-ETA (electronic travel authorisation) is required for visa-exempt travelers but Indians are not visa-exempt."
    ),
    tips: ["Apply at Korean Embassy online portal.", "Show strong financial ties to India for quick approval."],
  },
  {
    id: "LK",
    name: "Sri Lanka",
    flag: "🇱🇰",
    region: "Asia",
    status: "E_VISA",
    stayDays: 30,
    fee: 20,
    currency: "USD",
    processingTime: "ONE_THREE",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.VISA_FORM],
      "Apply for ETA online at eta.gov.lk. Usually approved within 24 hours."
    ),
    tips: ["ETA is extendable to 90 days.", "Print your ETA approval before travel."],
  },
  {
    id: "NP",
    name: "Nepal",
    flag: "🇳🇵",
    region: "Asia",
    status: "VISA_FREE",
    stayDays: 150,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT],
      "Indian citizens do not require a visa or passport for Nepal — any government-issued photo ID is sufficient."
    ),
    tips: ["Voter ID or Aadhaar card is accepted.", "Currency exchange is easy at Kathmandu airport."],
  },
  {
    id: "BT",
    name: "Bhutan",
    flag: "🇧🇹",
    region: "Asia",
    status: "VISA_FREE",
    stayDays: 0,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT],
      "Indian nationals do not need a visa. A valid passport or voter ID is sufficient."
    ),
    tips: ["SDF (Sustainable Development Fee) of USD 200/night applies from 2023.", "Permit required for restricted areas."],
  },
  {
    id: "VN",
    name: "Vietnam",
    flag: "🇻🇳",
    region: "Asia",
    status: "E_VISA",
    stayDays: 90,
    fee: 25,
    currency: "USD",
    processingTime: "ONE_THREE",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Apply for e-visa at evisa.xuatnhapcanh.gov.vn. Valid for single or multiple entries."
    ),
    tips: ["e-Visa is the easiest route for Indian travellers.", "Carry USD cash as backup."],
  },
  {
    id: "KH",
    name: "Cambodia",
    flag: "🇰🇭",
    region: "Asia",
    status: "VISA_ON_ARRIVAL",
    stayDays: 30,
    fee: 30,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.HOTEL_BOOKING],
      "Visa on arrival available at major entry points. Bring USD cash for the fee."
    ),
    tips: ["Bring one passport photo.", "e-Visa available at evisa.gov.kh for USD 36."],
  },
  {
    id: "PH",
    name: "Philippines",
    flag: "🇵🇭",
    region: "Asia",
    status: "VISA_FREE",
    stayDays: 30,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Visa-free for 30 days, extendable to 59 days at local immigration."
    ),
    tips: ["Show onward/return ticket at immigration.", "eTravel registration required before arrival at etravel.gov.ph."],
  },
  // ── MIDDLE EAST ───────────────────────────────────────────
  {
    id: "AE",
    name: "UAE",
    flag: "🇦🇪",
    region: "Middle East",
    status: "VISA_ON_ARRIVAL",
    stayDays: 30,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.BANK_STATEMENT],
      "Indian passport holders with a valid US/UK/EU visa/residence permit may get visa on arrival. Otherwise e-visa required."
    ),
    tips: ["Apply for e-visa through airlines or travel agents for guaranteed entry.", "Dubai Airports have fast VOA counters for eligible travelers."],
  },
  {
    id: "QA",
    name: "Qatar",
    flag: "🇶🇦",
    region: "Middle East",
    status: "VISA_ON_ARRIVAL",
    stayDays: 30,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Free visa on arrival for Indian passport holders for up to 30 days."
    ),
    tips: ["Hayya card (from FIFA era) is no longer required.", "Qatar is easy — one of the most accessible Middle East visas."],
  },
  {
    id: "OM",
    name: "Oman",
    flag: "🇴🇲",
    region: "Middle East",
    status: "E_VISA",
    stayDays: 30,
    fee: 20,
    currency: "USD",
    processingTime: "ONE_THREE",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Apply through evisa.rop.gov.om. Approval usually within 24 hours."
    ),
    tips: ["Single and multiple entry options available.", "Travel insurance not mandatory but recommended."],
  },
  {
    id: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    status: "E_VISA",
    stayDays: 90,
    fee: 110,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.TRAVEL_INSURANCE],
      "Tourist e-visa available at visa.visitsaudi.com. Multiple entry, 1 year validity."
    ),
    tips: ["Insurance included in visa fee.", "Dress code applies in public — carry a scarf."],
  },
  {
    id: "BH",
    name: "Bahrain",
    flag: "🇧🇭",
    region: "Middle East",
    status: "VISA_ON_ARRIVAL",
    stayDays: 14,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.BANK_STATEMENT],
      "Free visa on arrival for Indian nationals for 14 days."
    ),
    tips: ["e-Visa also available online for longer stays.", "Carry BHD cash or USD."],
  },
  // ── EUROPE ────────────────────────────────────────────────
  {
    id: "FR",
    name: "France",
    flag: "🇫🇷",
    region: "Europe",
    status: "VISA_REQUIRED",
    stayDays: 90,
    fee: 90,
    currency: "EUR",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.ITIN,
       DOC_LABELS.TRAVEL_INSURANCE, DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR, DOC_LABELS.COVER_LETTER],
      "Schengen Visa. Apply via VFS Global. Valid for Schengen area (26 countries)."
    ),
    tips: ["Travel insurance must cover minimum €30,000.", "Apply 3 months before travel.", "Bank balance: approx. €100/day."],
  },
  {
    id: "DE",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    status: "VISA_REQUIRED",
    stayDays: 90,
    fee: 90,
    currency: "EUR",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.TRAVEL_INSURANCE,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR, DOC_LABELS.COVER_LETTER, DOC_LABELS.ITIN],
      "Schengen Visa applied at German Embassy/VFS. Very detailed documentation required."
    ),
    tips: ["Book VFS appointment early — slots fill up fast.", "Provide cover letter with complete trip justification."],
  },
  {
    id: "IT",
    name: "Italy",
    flag: "🇮🇹",
    region: "Europe",
    status: "VISA_REQUIRED",
    stayDays: 90,
    fee: 90,
    currency: "EUR",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.TRAVEL_INSURANCE,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR, DOC_LABELS.COVER_LETTER],
      "Schengen Visa via Italian consulate / VFS. Multiple entry possible with prior travel history."
    ),
    tips: ["Italians prefer comprehensive itinerary.", "Always attach all 3 months of bank statements."],
  },
  {
    id: "ES",
    name: "Spain",
    flag: "🇪🇸",
    region: "Europe",
    status: "VISA_REQUIRED",
    stayDays: 90,
    fee: 90,
    currency: "EUR",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.TRAVEL_INSURANCE,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR],
      "Schengen Visa applied via BLS International for Spain."
    ),
    tips: ["Apply to the country of main stay.", "BLS centres accept walk-ins in some cities."],
  },
  {
    id: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    status: "VISA_REQUIRED",
    stayDays: 180,
    fee: 115,
    currency: "GBP",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.EMPLOYMENT,
       DOC_LABELS.ITR, DOC_LABELS.COVER_LETTER, DOC_LABELS.TRAVEL_INSURANCE],
      "Apply online via UK Visas and Immigration. Biometrics required at VFS."
    ),
    tips: ["Show strong ties to India (property, family, job).", "6 months bank statements recommended for UK.", "Priority service available for extra fee."],
  },
  {
    id: "CH",
    name: "Switzerland",
    flag: "🇨🇭",
    region: "Europe",
    status: "VISA_REQUIRED",
    stayDays: 90,
    fee: 90,
    currency: "EUR",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.TRAVEL_INSURANCE,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR],
      "Schengen Visa. Apply at Swiss consulate. Switzerland is in Schengen but not the EU."
    ),
    tips: ["Very high approval rate with clean documentation.", "Show CHF 100–150/day as proof of funds."],
  },
  {
    id: "PT",
    name: "Portugal",
    flag: "🇵🇹",
    region: "Europe",
    status: "VISA_REQUIRED",
    stayDays: 90,
    fee: 90,
    currency: "EUR",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.TRAVEL_INSURANCE, DOC_LABELS.EMPLOYMENT],
      "Schengen Visa via VFS. Portugal is considered one of the easier Schengen embassies."
    ),
    tips: ["Portugal VFS appointments are easier to get than France/Germany.", "Great first Schengen application country."],
  },
  // ── AMERICAS ──────────────────────────────────────────────
  {
    id: "US",
    name: "United States",
    flag: "🇺🇸",
    region: "Americas",
    status: "VISA_REQUIRED",
    stayDays: 180,
    fee: 185,
    currency: "USD",
    processingTime: "TWO_WEEKS",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR, DOC_LABELS.ITIN, DOC_LABELS.SPONSOR_LETTER],
      "B1/B2 Tourist Visa. DS-160 form online. In-person interview at US Embassy/Consulate mandatory."
    ),
    tips: ["Wait times for visa interview can be 300+ days at peak.", "Appointment slots open at 8 AM — book immediately.", "Bring all original documents to the interview."],
  },
  {
    id: "CA",
    name: "Canada",
    flag: "🇨🇦",
    region: "Americas",
    status: "VISA_REQUIRED",
    stayDays: 180,
    fee: 100,
    currency: "CAD",
    processingTime: "TWO_WEEKS",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET,
       DOC_LABELS.ITIN, DOC_LABELS.TRAVEL_INSURANCE],
      "Temporary Resident Visa (TRV). Apply online at IRCC portal. Biometrics required (INR 6,250)."
    ),
    tips: ["Biometrics appointment needed separately.", "Prior US/UK visa history helps.", "Processing times vary 2–8 weeks."],
  },
  {
    id: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    region: "Americas",
    status: "VISA_FREE",
    stayDays: 180,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Indians with a valid US visa may enter Mexico visa-free. Without US visa, Mexico visa required."
    ),
    tips: ["Valid US B1/B2 visa gives free entry.", "Fill FMM tourist card on arrival."],
  },
  {
    id: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    region: "Americas",
    status: "VISA_REQUIRED",
    stayDays: 90,
    fee: 80,
    currency: "USD",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.EMPLOYMENT],
      "Apply at Brazilian Consulate online. Tourist visa valid for 5 years, multiple entry."
    ),
    tips: ["Yellow fever vaccination certificate may be required.", "Apply at least 4 weeks in advance."],
  },
  // ── AFRICA ────────────────────────────────────────────────
  {
    id: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    region: "Africa",
    status: "E_VISA",
    stayDays: 90,
    fee: 51,
    currency: "USD",
    processingTime: "ONE_THREE",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.HOTEL_BOOKING,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.BANK_STATEMENT, DOC_LABELS.TRAVEL_INSURANCE],
      "Apply for e-visa at evisa.go.ke. Kenya no longer gives visa on arrival — e-visa mandatory."
    ),
    tips: ["Apply at least 2 weeks in advance.", "Yellow fever vaccination certificate required if arriving from endemic countries."],
  },
  {
    id: "TZ",
    name: "Tanzania",
    flag: "🇹🇿",
    region: "Africa",
    status: "VISA_ON_ARRIVAL",
    stayDays: 90,
    fee: 50,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Visa on arrival at Julius Nyerere International Airport and other ports."
    ),
    tips: ["Bring USD 50 cash for VOA fee.", "Yellow fever cert required if arriving via endemic countries."],
  },
  {
    id: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    region: "Africa",
    status: "VISA_FREE",
    stayDays: 30,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.BANK_STATEMENT],
      "Visa-free for 30 days. Passport must have at least 2 blank pages."
    ),
    tips: ["Carry sufficient funds proof.", "Passport validity of at least 30 days beyond stay."],
  },
  {
    id: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    region: "Africa",
    status: "VISA_ON_ARRIVAL",
    stayDays: 30,
    fee: 25,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Visa on arrival at Cairo, Luxor, Hurghada airports. e-Visa also available online."
    ),
    tips: ["USD 25 cash needed.", "Sinai-only visa (USD 15) available for Sharm el-Sheikh."],
  },
  {
    id: "MA",
    name: "Morocco",
    flag: "🇲🇦",
    region: "Africa",
    status: "VISA_FREE",
    stayDays: 90,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Indian passport holders can enter Morocco visa-free for up to 90 days."
    ),
    tips: ["One of the most accessible African destinations for Indians.", "Currency exchange: bring USD and convert to Dirham."],
  },
  // ── OCEANIA ───────────────────────────────────────────────
  {
    id: "AU",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    status: "E_VISA",
    stayDays: 365,
    fee: 20,
    currency: "AUD",
    processingTime: "ONE_THREE",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR, DOC_LABELS.HOTEL_BOOKING,
       DOC_LABELS.FLIGHT_TICKET, DOC_LABELS.HEALTH_INSURANCE, DOC_LABELS.ITIN],
      "Visitor visa (subclass 600) applied online via ImmiAccount. Multiple entry, up to 1 year validity."
    ),
    tips: ["Processing is usually 7–15 days.", "Show strong ties to India.", "Health examination may be required for long-stay."],
  },
  {
    id: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "Oceania",
    status: "VISA_REQUIRED",
    stayDays: 90,
    fee: 211,
    currency: "NZD",
    processingTime: "FOUR_SEVEN",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.PHOTO, DOC_LABELS.VISA_FORM, DOC_LABELS.BANK_STATEMENT,
       DOC_LABELS.EMPLOYMENT, DOC_LABELS.ITR, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Visitor visa applied online via Immigration New Zealand website."
    ),
    tips: ["Online application is straightforward.", "NZeTA not available for Indian passport holders — full visa required."],
  },
  {
    id: "FJ",
    name: "Fiji",
    flag: "🇫🇯",
    region: "Oceania",
    status: "VISA_FREE",
    stayDays: 90,
    fee: 0,
    currency: "USD",
    processingTime: "INSTANT",
    requirements: req(
      [DOC_LABELS.PASSPORT, DOC_LABELS.HOTEL_BOOKING, DOC_LABELS.FLIGHT_TICKET],
      "Indian passport holders get visa-free entry to Fiji for up to 90 days."
    ),
    tips: ["One of few Pacific island nations visa-free for Indians.", "Currency: FJD — convert at airport."],
  },
];

// ── Icon map for documents ───────────────────────────────────
export const DOC_ICONS = {
  [DOC_LABELS.PASSPORT]:         <FileText    size={16} />,
  [DOC_LABELS.PHOTO]:            <Camera      size={16} />,
  [DOC_LABELS.BANK_STATEMENT]:   <CreditCard  size={16} />,
  [DOC_LABELS.ITR]:              <FileText    size={16} />,
  [DOC_LABELS.COVER_LETTER]:     <FileText    size={16} />,
  [DOC_LABELS.HOTEL_BOOKING]:    <Hotel       size={16} />,
  [DOC_LABELS.FLIGHT_TICKET]:    <Ticket      size={16} />,
  [DOC_LABELS.TRAVEL_INSURANCE]: <Shield      size={16} />,
  [DOC_LABELS.INVITATION]:       <FileText    size={16} />,
  [DOC_LABELS.EMPLOYMENT]:       <Briefcase   size={16} />,
  [DOC_LABELS.NOC]:              <FileText    size={16} />,
  [DOC_LABELS.VISA_FORM]:        <Globe       size={16} />,
  [DOC_LABELS.ITIN]:             <Plane       size={16} />,
  [DOC_LABELS.SPONSOR_LETTER]:   <FileText    size={16} />,
};

// ── Status icon helper ────────────────────────────────────────
export const STATUS_ICONS = {
  VISA_FREE:       <CheckCircle2 size={16} />,
  VISA_ON_ARRIVAL: <Info         size={16} />,
  E_VISA:          <Globe        size={16} />,
  VISA_REQUIRED:   <AlertCircle  size={16} />,
  ETA:             <Clock        size={16} />,
};

export { Plane, Briefcase, GraduationCap, Building2, Globe, Clock, DollarSign, Shield };