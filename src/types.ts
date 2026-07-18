export type AgentId =
  | "support"
  | "sales"
  | "marketing"
  | "hr"
  | "finance"
  | "legal"
  | "coding"
  | "research"
  | "content"
  | "social"
  | "data"
  | "email"
  | "productivity";

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  description: string;
  avatar: string;
  color: string;
  borderColor: string;
  bgColor: string;
  initialGreeting: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface BusinessConfig {
  companyName: string;
  description: string;
  targetAudience: string;
}

export interface ActiveTab {
  id: "dashboard" | "agents" | "generator" | "dev-suite" | "mobile-mock" | "legal-privacy" | "monetization" | "client-finder";
  name: string;
}

export interface FinancialMetric {
  name: string;
  revenue: number;
  tokens: number;
  conversions: number;
  marketingRoi: number;
}
