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
 * Common asset paths (exact disk & git file names)
 */
export const ASSET_PATHS = {
  cv: () => getAssetPath('cv/Ahmed_BOURMECHE_RESUME.pdf'),
  cvRoot: () => getAssetPath('Ahmed_BOURMECHE_RESUME.pdf'),
  cvCamel: () => getAssetPath('cv/Ahmed_Bourmeche_RESUME.pdf'),
  photo: () => getAssetPath('ABourmeche.jpeg'),
} as const;

/**
 * Robust programmatic resume downloader that verifies the binary PDF header
 * and triggers a native browser file save with exact filename
 */
export async function triggerResumeDownload(e?: React.MouseEvent) {
  if (e) e.preventDefault();

  const candidateUrls = [
    ASSET_PATHS.cv(),
    ASSET_PATHS.cvRoot(),
    ASSET_PATHS.cvCamel(),
    './cv/Ahmed_BOURMECHE_RESUME.pdf',
    './Ahmed_BOURMECHE_RESUME.pdf',
    './cv/Ahmed_Bourmeche_RESUME.pdf',
  ];

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) continue;

      const contentType = res.headers.get('content-type') || '';
      // If server returned HTML fallback (SPA 404), skip it
      if (contentType.includes('text/html')) continue;

      const rawBlob = await res.blob();
      // Verify minimum size for real PDF (avoid corrupted 1-2kb HTML responses)
      if (rawBlob.size < 5000) continue;

      // Verify PDF magic header %PDF
      const headerBuffer = await rawBlob.slice(0, 5).text();
      if (!headerBuffer.startsWith('%PDF')) continue;

      // Wrap in explicit application/pdf blob
      const pdfBlob = new Blob([rawBlob], { type: 'application/pdf' });
      downloadBlob(pdfBlob, 'Ahmed_Bourmeche_RESUME.pdf');
      return true;
    } catch {
      // Continue to next candidate
    }
  }

  // Fallback: open directly in new tab
  window.open(ASSET_PATHS.cv(), '_blank');
  return false;
}

function downloadBlob(blob: Blob, filename: string) {
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.setAttribute('download', filename);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  }, 60000);
}
