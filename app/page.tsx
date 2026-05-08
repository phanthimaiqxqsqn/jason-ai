import { AIChat } from "@/components/ai-chat";
import { HeroHeader } from "@/components/hero-header";
import { MetricsCharts } from "@/components/metrics-charts";
import { RealtimeAlerts } from "@/components/realtime-alerts";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-foreground md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <HeroHeader />

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
          <AIChat />
          <RealtimeAlerts />
        </section>

        <MetricsCharts />
      </div>
    </main>
  );
}
