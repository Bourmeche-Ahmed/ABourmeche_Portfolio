/**
 * Get the base URL for assets, accounting for deployment subdirectory
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
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
  photo: () => getAssetPath('ABourmeche.jpeg'),
} as const;
