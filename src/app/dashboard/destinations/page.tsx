"use client";

import { useState } from "react";
import {
    MapPin,
    Star,
    TrendingUp,
    DollarSign,
    Users,
    Briefcase,
    Heart,
    ChevronRight,
    Filter,
    Search,
    Globe2,
    Sparkles,
    X
} from "lucide-react";

// Country data with scores
const countries = [
    {
        id: 1,
        name: "Germany",
        flag: "🇩🇪",
        region: "Europe",
        visaScore: 92,
        jobScore: 88,
        costScore: 65,
        cultureScore: 78,
        overallScore: 85,
        highlights: ["EU Blue Card", "Strong Tech Sector", "Free Education"],
        visaType: "Work Visa Available",
        avgSalary: "$65,000",
        costOfLiving: "Moderate",
    },
    {
        id: 2,
        name: "Canada",
        flag: "🇨🇦",
        region: "North America",
        visaScore: 88,
        jobScore: 85,
        costScore: 60,
        cultureScore: 90,
        overallScore: 83,
        highlights: ["Express Entry", "Multicultural", "Path to PR"],
        visaType: "Express Entry",
        avgSalary: "$70,000",
        costOfLiving: "High",
    },
    {
        id: 3,
        name: "Singapore",
        flag: "🇸🇬",
        region: "Asia",
        visaScore: 75,
        jobScore: 95,
        costScore: 45,
        cultureScore: 72,
        overallScore: 82,
        highlights: ["Tech Hub", "Low Taxes", "Safe City"],
        visaType: "Employment Pass",
        avgSalary: "$85,000",
        costOfLiving: "Very High",
    },
    {
        id: 4,
        name: "Netherlands",
        flag: "🇳🇱",
        region: "Europe",
        visaScore: 85,
        jobScore: 82,
        costScore: 55,
        cultureScore: 88,
        overallScore: 80,
        highlights: ["30% Tax Ruling", "English Friendly", "Work-Life Balance"],
        visaType: "Highly Skilled Migrant",
        avgSalary: "$60,000",
        costOfLiving: "High",
    },
    {
        id: 5,
        name: "Australia",
        flag: "🇦🇺",
        region: "Oceania",
        visaScore: 78,
        jobScore: 80,
        costScore: 50,
        cultureScore: 85,
        overallScore: 78,
        highlights: ["Points System", "Quality of Life", "Growing Tech"],
        visaType: "Skilled Worker Visa",
        avgSalary: "$75,000",
        costOfLiving: "Very High",
    },
    {
        id: 6,
        name: "Portugal",
        flag: "🇵🇹",
        region: "Europe",
        visaScore: 90,
        jobScore: 65,
        costScore: 80,
        cultureScore: 85,
        overallScore: 77,
        highlights: ["Digital Nomad Visa", "Affordable", "Great Weather"],
        visaType: "D7 / Tech Visa",
        avgSalary: "$40,000",
        costOfLiving: "Low",
    },
    {
        id: 7,
        name: "UAE",
        flag: "🇦🇪",
        region: "Middle East",
        visaScore: 82,
        jobScore: 88,
        costScore: 55,
        cultureScore: 65,
        overallScore: 76,
        highlights: ["No Income Tax", "Global Hub", "Modern Infrastructure"],
        visaType: "Employment Visa / Golden Visa",
        avgSalary: "$80,000",
        costOfLiving: "High",
    },
    {
        id: 8,
        name: "Japan",
        flag: "🇯🇵",
        region: "Asia",
        visaScore: 70,
        jobScore: 75,
        costScore: 60,
        cultureScore: 70,
        overallScore: 72,
        highlights: ["Rich Culture", "Tech Innovation", "Safe"],
        visaType: "Engineer Visa",
        avgSalary: "$55,000",
        costOfLiving: "Moderate",
    },
];

const regions = ["All", "Europe", "North America", "Asia", "Oceania", "Middle East"];

