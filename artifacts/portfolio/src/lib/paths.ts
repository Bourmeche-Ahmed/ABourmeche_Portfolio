/**
 * Get the absolute or base URL for assets, accounting for GitHub Pages subdirectory and custom domains
 */
export function getAssetPath(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/ABourmeche_Portfolio')) {
      return `/ABourmeche_Portfolio/${cleanPath}`;
    }
    return `/${cleanPath}`;
  }
  const base = import.meta.env.BASE_URL || '/';
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
}

/**
 * Common asset paths
 */
export const ASSET_PATHS = {
  cv: () => getAssetPath('cv/Ahmed_BOURMECHE_RESUME.pdf'),
  cvFallback: () => getAssetPath('Ahmed_BOURMECHE_RESUME.pdf'),
  photo: () => getAssetPath('ABourmeche.jpeg'),
} as const;

/**
 * Robust programmatic resume downloader that fetches the binary blob
 * and triggers a native browser file save with exact filename
 */
export async function triggerResumeDownload(e?: React.MouseEvent) {
  if (e) e.preventDefault();
  const pdfUrl = ASSET_PATHS.cv();
  try {
    const res = await fetch(pdfUrl);
    if (!res.ok) {
      // Try fallback URL in root public
      const fallbackUrl = ASSET_PATHS.cvFallback();
      const fallbackRes = await fetch(fallbackUrl);
      if (!fallbackRes.ok) throw new Error('Asset fetch failed');
      const blob = await fallbackRes.blob();
      downloadBlob(blob, 'Ahmed_Bourmeche_RESUME.pdf');
      return;
    }
    const blob = await res.blob();
    downloadBlob(blob, 'Ahmed_Bourmeche_RESUME.pdf');
  } catch (err) {
    console.warn('Blob download fallback, opening direct URL:', err);
    window.open(pdfUrl, '_blank');
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  }, 100);
}
