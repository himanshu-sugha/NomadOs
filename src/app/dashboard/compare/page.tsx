"use client";

import { useState } from "react";
import Link from "next/link";
import {
    TrendingUp,
    MapPin,
    ArrowLeft,
    CheckCircle,
    XCircle,
    AlertCircle,
    Trophy,
    Clock,
    Target,
    Download,
    FileText
} from "lucide-react";

// Country requirements data
const countryData: Record<string, {
    flag: string;
    visaType: string;
    processingTime: string;
    baseSuccessRate: number;
    minAge: number;
    maxAge: number;
    minExperience: number;
    requiresDegree: boolean;
    minEnglish: number;
    jobOfferBonus: number;
}> = {
    "Germany": {
        flag: "🇩🇪",
        visaType: "EU Blue Card",
        processingTime: "2-3 months",
        baseSuccessRate: 78,
        minAge: 18,
        maxAge: 55,
        minExperience: 3,
        requiresDegree: true,
        minEnglish: 0,
        jobOfferBonus: 25
    },
    "Canada": {
        flag: "🇨🇦",
        visaType: "Express Entry",
        processingTime: "6-8 months",
        baseSuccessRate: 65,
        minAge: 18,
        maxAge: 45,
        minExperience: 1,
        requiresDegree: true,
        minEnglish: 6,
        jobOfferBonus: 15
    },
    "Singapore": {
        flag: "🇸🇬",
        visaType: "Employment Pass",
        processingTime: "3-8 weeks",
        baseSuccessRate: 72,
        minAge: 21,
        maxAge: 50,
        minExperience: 2,
        requiresDegree: true,
        minEnglish: 0,
        jobOfferBonus: 35
    },
    "Australia": {
        flag: "🇦🇺",
        visaType: "Skilled Worker",
        processingTime: "6-12 months",
        baseSuccessRate: 60,
        minAge: 18,
        maxAge: 45,
        minExperience: 3,
        requiresDegree: true,
        minEnglish: 6,
        jobOfferBonus: 10
    },
    "UAE": {
        flag: "🇦🇪",
        visaType: "Golden Visa",
        processingTime: "2-4 weeks",
        baseSuccessRate: 82,
        minAge: 21,
        maxAge: 60,
        minExperience: 5,
        requiresDegree: true,
        minEnglish: 0,
        jobOfferBonus: 30
    },
    "Netherlands": {
        flag: "🇳🇱",
        visaType: "Highly Skilled Migrant",
        processingTime: "2-4 weeks",
        baseSuccessRate: 75,
        minAge: 18,
        maxAge: 55,
        minExperience: 2,
        requiresDegree: true,
        minEnglish: 0,
        jobOfferBonus: 20
    }
};

