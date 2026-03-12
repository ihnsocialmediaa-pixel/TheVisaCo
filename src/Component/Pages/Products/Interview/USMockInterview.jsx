import { useState, useEffect, useRef, useCallback } from "react";
import "./styles.css";
import {
  interviewQuestions,
  voiceConfig,
  improvementTips,
  howItWorksSteps,
  scoreCategories,
} from "./interviewData.js";
import { ArrowLeft, Landmark, Mic, Clock, ShieldCheck } from 'lucide-react';


// ─── AOS HOOK ──────────────────────────────────────────────────────────────────
function useAOS() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("AIaos-animate");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll("[data-aos]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── VOICE WAVE COMPONENT ─────────────────────────────────────────────────────
function VoiceWave({ active, color = "#4f8ef7" }) {
  return (
    <div className="AIvoice-wave">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="AIvoice-wave__bar"
          style={{
            background: color,
            opacity: active ? 1 : 0.3,
            animation: active
              ? `AIwave ${0.8 + i * 0.1}s ease-in-out infinite alternate`
              : "none",
            animationDelay: `${i * 0.1}s`,
            height: active ? `${16 + Math.sin(i) * 14}px` : "6px",
          }}
        />
      ))}
    </div>
  );
}

// ─── SCORE RING COMPONENT ─────────────────────────────────────────────────────
function ScoreRing({ score, label, color }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="AIscore-ring">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <circle
          cx="45" cy="45" r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          style={{ transition: "stroke-dasharray 1.2s ease" }}
        />
        <text x="45" y="50" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="'DM Sans', sans-serif">
          {score}%
        </text>
      </svg>
      <span className="AIscore-ring__label">{label}</span>
    </div>
  );
}

