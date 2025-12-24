"use client";

import { useState, useCallback } from "react";
import {
    Upload,
    FileText,
    CheckCircle,
    AlertCircle,
    Loader2,
    Sparkles,
    User,
    Briefcase,
    CreditCard,
    X,
    Eye,
    Edit3,
    Save
} from "lucide-react";

type DocumentType = "passport" | "work" | "financial";

interface UploadedDoc {
    type: DocumentType;
    name: string;
    status: "uploading" | "analyzing" | "complete" | "error";
    data?: Record<string, unknown>;
    provider?: string;
    rawText?: string;
}

const documentTypes: { type: DocumentType; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
    { type: "passport", label: "Passport / ID", icon: User, description: "National ID or passport" },
    { type: "work", label: "Employment", icon: Briefcase, description: "Resume or work docs" },
    { type: "financial", label: "Financial", icon: CreditCard, description: "Bank statements" },
];

// Demo data
const demoExtractedData = {
    passport: {
        "Name": "Alex Johnson",
        "Country": "United States",
        "Document Number": "X12345678",
        "Date of Birth": "1990-05-15",
    },
    work: {
        "Name": "Alex Johnson",
        "Role": "Senior Software Engineer",
        "Company": "Tech Corp Inc.",
        "Experience": "8 years",
        "Skills": ["JavaScript", "Python", "React", "Node.js"],
    },
};

