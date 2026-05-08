"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldAlert, BellRing } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { AlertItem } from "@/types";

const seed: AlertItem[] = [
  {
    id: "a0",
    title: "Liquidity Shift",
    level: "medium",
    message: "Large USDC outflow detected from exchange wallets.",
    ts: "just now"
  },
  {
    id: "a1",
    title: "Price Dislocation",
    level: "critical",
    message: "BTC spread widened 2.8x above 7-day baseline.",
    ts: "2m ago"
  }
];

const dynamicAlerts = [
  "Abnormal options gamma build-up on tech index.",
  "Unusual transfer volume into cold storage cluster.",
  "FX volatility regime switched to high-risk profile.",
  "Counterparty concentration crossed configured threshold.",
  "Derivatives funding skew indicates aggressive positioning."
];

function levelClass(level: AlertItem["level"]): string {
  if (level === "critical") return "border-danger/50 bg-danger/10";
  if (level === "medium") return "border-amber-400/50 bg-amber-400/10";
  return "border-success/50 bg-success/10";
}

export function RealtimeAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>(seed);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = dynamicAlerts[Math.floor(Math.random() * dynamicAlerts.length)];
      const levels: AlertItem["level"][] = ["low", "medium", "critical"];
      const level = levels[Math.floor(Math.random() * levels.length)];

      setAlerts((prev) => [
        {
          id: crypto.randomUUID(),
          title: "Realtime Monitor",
          level,
          message: random,
          ts: "just now"
        },
        ...prev.slice(0, 4)
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const criticalCount = useMemo(
    () => alerts.filter((alert) => alert.level === "critical").length,
    [alerts]
  );

  return (
    <Card className="h-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-white">Realtime Alerts</h2>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldAlert className="h-4 w-4 text-danger" />
          {criticalCount} critical
          <BellRing className="h-4 w-4 animate-pulse-soft text-accent" />
          live stream
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.35 }}
              className={`rounded-xl border p-3 ${levelClass(alert.level)}`}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100">
                  <AlertTriangle className="h-4 w-4" />
                  {alert.title}
                </div>
                <span className="text-[11px] uppercase tracking-wide text-slate-300">{alert.ts}</span>
              </div>
              <p className="text-xs text-slate-200">{alert.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
}