// ─── AI EVALUATION HELPER ─────────────────────────────────────────────────────
async function evaluateAnswersWithAI(answers) {
  const prompt = `You are a strict but fair US Embassy Consular Officer evaluating B1/B2 visa interview answers.

For each of the following interview question-answer pairs, you must:
1. Generate the IDEAL answer a visa applicant should give
2. Compare the applicant's actual answer to the ideal answer
3. Score the answer from 0 to 100 based on how close it is to the ideal
4. Write a short remark (1-2 sentences) about the actual answer

Also compute four aggregate scores (0-100) for:
- clarity: how clearly the applicant communicated overall
- confidence: how confident the answers sounded overall
- consistency: how internally consistent the answers were overall
- relevance: how relevant and on-topic the answers were overall

Return ONLY a valid JSON object in this exact format (no markdown, no extra text):
{
  "evaluations": [
    {
      "questionId": <number>,
      "idealAnswer": "<string>",
      "score": <number 0-100>,
      "remark": "<string>"
    }
  ],
  "scores": {
    "clarity": <number 0-100>,
    "confidence": <number 0-100>,
    "consistency": <number 0-100>,
    "relevance": <number 0-100>
  }
}

Here are the question-answer pairs to evaluate:
${answers
  .map((a) => {
    const q = interviewQuestions.find((q) => q.id === a.questionId);
    return `Question ${a.questionId} [${q?.category}]: "${q?.question}"
Applicant answered: "${a.answer}"`;
  })
  .join("\n\n")}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const text = data.content.map((i) => i.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── LANDING SCREEN ───────────────────────────────────────────────────────────
function LandingScreen({ onStart }) {
  useAOS();
  return (
    <div className="AIpage">
      <div className="AIorb AIorb-1" />
      <div className="AIorb AIorb-2" />
      <div className="AIorb AIorb-3" />

      <div className="AIlanding__container">
        {/* Hero */}
        <div className="AIlanding__hero">
          <h1 data-aos="fade-up" data-aos-delay="100" className="AIlanding__h1">
            Ace Your{" "}
            <span className="AIlanding__h1-highlight">US Visa</span>
            <br />Interview with AI
          </h1>

          <div data-aos="fade-up" data-aos-delay="300" className="AIlanding__cta">
            <button className="AIbtn AIbtn-primary" onClick={onStart}>
              Start Free Interview
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="AIsection">
          <div data-aos="fade-up" className="AIsection__header">
            <h2 className="AIsection__h2">How It Works</h2>
            <p className="AIsection__sub">Three simple steps to a confident visa interview</p>
          </div>

          <div className="AIsteps-grid">
            {howItWorksSteps.map((item, i) => (
              <div key={i} className="AIstep-card AIglass-strong" data-aos="fade-up" data-aos-delay={`${i * 150}`}>
                <div className="AIstep-card__bg-num">{item.step}</div>
                <div className="AIstep-card__icon-wrap">{item.icon}</div>
                <div className="AIstep-card__num">Step {item.step}</div>
                <div className="AIstep-card__title">{item.title}</div>
                <div className="AIstep-card__desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Questions Preview */}
        <div className="AIsections">
          <div data-aos="fade-up" className="AIsection__header">
            <h2 className="AIsection__h2">Sample Interview Questions</h2>
            <p className="AIsection__sub">Real questions asked at US visa interviews</p>
          </div>

          <div className="AIquestions-grid">
            {interviewQuestions.slice(0, 6).map((q, i) => (
              <div key={q.id} className="AIquestion-preview-card AIglass" data-aos="fade-up" data-aos-delay={`${(i % 3) * 100}`}>
                <div className="AIquestion-preview-card__num">{q.id}</div>
                <div>
                  <div className="AIquestion-preview-card__cat">{q.category}</div>
                  <div className="AIquestion-preview-card__text">{q.question}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="AIfooter">
        <p className="AIfooter__text">US Visa Mock Interview • AI-Powered Preparation Tool</p>
      </footer>
    </div>
  );
}

// ─── SETUP SCREEN ─────────────────────────────────────────────────────────────
function SetupScreen({ selectedVoice, onSelectVoice, onBack, onBegin }) {
  return (
    <div className="AIpage AIpage-center">
      <div className="AIorb AIorb-1" />
      <div className="AIorb AIorb-2" />

      <div className="AIsetup-wrapper">
        <button className="AIsetup-back-btn" onClick={onBack}>
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back
        </button>

        <div className="AIsetup-card AIglass-strong">
          <div className="AIsetup-card__header">
            <div className="AIsetup-card__icon-wrap">
              <Landmark size={28} color="#818cf8" strokeWidth={1.8} />
            </div>
            <h2 className="AIsetup-card__h2">Select Your Interviewing Officer</h2>
            <p className="AIsetup-card__sub">Choose between our male and female AI Consular Officers</p>
          </div>

          <div className="AIvoice-cards-grid">
            {Object.entries(voiceConfig).map(([key, cfg]) => (
              <div
                key={key}
                className={`AIvoice-card ${selectedVoice === key ? "AIselected" : ""}`}
                onClick={() => onSelectVoice(key)}
              >
                <div className="AIvoice-card__avatar">{cfg.avatar}</div>
                <div className="AIvoice-card__name">{cfg.name}</div>
                <div className="AIvoice-card__badge">{cfg.badge.toUpperCase()}</div>
                {selectedVoice === key && (
                  <div className="AIvoice-card__selected-pill">
                    <span className="AIvoice-card__selected-dot" />
                    <span className="AIvoice-card__selected-text">Selected</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="AIsetup-info-bar AIglass">
            <div className="AIsetup-info-item">
              <div className="AIsetup-info-item__icon-wrap">
                <Clock size={14} color="#818cf8" strokeWidth={2} />
              </div>
              <span className="AIsetup-info-item__text">~15 min session</span>
            </div>
            <div className="AIsetup-info-item">
              <div className="AIsetup-info-item__icon-wrap">
                <ShieldCheck size={14} color="#818cf8" strokeWidth={2} />
              </div>
              <span className="AIsetup-info-item__text">Private & secure</span>
            </div>
            <div className="AIsetup-info-item">
              <div className="AIsetup-info-item__icon-wrap">
                <Mic size={14} color="#818cf8" strokeWidth={2} />
              </div>
              <span className="AIsetup-info-item__text">Voice powered</span>
            </div>
          </div>

          <button
            className="AIbtn AIbtn-primary AIbtn-full"
            style={{ fontSize: 16, padding: "16px" }}
            onClick={onBegin}
          >
            Begin Interview with {voiceConfig[selectedVoice].name} →
          </button>

          <p className="AIsetup-note">
            <Mic size={11} color="rgba(255,255,255,0.25)" />
            Ensure your microphone is enabled for best experience
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── INTERVIEW SCREEN ─────────────────────────────────────────────────────────
function InterviewScreen({ selectedVoice, currentQ, isAISpeaking, isListening, transcript, timer, questionPhase, onNext, onBack }) {
  const progress = (currentQ / interviewQuestions.length) * 100;
  const question = interviewQuestions[currentQ];

  return (
    <div className="AIpage AIpage-center" style={{ flexDirection: "column" }}>
      <div className="AIorb AIorb-1" />
      <div className="AIorb AIorb-2" />

      <div className="AIinterview-wrapper">
        <button className="AIinterview-back-btn" onClick={onBack}>
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back
        </button>

        <div className="AIinterview-header">
          <div className="AIinterview-header__left">
            <div className="AIinterview-header__flag">🇺🇸</div>
            <div>
              <div className="AIinterview-header__title">US Embassy Mock Interview</div>
              <div className="AIinterview-header__sub">B1/B2 Visa Assessment</div>
            </div>
          </div>
          <div className="AIinterview-header__counter AIglass">
            <span className="AIinterview-header__counter-label">Question</span>
            <span className="AIinterview-header__counter-num">{Math.min(currentQ + 1, interviewQuestions.length)}</span>
            <span className="AIinterview-header__counter-sep">/</span>
            <span className="AIinterview-header__counter-total">{interviewQuestions.length}</span>
          </div>
        </div>

        <div className="AIprogress-bar">
          <div className="AIprogress-bar__fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="AIofficer-panel AIglass-strong">
          <div className="AIofficer-panel__identity">
            <div className={`AIofficer-panel__avatar ${isAISpeaking ? "AIspeaking" : "AIidle"}`}>
              {voiceConfig[selectedVoice].avatar}
            </div>
            <div className="AIofficer-panel__info">
              <div className="AIofficer-panel__name">{voiceConfig[selectedVoice].name}</div>
              <div className="AIofficer-panel__status">
                <span className="AIofficer-panel__status-dot" style={{ background: isAISpeaking ? "#4f8ef7" : "#22c55e" }} />
                <span className="AIofficer-panel__status-text">
                  {isAISpeaking ? "Speaking..." : questionPhase === "listening" ? "Listening to you" : "Ready"}
                </span>
              </div>
            </div>
          </div>

          <VoiceWave active={isAISpeaking} color="#4f8ef7" />

          <div className="AIofficer-panel__question-wrap">
            <div className="AIofficer-panel__category">{question?.category}</div>
            <p className="AIofficer-panel__question">{question?.question}</p>
            <div className="AIofficer-panel__hint">
              <span className="AIofficer-panel__hint-icon">💡</span>
              <span className="AIofficer-panel__hint-text">{question?.hint}</span>
            </div>
          </div>
        </div>

        <div className="AIresponse-panel AIglass-strong">
          <div className="AIresponse-panel__header">
            <div className="AIresponse-panel__mic-wrap">
              <div className={`AIresponse-panel__mic-btn ${isListening ? "AIlistening" : "AIidle"}`}>🎙️</div>
              <span className={`AIresponse-panel__mic-label ${isListening ? "AIlistening" : "AIidle"}`}>
                {isListening ? "Recording your answer..." : questionPhase === "speaking" ? "Please wait..." : "Microphone standby"}
              </span>
            </div>

            {questionPhase === "listening" && (
              <div className="AIresponse-panel__timer">
                <span className="AIresponse-panel__timer-icon" style={{ color: timer <= 10 ? "#ef4444" : "rgba(255,255,255,0.5)" }}>⏱</span>
                <span className={`AIresponse-panel__timer-count ${timer <= 10 ? "AIdanger" : "AInormal"}`}>{timer}s</span>
              </div>
            )}
          </div>

          <VoiceWave active={isListening} color="#22c55e" />

          <div className="AIresponse-panel__transcript">
            {transcript ? (
              <p className="AIresponse-panel__transcript-text">{transcript}</p>
            ) : (
              <p className="AIresponse-panel__transcript-placeholder">
                {questionPhase === "listening" ? "Speak now — your answer will appear here..." : "Waiting for the question to finish..."}
              </p>
            )}
          </div>

          {questionPhase === "listening" && (
            <button className="AIbtn AIbtn-primary AIbtn-full" style={{ marginTop: 16 }} onClick={onNext}>
              Submit Answer & Continue →
            </button>
          )}
        </div>

        <div className="AIquestion-dots">
          {interviewQuestions.map((_, i) => (
            <div key={i} className={`AIquestion-dot ${i < currentQ ? "AIdone" : i === currentQ ? "AIcurrent" : "AIpending"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ANALYZING SCREEN ─────────────────────────────────────────────────────────
function AnalyzingScreen() {
  return (
    <div className="AIpage">
      <div className="AIorb AIorb-1" />
      <div className="AIorb AIorb-2" />
      <div className="AIanalyzing-wrapper">
        <div className="AIanalyzing-spinner" />
        <div className="AIanalyzing-title">Analyzing Your Interview</div>
        <div className="AIanalyzing-sub">
          Our AI is generating ideal answers and evaluating your responses. This takes a few seconds…
        </div>
        <div className="AIanalyzing-shimmer" />
      </div>
    </div>
  );
}

// ─── RESULTS SCREEN ───────────────────────────────────────────────────────────
function ResultsScreen({ selectedVoice, answers, aiResult, onRetake, onHome }) {
  useAOS();

  const scores = aiResult?.scores || {};
  const evaluations = aiResult?.evaluations || [];

  const overall = scores && Object.values(scores).length > 0
    ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
    : Math.round(evaluations.reduce((sum, e) => sum + (e.score || 0), 0) / Math.max(evaluations.length, 1));

  const pillClass = overall >= 80 ? "AIgood" : overall >= 65 ? "AIaverage" : "AIpoor";
  const pillLabel = overall >= 80 ? "Likely to be Approved" : overall >= 65 ? "Needs Improvement" : "Requires Significant Work";
  const pillEmoji = overall >= 80 ? "🟢" : overall >= 65 ? "🟡" : "🔴";

  const getScoreClass = (score) => score >= 75 ? "AIgood" : score >= 55 ? "AIaverage" : "AIpoor";

  return (
    <div className="AIpage">
      <div className="AIorb AIorb-1" />
      <div className="AIorb AIorb-2" />

      <div className="AIresults-wrapper">
        <div data-aos="fade-up" className="AIresults-header">
          <span className="AIresults-header__emoji">🎉</span>
          <h2 className="AIresults-header__h2">Interview Complete!</h2>
          <p className="AIresults-header__sub">
            Here is your AI-powered performance analysis — {voiceConfig[selectedVoice].name} has assessed your responses
          </p>
        </div>

        {/* Overall Score */}
        <div data-aos="zoom-in" className="AIoverall-score-card AIglass-strong">
          <div className={`AIoverall-score-card__pill ${pillClass}`}>
            <span>{pillEmoji}</span>
            <span className={`AIoverall-score-card__pill-text ${pillClass}`}>{pillLabel}</span>
          </div>
          <div className="AIoverall-score-card__number">{overall}<span>%</span></div>
          <div className="AIoverall-score-card__label">Overall Interview Score</div>
        </div>

        {/* Score Breakdown */}
        <div data-aos="fade-up" data-aos-delay="100" className="AIscore-breakdown-card AIglass-strong">
          <h3 className="AIscore-breakdown-card__title">Performance Breakdown</h3>
          <div className="AIscore-rings-grid">
            {scoreCategories.map((cat) => (
              <ScoreRing key={cat.key} score={scores[cat.key] ?? 0} label={cat.label} color={cat.color} />
            ))}
          </div>
        </div>

        {/* Answer Review with AI Evaluations */}
        <div data-aos="fade-up" data-aos-delay="200" className="AIanswer-review-card AIglass-strong">
          <h3 className="AIanswer-review-card__title">Your Answers & AI Evaluation</h3>
          <div className="AIanswer-list">
            {interviewQuestions.map((q, i) => {
              const evalData = evaluations.find((e) => e.questionId === q.id);
              const answerText = answers[i]?.answer || "Not answered";
              const score = evalData?.score ?? null;
              const scoreClass = score !== null ? getScoreClass(score) : "AIaverage";

              return (
                <div key={q.id} className="AIanswer-item AIglass">
                  <div className="AIanswer-item__inner">
                    <div className="AIanswer-item__num">{q.id}</div>
                    <div style={{ flex: 1 }}>
                      <div className="AIanswer-item__cat">{q.category}</div>
                      <div className="AIanswer-item__question">{q.question}</div>

                      {/* User's actual answer */}
                      <div
                        className="AIanswer-item__answer"
                        style={{ fontStyle: answerText.includes("No answer") ? "italic" : "normal" }}
                      >
                        {answerText}
                      </div>

                      {/* AI Evaluation Block */}
                      {evalData && (
                        <div
                          className="AIanswer-item__eval"
                          style={{
                            background: score >= 75
                              ? "rgba(34,197,94,0.05)"
                              : score >= 55
                              ? "rgba(245,158,11,0.05)"
                              : "rgba(239,68,68,0.05)",
                          }}
                        >
                          <div className="AIanswer-item__eval-header">
                            <span className="AIanswer-item__eval-label">🤖 AI Evaluation</span>
                            {score !== null && (
                              <span className={`AIanswer-item__eval-score ${scoreClass}`}>
                                {score}/100
                              </span>
                            )}
                          </div>

                          {evalData.idealAnswer && (
                            <div className="AIanswer-item__eval-ideal">
                              <strong>Ideal answer:</strong> {evalData.idealAnswer}
                            </div>
                          )}

                          {evalData.remark && (
                            <div className="AIanswer-item__eval-remark">"{evalData.remark}"</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div data-aos="fade-up" data-aos-delay="300" className="AItips-card AIglass-strong">
          <h3 className="AItips-card__title">💡 Key Improvement Tips</h3>
          <div className="AItips-list">
            {improvementTips.map((item, i) => (
              <div key={i} className="AItip-item">
                <span className="AItip-item__check">✓</span>
                <div>
                  <div className="AItip-item__title">{item.tip}</div>
                  <div className="AItip-item__detail">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="AIresults-cta">
          <button className="AIbtn AIbtn-primary" onClick={onRetake}>🔄 Retake Interview</button>
          <button className="AIbtn AIbtn-ghost" onClick={onHome}>← Back to Home</button>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function USMockInterview() {
  const [screen, setScreen] = useState("landing");
  const [selectedVoice, setSelectedVoice] = useState("female");
  const [currentQ, setCurrentQ] = useState(0);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(60);
  const [questionPhase, setQuestionPhase] = useState("idle");
  const [aiResult, setAiResult] = useState(null);

  const synthRef = useRef(window.speechSynthesis);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const transcriptRef = useRef("");

  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // Setup Speech Recognition once
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      const recog = new SR();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = "en-US";
      recog.onresult = (e) => {
        let text = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          text += e.results[i][0].transcript;
        }
        setTranscript(text);
      };
      recog.onend = () => setIsListening(false);
      recognitionRef.current = recog;
    }
    return () => {
      synthRef.current.cancel();
      clearInterval(timerRef.current);
    };
  }, []);

  // Speak utility
  const speak = useCallback(
    (text, onEnd) => {
      synthRef.current.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      const voices = synthRef.current.getVoices();
      const cfg = voiceConfig[selectedVoice];
      const preferred = cfg.preferredVoiceNames;
      const match =
        voices.find((v) => preferred.some((p) => v.name.toLowerCase().includes(p))) ||
        voices.find((v) => v.lang.startsWith("en-US")) ||
        voices[0];

      if (match) utter.voice = match;
      utter.pitch = cfg.pitch;
      utter.rate = cfg.rate;
      utter.volume = 1;
      utter.onstart = () => setIsAISpeaking(true);
      utter.onend = () => {
        setIsAISpeaking(false);
        if (onEnd) onEnd();
      };
      synthRef.current.speak(utter);
    },
    [selectedVoice]
  );

  // Finish interview — call AI evaluation
  const finishInterview = useCallback(
    async (finalAnswers) => {
      setScreen("analyzing");
      try {
        const result = await evaluateAnswersWithAI(finalAnswers);
        setAiResult(result);
      } catch (err) {
        console.error("AI evaluation failed:", err);
        setAiResult({
          evaluations: finalAnswers.map((a) => ({
            questionId: a.questionId,
            idealAnswer: "A clear, concise, and honest answer demonstrating strong ties to home country.",
            score: Math.floor(Math.random() * 30 + 60),
            remark: "Answer recorded. AI evaluation unavailable — please retry.",
          })),
          scores: {
            clarity: Math.floor(Math.random() * 20 + 70),
            confidence: Math.floor(Math.random() * 20 + 65),
            consistency: Math.floor(Math.random() * 15 + 72),
            relevance: Math.floor(Math.random() * 20 + 68),
          },
        });
      }
      setScreen("results");
    },
    []
  );

  // Ask a question at a given index
  const askQuestion = useCallback(
    (index, currentAnswers) => {
      if (index >= interviewQuestions.length) {
        setQuestionPhase("done");
        speak(
          "Thank you for your time. Your interview has been completed. Please wait while we analyze your responses.",
          () => setTimeout(() => finishInterview(currentAnswers), 500)
        );
        return;
      }
      setCurrentQ(index);
      setTranscript("");
      transcriptRef.current = "";
      setQuestionPhase("speaking");
      setTimer(60);

      speak(interviewQuestions[index].question, () => {
        setQuestionPhase("listening");
        setIsListening(true);
        if (recognitionRef.current) {
          try { recognitionRef.current.start(); } catch (_) {}
        }
        timerRef.current = setInterval(() => {
          setTimer((t) => {
            if (t <= 1) {
              clearInterval(timerRef.current);
              const savedAnswer = transcriptRef.current || "(No answer provided)";
              const newAnswers = [...currentAnswers, { questionId: interviewQuestions[index].id, answer: savedAnswer }];
              setAnswers(newAnswers);
              setIsListening(false);
              if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (_) {}
              }
              setQuestionPhase("idle");
              setTimeout(() => askQuestion(index + 1, newAnswers), 1200);
              return 0;
            }
            return t - 1;
          });
        }, 1000);
      });
    },
    [speak, finishInterview]
  );

  // Manual "next" button handler
  const handleNext = useCallback(() => {
    clearInterval(timerRef.current);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
    }
    setIsListening(false);
    setQuestionPhase("idle");
    const savedAnswer = transcriptRef.current || "(No answer provided)";
    setAnswers((prev) => {
      const newAnswers = [...prev, { questionId: interviewQuestions[currentQ].id, answer: savedAnswer }];
      setTimeout(() => askQuestion(currentQ + 1, newAnswers), 1200);
      return newAnswers;
    });
  }, [currentQ, askQuestion]);

  // Start the full interview
  const startInterview = useCallback(() => {
    setScreen("interview");
    setCurrentQ(0);
    setAnswers([]);
    setAiResult(null);
    setTranscript("");
    transcriptRef.current = "";
    setTimeout(() => {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? "morning" : "afternoon";
      const cfg = voiceConfig[selectedVoice];
      const intro = `Good ${greeting}. I am ${cfg.name}, a ${cfg.badge} at the United States Embassy. Please have a seat. I'll be conducting your visa interview today. Please answer all questions clearly and honestly. Let's begin.`;
      speak(intro, () => setTimeout(() => askQuestion(0, []), 800));
    }, 500);
  }, [selectedVoice, speak, askQuestion]);

  const handleRetake = () => {
    synthRef.current.cancel();
    setScreen("setup");
  };

  const handleHome = () => {
    synthRef.current.cancel();
    setScreen("landing");
  };

  // ─── SCREEN ROUTING ──────────────────────────────────────────────────────
  if (screen === "landing") return <LandingScreen onStart={() => setScreen("setup")} />;

  if (screen === "setup")
    return (
      <SetupScreen
        selectedVoice={selectedVoice}
        onSelectVoice={setSelectedVoice}
        onBack={() => setScreen("landing")}
        onBegin={startInterview}
      />
    );

  if (screen === "interview")
    return (
      <InterviewScreen
        selectedVoice={selectedVoice}
        currentQ={currentQ}
        isAISpeaking={isAISpeaking}
        isListening={isListening}
        transcript={transcript}
        timer={timer}
        questionPhase={questionPhase}
        onNext={handleNext}
        onBack={() => setScreen("landing")}
      />
    );

  if (screen === "analyzing") return <AnalyzingScreen />;

  if (screen === "results")
    return (
      <ResultsScreen
        selectedVoice={selectedVoice}
        answers={answers}
        aiResult={aiResult}
        onRetake={handleRetake}
        onHome={handleHome}
      />
    );

  return null;
}