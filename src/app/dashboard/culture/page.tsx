"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Markdown from "react-markdown";
import {
    Send,
    Sparkles,
    Globe2,
    BookOpen,
    Users,
    Coffee,
    Briefcase,
    Home,
    Heart,
    MessageCircle,
    Bot,
    User,
    Loader2,
    Zap
} from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const scenarioPrompts = [
    { icon: Briefcase, label: "Workplace", prompt: "What should I know about workplace culture?", color: "from-blue-500 to-indigo-500" },
    { icon: Home, label: "Housing", prompt: "How do I find an apartment as an expat?", color: "from-amber-500 to-orange-500" },
    { icon: Coffee, label: "Etiquette", prompt: "What are the social norms and etiquette?", color: "from-pink-500 to-rose-500" },
    { icon: Users, label: "Friends", prompt: "How can I make friends and build a network?", color: "from-green-500 to-emerald-500" },
    { icon: Heart, label: "Healthcare", prompt: "How does the healthcare system work?", color: "from-red-500 to-pink-500" },
    { icon: BookOpen, label: "Language", prompt: "What basic phrases should I learn?", color: "from-purple-500 to-violet-500" },
];

function CulturePageContent() {
    const searchParams = useSearchParams();
    const countryFromUrl = searchParams.get("country") || "Germany";

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: `Welcome! 🌍 I'm your Cultural Sync AI for **${countryFromUrl}**.\n\nI can help you with:\n- 💼 Workplace culture & etiquette\n- 🏠 Finding housing tips\n- 👥 Social norms & making friends\n- 🏥 Healthcare & daily life\n\nWhat would you like to know?`,
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countryFromUrl);
    const [aiProvider, setAiProvider] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;
        setInput("");

        const userMessage: Message = {
            role: "user",
            content: text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    country: selectedCountry,
                }),
            });

            const data = await response.json();

            if (data.provider) {
                setAiProvider(data.provider);
            }

            const assistantMessage: Message = {
                role: "assistant",
                content: data.response || data.message || "I'm here to help!",
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="h-[calc(100vh-9rem)] flex gap-5">
            {/* Compact Sidebar */}
            <div className="w-56 flex-shrink-0 space-y-4 overflow-y-auto">
                {/* Country selector - compact */}
                <div className="glass-card p-4">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
                        <Globe2 className="w-3.5 h-3.5" />
                        <span>Country</span>
                    </div>
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:border-[var(--primary-500)] focus:outline-none"
                    >
                        <option value="Germany">🇩🇪 Germany</option>
                        <option value="Canada">🇨🇦 Canada</option>
                        <option value="Singapore">🇸🇬 Singapore</option>
                        <option value="Netherlands">🇳🇱 Netherlands</option>
                        <option value="Australia">🇦🇺 Australia</option>
                        <option value="Portugal">🇵🇹 Portugal</option>
                        <option value="UAE">🇦🇪 UAE</option>
                        <option value="Japan">🇯🇵 Japan</option>
                    </select>
                </div>

                {/* Quick topic buttons - grid layout */}
                <div className="glass-card p-4">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Quick Topics</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {scenarioPrompts.map((scenario, i) => (
                            <button
                                key={i}
                                onClick={() => sendMessage(scenario.prompt)}
                                disabled={isTyping}
                                className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center text-xs hover:bg-[var(--bg-dark)] transition-all group disabled:opacity-50 border border-transparent hover:border-[var(--border-color)]"
                            >
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${scenario.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                    <scenario.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-[var(--text-muted)] group-hover:text-white transition-colors">
                                    {scenario.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* AI Provider badge */}
                {aiProvider && (
                    <div className="text-center text-xs text-[var(--text-muted)]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-dark)] border border-[var(--border-color)]">
                            <Sparkles className="w-3 h-3 text-[var(--primary-400)]" />
                            {aiProvider}
                        </span>
                    </div>
                )}
            </div>

            {/* Chat area */}
            <div className="flex-1 glass-card flex flex-col overflow-hidden">
                {/* Compact header */}
                <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold">Cultural Sync AI</h3>
                        <p className="text-xs text-[var(--text-muted)]">for {selectedCountry}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span className="text-xs text-[var(--text-muted)]">Online</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {messages.map((message, i) => (
                        <div
                            key={i}
                            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user"
                                ? "bg-gradient-to-br from-[var(--primary-500)] to-[var(--accent-500)]"
                                : "bg-gradient-to-br from-emerald-400 to-teal-500"
                                }`}>
                                {message.role === "user" ? (
                                    <User className="w-4 h-4 text-white" />
                                ) : (
                                    <Bot className="w-4 h-4 text-white" />
                                )}
                            </div>
                            <div className={`max-w-[75%] p-4 rounded-2xl ${message.role === "user"
                                ? "bg-gradient-to-r from-[var(--primary-500)] to-[var(--accent-500)] text-white rounded-tr-sm"
                                : "bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-tl-sm"
                                }`}>
                                <div className="prose prose-invert prose-sm max-w-none text-sm leading-relaxed">
                                    <Markdown>{message.content}</Markdown>
                                </div>
                                <div className="text-[10px] mt-2 opacity-50">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-[var(--bg-dark)] border border-[var(--border-color)] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-[var(--primary-400)]" />
                                <span className="text-sm text-[var(--text-muted)]">Thinking...</span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-4 border-t border-[var(--border-color)]">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Ask about ${selectedCountry}...`}
                            className="flex-1 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:border-[var(--primary-500)] focus:outline-none"
                            disabled={isTyping}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="btn-primary px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function CulturePage() {
    return (
        <Suspense fallback={
            <div className="h-[calc(100vh-9rem)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-400)]" />
            </div>
        }>
            <CulturePageContent />
        </Suspense>
    );
}
