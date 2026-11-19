import React from "react";
import { smoothScrollTo } from "@/lib/utils";
import { getAssetPath } from "@/lib/paths";
import { Bot, ArrowLeft, RefreshCw } from "lucide-react";

export function NotFoundPage() {
  const handleHome = () => {
    window.location.href = getAssetPath("/");
  };

  return (
    <div className="min-h-screen bg-panel text-ink flex items-center justify-center p-4 antialiased">
      <div className="max-w-md w-full border border-rule bg-panel-raised p-6 sm:p-8 rounded-[2px] shadow-sm text-center space-y-6">
        {/* Error Code Tag */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[1px] bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>STATUS: 404 // TRACK_LOST</span>
        </div>

        {/* 404 Animated Line-Follower Mascot lost off the track */}
        <div className="relative h-28 w-full bg-panel-sunk border border-rule rounded-[2px] overflow-hidden flex flex-col items-center justify-center">
          {/* Broken line track */}
          <div className="w-full flex items-center justify-center">
            <div className="w-20 h-1 bg-signal/60 rounded-l-[1px]" />
            <div className="w-12 h-1 border-t-2 border-dashed border-red-500 mx-2" />
            <div className="w-20 h-1 bg-rule rounded-r-[1px]" />
          </div>

          {/* Lost Robot Graphic */}
          <div className="mt-2 flex flex-col items-center animate-bounce">
            <div className="w-12 h-8 bg-zinc-900 border border-red-500/80 rounded-[2px] flex items-center justify-center relative">
              <span className="text-[10px] font-mono text-red-400 font-bold">404</span>
              {/* Lost sensor LEDs */}
              <div className="absolute -bottom-1 left-2 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <div className="absolute -bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            </div>
            <span className="text-[9px] font-mono text-ink-soft mt-1">
              LOST_IR_CONTACT
            </span>
          </div>
        </div>

        {/* Explanation */}
        <div className="space-y-2">
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-ink">
            Robot Lost the Line
          </h1>
          <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed">
            The requested trajectory does not exist in the routing table. Differential reflectance sensors detect zero ground signal at this endpoint.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleHome}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Origin (Home)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
