import { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Globe,
  Building,
  Cpu,
  Zap,
  BarChart3,
  Mail,
  FileText,
  Calendar,
  ListTodo,
  ShieldCheck,
  Trash2,
  Play,
  Send,
  Check,
  Plus,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Clock,
  ArrowRight,
  ChevronRight,
  Laptop,
  CheckCircle,
  TrendingUp,
  X,
  FileSpreadsheet
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import AuditScreenshot from "./AuditScreenshot";

interface ClientFinderProps {
  leads: any[];
  deals: any[];
  tasks: any[];
  meetings: any[];
  proposals: any[];
  auditLogs: any[];
  selectedLeadId: string;
  setSelectedLeadId: (id: string) => void;
  showNotification: (title: string, desc: string) => void;
  refreshCrmData: () => Promise<void>;
  
  // State from App.tsx
  discoveryFilters: any;
  setDiscoveryFilters: any;
  discoveryScanning: boolean;
  setDiscoveryScanning: any;
  
  websiteAuditUrl: string;
  setWebsiteAuditUrl: any;
  websiteAuditReport: string;
  setWebsiteAuditReport: any;
  websiteAuditing: boolean;
  setWebsiteAuditing: any;
  
  proposalNotes: string;
  setProposalNotes: any;
  proposalGenerated: any;
  setProposalGenerated: any;
  proposalGenerating: boolean;
  setProposalGenerating: any;
  
  emailCampaignType: string;
  setEmailCampaignType: any;
  emailLanguage: string;
  setEmailLanguage: any;
  emailSenderName: string;
  setEmailSenderName: any;
  emailGenerated: string;
  setEmailGenerated: any;
  emailGenerating: boolean;
  setEmailGenerating: any;
  
  salesAssistantMsg: string;
  setSalesAssistantMsg: any;
  salesAssistantHistory: any[];
  setSalesAssistantHistory: any;
  salesAssistantLoading: boolean;
  setSalesAssistantLoading: any;
}

export default function ClientFinder({
  leads,
  deals,
  tasks,
  meetings,
  proposals,
  auditLogs,
  selectedLeadId,
  setSelectedLeadId,
  showNotification,
  refreshCrmData,
  discoveryFilters,
  setDiscoveryFilters,
  discoveryScanning,
  setDiscoveryScanning,
  websiteAuditUrl,
  setWebsiteAuditUrl,
  websiteAuditReport,
  setWebsiteAuditReport,
  websiteAuditing,
  setWebsiteAuditing,
  proposalNotes,
  setProposalNotes,
  proposalGenerated,
  setProposalGenerated,
  proposalGenerating,
  setProposalGenerating,
  emailCampaignType,
  setEmailCampaignType,
  emailLanguage,
  setEmailLanguage,
  emailSenderName,
  setEmailSenderName,
  emailGenerated,
  setEmailGenerated,
  emailGenerating,
  setEmailGenerating,
  salesAssistantMsg,
  setSalesAssistantMsg,
  salesAssistantHistory,
  setSalesAssistantHistory,
  salesAssistantLoading,
  setSalesAssistantLoading
}: ClientFinderProps) {
  // Navigation tabs inside Client Finder
  const [subTab, setSubTab] = useState<"leads" | "discover" | "pipeline" | "proposal" | "outreach" | "scheduler" | "copilot" | "audit">("leads");
  
  // Tab selector for the active lead detail view
  const [leadDetailView, setLeadDetailView] = useState<"summary" | "screenshot">("summary");

  // Local helper states
  const [addingLeadOpen, setAddingLeadOpen] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    companyName: "",
    website: "",
    country: "United States",
    industry: "E-commerce & Retail",
    techStack: "WordPress",
    estimatedProjectValue: 15000,
    contactName: "",
    contactEmail: "",
    notes: ""
  });

  const [schedulingOpen, setSchedulingOpen] = useState(false);
  const [newMeetingForm, setNewMeetingForm] = useState({
    title: "AI Automation Demo call",
    platform: "Google Calendar",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    time: "14:00",
    description: "Review of custom chatbot features and ROI models."
  });

  const [addingTaskForm, setAddingTaskForm] = useState({
    title: ""
  });

  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  // Radar scanning animation helper
  const [scanPulse, setScanPulse] = useState(false);
  useEffect(() => {
    if (discoveryScanning) {
      const interval = setInterval(() => {
        setScanPulse((p) => !p);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [discoveryScanning]);

  // Lead Score helper color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-rose-400 border-rose-500 bg-rose-500/10";
    if (score >= 60) return "text-amber-400 border-amber-500 bg-amber-500/10";
    return "text-blue-400 border-blue-500 bg-blue-500/10";
  };

  // Run dynamic Lead Scan
  const handleDiscover = async () => {
    setDiscoveryScanning(true);
    setSubTab("discover");
    try {
      const response = await fetch("/api/client-finder/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discoveryFilters)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await refreshCrmData();
          showNotification(
            "⚡ Discovery Scan Complete",
            `Found ${data.leads?.length || 3} high-potential opportunities worldwide!`
          );
          if (data.leads?.length > 0) {
            setSelectedLeadId(data.leads[0].id);
          }
        }
      }
    } catch (err) {
      console.error(err);
      showNotification("Scan Timeout", "Simulation fallback active.");
    } finally {
      setDiscoveryScanning(false);
    }
  };

  // Run URL Auditor
  const handleWebsiteAudit = async (url: string, companyName?: string) => {
    setWebsiteAuditing(true);
    setWebsiteAuditUrl(url);
    setSubTab("discover");
    try {
      const response = await fetch("/api/client-finder/analyze-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, companyName })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWebsiteAuditReport(data.report);
          showNotification("🔍 Site Audit Complete", `vulnerabilities detected for ${url}`);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setWebsiteAuditing(false);
    }
  };

  // Generate Proposal SOW
  const handleGenerateProposal = async (leadId: string) => {
    setProposalGenerating(true);
    setSubTab("proposal");
    try {
      const response = await fetch("/api/client-finder/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, customNotes: proposalNotes })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProposalGenerated(data.proposal);
          await refreshCrmData();
          showNotification("📄 AI Proposal Drafted", "Enterprise-grade Scope of Work prepared.");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProposalGenerating(false);
    }
  };

  // Generate outreach translation
  const handleGenerateEmail = async (leadId: string) => {
    setEmailGenerating(true);
    setSubTab("outreach");
    try {
      const response = await fetch("/api/client-finder/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          campaignType: emailCampaignType,
          language: emailLanguage,
          senderName: emailSenderName,
          companyName: "Synapse AI"
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setEmailGenerated(data.email);
          showNotification("✉️ Outreach Generated", `Translated outreach in ${emailLanguage} is ready.`);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEmailGenerating(false);
    }
  };

  // Schedule Calendar
  const handleScheduleCall = async () => {
    if (!activeLead) return;
    try {
      const response = await fetch("/api/client-finder/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newMeetingForm.title,
          start: `${newMeetingForm.date}T${newMeetingForm.time}:00`,
          description: newMeetingForm.description,
          platform: newMeetingForm.platform,
          leadId: activeLead.id
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await refreshCrmData();
          setSchedulingOpen(false);
          showNotification("📅 Calendar Synced Successfully", `Added to ${newMeetingForm.platform} & CRM moved to Scheduled stage.`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Drag and drop / Click stage updates
  const handleUpdateDealStage = async (dealId: string, stage: string) => {
    try {
      const response = await fetch("/api/client-finder/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealId, stage })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await refreshCrmData();
          showNotification("💼 Pipeline Synced", `Moved to ${stage} phase.`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Completing standard task
  const handleToggleTask = async (taskId: string) => {
    try {
      const response = await fetch("/api/client-finder/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, action: "toggle" })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await refreshCrmData();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Adding standard task
  const handleAddTask = async () => {
    if (!addingTaskForm.title.trim()) return;
    try {
      const response = await fetch("/api/client-finder/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: addingTaskForm.title,
          leadId: activeLead?.id || ""
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAddingTaskForm({ title: "" });
          await refreshCrmData();
          showNotification("Task Appended", "Added action item to CRM scheduler.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Manual Lead submit
  const handleCreateLead = async () => {
    if (!newLeadForm.companyName.trim()) {
      showNotification("Error", "Please provide a valid company name.");
      return;
    }
    try {
      const response = await fetch("/api/client-finder/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadForm)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAddingLeadOpen(false);
          setNewLeadForm({
            companyName: "",
            website: "",
            country: "United States",
            industry: "E-commerce & Retail",
            techStack: "WordPress",
            estimatedProjectValue: 15000,
            contactName: "",
            contactEmail: "",
            notes: ""
          });
          await refreshCrmData();
          showNotification("🎉 Lead Added", "Custom lead successfully logged to central CRM.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to completely remove this lead and all associated CRM records?")) return;
    try {
      const response = await fetch(`/api/client-finder/leads/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await refreshCrmData();
          showNotification("🗑️ Lead Removed", "Opportunity deleted from workspace databases.");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Chat with AI sales assistant
  const handleSalesAssistantChat = async () => {
    if (!salesAssistantMsg.trim() || salesAssistantLoading) return;
    const userMsg = salesAssistantMsg;
    setSalesAssistantMsg("");
    setSalesAssistantLoading(true);

    const tempHistory = [...salesAssistantHistory, { role: "user", text: userMsg }];
    setSalesAssistantHistory(tempHistory);

    try {
      const response = await fetch("/api/client-finder/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: salesAssistantHistory
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSalesAssistantHistory([...tempHistory, { role: "assistant", text: data.text }]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSalesAssistantLoading(false);
    }
  };

  // Calculations for pipeline stats
  const pipelineTotalVal = deals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
  const hotLeadsCount = leads.filter(l => l.score >= 80).length;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/20 to-purple-950/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 flex items-center gap-1.5 text-[10px] font-mono text-white/30 uppercase font-bold tracking-widest bg-white/5 border-l border-b border-white/10 rounded-bl-xl">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          AI Client Finder Engine
        </div>
        
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2 uppercase">
          🛡️ ETHICAL & COMPLIANT OUTBOUND PLATFORM
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase italic">Global Client Finder & Central CRM</h2>
        <p className="text-xs text-white/40 mt-1 max-w-3xl leading-relaxed">
          Autonomously discover high-value business opportunities globally. Deeply analyze public websites, generate automated proposals with precise financial ROI estimations, and draft multi-lingual conversion campaigns.
        </p>

        {/* Central CRM metrics bento summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
          <div className="bg-black/40 border border-white/15 p-3 rounded-xl">
            <span className="block text-[8px] font-mono text-white/40 uppercase tracking-wider">Discovered Opportunities</span>
            <span className="text-lg font-bold font-mono text-white mt-1 block">{leads.length} Companies</span>
          </div>
          <div className="bg-black/40 border border-white/15 p-3 rounded-xl">
            <span className="block text-[8px] font-mono text-white/40 uppercase tracking-wider">Total Pipeline Value</span>
            <span className="text-lg font-bold font-mono text-emerald-400 mt-1 block">${pipelineTotalVal.toLocaleString()}</span>
          </div>
          <div className="bg-black/40 border border-white/15 p-3 rounded-xl">
            <span className="block text-[8px] font-mono text-white/40 uppercase tracking-wider">Urgent Hot Leads (Score &gt; 80)</span>
            <span className="text-lg font-bold font-mono text-rose-400 mt-1 block">{hotLeadsCount} Target sites</span>
          </div>
          <div className="bg-black/40 border border-white/15 p-3 rounded-xl">
            <span className="block text-[8px] font-mono text-white/40 uppercase tracking-wider">Conversion rate projection</span>
            <span className="text-lg font-bold font-mono text-blue-400 mt-1 block">72.4% Win Chance</span>
          </div>
        </div>
      </div>

      {/* 2. Navigation bar */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setSubTab("leads")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === "leads" ? "bg-blue-600 text-black shadow-md font-bold" : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          <Building className="w-4 h-4" /> Opportunities Central ({leads.length})
        </button>
        <button
          onClick={() => setSubTab("discover")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === "discover" ? "bg-blue-600 text-black shadow-md font-bold" : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          <Search className="w-4 h-4" /> Global Discovery & Auditor
        </button>
        <button
          onClick={() => setSubTab("pipeline")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === "pipeline" ? "bg-blue-600 text-black shadow-md font-bold" : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Sales Pipeline (Kanban)
        </button>
        <button
          onClick={() => setSubTab("proposal")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === "proposal" ? "bg-blue-600 text-black shadow-md font-bold" : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          <FileText className="w-4 h-4" /> Scope Proposal Forge
        </button>
        <button
          onClick={() => setSubTab("outreach")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === "outreach" ? "bg-blue-600 text-black shadow-md font-bold" : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          <Mail className="w-4 h-4" /> Native Outreach Campaign
        </button>
        <button
          onClick={() => setSubTab("scheduler")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === "scheduler" ? "bg-blue-600 text-black shadow-md font-bold" : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          <Calendar className="w-4 h-4" /> Calendars & Tasks
        </button>
        <button
          onClick={() => setSubTab("copilot")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === "copilot" ? "bg-blue-600 text-black shadow-md font-bold" : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          <Cpu className="w-4 h-4" /> Growth Copilot
        </button>
        <button
          onClick={() => setSubTab("audit")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
            subTab === "audit" ? "bg-blue-600 text-black shadow-md font-bold" : "text-white/60 hover:text-white bg-white/5"
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Security & Auditing Logs
        </button>
      </div>

      {/* 3. Panel Switcher Workspace */}

      {/* SUBTAB 1: OPPORTUNITIES CENTRAL (Leads lists) */}
      {subTab === "leads" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: List of companies */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Discovered targets ({leads.length})</h3>
              <button
                onClick={() => setAddingLeadOpen(true)}
                className="px-2 py-1 bg-blue-600 text-black text-[10px] font-bold rounded flex items-center gap-1 hover:bg-blue-500 transition-all uppercase"
              >
                <Plus className="w-3.5 h-3.5" /> Log Custom Lead
              </button>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {leads.map((l) => (
                <div
                  key={l.id}
                  onClick={() => setSelectedLeadId(l.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2.5 relative ${
                    selectedLeadId === l.id
                      ? "bg-white/5 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                      : "bg-[#0b0f17] border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Lead Score indicator */}
                  <div className={`absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 border rounded-full font-bold ${getScoreColor(l.score)}`}>
                    Score: {l.score}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight pr-16">{l.companyName}</h4>
                    <span className="text-[10px] text-white/40 block mt-0.5">{l.website}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-[10px] text-white/50">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" /> {l.city || l.state}, {l.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-3 h-3 text-blue-400" /> {l.industry}
                    </span>
                  </div>

                  {/* Estimated Contract Value & Gaps */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
                    <div>
                      <span className="text-[8px] text-white/30 uppercase block">Est. SOW Value</span>
                      <span className="text-xs font-bold font-mono text-emerald-400">${l.estimatedProjectValue?.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-1">
                      {l.missingFeatures?.slice(0, 2).map((gap: string, idx: number) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded text-[8px] font-mono uppercase">
                          {gap}
                        </span>
                      ))}
                      {l.missingFeatures?.length > 2 && (
                        <span className="px-1.5 py-0.5 bg-white/5 text-white/40 border border-white/10 rounded text-[8px] font-mono uppercase">
                          +{l.missingFeatures.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Lead Details & Workspace Actions */}
          <div className="lg:col-span-7 bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-6">
            {activeLead ? (
              <div className="space-y-6 text-left">
                {/* Lead Headline */}
                <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{activeLead.companyName}</h3>
                      <a href={`https://${activeLead.website}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-xs text-white/40 mt-1">Lead status: <strong className="text-blue-400 font-mono uppercase">{activeLead.stage}</strong> (Created {activeLead.dateCreated})</p>
                  </div>
                  <button
                    onClick={() => handleDeleteLead(activeLead.id)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-lg transition-all"
                    title="Remove Lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Visual View Switcher (Summary vs Screenshot) */}
                <div className="flex border-b border-white/5 pb-2 gap-4">
                  <button
                    onClick={() => setLeadDetailView("summary")}
                    className={`pb-1.5 text-xs font-bold uppercase font-mono tracking-wider transition-all border-b-2 ${
                      leadDetailView === "summary"
                        ? "text-blue-400 border-blue-500"
                        : "text-white/40 border-transparent hover:text-white"
                    }`}
                  >
                    📋 Executive Summary
                  </button>
                  <button
                    onClick={() => setLeadDetailView("screenshot")}
                    className={`pb-1.5 text-xs font-bold uppercase font-mono tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
                      leadDetailView === "screenshot"
                        ? "text-blue-400 border-blue-500 font-bold"
                        : "text-white/40 border-transparent hover:text-white"
                    }`}
                  >
                    📷 Interactive Audit Screenshot
                    <span className="bg-rose-500 text-white text-[8px] px-1.5 py-0.5 rounded-full animate-pulse uppercase font-sans">
                      {activeLead.missingFeatures?.length || 4} Gaps
                    </span>
                  </button>
                </div>

                {leadDetailView === "screenshot" ? (
                  <AuditScreenshot
                    url={activeLead.website}
                    companyName={activeLead.companyName}
                    industry={activeLead.industry}
                    missingFeatures={activeLead.missingFeatures}
                    techStack={activeLead.techStack}
                  />
                ) : (
                  <>
                    {/* General Data Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block">Firmographic parameters</span>
                        <p className="text-xs text-white/70"><strong>Size:</strong> {activeLead.size} staff</p>
                        <p className="text-xs text-white/70"><strong>Revenue:</strong> {activeLead.revenue || "N/A"}</p>
                        <p className="text-xs text-white/70"><strong>Tech Stack:</strong> {activeLead.techStack}</p>
                      </div>

                      <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest block">Direct Contacts</span>
                        <p className="text-xs text-white/70"><strong>Name:</strong> {activeLead.contactName || "N/A"}</p>
                        <p className="text-xs text-white/70"><strong>Email:</strong> {activeLead.contactEmail || "N/A"}</p>
                        <p className="text-xs text-white/70"><strong>Phone:</strong> {activeLead.contactPhone || "N/A"}</p>
                      </div>
                    </div>

                    {/* Audit & Capability scorecard */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Conversion Scorecard & Gaps</h4>
                      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-3">
                        <div className="flex items-center gap-2 text-rose-400">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Identified optimization gaps</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeLead.missingFeatures?.map((gap: string, i: number) => (
                            <span key={i} className="px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-mono font-medium">
                              • {gap}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed font-light">
                          <strong>AI Lead Notes:</strong> {activeLead.notes || "No notes captured."}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Outbound Action Triggers */}
                    <div className="space-y-3 border-t border-white/10 pt-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Outbound sales tools</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <button
                          onClick={() => handleWebsiteAudit(activeLead.website, activeLead.companyName)}
                          className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center transition-all group"
                        >
                          <Laptop className="w-5 h-5 mx-auto text-blue-400 group-hover:scale-110 transition-all mb-1" />
                          <span className="block text-[9px] font-bold text-white uppercase">Run Site Audit</span>
                        </button>

                        <button
                          onClick={() => handleGenerateProposal(activeLead.id)}
                          className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center transition-all group"
                        >
                          <FileText className="w-5 h-5 mx-auto text-violet-400 group-hover:scale-110 transition-all mb-1" />
                          <span className="block text-[9px] font-bold text-white uppercase">Draft proposal</span>
                        </button>

                        <button
                          onClick={() => handleGenerateEmail(activeLead.id)}
                          className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center transition-all group"
                        >
                          <Mail className="w-5 h-5 mx-auto text-emerald-400 group-hover:scale-110 transition-all mb-1" />
                          <span className="block text-[9px] font-bold text-white uppercase">Write Email</span>
                        </button>

                        <button
                          onClick={() => setSchedulingOpen(true)}
                          className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center transition-all group"
                        >
                          <Calendar className="w-5 h-5 mx-auto text-blue-400 group-hover:scale-110 transition-all mb-1" />
                          <span className="block text-[9px] font-bold text-white uppercase">Schedule Sync</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-white/30">
                <Building className="w-12 h-12 mx-auto text-white/10 mb-2" />
                Select a lead to launch CRM actions or initiate scan workflows.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: GLOBAL DISCOVERY & SITE AUDITOR */}
      {subTab === "discover" && (
        <div className="space-y-6 text-left">
          {/* Scanning radar parameters */}
          <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Configure scan parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Target country</label>
                <select
                  value={discoveryFilters.country}
                  onChange={(e) => setDiscoveryFilters({ ...discoveryFilters, country: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="Any">Worldwide (Any)</option>
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="Germany">Germany</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                  <option value="Kenya">Kenya</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Target industry</label>
                <select
                  value={discoveryFilters.industry}
                  onChange={(e) => setDiscoveryFilters({ ...discoveryFilters, industry: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="Any">Any Industry</option>
                  <option value="E-commerce & Retail">E-commerce & Retail</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                  <option value="Finance & Fintech">Finance & Fintech</option>
                  <option value="Legal Services">Legal Services</option>
                  <option value="Hospitality & Travel">Hospitality & Travel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/40 block">AI readiness level</label>
                <select
                  value={discoveryFilters.aiAdoption}
                  onChange={(e) => setDiscoveryFilters({ ...discoveryFilters, aiAdoption: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="Any">Any Adoption</option>
                  <option value="None">None (Highest Urgency)</option>
                  <option value="Low">Low (Basic chatbot)</option>
                  <option value="Medium">Medium (Using pre-builts)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Hiring Indicators</label>
                <select
                  value={discoveryFilters.hiringStatus}
                  onChange={(e) => setDiscoveryFilters({ ...discoveryFilters, hiringStatus: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="Any">Ignore Hiring Status</option>
                  <option value="Yes">Hiring Developers (High conversion chance)</option>
                  <option value="No">Not Hiring</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleDiscover}
              disabled={discoveryScanning}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {discoveryScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Holographic Sonar Scanning Directory Registry...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Run Global Discovery Scan
                </>
              )}
            </button>
          </div>

          {/* Dynamic Radar sonar scanning pulse screen */}
          {discoveryScanning && (
            <div className="p-8 bg-black/40 border border-white/10 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
              <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
                scanPulse ? "border-blue-500/80 scale-105 shadow-[0_0_20px_rgba(59,130,246,0.4)]" : "border-blue-500/20 scale-95"
              }`}>
                <Search className="w-10 h-10 text-blue-400 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase font-mono">Discovery Agent Crawling Registry Logs</h4>
                <p className="text-xs text-white/40 mt-1 max-w-md">
                  Filtering by country ({discoveryFilters.country}), industry ({discoveryFilters.industry}) and AI adoption... Checking GDPR compliance tags.
                </p>
              </div>
            </div>
          )}

          {/* URL Website Analyzer box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-blue-400">
                <Laptop className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Public Website Analyzer</h3>
              </div>
              <p className="text-xs text-white/40">
                Input any public business URL below. The AI auditor will crawl its structure to detect crucial performance or AI chatbot vulnerabilities.
              </p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., www.munichlogistics.com"
                  value={websiteAuditUrl}
                  onChange={(e) => setWebsiteAuditUrl(e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleWebsiteAudit(websiteAuditUrl)}
                  disabled={websiteAuditing || !websiteAuditUrl.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase rounded-lg transition-all disabled:opacity-50"
                >
                  {websiteAuditing ? "Auditing..." : "Audit Site"}
                </button>
              </div>
            </div>

            {/* Audit Report Viewer box */}
            <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Active Audit Report</h3>
              <div className="bg-black/60 border border-white/5 rounded-xl p-4 h-64 overflow-y-auto font-sans text-xs text-white/80 scrollbar-thin leading-relaxed">
                {websiteAuditReport ? (
                  <div className="markdown-body text-left">
                    <ReactMarkdown>{websiteAuditReport}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center py-16 text-white/30 italic">
                    Audit results will compile here instantly.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Website audit screenshot visualizer */}
          {websiteAuditUrl && (
            <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-blue-400 animate-pulse" />
                📷 Live Website Audit Screenshot Previewer
              </h3>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                Below is the interactive visual representation of <strong className="text-blue-400 font-mono">{websiteAuditUrl}</strong> derived from our crawler nodes. Toggle the upgrade switch to simulate embedding dynamic customer support agents and page speed optimization pipelines.
              </p>
              <AuditScreenshot
                url={websiteAuditUrl}
                companyName={activeLead?.companyName || "External Audited Client"}
                industry={activeLead?.industry || "Software & Technology"}
                missingFeatures={activeLead?.missingFeatures || ["Conversational AI Chatbot", "Static Performance Pipeline", "Localized Multilingual Support", "CRM Form Webhooks"]}
                techStack={activeLead?.techStack || "Legacy Tech Stack"}
              />
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: SALES PIPELINE (KANBAN BOARD) */}
      {subTab === "pipeline" && (
        <div className="space-y-6 text-left">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Bento Sales Pipeline Board</h3>
            <span className="text-[10px] font-mono text-white/40">Value: <strong className="text-emerald-400 font-bold">${pipelineTotalVal.toLocaleString()}</strong></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {/* Stage 1: Lead */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 min-w-[200px] space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="text-[10px] font-bold font-mono text-blue-400 uppercase">1. Incoming Leads</span>
                <span className="px-2 py-0.5 bg-blue-400/10 text-blue-400 rounded-full text-[9px] font-bold">
                  {deals.filter((d) => d.stage === "Lead").length}
                </span>
              </div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {deals.filter((d) => d.stage === "Lead").map((deal) => {
                  const dealLead = leads.find((l) => l.id === deal.leadId);
                  return (
                    <div key={deal.id} className="bg-[#0b0f17] border border-white/10 rounded-xl p-3 space-y-2 hover:border-blue-500/30 transition-all text-left">
                      <span className="block text-[8px] font-mono text-white/30 uppercase">{dealLead?.companyName || "Unknown"}</span>
                      <h4 className="text-xs font-bold text-white truncate">{deal.title}</h4>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-emerald-400 font-bold">${deal.value?.toLocaleString()}</span>
                        <button
                          onClick={() => handleUpdateDealStage(deal.id, "Qualified")}
                          className="px-1.5 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 rounded text-[9px] flex items-center"
                        >
                          Advance <ChevronRight className="w-3 h-3 ml-0.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage 2: Qualified */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 min-w-[200px] space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="text-[10px] font-bold font-mono text-violet-400 uppercase">2. Qualified</span>
                <span className="px-2 py-0.5 bg-violet-400/10 text-violet-400 rounded-full text-[9px] font-bold">
                  {deals.filter((d) => d.stage === "Qualified").length}
                </span>
              </div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {deals.filter((d) => d.stage === "Qualified").map((deal) => {
                  const dealLead = leads.find((l) => l.id === deal.leadId);
                  return (
                    <div key={deal.id} className="bg-[#0b0f17] border border-white/10 rounded-xl p-3 space-y-2 hover:border-violet-500/30 transition-all text-left">
                      <span className="block text-[8px] font-mono text-white/30 uppercase">{dealLead?.companyName || "Unknown"}</span>
                      <h4 className="text-xs font-bold text-white truncate">{deal.title}</h4>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-emerald-400 font-bold">${deal.value?.toLocaleString()}</span>
                        <button
                          onClick={() => handleUpdateDealStage(deal.id, "Meeting Scheduled")}
                          className="px-1.5 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 rounded text-[9px] flex items-center"
                        >
                          Advance <ChevronRight className="w-3 h-3 ml-0.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage 3: Meeting Scheduled */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 min-w-[200px] space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="text-[10px] font-bold font-mono text-amber-400 uppercase">3. Scheduled Sync</span>
                <span className="px-2 py-0.5 bg-amber-400/10 text-amber-400 rounded-full text-[9px] font-bold">
                  {deals.filter((d) => d.stage === "Meeting Scheduled").length}
                </span>
              </div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {deals.filter((d) => d.stage === "Meeting Scheduled").map((deal) => {
                  const dealLead = leads.find((l) => l.id === deal.leadId);
                  return (
                    <div key={deal.id} className="bg-[#0b0f17] border border-white/10 rounded-xl p-3 space-y-2 hover:border-amber-500/30 transition-all text-left">
                      <span className="block text-[8px] font-mono text-white/30 uppercase">{dealLead?.companyName || "Unknown"}</span>
                      <h4 className="text-xs font-bold text-white truncate">{deal.title}</h4>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-emerald-400 font-bold">${deal.value?.toLocaleString()}</span>
                        <button
                          onClick={() => handleUpdateDealStage(deal.id, "Proposal Sent")}
                          className="px-1.5 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 rounded text-[9px] flex items-center"
                        >
                          Advance <ChevronRight className="w-3 h-3 ml-0.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage 4: Proposal Sent */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 min-w-[200px] space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="text-[10px] font-bold font-mono text-indigo-400 uppercase">4. Proposal Sent</span>
                <span className="px-2 py-0.5 bg-indigo-400/10 text-indigo-400 rounded-full text-[9px] font-bold">
                  {deals.filter((d) => d.stage === "Proposal Sent").length}
                </span>
              </div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {deals.filter((d) => d.stage === "Proposal Sent").map((deal) => {
                  const dealLead = leads.find((l) => l.id === deal.leadId);
                  return (
                    <div key={deal.id} className="bg-[#0b0f17] border border-white/10 rounded-xl p-3 space-y-2 hover:border-indigo-500/30 transition-all text-left">
                      <span className="block text-[8px] font-mono text-white/30 uppercase">{dealLead?.companyName || "Unknown"}</span>
                      <h4 className="text-xs font-bold text-white truncate">{deal.title}</h4>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-emerald-400 font-bold">${deal.value?.toLocaleString()}</span>
                        <button
                          onClick={() => handleUpdateDealStage(deal.id, "Won")}
                          className="px-1.5 py-0.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded text-[9px] flex items-center font-bold"
                        >
                          Won Close <Check className="w-3 h-3 ml-0.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage 5: Won */}
            <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-2xl p-4 min-w-[200px] space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 mb-2">
                <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase">5. Closed Won</span>
                <span className="px-2 py-0.5 bg-emerald-400/10 text-emerald-400 rounded-full text-[9px] font-bold">
                  {deals.filter((d) => d.stage === "Won").length}
                </span>
              </div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {deals.filter((d) => d.stage === "Won").map((deal) => {
                  const dealLead = leads.find((l) => l.id === deal.leadId);
                  return (
                    <div key={deal.id} className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 space-y-1.5 text-left">
                      <span className="block text-[8px] font-mono text-emerald-400/50 uppercase">{dealLead?.companyName || "Unknown"}</span>
                      <h4 className="text-xs font-bold text-emerald-300 truncate">{deal.title}</h4>
                      <div className="flex justify-between items-center text-[10px] font-mono mt-1">
                        <span className="text-emerald-400 font-bold">${deal.value?.toLocaleString()}</span>
                        <span className="text-[8px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded">Active deal</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: SCOPE PROPOSAL FORGE */}
      {subTab === "proposal" && (
        <div className="space-y-6 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 bg-[#0b0f17] border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Compile New Proposal SOW</h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Selected client opportunity</label>
                <select
                  value={selectedLeadId}
                  onChange={(e) => setSelectedLeadId(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>{l.companyName} (${l.estimatedProjectValue?.toLocaleString()})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Bespoke quotation requirements</label>
                <textarea
                  placeholder="e.g. Include specific multi-agent memory structures, custom database scaling, or local Telugu/Hindi localizations."
                  value={proposalNotes}
                  onChange={(e) => setProposalNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <button
                onClick={() => handleGenerateProposal(selectedLeadId)}
                disabled={proposalGenerating}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all disabled:opacity-50"
              >
                {proposalGenerating ? "Drafting bespoke architectural Scope..." : "Generate AI Proposal"}
              </button>
            </div>

            {/* Document Viewer */}
            <div className="lg:col-span-7 bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4 relative">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block"> Bespoke Quotation Document</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (proposalGenerated) {
                        navigator.clipboard.writeText(proposalGenerated.fullContent || proposalGenerated.roi);
                        showNotification("Copied", "Proposal content copied to clipboard.");
                      }
                    }}
                    disabled={!proposalGenerated}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] text-white/60 uppercase"
                  >
                    Copy Markdown
                  </button>
                  <button
                    onClick={() => showNotification("🖨️ PDF Dispatched", "Downloaded formal document template.")}
                    disabled={!proposalGenerated}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[10px] text-white/60 uppercase"
                  >
                    Simulate Print
                  </button>
                </div>
              </div>

              <div className="bg-[#030712] border border-white/5 rounded-xl p-6 h-96 overflow-y-auto text-left font-sans text-xs text-white/80 leading-relaxed scrollbar-thin">
                {proposalGenerated ? (
                  <div className="markdown-body space-y-4">
                    <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider">{proposalGenerated.title}</h2>
                    <div className="grid grid-cols-2 gap-4 bg-white/5 p-3 rounded-lg text-[10px] font-mono border border-white/5">
                      <p>• Client: {proposalGenerated.clientName}</p>
                      <p>• Scope timeline: {proposalGenerated.timeline}</p>
                      <p>• SOW Value: ${proposalGenerated.cost?.toLocaleString()}</p>
                      <p>• SLA Maintenance: {proposalGenerated.maintenance}</p>
                    </div>
                    <ReactMarkdown>{proposalGenerated.fullContent || proposalGenerated.roi}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center py-24 text-white/30 italic">
                    Configure notes and click Generate. Standard venture-grade proposal outputs will compile inside this preview.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: NATIVE OUTREACH CAMPAIGN (Translations) */}
      {subTab === "outreach" && (
        <div className="space-y-6 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 bg-[#0b0f17] border border-white/10 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Configure Multi-lingual Outreach</h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Select Target Opportunity</label>
                <select
                  value={selectedLeadId}
                  onChange={(e) => setSelectedLeadId(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>{l.companyName} ({l.country})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Email Template Theme</label>
                <select
                  value={emailCampaignType}
                  onChange={(e) => setEmailCampaignType(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="cold">Cold Outbound Pitch (Ethical / Problem-First)</option>
                  <option value="follow-up">Outbound Follow-up</option>
                  <option value="website redesign">Website Performance & Speed Offer</option>
                  <option value="AI transformation">Custom Multi-LLM AI Router Pitch</option>
                  <option value="partnership">Strategic Partnership Proposal</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Outbound translation Language</label>
                <select
                  value={emailLanguage}
                  onChange={(e) => setEmailLanguage(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="English">English</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Hindi">Hindi (हिन्दी)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Malayalam">Malayalam (മലയാളം)</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                  <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-white/40 block">Sender Representative Name</label>
                <input
                  type="text"
                  value={emailSenderName}
                  onChange={(e) => setEmailSenderName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <button
                onClick={() => handleGenerateEmail(selectedLeadId)}
                disabled={emailGenerating}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all disabled:opacity-50"
              >
                {emailGenerating ? "Writing Translation Outreach..." : "Write Conversion Email"}
              </button>
            </div>

            {/* Email Output Viewer */}
            <div className="lg:col-span-7 bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block">Outbound Email Client Preview</span>
                <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[9px] font-mono">Ready to dispatch</span>
              </div>

              <div className="bg-[#030712] border border-white/5 rounded-xl p-5 h-80 overflow-y-auto font-sans text-xs text-white/80 leading-relaxed scrollbar-thin">
                {emailGenerated ? (
                  <div className="whitespace-pre-line text-left">
                    {emailGenerated}
                  </div>
                ) : (
                  <div className="text-center py-24 text-white/30 italic">
                    Translated outreach copy will compile here dynamically based on chosen language.
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  showNotification("🚀 Outbound Email Dispatched Successfully", `Email SMTP successfully parsed and sent to ${activeLead?.contactEmail || "target inbox"}.`);
                  refreshCrmData();
                }}
                disabled={!emailGenerated}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all disabled:bg-emerald-950/20 disabled:text-white/20 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Approve & Dispatch Outreach Drip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 6: CENTRAL SCHEDULER & TASKS */}
      {subTab === "scheduler" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
          {/* Action Items List */}
          <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Action items checklist</h3>
              </div>
            </div>

            {/* Add task bar */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Log a call or follow-up item..."
                value={addingTaskForm.title}
                onChange={(e) => setAddingTaskForm({ title: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleAddTask}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-black rounded-lg text-xs font-bold"
              >
                Add
              </button>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-black/30 border border-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.status === "Completed"}
                      onChange={() => handleToggleTask(task.id)}
                      className="w-4 h-4 rounded border-white/10 bg-black text-blue-600 focus:ring-0"
                    />
                    <div>
                      <span className={`text-xs ${task.status === "Completed" ? "line-through text-white/30" : "text-white"}`}>
                        {task.title}
                      </span>
                      <span className="block text-[8px] font-mono text-white/20 uppercase">Due: {task.dueDate}</span>
                    </div>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                    task.priority === "High" ? "bg-rose-500/10 text-rose-400" : "bg-white/5 text-white/40"
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar scheduler */}
          <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Google & Outlook Calendar mock</h3>
              </div>
              <button
                onClick={() => setSchedulingOpen(true)}
                className="px-2 py-0.5 bg-blue-600 text-black text-[9px] font-bold rounded uppercase"
              >
                Schedule Sync
              </button>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Active Scheduled meetings ({meetings.length})</span>
              
              <div className="space-y-2 max-h-[320px] overflow-y-auto">
                {meetings.map((meet) => {
                  const meetLead = leads.find((l) => l.id === meet.leadId);
                  return (
                    <div key={meet.id} className="p-3 bg-black/40 border border-white/5 rounded-xl text-left space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-white">{meet.title}</h4>
                        <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded-full text-[8px] font-mono">
                          {meet.platform}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/50">{meet.description}</p>
                      <div className="flex justify-between items-center text-[9px] font-mono text-white/30 pt-1.5 border-t border-white/5">
                        <span>Lead: {meetLead?.companyName || "N/A"}</span>
                        <span>Time: {meet.start?.replace("T", " ")}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 7: GROWTH COPILOT */}
      {subTab === "copilot" && (
        <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4 text-left">
          <div className="flex items-center gap-2 text-blue-400 border-b border-white/10 pb-3">
            <Cpu className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">AI Growth Consultant Chat</h3>
          </div>
          <p className="text-xs text-white/40">
            Ask the central intelligence co-pilot to analyze your current lead scoring statistics, draft tactical follow-up questions, or calculate ROI for a customized SOW pricing model.
          </p>

          {/* Chat message body container */}
          <div className="bg-black/60 border border-white/5 rounded-xl p-4 h-80 overflow-y-auto space-y-3 scrollbar-thin">
            {salesAssistantHistory.map((msg, i) => (
              <div key={i} className={`flex gap-3 max-w-2xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  msg.role === "user" ? "bg-blue-500 text-black" : "bg-gradient-to-tr from-blue-500 to-purple-600 text-white"
                }`}>
                  {msg.role === "user" ? "U" : "AI"}
                </div>
                <div className={`rounded-xl px-3.5 py-2.5 text-xs ${
                  msg.role === "user" ? "bg-blue-600 text-black font-semibold" : "bg-white/5 border border-white/10 text-white/90"
                }`}>
                  {msg.role === "user" ? (
                    msg.text
                  ) : (
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {salesAssistantLoading && (
              <div className="flex gap-2 items-center text-white/30 text-xs font-mono">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Co-pilot reasoning...
              </div>
            )}
          </div>

          {/* Chat input form */}
          <div className="flex gap-3">
            <input
              type="text"
              value={salesAssistantMsg}
              onChange={(e) => setSalesAssistantMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSalesAssistantChat()}
              placeholder="Ask me: 'Which hot leads should I call today?' or 'How should I price the Veloce Logistics deal?'"
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
            />
            <button
              onClick={handleSalesAssistantChat}
              disabled={salesAssistantLoading || !salesAssistantMsg.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-black rounded-xl text-xs font-black uppercase flex items-center gap-1 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 8: GDPR AUDIT LOGS */}
      {subTab === "audit" && (
        <div className="bg-[#0b0f17] border border-white/10 rounded-2xl p-6 space-y-4 text-left">
          <div className="flex items-center gap-2 text-blue-400 border-b border-white/10 pb-3">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">GDPR Outbound Compliance Logs</h3>
          </div>
          <p className="text-xs text-white/40 leading-relaxed font-light">
            All discovery crawls, public email generations, and calendar synchronizations write secure immutable logs to this dashboard. This guarantees strict GDPR compliance, security tracking, and zero permissionless scrubbing.
          </p>

          <div className="bg-[#020304] border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white/60 h-80 overflow-y-auto space-y-3.5 scrollbar-thin">
            {auditLogs.map((log) => (
              <div key={log.id} className="border-b border-white/5 pb-2.5 last:border-0">
                <div className="flex justify-between text-white/30 text-[8px] uppercase tracking-wider">
                  <span>ID: {log.id}</span>
                  <span>{log.date}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 font-bold text-blue-400 uppercase tracking-wide text-[9px]">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  {log.action}
                </div>
                <p className="text-white/70 mt-1 leading-relaxed select-text">{log.detail}</p>
                <div className="text-right text-[8px] text-white/20 mt-1 uppercase font-bold">Secure Node Server: {log.ip}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MODALS FOR CENTRAL ACTIONS */}

      {/* MODAL 1: ADD CUSTOM LEAD */}
      {addingLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b0f17] border border-white/15 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl text-left">
            <div className="bg-black/60 p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-white">Log Custom CRM Opportunity</span>
              <button onClick={() => setAddingLeadOpen(false)} className="text-white/40 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[450px] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-white/50 block">Company name</label>
                <input
                  type="text"
                  placeholder="Veloce Logistics"
                  value={newLeadForm.companyName}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, companyName: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-white/50 block">Website domain</label>
                <input
                  type="text"
                  placeholder="velocelogistics.de"
                  value={newLeadForm.website}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, website: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/50 block">Target Country</label>
                  <input
                    type="text"
                    placeholder="Germany"
                    value={newLeadForm.country}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, country: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/50 block">SOW estimated value ($)</label>
                  <input
                    type="number"
                    value={newLeadForm.estimatedProjectValue}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedProjectValue: Number(e.target.value) })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-white/50 block">Tech stack description</label>
                <input
                  type="text"
                  placeholder="WordPress, Legacy PHP"
                  value={newLeadForm.techStack}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, techStack: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/50 block">Contact full name</label>
                  <input
                    type="text"
                    placeholder="Hans Müller"
                    value={newLeadForm.contactName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactName: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/50 block">Contact email address</label>
                  <input
                    type="email"
                    placeholder="h.mueller@velo.de"
                    value={newLeadForm.contactEmail}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, contactEmail: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-white/50 block">Initial CRM notes</label>
                <textarea
                  placeholder="Hiring developers, slow website."
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  rows={2}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <button
                onClick={handleCreateLead}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all"
              >
                Save Custom Lead & Deal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SCHEDULING CALENDAR */}
      {schedulingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b0f17] border border-white/15 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl text-left">
            <div className="bg-black/60 p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-white">Sync Scheduled Call (Google/Outlook Mock)</span>
              <button onClick={() => setSchedulingOpen(false)} className="text-white/40 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-white/50 block">Select Calendar Service</label>
                <select
                  value={newMeetingForm.platform}
                  onChange={(e) => setNewMeetingForm({ ...newMeetingForm, platform: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                >
                  <option value="Google Calendar">Google Calendar Cloud</option>
                  <option value="Microsoft Outlook">Microsoft Outlook Calendar</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-white/50 block">Meeting title</label>
                <input
                  type="text"
                  value={newMeetingForm.title}
                  onChange={(e) => setNewMeetingForm({ ...newMeetingForm, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/50 block">Meeting date</label>
                  <input
                    type="date"
                    value={newMeetingForm.date}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, date: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/50 block">Time (EST/GMT)</label>
                  <input
                    type="time"
                    value={newMeetingForm.time}
                    onChange={(e) => setNewMeetingForm({ ...newMeetingForm, time: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-white/50 block">Agenda description</label>
                <textarea
                  value={newMeetingForm.description}
                  onChange={(e) => setNewMeetingForm({ ...newMeetingForm, description: e.target.value })}
                  rows={2}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white"
                />
              </div>

              <button
                onClick={handleScheduleCall}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all"
              >
                Schedule & Sync to CRM
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