export default function DocumentsPage() {
    const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);
    const [selectedType, setSelectedType] = useState<DocumentType>("passport");
    const [isDragging, setIsDragging] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isDemo, setIsDemo] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showRawText, setShowRawText] = useState(false);
    const [rawOcrText, setRawOcrText] = useState("");
    const [extractedData, setExtractedData] = useState<Record<string, unknown>>({});

    const analyzeDocument = useCallback(async (file: File, type: DocumentType) => {
        const newDoc: UploadedDoc = {
            type,
            name: file.name,
            status: "uploading",
        };

        setUploadedDocs(prev => [...prev, newDoc]);
        setIsDemo(false);

        setTimeout(() => {
            setUploadedDocs(prev =>
                prev.map(doc =>
                    doc.name === file.name ? { ...doc, status: "analyzing" } : doc
                )
            );
        }, 500);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", type);

            const response = await fetch("/api/analyze-document", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setUploadedDocs(prev =>
                    prev.map(doc =>
                        doc.name === file.name
                            ? { ...doc, status: "complete", data: result.data, provider: result.provider, rawText: result.rawText }
                            : doc
                    )
                );

                setExtractedData(result.data);

                if (result.rawText) {
                    setRawOcrText(result.rawText);
                }

                setShowProfile(true);
            } else {
                throw new Error(result.error || "Analysis failed");
            }
        } catch (error) {
            console.error("Document analysis error:", error);
            setUploadedDocs(prev =>
                prev.map(doc =>
                    doc.name === file.name ? { ...doc, status: "error" } : doc
                )
            );
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            analyzeDocument(files[0], selectedType);
        }
    }, [selectedType, analyzeDocument]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            analyzeDocument(files[0], selectedType);
        }
    };

    const loadDemoData = () => {
        setUploadedDocs([
            { type: "passport", name: "passport_scan.pdf", status: "complete", data: demoExtractedData.passport, provider: "demo" },
            { type: "work", name: "resume.pdf", status: "complete", data: demoExtractedData.work, provider: "demo" },
        ]);
        setExtractedData(demoExtractedData.passport);
        setShowProfile(true);
        setIsDemo(true);
        setRawOcrText("");
    };

    const removeDoc = (name: string) => {
        setUploadedDocs(prev => prev.filter(doc => doc.name !== name));
        if (uploadedDocs.length <= 1) {
            setShowProfile(false);
        }
    };

    // Update a field value
    const updateField = (key: string, value: string) => {
        setExtractedData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const getLatestProvider = () => {
        const completeDocs = uploadedDocs.filter(d => d.status === "complete" && d.provider);
        return completeDocs.length > 0 ? completeDocs[completeDocs.length - 1].provider : null;
    };

    // Get displayable fields (skip internal fields starting with _)
    const getDisplayFields = () => {
        return Object.entries(extractedData).filter(([key]) => !key.startsWith("_"));
    };

    // Format field value for display
    const formatValue = (value: unknown): string => {
        if (Array.isArray(value)) return value.join(", ");
        if (value === null || value === undefined) return "";
        return String(value);
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Document AI</h1>
                    <p className="text-[var(--text-muted)]">
                        Upload your documents and let AI extract your mobility profile
                    </p>
                </div>
                <button onClick={loadDemoData} className="btn-secondary">
                    <Sparkles className="w-4 h-4" />
                    Load Demo Data
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Upload section */}
                <div className="space-y-8">
                    {/* Document type selector */}
                    <div>
                        <div className="text-sm font-medium mb-5">Select Document Type</div>
                        <div className="grid grid-cols-3 gap-4">
                            {documentTypes.map((doc) => (
                                <button
                                    key={doc.type}
                                    onClick={() => setSelectedType(doc.type)}
                                    className={`p-5 rounded-xl border text-left transition-all ${selectedType === doc.type
                                        ? "border-[var(--primary-500)] bg-[var(--primary-500)]/10"
                                        : "border-[var(--border-color)] hover:border-[var(--border-color-hover)]"
                                        }`}
                                >
                                    <doc.icon className={`w-6 h-6 mb-3 ${selectedType === doc.type ? "text-[var(--primary-400)]" : "text-[var(--text-muted)]"
                                        }`} />
                                    <div className="font-medium mb-1">{doc.label}</div>
                                    <div className="text-xs text-[var(--text-muted)]">{doc.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Upload zone */}
                    <div
                        className={`upload-zone ${isDragging ? "dragover" : ""}`}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={handleFileSelect}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-card)] flex items-center justify-center mx-auto mb-5 border border-[var(--border-color)]">
                                <Upload className="w-10 h-10 text-[var(--primary-400)]" />
                            </div>
                            <div className="text-lg font-medium mb-2">Drop your document here</div>
                            <div className="text-sm text-[var(--text-muted)] mb-5">
                                or <span className="text-[var(--primary-400)]">click to browse</span>
                            </div>
                            <div className="text-xs text-[var(--text-muted)]">
                                Supports JPG, PNG (images work best)
                            </div>
                        </label>
                    </div>

                    {/* Uploaded documents list */}
                    {uploadedDocs.length > 0 && (
                        <div className="glass-card p-7">
                            <h3 className="font-semibold mb-5">Uploaded Documents</h3>
                            <div className="space-y-4">
                                {uploadedDocs.map((doc, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 p-5 rounded-xl bg-[var(--bg-dark)] border border-[var(--border-color)]"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)] flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-[var(--text-muted)]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium truncate">{doc.name}</div>
                                            <div className="text-xs text-[var(--text-muted)] capitalize mt-1">
                                                {doc.type} {doc.provider && `• ${doc.provider}`}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {doc.status === "uploading" && (
                                                <span className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                                    <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                                                </span>
                                            )}
                                            {doc.status === "analyzing" && (
                                                <span className="flex items-center gap-2 text-sm text-[var(--primary-400)]">
                                                    <Sparkles className="w-4 h-4 animate-pulse" /> Analyzing...
                                                </span>
                                            )}
                                            {doc.status === "complete" && (
                                                <span className="flex items-center gap-2 text-sm text-[var(--success-400)]">
                                                    <CheckCircle className="w-4 h-4" /> Done
                                                </span>
                                            )}
                                            {doc.status === "error" && (
                                                <span className="flex items-center gap-2 text-sm text-red-400">
                                                    <AlertCircle className="w-4 h-4" /> Error
                                                </span>
                                            )}
                                            <button
                                                onClick={() => removeDoc(doc.name)}
                                                className="p-2 hover:bg-[var(--bg-card)] rounded-lg transition-colors"
                                            >
                                                <X className="w-4 h-4 text-[var(--text-muted)]" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Raw OCR Text */}
                    {rawOcrText && (
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Raw Extracted Text</h3>
                                <button
                                    onClick={() => setShowRawText(!showRawText)}
                                    className="text-sm text-[var(--primary-400)] hover:underline"
                                >
                                    {showRawText ? "Hide" : "Show"}
                                </button>
                            </div>
                            {showRawText && (
                                <div className="bg-[var(--bg-dark)] p-4 rounded-lg text-sm text-[var(--text-muted)] whitespace-pre-wrap max-h-48 overflow-y-auto border border-[var(--border-color)]">
                                    {rawOcrText}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Extracted profile */}
                <div className="space-y-8">
                    {showProfile ? (
                        <div className="glass-card p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary-500)] rounded-full blur-[100px] opacity-15"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold">Extracted Information</h3>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${isEditing
                                                ? "bg-[var(--primary-500)] text-white"
                                                : "bg-[var(--bg-dark)] border border-[var(--border-color)] hover:border-[var(--primary-500)]"
                                                }`}
                                        >
                                            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                                            {isEditing ? "Save" : "Edit"}
                                        </button>
                                        <span className={`badge ${isDemo ? "badge-accent" : "badge-success"}`}>
                                            {isDemo ? "Demo" : getLatestProvider() === "ocr.space" ? "OCR" : "Extracted"}
                                        </span>
                                    </div>
                                </div>

                                {/* Dynamic extracted fields */}
                                <div className="space-y-4">
                                    {getDisplayFields().map(([key, value]) => (
                                        <div key={key} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-dark)]">
                                            <div className="text-xs text-[var(--text-muted)] mb-1">{key}</div>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={formatValue(value)}
                                                    onChange={(e) => updateField(key, e.target.value)}
                                                    className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:border-[var(--primary-500)] focus:outline-none"
                                                />
                                            ) : (
                                                <div className="font-medium text-[var(--primary-300)]">
                                                    {formatValue(value) || "—"}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {getDisplayFields().length === 0 && (
                                    <div className="text-center py-8 text-[var(--text-muted)]">
                                        No data extracted. Try uploading a clearer image.
                                    </div>
                                )}

                                {isEditing && (
                                    <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
                                        ✏️ Edit any field above to correct OCR mistakes
                                    </p>
                                )}

                                {/* Use in Visa Predictor Button */}
                                {getDisplayFields().length > 0 && (
                                    <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                                        <button
                                            onClick={() => {
                                                // Save extracted data to localStorage
                                                const profileData = {
                                                    name: extractedData["Name"] || "",
                                                    country: extractedData["Country"] || "",
                                                    dateOfBirth: extractedData["Date of Birth"] || "",
                                                    experience: extractedData["Experience"] || "",
                                                    role: extractedData["Role"] || "",
                                                    company: extractedData["Company"] || "",
                                                    skills: extractedData["Skills"] || [],
                                                };
                                                localStorage.setItem("nomados_profile", JSON.stringify(profileData));
                                                // Navigate to Visa Predictor
                                                window.location.href = "/dashboard/visa-predictor";
                                            }}
                                            className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            Use in Visa Predictor
                                        </button>
                                        <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
                                            This will auto-fill your profile in the Visa Predictor
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card p-16 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-card)] flex items-center justify-center mx-auto mb-6 border border-[var(--border-color)]">
                                <Eye className="w-10 h-10 text-[var(--text-muted)]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">No Profile Yet</h3>
                            <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto">
                                Upload your documents to extract information
                            </p>
                            <button onClick={loadDemoData} className="btn-primary">
                                <Sparkles className="w-4 h-4" /> Load Demo Data
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
