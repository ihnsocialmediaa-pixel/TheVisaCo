// Policy.js — All constants for the Refund Policy page

export const PRODUCT_TABS = [
  { id: "evisa",    label: "e-visa",              description: "The visa is issued online and received digitally to enter the country." },
  { id: "us",       label: "United States",        description: "Visa requirements specific to the United States." },
  { id: "schengen", label: "Schengen",             description: "European countries where one visa works for all." },
  { id: "passport", label: "Passport Collection",  description: "The passport is collected and the embassy places a visa stamp inside it." },
];

// ─── Per-tab policy stages ────────────────────────────────────────────────────

export const POLICY_STAGES_BY_TAB = {
  evisa: [
    { id: 1, stage: "Application submitted on Atlys",   substage: "Personal details & document upload pending",          refundStatus: "100% Refund",         refundType: "full",    reason: "Application not filed to govt. yet",             icon: "📋" },
    { id: 2, stage: "Application undergoes checks",      substage: "Documents uploaded & being vetted by Atlys",          refundStatus: "100% Refund",         refundType: "full",    reason: "Application not filed to govt. yet",             icon: "🔍" },
    { id: 3, stage: "Application filed to government",   substage: "Application has began processing",                    refundStatus: "No Refund",           refundType: "none",    reason: "Application cannot be withdrawn",                icon: "🏛️" },
    { id: 4, stage: "Visa decision arrives",             substage: "Visa approval on time",                               refundStatus: "No Refund",           refundType: "none",    reason: "Visa has already been issued",                   icon: "✅" },
    { id: 5, stage: "Visa decision arrives",             substage: "Visa approval slightly delayed",                      refundStatus: "Service Fee Waived",  refundType: "partial", reason: "AtlysProtect applied",                           icon: "⏳" },
    { id: 6, stage: "Visa decision arrives",             substage: "Visa rejected",                                       refundStatus: "100% Refund",         refundType: "full",    reason: "AtlysProtect applied",                           icon: "❌" },
  ],
  us: [
    { id: 1, stage: "Application initiated",             substage: "DS-160 form not yet submitted",                       refundStatus: "100% Refund",         refundType: "full",    reason: "No government filing made yet",                  icon: "📋" },
    { id: 2, stage: "Documents under review",            substage: "Supporting documents being verified by Atlys",        refundStatus: "100% Refund",         refundType: "full",    reason: "Application not lodged with embassy",            icon: "🔍" },
    { id: 3, stage: "Embassy appointment booked",        substage: "Interview slot confirmed at US consulate",             refundStatus: "Service Fee Only",    refundType: "partial", reason: "Appointment fee non-refundable by embassy",      icon: "📅" },
    { id: 4, stage: "Interview attended",                substage: "Applicant appeared for biometrics / interview",       refundStatus: "No Refund",           refundType: "none",    reason: "Service fully rendered",                         icon: "🏛️" },
    { id: 5, stage: "Visa decision arrives",             substage: "Approved — stamped in passport",                      refundStatus: "No Refund",           refundType: "none",    reason: "Visa successfully issued",                       icon: "✅" },
    { id: 6, stage: "Visa decision arrives",             substage: "Rejected by embassy",                                 refundStatus: "Atlys Fee Refunded",  refundType: "partial", reason: "Atlys fee returned; embassy fee non-refundable", icon: "❌" },
  ],
  schengen: [
    { id: 1, stage: "Application initiated",             substage: "Schengen country selected; documents pending",        refundStatus: "100% Refund",         refundType: "full",    reason: "No VFS / embassy filing made yet",               icon: "📋" },
    { id: 2, stage: "Document verification",             substage: "Travel insurance, ITR, bank statements being checked", refundStatus: "100% Refund",        refundType: "full",    reason: "Application not yet submitted to VFS",           icon: "🔍" },
    { id: 3, stage: "Submitted to VFS / Embassy",        substage: "Physical documents dispatched to VFS centre",         refundStatus: "No Refund",           refundType: "none",    reason: "VFS submission fee is non-refundable",           icon: "📦" },
    { id: 4, stage: "Biometrics appointment",            substage: "Applicant attended VFS biometrics",                   refundStatus: "No Refund",           refundType: "none",    reason: "Service fully rendered at VFS",                  icon: "🏛️" },
    { id: 5, stage: "Visa decision arrives",             substage: "Approved on time",                                    refundStatus: "No Refund",           refundType: "none",    reason: "Visa successfully issued",                       icon: "✅" },
    { id: 6, stage: "Visa decision arrives",             substage: "Approval delayed beyond travel date",                 refundStatus: "Service Fee Waived",  refundType: "partial", reason: "AtlysProtect delay coverage applied",            icon: "⏳" },
    { id: 7, stage: "Visa decision arrives",             substage: "Visa rejected by embassy",                            refundStatus: "100% Refund",         refundType: "full",    reason: "AtlysProtect rejection coverage applied",        icon: "❌" },
  ],
  passport: [
    { id: 1, stage: "Application initiated",             substage: "Passport pickup scheduled; details pending",          refundStatus: "100% Refund",         refundType: "full",    reason: "Passport not yet collected from applicant",      icon: "📋" },
    { id: 2, stage: "Passport collected by courier",     substage: "Physical passport in transit to Atlys hub",           refundStatus: "Partial Refund",      refundType: "partial", reason: "Courier cost deducted; rest refunded",           icon: "🚚" },
    { id: 3, stage: "Passport submitted to embassy",     substage: "Embassy physically processing the passport",          refundStatus: "No Refund",           refundType: "none",    reason: "Embassy submission fee non-refundable",          icon: "🏛️" },
    { id: 4, stage: "Passport under embassy review",     substage: "Waiting for embassy to stamp visa",                   refundStatus: "No Refund",           refundType: "none",    reason: "Application in active embassy processing",       icon: "⏳" },
    { id: 5, stage: "Visa stamped & passport returned",  substage: "Passport returned to applicant with visa stamp",      refundStatus: "No Refund",           refundType: "none",    reason: "Service fully completed",                        icon: "✅" },
    { id: 6, stage: "Visa rejected by embassy",          substage: "Passport returned without visa stamp",                refundStatus: "Atlys Fee Refunded",  refundType: "partial", reason: "Atlys fee returned; embassy fee non-refundable", icon: "❌" },
  ],
};

