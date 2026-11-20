import React from 'react';

/**
 * Map of known broken/deprecated Unsplash URLs or titles to verified working high-res photos.
 */
const BROKEN_URL_REPLACEMENTS: Record<string, string> = {
  // Broken "Ancestral Algorithm" mixed media art URL
  'https://images.unsplash.com/photo-1582561173612-421718cb17ec?auto=format&fit=crop&w=1200&q=80':
    'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1582561173612-421718cb17ec?auto=format&fit=crop&w=800&q=80':
    'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',

  // Broken "Cassava Croquettes" cuisine URL
  'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80':
    'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80':
    'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
};

const TITLE_FALLBACKS: Record<string, string> = {
  'Echoes of the Rift':
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
  'Sisal Metamorphosis III':
    'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80',
  'Nairobi Nocturne: Matatu Reverie':
    'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80',
  'Ancestral Algorithm':
    'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80',
  'Smoked Suya Spiced Beef Short Ribs':
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  'Lamu Coconut Tamarind Snapper':
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
  'Cassava Croquettes with Baobab Chili Dip':
    'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80',
  'Cold-Pressed Hibiscus, Ginger & Baobab Elixir':
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
};

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80';

/**
 * Resolves an image URL, replacing any known dead URLs with verified high-res equivalents.
 */
export function resolveImageUrl(url?: string, title?: string): string {
  if (url && BROKEN_URL_REPLACEMENTS[url]) {
    return BROKEN_URL_REPLACEMENTS[url];
  }
  if (url && url.includes('1582561173612-421718cb17ec')) {
    return 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80';
  }
  if (url && url.includes('1541832676-9b763b0239ab')) {
    return 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80';
  }
  if (title && TITLE_FALLBACKS[title]) {
    return url || TITLE_FALLBACKS[title];
  }
  return url || DEFAULT_FALLBACK_IMAGE;
}

/**
 * Fallback handler for <img> onError events so broken image icons never render.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string = DEFAULT_FALLBACK_IMAGE
) {
  const target = e.currentTarget;
  if (target.dataset.fallbackApplied === 'true') return;
  target.dataset.fallbackApplied = 'true';
  target.src = fallbackUrl;
}
