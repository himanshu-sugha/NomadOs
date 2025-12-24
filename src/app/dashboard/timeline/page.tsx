"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle,
    Circle,
    Clock,
    FileText,
    Plane,
    Home,
    Briefcase,
    GraduationCap,
    CreditCard,
    Shield,
    MapPin,
    ChevronRight
} from "lucide-react";

// Visa timeline steps by country
const timelines: Record<string, { phase: string; steps: { title: string; description: string; duration: string; icon: React.ElementType }[] }[]> = {
    "Germany": [
        {
            phase: "Preparation (2-4 weeks)",
            steps: [
                { title: "Gather Documents", description: "Passport, degree certificates, work experience letters", duration: "1 week", icon: FileText },
                { title: "Get SCHUFA Report", description: "Credit report for housing applications", duration: "1 week", icon: CreditCard },
                { title: "Credential Recognition", description: "Check if your degree is recognized (anabin database)", duration: "1-2 weeks", icon: GraduationCap },
            ]
        },
        {
            phase: "Job Search (4-12 weeks)",
            steps: [
                { title: "Apply for Jobs", description: "Use LinkedIn, StepStone, Xing, company websites", duration: "4-8 weeks", icon: Briefcase },
                { title: "Interviews", description: "Technical interviews, cultural fit assessments", duration: "2-4 weeks", icon: MapPin },
                { title: "Receive Job Offer", description: "Minimum €56,400/year for Blue Card", duration: "1 week", icon: CheckCircle },
            ]
        },
        {
            phase: "Visa Application (2-3 months)",
            steps: [
                { title: "Book Appointment", description: "German Embassy/Consulate visa appointment", duration: "1-4 weeks", icon: Clock },
                { title: "Submit Application", description: "All documents, biometrics, application form", duration: "1 day", icon: FileText },
                { title: "Wait for Processing", description: "Embassy reviews your application", duration: "4-8 weeks", icon: Clock },
                { title: "Receive Visa", description: "Collect passport with visa stamp", duration: "1 week", icon: Shield },
            ]
        },
        {
            phase: "Arrival (First 2 weeks)",
            steps: [
                { title: "Fly to Germany", description: "Pack essentials, important documents in carry-on", duration: "1 day", icon: Plane },
                { title: "Register Address", description: "Anmeldung at local Bürgeramt within 14 days", duration: "1-3 days", icon: Home },
                { title: "Open Bank Account", description: "N26, Deutsche Bank, or Sparkasse", duration: "1-2 days", icon: CreditCard },
                { title: "Get Health Insurance", description: "TK, AOK, or private insurance", duration: "1 week", icon: Shield },
            ]
        }
    ],
    "Canada": [
        {
            phase: "Preparation (4-8 weeks)",
            steps: [
                { title: "Check Eligibility", description: "Use CRS calculator to estimate points", duration: "1 day", icon: CheckCircle },
                { title: "Take Language Test", description: "IELTS or CELPIP for English", duration: "2-4 weeks", icon: GraduationCap },
                { title: "Get ECA", description: "Educational Credential Assessment", duration: "3-6 weeks", icon: FileText },
            ]
        },
        {
            phase: "Express Entry (1-2 weeks)",
            steps: [
                { title: "Create Profile", description: "Submit Express Entry profile online", duration: "1-2 hours", icon: FileText },
                { title: "Enter Pool", description: "Wait for Invitation to Apply (ITA)", duration: "Varies", icon: Clock },
                { title: "Receive ITA", description: "Based on CRS score and draw cutoffs", duration: "2 weeks - 6 months", icon: CheckCircle },
            ]
        },
        {
            phase: "Application (60 days)",
            steps: [
                { title: "Submit Application", description: "Complete forms, upload documents", duration: "1-2 weeks", icon: FileText },
                { title: "Medical Exam", description: "Panel physician medical examination", duration: "1 week", icon: Shield },
                { title: "Biometrics", description: "Fingerprints and photo", duration: "1 day", icon: MapPin },
                { title: "Wait for Decision", description: "IRCC processes application", duration: "4-6 months", icon: Clock },
            ]
        },
        {
            phase: "Landing (First week)",
            steps: [
                { title: "Fly to Canada", description: "Complete landing formalities at airport", duration: "1 day", icon: Plane },
                { title: "Get SIN Number", description: "Social Insurance Number for work", duration: "1 day", icon: CreditCard },
                { title: "Apply for Health Card", description: "Provincial health insurance", duration: "1 week", icon: Shield },
                { title: "Open Bank Account", description: "RBC, TD, or Scotiabank", duration: "1 day", icon: CreditCard },
            ]
        }
    ],
    "Singapore": [
        {
            phase: "Job Search (4-8 weeks)",
            steps: [
                { title: "Apply for Jobs", description: "LinkedIn, JobStreet, company websites", duration: "4-6 weeks", icon: Briefcase },
                { title: "Interviews", description: "Often 3-4 rounds for tech roles", duration: "2-4 weeks", icon: MapPin },
                { title: "Receive Job Offer", description: "Minimum S$5,000/month for EP", duration: "1 week", icon: CheckCircle },
            ]
        },
        {
            phase: "EP Application (3-8 weeks)",
            steps: [
                { title: "Employer Submits EP", description: "Company applies via MOM portal", duration: "1 day", icon: FileText },
                { title: "COMPASS Assessment", description: "Points-based framework evaluation", duration: "1-3 weeks", icon: GraduationCap },
                { title: "Approval in Principle", description: "MOM approves EP application", duration: "3-8 weeks", icon: CheckCircle },
            ]
        },
        {
            phase: "Arrival (First week)",
            steps: [
                { title: "Fly to Singapore", description: "Bring all original documents", duration: "1 day", icon: Plane },
                { title: "Complete Formalities", description: "Collect EP card at MOM", duration: "1-2 weeks", icon: Shield },
                { title: "Get SingPass", description: "Digital identity for government services", duration: "1 week", icon: CreditCard },
                { title: "Open Bank Account", description: "DBS, OCBC, or UOB", duration: "1 day", icon: CreditCard },
            ]
        }
    ]
};

