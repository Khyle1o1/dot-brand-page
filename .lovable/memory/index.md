# Memory: index.md
Updated: now

Landing page for dot franchise ordering — warm beige, royal blue, orange accent café brand.

## Design System
- Font heading: Halis Grotesque
- Font body: Halis Grotesque
- Background: warm beige (#EAE7DC → HSL 37 26% 89%)
- Card: off-white (#F5F5F3 → HSL 40 11% 96%)
- Primary blue: #1565E9 → HSL 218 88% 50%
- Secondary blue: #78A6E8 → HSL 216 62% 69%
- Accent orange: #F15A24 → HSL 14 89% 54%
- Foreground: #111111
- Muted foreground: #333333

## Architecture
- Public landing page at /
- Login modal (mock auth): admin@dot.com/admin123, franchise@dot.com/franchise123
- Protected franchise portal: /order-menu, /cart, /orders, /orders/:id
- Protected admin: /admin (placeholder)
- Auth via AuthContext (localStorage mock, ready for real backend)
- Cart via CartContext (localStorage persistence)
- Catalog data in src/data/catalog.ts (~200 items with codes, categories, mock prices)
- Landing data in src/data/landing.ts
- Components: src/components/landing/ (public), src/components/portal/ (franchise)
