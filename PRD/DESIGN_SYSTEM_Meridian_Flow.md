# Follow-the-Sun Orchestrator
## Premium Design System v1.0

---

## Design Philosophy: "Meridian Flow"

Blending the **sculptural elegance** of minimalist white space with **warm dark mode sophistication**—inspired by the continuous flow of work around the globe, like sunlight moving across meridians.

---

## Color Palette

### Core Identity: "Obsidian & Warmth"

The palette combines deep obsidian darks with warm amber/gold accents and subtle teal undertones—professional yet inviting.

```css
:root {
  /* ═══════════════════════════════════════════════════════════════════
     BACKGROUND LAYERS
     Deep obsidian base with subtle warm undertones
     ═══════════════════════════════════════════════════════════════════ */
  
  --bg-base: #0C0C0E;              /* Deepest black - page background */
  --bg-elevated: #141416;          /* Card backgrounds */
  --bg-surface: #1A1A1D;           /* Raised surfaces */
  --bg-overlay: #222225;           /* Modals, dropdowns */
  --bg-hover: #2A2A2E;             /* Interactive hover states */
  
  /* Glass effects */
  --glass-background: rgba(20, 20, 22, 0.7);
  --glass-border: rgba(255, 255, 255, 0.06);
  --glass-border-hover: rgba(255, 255, 255, 0.12);
  
  
  /* ═══════════════════════════════════════════════════════════════════
     GRADIENT CARDS (SIGNATURE ELEMENT)
     Inspired by Harbor AI's rich gradient cards
     ═══════════════════════════════════════════════════════════════════ */
  
  /* Primary Card Gradient - Deep Teal */
  --gradient-card-teal: linear-gradient(
    145deg,
    rgba(20, 45, 45, 0.9) 0%,
    rgba(12, 12, 14, 0.95) 100%
  );
  
  /* Secondary Card Gradient - Warm Amber */
  --gradient-card-amber: linear-gradient(
    145deg,
    rgba(45, 35, 20, 0.9) 0%,
    rgba(12, 12, 14, 0.95) 100%
  );
  
  /* AI Feature Card Gradient - Purple Glow */
  --gradient-card-ai: linear-gradient(
    145deg,
    rgba(35, 25, 50, 0.9) 0%,
    rgba(12, 12, 14, 0.95) 100%
  );
  
  /* Neutral Card Gradient */
  --gradient-card-neutral: linear-gradient(
    145deg,
    rgba(30, 30, 35, 0.8) 0%,
    rgba(18, 18, 20, 0.95) 100%
  );
  
  
  /* ═══════════════════════════════════════════════════════════════════
     TEXT HIERARCHY
     High contrast for readability
     ═══════════════════════════════════════════════════════════════════ */
  
  --text-primary: #FFFFFF;          /* Headlines, key content */
  --text-secondary: #B8B8BC;        /* Body text */
  --text-tertiary: #78787C;         /* Captions, labels */
  --text-muted: #4A4A4E;            /* Disabled, placeholders */
  --text-inverse: #0C0C0E;          /* Text on light backgrounds */
  
  
  /* ═══════════════════════════════════════════════════════════════════
     ACCENT COLORS
     Warm amber as primary, teal as secondary
     ═══════════════════════════════════════════════════════════════════ */
  
  /* Primary Accent - Warm Amber/Gold */
  --accent-primary: #D4A853;         /* Buttons, links, key actions */
  --accent-primary-hover: #E5BC6A;   /* Hover state */
  --accent-primary-muted: #8B7335;   /* Subtle accents */
  --accent-primary-glow: rgba(212, 168, 83, 0.25);
  
  /* Secondary Accent - Deep Teal */
  --accent-secondary: #3D9B9B;       /* Secondary actions, charts */
  --accent-secondary-hover: #4EAEAE;
  --accent-secondary-muted: #2A6B6B;
  --accent-secondary-glow: rgba(61, 155, 155, 0.2);
  
  
  /* ═══════════════════════════════════════════════════════════════════
     AI INDICATOR COLORS
     Purple spectrum for AI-generated content
     ═══════════════════════════════════════════════════════════════════ */
  
  --ai-primary: #A78BFA;             /* AI badges, sparkle icons */
  --ai-secondary: #7C3AED;           /* AI borders */
  --ai-glow: rgba(167, 139, 250, 0.15);
  --ai-gradient: linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%);
  
  
  /* ═══════════════════════════════════════════════════════════════════
     SEMANTIC COLORS
     Status indicators
     ═══════════════════════════════════════════════════════════════════ */
  
  --success: #34D399;                /* Completed, positive */
  --success-muted: rgba(52, 211, 153, 0.15);
  
  --warning: #FBBF24;                /* At risk, attention */
  --warning-muted: rgba(251, 191, 36, 0.15);
  
  --error: #F87171;                  /* Blocked, critical */
  --error-muted: rgba(248, 113, 113, 0.15);
  
  --info: #60A5FA;                   /* Information, neutral */
  --info-muted: rgba(96, 165, 250, 0.15);
  
  
  /* ═══════════════════════════════════════════════════════════════════
     REGION COLORS
     Unique color per timezone region for visual differentiation
     NOTE: Avoids status colors (red/amber/green) AND typical AI colors (purple/blue)
     ═══════════════════════════════════════════════════════════════════ */
  
  --region-sydney: #F472B6;          /* Rose Pink - Australia/Pacific */
  --region-singapore: #14B8A6;       /* Warm Teal - Singapore/SE Asia */
  --region-bangalore: #FB923C;       /* Coral Orange - India */
  --region-london: #94A3B8;          /* Slate Gray - UK/Europe */
  --region-newyork: #FDBA74;         /* Warm Peach - US/Americas */
  
  
  /* ═══════════════════════════════════════════════════════════════════
     BORDERS & SHADOWS
     ═══════════════════════════════════════════════════════════════════ */
  
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.15);
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6);
  
  /* Glow shadows for interactive elements */
  --shadow-glow-amber: 0 0 20px rgba(212, 168, 83, 0.3);
  --shadow-glow-teal: 0 0 20px rgba(61, 155, 155, 0.3);
  --shadow-glow-ai: 0 0 20px rgba(167, 139, 250, 0.3);
}
```