export default function DestinationsPage() {
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<typeof countries[0] | null>(null);
    const [sortBy, setSortBy] = useState<"overall" | "visa" | "job" | "cost">("overall");

    const filteredCountries = countries
        .filter(c => selectedRegion === "All" || c.region === selectedRegion)
        .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            switch (sortBy) {
                case "visa": return b.visaScore - a.visaScore;
                case "job": return b.jobScore - a.jobScore;
                case "cost": return b.costScore - a.costScore;
                default: return b.overallScore - a.overallScore;
            }
        });

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-3xl font-bold mb-3 tracking-tight">Destination Matcher</h2>
                    <p className="text-[var(--text-secondary)]">
                        AI-powered recommendations based on your mobility profile.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="badge badge-primary">
                        <Sparkles className="w-3 h-3" /> {filteredCountries.length} Matches Found
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card p-7">
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            placeholder="Search countries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field pl-14"
                        />
                    </div>

                    {/* Region filter */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <Filter className="w-5 h-5 text-[var(--text-muted)]" />
                        {regions.map((region) => (
                            <button
                                key={region}
                                onClick={() => setSelectedRegion(region)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedRegion === region
                                    ? "bg-[var(--primary-500)] text-white shadow-lg shadow-[var(--primary-500)]/20"
                                    : "bg-[var(--bg-dark)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-color)]"
                                    }`}
                            >
                                {region}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort options */}
                <div className="flex items-center gap-5 mt-6 pt-6 border-t border-[var(--border-color)]">
                    <span className="text-sm text-[var(--text-muted)]">Sort by:</span>
                    {[
                        { key: "overall", label: "Best Match", icon: Star },
                        { key: "visa", label: "Visa Ease", icon: Globe2 },
                        { key: "job", label: "Job Market", icon: Briefcase },
                        { key: "cost", label: "Affordability", icon: DollarSign },
                    ].map((option) => (
                        <button
                            key={option.key}
                            onClick={() => setSortBy(option.key as typeof sortBy)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${sortBy === option.key
                                ? "bg-[var(--primary-500)]/20 text-[var(--primary-400)] border border-[var(--primary-500)]/30"
                                : "text-[var(--text-secondary)] hover:text-white"
                                }`}
                        >
                            <option.icon className="w-4 h-4" />
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCountries.map((country, index) => (
                    <div
                        key={country.id}
                        onClick={() => setSelectedCountry(country)}
                        className="country-card relative"
                    >
                        {/* Rank badge */}
                        {index < 3 && (
                            <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--accent-500)] flex items-center justify-center text-sm font-bold shadow-lg shadow-[var(--primary-500)]/30 z-10">
                                #{index + 1}
                            </div>
                        )}

                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl">{country.flag}</span>
                                <div>
                                    <h3 className="font-semibold text-lg">{country.name}</h3>
                                    <span className="text-sm text-[var(--text-muted)]">{country.region}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold gradient-text">{country.overallScore}</div>
                                <div className="text-xs text-[var(--text-muted)]">Match Score</div>
                            </div>
                        </div>

                        {/* Score bars */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-[var(--text-muted)]">Visa Feasibility</span>
                                    <span className="text-[var(--primary-400)] font-medium">{country.visaScore}%</span>
                                </div>
                                <div className="score-meter">
                                    <div className="score-meter-fill" style={{ width: `${country.visaScore}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-[var(--text-muted)]">Job Opportunities</span>
                                    <span className="text-[var(--accent-400)] font-medium">{country.jobScore}%</span>
                                </div>
                                <div className="score-meter">
                                    <div className="h-full rounded-sm bg-gradient-to-r from-[var(--accent-500)] to-purple-500" style={{ width: `${country.jobScore}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {country.highlights.map((highlight, i) => (
                                <span key={i} className="badge badge-primary">{highlight}</span>
                            ))}
                        </div>

                        {/* Quick info */}
                        <div className="flex items-center justify-between pt-5 border-t border-[var(--border-color)]">
                            <div className="text-sm">
                                <span className="text-[var(--text-muted)]">Avg Salary: </span>
                                <span className="font-semibold">{country.avgSalary}</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--primary-400)] transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected country modal/detail */}
            {selectedCountry && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedCountry(null)}
                >
                    <div
                        className="glass-card max-w-xl w-full max-h-[80vh] overflow-y-auto p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedCountry(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-dark)] border border-[var(--border-color)] flex items-center justify-center hover:border-[var(--primary-500)] transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Header */}
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl">{selectedCountry.flag}</span>
                                <div>
                                    <h2 className="text-2xl font-bold">{selectedCountry.name}</h2>
                                    <span className="text-sm text-[var(--text-muted)]">{selectedCountry.region}</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--accent-500)] flex items-center justify-center shadow-lg">
                                    <span className="text-2xl font-bold">{selectedCountry.overallScore}</span>
                                </div>
                                <div className="text-xs text-[var(--text-muted)] mt-1">Match</div>
                            </div>
                        </div>

                        {/* Scores - 4 in a row */}
                        <div className="grid grid-cols-4 gap-3 mb-5">
                            {[
                                { label: "Visa", score: selectedCountry.visaScore, color: "bg-[var(--primary-500)]" },
                                { label: "Jobs", score: selectedCountry.jobScore, color: "bg-[var(--accent-500)]" },
                                { label: "Cost", score: selectedCountry.costScore, color: "bg-green-500" },
                                { label: "Culture", score: selectedCountry.cultureScore, color: "bg-pink-500" },
                            ].map((item, i) => (
                                <div key={i} className="p-3 rounded-xl bg-[var(--bg-dark)] border border-[var(--border-color)] text-center">
                                    <div className="text-xl font-bold mb-1">{item.score}%</div>
                                    <div className="text-xs text-[var(--text-muted)]">{item.label}</div>
                                    <div className="score-meter mt-2">
                                        <div className={`h-full rounded-sm ${item.color}`} style={{ width: `${item.score}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info row */}
                        <div className="flex gap-3 mb-5">
                            <div className="flex-1 p-3 rounded-xl bg-[var(--bg-dark)] border border-[var(--border-color)]">
                                <div className="text-xs text-[var(--text-muted)]">Visa Type</div>
                                <div className="font-medium text-sm">{selectedCountry.visaType}</div>
                            </div>
                            <div className="flex-1 p-3 rounded-xl bg-[var(--bg-dark)] border border-[var(--border-color)]">
                                <div className="text-xs text-[var(--text-muted)]">Avg Salary</div>
                                <div className="font-bold text-lg">{selectedCountry.avgSalary}</div>
                            </div>
                            <div className="flex-1 p-3 rounded-xl bg-[var(--bg-dark)] border border-[var(--border-color)]">
                                <div className="text-xs text-[var(--text-muted)]">Cost of Living</div>
                                <div className="font-medium text-sm">{selectedCountry.costOfLiving}</div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="mb-5">
                            <div className="text-xs text-[var(--text-muted)] mb-2">Key Highlights</div>
                            <div className="flex flex-wrap gap-2">
                                {selectedCountry.highlights.map((h, i) => (
                                    <span key={i} className="badge badge-primary text-xs">{h}</span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button onClick={() => setSelectedCountry(null)} className="btn-secondary flex-1 py-2 text-sm">
                                Close
                            </button>
                            <a href={`/dashboard/culture?country=${selectedCountry.name}`} className="btn-primary flex-1 py-2 text-sm justify-center">
                                Prepare for {selectedCountry.name}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
