# NomadOS - AI-Powered Global Mobility Platform

> Your intelligent companion for international relocation. Predict visa success, analyze documents, and prepare for life abroad.

---

## 1. What is NomadOS?

NomadOS is an **AI-powered global mobility platform** that:

1. **Predicts visa success** using ML-powered scoring algorithm
2. **Extracts document data** with OCR.space Vision AI
3. **Compares countries** with side-by-side visa analysis
4. **Prepares you culturally** with Gemini AI coaching
5. **Generates documents** like SOP and cover letters automatically

---

## 2. Problem Statement

Moving to a new country is one of the most complex decisions a person can make. Millions of skilled workers, students, and professionals face:

| Problem | Impact |
|---------|--------|
| **Uncertainty** | No way to know visa approval chances before applying |
| **Information Overload** | Visa requirements spread across hundreds of government pages |
| **Wasted Applications** | People apply to countries where they have low success probability |
| **Cultural Blindness** | Professionals fail abroad due to cultural misunderstandings |
| **Document Confusion** | Unclear what documents are needed and how to prepare them |

**The Cost:**
- Average visa application costs $500-2000
- Rejection rate for many skilled visas is 30-40%
- Professionals lose months of time on unsuccessful applications

**NomadOS solves this** by using AI to analyze your profile, predict your success probability, and prepare you for life abroad before you spend money on applications.

---

## 3. Features & Implementation

| Feature | How It Works | File/Service |
|---------|--------------|--------------|
| **Visa Success Predictor** | Weighted scoring with 10+ factors (age, education, experience, field, language) | `src/app/dashboard/visa-predictor/page.tsx` |
| **Document Vision AI** | Upload passport/resume → OCR extracts text → AI structures data | `src/app/api/analyze-document/route.ts` |
| **Country Comparison** | Side-by-side analysis of 6 countries with exportable reports | `src/app/dashboard/compare/page.tsx` |
| **Cultural Sync AI** | Real-time Q&A about workplace, housing, healthcare, etiquette | `src/app/api/chat/route.ts` |
| **SOP Generator** | AI creates personalized Statement of Purpose from profile | `src/app/api/generate-document/route.ts` |
| **Cover Letter Generator** | Professional cover letters tailored to destination country | `src/app/api/generate-document/route.ts` |

---

## 4. How It Works (User Flow)

```
+-------------------------------------------------------------+
|  1. UNDERSTAND                                              |
|  --> Read "How It Works" to understand the scoring system   |
+-------------------------------------------------------------+
|  2. UPLOAD (Optional)                                       |
|  --> Upload passport/resume → OCR extracts your profile     |
+-------------------------------------------------------------+
|  3. PREDICT                                                 |
|  --> Enter details → ML calculates visa success probability |
+-------------------------------------------------------------+
|  4. COMPARE                                                 |
|  --> See all 6 countries ranked by your match percentage    |
+-------------------------------------------------------------+
|  5. PREPARE                                                 |
|  --> Chat with AI about culture, generate SOP/cover letter  |
+-------------------------------------------------------------+
```

---

## 5. ML Scoring Algorithm

Our visa predictor uses a sophisticated weighted scoring system with multiple factors:

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
| Factor | Bonus | Details |
|--------|-------|---------|
| STEM Field | +5 to +8 | Technology, Engineering, Healthcare, AI, Data Science |
| Finance Field | +3 to +6 | Banking, Consulting (higher in UAE/Singapore) |
| Passport Strength | +0 to +5 | Tier 1 passports (USA, UK, Germany, Japan) get full bonus |
| Local Language | +5 | French for Canada, German for Germany |
| Relatives in Country | +3 | Shows integration potential |
| PhD Holder | +5 | Additional boost for doctoral degree |
| 10+ Years Experience | +5 | Expertise recognition |

### 5.3 Penalty Factors
| Factor | Penalty | Details |
|--------|---------|---------|
| Previous Visa Rejection | -10 | Significant negative signal |

**Formula:** `Final Score = Σ(Weight × MatchPercentage) + BonusPoints - Penalties`