export default function ComparePage() {
    const [profile, setProfile] = useState({
        age: 28,
        yearsExperience: 4,
        hasDeegree: true,
        degreeLevel: "Bachelor's",
        englishScore: 7.5,
        hasJobOffer: false
    });

    const calculateScore = (countryName: string) => {
        const country = countryData[countryName];
        let score = country.baseSuccessRate;

        // Age factor
        if (profile.age >= country.minAge && profile.age <= country.maxAge) {
            if (profile.age <= 30) score += 10;
            else if (profile.age <= 35) score += 5;
        } else {
            score -= 20;
        }

        // Experience factor
        if (profile.yearsExperience >= country.minExperience) {
            score += Math.min(10, (profile.yearsExperience - country.minExperience) * 2);
        } else {
            score -= 15;
        }

        // Degree factor
        if (country.requiresDegree && profile.hasDeegree) {
            if (profile.degreeLevel === "Master's") score += 8;
            else if (profile.degreeLevel === "PhD") score += 12;
        } else if (country.requiresDegree && !profile.hasDeegree) {
            score -= 30;
        }

        // English factor
        if (profile.englishScore >= country.minEnglish) {
            score += Math.min(10, (profile.englishScore - country.minEnglish) * 2);
        } else if (country.minEnglish > 0) {
            score -= 15;
        }

        // Job offer bonus
        if (profile.hasJobOffer) {
            score += country.jobOfferBonus;
        }

        return Math.min(98, Math.max(15, Math.round(score)));
    };

    const getScoreColor = (score: number) => {
        if (score >= 75) return "text-green-400";
        if (score >= 50) return "text-yellow-400";
        return "text-red-400";
    };

    const getScoreBg = (score: number) => {
        if (score >= 75) return "from-green-500/20 to-emerald-500/20 border-green-500/30";
        if (score >= 50) return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
        return "from-red-500/20 to-rose-500/20 border-red-500/30";
    };

    // Sort countries by score
    const sortedCountries = Object.entries(countryData)
        .map(([name, data]) => ({ name, data, score: calculateScore(name) }))
        .sort((a, b) => b.score - a.score);

    // PDF Export function
    const exportToPDF = () => {
        const reportContent = `
NOMADOS VISA ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════════════════════════

CANDIDATE PROFILE
─────────────────
• Age: ${profile.age} years
• Experience: ${profile.yearsExperience} years
• Education: ${profile.degreeLevel}${profile.hasDeegree ? '' : ' (No Degree)'}
• English (IELTS): ${profile.englishScore}
• Job Offer Secured: ${profile.hasJobOffer ? 'Yes' : 'No'}

═══════════════════════════════════════════════════════════

COUNTRY RANKINGS BY SUCCESS PROBABILITY
───────────────────────────────────────────

${sortedCountries.map((c, i) => `
${i + 1}. ${c.data.flag} ${c.name}
   Success Rate: ${c.score}%
   Visa Type: ${c.data.visaType}
   Processing Time: ${c.data.processingTime}
   Min Experience: ${c.data.minExperience}+ years
`).join('\n')}

═══════════════════════════════════════════════════════════

RECOMMENDATION
──────────────
Based on your profile, ${sortedCountries[0].name} offers the highest 
success probability at ${sortedCountries[0].score}%.

${profile.hasJobOffer
                ? 'Having a job offer significantly boosts your chances.'
                : 'Consider securing a job offer to improve your success rates.'}

═══════════════════════════════════════════════════════════

Report generated by NomadOS - AI-Powered Global Mobility Platform
        `;

        // Create blob and download
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NomadOS_Visa_Report_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/dashboard" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        Country Comparison
                    </h1>
                    <p className="text-muted-foreground mt-1">Compare visa success probability across all destinations</p>
                </div>
                <button
                    onClick={exportToPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export Report
                </button>
            </div>

            {/* Profile Quick Edit */}
            <div className="glass-card p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Your Profile (adjust to see changes)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    <div>
                        <label className="text-xs text-muted-foreground">Age</label>
                        <input
                            type="number"
                            value={profile.age}
                            onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 25 })}
                            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Experience (years)</label>
                        <input
                            type="number"
                            value={profile.yearsExperience}
                            onChange={(e) => setProfile({ ...profile, yearsExperience: parseInt(e.target.value) || 0 })}
                            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Degree Level</label>
                        <select
                            value={profile.degreeLevel}
                            onChange={(e) => setProfile({ ...profile, degreeLevel: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                        >
                            <option>High School</option>
                            <option>Bachelor's</option>
                            <option>Master's</option>
                            <option>PhD</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">English (IELTS)</label>
                        <input
                            type="number"
                            step="0.5"
                            value={profile.englishScore}
                            onChange={(e) => setProfile({ ...profile, englishScore: parseFloat(e.target.value) || 6 })}
                            className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Has Degree</label>
                        <button
                            onClick={() => setProfile({ ...profile, hasDeegree: !profile.hasDeegree })}
                            className={`w-full mt-1 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${profile.hasDeegree ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                        >
                            {profile.hasDeegree ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {profile.hasDeegree ? "Yes" : "No"}
                        </button>
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Job Offer</label>
                        <button
                            onClick={() => setProfile({ ...profile, hasJobOffer: !profile.hasJobOffer })}
                            className={`w-full mt-1 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${profile.hasJobOffer ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                        >
                            {profile.hasJobOffer ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            {profile.hasJobOffer ? "Yes" : "No"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Top Recommendation - Moved to top for visibility */}
            <div className="glass-card p-5 border-l-4 border-l-green-500">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    AI Recommendation
                </h3>
                <div className="flex items-center gap-4">
                    <span className="text-4xl">{sortedCountries[0].data.flag}</span>
                    <div>
                        <p className="text-lg font-semibold">{sortedCountries[0].name}</p>
                        <p className="text-muted-foreground text-sm">
                            Highest match at <span className={`font-bold ${getScoreColor(sortedCountries[0].score)}`}>{sortedCountries[0].score}%</span>
                        </p>
                    </div>
                </div>
                {sortedCountries[0].score < 60 && (
                    <p className="text-xs text-yellow-400 mt-2">
                        Consider improving your English score or securing a job offer to boost your chances.
                    </p>
                )}
                {profile.hasJobOffer && (
                    <p className="text-xs text-green-400 mt-2">
                        Having a job offer significantly improves your chances across all destinations.
                    </p>
                )}
            </div>

            {/* Comparison Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedCountries.map(({ name, data, score }, index) => (
                    <div
                        key={name}
                        className={`glass-card p-5 relative overflow-hidden transition-all hover:scale-[1.02] ${index === 0 ? 'ring-2 ring-green-500/50' : ''}`}
                    >
                        {/* Rank Badge */}
                        {index < 3 && (
                            <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-yellow-500 text-black' : index === 1 ? 'bg-gray-300 text-black' : 'bg-amber-700 text-white'}`}>
                                {index === 0 ? <Trophy className="w-4 h-4" /> : `#${index + 1}`}
                            </div>
                        )}

                        {/* Country Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">{data.flag}</span>
                            <div>
                                <h3 className="font-bold text-lg">{name}</h3>
                                <p className="text-xs text-muted-foreground">{data.visaType}</p>
                            </div>
                        </div>

                        {/* Score */}
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${getScoreBg(score)} border mb-4`}>
                            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                                {score}%
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Success Probability</div>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground flex items-center gap-2">
                                    <Clock className="w-3 h-3" /> Processing
                                </span>
                                <span>{data.processingTime}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Min Experience</span>
                                <span>{data.minExperience}+ years</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Job Offer Impact</span>
                                <span className="text-green-400">+{data.jobOfferBonus}%</span>
                            </div>
                        </div>

                        {/* Requirement Checks */}
                        <div className="mt-4 pt-4 border-t border-border space-y-1.5">
                            <div className="flex items-center gap-2 text-xs">
                                {profile.age >= data.minAge && profile.age <= data.maxAge ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                                ) : (
                                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                                )}
                                <span className="text-muted-foreground">Age requirement ({data.minAge}-{data.maxAge})</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                {profile.yearsExperience >= data.minExperience ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                                ) : (
                                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                                )}
                                <span className="text-muted-foreground">Experience ({data.minExperience}+ years)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                {profile.englishScore >= data.minEnglish ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                                ) : data.minEnglish > 0 ? (
                                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                                ) : (
                                    <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                                )}
                                <span className="text-muted-foreground">
                                    English {data.minEnglish > 0 ? `(IELTS ${data.minEnglish}+)` : "(not required)"}
                                </span>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href={`/dashboard/visa-predictor?country=${name}`}
                            className="mt-4 w-full py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
                        >
                            <TrendingUp className="w-4 h-4" />
                            Full Analysis
                        </Link>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="glass-card p-5">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Recommendation
                </h3>
                <p className="text-muted-foreground">
                    Based on your profile, <span className="text-foreground font-semibold">{sortedCountries[0].name}</span> offers
                    the highest success probability at <span className={`font-bold ${getScoreColor(sortedCountries[0].score)}`}>{sortedCountries[0].score}%</span>.
                    {sortedCountries[0].score < 60 && " Consider improving your English score or securing a job offer to boost your chances."}
                    {profile.hasJobOffer && ` Having a job offer significantly improves your chances across all destinations.`}
                </p>
            </div>
        </div>
    );
}
