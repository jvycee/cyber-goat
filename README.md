# Cyberpunk Ghost Theme

A premium futuristic cyberpunk Ghost theme with 5 distinct color modes, advanced neon effects, and glass morphism. Perfect for tech blogs, gaming sites, and futuristic brands.

[![Ghost Version](https://img.shields.io/badge/Ghost-5.0+-blue.svg)](https://ghost.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Price](https://img.shields.io/badge/Price-$99-orange.svg)](#)

## 🌟 Features

### 🎨 **5 Unique Color Themes**
- **Cyberpunk** - Classic blue-cyan aesthetic with pink accents
- **Neon** - Purple-pink dominant theme with high contrast
- **Matrix** - Green monochrome inspired by hacker aesthetics
- **Vaporwave** - Purple-pink retro-futuristic theme
- **Synthwave** - Orange-gold theme with blue accents

### ✨ **Advanced Visual Effects**
- Glass morphism with backdrop blur effects
- Neon glow animations and interactions
- Particle system with theme-responsive colors
- Dynamic mouse tracking effects
- Smooth theme transitions
- Reading progress indicators
- Cyberpunk grid background patterns

### 📱 **Modern Features**
- Fully responsive design (mobile, tablet, desktop)
- Member authentication integration
- Newsletter subscription forms
- Advanced search functionality
- Table of contents for long posts
- Social sharing integration
- SEO optimized with structured data
- Accessibility compliant (WCAG 2.1 AA)

### 🎯 **Ghost Integration**
- Ghost 5.0+ compatible
- Member portal support
- Newsletter integration
- Comments system ready
- Multiple tiers support
- Custom settings panel
- Built-in analytics support

## 🚀 Installation

### Method 1: Upload Theme (Recommended)
1. Download the theme zip file
2. Go to your Ghost Admin → Design → Change theme
3. Upload the zip file
4. Activate the theme

### Method 2: Manual Installation
1. Clone or download this repository
2. Copy the theme folder to your Ghost installation's `content/themes/` directory
3. Restart Ghost
4. Go to Ghost Admin → Design → Change theme → Activate

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn
- Ghost 5.0+

### Setup
```bash
# Clone the repository
git clone https://github.com/jayceelewis/cyberpunk-ghost-theme.git
cd cyberpunk-ghost-theme

# Install dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run build
```

### Build Commands
```bash
npm run dev          # Start development with file watching
npm run build        # Build production assets
npm run css:build    # Build CSS only
npm run js:build     # Build JavaScript only
npm run zip          # Create distribution zip
npm run validate     # Validate theme
```

## ⚙️ Configuration

The theme includes extensive customization options available in Ghost Admin:

### Theme Settings
- **Theme Switcher**: Enable/disable the color mode switcher
- **Default Theme**: Set the default color scheme
- **Animation Effects**: Control neon effects and animations
- **Neon Intensity**: Adjust glow effect intensity

### Post Settings
- **Reading Time**: Show/hide estimated reading time
- **Author Info**: Display author information on posts
- **Code Syntax**: Enable syntax highlighting
- **Social Sharing**: Add social sharing buttons

### Layout Options
- **Header Style**: Choose between minimal, standard, or extended header
- **Footer Style**: Select minimal or standard footer layout

## 🎨 Customization

### CSS Variables
The theme uses CSS custom properties for easy customization:

```css
:root {
  /* Background Colors */
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --bg-tertiary: #1a1a24;
  
  /* Neon Colors */
  --neon-cyan: #00ffff;
  --neon-pink: #ff0080;
  --neon-green: #00ff41;
  
  /* Text Colors */
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-accent: #ffffff;
}
```

### Adding Custom Themes
You can add additional color themes by extending the theme switcher configuration:

```javascript
// In theme-switcher.js
const customTheme = {
  name: 'Custom',
  color: '#your-color',
  vars: {
    '--bg-primary': '#your-bg-color',
    '--accent': '#your-accent-color',
    // ... other variables
  }
};
```

## 📁 File Structure

```
cyberpunk-ghost-theme/
├── assets/
│   ├── css/
│   │   ├── screen.css           # Main stylesheet
│   │   ├── color-schemes.css    # Theme color definitions
│   │   ├── components.css       # UI components
│   │   └── cyberpunk-effects.css # Special effects
│   ├── js/
│   │   ├── main.js             # Main JavaScript entry
│   │   ├── theme-switcher.js   # Theme switching logic
│   │   └── neon-effects.js     # Visual effects
│   ├── fonts/                  # Custom fonts
│   └── images/                 # Theme images
├── partials/
│   ├── header.hbs              # Site header
│   ├── footer.hbs              # Site footer
│   ├── navigation.hbs          # Navigation menu
│   ├── post-card.hbs           # Post preview cards
│   └── theme-switcher.hbs      # Theme switcher UI
├── default.hbs                 # Base template
├── index.hbs                   # Homepage template
├── post.hbs                    # Individual post template
├── page.hbs                    # Static page template
├── author.hbs                  # Author archive template
├── tag.hbs                     # Tag archive template
├── error.hbs                   # Error page template
└── package.json                # Theme configuration
```

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Troubleshooting

### Theme Not Loading Properly
1. Ensure Ghost 5.0+ is installed
2. Check that all theme files are present
3. Verify CSS and JS files are built correctly
4. Check Ghost logs for any errors

### JavaScript Features Not Working
1. Ensure JavaScript is enabled in the browser
2. Check browser console for errors
3. Verify all JS files are loading correctly
4. Try rebuilding assets with `npm run build`

### Color Themes Not Switching
1. Check browser localStorage permissions
2. Verify theme-switcher.js is loaded
3. Clear browser cache and reload
4. Check for JavaScript console errors

## 📞 Support

For support and questions:
- **Documentation**: [Theme Wiki](https://github.com/jayceelewis/cyberpunk-ghost-theme/wiki)
- **Issues**: [GitHub Issues](https://github.com/jayceelewis/cyberpunk-ghost-theme/issues)
- **Email**: hello@cybercatlabs.com

## 📄 License

This theme is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Typography**: [JetBrains Mono](https://www.jetbrains.com/mono/) & [Orbitron](https://fonts.google.com/specimen/Orbitron)
- **Icons**: Custom cyberpunk-themed emoji and symbols
- **Inspiration**: Cyberpunk 2077, Ghost in the Shell, Matrix aesthetic

## 🗺️ Roadmap

### v1.1 (Planned)
- [ ] Additional theme variants
- [ ] Enhanced mobile experience
- [ ] Advanced search filters
- [ ] Comment system integration

### v1.2 (Future)
- [ ] Interactive background effects
- [ ] Custom post types support
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

**Made with ⚡ by [Jaycee Lewis](https://github.com/jayceelewis)**

*Transform your Ghost blog into a cyberpunk digital experience.*