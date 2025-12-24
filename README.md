# NomadOS - AI-Powered Global Mobility Platform

> Your intelligent companion for international relocation. Predict visa success, analyze documents, and prepare for life abroad.

---

## 📑 Table of Contents
1. [Features & Implementation](#features--implementation)
2. [How It Works (User Flow)](#-how-it-works-user-flow)
3. [4 Input Sources](#4-input-sources)
4. [AI Capabilities](#ai-capabilities)
5. [ML Scoring Algorithm](#ml-scoring-algorithm)
6. [Architecture](#architecture)
7. [Tech Stack](#tech-stack)
8. [Quick Start](#quick-start)

---

## Features & Implementation

| Feature | How It Works | File/Service |
|---------|--------------|--------------|
| **Visa Predictor** | Weighted scoring with 10+ factors, confidence bands, improvement suggestions | `src/app/dashboard/visa-predictor/page.tsx` |
| **Visa Timeline** | **[NEW]** Personalized step-by-step roadmap with AI insights based on your profile | `src/app/dashboard/timeline/page.tsx` |
| **Compare Countries** | Side-by-side analysis of 6 countries with AI recommendation | `src/app/dashboard/compare/page.tsx` |
| **Document Scanner** | Upload passport/resume → OCR extracts text → **auto-fills Visa Predictor** | `src/app/api/analyze-document/route.ts` |
| **Culture Guide** | AI chat about workplace, housing, healthcare + SOP/cover letter generation | `src/app/dashboard/culture/page.tsx` |
| **Secure Logic** | All complex scoring logic runs securely on client-side | `src/data/scoring-algorithm.ts` |

---

## 🔄 How It Works (User Flow)

```
+-------------------------------------------------------------+
|  1. UNDERSTAND                                              |
|  --> Read "How It Works" to understand the scoring system   |
+-------------------------------------------------------------+
|  2. PREDICT                                                 |
|  --> Enter details → ML calculates visa success probability |
+-------------------------------------------------------------+
|  3. COMPARE                                                 |
|  --> See all 6 countries ranked by your match percentage    |
+-------------------------------------------------------------+
|  4. SCAN (Optional)                                         |
|  --> Upload passport/resume → OCR auto-fills your profile   |
+-------------------------------------------------------------+
|  5. PLAN                                                    |
|  --> Get personalized step-by-step visa timeline            |
+-------------------------------------------------------------+
|  6. PREPARE                                                 |
|  --> Chat with AI about culture, generate SOP/cover letter  |
+-------------------------------------------------------------+
```

---

## 4 Input Sources

| Input Method | Technology | How It Works |
|--------------|------------|--------------|
| **Manual Entry** | Web Forms | User types profile details (Exp, Degree, Skills) |
| **Passport Scan** | OCR.space API | Extract Name, DOB, Country from ID page |
| **Resume/CV Scan** | Text Analysis | Parse Job Role, Company, Skills from PDF |
| **Cultural Chat** | Gemini AI | User asks Natural Language questions about destination |

---

## AI Capabilities

NomadOS leverages a **Multi-Model AI Approach**:

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Vision AI** | OCR.space | Reads identity documents and resumes |
| **Generative AI** | Google Gemini 1.5 Flash | Powers the Cultural Guide and Document Generator (SOPs) |
| **Predictive ML** | Custom Algorithm | Calculates visa approval probability based on 10+ weighted factors |
| **Personalization** | Dynamic Logic | Adapts the "Visa Timeline" based on inferred user role (e.g. Tech vs Healthcare) |

### Gemini AI Fallbacks

**The app works 100% without API keys.** Every AI feature has a fallback:

| Feature | With Gemini API | Without Gemini (Fallback) |
|---------|-----------------|---------------------------|
| **Cultural Chat** | Real-time AI responses | Pre-written comprehensive responses for 6 countries × 5 topics |
| **SOP Generation** | AI-generated personalized SOP | Template-based SOP with profile data injection |
| **Document OCR** | OCR.space + AI parsing | Demo data mode for instant testing |

> **Core features (visa prediction, country comparison, scoring algorithm, timeline) work fully without any external API.**

---

## ML Scoring Algorithm

Our visa predictor uses a sophisticated weighted scoring system:

### 5.1 Scoring Weights
| Factor | Weight | How It's Scored |
|--------|--------|-----------------|
| Education Level | 25% | PhD (100) → Master's (90) → Bachelor's (75) → Diploma (50) |
| Work Experience | 20% | Graduated scale based on country minimum |
| Language Score | 15% | IELTS bands: 8+ (100), 7 (90), 6.5 (75), 6 (60) |
| Age Bracket | 15% | Points-based countries favor 18-34 age range |
| Job Offer | 15% | Binary but adds 5-25 bonus points |
| Documents | 10% | Passport, health insurance, funds proof |

### 5.2 Bonus Points System
*   **STEM Field**: +5-8 points (Tech, Engineering, AI)
*   **Passport Strength**: +0-5 points (Tier 1 passports)
*   **Local Language**: +5 points (e.g. German for Germany)

---

## Architecture

```
+-------------------------------------------------------------+
|                    NomadOS Platform                         |
+-------------------------------------------------------------+
|  UI Layer (Next.js 15)                                      |
|  [Dashboard] [Predictor] [Timeline] [Culture Chat]          |
+-------------------------------------------------------------+
|  Intelligence Layer                                         |
|  - Gemini Service (Gen AI)                                  |
|  - OCR Service (Vision AI)                                  |
|  - ML Scoring Engine (Predictive Logic)                     |
+-------------------------------------------------------------+
|  Data Layer (Privacy Focused)                               |
|  localStorage - User profile & timeline progress saved      |
|  locally. No PII sent to servers unnecessarily.             |
+-------------------------------------------------------------+
```

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15, React, TypeScript |
| **Styling** | Tailwind CSS, Lucide Icons, Glassmorphism UI |
| **AI Models** | Google Gemini 1.5 Flash (GenAI) |
| **Vision** | OCR.space API (Document Parsing) |
| **Visualization** | Recharts (Spider Charts, Bar Graphs) |
| **State** | React Hooks + LocalStorage Persistence |

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/himanshu-sugha/NomadOs

# 2. Install dependencies
npm install

# 3. Set up API Keys (Optional - Fallbacks included)
# Create .env.local and add:
# GEMINI_API_KEY=your_key
# OCR_SPACE_API_KEY=your_key

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

---

## License

MIT License

---

## Author

Built for **VisaVerse AI Hackathon** by **Himanshu Sugha**