---

## Typography System

Combining bold display fonts with clean readability.

```css
/* Font Imports */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}

/* Type Scale - Inspired by Kontlodon's bold typography */
.text-display {
  font-size: 64px;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.text-hero {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.text-h1 {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.text-h2 {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.text-h3 {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
}

.text-h4 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
}

.text-body-lg {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.text-body {
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
}

.text-sm {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-tertiary);
}

.text-xs {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.02em;
  color: var(--text-tertiary);
}

.text-mono {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 400;
}
```

---

## Component Styles

### 1. Gradient Cards (Signature Element)

Inspired by Harbor AI's beautiful gradient-filled cards.

```jsx
/* Primary Feature Card - Teal Gradient */
<div className="
  relative overflow-hidden
  rounded-2xl
  bg-gradient-to-br from-[rgba(20,45,45,0.9)] to-[rgba(12,12,14,0.95)]
  border border-white/[0.06]
  p-6
  
  hover:border-white/[0.12]
  transition-all duration-300
  
  shadow-lg shadow-black/30
">
  {/* Subtle inner glow at top */}
  <div className="
    absolute inset-x-0 top-0 h-px
    bg-gradient-to-r from-transparent via-white/20 to-transparent
  " />
  
  {/* Content */}
  <div className="relative z-10">
    <h3 className="text-xl font-semibold text-white mb-2">
      Seamless Integrations
    </h3>
    <p className="text-[#B8B8BC]">
      Connect JIRA, Slack, Azure DevOps and more
    </p>
  </div>
</div>

/* AI Feature Card - Purple Gradient */
<div className="
  relative overflow-hidden
  rounded-2xl
  bg-gradient-to-br from-[rgba(35,25,50,0.9)] to-[rgba(12,12,14,0.95)]
  border border-purple-500/20
  p-6
  
  hover:border-purple-500/40
  transition-all duration-300
">
  {/* AI sparkle indicator */}
  <div className="flex items-center gap-2 mb-4">
    <SparklesIcon className="w-4 h-4 text-purple-400" />
    <span className="text-xs font-medium text-purple-300">AI-Powered</span>
  </div>
  
  {/* Content */}
  ...
</div>
```

### 2. Primary Button

Warm amber with subtle glow.

```jsx
<button className="
  px-6 py-3
  bg-[#D4A853]
  text-[#0C0C0E] font-semibold
  rounded-xl
  
  shadow-lg shadow-[rgba(212,168,83,0.25)]
  
  hover:bg-[#E5BC6A]
  hover:shadow-[0_0_24px_rgba(212,168,83,0.35)]
  
  active:scale-[0.98]
  
  transition-all duration-200
">
  Create Handover
</button>
```

### 3. Secondary Button

Outlined with teal accent.

```jsx
<button className="
  px-6 py-3
  bg-transparent
  text-[#3D9B9B] font-medium
  rounded-xl
  border border-[#3D9B9B]/50
  
  hover:bg-[#3D9B9B]/10
  hover:border-[#3D9B9B]
  
  active:scale-[0.98]
  
  transition-all duration-200
">
  View History
</button>
```

### 4. Glass Card

For elevated content areas.

