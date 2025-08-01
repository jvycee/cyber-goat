# Cyberpunk Design System
## Comprehensive Design Guide for zee-notes Cyberpunk Aesthetic

This document provides a complete design system guide that captures the cyberpunk aesthetic implemented in zee-notes. It serves as a definitive reference for implementing the cyberpunk Ghost theme.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette System](#color-palette-system)
3. [Typography System](#typography-system)
4. [Component Design Patterns](#component-design-patterns)
5. [Animation & Interaction Guidelines](#animation--interaction-guidelines)
6. [Layout & Spacing System](#layout--spacing-system)
7. [Glass Morphism Effects](#glass-morphism-effects)
8. [Neon Glow & Effects](#neon-glow--effects)
9. [Theme Implementation](#theme-implementation)
10. [Accessibility Considerations](#accessibility-considerations)
11. [Implementation Examples](#implementation-examples)
12. [Performance Optimizations](#performance-optimizations)

---

## Design Philosophy

The cyberpunk aesthetic embodies the fusion of high technology with low-life elements, creating interfaces that feel futuristic yet accessible. Our design system follows these core principles:

### Core Principles
- **Form Follows Function**: Every visual element serves a clear purpose
- **High Contrast**: Sharp distinctions between elements for clarity
- **Neon Accents**: Strategic use of bright colors against dark backgrounds
- **Glass Morphism**: Transparent layers with backdrop blur effects
- **Geometric Precision**: Clean lines and sharp edges
- **Micro-Interactions**: Subtle animations that enhance user experience

### Visual Language
- Dark, atmospheric backgrounds with grid patterns
- Neon-colored accents and glows
- Monospace and geometric fonts
- Transparent overlays with blur effects
- Gradient borders and animated elements

---

## Color Palette System

The color system consists of 5 distinct themes, each with a comprehensive palette optimized for dark interfaces.

### Base Color Structure

```css
:root {
  /* Background Layers */
  --bg-primary: #0a0a0f;        /* Main background */
  --bg-secondary: #111118;      /* Secondary surfaces */
  --bg-tertiary: #1a1a24;       /* Card backgrounds */
  --bg-quaternary: #242437;     /* Interactive elements */
  --bg-hover: #2a2a3d;          /* Hover states */
  --bg-active: #3a3a54;         /* Active states */
  --bg-glass: rgba(26, 26, 36, 0.8);  /* Glass morphism */
  --bg-card: rgba(36, 36, 55, 0.95);  /* Card overlays */

  /* Neon Colors */
  --neon-cyan: #00ffff;         /* Primary neon */
  --neon-pink: #ff0080;         /* Secondary neon */
  --neon-green: #00ff41;        /* Success states */
  --neon-purple: #8b5cf6;       /* Accent elements */
  --neon-orange: #ff6b00;       /* Warning states */
  --neon-blue: #0080ff;         /* Information */

  /* Text Hierarchy */
  --text-primary: #e2e8f0;      /* Main text */
  --text-secondary: #94a3b8;    /* Secondary text */
  --text-tertiary: #64748b;     /* Subtle text */
  --text-accent: #ffffff;       /* High emphasis */
  --text-neon: var(--neon-cyan); /* Neon text */
  --text-glow: var(--neon-pink); /* Glowing text */

  /* UI Elements */
  --border: #334155;            /* Standard borders */
  --border-glow: rgba(0, 255, 255, 0.3); /* Glowing borders */
  --accent: var(--neon-cyan);   /* Primary accent */
  --accent-secondary: var(--neon-pink); /* Secondary accent */
  --button-bg: var(--bg-tertiary); /* Button backgrounds */
  --button-hover: var(--bg-quaternary); /* Button hover */
  --error: #ff4757;             /* Error states */
  --success: var(--neon-green); /* Success states */
  --warning: var(--neon-orange); /* Warning states */
}
```

### Theme Variations

#### 1. Cyberpunk (Default)
Classic blue-cyan cyberpunk aesthetic with pink accents.

```css
.theme-cyberpunk {
  --bg-primary: #0a0a0f;
  --neon-cyan: #00ffff;
  --neon-pink: #ff0080;
  --accent: #00ffff;
  --accent-secondary: #ff0080;
}
```

#### 2. Neon
Purple-pink dominant theme with high contrast.

```css
.theme-neon {
  --bg-primary: #0f0515;
  --bg-secondary: #1a0a1f;
  --neon-cyan: #00d9ff;
  --neon-pink: #ff0080;
  --neon-purple: #d946ef;
  --accent: #ff0080;
  --accent-secondary: #d946ef;
  --border-glow: rgba(255, 0, 128, 0.4);
}
```

#### 3. Matrix
Green monochrome inspired by classic hacker aesthetics.

```css
.theme-matrix {
  --bg-primary: #000000;
  --bg-secondary: #001100;
  --neon-cyan: #00ff88;
  --neon-green: #00ff41;
  --text-primary: #00ff41;
  --accent: #00ff41;
  --border-glow: rgba(0, 255, 65, 0.4);
}
```

#### 4. Vaporwave
Purple-pink retro-futuristic theme with warm accents.

```css
.theme-vaporwave {
  --bg-primary: #120458;
  --bg-secondary: #1e0a78;
  --neon-cyan: #00d4ff;
  --neon-pink: #ff006e;
  --neon-purple: #bf00ff;
  --accent: #ff006e;
  --border-glow: rgba(255, 0, 110, 0.4);
}
```

#### 5. Synthwave
Orange-gold theme with blue accents.

```css
.theme-synthwave {
  --bg-primary: #0d1421;
  --bg-secondary: #162030;
  --neon-cyan: #00bfff;
  --neon-orange: #ff9500;
  --text-primary: #ffd700;
  --accent: #ff9500;
  --border-glow: rgba(255, 149, 0, 0.4);
}
```

### Color Usage Guidelines

- **Backgrounds**: Use the layered background system for depth
- **Text**: Follow the hierarchy for readability
- **Accents**: Use neon colors sparingly for maximum impact
- **Borders**: Combine standard borders with glow effects
- **States**: Use consistent colors for interactive feedback

---

## Typography System

The typography system combines monospace and geometric fonts for a technical, futuristic feel.

### Font Stack

```css
:root {
  /* Font Families */
  --font-main: 'JetBrains Mono', 'Courier New', monospace;
  --font-display: 'Orbitron', 'Arial Black', sans-serif;

  /* Font Sizes */
  --font-xs: 0.75rem;    /* 12px */
  --font-sm: 0.875rem;   /* 14px */
  --font-base: 1rem;     /* 16px */
  --font-lg: 1.125rem;   /* 18px */
  --font-xl: 1.25rem;    /* 20px */
  --font-2xl: 1.5rem;    /* 24px */
  --font-3xl: 1.875rem;  /* 30px */
}
```

### Typography Implementation

#### Headers
```css
.header-primary {
  font-family: var(--font-display);
  font-size: var(--font-3xl);
  font-weight: 700;
  color: var(--text-accent);
  text-shadow: 0 0 10px var(--neon-cyan);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.header-secondary {
  font-family: var(--font-display);
  font-size: var(--font-2xl);
  font-weight: 600;
  color: var(--text-accent);
  letter-spacing: 0.02em;
}
```

#### Body Text
```css
.text-body {
  font-family: var(--font-main);
  font-size: var(--font-base);
  line-height: 1.6;
  color: var(--text-primary);
  font-weight: 400;
}

.text-monospace {
  font-family: var(--font-main);
  font-weight: 500;
  letter-spacing: 0.02em;
}
```

#### Special Effects
```css
.text-glow {
  text-shadow: 0 0 10px var(--accent);
  transition: text-shadow 0.3s ease;
}

.text-gradient {
  background: linear-gradient(45deg, var(--neon-cyan), var(--neon-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-terminal {
  font-family: var(--font-main);
  color: var(--neon-green);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

## Component Design Patterns

### Button System

The button system includes multiple variants with consistent interaction patterns.

#### Base Button
```css
.btn {
  background: var(--button-bg);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: 6px;
  cursor: pointer;
  font-size: var(--font-sm);
  font-family: var(--font-main);
  font-weight: 500;
  position: relative;
  overflow: hidden;
  transition: all var(--duration-fast) var(--ease-out);
  outline: none;
  user-select: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent);
  transition: left var(--duration-normal) var(--ease-out);
}

.btn:hover {
  background: var(--button-hover);
  border-color: var(--accent);
  color: var(--text-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 255, 255, 0.2);
}

.btn:hover::before {
  left: 100%;
}
```

#### Button Variants
```css
.btn-primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
  color: var(--bg-primary);
  border-color: var(--accent);
  box-shadow: var(--shadow-glow);
}

.btn-ghost {
  background: transparent;
  border-color: var(--border);
}

.btn-sm {
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-xs);
}
```

### Input System

#### Base Input
```css
.input {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: var(--space-3) var(--space-4);
  border-radius: 8px;
  outline: none;
  font-size: var(--font-sm);
  font-family: var(--font-main);
  transition: all var(--duration-fast) var(--ease-out);
}

.input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.2), var(--shadow-glow);
  background: var(--bg-quaternary);
  color: var(--text-accent);
}

.input::placeholder {
  color: var(--text-tertiary);
  opacity: 0.8;
}
```

### Card System

#### Base Card
```css
.card {
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: var(--space-5);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
  box-shadow: var(--shadow-card);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-elevated);
  border-color: var(--border-glow);
}

.card:hover::before {
  opacity: 0.8;
}
```

---

## Animation & Interaction Guidelines

### Timing Functions
```css
:root {
  --duration-fast: 0.15s;
  --duration-normal: 0.3s;
  --duration-slow: 0.5s;
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Signature Animations

#### Grid Pulse Background
```css
@keyframes grid-pulse {
  0% { opacity: 0.3; }
  100% { opacity: 0.1; }
}

.cyberpunk-grid::before {
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-pulse 4s ease-in-out infinite alternate;
}
```

#### Border Flow Effect
```css
@keyframes border-flow {
  0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
  50% { opacity: 0.8; transform: scaleY(1.2); }
}

.border-flow::before {
  background: linear-gradient(180deg,
    transparent 0%,
    var(--neon-cyan) 20%,
    var(--neon-pink) 50%,
    var(--neon-cyan) 80%,
    transparent 100%);
  animation: border-flow 3s ease-in-out infinite;
}
```

#### Glow Pulse
```css
@keyframes glow-pulse {
  0% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.2); }
  100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); }
}

.glow {
  animation: glow-pulse 2s ease-in-out infinite alternate;
}
```

#### Loading Sweep
```css
@keyframes loading-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.loading::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: loading-sweep 1.5s ease-in-out infinite;
}
```

### Interaction Patterns

#### Hover States
- Subtle upward movement (`translateY(-1px)` to `translateY(-2px)`)
- Color transitions to accent colors
- Glow effects with box-shadow
- Border color changes

#### Active States
- Slight downward movement for buttons
- Increased glow intensity
- Color saturation changes

#### Focus States
- Ring outlines using accent colors
- Increased glow effects
- No aggressive color changes

---

## Layout & Spacing System

### Spacing Scale
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
}
```

### Layout Constants
```css
:root {
  --container-max: 1400px;
  --sidebar-width: 320px;
  --header-height: 64px;
}
```

### Grid System

#### Main Layout
```css
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: var(--sidebar-width);
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
```

#### Responsive Breakpoints
```css
/* Tablet */
@media (max-width: 768px) {
  :root {
    --sidebar-width: 100%;
    --space-4: 0.75rem;
    --space-6: 1rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .header {
    flex-wrap: wrap;
    gap: var(--space-2);
  }
}
```

---

## Glass Morphism Effects

Glass morphism creates depth through transparency and blur effects.

### Base Glass Effect
```css
.glass {
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-glow);
  box-shadow: var(--shadow-card);
}

.glass-subtle {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: var(--bg-card);
  backdrop-filter: blur(30px);
  border: 1px solid var(--border-glow);
  box-shadow: var(--shadow-elevated);
}
```

### Implementation Guidelines
- Use `backdrop-filter: blur()` for the frosted glass effect
- Combine with semi-transparent backgrounds
- Add subtle borders with transparency
- Layer multiple glass elements for depth

---

## Neon Glow & Effects

### Shadow System
```css
:root {
  --shadow-glow: 0 0 20px rgba(0, 255, 255, 0.3);
  --shadow-glow-pink: 0 0 20px rgba(255, 0, 128, 0.3);
  --shadow-glow-green: 0 0 20px rgba(0, 255, 65, 0.3);
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.4);
  --shadow-elevated: 0 12px 48px rgba(0, 0, 0, 0.6);
}
```

### Glow Implementation
```css
.neon-glow {
  box-shadow: var(--shadow-glow);
  transition: box-shadow var(--duration-normal) ease;
}

.neon-glow:hover {
  box-shadow: var(--shadow-glow), 0 6px 20px rgba(0, 255, 255, 0.4);
}

.text-glow {
  text-shadow: 0 0 10px var(--accent);
}

.border-glow {
  border: 1px solid var(--border-glow);
  box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.1);
}
```

### Gradient Effects
```css
.gradient-border {
  position: relative;
  background: var(--bg-card);
  border-radius: 12px;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 12px;
  background: linear-gradient(45deg,
    var(--neon-cyan),
    var(--neon-pink),
    var(--neon-cyan));
  z-index: -1;
}
```

---

## Theme Implementation

### Theme Switching System

#### Theme Configuration
```javascript
const themes = {
  cyberpunk: {
    name: 'Cyberpunk',
    color: '#00ffff',
    vars: {
      '--bg-primary': '#0a0a0f',
      '--accent': '#00ffff',
      // ... other variables
    }
  }
  // ... other themes
};
```

#### Theme Application
```javascript
function setTheme(themeName) {
  const theme = themes[themeName];
  const root = document.documentElement;

  // Add transition class
  document.body.classList.add('theme-transition');

  // Apply CSS variables
  Object.entries(theme.vars).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });

  // Remove transition class after animation
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 300);
}
```

#### Theme Transition Effect
```css
.theme-transition * {
  transition: background-color var(--duration-normal) var(--ease-out),
             border-color var(--duration-normal) var(--ease-out),
             color var(--duration-normal) var(--ease-out),
             box-shadow var(--duration-normal) var(--ease-out) !important;
}
```

### Adding New Themes

1. **Define color palette** following the established variable structure
2. **Test contrast ratios** for accessibility compliance
3. **Verify glow effects** work with the new color scheme
4. **Add theme selector button** with the primary color
5. **Test all components** in the new theme

---

## Accessibility Considerations

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements have sufficient contrast
- Glow effects don't rely solely on color for meaning

### Focus Management
```css
.focus-ring:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.focus-visible {
  box-shadow: 0 0 0 2px var(--accent);
}
```

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for interactive elements
- Skip links for navigation
- Descriptive alt text for images

---

## Implementation Examples

### Complete Button Implementation
```css
.cyberpunk-button {
  /* Base styles */
  background: var(--button-bg);
  border: 1px solid var(--border);
  color: var(--text-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: 6px;
  cursor: pointer;
  font-size: var(--font-sm);
  font-family: var(--font-main);
  font-weight: 500;
  position: relative;
  overflow: hidden;
  transition: all var(--duration-fast) var(--ease-out);
  outline: none;
  user-select: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Shimmer effect */
.cyberpunk-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent);
  transition: left var(--duration-normal) var(--ease-out);
}