---

## 6. AI Capabilities (Gemini)

| Method | Purpose | Endpoint |
|--------|---------|----------|
| Cultural Chat | Real-time Q&A about destination culture | `/api/chat` |
| SOP Generation | Create Statement of Purpose from profile | `/api/generate-document` |
| Cover Letter | Professional cover letter generation | `/api/generate-document` |
| Document Analysis | Parse OCR text into structured data | `/api/analyze-document` |

---

## 7. Fallback System

**The app works 100% without API keys.** Every AI feature has a fallback:

| Feature | With Gemini API | Without Gemini (Fallback) |
|---------|-----------------|---------------------------|
| **Cultural Chat** | Real-time AI responses | Pre-written comprehensive responses for 6 countries × 5 topics |
| **SOP Generation** | AI-generated personalized SOP | Template-based SOP with profile data injection |
| **Cover Letter** | AI-generated cover letter | Template-based cover letter |
| **Document OCR** | OCR.space + AI parsing | Demo data for demonstration |
| **Visa Predictor** | N/A (no API needed) | Full ML algorithm runs client-side |
| **Country Comparison** | N/A (no API needed) | Full scoring runs client-side |

> **Core features (visa prediction, country comparison, scoring algorithm) work fully without any external API.**

---

## 8. Architecture

```
+-------------------------------------------------------------+
|                    NomadOS Frontend                         |
|                     (Next.js 15)                            |
+-------------------------------------------------------------+
|  UI Layer                                                   |
|  [How It Works] [Documents] [Visa Predictor] [Compare]      |
|  [Culture Guide]                                            |
+-------------------------------------------------------------+
|  AI Layer                                                   |
|  +------------+  +------------+  +------------+             |
|  | ML Scoring |  | OCR.space  |  | Gemini AI  |             |
|  | Algorithm  |  | Vision API |  | (Chat/Gen) |             |
|  +------------+  +------------+  +------------+             |
+-------------------------------------------------------------+
|  API Routes (Next.js Serverless)                            |
|  /api/chat  |  /api/analyze-document  |  /api/generate      |
+-------------------------------------------------------------+
```

---

## 9. Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **AI** | Google Gemini 2.5 Flash |
| **ML** | Custom client-side scoring algorithm |
| **OCR** | OCR.space API |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Deployment** | Vercel |

---

## 10. Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/himanshu-sugha/NomadOs
cd NomadOs

# 2. Install dependencies
npm install

# 3. Set up environment (optional - app works without keys)
cp .env.example .env.local
# Add your API keys if you have them

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

### Environment Variables

```env
GEMINI_API_KEY=your_gemini_key    # Optional - enables AI chat
OCR_API_KEY=your_ocr_space_key    # Optional - enables document OCR
```

> **Note:** Both keys are optional. The app has comprehensive fallbacks for all features.

---

## 11. Project Structure

```
src/
├── app/
│   ├── page.tsx                   # Landing page
│   ├── dashboard/
│   │   ├── how-it-works/          # Algorithm explanation
│   │   ├── documents/             # OCR document scanner
│   │   ├── visa-predictor/        # ML visa scoring
│   │   ├── compare/               # Country comparison
│   │   └── culture/               # AI cultural coach
│   └── api/
│       ├── chat/                  # Gemini chat endpoint
│       ├── analyze-document/      # OCR processing
│       └── generate-document/     # SOP/cover letter generation
├── components/
│   └── ui/                        # shadcn components
└── lib/
    └── utils.ts
```

---

## 12. Demo

**Key Flows:**
1. **Visa Prediction**: Enter profile → Get success probability with breakdown
2. **Document Upload**: Upload passport → AI extracts name, country, DOB
3. **Country Comparison**: See all 6 countries ranked by match percentage
4. **Cultural Prep**: Chat with AI → Get workplace, housing, healthcare tips

---

## 13. Author

**Himanshu Sugha**  
Email: himanshusugha@gmail.com

---

## 14. License

MIT License

---

<p align="center">
  <b>NomadOS - Your Passport to the World</b>
</p>
