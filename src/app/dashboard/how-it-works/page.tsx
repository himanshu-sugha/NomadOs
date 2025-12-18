"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Brain,
    FileText,
    MessageSquare,
    Target,
    Sparkles,
    Cpu,
    Database,
    Layers,
    TrendingUp,
    Zap
} from "lucide-react";

const aiFeatures = [
    {
        title: "Visa Success Predictor",
        icon: Target,
        color: "from-amber-500 to-orange-500",
        description: "Machine learning algorithm that predicts your visa approval probability",
        howItWorks: [
            "Analyzes your profile against country-specific requirements",
            "Weighted scoring based on education, experience, age, language",
            "Applies bonus points for competitive advantages (STEM, PhD, job offer)",
            "Calculates probability using historical success rate patterns"
        ],
        techStack: ["Custom ML Algorithm", "Weighted Scoring", "Pattern Matching"],
    },
    {
        title: "Document Vision AI",
        icon: FileText,
        color: "from-blue-500 to-cyan-500",
        description: "OCR-powered document analysis that extracts structured data",
        howItWorks: [
            "Converts uploaded image/PDF to base64 encoding",
            "Sends to OCR.space API for text extraction",
            "Parses extracted text using regex patterns",
            "Structures data into profile fields (name, skills, experience)"
        ],
        techStack: ["OCR.space API", "Regex Parsing", "Pattern Recognition"],
    },
    {
        title: "Cultural Sync AI",
        icon: MessageSquare,
        color: "from-green-500 to-emerald-500",
        description: "AI-powered cultural coach for destination preparation",
        howItWorks: [
            "Receives user question and selected destination country",
            "Constructs context-aware prompt with cultural knowledge",
            "Sends to Google Gemini 2.5 Flash for natural language generation",
            "Returns formatted response with emojis and markdown"
        ],
        techStack: ["Google Gemini 2.5", "Prompt Engineering", "Context Injection"],
    },
    {
        title: "SOP Generator",
        icon: Sparkles,
        color: "from-purple-500 to-pink-500",
        description: "AI-generated Statement of Purpose tailored to your profile",
        howItWorks: [
            "Collects user profile data (education, experience, skills)",
            "Injects profile into country-specific SOP template",
            "Sends to Gemini AI for natural language generation",
            "Produces professional, personalized SOP document"
        ],
        techStack: ["Google Gemini 2.5", "Template Engine", "Profile Personalization"],
    }
];

const architectureLayers = [
    {
        layer: "Frontend",
        tech: "Next.js 15 + TypeScript",
        description: "Modern React framework with App Router and server components",
        icon: Layers
    },
    {
        layer: "API Routes",
        tech: "Next.js API Routes",
        description: "Serverless functions for AI processing and external API calls",
        icon: Zap
    },
    {
        layer: "AI Layer",
        tech: "Gemini 2.5 + OCR.space",
        description: "Google's latest AI model and specialized OCR processing",
        icon: Brain
    },
    {
        layer: "ML Engine",
        tech: "Custom Scoring Algorithm",
        description: "Weighted scoring system for visa prediction",
        icon: Cpu
    }
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
                <p className="text-muted-foreground mt-1">See how NomadOS analyzes your visa chances</p>
            </div>

            {/* Architecture Overview */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary" />
                    System Architecture
                </h2>
                <div className="grid md:grid-cols-4 gap-4">
                    {architectureLayers.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.layer} className="relative">
                                <div className="glass-card p-4 h-full">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="font-semibold">{item.layer}</span>
                                    </div>
                                    <p className="text-sm font-medium text-primary">{item.tech}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                                </div>
                                {index < architectureLayers.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-muted-foreground">
                                        →
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* AI Features Breakdown */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Features Breakdown
                </h2>

                {aiFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div key={feature.title} className="glass-card p-6">
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>

                                    {/* How it works */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium mb-2">How it works:</h4>
                                        <ol className="space-y-1.5">
                                            {feature.howItWorks.map((step, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        {i + 1}
                                                    </span>
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {feature.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ML Algorithm Details */}
            <div className="glass-card p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Visa Prediction Algorithm
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-3">Scoring Weights</h3>
                        <div className="space-y-2">
                            {[
                                { factor: "Education Level", weight: 25, color: "bg-blue-500" },
                                { factor: "Work Experience", weight: 20, color: "bg-green-500" },
                                { factor: "Language Score", weight: 15, color: "bg-yellow-500" },
                                { factor: "Age Bracket", weight: 15, color: "bg-purple-500" },
                                { factor: "Job Offer", weight: 15, color: "bg-pink-500" },
                                { factor: "Documents", weight: 10, color: "bg-cyan-500" },
                            ].map((item) => (
                                <div key={item.factor} className="flex items-center gap-3">
                                    <div className="w-32 text-sm text-muted-foreground">{item.factor}</div>
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.weight * 4}%` }} />
                                    </div>
                                    <div className="w-10 text-sm text-right">{item.weight}%</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Bonus Points</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 rounded bg-muted/50">
                                <span>STEM Field</span>
                                <span className="text-green-400">+5 points</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-muted/50">
                                <span>PhD Holder</span>
                                <span className="text-green-400">+5 points</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-muted/50">
                                <span>Job Offer Secured</span>
                                <span className="text-green-400">+10-25 points</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-muted/50">
                                <span>High English Score (8+)</span>
                                <span className="text-green-400">+5 points</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-muted/50">
                                <span>10+ Years Experience</span>
                                <span className="text-green-400">+5 points</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm">
                        <strong>Formula:</strong> Final Score = Σ(Weight × MatchPercentage) + BonusPoints
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        The algorithm evaluates each factor against country-specific requirements and calculates a weighted sum,
                        then applies bonus points for competitive advantages.
                    </p>
                </div>
            </div>
        </div>
    );
}