// ─── 10 Reviews ──────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  { id: 1,  initials: "RM", name: "Rahul Mehta",      date: "23 Dec 2024",  location: "Mumbai",     rating: 5, tag: "e-visa",        review: "My visa could not be processed due to an ETA delay, and Atlys handled the refund very smoothly. The support team explained the reason clearly and refunded the Atlys fee without unnecessary back and forth." },
  { id: 2,  initials: "NA", name: "Neha Agarwal",     date: "8 Nov 2024",   location: "Bengaluru",  rating: 5, tag: "Schengen",      review: "Even though my visa didn't go through because of external factors, Atlys processed my eligible refund exactly as promised. Communication was clear, timelines were reasonable, and I felt supported throughout." },
  { id: 3,  initials: "KR", name: "Karthik Reddy",    date: "15 Oct 2024",  location: "Hyderabad",  rating: 5, tag: "United States", review: "I was worried when my application couldn't move forward, but Atlys made the refund experience stress-free. They reviewed my case properly and refunded the applicable amount without pushing me to follow up multiple times." },
  { id: 4,  initials: "PS", name: "Pooja Singh",      date: "2 Jan 2025",   location: "Delhi",      rating: 5, tag: "Passport",      review: "What I appreciated most was the clarity around refunds. When my application was affected by a processing issue, Atlys proactively guided me through the refund steps and issued the refund as per their policy." },
  { id: 5,  initials: "VC", name: "Vikas Choudhary",  date: "19 Sep 2024",  location: "Pune",       rating: 5, tag: "e-visa",        review: "The refund process with Atlys felt professional and well-managed. Since the issue was not from my side, the Atlys fee was refunded smoothly, which really helped build trust in their service." },
  { id: 6,  initials: "MT", name: "Michael Thompson", date: "6 Dec 2024",   location: "London",     rating: 5, tag: "Schengen",      review: "Even though my visa application could not be completed, Atlys handled the refund in a very organized way. Their team reviewed eligibility clearly and processed the refund without confusion." },
  { id: 7,  initials: "AP", name: "Anjali Patel",     date: "14 Feb 2025",  location: "Ahmedabad",  rating: 5, tag: "Passport",      review: "Atlys was transparent from start to finish. When my passport collection visa got delayed past my travel date, they waived the service fee immediately without me having to chase anyone. Absolutely recommend." },
  { id: 8,  initials: "SR", name: "Siddharth Rao",    date: "30 Jan 2025",  location: "Chennai",    rating: 4, tag: "United States", review: "The refund policy page itself convinced me to trust Atlys before I even applied. When I needed a refund after a US visa rejection, the process was exactly as described — professional and hassle-free." },
  { id: 9,  initials: "LM", name: "Laura Martinez",   date: "11 Mar 2025",  location: "Madrid",     rating: 5, tag: "Schengen",      review: "Applying for a Schengen visa through Atlys was a great experience overall. The refund when my application was rejected was processed quickly and without drama. I will definitely use Atlys again." },
  { id: 10, initials: "DK", name: "Deepak Kumar",     date: "5 Mar 2025",   location: "Jaipur",     rating: 5, tag: "e-visa",        review: "I had never used a visa service before and was nervous about what would happen if something went wrong. Atlys made it very clear upfront what their refund policy was, and when I needed it, they delivered exactly what they promised." },
];