/* Hover state */
.cyberpunk-button:hover {
  background: var(--button-hover);
  border-color: var(--accent);
  color: var(--text-accent);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 255, 255, 0.2);
}

.cyberpunk-button:hover::before {
  left: 100%;
}

/* Focus state */
.cyberpunk-button:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Active state */
.cyberpunk-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 255, 255, 0.3);
}
```

### Complete Card Implementation
```css
.cyberpunk-card {
  /* Base structure */
  background: var(--bg-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: var(--space-5);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
  box-shadow: var(--shadow-card);
}

/* Top glow line */
.cyberpunk-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

/* Hover effects */
.cyberpunk-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-elevated);
  border-color: var(--border-glow);
}

.cyberpunk-card:hover::before {
  opacity: 0.8;
}

/* Active state */
.cyberpunk-card.active {
  border-color: var(--accent);
  box-shadow: var(--shadow-glow), var(--shadow-elevated);
  transform: translateY(-4px);
}

.cyberpunk-card.active::before {
  opacity: 1;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
}
```

### Theme Selector Implementation
```css
.theme-selector {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-2);
  background: var(--bg-card);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
}

.theme-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--border);
  cursor: pointer;
  position: relative;
  transition: all var(--duration-fast) var(--ease-out);
  overflow: hidden;
}

