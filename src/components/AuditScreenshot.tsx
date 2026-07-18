import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Laptop,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
  Languages,
  Zap,
  Maximize2,
  Lock,
  RotateCcw
} from "lucide-react";

interface AuditScreenshotProps {
  url: string;
  companyName: string;
  industry: string;
  missingFeatures?: string[];
  techStack?: string;
}

export default function AuditScreenshot({
  url = "velocelogistics.de",
  companyName = "Veloce Logistics",
  industry = "Logistics & Supply Chain",
  missingFeatures = ["AI Chatbot", "Automation", "Mobile Optimization", "SEO"],
  techStack = "WordPress, PHP"
}: AuditScreenshotProps) {
  const [simulateUpgrade, setSimulateUpgrade] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: `Hello! Welcome to ${companyName}. How can I assist you with your logistics and tracking inquiries today?` }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Normalize industry helper
  const lowerIndustry = industry?.toLowerCase() || "";
  const isLogistics = lowerIndustry.includes("logistics") || lowerIndustry.includes("supply");
  const isHealthcare = lowerIndustry.includes("health") || lowerIndustry.includes("medical");
  const isRetail = lowerIndustry.includes("retail") || lowerIndustry.includes("commerce") || lowerIndustry.includes("shop");
  const isTravel = lowerIndustry.includes("travel") || lowerIndustry.includes("hospitality") || lowerIndustry.includes("tour");
  const isLegal = lowerIndustry.includes("legal") || lowerIndustry.includes("law") || lowerIndustry.includes("professional");

  // Define audit hotspots based on industry
  const hotspots = [
    {
      id: "speed",
      top: "15%",
      left: "8%",
      title: "Critically Slow TTFB & Loading Speed",
      description: `Vite & React optimization missing. Uncompressed images and block-rendering PHP scripts trigger a 4.8s initial load.`,
      impact: "32% mobile visitor bounce rate, costing approx. $12,000 yearly.",
      solution: "Compress static assets, deploy server-side route pre-rendering, and cache assets in CDN edges.",
      category: "Performance"
    },
    {
      id: "chatbot",
      top: "82%",
      left: "88%",
      title: "Absent Conversational Layer",
      description: "64% of high-intent traffic visits this site outside normal business hours. Lacks automated lead routing or booking chats.",
      impact: "Estimated 22 high-value bookings/leads lost every month.",
      solution: "Deploy a server-side Gemini-powered Aura Customer Agent to answer questions, pre-qualify leads, and calendar demo syncs 24/7.",
      category: "Conversational AI"
    },
    {
      id: "localization",
      top: "40%",
      left: "70%",
      title: "Missing Regional Localized Content",
      description: "Static single-language structure. Unable to dynamically serve customers in major regional/demographic translations like Telugu, Hindi, or Tamil.",
      impact: "Restricts conversion in regional markets by over 45%.",
      solution: "Integrate automatic server-side Gemini dynamic translation headers with native context mapping.",
      category: "Localization"
    },
    {
      id: "workflow",
      top: "55%",
      left: "40%",
      title: "Manual Form Submission Friction",
      description: "Standard text form sends plain emails with no active CRM webhooks, Slack pings, or auto-responders.",
      impact: "Average response lag exceeds 24 hours, freezing pipeline movement.",
      solution: "Connect modern checkout workflows, CRM webhook triggers, and active email campaign auto-drips.",
      category: "Automation"
    }
  ];

  // Chatbot message submit
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);

    setTimeout(() => {
      let replyText = `Thanks for your inquiry! I can help you orchestrate that workflow. Would you like me to schedule a demo with the ${companyName} team for this Tuesday?`;
      if (userText.toLowerCase().includes("track") || userText.toLowerCase().includes("shipment")) {
        replyText = `Excellent. I've initiated a secure audit log crawl for tracking. Your cargo is currently docked at the Munich Transit Center and is scheduled for dispatch. May I log your contact email to send real-time SMS updates?`;
      } else if (userText.toLowerCase().includes("price") || userText.toLowerCase().includes("cost")) {
        replyText = `Our pricing structures are fully automated. I can prepare a custom digital Scope of Work (SOW) based on your budget within seconds. Shall we proceed?`;
      } else if (userText.toLowerCase().includes("hello") || userText.toLowerCase().includes("hi")) {
        replyText = `Hello! How can I accelerate your business processes today? I am fully synchronized with our internal CRM.`;
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: replyText }]);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* 1. Interactive Control Deck */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0d121f] border border-white/10 rounded-2xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
            <Laptop className="w-4 h-4 animate-pulse" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Live Audit Workspace Screen</h4>
            <p className="text-[10px] text-white/40">Hover/Click glowing hotspots to audit deficiencies. Click the toggle to simulate the AI upgraded state.</p>
          </div>
        </div>

        {/* Dynamic Simulation Switch */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/5 px-4 py-2 rounded-xl">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wide text-white/50">
            {simulateUpgrade ? "✨ Upgraded State" : "⚠️ Vulnerable State"}
          </span>
          <button
            onClick={() => {
              setSimulateUpgrade(!simulateUpgrade);
              setChatOpen(false);
              setActiveHotspot(null);
            }}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              simulateUpgrade ? "bg-emerald-500" : "bg-white/10"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                simulateUpgrade ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. Interactive Browser Window Frame */}
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#02040a] shadow-2xl relative">
        
        {/* Browser Title Bar */}
        <div className="bg-[#0b0f19] border-b border-white/5 px-4 py-3 flex items-center justify-between gap-4">
          {/* Mock Window Controls */}
          <div className="flex items-center gap-1.5 w-16">
            <div className="w-3 h-3 rounded-full bg-rose-500/30 border border-rose-500/50" />
            <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
          </div>

          {/* URL Address Bar */}
          <div className="flex-1 max-w-lg bg-black/40 border border-white/10 px-3.5 py-1 rounded-lg text-[10px] font-mono text-white/40 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-500/70" />
            <span className="text-white/70">https://</span>
            <span className="text-blue-400 font-bold">{url}</span>
            <span className="ml-auto text-white/20 select-none">✕</span>
          </div>

          {/* Action icon */}
          <div className="text-white/40 flex items-center gap-2">
            <Maximize2 className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Real-Time Live Audit KPI Banner */}
        <div className="bg-[#080c14] border-b border-white/5 p-3 px-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {/* Speed Gauge */}
            <div className="flex items-center gap-2.5">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">PageSpeed:</span>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: simulateUpgrade ? "#10b981" : "#f43f5e" }} />
                <span className={`text-xs font-mono font-bold ${simulateUpgrade ? "text-emerald-400" : "text-rose-400"}`}>
                  {simulateUpgrade ? "98/100 (Sleek)" : "34/100 (Critical)"}
                </span>
              </div>
            </div>

            {/* AI Assistant Status */}
            <div className="flex items-center gap-2.5">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Conversational Layer:</span>
              <span className={`text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full uppercase ${
                simulateUpgrade ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}>
                {simulateUpgrade ? "AURA Chatbot Active" : "Missing / Disabled"}
              </span>
            </div>

            {/* Translation localization */}
            <div className="flex items-center gap-2.5">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Localization:</span>
              <span className={`text-[10px] font-mono flex items-center gap-1 ${simulateUpgrade ? "text-emerald-400 font-bold" : "text-white/40"}`}>
                <Languages className="w-3.5 h-3.5 text-blue-400" />
                {simulateUpgrade ? "Telugu/Hindi/English Loaded" : "Single Language Only"}
              </span>
            </div>
          </div>

          <div className="text-[10px] font-mono text-white/40">
            Viewport: <strong className="text-white/70">Desktop (1920x1080)</strong>
          </div>
        </div>

        {/* 3. Simulated Viewport Canvas */}
        <div className="relative min-h-[460px] max-h-[550px] overflow-y-auto bg-[#070b12] text-left p-6 font-sans border-b border-white/5 scrollbar-thin select-none">
          
          {/* Glow backdrop ambient */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

          {/* Simulated Webpage Contents */}
          <div className="space-y-8 relative z-10">
            {/* Page Header bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black font-mono text-xs text-black">
                  {companyName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-xs font-black text-white uppercase tracking-wider">{companyName}</h1>
                  <span className="text-[8px] text-white/30 uppercase tracking-widest font-mono">ESTABLISHED ENTERPRISE</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-[10px] font-mono text-white/60">
                <span className="hover:text-white transition-colors cursor-pointer">About</span>
                <span className="hover:text-white transition-colors cursor-pointer">Services</span>
                <span className="hover:text-white transition-colors cursor-pointer">Locations</span>
                <span className="px-2.5 py-1 bg-blue-600 text-black font-black uppercase text-[8px] rounded hover:bg-blue-500 transition-all cursor-pointer">
                  {simulateUpgrade ? "✨ Secure Portal" : "Client Portal Login"}
                </span>
              </div>
            </div>

            {/* DYNAMIC INDUSTRIAL BODY CONTENT */}
            {isLogistics && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Text SOW Intro */}
                <div className="md:col-span-7 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase">
                    Munich, Germany Central Logistics
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight uppercase italic">
                    Fast cargo shipping, freight forwarding & storage solutions.
                  </h2>
                  <p className="text-xs text-white/40 leading-relaxed max-w-lg">
                    Veloce Logistics manages complex dry cargo workloads globally. We maintain strict compliance, custom fleet management, and European express container routing.
                  </p>

                  {/* Cargo tracking form */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-4 max-w-md space-y-3">
                    <label className="text-[9px] font-mono uppercase text-white/40 block">Track container shipment</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. EU-DE-98432"
                        disabled
                        className="flex-1 bg-black/60 border border-white/10 text-white/40 text-xs rounded-lg px-3 py-1.5 font-mono"
                      />
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-black text-xs font-bold uppercase tracking-wide rounded-lg transition-all">
                        Search
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side: unoptimized cards representation */}
                <div className="md:col-span-5 space-y-3">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-left space-y-2 relative">
                    <div className="text-[8px] font-mono text-white/30 uppercase">Core service</div>
                    <h3 className="text-xs font-bold text-white uppercase italic">Air Cargo Freight</h3>
                    <p className="text-[10px] text-white/40 leading-relaxed">Fast cargo airlift across Frankfurt, Munich, Berlin, Paris with secure packaging.</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-left space-y-2">
                    <div className="text-[8px] font-mono text-white/30 uppercase">Core service</div>
                    <h3 className="text-xs font-bold text-white uppercase italic">Ocean Port Cargo</h3>
                    <p className="text-[10px] text-white/40 leading-relaxed">Enterprise dry bulk and chemical storage facilities with integrated customs handling.</p>
                  </div>
                </div>
              </div>
            )}

            {isHealthcare && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[8px] font-mono bg-teal-500/10 text-teal-400 border border-teal-500/20 font-bold uppercase">
                    Hyderabad, India Central Wellness
                  </span>
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Your health, our clinical priority.</h2>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Bharat Healthtech delivers advanced diagnostic clinical services. We are dedicated to patient wellness and remote scheduling support.
                  </p>
                </div>

                {/* Patient booking box */}
                <div className="max-w-lg mx-auto bg-black/40 border border-white/10 rounded-2xl p-5 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Request medical appointment</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono uppercase text-white/40 block">Patient Name</label>
                      <input type="text" disabled className="w-full bg-black/40 border border-white/5 p-1.5 text-xs text-white/30 rounded" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono uppercase text-white/40 block">Preferred Specialty</label>
                      <input type="text" placeholder="Cardiology" disabled className="w-full bg-black/40 border border-white/5 p-1.5 text-xs text-white/30 rounded" />
                    </div>
                  </div>
                  <button className="w-full py-2 bg-teal-600 text-black text-xs font-black uppercase tracking-wider rounded-lg">
                    Book Sync Session
                  </button>
                </div>
              </div>
            )}

            {isRetail && (
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div>
                    <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block">Melbourne, Australia</span>
                    <h2 className="text-xl font-black text-white uppercase italic">Apex Retail Winter Catalog</h2>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold underline cursor-pointer">Shop all new arrivals</span>
                </div>

                {/* Apparel grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#0b0f17] border border-white/5 rounded-xl overflow-hidden p-2 text-left space-y-2">
                    <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex items-center justify-center font-mono text-[9px] text-white/30 uppercase">
                      Coat preview
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">Classic Wool Trenchcoat</h4>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">$189.00 AUD</span>
                    </div>
                  </div>
                  <div className="bg-[#0b0f17] border border-white/5 rounded-xl overflow-hidden p-2 text-left space-y-2">
                    <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex items-center justify-center font-mono text-[9px] text-white/30 uppercase">
                      Beanie preview
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">Ribbed Merino Wool Beanie</h4>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">$45.00 AUD</span>
                    </div>
                  </div>
                  <div className="bg-[#0b0f17] border border-white/5 rounded-xl overflow-hidden p-2 text-left space-y-2">
                    <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex items-center justify-center font-mono text-[9px] text-white/30 uppercase">
                      Boots preview
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">Suede Chelsey Outbound Boots</h4>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">$220.00 AUD</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isTravel && (
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-amber-950/20 to-orange-950/20 border border-white/15 rounded-2xl text-left space-y-4">
                  <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-[8px] font-mono font-bold uppercase">
                    Nairobi, Kenya Safaris
                  </span>
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tight">Luxury Savannah safari escapes.</h2>
                  <p className="text-xs text-white/50 leading-relaxed max-w-lg">
                    Discover Amboseli and Maasai Mara. Custom bespoke private wildlife photography excursions and lodge accommodation.
                  </p>
                  <button className="px-4 py-2 bg-amber-500 text-black text-xs font-black uppercase tracking-wide rounded-lg">
                    Explore safari packages
                  </button>
                </div>
              </div>
            )}

            {isLegal && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8 space-y-4">
                  <span className="inline-block text-[8px] font-mono text-white/30 uppercase tracking-widest border-b border-white/20 pb-1">
                    London, United Kingdom • LLP #98342
                  </span>
                  <h2 className="text-xl md:text-2xl font-serif text-white italic tracking-tight">
                    Zenith Law: Corporate advisory, venture capital structuring, and private litigations.
                  </h2>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Our partners handle highly confidential enterprise advisory tasks. We advise major technology founders, private equity firms, and commercial holdings worldwide.
                  </p>
                </div>
                
                <div className="md:col-span-4 bg-black/40 border border-white/15 p-4 rounded-xl space-y-2 text-left">
                  <h3 className="text-xs font-bold text-white uppercase font-mono">Confidential Sync</h3>
                  <p className="text-[10px] text-white/40">Request secure consultation on VC or M&A restructuring.</p>
                  <button className="w-full py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[9px] font-bold uppercase tracking-wider rounded transition-all">
                    Initiate Case Intake
                  </button>
                </div>
              </div>
            )}

            {!isLogistics && !isHealthcare && !isRetail && !isTravel && !isLegal && (
              <div className="space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase">
                    CRAWLED WEBPAGE PREVIEW
                  </span>
                  <h2 className="text-xl font-black text-white uppercase italic tracking-tight">{companyName} Website Layout</h2>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Standard mock architecture for website: <strong>{url}</strong>. Real-time scanning identifies missing CRM hooks, speed blockages, and customer outreach gaps.
                  </p>
                </div>
              </div>
            )}

            {/* Simulated standard static footer */}
            <div className="border-t border-white/5 pt-6 flex justify-between items-center text-[8px] font-mono text-white/20">
              <span>© {new Date().getFullYear()} {companyName}. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-4 uppercase font-bold text-white/40">
                <span>Privacy SOW</span>
                <span>Terms of Use</span>
                <span>GDPR Shield</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC OVERLAY HOTSPOTS (Only shown when simulation is OFF) */}
          <AnimatePresence>
            {!simulateUpgrade && hotspots.map((spot) => (
              <div
                key={spot.id}
                className="absolute z-40 cursor-pointer group"
                style={{ top: spot.top, left: spot.left }}
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
              >
                {/* Glowing Core Pulse */}
                <div className="relative">
                  <span className="absolute inline-flex h-6 w-6 rounded-full bg-rose-500/30 animate-ping opacity-75" />
                  <div className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 border-2 border-white items-center justify-center text-[10px] font-black text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    !
                  </div>
                </div>

                {/* Subtle Hover tooltip banner */}
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black border border-rose-500/40 text-[9px] font-mono font-bold text-rose-400 px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider pointer-events-none z-50">
                  {spot.category} gap
                </span>
              </div>
            ))}
          </AnimatePresence>

          {/* UPGRADE STATE ANIMATIONS (Shown when simulation is ON) */}
          <AnimatePresence>
            {simulateUpgrade && (
              <>
                {/* Glowing green fixed indicators */}
                {hotspots.map((spot) => (
                  <motion.div
                    key={`fixed-${spot.id}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute z-40 pointer-events-none"
                    style={{ top: spot.top, left: spot.left }}
                  >
                    <div className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                  </motion.div>
                ))}

                {/* Floating upgrade success badge on bottom screen */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="absolute bottom-6 left-6 z-40 bg-emerald-950/90 border border-emerald-500/30 rounded-xl p-3 pr-4 flex items-center gap-2.5 backdrop-blur-sm max-w-sm text-left shadow-lg shadow-emerald-950/50"
                >
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-emerald-400 font-black uppercase tracking-wider block">AI Optimization Active</span>
                    <p className="text-[10px] text-white/80 leading-snug">Veloce Container compiled and live in private-VPC. Speed boosted, translations cached, and conversational bot connected.</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* AI CHATBOT HOVER FLOATING WIDGET (Shown when simulation is ON) */}
          <AnimatePresence>
            {simulateUpgrade && (
              <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end">
                {/* Chat Bubble Widget Panel */}
                {chatOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 15 }}
                    className="w-72 bg-[#0a0f1d] border border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col mb-3 text-left"
                  >
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-black/30 text-white flex items-center justify-center text-[10px] font-black">
                          A
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">AURA AI assistant</h4>
                          <span className="text-[8px] text-white/70 block leading-none">Online & Fully Integrated</span>
                        </div>
                      </div>
                      <button onClick={() => setChatOpen(false)} className="text-white/60 hover:text-white text-xs font-bold">✕</button>
                    </div>

                    {/* Chat Messages Log */}
                    <div className="p-3 space-y-2 h-48 overflow-y-auto bg-black/60 scrollbar-thin text-[10px]">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex gap-1.5 max-w-[200px] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}>
                          <div className={`p-2 rounded-xl leading-normal ${
                            msg.sender === "user" ? "bg-blue-600 text-black font-semibold rounded-br-none ml-auto" : "bg-white/5 border border-white/10 text-white/90 rounded-bl-none"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input form */}
                    <form onSubmit={handleSendChat} className="p-2 border-t border-white/5 bg-[#0a0f1d] flex gap-1.5">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type cargo tracking or support..."
                        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-[10px] text-white focus:outline-none focus:border-blue-500"
                      />
                      <button type="submit" className="p-1 bg-blue-600 text-black rounded hover:bg-blue-500 transition-colors">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Main floating launcher button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setChatOpen(!chatOpen)}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-black shadow-lg shadow-blue-500/20 flex items-center justify-center relative hover:shadow-blue-500/40 border border-white/20"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </motion.button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Active Highlight Detail Card (Shown when a hotspot is clicked) */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-4 right-4 left-4 z-50 bg-[#0d121f]/95 border border-rose-500/30 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl backdrop-blur-md text-left"
            >
              {(() => {
                const spot = hotspots.find((h) => h.id === activeHotspot);
                if (!spot) return null;
                return (
                  <>
                    <div className="space-y-1 md:max-w-2xl">
                      <div className="flex items-center gap-1.5 text-rose-400">
                        <AlertTriangle className="w-4 h-4 animate-bounce" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">AUDIT DISCOVERY GAP: {spot.category}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white uppercase">{spot.title}</h4>
                      <p className="text-[10px] text-white/60 leading-relaxed font-light">{spot.description}</p>
                      <p className="text-[10px] text-rose-400"><strong>🚨 Annual business impact:</strong> {spot.impact}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setSimulateUpgrade(true);
                          setChatOpen(true);
                          setActiveHotspot(null);
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-black text-[9px] font-black uppercase rounded-lg transition-all"
                      >
                        Simulate Fix
                      </button>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/55 text-[9px] font-bold uppercase rounded-lg transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
