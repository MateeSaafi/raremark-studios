/**
 * Central site configuration.
 *
 * Everything you'll want to tweak first lives here. Items marked TODO need
 * your real values before launch (see README → "Before you ship").
 */

export const SITE = {
  /** Studio / company name — shown in the header wordmark and footer. */
  name: 'Raremark Studios',
  /** The product this site sells. */
  product: 'Research Buddy',
  /** Production URL — must match `site` in astro.config.mjs. TODO: confirm domain. */
  url: 'https://raremark.studio',
  /** Default meta description for pages that don't set their own. */
  description:
    'Research Buddy is a minimalist PDF reader for Android with AI explanations built into the page. Long-press to define, swipe to explain — without losing your place.',
  /** One-line value prop used in the hero. */
  tagline: 'Understand any PDF, the moment you get stuck.',
} as const;

/**
 * Contact addresses. TODO: replace with real inboxes you actually monitor.
 * (Play Store requires a working support contact.)
 */
export const EMAIL = {
  support: 'support@raremark.studio',
  privacy: 'privacy@raremark.studio',
} as const;

/**
 * Google Play listing URL. TODO: paste the real listing once the app is live.
 * Until then the CTA points here and is visibly marked "coming soon".
 */
export const PLAY_STORE_URL = '#';

/** Has the app actually shipped to Play yet? Flips the CTA copy/state. */
export const IS_LIVE = false;

/** Primary nav + footer links. */
export const NAV = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/support', label: 'Support' },
] as const;

/** Absolute URL helper for canonical + OG tags. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).href;
}