/* Animated border */
.theme-btn::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent,
    var(--neon-cyan),
    transparent,
    var(--neon-pink),
    transparent
  );
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.theme-btn:hover {
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
}

.theme-btn:hover::before {
  opacity: 0.7;
  animation: spin 2s linear infinite;
}

.theme-btn.active {
  border-color: var(--accent);
  transform: scale(1.3);
  box-shadow: var(--shadow-glow);
}

.theme-btn.active::before {
  opacity: 1;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Performance Optimizations

### CSS Optimizations
```css
/* Use will-change for animated elements */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

/* Optimize backdrop-filter usage */
.glass-optimized {
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  /* Add this for better performance */
  -webkit-backdrop-filter: blur(20px);
}

/* Use transform3d for hardware acceleration */
.hardware-accelerated {
  transform: translate3d(0, 0, 0);
}
```

### JavaScript Optimizations
```javascript
// Cache DOM elements
const elements = {
  sidebar: document.querySelector('.sidebar'),
  notesList: document.getElementById('notesList'),
  // ... other elements
};

// Use requestAnimationFrame for smooth animations
function smoothUpdate(callback) {
  requestAnimationFrame(callback);
}

// Debounce expensive operations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### Font Loading Optimization
```html
<!-- Preload critical fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;900&display=swap" rel="stylesheet">
```

---

## Usage Guidelines

### Do's
- Use the defined color palette consistently
- Implement glass morphism for layered interfaces
- Add subtle animations to enhance user experience
- Follow the spacing system for consistent layouts
- Use neon accents sparingly for maximum impact
- Test all themes for accessibility compliance

### Don'ts
- Don't overuse glow effects - they lose impact
- Don't ignore contrast ratios for text readability
- Don't animate everything - be selective
- Don't break the established visual hierarchy
- Don't use colors outside the defined palette
- Don't forget to test on different screen sizes

### Best Practices
1. **Start with the base theme** and customize from there
2. **Use CSS custom properties** for easy theming
3. **Test all interactive states** (hover, focus, active)
4. **Optimize for performance** with will-change properties
5. **Consider accessibility** from the beginning
6. **Document any customizations** for future reference

---

## Conclusion

This design system provides a complete foundation for implementing the cyberpunk aesthetic in any web application. By following these guidelines and using the provided code examples, you can create interfaces that are both visually striking and functionally robust.

The system is designed to be:
- **Scalable**: Easy to extend with new components
- **Maintainable**: Built with CSS custom properties
- **Accessible**: Meeting modern accessibility standards
- **Performant**: Optimized for smooth animations
- **Consistent**: Following established patterns

Remember that great design is not just about aesthetics - it's about creating experiences that are beautiful, functional, and accessible to all users.