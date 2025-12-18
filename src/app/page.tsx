"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe2,
  FileSearch,
  MapPin,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  Plane
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-background/80 backdrop-blur-xl border border-border">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">NomadOS</span>
            </div>
            <Button asChild size="sm">
              <Link href="/dashboard">
                Open App <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-8">
            <Plane className="w-4 h-4" />
            Thinking about moving abroad?
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your complete toolkit for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">moving abroad</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Check your visa chances, scan your documents, compare countries,
            and get cultural tips — everything you need to start your international journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="px-8">
              <Link href="/dashboard">
                Start Exploring <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What It Does */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            What can you do here?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Four tools to help you figure out your visa situation. No sign-up needed.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: TrendingUp,
                title: "Visa Predictor",
                desc: "See your approval odds based on your profile",
                color: "text-green-400"
              },
              {
                icon: MapPin,
                title: "Compare Countries",
                desc: "See all 6 countries ranked by your match",
                color: "text-purple-400"
              },
              {
                icon: FileSearch,
                title: "Document Scanner",
                desc: "Upload ID or resume, we extract the details",
                color: "text-blue-400"
              },
              {
                icon: MessageCircle,
                title: "Culture Guide",
                desc: "Ask questions about life in your destination",
                color: "text-orange-400"
              },
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border hover:border-border/80 transition-colors">
                <CardContent className="p-5">
                  <item.icon className={`w-6 h-6 ${item.color} mb-3`} />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-card/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to check your chances?
          </h2>
          <p className="text-muted-foreground mb-8">
            Takes about 2 minutes. No account required.
          </p>
          <Button asChild size="lg" className="px-8">
            <Link href="/dashboard">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4" />
            <span className="font-medium text-foreground">NomadOS</span>
          </div>
          <p>Built for the VisaVerse AI Hackathon</p>
        </div>
      </footer>
    </div>
  );
}
