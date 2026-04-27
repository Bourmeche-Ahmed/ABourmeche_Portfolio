/**
 * Get the base URL for assets, accounting for deployment subdirectory
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path}`.replace(/\/+/g, '/');
}

/**
 * Common asset paths
 */
export const ASSET_PATHS = {
  cv: () => getAssetPath('cv/AhmedBourmeche_CV.pdf'),
  photo: () => getAssetPath('ABourmeche.jpeg'),
} as const;
