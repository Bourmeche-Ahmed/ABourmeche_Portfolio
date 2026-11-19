import React from "react";
import { getAssetPath } from "@/lib/paths";
import { ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  const handleHome = () => {
    window.location.href = getAssetPath("/");
  };

  return (
    <div className="min-h-screen bg-panel text-ink flex items-center justify-center p-4 antialiased">
      <div className="max-w-md w-full border border-rule bg-panel-raised p-8 rounded-[2px] text-center space-y-6">
        <div className="inline-block px-2.5 py-1 rounded-[2px] bg-panel-sunk border border-rule font-mono text-xs text-ink-soft">
          404 // NOT_FOUND
        </div>

        <div className="space-y-2">
          <h1 className="font-heading font-bold text-3xl text-ink">
            Page Not Found
          </h1>
          <p className="font-sans text-sm text-ink-soft leading-relaxed">
            The requested page does not exist or has been moved.
          </p>
        </div>

        <div>
          <button
            onClick={handleHome}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
