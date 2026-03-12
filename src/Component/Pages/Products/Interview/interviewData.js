// ─── INTERVIEW QUESTIONS ──────────────────────────────────────────────────────
import { UserSearch, Mic2, BadgeCheck,Users, } from 'lucide-react';

export const interviewQuestions = [
  {
    id: 1,
    category: "Purpose of Travel",
    question: "Good morning. What is the purpose of your visit to the United States?",
    hint: "Be clear and concise about your travel purpose - tourism, business, or visiting family/friends.",
  },
  {
    id: 2,
    category: "Duration & Itinerary",
    question: "How long do you intend to stay in the United States, and what are your travel plans?",
    hint: "Mention specific cities, duration, and activities you plan to do.",
  },
  {
    id: 3,
    category: "Financial Support",
    question: "Who will be funding your trip to the United States, and what is your estimated budget?",
    hint: "Clearly explain your funding source - personal savings, employer, or sponsor.",
  },
  {
    id: 4,
    category: "Employment & Ties",
    question: "What is your current occupation, and are you presently employed?",
    hint: "Provide details about your job title, employer, and how long you've been employed.",
  },
  {
    id: 5,
    category: "Ties to Home Country",
    question: "What ties do you have to your home country that would ensure your return after your visit?",
    hint: "Mention family, property, job, or business that requires you to return home.",
  },
  {
    id: 6,
    category: "Prior Travel History",
    question: "Have you traveled to the United States or any other country previously?",
    hint: "Mention previous visa approvals, countries visited, and compliance with visa terms.",
  },
  {
    id: 7,
    category: "US Contacts",
    question: "Do you have any relatives or close friends currently residing in the United States?",
    hint: "Be honest about any US contacts - their relationship, immigration status, and location.",
  },
  {
    id: 8,
    category: "Immigration Intent",
    question: "Do you intend to seek employment or change your status while in the United States?",
    hint: "Clearly state you will only be in the US temporarily with no intention to work or immigrate.",
  },
  {
    id: 9,
    category: "Documentation",
    question: "Can you briefly describe the supporting documents you have brought for your visa application?",
    hint: "Mention bank statements, employment letter, property documents, and your travel itinerary.",
  },
  {
    id: 10,
    category: "DS-160 Consistency",
    question: "Is all information provided in your DS-160 form still accurate and current?",
    hint: "Confirm accuracy and mention if any significant details have changed since submission.",
  },
];

// ─── VOICE CONFIGURATION ──────────────────────────────────────────────────────
export const voiceConfig = {
  male: {
    name: "Officer James Mitchell",
    pitch: 0.85,
    rate: 0.82,
    gender: "male",
    badge: "Senior Consular Officer",
    avatar: <Users size={32} strokeWidth={1.5} />,
    avatarBg: "linear-gradient(135deg, #1e3a5f, #2d5a8e)",
    accentColor: "#4f8ef7",
    preferredVoiceNames: ["male", "david", "mark", "daniel", "alex"],
  },
  female: {
    name: "Officer Sarah Williams",
    pitch: 1.15,
    rate: 0.82,
    gender: "female",
    badge: "Consular Officer",
    avatar: <Users size={32} strokeWidth={1.5} />,
    avatarBg: "linear-gradient(135deg, #3b1f5e, #6b3fa0)",
    accentColor: "#a78bfa",
    preferredVoiceNames: ["samantha", "karen", "victoria", "female", "zira", "susan"],
  },
};


// ─── IMPROVEMENT TIPS ─────────────────────────────────────────────────────────
export const improvementTips = [
  {
    tip: "Keep answers concise",
    detail: "Most answers should be 2-3 sentences. Avoid over-explaining or going off-topic.",
  },
  {
    tip: "Show strong ties to home",
    detail: "Always connect your answer back to why you will return — job, family, property.",
  },
  {
    tip: "Be consistent with DS-160",
    detail: "Your verbal answers must align with your DS-160 form. Review it before your actual interview.",
  },
  {
    tip: "Maintain confident posture",
    detail: "Speak clearly, maintain eye contact, and don't hesitate on straightforward questions.",
  },
];

// ─── LANDING PAGE STATS ───────────────────────────────────────────────────────
export const landingStats = [
  { icon: "🎯", value: "94%", label: "Success Rate" },
  { icon: "❓", value: "10+", label: "Real Questions" },
  { icon: "🎙️", value: "2",   label: "AI Voice Officers" },
  { icon: "📊", value: "Live", label: "AI Feedback" },
];

// ─── HOW IT WORKS STEPS ───────────────────────────────────────────────────────
export const howItWorksSteps = [
  {
    step: "01",
    icon: <UserSearch size={22} strokeWidth={1.8} color="#818cf8" />,
    title: "Choose Your Officer",
    desc: "Select a male or female AI Consular Officer tailored to your visa application type.",
  },
  {
    step: "02",
    icon: <Mic2 size={22} strokeWidth={1.8} color="#f472b6" />,
    title: "Speak Naturally",
    desc: "Answer questions out loud just like a real interview. Our AI listens and responds in real time.",
  },
  {
    step: "03",
    icon: <BadgeCheck size={22} strokeWidth={1.8} color="#2dd4bf" />,
    title: "Get Feedback",
    desc: "Receive a detailed scorecard with tips to strengthen your answers and boost your confidence.",
  },
];

// ─── SETUP PANEL INFO ─────────────────────────────────────────────────────────
export const setupInfo = [
  { icon: "🎯", text: "10 Real Questions" },
  { icon: "⏱️", text: "60s Per Answer" },
  { icon: "🤖", text: "AI Scoring" },
];

// ─── SCORE CATEGORIES ─────────────────────────────────────────────────────────
export const scoreCategories = [
  { key: "clarity",     label: "Answer Clarity",   color: "#4f8ef7" },
  { key: "confidence",  label: "Confidence",        color: "#a78bfa" },
  { key: "consistency", label: "Consistency",       color: "#22c55e" },
  { key: "relevance",   label: "Relevance",         color: "#f59e0b" },
];