export default function TimelinePage() {
    const [selectedCountry, setSelectedCountry] = useState("Germany");
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
    const [userProfile, setUserProfile] = useState<any>(null);

    // Load profile and saved progress
    useEffect(() => {
        // Load profile
        const savedProfile = localStorage.getItem("nomados_profile");
        if (savedProfile) {
            try {
                setUserProfile(JSON.parse(savedProfile));
            } catch (e) { console.error(e); }
        }

        // Load progress
        const savedProgress = localStorage.getItem("nomados_timeline_progress");
        if (savedProgress) {
            try {
                setCompletedSteps(new Set(JSON.parse(savedProgress)));
            } catch (e) { console.error(e); }
        }
    }, []);

    // Save progress
    useEffect(() => {
        if (completedSteps.size > 0) {
            localStorage.setItem("nomados_timeline_progress", JSON.stringify(Array.from(completedSteps)));
        }
    }, [completedSteps]);

    const countries = [
        { name: "Germany", flag: "🇩🇪" },
        { name: "Canada", flag: "🇨🇦" },
        { name: "Singapore", flag: "🇸🇬" },
    ];

    const timeline = timelines[selectedCountry] || timelines["Germany"];

    const toggleStep = (stepTitle: string) => {
        const newCompleted = new Set(completedSteps);
        if (newCompleted.has(stepTitle)) {
            newCompleted.delete(stepTitle);
        } else {
            newCompleted.add(stepTitle);
        }
        setCompletedSteps(newCompleted);
    };

    const totalSteps = timeline.reduce((acc, phase) => acc + phase.steps.length, 0);
    const completedCount = completedSteps.size;
    const progress = Math.round((completedCount / totalSteps) * 100);

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
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        Visa Timeline
                    </h1>
                    <p className="text-muted-foreground mt-1">Step-by-step roadmap to your visa approval</p>
                </div>
            </div>

            {/* Country Selector */}
            <div className="flex gap-2">
                {countries.map((c) => (
                    <button
                        key={c.name}
                        onClick={() => {
                            setSelectedCountry(c.name);
                            setCompletedSteps(new Set());
                        }}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${selectedCountry === c.name
                            ? "bg-primary text-primary-foreground"
                            : "bg-card hover:bg-card/80 border border-border"
                            }`}
                    >
                        <span className="text-xl">{c.flag}</span>
                        <span>{c.name}</span>
                    </button>
                ))}
            </div>

            {/* Progress Bar */}
            <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Your Progress</span>
                    <span className="text-sm font-medium">{completedCount}/{totalSteps} steps</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Click on steps to mark them as complete</p>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
                {timeline.map((phase, phaseIndex) => (
                    <div key={phase.phase} className="relative">
                        {/* Phase Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                                {phaseIndex + 1}
                            </div>
                            <h2 className="text-xl font-bold">{phase.phase}</h2>
                        </div>

                        {/* Personalized AI Hint */}
                        {userProfile && (
                            <div className="ml-12 mb-4">
                                {phase.phase.includes("Job Search") && userProfile.role && (
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm text-blue-400 flex gap-2">
                                        <Briefcase className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <span>
                                            <strong>AI Insight:</strong> As a {userProfile.role}, focus on {selectedCountry === "Germany" ? "StepStone and Xing" : "LinkedIn and Indeed"} for your search.
                                            {selectedCountry === "Germany" && " Tech roles often skip the language requirement."}
                                        </span>
                                    </div>
                                )}
                                {phase.phase.includes("Preparation") && userProfile.degreeLevel && (
                                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-sm text-purple-400 flex gap-2">
                                        <GraduationCap className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <span>
                                            <strong>AI Insight:</strong> Since you have a {userProfile.degreeLevel}, insure you get your ZAB Statement of Comparability early.
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Steps */}
                        <div className="ml-4 pl-4 border-l-2 border-border space-y-4">
                            {phase.steps.map((step, stepIndex) => {
                                const isCompleted = completedSteps.has(step.title);
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.title}
                                        onClick={() => toggleStep(step.title)}
                                        className={`glass-card p-4 cursor-pointer transition-all hover:scale-[1.01] ${isCompleted ? "bg-green-500/10 border-green-500/30" : ""
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Step indicator */}
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isCompleted
                                                ? "bg-green-500 text-white"
                                                : "bg-muted text-muted-foreground"
                                                }`}>
                                                {isCompleted ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <Icon className="w-5 h-5" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className={`font-semibold ${isCompleted ? "text-green-400" : ""}`}>
                                                        {step.title}
                                                    </h3>
                                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                        {step.duration}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {step.description}
                                                </p>
                                            </div>

                                            <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isCompleted ? "rotate-90" : ""}`} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Card */}
            {progress === 100 && (
                <div className="glass-card p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-green-400">All Steps Completed! 🎉</h3>
                            <p className="text-muted-foreground">You're ready to start your journey to {selectedCountry}!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
