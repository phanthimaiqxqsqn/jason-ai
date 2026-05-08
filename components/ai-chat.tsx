"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, SendHorizonal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ChatMessage } from "@/types";

const initialMessages: ChatMessage[] = [
  {
    id: "init-1",
    role: "assistant",
    content:
      "Hi, I am Jason AI. Ask about market exposure, risk anomalies, or strategy simulation and I will break it down clearly."
  }
];

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: value
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: value })
      });

      const data = (await response.json()) as { reply?: string };
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply ?? "I could not generate a response."
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (_error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Connectivity issue detected while contacting the AI service."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex h-full min-h-[460px] flex-col">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-white">AI Analyst Chat</h2>
        <span className="rounded-full border border-slate-600 bg-slate-900 px-2 py-1 text-[11px] text-slate-300">
          model: jason-quant-assistant
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-auto pr-1">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="mt-1 rounded-full bg-primary/20 p-1.5">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "bg-accent/20 text-cyan-100"
                    : "border border-slate-700/60 bg-slate-900/75 text-slate-100"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="mt-1 rounded-full bg-cyan-500/20 p-1.5">
                  <User className="h-4 w-4 text-cyan-400" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Jason AI is thinking...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about VaR, drawdown, anomaly drivers..."
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none ring-primary transition focus:ring-2"
        />
        <Button type="submit" disabled={loading || input.trim().length === 0} className="inline-flex gap-2">
          Send
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
