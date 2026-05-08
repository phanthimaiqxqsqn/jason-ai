"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function HeroHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-hero-glow p-6 md:p-10"
    >
      <div className="absolute -right-10 top-0 h-52 w-52 animate-pulse-soft rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -left-14 bottom-0 h-44 w-44 animate-float rounded-full bg-accent/25 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-600/60 bg-slate-900/70 px-3 py-1 text-xs text-slate-200">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          AI Fintech Intelligence
        </span>
        <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
          Decision cockpit with AI chat, predictive visuals, and realtime risk alerts.
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          Analyze portfolio signals, ask the assistant for instant insights, and react to live anomaly updates in one cinematic interface.
        </p>
      </div>
    </motion.header>
  );
}
