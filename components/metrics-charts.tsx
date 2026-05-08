"use client";

import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from "recharts";
import { Card } from "@/components/ui/card";

const pnlData = [
  { name: "Mon", pnl: 24, confidence: 66 },
  { name: "Tue", pnl: 31, confidence: 71 },
  { name: "Wed", pnl: 28, confidence: 68 },
  { name: "Thu", pnl: 35, confidence: 78 },
  { name: "Fri", pnl: 41, confidence: 82 },
  { name: "Sat", pnl: 39, confidence: 80 },
  { name: "Sun", pnl: 46, confidence: 87 }
];

const exposureData = [
  { name: "Crypto", value: 34 },
  { name: "Equity", value: 26 },
  { name: "FX", value: 21 },
  { name: "Bonds", value: 13 },
  { name: "Cash", value: 6 }
];

export function MetricsCharts() {
  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="h-[320px]">
          <h2 className="mb-3 text-base font-semibold text-white">PnL Trend + AI Confidence</h2>
          <ResponsiveContainer width="100%" height="88%">
            <AreaChart data={pnlData}>
              <defs>
                <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                cursor={{ stroke: "#06b6d4", strokeWidth: 1 }}
                contentStyle={{ background: "#0f172a", border: "1px solid #334155" }}
              />
              <Area type="monotone" dataKey="pnl" stroke="#8b5cf6" fill="url(#pnlGradient)" />
              <Area type="monotone" dataKey="confidence" stroke="#06b6d4" fillOpacity={0} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.08 }}
      >
        <Card className="h-[320px]">
          <h2 className="mb-3 text-base font-semibold text-white">Asset Exposure Breakdown</h2>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={exposureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155" }} />
              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </section>
  );
}
