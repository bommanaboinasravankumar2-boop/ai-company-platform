import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside React tree:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-[#0d121f] border border-rose-500/30 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-left">
            {/* Red Alert Icon */}
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 mb-5">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>

            <h2 className="text-base font-bold text-slate-100 uppercase font-mono tracking-wider mb-2">
              React Runtime Exception
            </h2>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              A critical rendering or lifecycle error has been intercepted inside the React component hierarchy. The interface has been halted safely to prevent data loss.
            </p>

            {/* Error Message Diagnostics */}
            <div className="bg-[#02040a] border border-slate-800 rounded-xl p-4 mb-6">
              <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">
                Diagnostics Stack Trace
              </span>
              <code className="block text-xs font-mono text-rose-400 overflow-x-auto whitespace-pre-wrap break-all max-h-48 scrollbar-thin">
                {this.state.error?.toString() || "Unknown Component Error"}
                {this.state.errorInfo?.componentStack && (
                  <div className="text-slate-500 text-[10px] mt-2 border-t border-slate-900 pt-2 font-mono">
                    {this.state.errorInfo.componentStack}
                  </div>
                )}
              </code>
            </div>

            {/* Reset / Reload Buttons */}
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-black font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 font-mono uppercase cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Reset Interface
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-transparent hover:bg-white/5 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs py-2.5 px-4 rounded-xl transition-all font-mono uppercase cursor-pointer"
              >
                Full Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