```jsx
<div className="
  backdrop-blur-xl
  bg-[rgba(20,20,22,0.7)]
  border border-white/[0.06]
  rounded-2xl
  p-6
  
  hover:bg-[rgba(26,26,29,0.8)]
  hover:border-white/[0.1]
  
  transition-all duration-300
">
  ...
</div>
```

### 5. Region Status Card

With unique color per region.

```jsx
{/* India/Bangalore Card */}
<div className="
  relative overflow-hidden
  rounded-xl
  bg-gradient-to-br from-[rgba(251,191,36,0.08)] to-transparent
  border border-[#FBBF24]/20
  p-5
">
  <div className="flex items-center gap-3 mb-3">
    <span className="text-2xl">🇮🇳</span>
    <div>
      <p className="text-sm font-medium text-white">India</p>
      <p className="text-xs text-[#78787C]">Bangalore</p>
    </div>
  </div>
  
  <p className="text-3xl font-bold text-white mb-1">14:32 IST</p>
  
  <div className="flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
    <span className="text-sm text-[#34D399]">Active</span>
  </div>
</div>
```

### 6. AI Summary Container

Purple-tinted with left border.

```jsx
<div className="
  relative
  bg-gradient-to-r from-purple-500/10 to-transparent
  border-l-3 border-purple-500
  rounded-r-xl
  p-5
">
  <div className="flex items-center gap-2 mb-3">
    <SparklesIcon className="w-4 h-4 text-purple-400" />
    <span className="text-xs font-medium text-purple-300">AI Summary</span>
    <span className="text-xs text-purple-400/60 ml-auto">94% confidence</span>
  </div>
  
  <div className="prose prose-sm prose-invert">
    {/* Markdown-rendered AI summary */}
  </div>
</div>
```

### 7. Data Table Row

With hover state.

```jsx
<tr className="
  border-b border-white/[0.06]
  
  hover:bg-white/[0.02]
  
  transition-colors duration-150
">
  <td className="py-4 px-4">
    <span className="font-mono text-sm text-[#D4A853]">HO-2026-0001</span>
  </td>
  <td className="py-4 px-4">
    <span className="text-white">London → New York</span>
  </td>
  <td className="py-4 px-4">
    <span className="
      inline-flex px-2 py-1 
      rounded-full 
      text-xs font-medium
      bg-[#34D399]/15 text-[#34D399]
    ">
      Completed
    </span>
  </td>
</tr>
```

---

## Visual Effects

### 1. Flowing Wave Background (Hero Section)

Inspired by Kontlodon's sculptural 3D waves—implemented as animated SVG or CSS.

```css
.wave-background {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(
    to top,
    rgba(20, 45, 45, 0.3) 0%,
    transparent 100%
  );
  mask-image: url('/wave-pattern.svg');
  mask-size: cover;
  animation: wave-flow 20s ease-in-out infinite;
}

@keyframes wave-flow {
  0%, 100% { transform: translateX(0) scaleY(1); }
  50% { transform: translateX(-2%) scaleY(1.05); }
}
```

### 2. Subtle Grid Pattern

For dashboard backgrounds.

```css
.grid-pattern {
  background-image: 
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### 3. Glow Effect on Hover

```css
.glow-on-hover {
  transition: box-shadow 0.3s ease;
}

.glow-on-hover:hover {
  box-shadow: 
    0 0 20px rgba(212, 168, 83, 0.2),
    0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

## Color Usage Guidelines

### DO ✓

- Use **warm amber** for primary CTAs and key actions
- Use **teal** for secondary elements and data visualization
- Use **purple** exclusively for AI-related content
- Apply gradient cards for feature sections
- Maintain high contrast (white text on dark backgrounds)

### DON'T ✗

- Don't use raw white (#FFFFFF) for backgrounds
- Don't use pure black (#000000)—use soft obsidian
- Don't mix amber and teal in the same component
- Don't overuse gradients—keep them for key cards only
- Don't use region colors for non-region content

---

## Accessibility Notes

- **Contrast ratios**: All text meets WCAG AA (4.5:1+)
- **Color independence**: Status never conveyed by color alone
- **Focus states**: Visible focus rings in amber
- **Motion**: Respects `prefers-reduced-motion`

---

## Quick Reference Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#0C0C0E` | Page background |
| `--bg-elevated` | `#141416` | Card backgrounds |
| `--accent-primary` | `#D4A853` | Primary buttons, links |
| `--accent-secondary` | `#3D9B9B` | Secondary elements |
| `--ai-primary` | `#A78BFA` | AI indicators |
| `--success` | `#34D399` | Positive status |
| `--warning` | `#FBBF24` | Warning status |
| `--error` | `#F87171` | Error status |
| `--text-primary` | `#FFFFFF` | Headlines |
| `--text-secondary` | `#B8B8BC` | Body text |

---

*This design system blends minimalist sophistication with warm, inviting dark mode aesthetics—perfect for a premium global consulting platform.*
