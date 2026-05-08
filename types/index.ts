export type AlertLevel = "low" | "medium" | "critical";

export interface AlertItem {
  id: string;
  title: string;
  level: AlertLevel;
  message: string;
  ts: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
