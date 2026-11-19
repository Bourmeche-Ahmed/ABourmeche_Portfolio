import { Tier } from "@/store";

export function detectTier(): Tier {
  if (typeof window === "undefined") return "static";

  // 1. URL Query Override (?tier=full|lite|static)
  try {
    const params = new URLSearchParams(window.location.search);
    const queryTier = params.get("tier");
    if (queryTier === "full" || queryTier === "lite" || queryTier === "static") {
      return queryTier;
    }
  } catch {
    // Ignore URL parse errors
  }

  // 2. Reduced motion preference -> static tier
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }

  // 3. Save-Data header / connection check -> static tier
  const nav = navigator as any;
  if (nav?.connection?.saveData) {
    return "static";
  }

  // 4. WebGL2 check
  const hasWebGL2 = (() => {
    try {
      const canvas = document.createElement("canvas");
      return Boolean(
        window.WebGL2RenderingContext && canvas.getContext("webgl2")
      );
    } catch {
      return false;
    }
  })();

  if (!hasWebGL2) {
    return "static";
  }

  // 5. Hardware concurrency & mobile check
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

  if (!isMobile && cores >= 6) {
    return "full";
  }

  return "lite";
}
