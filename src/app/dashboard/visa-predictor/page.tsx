"use client";

import { useState } from "react";
import {
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    XCircle,
    FileText,
    Sparkles,
    Globe2,
    Download,
    Loader2,
    Target,
    Shield,
    Briefcase,
    GraduationCap,
    Wallet,
    Languages,
    Clock
} from "lucide-react";

// Visa requirements by country
const countryRequirements = {
    "Germany": {
        flag: "🇩🇪",
        visaType: "EU Blue Card",
        requirements: [
            { id: "degree", label: "University Degree", category: "education", weight: 25 },
            { id: "job_offer", label: "Job Offer (€56k+ salary)", category: "employment", weight: 30 },
            { id: "experience", label: "3+ Years Experience", category: "employment", weight: 15 },
            { id: "health_insurance", label: "Health Insurance", category: "documents", weight: 10 },
            { id: "clean_record", label: "Clean Criminal Record", category: "documents", weight: 10 },
            { id: "language", label: "German A1/B1 Level", category: "language", weight: 10 },
        ],
        processingTime: "2-3 months",
        successRate: 78,
    },
    "Canada": {
        flag: "🇨🇦",
        visaType: "Express Entry",
        requirements: [
            { id: "degree", label: "Bachelor's Degree or Higher", category: "education", weight: 20 },
            { id: "experience", label: "1+ Year Skilled Work Experience", category: "employment", weight: 25 },
            { id: "language_test", label: "IELTS/CELPIP Score", category: "language", weight: 25 },
            { id: "age", label: "Age (18-35 ideal)", category: "personal", weight: 10 },
            { id: "funds", label: "Proof of Funds ($13k+)", category: "financial", weight: 10 },
            { id: "medical", label: "Medical Exam", category: "documents", weight: 10 },
        ],
        processingTime: "6-8 months",
        successRate: 65,
    },
    "Singapore": {
        flag: "🇸🇬",
        visaType: "Employment Pass",
        requirements: [
            { id: "salary", label: "Job Offer ($5k+/month)", category: "employment", weight: 35 },
            { id: "degree", label: "Recognized Degree", category: "education", weight: 25 },
            { id: "experience", label: "Relevant Experience", category: "employment", weight: 20 },
            { id: "company", label: "Sponsor Company", category: "employment", weight: 10 },
            { id: "passport", label: "Valid Passport", category: "documents", weight: 10 },
        ],
        processingTime: "3-8 weeks",
        successRate: 72,
    },
    "Australia": {
        flag: "🇦🇺",
        visaType: "Skilled Worker Visa",
        requirements: [
            { id: "skills_assessment", label: "Skills Assessment", category: "employment", weight: 25 },
            { id: "age", label: "Age Under 45", category: "personal", weight: 10 },
            { id: "english", label: "English Proficiency (IELTS 6+)", category: "language", weight: 20 },
            { id: "experience", label: "3+ Years Experience", category: "employment", weight: 20 },
            { id: "degree", label: "Relevant Qualification", category: "education", weight: 15 },
            { id: "health", label: "Health Requirements", category: "documents", weight: 10 },
        ],
        processingTime: "6-12 months",
        successRate: 60,
    },
    "UAE": {
        flag: "🇦🇪",
        visaType: "Golden Visa",
        requirements: [
            { id: "salary", label: "High Salary ($10k+/month)", category: "employment", weight: 30 },
            { id: "degree", label: "Bachelor's or Higher", category: "education", weight: 20 },
            { id: "experience", label: "Executive/Specialized Role", category: "employment", weight: 25 },
            { id: "investment", label: "Investment/Property (optional)", category: "financial", weight: 15 },
            { id: "passport", label: "Valid Passport", category: "documents", weight: 10 },
        ],
        processingTime: "2-4 weeks",
        successRate: 82,
    },
};

interface UserProfile {
    hasPassport: boolean;
    hasDegree: boolean;
    degreeLevel: string;
    yearsExperience: number;
    skills: string[];
    languageScores: { english: number; german: number; french: number };
    hasJobOffer: boolean;
    hasFunds: boolean;
    age: number;
    hasHealthInsurance: boolean;
    hasCleanRecord: boolean;
    // New enhanced fields
    fieldOfWork: string;
    passportCountry: string;
    hasPreviousVisaRejection: boolean;
    hasRelativesInCountry: boolean;
}

