import { NextRequest, NextResponse } from "next/server";

const responseTemplates = [
  "Risk radar indicates moderate stress in correlated assets. Consider trimming leverage by 8-12% while volatility remains elevated.",
  "The strongest anomaly driver appears to be funding-rate imbalance. A delta-neutral hedge could reduce overnight downside variance.",
  "Momentum remains constructive, but liquidity pockets are thin. Stage orders and use staggered entries to reduce slippage impact.",
  "Your exposure profile is concentrated in high-beta instruments. Diversifying into lower-correlation sleeves can improve Sharpe resilience.",
  "Drawdown probability for the next 24h has increased slightly. Tighten stop logic and monitor cross-exchange spread expansion."
];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim() ?? "";

  if (!message) {
    return NextResponse.json({ reply: "Please provide a message." }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 800));

  const randomReply = responseTemplates[Math.floor(Math.random() * responseTemplates.length)];

  return NextResponse.json({
    reply: `${randomReply} (Context: "${message.slice(0, 80)}")`
  });
}
