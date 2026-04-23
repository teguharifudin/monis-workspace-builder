# monis.rent Workspace Builder

An interactive workspace configurator for [monis.rent](https://monis.rent) — build your dream Bali office setup visually, then rent it.

**Live URL:** [https://monis-workspace-builder-sepia.vercel.app/](https://monis-workspace-builder-sepia.vercel.app/)

## Approach

I focused on making the experience feel fast and tactile. The builder is split into three guided steps (Desk → Chair → Accessories) with a live preview panel that updates in real-time using Framer Motion animations. Product images are pulled directly from monis.rent's Strapi CDN so everything looks authentic.

The layout is intentionally split: selector on the left, visual preview on the right — so users always see the impact of their choices immediately. The checkout modal handles duration selection and collects delivery info before confirming.

## Tech Choices

- **Next.js 15 (App Router)** — required, also gives great image optimization
- **Tailwind CSS** — required, fast to build clean UI
- **Framer Motion** — smooth enter/exit animations for items appearing in the preview
- **Vercel** — zero-config deploy, required

## What I'd Improve With More Time

- **Drag-and-drop** positioning of items in the preview canvas (using `@dnd-kit`)
- **Isometric/3D room view** instead of flat layered images — would make the preview much more immersive
- **Real pricing API** from monis.rent Strapi instead of hardcoded data
- **Saved configurations** via URL params so users can share their setup
- **Mobile swipe gestures** for switching between steps