const defaultProfile: UserProfile = {
    hasPassport: true,
    hasDegree: true,
    degreeLevel: "Bachelor's",
    yearsExperience: 3,
    skills: ["JavaScript", "React", "Node.js"],
    languageScores: { english: 7.5, german: 0, french: 0 },
    hasJobOffer: false,
    hasFunds: true,
    age: 26,
    hasHealthInsurance: false,
    hasCleanRecord: true,
    // New enhanced fields
    fieldOfWork: "Technology",
    passportCountry: "India",
    hasPreviousVisaRejection: false,
    hasRelativesInCountry: false,
};

export default function VisaPredictorPage() {
    const [selectedCountry, setSelectedCountry] = useState<string>("Germany");
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [generatedSOP, setGeneratedSOP] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);

    const country = countryRequirements[selectedCountry as keyof typeof countryRequirements];

    // Advanced Visa Success Scoring Algorithm
    // Uses partial scores, weighted factors, and competitive bonuses
    const calculateScore = () => {
        const requirements = country.requirements;
        const metRequirements: string[] = [];
        const partialRequirements: { label: string; score: number; maxScore: number }[] = [];
        const missingRequirements: string[] = [];

        let baseScore = 0;
        let bonusPoints = 0;

        // Calculate age score (different visa types favor different age ranges)
        const getAgeScore = (age: number, country: string): number => {
            if (country === "Canada" || country === "Australia") {
                // Points-based systems favor younger applicants
                if (age >= 18 && age <= 29) return 100;
                if (age >= 30 && age <= 34) return 90;
                if (age >= 35 && age <= 39) return 75;
                if (age >= 40 && age <= 44) return 50;
                if (age >= 45) return 25;
            } else {
                // Other countries are more flexible
                if (age >= 18 && age <= 50) return 100;
                if (age >= 51 && age <= 60) return 70;
                if (age > 60) return 40;
            }
            return 0;
        };

        // Calculate experience score (graduated scale)
        const getExperienceScore = (years: number, minRequired: number): number => {
            if (years >= minRequired * 2) return 100; // Double the requirement = full score + bonus eligible
            if (years >= minRequired) return 100;
            if (years >= minRequired * 0.75) return 75;
            if (years >= minRequired * 0.5) return 50;
            if (years > 0) return 25;
            return 0;
        };

        // Calculate language score (IELTS band scale)
        const getLanguageScore = (ieltsScore: number): number => {
            if (ieltsScore >= 8) return 100; // Expert
            if (ieltsScore >= 7) return 90;  // Very good
            if (ieltsScore >= 6.5) return 75; // Good
            if (ieltsScore >= 6) return 60;  // Competent
            if (ieltsScore >= 5.5) return 40; // Modest
            if (ieltsScore >= 5) return 25;  // Limited
            return 0;
        };

        // Calculate education score
        const getEducationScore = (hasDegree: boolean, level: string): number => {
            if (!hasDegree) return 0;
            if (level === "PhD" || level === "Doctorate") return 100;
            if (level === "Master's") return 90;
            if (level === "Bachelor's") return 75;
            if (level === "Diploma") return 50;
            return 25;
        };

        // STEM field bonus - highly valued globally
        const getFieldBonus = (field: string, country: string): number => {
            const stemFields = ["Technology", "Engineering", "Healthcare", "Science", "AI/ML", "Data Science"];
            const financeFields = ["Finance", "Banking", "Consulting"];

            if (stemFields.includes(field)) {
                // Germany and Singapore highly value STEM
                if (country === "Germany" || country === "Singapore") return 8;
                return 5;
            }
            if (financeFields.includes(field)) {
                // UAE and Singapore value finance
                if (country === "UAE" || country === "Singapore") return 6;
                return 3;
            }
            return 0;
        };

        // Passport strength scoring (based on visa-free access)
        const getPassportStrengthBonus = (passportCountry: string): number => {
            const tier1 = ["USA", "UK", "Germany", "Japan", "Singapore", "France", "Italy", "Spain"]; // Strong passports
            const tier2 = ["Brazil", "Mexico", "Argentina", "Malaysia", "South Africa"];
            const tier3 = ["India", "China", "Philippines", "Nigeria", "Pakistan"];

            if (tier1.includes(passportCountry)) return 5;
            if (tier2.includes(passportCountry)) return 2;
            // Tier 3 or unknown - no bonus
            return 0;
        };

        // Previous visa rejection penalty
        const getVisaRejectionPenalty = (): number => {
            if (profile.hasPreviousVisaRejection) return -10;
            return 0;
        };

        // Country-specific language bonus
        const getCountryLanguageBonus = (country: string): number => {
            if (country === "Canada" && profile.languageScores.french >= 5) return 5; // French bonus for Canada
            if (country === "Germany" && profile.languageScores.german >= 3) return 5; // German bonus
            return 0;
        };

        // Relatives in country bonus (shows integration potential)
        const getRelativesBonus = (): number => {
            if (profile.hasRelativesInCountry) return 3;
            return 0;
        };

        requirements.forEach(req => {
            let percentMet = 0;
            let status: "met" | "partial" | "missing" = "missing";

            switch (req.id) {
                case "degree":
                    percentMet = getEducationScore(profile.hasDegree, profile.degreeLevel);
                    status = percentMet >= 75 ? "met" : percentMet > 0 ? "partial" : "missing";
                    break;

                case "job_offer":
                case "salary":
                    percentMet = profile.hasJobOffer ? 100 : 0;
                    status = percentMet === 100 ? "met" : "missing";
                    // Job offer is a strong positive signal
                    if (profile.hasJobOffer) bonusPoints += 5;
                    break;

                case "experience":
                    const minExp = selectedCountry === "Canada" ? 1 : 3;
                    percentMet = getExperienceScore(profile.yearsExperience, minExp);
                    status = percentMet === 100 ? "met" : percentMet >= 50 ? "partial" : "missing";
                    // Extra experience bonus
                    if (profile.yearsExperience >= 10) bonusPoints += 5;
                    if (profile.yearsExperience >= 5) bonusPoints += 3;
                    break;

                case "health_insurance":
                case "medical":
                case "health":
                    percentMet = profile.hasHealthInsurance ? 100 : 0;
                    status = percentMet === 100 ? "met" : "missing";
                    break;

                case "clean_record":
                    percentMet = profile.hasCleanRecord ? 100 : 0;
                    status = percentMet === 100 ? "met" : "missing";
                    break;

                case "language":
                case "language_test":
                case "english":
                    percentMet = getLanguageScore(profile.languageScores.english);
                    status = percentMet >= 75 ? "met" : percentMet >= 40 ? "partial" : "missing";
                    // High language scores get bonus
                    if (profile.languageScores.english >= 8) bonusPoints += 5;
                    break;

                case "passport":
                    percentMet = profile.hasPassport ? 100 : 0;
                    status = percentMet === 100 ? "met" : "missing";
                    break;

                case "funds":
                    percentMet = profile.hasFunds ? 100 : 0;
                    status = percentMet === 100 ? "met" : "missing";
                    break;

                case "age":
                    percentMet = getAgeScore(profile.age, selectedCountry);
                    status = percentMet >= 75 ? "met" : percentMet >= 40 ? "partial" : "missing";
                    break;

                case "skills_assessment":
                case "company":
                    percentMet = profile.skills.length >= 5 ? 100 : profile.skills.length >= 3 ? 75 : profile.skills.length > 0 ? 50 : 0;
                    status = percentMet >= 75 ? "met" : percentMet >= 50 ? "partial" : "missing";
                    break;

                case "investment":
                    // Optional requirement - give partial credit
                    percentMet = 50; // Assume medium compliance for optional
                    status = "partial";
                    break;

                default:
                    percentMet = 50;
                    status = "partial";
            }

            // Add weighted score
            baseScore += (percentMet / 100) * req.weight;

            // Track requirement status
            if (status === "met") {
                metRequirements.push(req.label);
            } else if (status === "partial") {
                partialRequirements.push({
                    label: req.label,
                    score: Math.round(percentMet),
                    maxScore: 100
                });
            } else {
                missingRequirements.push(req.label);
            }
        });

        // Apply all enhanced bonuses
        bonusPoints += getFieldBonus(profile.fieldOfWork, selectedCountry);
        bonusPoints += getPassportStrengthBonus(profile.passportCountry);
        bonusPoints += getVisaRejectionPenalty();
        bonusPoints += getCountryLanguageBonus(selectedCountry);
        bonusPoints += getRelativesBonus();

        // Calculate final score with bonus (capped at 100, min 5)
        const finalScore = Math.max(5, Math.min(100, Math.round(baseScore + bonusPoints)));

        // Determine competitive level
        let competitiveLevel: "High" | "Medium" | "Low";
        if (finalScore >= 80) competitiveLevel = "High";
        else if (finalScore >= 60) competitiveLevel = "Medium";
        else competitiveLevel = "Low";

        return {
            score: finalScore,
            metRequirements,
            partialRequirements,
            missingRequirements,
            bonusPoints,
            competitiveLevel
        };
    };

    const runAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
        }, 2000);
    };

    const generateSOP = async () => {
        setIsGenerating(true);

        // Use Gemini API to generate SOP
        try {
            const response = await fetch("/api/generate-document", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "sop",
                    country: selectedCountry,
                    profile: profile,
                }),
            });

            const data = await response.json();
            setGeneratedSOP(data.content || data.message);
        } catch (error) {
            // Demo fallback
            setGeneratedSOP(`# Statement of Purpose

## Introduction
I am writing to express my strong interest in obtaining a ${country.visaType} to pursue my career aspirations in ${selectedCountry}.

## Professional Background
With ${profile.yearsExperience} years of professional experience and expertise in ${profile.skills.slice(0, 3).join(", ")}, I have developed a strong foundation for contributing to ${selectedCountry}'s dynamic workforce.

## Educational Qualifications
I hold a ${profile.degreeLevel} degree, which has equipped me with the theoretical knowledge and practical skills necessary for my field.

## Why ${selectedCountry}
${selectedCountry} represents an ideal destination for my career growth due to its:
- Strong economy and job market
- Excellent quality of life
- Innovative technology sector
- Welcoming approach to skilled professionals

## Conclusion
I am fully committed to contributing positively to ${selectedCountry}'s economy and society. I believe my qualifications, experience, and dedication make me an ideal candidate for the ${country.visaType}.

---
*Generated by VisaVerse AI*`);
        }

        setIsGenerating(false);
    };

    const result = calculateScore();
    const scoreColor = result.score >= 70 ? "text-green-400" : result.score >= 50 ? "text-yellow-400" : "text-red-400";
    const scoreGradient = result.score >= 70 ? "from-green-500 to-emerald-500" : result.score >= 50 ? "from-yellow-500 to-orange-500" : "from-red-500 to-pink-500";

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "education": return GraduationCap;
            case "employment": return Briefcase;
            case "financial": return Wallet;
            case "language": return Languages;
            case "documents": return FileText;
            default: return Shield;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Visa Success Predictor</h1>
                    <p className="text-muted-foreground text-sm">
                        AI-powered analysis of your visa approval chances
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">AI Powered</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Input */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="glass-card p-5">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />
                            Your Profile
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-muted-foreground">Target Country</label>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => { setSelectedCountry(e.target.value); setShowResults(false); }}
                                    className="w-full mt-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                >
                                    {Object.entries(countryRequirements).map(([name, data]) => (
                                        <option key={name} value={name}>{data.flag} {name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={profile.hasDegree}
                                        onChange={(e) => setProfile({ ...profile, hasDegree: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span>University Degree</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={profile.hasJobOffer}
                                        onChange={(e) => setProfile({ ...profile, hasJobOffer: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span>Job Offer</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={profile.hasFunds}
                                        onChange={(e) => setProfile({ ...profile, hasFunds: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span>Proof of Funds</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={profile.hasHealthInsurance}
                                        onChange={(e) => setProfile({ ...profile, hasHealthInsurance: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span>Health Insurance</span>
                                </label>
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground">Years of Experience</label>
                                <input
                                    type="number"
                                    value={profile.yearsExperience}
                                    onChange={(e) => setProfile({ ...profile, yearsExperience: parseInt(e.target.value) || 0 })}
                                    className="w-full mt-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                    min="0"
                                    max="40"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground">Age</label>
                                <input
                                    type="number"
                                    value={profile.age}
                                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 18 })}
                                    className="w-full mt-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                    min="18"
                                    max="65"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground">English Score (IELTS)</label>
                                <input
                                    type="number"
                                    value={profile.languageScores.english}
                                    onChange={(e) => setProfile({ ...profile, languageScores: { ...profile.languageScores, english: parseFloat(e.target.value) || 0 } })}
                                    className="w-full mt-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                    min="0"
                                    max="9"
                                    step="0.5"
                                />
                            </div>

                            <div>
                                <label className="text-xs text-muted-foreground">Field of Work</label>
                                <select
                                    value={profile.fieldOfWork}
                                    onChange={(e) => setProfile({ ...profile, fieldOfWork: e.target.value })}
                                    className="w-full mt-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                >
                                    <option value="Technology">Technology / IT</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="AI/ML">AI / Machine Learning</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Finance">Finance / Banking</option>
                                    <option value="Consulting">Consulting</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Education">Education</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 gap-2 pt-2 border-t border-border">
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={profile.hasPreviousVisaRejection}
                                        onChange={(e) => setProfile({ ...profile, hasPreviousVisaRejection: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-muted-foreground">Previous Visa Rejection</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={profile.hasRelativesInCountry}
                                        onChange={(e) => setProfile({ ...profile, hasRelativesInCountry: e.target.checked })}
                                        className="rounded"
                                    />
                                    <span className="text-muted-foreground">Relatives in Target Country</span>
                                </label>
                            </div>

                            <button
                                onClick={runAnalysis}
                                disabled={isAnalyzing}
                                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <TrendingUp className="w-4 h-4" />
                                        Predict Success Rate
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 space-y-4">
                    {showResults ? (
                        <>
                            {/* Score Card */}
                            <div className="glass-card p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl border border-white/10">
                                            {country.flag}
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold">{selectedCountry}</h2>
                                            <p className="text-xs text-muted-foreground">{country.visaType}</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${scoreGradient} flex items-center justify-center shadow-lg`}>
                                            <span className="text-2xl font-bold text-white">{result.score}%</span>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-1">Success Rate</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <div className="flex-1 p-2 rounded-lg bg-[var(--bg-dark)] border border-[var(--border-color)] flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">Processing:</span>
                                        <span className="text-xs font-semibold">{country.processingTime}</span>
                                    </div>
                                    <div className="flex-1 p-2 rounded-lg bg-[var(--bg-dark)] border border-[var(--border-color)] flex items-center gap-2">
                                        <Target className="w-3.5 h-3.5 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">Level:</span>
                                        <span className={`text-xs font-semibold ${result.competitiveLevel === "High" ? "text-green-400" : result.competitiveLevel === "Medium" ? "text-yellow-400" : "text-red-400"}`}>
                                            {result.competitiveLevel}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
                                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-xs font-semibold text-primary">+{result.bonusPoints} bonus</span>
                                    </div>
                                </div>

                                {/* Requirements breakdown */}
                                <div className="space-y-2">
                                    <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">Requirements</h4>
                                    {country.requirements.map((req, i) => {
                                        const isMet = result.metRequirements.includes(req.label);
                                        const partialReq = result.partialRequirements.find(p => p.label === req.label);
                                        const isPartial = !!partialReq;
                                        const isMissing = result.missingRequirements.includes(req.label);
                                        const Icon = getCategoryIcon(req.category);

                                        let bgClass = "bg-red-500/10 border-red-500/30";
                                        let textClass = "text-red-400";
                                        if (isMet) {
                                            bgClass = "bg-green-500/10 border-green-500/30";
                                            textClass = "text-green-400";
                                        } else if (isPartial) {
                                            bgClass = "bg-yellow-500/10 border-yellow-500/30";
                                            textClass = "text-yellow-400";
                                        }

                                        return (
                                            <div
                                                key={i}
                                                className={`flex items-center justify-between py-2 px-3 rounded-lg border ${bgClass}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Icon className={`w-3.5 h-3.5 ${textClass}`} />
                                                    <span className="text-xs">{req.label}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {isPartial && (
                                                        <span className="text-[10px] text-yellow-400 font-medium">{partialReq.score}%</span>
                                                    )}
                                                    <span className="text-[10px] text-muted-foreground">{req.weight}pt</span>
                                                    {isMet ? (
                                                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                                                    ) : isPartial ? (
                                                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                                                    ) : (
                                                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Improve + Generate inline row */}
                            <div className="flex gap-3">
                                {/* Recommendations */}
                                {result.missingRequirements.length > 0 && (
                                    <div className="flex-1 glass-card p-3 border-l-2 border-l-yellow-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                                            <span className="font-medium text-xs">Improve</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {result.missingRequirements.slice(0, 3).map((req, i) => (
                                                <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400">
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Generate SOP Button */}
                                <button
                                    onClick={generateSOP}
                                    disabled={isGenerating}
                                    className="flex-1 btn-primary py-3 text-sm flex items-center justify-center gap-2 max-w-xs"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-4 h-4" />
                                            Generate SOP
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Generated SOP Display */}
                            {generatedSOP && (
                                <div className="glass-card p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-primary" />
                                            <span className="font-semibold text-sm">Generated Statement of Purpose</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">Gemini AI</span>
                                            <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                                                <Download className="w-3 h-3" />
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-lg p-4 max-h-72 overflow-y-auto prose prose-sm prose-invert">
                                        <div className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                                            {generatedSOP.replace(/^#+ /gm, '').replace(/\*\*/g, '')}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="glass-card p-16 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Ready to Predict</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                Fill in your profile details and click "Predict Success Rate" to get AI-powered visa approval analysis
                            </p>
                            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    5 Countries
                                </span>
                                <span className="flex items-center gap-1">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    AI Analysis
                                </span>
                                <span className="flex items-center gap-1">
                                    <FileText className="w-4 h-4 text-accent" />
                                    Doc Generator
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
