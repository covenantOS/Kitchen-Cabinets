// =============================================================================
// Tampa Kitchen Cabinets — central brand/site configuration
// SINGLE SOURCE OF TRUTH for business identity used across every component,
// layout, page, and schema. The editable values live in src/data/site.json
// (managed by Sveltia CMS → "Site Settings"); this module imports them and
// adds typed helpers + opening hours.
//
// >>> PLACEHOLDERS to confirm before launch (see DELIVERABLES.md):
//   - phoneDisplay / phoneE164 : separate TRACKED line (provisioned separately).
//       (813) 555-0199 is in the reserved fictional 555-01xx range so it can
//       never ring a real, wrong number. Replace with the tracked Tampa number.
//   - email                    : confirm the inbox for estimate requests.
//   - address                  : shared HQ with parent LLC; confirm if a
//                                 Tampa-facing address should be surfaced.
//   - rating.count             : set from the NEW Tampa Kitchen Cabinets GBP.
//       AggregateRating schema is only emitted when count > 0 (no fake markup).
//   - projectsCompleted        : confirm the completed-kitchens / projects figure.
//   - social.* / ga4Id / gtmId : add when those profiles/containers exist.
// =============================================================================
import siteData from '../data/site.json';

// Opening hours (mirrors parent availability: 24h Mon–Sat phone, limited Sunday).
const hours = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '00:00', closes: '23:59' },
  { days: ['Sunday'], opens: '13:00', closes: '17:00' },
];

export const site = { ...siteData, hours };

// Convenience derived values ------------------------------------------------
export const telHref = `tel:${site.phoneE164}`;
export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export type Site = typeof site;
export default site;
