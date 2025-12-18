"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Globe2,
    FileSearch,
    MapPin,
    MessageCircle,
    LogOut,
    Bell,
    Settings,
    TrendingUp,
    Brain,
    Clock,
    GitCompare
} from "lucide-react";

const sidebarLinks = [
    { href: "/dashboard", label: "How It Works", icon: Brain },
    { href: "/dashboard/documents", label: "Document Scanner", icon: FileSearch },
    { href: "/dashboard/visa-predictor", label: "Visa Predictor", icon: TrendingUp },
    { href: "/dashboard/compare", label: "Compare Countries", icon: GitCompare },
    { href: "/dashboard/culture", label: "Culture Guide", icon: MessageCircle },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border flex flex-col fixed h-full bg-background z-40">
                {/* Logo */}
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <Globe2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold">NomadOS</span>
                    </Link>
                </div>

                <Separator />

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
                        Main Menu
                    </p>
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User section */}
                <div className="p-4 mt-auto">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                        <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                DU
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate">Demo User</div>
                            <div className="text-xs text-muted-foreground truncate">Global Citizen</div>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive transition-colors mt-2"
                    >
                        <LogOut className="w-5 h-5" />
                        Exit Dashboard
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 ml-64">
                {/* Top header */}
                <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
                    <div>
                        <h1 className="text-lg font-semibold">Welcome back!</h1>
                        <p className="text-sm text-muted-foreground">Manage your global mobility journey</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <Bell className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Settings className="w-4 h-4" />
                        </Button>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
