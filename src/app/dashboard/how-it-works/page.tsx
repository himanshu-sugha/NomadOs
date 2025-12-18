"use client";

import {
    Brain,
    FileText,
    MessageSquare,
    Target,
    Sparkles,
    Cpu,
    Database,
    Layers,
    TrendingUp,
    Zap,
    CheckCircle,
    ArrowRight
} from "lucide-react";

// Simple step-by-step flow for users
const userJourney = [
    {
        step: 1,
        title: "Enter Your Profile",
        description: "Tell us about your education, experience, age, and skills",
        icon: FileText,
        color: "from-blue-500 to-cyan-500"
    },
    {
        step: 2,
        title: "AI Analyzes Your Data",
        description: "Our algorithm evaluates 10+ factors against country requirements",
        icon: Brain,
        color: "from-purple-500 to-pink-500"
    },
    {
        step: 3,
        title: "Get Your Score",
        description: "See your success probability with confidence range and breakdown",
        icon: Target,
        color: "from-green-500 to-emerald-500"
    },
    {
        step: 4,
        title: "Improve Your Chances",
        description: "Get personalized suggestions showing exactly how to increase your score",
        icon: TrendingUp,
        color: "from-amber-500 to-orange-500"
    }
];

const aiFeatures = [
    {
        title: "Visa Predictor",
        icon: Target,
        color: "from-amber-500 to-orange-500",
        description: "Predicts your visa approval probability with confidence bands",
        highlights: [
            "10+ scoring factors (education, experience, age, language)",
            "Bonus points for STEM fields (+8%), job offers (+22%)",
            "Penalty for previous rejections (-10%)",
            "Confidence range showing uncertainty (66%-78%)",
            "Actionable improvement suggestions"
        ]
    },
    {
        title: "Compare Countries",
        icon: Target,
        color: "from-purple-500 to-pink-500",
        description: "See all 6 countries ranked by your match percentage",
        highlights: [
            "Side-by-side comparison of visa requirements",
            "AI recommendation shows best match",
            "Export comparison report",
            "Why low? explanations for each country"
        ]
    },
    {
        title: "Document Scanner",
        icon: FileText,
        color: "from-blue-500 to-cyan-500",
        description: "Upload your passport or resume - AI extracts the data automatically",
        highlights: [
            "Uses OCR.space API for text extraction",
            "Recognizes names, dates, countries",
            "Auto-fills your profile information",
            "Supports images and PDFs"
        ]
    },
    {
        title: "Culture Guide",
        icon: MessageSquare,
        color: "from-green-500 to-emerald-500",
        description: "Ask anything about your destination country - powered by Gemini AI",
        highlights: [
            "Workplace etiquette and culture",
            "Housing and cost of living tips",
            "Healthcare system navigation",
            "SOP and cover letter generation"
        ]
    }
];

const architectureLayers = [
    { layer: "Frontend", tech: "Next.js 15", icon: Layers },
    { layer: "API", tech: "Serverless", icon: Zap },
    { layer: "AI", tech: "Gemini 2.5", icon: Brain },
    { layer: "ML", tech: "Custom Algorithm", icon: Cpu }
];

export default function HowItWorksPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                    </div>
                    How It Works
                </h1>
                <p className="text-muted-foreground mt-1">Understanding NomadOS in 4 simple steps</p>
            </div>

            {/* Simple 4-Step Journey */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-6">Your Journey to Visa Success</h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {userJourney.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.step} className="relative">
                                <div className="text-center">
                                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="text-xs text-primary font-medium mb-1">Step {item.step}</div>
                                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                                {index < userJourney.length - 1 && (
                                    <div className="hidden md:block absolute top-8 -right-2 text-muted-foreground">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* What Makes Us Different */}
            <div className="glass-card p-6 border-l-4 border-l-green-500">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    What Makes NomadOS Different
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/30">
                        <h3 className="font-semibold mb-2">Not Just a Chatbot</h3>
                        <p className="text-sm text-muted-foreground">
                            Real ML algorithm with 10+ factors - not just GPT responses
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                        <h3 className="font-semibold mb-2">Actionable Intelligence</h3>
                        <p className="text-sm text-muted-foreground">
                            Shows exactly what to improve and by how much percentage
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                        <h3 className="font-semibold mb-2">Works Offline</h3>
                        <p className="text-sm text-muted-foreground">
                            Core scoring runs in browser - no API keys required
                        </p>
                    </div>
                </div>
            </div>

            {/* AI Features */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Features
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {aiFeatures.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.title} className="glass-card p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{feature.title}</h3>
                                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                                <ul className="space-y-1">
                                    {feature.highlights.map((highlight, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Scoring Algorithm - Visual */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    How We Calculate Your Score
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-3">Scoring Weights</h3>
                        <div className="space-y-2">
                            {[
                                { factor: "Education", weight: 25, color: "bg-blue-500" },
                                { factor: "Experience", weight: 20, color: "bg-green-500" },
                                { factor: "Language", weight: 15, color: "bg-yellow-500" },
                                { factor: "Age", weight: 15, color: "bg-purple-500" },
                                { factor: "Job Offer", weight: 15, color: "bg-pink-500" },
                                { factor: "Documents", weight: 10, color: "bg-cyan-500" },
                            ].map((item) => (
                                <div key={item.factor} className="flex items-center gap-3">
                                    <div className="w-24 text-sm">{item.factor}</div>
                                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.weight * 4}%` }} />
                                    </div>
                                    <div className="w-10 text-sm text-right font-medium">{item.weight}%</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Bonus & Penalty Points</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                                <span>STEM Field (Tech, Engineering, Healthcare)</span>
                                <span className="text-green-400 font-medium">+5 to +8%</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                                <span>Job Offer Secured</span>
                                <span className="text-green-400 font-medium">+15 to +25%</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-green-500/10 border border-green-500/20">
                                <span>Local Language (French/German)</span>
                                <span className="text-green-400 font-medium">+5%</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-red-500/10 border border-red-500/20">
                                <span>Previous Visa Rejection</span>
                                <span className="text-red-400 font-medium">-10%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm font-medium">
                        Final Score = Σ(Weight × Match%) + Bonuses - Penalties
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Your score is personalized based on both your profile and the specific country requirements.
                    </p>
                </div>
            </div>

            {/* Tech Stack - Compact at bottom */}
            <div className="glass-card p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Built With
                </h3>
                <div className="flex flex-wrap gap-2">
                    {architectureLayers.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.layer} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                                <Icon className="w-4 h-4 text-primary" />
                                <span className="text-sm">{item.layer}:</span>
                                <span className="text-sm text-muted-foreground">{item.tech}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
