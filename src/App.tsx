import { useState, useEffect, useRef } from "react";
import {
  Brain,
  LayoutDashboard,
  Bot,
  FileText,
  Terminal,
  Smartphone,
  ShieldAlert,
  Send,
  Copy,
  Check,
  Settings,
  DollarSign,
  Users,
  Percent,
  Cpu,
  TrendingUp,
  Coins,
  Activity,
  Play,
  RefreshCw,
  Sliders,
  Volume2,
  Camera,
  Bell,
  Wifi,
  CheckCircle,
  ChevronRight,
  Info,
  Layers,
  Lock,
  Code,
  FolderOpen,
  Database,
  ArrowRight,
  CreditCard,
  ArrowUpRight,
  Plus,
  Globe
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";

import { AGENTS_LIST } from "./agentsData";
import { ActiveTab, Agent, ChatMessage, BusinessConfig, FinancialMetric } from "./types";
import {
  GITHUB_REPOSITORY_TREE,
  DEV_FILES_Boilerplate,
  POSTGRES_TABLES_SCHEMA,
  MOCK_API_ENDPOINTS
} from "./devBoilerplate";
import ClientFinder from "./components/ClientFinder";

export default function App() {
  // Tabs config
  const TABS: ActiveTab[] = [
    { id: "dashboard", name: "Executive Suite" },
    { id: "client-finder", name: "Global Client Finder" },
    { id: "agents", name: "AI Agents Hub" },
    { id: "generator", name: "SaaS Asset Forge" },
    { id: "monetization", name: "Monetization Hub" },
    { id: "dev-suite", name: "Developer Control" },
    { id: "mobile-mock", name: "Mobile Preview" },
    { id: "legal-privacy", name: "Legal & Audits" }
  ];

  const [activeTab, setActiveTab] = useState<ActiveTab["id"]>("dashboard");

  // 6. Monetization Hub & Stripe Billing States
  const [stripePlans, setStripePlans] = useState([
    { id: "starter", name: "Starter Tier", price: 49, limit: "10,000 routed requests", active: true, features: ["5 specialized AI agents", "Standard prompt caching", "99.5% uptime SLA", "Email support"] },
    { id: "growth", name: "Growth Tier", price: 149, limit: "100,000 routed requests", active: true, features: ["Unlimited specialized AI agents", "Dynamic memory routing", "Custom token limits", "Priority Slack support"] },
    { id: "enterprise", name: "Enterprise Custom", price: 499, limit: "Unlimited / Private VPC", active: true, features: ["Dedicated model fine-tuning", "HIPAA & SOC2 compliance", "Custom RAG vector storage", "24/7 dedicated support engineer"] }
  ]);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<any>(null);
  const [checkoutCardName, setCheckoutCardName] = useState("");
  const [checkoutCardNumber, setCheckoutCardNumber] = useState("");
  const [checkoutCardExpiry, setCheckoutCardExpiry] = useState("");
  const [checkoutCardCvc, setCheckoutCardCvc] = useState("");
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [activeSubscribers, setActiveSubscribers] = useState<any[]>([
    { id: "sub_01", name: "Acme Enterprise Corp", email: "billing@acme.com", plan: "Enterprise Custom", amount: 499, status: "Active", date: "2026-07-18" },
    { id: "sub_02", name: "Innovate AI", email: "finance@innovate.ai", plan: "Growth Tier", amount: 149, status: "Active", date: "2026-07-17" },
    { id: "sub_03", name: "MicroSaaS Founder", email: "hello@microsaas.co", plan: "Starter Tier", amount: 49, status: "Active", date: "2026-07-16" }
  ]);
  const [simulatedRevenueLog, setSimulatedRevenueLog] = useState<any[]>([
    { id: "tx_01", customer: "Acme Enterprise Corp", type: "Subscription Payment", amount: 499, status: "Succeeded", date: "2026-07-18 08:34:21" },
    { id: "tx_02", customer: "Innovate AI", type: "Subscription Payment", amount: 149, status: "Succeeded", date: "2026-07-17 14:12:05" },
    { id: "tx_03", customer: "MicroSaaS Founder", type: "Subscription Payment", amount: 49, status: "Succeeded", date: "2026-07-16 11:45:30" }
  ]);

  // Global Corporate Config
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>({
    companyName: "Synapse AI",
    description: "Autonomously routes workloads to 11+ LLMs while maintaining persistent cross-agent semantic memory blocks.",
    targetAudience: "Scaling startups and enterprise operations managers"
  });

  const [tempConfig, setTempConfig] = useState<BusinessConfig>({ ...businessConfig });

  // Live Market Benchmarks State (fetched from the real-world Gemini-powered market API)
  const [liveBenchmarks, setLiveBenchmarks] = useState<any>({
    medianSaasConversionRate: 3.4,
    medianSubscriberChurn: 5.2,
    estimatedCustomerLtv: 1250,
    marketTam: 140000000,
    marketGrowthRate: 18.5,
    competitorPricing: [
      { name: "CrewAI Enterprise", price: 89, plan: "Growth" },
      { name: "CoPilot for Business", price: 30, plan: "Starter" },
      { name: "Custom Agent Solution", price: 350, plan: "Enterprise" }
    ],
    isLoading: false,
    isLive: false
  });

  // ==========================================
  // CLIENT ACQUISITION SYSTEM STATES
  // ==========================================
  const [leads, setLeads] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [crmLoading, setCrmLoading] = useState(false);

  // Discovery engine
  const [discoveryFilters, setDiscoveryFilters] = useState({
    country: "Any",
    industry: "Any",
    size: "Any",
    techStack: "Any",
    hiringStatus: "Any",
    aiAdoption: "Any",
    websiteQuality: "Any"
  });
  const [discoveryScanning, setDiscoveryScanning] = useState(false);

  // Website analyzer
  const [websiteAuditUrl, setWebsiteAuditUrl] = useState("");
  const [websiteAuditReport, setWebsiteAuditReport] = useState("");
  const [websiteAuditing, setWebsiteAuditing] = useState(false);

  // Proposal Generator
  const [proposalNotes, setProposalNotes] = useState("");
  const [proposalGenerated, setProposalGenerated] = useState<any>(null);
  const [proposalGenerating, setProposalGenerating] = useState(false);

  // Email outreach
  const [emailCampaignType, setEmailCampaignType] = useState("cold");
  const [emailLanguage, setEmailLanguage] = useState("English");
  const [emailSenderName, setEmailSenderName] = useState("Alex (Growth Head)");
  const [emailGenerated, setEmailGenerated] = useState("");
  const [emailGenerating, setEmailGenerating] = useState(false);

  // AI Sales Assistant Chatbot
  const [salesAssistantMsg, setSalesAssistantMsg] = useState("");
  const [salesAssistantHistory, setSalesAssistantHistory] = useState<any[]>([
    { role: "assistant", text: "Welcome to your growth suite! Let me know which hot leads you'd like to analyze, how to price custom multi-agent workloads, or ask me for a performance checklist." }
  ]);
  const [salesAssistantLoading, setSalesAssistantLoading] = useState(false);

  // Refresh helper for CRM state
  const refreshCrmData = async () => {
    try {
      const crmRes = await fetch("/api/client-finder/crm");
      if (crmRes.ok) {
        const crmData = await crmRes.json();
        if (crmData.success) {
          setDeals(crmData.deals || []);
          setTasks(crmData.tasks || []);
          setMeetings(crmData.meetings || []);
          setProposals(crmData.proposals || []);
          setAuditLogs(crmData.auditLogs || []);
        }
      }
      const leadsRes = await fetch("/api/client-finder/leads");
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        if (leadsData.success) {
          setLeads(leadsData.leads || []);
          if (leadsData.leads?.length > 0 && !selectedLeadId) {
            setSelectedLeadId(leadsData.leads[0].id);
          }
        }
      }
    } catch (err) {
      console.error("Error syncing CRM state:", err);
    }
  };

  // Load persistent DB data from Express backend on mount
  useEffect(() => {
    const loadBackendData = async () => {
      try {
        const configRes = await fetch("/api/business/config");
        if (configRes.ok) {
          const configData = await configRes.json();
          if (configData && configData.companyName) {
            setBusinessConfig(configData);
            setTempConfig(configData);
          }
        }
        
        const monetizationRes = await fetch("/api/monetization/state");
        if (monetizationRes.ok) {
          const monData = await monetizationRes.json();
          if (monData.stripePlans) setStripePlans(monData.stripePlans);
          if (monData.activeSubscribers) setActiveSubscribers(monData.activeSubscribers);
          if (monData.simulatedRevenueLog) setSimulatedRevenueLog(monData.simulatedRevenueLog);
        }

        // Fetch client acquisition records
        await refreshCrmData();
      } catch (error) {
        console.error("Error loading persistent data from backend:", error);
      }
    };
    loadBackendData();
  }, []);

  // Fetch real-world customized SaaS benchmarks and LLM pricing via Gemini on business config change
  const fetchLiveBenchmarks = async () => {
    setLiveBenchmarks(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch("/api/market/benchmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessConfig)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.benchmarks) {
          setLiveBenchmarks({
            ...data.benchmarks,
            isLoading: false,
            isLive: data.live
          });
          if (data.benchmarks.medianSaasConversionRate) {
            setTargetConversion(data.benchmarks.medianSaasConversionRate);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching live benchmarks:", error);
      setLiveBenchmarks(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchLiveBenchmarks();
  }, [businessConfig]);

  const handleUpdateConfig = async () => {
    setBusinessConfig({ ...tempConfig });
    try {
      const response = await fetch("/api/business/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempConfig)
      });
      if (response.ok) {
        showNotification("Company Config Synchronized!", "All agents, metrics and documents updated.");
      }
    } catch (err) {
      console.error("Error updating business config on server:", err);
      showNotification("Config Updated locally", "Failed to sync to cloud database.");
    }
  };

  // Notification States for Mobile & Global
  const [notification, setNotification] = useState<{ title: string; desc: string; show: boolean }>({
    title: "",
    desc: "",
    show: false
  });

  const showNotification = (title: string, desc: string) => {
    setNotification({ title, desc, show: true });
    // Sound beep simulator or simple timeout
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4500);
  };

  // UTC Clock State
  const [utcTime, setUtcTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 1. Interactive Modeler State
  const [marketingBudget, setMarketingBudget] = useState(15000); // monthly budget
  const [pricingTier, setPricingTier] = useState(89); // $/user/month
  const [targetConversion, setTargetConversion] = useState(3.4); // conversion percentage
  const [routingEfficiency, setRoutingEfficiency] = useState(72); // routing cost savings percentage

  // Generated projection metrics based on sliders
  const calculateMetrics = (): FinancialMetric[] => {
    const data: FinancialMetric[] = [];
    const monthlyVisitors = marketingBudget * 0.15; // $0.15 per visitor average
    const conversions = Math.round(monthlyVisitors * (targetConversion / 100));
    const monthlyNewRevenue = conversions * pricingTier;
    const directLLMCostRaw = conversions * 12.5; // average LLM tokens cost without routing
    const directLLMCostRouted = directLLMCostRaw * (1 - routingEfficiency / 100);

    for (let month = 1; month <= 12; month++) {
      // Compounded organic visitors & retention curves
      const organicFactor = 1 + (month * 0.08);
      const activeUsers = Math.round((conversions * month * 0.85) * organicFactor); // 15% churn
      const grossRevenue = activeUsers * pricingTier;
      const computedTokensUsed = Math.round(activeUsers * 120000); // 120k tokens per active user avg
      const computedMarketingRoi = Number(((grossRevenue / marketingBudget) * 100).toFixed(1));

      data.push({
        name: `Month ${month}`,
        revenue: grossRevenue,
        tokens: computedTokensUsed,
        conversions: Math.round(conversions * organicFactor),
        marketingRoi: isNaN(computedMarketingRoi) ? 0 : computedMarketingRoi
      });
    }
    return data;
  };

  const projectionData = calculateMetrics();
  const currentMonthData = projectionData[11]; // Month 12 Projection

  // 2. AI Agents Hub States
  const [selectedAgentId, setSelectedAgentId] = useState<Agent["id"]>("support");
  const selectedAgent = AGENTS_LIST.find(a => a.id === selectedAgentId) || AGENTS_LIST[0];

  // Map of conversation histories for each agent
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>(() => {
    const initial: Record<string, ChatMessage[]> = {};
    AGENTS_LIST.forEach(agent => {
      initial[agent.id] = [
        {
          id: "welcome",
          role: "assistant",
          text: agent.initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ];
    });
    return initial;
  });

  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistories, selectedAgentId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = chatHistories[selectedAgentId] || [];
    const updatedHistory = [...currentHistory, userMsg];

    setChatHistories(prev => ({
      ...prev,
      [selectedAgentId]: updatedHistory
    }));

    setInputMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgentId,
          message: userMsg.text,
          history: currentHistory.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistories(prev => ({
        ...prev,
        [selectedAgentId]: [...prev[selectedAgentId], assistantMsg]
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  // 3. Artifact SaaS Asset Forge States
  const [selectedArtifactType, setSelectedArtifactType] = useState<string>("pitch");
  const [artifactOutput, setArtifactOutput] = useState("");
  const [isGeneratingArtifact, setIsGeneratingArtifact] = useState(false);
  const [copiedState, setCopiedState] = useState(false);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
    showNotification("Copied to Clipboard", "Boilerplate/asset copied successfully.");
  };

  const handleGenerateArtifact = async () => {
    setIsGeneratingArtifact(true);
    setArtifactOutput("");

    try {
      const response = await fetch("/api/business/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedArtifactType,
          companyName: businessConfig.companyName,
          description: businessConfig.description,
          targetAudience: businessConfig.targetAudience
        })
      });

      const data = await response.json();
      setArtifactOutput(data.text);
    } catch (err) {
      console.error(err);
      setArtifactOutput("Failed to compile workspace artifacts. Please check your network connection.");
    } finally {
      setIsGeneratingArtifact(false);
    }
  };

  // Trigger initial generate on first mounting tab or click
  useEffect(() => {
    if (activeTab === "generator" && !artifactOutput) {
      handleGenerateArtifact();
    }
  }, [activeTab, selectedArtifactType]);

  // 4. Developer Control States
  const [selectedDevFile, setSelectedDevFile] = useState<string>("backend/src/main.ts");
  const activeDevFile = DEV_FILES_Boilerplate[selectedDevFile];

  // API Tester States
  const [apiTerminalOutput, setApiTerminalOutput] = useState<string>("// Send a test query to see immediate JSON routing response.");
  const [isTestingApi, setIsTestingApi] = useState(false);

  const handleTestApi = async (endpoint: any) => {
    setIsTestingApi(true);
    setApiTerminalOutput(`> POST ${endpoint.url}\n> Content-Type: application/json\n> Executing model parameters...\n\n`);

    try {
      // Simulate/Trigger real request depending on route
      let realEndpoint = endpoint.url;
      let bodyData = JSON.parse(endpoint.payload);

      // Customize body to match current global config
      if (bodyData.companyName) bodyData.companyName = businessConfig.companyName;

      const response = await fetch(realEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();
      setApiTerminalOutput(prev => prev + `[Response Header: 200 OK]\n` + JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiTerminalOutput(prev => prev + `[Network Failure]\nError: ${err.message}`);
    } finally {
      setIsTestingApi(false);
    }
  };

  // 5. Mobile Simulation States
  const [isMobileOnline, setIsMobileOnline] = useState(true);
  const [mobileScreen, setMobileScreen] = useState<"dashboard" | "voice" | "ocr">("dashboard");
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrTextResult, setOcrTextResult] = useState("");

  const triggerMobileNotification = () => {
    showNotification(
      "🚀 System Event Triggered",
      "Model-Router just deflected 12k classified queries to DeepSeek-R1, saving $142."
    );
  };

  return (
    <div className="min-h-screen bg-[#050608] text-[#e0e0e0] font-sans flex flex-col selection:bg-blue-500 selection:text-white relative overflow-hidden select-none">
      {/* Immersive UI Glow Backlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
      </div>

      {/* 1. Global Alert Banner */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 max-w-sm w-full bg-slate-900/90 border border-blue-500/30 backdrop-blur-md rounded-xl p-4 shadow-2xl shadow-blue-500/10 flex items-start gap-3"
          >
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1">
              <h4 className="font-display font-semibold text-sm text-white">{notification.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{notification.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Top Navigation Hub */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center">
            <span className="text-black font-black text-xs">SO</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tighter uppercase italic leading-none">
                SYNAPSE OS <span className="text-blue-400">v1.4</span>
              </h1>
              <span className="text-[10px] bg-white/5 border border-white/20 px-2 py-0.5 rounded-full font-mono text-white/50">
                SYSTEM STABLE
              </span>
            </div>
            <p className="text-[9px] text-white/40 font-mono tracking-[0.1em] uppercase mt-0.5">
              NEURAL OPERATING MATRIX
            </p>
          </div>
        </div>

        {/* Global Configuration Bar - styled with Immersive UI theme inputs */}
        <div className="hidden md:flex items-center gap-3 bg-white/5 p-1.5 rounded-xl border border-white/10 max-w-xl">
          <div className="flex items-center gap-1.5 px-2 text-xs text-white/40">
            <Settings className="w-3.5 h-3.5" />
            <span className="font-bold uppercase text-[9px] tracking-wider">SaaS PROFILE:</span>
          </div>
          <input
            type="text"
            value={tempConfig.companyName}
            onChange={(e) => setTempConfig({ ...tempConfig, companyName: e.target.value })}
            placeholder="Company Name"
            className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 w-28 font-semibold transition-colors"
          />
          <input
            type="text"
            value={tempConfig.description}
            onChange={(e) => setTempConfig({ ...tempConfig, description: e.target.value })}
            placeholder="Product tagline"
            className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 w-48 font-light hidden lg:inline-block truncate transition-colors"
          />
          <button
            onClick={handleUpdateConfig}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-widest rounded shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            Sync
          </button>
        </div>

        {/* Right side widgets */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden lg:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] uppercase font-bold text-white/60">ONLINE</span>
          </div>
          <span className="text-[10px] bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 text-white/80 font-mono">
            {utcTime || "UTC CLOCK"}
          </span>
        </div>
      </header>

      {/* 3. Main Workspace Container */}
      <div className="flex-1 flex flex-col lg:flex-row h-full">
        {/* Left Side Navigation bar */}
        <aside className="lg:w-64 border-r border-white/10 bg-black/40 backdrop-blur-md p-4 space-y-2 flex-shrink-0 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 lg:gap-0 z-10">
          <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-white/40 font-bold hidden lg:block uppercase">
            Operating Modules
          </div>
          {TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all w-full text-left whitespace-nowrap lg:whitespace-normal group border ${
                  isSelected
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)] font-bold"
                    : "text-white/50 hover:text-white hover:bg-white/5 border-transparent"
                }`}
              >
                {tab.id === "dashboard" && <LayoutDashboard className="w-4 h-4 flex-shrink-0" />}
                {tab.id === "agents" && <Bot className="w-4 h-4 flex-shrink-0" />}
                {tab.id === "generator" && <FileText className="w-4 h-4 flex-shrink-0" />}
                {tab.id === "monetization" && <DollarSign className="w-4 h-4 flex-shrink-0" />}
                {tab.id === "dev-suite" && <Terminal className="w-4 h-4 flex-shrink-0" />}
                {tab.id === "mobile-mock" && <Smartphone className="w-4 h-4 flex-shrink-0" />}
                {tab.id === "legal-privacy" && <ShieldAlert className="w-4 h-4 flex-shrink-0" />}
                <span>{tab.name}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block" />
              </button>
            );
          })}

          <div className="hidden lg:block pt-8 mt-auto px-1">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-2 uppercase tracking-widest text-[10px]">
                <Layers className="w-3.5 h-3.5" />
                Neural Route
              </div>
              <p className="text-[10px] text-white/40 font-light leading-relaxed mb-3">
                Routing framework active on Gemini 3.5 Flash for high efficiency.
              </p>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
                <div className="h-full w-[85%] bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
              </div>
              <div className="flex items-center justify-between font-mono text-[9px] text-white/30">
                <span>LATENCY</span>
                <span className="text-emerald-400">~120ms</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[9px] text-white/30 mt-1">
                <span>SAVINGS</span>
                <span className="text-emerald-400">72%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="flex-1 bg-black/10 p-6 overflow-y-auto max-w-7xl mx-auto w-full z-10">
          {/* Tab Content 1: Strategic Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Introduction Banner */}
              <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.1),transparent_40%)]"></div>
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
                    <Activity className="w-3 h-3 animate-pulse" /> SIMULATION & STRATEGIC MODULAR
                  </span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                    Executive Financial Modeling Suite
                  </h2>
                  <p className="text-slate-400 text-sm mt-2 font-light leading-relaxed">
                    Optimize unit economics for <span className="text-white font-semibold">{businessConfig.companyName}</span>. 
                    Adjust slider parameters below to calculate dynamic MRR, marketing efficiency loops, 
                    and routing savings on the 12-month projection matrix.
                  </p>
                </div>
              </div>

              {/* Sliders and Dynamic Calculations */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sliders Controls Panel */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-6 lg:col-span-1">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">Variables Panel</h3>
                  </div>

                  {/* Slider 1 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/50 uppercase font-bold text-[10px] tracking-wider">Marketing Budget</span>
                      <span className="text-blue-400 font-semibold">${marketingBudget.toLocaleString()}/mo</span>
                    </div>
                    <input
                      type="range"
                      min="2000"
                      max="100000"
                      step="2500"
                      value={marketingBudget}
                      onChange={(e) => setMarketingBudget(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <p className="text-[9px] text-white/30 italic">Determines monthly traffic loop scale.</p>
                  </div>

                  {/* Slider 2 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/50 uppercase font-bold text-[10px] tracking-wider">Pricing per User</span>
                      <span className="text-blue-400 font-semibold">${pricingTier}/mo</span>
                    </div>
                    <input
                      type="range"
                      min="9"
                      max="499"
                      step="5"
                      value={pricingTier}
                      onChange={(e) => setPricingTier(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <p className="text-[9px] text-white/30 italic">Drives customer lifetime value (LTV).</p>
                  </div>

                  {/* Slider 3 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/50 uppercase font-bold text-[10px] tracking-wider">Target Conversion</span>
                      <span className="text-blue-400 font-semibold">{targetConversion}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="15.0"
                      step="0.1"
                      value={targetConversion}
                      onChange={(e) => setTargetConversion(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <p className="text-[9px] text-white/30 italic">Conversion of landing traffic into subscribers.</p>
                  </div>

                  {/* Slider 4 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/50 uppercase font-bold text-[10px] tracking-wider">Model Router Efficiency</span>
                      <span className="text-blue-400 font-semibold">{routingEfficiency}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="95"
                      step="5"
                      value={routingEfficiency}
                      onChange={(e) => setRoutingEfficiency(Number(e.target.value))}
                      className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <p className="text-[9px] text-white/30 italic">Percentage of LLM cost saved by smart routing.</p>
                  </div>
                </div>

                {/* Dashboard Metrics Cards & Chart */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Dynamic calculation display card widgets */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/50 uppercase tracking-wider mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-blue-400" />
                        MRR (M12)
                      </div>
                      <p className="text-lg font-bold text-white font-mono">
                        ${currentMonthData.revenue.toLocaleString()}
                      </p>
                      <p className="text-[9px] text-white/30 mt-0.5">Projected revenue</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/50 uppercase tracking-wider mb-1">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        Users (M12)
                      </div>
                      <p className="text-lg font-bold text-white font-mono">
                        {Math.round(currentMonthData.revenue / pricingTier).toLocaleString()}
                      </p>
                      <p className="text-[9px] text-white/30 mt-0.5">Active subscribers</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/50 uppercase tracking-wider mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                        ROI Loop
                      </div>
                      <p className="text-lg font-bold text-white font-mono">
                        {currentMonthData.marketingRoi}%
                      </p>
                      <p className="text-[9px] text-white/30 mt-0.5">Marketing payback</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/50 uppercase tracking-wider mb-1">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        Tokens Saved
                      </div>
                      <p className="text-lg font-bold text-white font-mono">
                        {Math.round(currentMonthData.tokens * (routingEfficiency / 100)).toLocaleString()}
                      </p>
                      <p className="text-[9px] text-white/30 mt-0.5">Monthly compression</p>
                    </div>
                  </div>

                  {/* Area Chart visualization of Revenue projections */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">12-Month Projections Matrix</h4>
                      </div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">DYNAMIC REAL-TIME UPDATE</span>
                    </div>

                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" opacity={0.3} />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                          <Tooltip
                            contentStyle={{ backgroundColor: "rgba(5, 6, 8, 0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                            labelStyle={{ color: "rgba(255,255,255,0.6)", fontWeight: "bold" }}
                          />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                          <Area type="monotone" dataKey="revenue" name="Monthly Projected MRR ($)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Market Intelligence Grounding Panel */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest">
                      Live Market Intelligence Grounding
                    </h4>
                  </div>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-black uppercase border ${
                    liveBenchmarks.isLive 
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                      : "bg-white/5 text-white/40 border-white/10"
                  }`}>
                    {liveBenchmarks.isLoading ? "Analyzing via Gemini..." : liveBenchmarks.isLive ? "Live Sync Active" : "Local Database Mode"}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                    <span className="text-[8px] font-mono uppercase font-bold text-white/40 block mb-1">Target TAM Estimate</span>
                    <p className="text-sm font-bold text-white font-mono">
                      ${(liveBenchmarks.marketTam || 140000000).toLocaleString()}
                    </p>
                    <span className="text-[8px] text-white/30 font-mono mt-0.5 block">Serviceable volume</span>
                  </div>

                  <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                    <span className="text-[8px] font-mono uppercase font-bold text-white/40 block mb-1">Industry CAGR %</span>
                    <p className="text-sm font-bold text-emerald-400 font-mono">
                      +{liveBenchmarks.marketGrowthRate || 18.5}%
                    </p>
                    <span className="text-[8px] text-white/30 font-mono mt-0.5 block">Compound growth rate</span>
                  </div>

                  <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                    <span className="text-[8px] font-mono uppercase font-bold text-white/40 block mb-1">Estimated LTV</span>
                    <p className="text-sm font-bold text-blue-400 font-mono">
                      ${(liveBenchmarks.estimatedCustomerLtv || 1250).toLocaleString()}
                    </p>
                    <span className="text-[8px] text-white/30 font-mono mt-0.5 block">Customer lifetime value</span>
                  </div>

                  <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                    <span className="text-[8px] font-mono uppercase font-bold text-white/40 block mb-1">Median Churn Rate</span>
                    <p className="text-sm font-bold text-rose-400 font-mono">
                      {liveBenchmarks.medianSubscriberChurn || 5.2}%
                    </p>
                    <span className="text-[8px] text-white/30 font-mono mt-0.5 block">Monthly churn index</span>
                  </div>
                </div>

                {/* Live Competitor Benchmarking Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono uppercase font-bold text-white/50 block border-b border-white/5 pb-1">
                      Competitor Pricing Analysis ({businessConfig.companyName} vs Market)
                    </span>
                    <div className="space-y-1.5 font-mono text-[10px]">
                      {liveBenchmarks.competitorPricing?.map((comp: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-white/70">
                          <span>{comp.name} ({comp.plan})</span>
                          <span className="font-bold text-white">${comp.price}/mo</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono uppercase font-bold text-white/50 block border-b border-white/5 pb-1">
                      Current Live API Routing Costs (Estimate)
                    </span>
                    <div className="space-y-1 font-mono text-[9px] text-white/60">
                      <div className="flex justify-between">
                        <span>Gemini 1.5 Flash</span>
                        <span className="text-emerald-400">$0.075 / $0.30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gemini 1.5 Pro</span>
                        <span className="text-emerald-400">$1.25 / $5.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Claude 3.5 Sonnet</span>
                        <span className="text-amber-400">$3.00 / $15.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GPT-4o</span>
                        <span className="text-blue-400">$2.50 / $10.00</span>
                      </div>
                      <p className="text-[7px] text-white/30 text-right uppercase tracking-wider pt-1">
                        *Cost per million tokens (Input/Output)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Startup Metrics details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-400" /> Unit Economics Formula Breakdown
                  </h4>
                  <p className="text-xs text-white/40 font-light leading-relaxed">
                    Our platform automates **Dynamic Router Scheduling** so that complex requests (e.g. detailed logic, coding audits) are routed to Claude/GPT-4o, while simple validations or summarizations are resolved instantly via Gemini 3.5 Flash or local Llama arrays.
                  </p>
                  <div className="space-y-2 font-mono text-[10px]">
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-white/30 font-bold uppercase">Direct CAC Formula</span>
                      <span className="text-white">Budget / (Traffic * Conversion)</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-white/30 font-bold uppercase">Gross Margin Target</span>
                      <span className="text-white">92.4% (With Core Router efficiency)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/30 font-bold uppercase">Compounded Organic Uplift</span>
                      <span className="text-emerald-400">+8.0% compounding month-over-month</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-5 space-y-4">
                  <h4 className="text-xs font-bold text-blue-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-blue-300" /> Automated Optimization Workflows
                  </h4>
                  <p className="text-xs text-blue-100/60 font-light leading-relaxed">
                    By binding our **13 specialized agents** to persistent workspace memories, operations trigger autonomous tasks automatically. For example, when Customer Support processes 20 tickets, the Social agent drafts an update for LinkedIn instantly.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-mono">
                    <div className="bg-black/40 border border-white/10 p-2.5 rounded-lg">
                      <div className="text-blue-400 font-bold mb-0.5">ZAP TRIGGER</div>
                      <span className="text-white/30 uppercase font-bold">Stripe Billing Created</span>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-2.5 rounded-lg">
                      <div className="text-emerald-400 font-bold mb-0.5">MEMORY BLOCK</div>
                      <span className="text-white/30 uppercase font-bold">Support Context Merged</span>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-2.5 rounded-lg">
                      <div className="text-purple-400 font-bold mb-0.5">ROUTER EXEC</div>
                      <span className="text-white/30 uppercase font-bold">Drip campaign fired</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Specialized AI Agents Workspace */}
          {activeTab === "agents" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[550px]">
              {/* Left Agents Selection list */}
              <div className="xl:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col h-full overflow-hidden">
                <div className="mb-3 border-b border-white/10 pb-3">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-400" />
                    Specialized Co-Pilots ({AGENTS_LIST.length})
                  </h3>
                  <p className="text-[10px] text-white/40 mt-0.5">Click to invoke or chat with a specialized context block.</p>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {AGENTS_LIST.map((agent) => {
                    const isSelected = selectedAgentId === agent.id;
                    return (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgentId(agent.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 group relative ${
                          isSelected
                            ? "bg-blue-500/10 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                            : "bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${agent.color} flex items-center justify-center text-lg flex-shrink-0 shadow-md`}>
                          {agent.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                              {agent.name}
                            </span>
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                          </div>
                          <span className="block text-[9px] text-white/40 font-mono font-bold tracking-wider uppercase mt-0.5">
                            {agent.role}
                          </span>
                          <p className="text-[10px] text-white/30 font-light mt-1 truncate">
                            {agent.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Agent Chat Sandbox */}
              <div className="xl:col-span-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col h-full overflow-hidden">
                {/* Active Agent Info Header */}
                <div className="p-4 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${selectedAgent.color} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
                      {selectedAgent.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">{selectedAgent.name}</h3>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                          Routing Active
                        </span>
                      </div>
                      <p className="text-[10px] text-white/40 mt-0.5">{selectedAgent.role}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setChatHistories(prev => ({
                        ...prev,
                        [selectedAgentId]: [
                          {
                            id: "welcome",
                            role: "assistant",
                            text: selectedAgent.initialGreeting,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          }
                        ]
                      }));
                      showNotification("Conversation Reset", `Cleared chat logs for ${selectedAgent.name}.`);
                    }}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 rounded-lg transition-all text-[10px] font-mono flex items-center gap-1.5"
                    title="Reset Conversation"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset
                  </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {(chatHistories[selectedAgentId] || []).map((msg) => {
                    const isUser = msg.role === "user";
                    return (
                      <div key={msg.id} className={`flex gap-3 max-w-3xl ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 shadow-sm ${
                          isUser ? "bg-blue-500 text-black font-black" : `bg-gradient-to-tr ${selectedAgent.color}`
                        }`}>
                          {isUser ? "U" : selectedAgent.avatar}
                        </div>
                        <div>
                          <div className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                            isUser
                              ? "bg-blue-600 text-black font-semibold"
                              : "bg-white/5 border border-white/10 text-[#e0e0e0]"
                          }`}>
                            {isUser ? (
                              msg.text
                            ) : (
                              <div className="markdown-body">
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                              </div>
                            )}
                          </div>
                          <span className={`block text-[9px] text-white/30 mt-1 font-mono ${isUser ? "text-right" : "text-left"}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {isSending && (
                    <div className="flex gap-3 mr-auto items-center">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${selectedAgent.color} flex items-center justify-center text-sm flex-shrink-0 animate-pulse`}>
                        {selectedAgent.avatar}
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Message Input Footer */}
                <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md flex items-center gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder={`Message ${selectedAgent.name}...`}
                    disabled={isSending}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isSending}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-white/5 disabled:text-white/20 text-black p-3 rounded-xl transition-all font-black flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab === "generator" && (
            <div className="space-y-6">
              {/* Introduction header */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2 uppercase">
                      ⚡ ARTIFACT GENERATOR ENGINE
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase italic">SaaS Corporate Asset Forge</h2>
                    <p className="text-xs text-white/40 mt-1">
                      Compile investor-grade decks, compliance agreements, cold campaigns, and product roadmaps dynamically.
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateArtifact}
                    disabled={isGeneratingArtifact}
                    className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  >
                    {isGeneratingArtifact ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                    Re-Compile Artifact
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left controls */}
                <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-white/40 font-bold block px-2 py-1 border-b border-white/10 pb-2 mb-2 uppercase">
                    SELECT EXPORT MATRIX
                  </span>

                  {[
                    { id: "pitch", name: "Seed Investment Pitch", desc: "Venture-grade 5-slide pitch structure" },
                    { id: "landing-page", name: "SaaS Hero Landing Code", desc: "Interactive HTML / Tailwind markup" },
                    { id: "cold-email", name: "3-Step Outbound Emails", desc: "Problem-first sequence templates" },
                    { id: "sales-script", name: "Discovery Call Script", desc: "Objection handling & stages" },
                    { id: "roadmap", name: "Product Engineering Roadmap", desc: "Q1-Q4 technical deliverables" },
                    { id: "privacy-policy", name: "GDPR & CCPA Agreement", desc: "Formal data security clause layout" },
                    { id: "refund-policy", name: "Refund & Billing Policy", desc: "Terms of annual/token cancelation" }
                  ].map((art) => {
                    const isSelected = selectedArtifactType === art.id;
                    return (
                      <button
                        key={art.id}
                        onClick={() => setSelectedArtifactType(art.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col ${
                          isSelected
                            ? "bg-blue-500/10 border-blue-500/30 text-white"
                            : "bg-transparent border-transparent text-white/50 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="text-xs font-semibold">{art.name}</span>
                        <span className="text-[9px] text-white/30 font-light mt-0.5">{art.desc}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right rendered content panel */}
                <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col min-h-[480px]">
                  {/* Header bar */}
                  <div className="px-5 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-400">
                      COMPILE_OUTPUT: {selectedArtifactType.toUpperCase()}_MODEL
                    </span>
                    {artifactOutput && (
                      <button
                        onClick={() => handleCopyText(artifactOutput)}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-mono flex items-center gap-1.5 transition-all text-white/60 hover:text-white"
                      >
                        {copiedState ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        Copy Content
                      </button>
                    )}
                  </div>

                  {/* Rendered markdown body */}
                  <div className="flex-1 p-6 overflow-y-auto max-h-[500px]">
                    {isGeneratingArtifact ? (
                      <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs font-mono text-white/40">Compiling model parameters, querying vectors...</p>
                      </div>
                    ) : (
                      <div className="prose prose-invert prose-xs max-w-none text-[#e0e0e0]">
                        <div className="markdown-body">
                          <ReactMarkdown>{artifactOutput}</ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 4: Developer Control Suite */}
          {activeTab === "dev-suite" && (
            <div className="space-y-6">
              {/* Dev Suite Intro */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 uppercase">
                  <Terminal className="w-3.5 h-3.5" /> SYSTEM INTEGRATION & COMPILATION CONTEXT
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase italic">Full-Stack System Architect Browser</h2>
                <p className="text-xs text-white/40 mt-1">
                  Inspect the structural repositories, PostgreSQL relational schemas, and verify active API controllers in real-time.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Left Side: Repositories and Tables Tree Selection */}
                <div className="xl:col-span-4 space-y-6">
                  {/* Repo Tree block */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h4 className="text-[10px] font-mono tracking-wider text-white/40 font-bold block px-2 py-1 border-b border-white/10 pb-2 mb-3 uppercase flex items-center gap-1.5">
                      <FolderOpen className="w-3.5 h-3.5 text-blue-400" /> REPOSITORY WORKSPACE
                    </h4>

                    <div className="space-y-4">
                      {GITHUB_REPOSITORY_TREE.map((folder, index) => (
                        <div key={index} className="space-y-1">
                          <span className="text-[10px] font-bold text-white block font-mono pl-1 uppercase tracking-wide">
                            📁 {folder.name}
                          </span>
                          <div className="space-y-0.5 pl-3 border-l border-white/10">
                            {folder.children.map((file) => {
                              const isSelected = selectedDevFile === file.path;
                              return (
                                <button
                                  key={file.path}
                                  onClick={() => setSelectedDevFile(file.path)}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono truncate transition-all block border ${
                                    isSelected
                                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30 font-bold"
                                      : "text-white/50 border-transparent hover:text-white hover:bg-white/5"
                                  }`}
                                >
                                  📄 {file.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relational Postgres Database schema visualizer */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h4 className="text-[10px] font-mono tracking-wider text-white/40 font-bold block px-2 py-1 border-b border-white/10 pb-2 mb-3 uppercase flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-blue-400" /> PostgreSQL DB Schemas
                    </h4>

                    <div className="space-y-4">
                      {POSTGRES_TABLES_SCHEMA.map((table) => (
                        <div key={table.tableName} className="bg-black/40 border border-white/10 rounded-xl p-3">
                          <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2">
                            <span className="text-xs font-mono font-bold text-white">⚙️ {table.tableName}</span>
                            <span className="text-[9px] font-mono text-white/35 font-bold uppercase tracking-wider">RELATIONAL_MAP</span>
                          </div>
                          <p className="text-[10px] text-white/40 mb-2 leading-relaxed font-light">{table.description}</p>
                          <div className="space-y-1">
                            {table.columns.map((col) => (
                              <div key={col.name} className="flex justify-between font-mono text-[9px] text-white/30 hover:text-white/80 transition-colors">
                                <span className={col.isPk ? "text-blue-400 font-bold" : "text-white/50"}>
                                  {col.name} {col.isPk && "🔑"}
                                </span>
                                <span>{col.type}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Code Viewer & API Terminal */}
                <div className="xl:col-span-8 space-y-6">
                  {/* Active Code Panel */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                    <div className="px-5 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between">
                      <span className="text-xs font-mono text-white/40">
                        📝 PATH: <span className="text-blue-400 font-bold">{selectedDevFile}</span>
                      </span>
                      <button
                        onClick={() => handleCopyText(activeDevFile.code)}
                        className="px-2.5 py-1 text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white rounded-lg flex items-center gap-1 transition-all font-mono"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>

                    <pre className="p-4 bg-[#020304] text-[#e0e0e0] text-xs font-mono overflow-x-auto max-h-[350px] leading-relaxed">
                      <code>{activeDevFile.code}</code>
                    </pre>
                  </div>

                  {/* REST API Playground Controller console */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="border-b border-white/10 pb-3">
                      <h4 className="text-xs font-mono text-white flex items-center gap-1.5 uppercase font-bold tracking-wider">
                        <Terminal className="w-4 h-4 text-blue-400" /> Interactive REST API Controller Explorer
                      </h4>
                      <p className="text-[10px] text-white/40 mt-1">
                        Select an active controller router to dispatch a request to your live Node.js/Vite full-stack cluster.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Endpoints Selectors */}
                      <div className="space-y-2">
                        {MOCK_API_ENDPOINTS.map((endpoint, i) => (
                          <div key={i} className="bg-black/40 border border-white/10 rounded-xl p-3 flex flex-col justify-between items-start gap-3">
                            <div>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 mr-2 uppercase">
                                {endpoint.method}
                              </span>
                              <span className="font-mono text-xs text-[#e0e0e0]">{endpoint.url}</span>
                              <p className="text-[10px] text-white/40 mt-1 leading-relaxed">{endpoint.desc}</p>
                            </div>
                            <button
                              onClick={() => handleTestApi(endpoint)}
                              disabled={isTestingApi}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-widest rounded-lg flex items-center gap-1 transition-all disabled:opacity-50"
                            >
                              <Play className="w-3 h-3" /> Trigger Router test
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Playground Console Output terminal */}
                      <div className="bg-[#020304] rounded-xl border border-white/10 p-4 font-mono text-[10px] text-white/50 flex flex-col justify-between min-h-[160px]">
                        <pre className="overflow-y-auto max-h-[150px] leading-relaxed select-text text-emerald-400">
                          <code>{apiTerminalOutput}</code>
                        </pre>
                        <div className="border-t border-white/5 pt-2 mt-2 flex items-center justify-between text-[9px] text-white/30 uppercase font-bold tracking-wider">
                          <span>CONSOLE OUTPUT</span>
                          <span>STABLE CONNECTED</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 5: Mobile App Simulator */}
          {activeTab === "mobile-mock" && (
            <div className="space-y-6">
              {/* Introduction header */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2 uppercase">
                  <Smartphone className="w-3.5 h-3.5" /> NATIVE-LIKE HYBRID MOBILE SIMULATOR
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase italic">Synapse Companion Mobile Suite</h2>
                <p className="text-xs text-white/40 mt-1">
                  Test mobile integrations such as push notifications, camera-to-text OCR, or offline storage syncing inside a beautiful mock view.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left side Phone Frame Mockup container */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative mx-auto border-[10px] border-white/20 bg-[#020304] rounded-[40px] w-72 h-[550px] shadow-2xl flex flex-col justify-between overflow-hidden">
                    {/* Top Notch Area */}
                    <div className="absolute top-0 inset-x-0 h-5 bg-white/10 flex items-center justify-center rounded-b-xl z-20">
                      <div className="w-20 h-3 bg-black rounded-full"></div>
                    </div>

                    {/* Phone Inner Header */}
                    <div className="px-4 pt-8 pb-3 bg-black/40 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono z-10">
                      <div className="flex items-center gap-1">
                        <Wifi className="w-3 h-3 text-blue-400" />
                        <span>5G / LTE</span>
                      </div>
                      <span className="font-semibold text-white">Synapse App</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isMobileOnline ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`}></span>
                        <span>{isMobileOnline ? "SYNC" : "OFFLINE"}</span>
                      </div>
                    </div>

                    {/* Phone Body Workspace container */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                      {/* Active inner screen toggles */}
                      {mobileScreen === "dashboard" && (
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                            <span className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest">ACTIVE CLIENT WORKSPACE</span>
                            <h4 className="text-xs font-bold text-white">{businessConfig.companyName}</h4>
                            <p className="text-[10px] text-white/40 font-light leading-relaxed">
                              {businessConfig.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2.5 bg-black/40 border border-white/10 rounded-lg text-center">
                              <span className="block text-[8px] font-mono text-white/30 uppercase font-bold tracking-wider">API CHANNELS</span>
                              <span className="text-xs font-bold text-emerald-400">11 Active</span>
                            </div>
                            <div className="p-2.5 bg-black/40 border border-white/10 rounded-lg text-center">
                              <span className="block text-[8px] font-mono text-white/30 uppercase font-bold tracking-wider">SYNC LOG</span>
                              <span className="text-xs font-bold text-blue-400">SOC2 Ready</span>
                            </div>
                          </div>

                          {/* Quick features buttons */}
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-white/30 font-bold block mb-1 uppercase tracking-wider">CHOOSE CORE APP FEATURE</span>
                            <button
                              onClick={() => setMobileScreen("voice")}
                              className="w-full text-left p-2.5 bg-black/40 hover:bg-white/5 rounded-xl border border-white/5 text-[10px] font-medium flex items-center justify-between text-[#e0e0e0]"
                            >
                              <span>🎙️ Voice Dictation Assistant</span>
                              <ChevronRight className="w-3 h-3 text-white/35" />
                            </button>
                            <button
                              onClick={() => {
                                setMobileScreen("ocr");
                                setOcrTextResult("");
                              }}
                              className="w-full text-left p-2.5 bg-black/40 hover:bg-white/5 rounded-xl border border-white/5 text-[10px] font-medium flex items-center justify-between text-[#e0e0e0]"
                            >
                              <span>📷 Document Camera OCR</span>
                              <ChevronRight className="w-3 h-3 text-white/35" />
                            </button>
                          </div>
                        </div>
                      )}

                      {mobileScreen === "voice" && (
                        <div className="space-y-4 text-center py-4">
                          <h4 className="text-xs font-bold text-white flex items-center justify-center gap-1.5 uppercase font-bold tracking-wider">
                            <Volume2 className="w-4 h-4 text-blue-400" /> Voice Assistant
                          </h4>
                          <p className="text-[10px] text-white/40">Speak business questions to invoke agent cluster memory.</p>

                          <div className="my-6 flex justify-center">
                            <button
                              onClick={() => {
                                setIsVoiceRecording(!isVoiceRecording);
                                if (!isVoiceRecording) {
                                  showNotification("Listening...", "Say 'Show me my Q4 billing trends.'");
                                }
                              }}
                              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                                isVoiceRecording ? "bg-rose-500 animate-ping shadow-[0_0_15px_rgba(239,68,68,0.5)] text-white" : "bg-blue-600 hover:bg-blue-500 text-black shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                              } text-xl font-bold`}
                            >
                              {isVoiceRecording ? "🛑" : "🎙️"}
                            </button>
                          </div>

                          <p className="text-[10px] font-mono text-white/30 italic h-6">
                            {isVoiceRecording ? '"Analyzing voice metrics at 16kHz..."' : 'Click to trigger voice dictation'}
                          </p>

                          <button
                            onClick={() => setMobileScreen("dashboard")}
                            className="text-[9px] text-blue-400 font-semibold underline block mx-auto uppercase tracking-wider"
                          >
                            Return to Mobile Core
                          </button>
                        </div>
                      )}

                      {mobileScreen === "ocr" && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 justify-center uppercase font-bold tracking-wider">
                            <Camera className="w-4 h-4 text-blue-400" /> Document Camera OCR
                          </h4>

                          <div className="h-28 bg-[#020304] rounded-xl border border-white/10 flex flex-col items-center justify-center space-y-1 overflow-hidden relative">
                            {ocrScanning ? (
                              <div className="absolute inset-x-0 h-0.5 bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-bounce top-10"></div>
                            ) : null}
                            <Camera className="w-6 h-6 text-white/20" />
                            <span className="text-[9px] text-white/30 font-mono">Mock Camera Viewfinder</span>
                          </div>

                          <button
                            onClick={() => {
                              setOcrScanning(true);
                              setTimeout(() => {
                                setOcrScanning(false);
                                setOcrTextResult(`[OCR Scanned Output]\n\nInvoice ID: INV-2026-94\nDate: 2026-07-18\nNet Amount: $14,200.00\nStripe Fee: $411.80\nVendor: ForgeOS cloud limits`);
                                showNotification("OCR Processing Completed", "Text extracted successfully.");
                              }, 1800);
                            }}
                            disabled={ocrScanning}
                            className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-black font-black uppercase tracking-wider rounded-lg text-[10px] shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                          >
                            {ocrScanning ? "Scanning document..." : "Capture Sample Invoice OCR"}
                          </button>

                          {ocrTextResult && (
                            <pre className="bg-[#020304] border border-white/10 p-2 rounded-lg text-[9px] text-white/60 font-mono whitespace-pre-wrap leading-relaxed">
                              {ocrTextResult}
                            </pre>
                          )}

                          <button
                            onClick={() => setMobileScreen("dashboard")}
                            className="text-[9px] text-blue-400 font-semibold underline block mx-auto mt-2 uppercase tracking-wider"
                          >
                            Return to Mobile Core
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Phone Inner Footer */}
                    <div className="p-3 bg-black/40 border-t border-white/10 flex justify-center">
                      <div className="w-24 h-1 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Right side Simulator controls */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="border-b border-white/10 pb-3">
                      <h4 className="font-bold text-sm text-white uppercase tracking-wider italic">Integration Testing Board</h4>
                      <p className="text-xs text-white/40 mt-1">
                        Dispatch hardware commands to the device simulator to verify full-stack push notifications or test network resiliency.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Controller 1: Push Notification */}
                      <div className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-2">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold text-white">Trigger Push Notification</span>
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed">
                          Dispatch an external background webhook notifying the device about optimized LLM routing metrics.
                        </p>
                        <button
                          onClick={triggerMobileNotification}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-mono rounded-lg transition-all"
                        >
                          Send Device Event
                        </button>
                      </div>

                      {/* Controller 2: Offline Synchronization */}
                      <div className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-2">
                        <div className="flex items-center gap-2">
                          <Wifi className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold text-white">Toggle Offline Mode</span>
                        </div>
                        <p className="text-[11px] text-white/40 leading-relaxed">
                          Toggle LTE connectivity. When offline, transaction records queue locally inside client IndexedDB.
                        </p>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setIsMobileOnline(!isMobileOnline);
                              showNotification(
                                isMobileOnline ? "Network Status: OFFLINE" : "Network Status: CONNECTED",
                                isMobileOnline ? "Local memory queuing is active." : "Data synchronizing to cloud database."
                              );
                            }}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                              isMobileOnline
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            {isMobileOnline ? "Network Active (Connected)" : "Network Inactive (Offline)"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Description */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                    <h4 className="text-[10px] font-mono tracking-wider text-white/40 font-bold block border-b border-white/10 pb-2 mb-2 uppercase">
                      🛠️ HYBRID MOBILE STACK INFORMATION
                    </h4>
                    <p className="text-xs text-white/40 leading-relaxed font-light">
                      The Synapse Mobile Companion is built using a unified React Native / Expo framework sharing TypeScript declarations directly with the NestJS backend repository.
                    </p>
                    <ul className="text-[10px] text-white/30 space-y-1.5 font-mono">
                      <li>• <span className="text-white/60">Push Notifications</span>: Managed via Firebase Cloud Messaging (FCM) channels with dynamic payload routing.</li>
                      <li>• <span className="text-white/60">Offline Sync Engine</span>: Syncs queued tasks utilizing an exponential-backoff retry scheme over WebSockets.</li>
                      <li>• <span className="text-white/60">Camera OCR OCR Pipeline</span>: Captures receipts and parses JSON payloads utilizing Gemini 3.5 Flash server-side.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 6: Legal & Audits */}
          {activeTab === "legal-privacy" && (
            <div className="space-y-6">
              {/* Introduction header */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2 uppercase">
                  🛡️ CORPORATE LEGAL STANDARDS
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase italic">Legal, Privacy, & Compliance Suite</h2>
                <p className="text-xs text-white/40 mt-1">
                  GDPR and CCPA regulatory agreements updated dynamically based on active corporate settings.
                </p>
              </div>

              {/* Dynamic Legal Display Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CCPA GDPR block */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-400">📜 PRIVACY_POLICY.MD</span>
                    <span className="text-[9px] font-mono text-white/30 font-bold uppercase tracking-wider">GDPR & CCPA VALIDATED</span>
                  </div>
                  <div className="text-xs text-white/40 space-y-3 leading-relaxed font-light">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">1. Scope of Data Collection</h3>
                    <p>
                      This Policy governs processing of personal data collected for products managed by **{businessConfig.companyName}**. 
                      We collect and process personal data in order to offer {businessConfig.description} to {businessConfig.targetAudience} globally.
                    </p>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">2. AI Subprocessing Channels</h3>
                    <p>
                      All client queries processed by the model-router are handled utilizing secure server-side API connectors with subprocessors like Google (Gemini) and Anthropic. 
                      **None of our subprocessors are authorized to utilize transaction inputs to train their respective foundational models.**
                    </p>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">3. Zero-Knowledge Auditing</h3>
                    <p>
                      Workspace credentials, API secrets, and sensitive Stripe data keys are hashed in transit utilizing SHA-256 blocks with AES-GCM local storage encryption.
                    </p>
                  </div>
                </div>

                {/* Refund & billing terms */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-400">📜 REFUND_AND_BILLING.MD</span>
                    <span className="text-[9px] font-mono text-white/30 font-bold uppercase tracking-wider">SOC2 CERTIFICATION MOCK</span>
                  </div>
                  <div className="text-xs text-white/40 space-y-3 leading-relaxed font-light">
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">1. Billing Intervals</h3>
                    <p>
                      Our enterprise plans are billed on standard monthly or annual terms linked directly to the Stripe customer token.
                    </p>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">2. Consumption-Based Credit Deductions</h3>
                    <p>
                      If your team cancels prior to the end of the billing term, any accrued, routed token capacity is computed up to the minute of termination, and residual pricing balance is prorated inside Stripe.
                    </p>
                    <h3 className="text-white font-bold text-sm uppercase tracking-wide">3. 14-Day Safe Guarantee</h3>
                    <p>
                      We offer a 100% money-back guarantee for subscription tiers within the first 14 days of activation, provided total routed API requests do not exceed 10% of monthly tier limits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Compliance Badging checklist */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                <h4 className="text-[10px] font-mono tracking-wider text-white/40 font-bold block border-b border-white/10 pb-2 uppercase">
                  🏛️ COMPLIANCE STATUS REGISTRY
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10 flex flex-col items-center gap-1.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <span className="font-semibold text-[#e0e0e0]">SOC2 Type II</span>
                    <span className="text-[9px] font-mono text-white/30">Audit Complete</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10 flex flex-col items-center gap-1.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <span className="font-semibold text-[#e0e0e0]">GDPR Compliant</span>
                    <span className="text-[9px] font-mono text-white/30">Validated</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10 flex flex-col items-center gap-1.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <span className="font-semibold text-[#e0e0e0]">CCPA Aligned</span>
                    <span className="text-[9px] font-mono text-white/30">Active</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/10 flex flex-col items-center gap-1.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <span className="font-semibold text-[#e0e0e0]">ISO 27001</span>
                    <span className="text-[9px] font-mono text-white/30">SaaS Ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Monetization & Stripe Billing Hub */}
          {activeTab === "monetization" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_40%)]"></div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2 uppercase">
                      💰 SaaS Billing & Monetization
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase italic">Stripe Billing Engine & Revenue Hub</h2>
                    <p className="text-xs text-white/40 mt-1">
                      Manage subscription pricing plans, simulate secure customer checkout, and monitor real-time MRR streams.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch("/api/monetization/simulate-sale", {
                            method: "POST"
                          });
                          if (response.ok) {
                            const data = await response.json();
                            if (data.success) {
                              setActiveSubscribers(data.activeSubscribers);
                              setSimulatedRevenueLog(data.simulatedRevenueLog);
                              showNotification(
                                "💰 Payment Succeeded",
                                `Stripe Webhook: ${data.subscriber.plan} ($${data.subscriber.amount}) processed for ${data.subscriber.name}.`
                              );
                            }
                          }
                        } catch (err) {
                          console.error("Error simulating sale:", err);
                        }
                      }}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
                    >
                      <Plus className="w-3.5 h-3.5 text-black" />
                      Simulate Random Sale
                    </button>
                  </div>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/50 uppercase tracking-wider mb-1">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    Subscribers
                  </div>
                  <p className="text-xl font-bold text-white font-mono">{activeSubscribers.length}</p>
                  <p className="text-[9px] text-white/30 mt-0.5">Active paid accounts</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/50 uppercase tracking-wider mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    Live MRR
                  </div>
                  <p className="text-xl font-bold text-white font-mono">
                    ${activeSubscribers.reduce((sum, sub) => sum + sub.amount, 0).toLocaleString()}
                  </p>
                  <p className="text-[9px] text-white/30 mt-0.5">Monthly stream</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/50 uppercase tracking-wider mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                    Live ARR
                  </div>
                  <p className="text-xl font-bold text-white font-mono">
                    ${(activeSubscribers.reduce((sum, sub) => sum + sub.amount, 0) * 12).toLocaleString()}
                  </p>
                  <p className="text-[9px] text-white/30 mt-0.5">Annualized forecast</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/50 uppercase tracking-wider mb-1">
                    <Percent className="w-3.5 h-3.5 text-amber-400" />
                    LTV Metric
                  </div>
                  <p className="text-xl font-bold text-white font-mono">
                    ${Math.round(activeSubscribers.length > 0 ? (activeSubscribers.reduce((sum, sub) => sum + sub.amount, 0) / activeSubscribers.length) * 16 : 1200).toLocaleString()}
                  </p>
                  <p className="text-[9px] text-white/30 mt-0.5">Est. lifetime value</p>
                </div>
              </div>

              {/* Main Monetization layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Stripe Pricing Tiers Configurator & checkout triggers */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Pricing & Checkout Suite</h3>
                      <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">Stripe API Live</span>
                    </div>

                    <div className="space-y-4">
                      {stripePlans.map((plan, idx) => (
                        <div key={plan.id} className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{plan.name}</span>
                              <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono font-semibold">
                                {plan.limit}
                              </span>
                            </div>
                            <ul className="text-[10px] text-white/40 space-y-0.5 font-sans">
                              {plan.features.slice(0, 3).map((f, i) => (
                                <li key={i}>• {f}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center gap-4 flex-shrink-0">
                            <div className="text-right">
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-mono text-white/40">$</span>
                                <input
                                  type="number"
                                  value={plan.price}
                                  onChange={async (e) => {
                                    const newPlans = [...stripePlans];
                                    newPlans[idx].price = Math.max(1, parseInt(e.target.value) || 0);
                                    setStripePlans(newPlans);
                                    
                                    // Also sync Executive Suite metrics if they match
                                    if (plan.id === "growth" || plan.id === "starter") {
                                      setPricingTier(newPlans[idx].price);
                                    }

                                    try {
                                      await fetch("/api/monetization/plans", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ plans: newPlans })
                                      });
                                    } catch (err) {
                                      console.error("Error saving plans:", err);
                                    }
                                  }}
                                  className="w-16 bg-white/5 border border-white/10 rounded px-1.5 py-1 text-xs text-white text-center font-mono font-bold focus:outline-none focus:border-blue-500"
                                />
                                <span className="text-[10px] text-white/40 font-mono">/mo</span>
                              </div>
                              <p className="text-[9px] text-white/30 mt-0.5 font-mono">Config price</p>
                            </div>

                            <button
                              onClick={() => {
                                setCheckoutPlan(plan);
                                setCheckoutCardName("");
                                setCheckoutCardNumber("");
                                setCheckoutCardExpiry("");
                                setCheckoutCardCvc("");
                                setCheckoutSuccess(false);
                                setCheckoutProcessing(false);
                                setCheckoutModalOpen(true);
                              }}
                              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              Checkout
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Subscribers Table */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="border-b border-white/10 pb-3">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Active Paid Customer Directory</h3>
                      <p className="text-[10px] text-white/40 mt-0.5">Review, verify, or revoke customer subscriptions synced via Stripe.</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px] font-sans">
                        <thead>
                          <tr className="border-b border-white/10 text-white/40 uppercase font-mono tracking-wider">
                            <th className="py-2.5">Customer</th>
                            <th className="py-2.5">Plan</th>
                            <th className="py-2.5">Monthly Payout</th>
                            <th className="py-2.5">Status</th>
                            <th className="py-2.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {activeSubscribers.map((sub) => (
                            <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                              <td className="py-2.5">
                                <div className="font-semibold text-white">{sub.name}</div>
                                <div className="text-[9px] text-white/30 font-mono">{sub.email}</div>
                              </td>
                              <td className="py-2.5 font-mono text-blue-400">{sub.plan}</td>
                              <td className="py-2.5 font-mono text-emerald-400">${sub.amount}/mo</td>
                              <td className="py-2.5">
                                <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                                  {sub.status}
                                </span>
                              </td>
                              <td className="py-2.5 text-right">
                                <button
                                  onClick={async () => {
                                    try {
                                      const response = await fetch(`/api/monetization/subscribers/${sub.id}`, {
                                        method: "DELETE"
                                      });
                                      if (response.ok) {
                                        const data = await response.json();
                                        if (data.success) {
                                          setActiveSubscribers(data.activeSubscribers);
                                          setSimulatedRevenueLog(data.simulatedRevenueLog);
                                          showNotification(
                                            "⚡ Subscription Canceled",
                                            `Canceled Stripe plan for ${sub.name}. MRR updated.`
                                          );
                                        }
                                      }
                                    } catch (err) {
                                      console.error("Error canceling subscriber:", err);
                                    }
                                  }}
                                  className="text-[9px] text-rose-400 hover:text-rose-300 underline font-semibold"
                                >
                                  Cancel subscription
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Column: Webhook Simulator Feed & receipts */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Stripe Webhook Simulator Feed */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Webhook Log Feed</h3>
                      </div>
                      <span className="text-[8px] font-mono text-white/30 uppercase tracking-wider">WebSocket stream</span>
                    </div>

                    <div className="bg-black/60 border border-white/10 rounded-xl p-3 h-48 overflow-y-auto font-mono text-[10px] space-y-2.5 scrollbar-thin">
                      {simulatedRevenueLog.map((log) => (
                        <div key={log.id} className="border-b border-white/5 pb-2 last:border-0">
                          <div className="flex items-center justify-between">
                            <span className={`font-bold uppercase tracking-wider text-[8px] ${
                              log.amount > 0 ? "text-emerald-400" : "text-rose-400"
                            }`}>
                              {log.type}
                            </span>
                            <span className="text-[8px] text-white/20">{log.date}</span>
                          </div>
                          <p className="text-white/60 mt-0.5 truncate">{log.customer}</p>
                          <div className="flex items-center justify-between text-[9px] mt-1 text-white/40">
                            <span>ID: {log.id}</span>
                            <span className={log.amount > 0 ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
                              {log.amount > 0 ? `+$${log.amount}` : `-$${Math.abs(log.amount)}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-[9px] text-white/30 italic leading-relaxed">
                      Every payment successfully dispatched in the simulator fires a full secure standard Stripe webhook payload (`customer.subscription.created` and `invoice.payment_succeeded`) that updates the Synapse local core.
                    </p>
                  </div>

                  {/* White-Labeling Premium Upsells detail */}
                  <div className="bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-blue-500/20 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                      <Layers className="w-4 h-4 text-blue-400 animate-pulse" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Enterprise White-Label licensing</h4>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed font-light">
                      Unlock custom deployment parameters. Monetize your instance by offering custom dashboards, direct API keys to third-party clients, and branded mobile notifications.
                    </p>
                    <div className="bg-black/30 border border-white/10 p-3 rounded-lg font-mono text-[9px] text-white/60 space-y-1.5">
                      <div className="flex items-center justify-between text-blue-400 font-bold">
                        <span>PREMIUM WHITE-LABEL</span>
                        <span>ACTIVE</span>
                      </div>
                      <p>• Multi-tenant customer subdomains enabled</p>
                      <p>• Custom logo & color scheme injection ready</p>
                      <p>• Multi-tenant Stripe Connect integrations active</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === "client-finder" && (
            <ClientFinder
              leads={leads}
              deals={deals}
              tasks={tasks}
              meetings={meetings}
              proposals={proposals}
              auditLogs={auditLogs}
              selectedLeadId={selectedLeadId}
              setSelectedLeadId={setSelectedLeadId}
              showNotification={showNotification}
              refreshCrmData={refreshCrmData}
              discoveryFilters={discoveryFilters}
              setDiscoveryFilters={setDiscoveryFilters}
              discoveryScanning={discoveryScanning}
              setDiscoveryScanning={setDiscoveryScanning}
              websiteAuditUrl={websiteAuditUrl}
              setWebsiteAuditUrl={setWebsiteAuditUrl}
              websiteAuditReport={websiteAuditReport}
              setWebsiteAuditReport={setWebsiteAuditReport}
              websiteAuditing={websiteAuditing}
              setWebsiteAuditing={setWebsiteAuditing}
              proposalNotes={proposalNotes}
              setProposalNotes={setProposalNotes}
              proposalGenerated={proposalGenerated}
              setProposalGenerated={setProposalGenerated}
              proposalGenerating={proposalGenerating}
              setProposalGenerating={setProposalGenerating}
              emailCampaignType={emailCampaignType}
              setEmailCampaignType={setEmailCampaignType}
              emailLanguage={emailLanguage}
              setEmailLanguage={setEmailLanguage}
              emailSenderName={emailSenderName}
              setEmailSenderName={setEmailSenderName}
              emailGenerated={emailGenerated}
              setEmailGenerated={setEmailGenerated}
              emailGenerating={emailGenerating}
              setEmailGenerating={setEmailGenerating}
              salesAssistantMsg={salesAssistantMsg}
              setSalesAssistantMsg={setSalesAssistantMsg}
              salesAssistantHistory={salesAssistantHistory}
              setSalesAssistantHistory={setSalesAssistantHistory}
              salesAssistantLoading={salesAssistantLoading}
              setSalesAssistantLoading={setSalesAssistantLoading}
            />
          )}
        </main>
      </div>

      {/* 5. Immersive Stripe Checkout Modal */}
      <AnimatePresence>
        {checkoutModalOpen && checkoutPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0b0f17] border border-white/15 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
            >
              {/* Stripe Header */}
              <div className="bg-black/60 p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-mono tracking-widest uppercase">STRIPE SECURE CHECKOUT</span>
                </div>
                <button
                  onClick={() => setCheckoutModalOpen(false)}
                  className="text-white/40 hover:text-white text-xs font-bold font-mono uppercase bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded"
                >
                  Close
                </button>
              </div>

              {!checkoutSuccess ? (
                <div className="p-6 space-y-4">
                  {/* Summary of order */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-white">{checkoutPlan.name} Subscription</h4>
                      <p className="text-[10px] text-white/40 mt-0.5">{checkoutPlan.limit}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono text-emerald-400">${checkoutPlan.price}</span>
                      <p className="text-[9px] text-white/30 mt-0.5">per month</p>
                    </div>
                  </div>

                  {/* Payment form */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase font-bold text-white/50 block">Customer Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., Jane Cooper"
                        value={checkoutCardName}
                        onChange={(e) => setCheckoutCardName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase font-bold text-white/50 block">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={checkoutCardNumber}
                        onChange={(e) => setCheckoutCardNumber(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase font-bold text-white/50 block">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="4242 4242 4242 4242"
                          value={checkoutCardExpiry}
                          onChange={(e) => setCheckoutCardExpiry(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                        />
                        <CreditCard className="w-4 h-4 text-white/30 absolute left-3 top-2.5" />
                      </div>
                      <p className="text-[8px] text-white/30 italic">Use standard test card number: 4242 ...</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase font-bold text-white/50 block">Expiration Date</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          value={checkoutCardCvc}
                          onChange={(e) => setCheckoutCardCvc(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono uppercase font-bold text-white/50 block">Security Code (CVC)</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="123"
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Processing / Submit button */}
                  <button
                    onClick={async () => {
                      if (!checkoutCardName.trim()) {
                        showNotification("Validation Error", "Please provide a valid Customer Name.");
                        return;
                      }
                      setCheckoutProcessing(true);
                      
                      try {
                        const email = checkoutCardNumber.includes("@") ? checkoutCardNumber : `${checkoutCardName.toLowerCase().replace(/\s+/g, "")}@example.com`;
                        const response = await fetch("/api/monetization/subscribers", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: checkoutCardName,
                            email,
                            planName: checkoutPlan.name,
                            amount: checkoutPlan.price
                          })
                        });
                        
                        if (response.ok) {
                          const data = await response.json();
                          if (data.success) {
                            setActiveSubscribers(data.activeSubscribers);
                            setSimulatedRevenueLog(data.simulatedRevenueLog);
                            setCheckoutSuccess(true);
                            showNotification(
                              "🎉 Checkout Successful",
                              `Stripe subscription active for ${checkoutCardName}!`
                            );
                          }
                        }
                      } catch (err) {
                        console.error("Error creating subscription:", err);
                        showNotification("Network Error", "Failed to connect to checkout payload routing.");
                      } finally {
                        setCheckoutProcessing(false);
                      }
                    }}
                    disabled={checkoutProcessing}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    {checkoutProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Processing Securing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        Pay & Subscribe with Stripe
                      </>
                    )}
                  </button>
                  <p className="text-[8px] text-white/30 text-center uppercase tracking-wide">
                    🔒 SSL 256-bit encrypted payload routing. Powered by Stripe Connect.
                  </p>
                </div>
              ) : (
                <div className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-10 h-10 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subscription Active!</h3>
                    <p className="text-xs text-white/40 mt-1">
                      Stripe successfully charged **${checkoutPlan.price}** to your payment method.
                    </p>
                  </div>

                  <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-left font-mono text-[9px] text-white/60 space-y-1">
                    <div className="text-emerald-400 font-bold uppercase tracking-wider mb-1">Stripe Invoice Details</div>
                    <p>• CUSTOMER: {checkoutCardName}</p>
                    <p>• PLAN: {checkoutPlan.name}</p>
                    <p>• AMOUNT: ${checkoutPlan.price}/month</p>
                    <p>• TRANSACTION: ch_stripe_sim_{Math.random().toString(36).substring(2, 10)}</p>
                    <p>• WEBHOOK STATUS: invoice.payment_succeeded DISPATCHED</p>
                  </div>

                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white hover:text-white border border-white/10 text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                  >
                    Return to Revenue Hub
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md py-4 px-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-white/40 font-mono gap-3">
        <div className="flex items-center gap-2">
          <span>© 2026 Synapse OS Operations Suite Inc.</span>
          <span className="text-white/10">|</span>
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <span className="text-white/10">|</span>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
        </div>
        <div className="flex items-center gap-2">
          <span>Infrastructure status:</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            100% operational
          </span>
        </div>
      </footer>
    </div>
  );
}
