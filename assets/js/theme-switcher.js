/**
 * Cyberpunk Ghost Theme - Theme Switcher
 * Handles color mode switching between 5 cyberpunk themes
 */

class ThemeSwitcher {
  constructor() {
    this.THEME_KEY = 'cyberpunk-theme';
    this.DEFAULT_THEME = 'cyberpunk';
    this.currentTheme = localStorage.getItem(this.THEME_KEY) || this.DEFAULT_THEME;
    
    this.themes = {
      cyberpunk: {
        name: 'Cyberpunk',
        color: '#00ffff',
        vars: {
          '--bg-primary': '#0a0a0f',
          '--bg-secondary': '#111118',
          '--bg-tertiary': '#1a1a24',
          '--bg-quaternary': '#242437',
          '--bg-hover': '#2a2a3d',
          '--bg-active': '#3a3a54',
          '--bg-glass': 'rgba(26, 26, 36, 0.8)',
          '--bg-card': 'rgba(36, 36, 55, 0.95)',
          '--neon-cyan': '#00ffff',
          '--neon-pink': '#ff0080',
          '--neon-green': '#00ff41',
          '--neon-purple': '#8b5cf6',
          '--neon-orange': '#ff6b00',
          '--neon-blue': '#0080ff',
          '--text-primary': '#e2e8f0',
          '--text-secondary': '#94a3b8',
          '--text-tertiary': '#64748b',
          '--text-accent': '#ffffff',
          '--text-neon': '#00ffff',
          '--text-glow': '#ff0080',
          '--border': '#334155',
          '--border-glow': 'rgba(0, 255, 255, 0.3)',
          '--accent': '#00ffff',
          '--accent-secondary': '#ff0080',
          '--button-bg': '#1a1a24',
          '--button-hover': '#242437',
          '--shadow-glow': '0 0 20px rgba(0, 255, 255, 0.3)',
          '--shadow-glow-pink': '0 0 20px rgba(255, 0, 128, 0.3)',
          '--shadow-glow-green': '0 0 20px rgba(0, 255, 65, 0.3)'
        }
      },
      neon: {
        name: 'Neon',
        color: '#ff0080',
        vars: {
          '--bg-primary': '#0f0515',
          '--bg-secondary': '#1a0a1f',
          '--bg-tertiary': '#251230',
          '--bg-quaternary': '#301a40',
          '--bg-hover': '#3b2250',
          '--bg-active': '#462a60',
          '--bg-glass': 'rgba(37, 18, 48, 0.8)',
          '--bg-card': 'rgba(48, 26, 64, 0.95)',
          '--neon-cyan': '#00d9ff',
          '--neon-pink': '#ff0080',
          '--neon-green': '#00ff65',
          '--neon-purple': '#d946ef',
          '--neon-orange': '#ff6b00',
          '--neon-blue': '#4c1d95',
          '--text-primary': '#f1e6ff',
          '--text-secondary': '#c084fc',
          '--text-tertiary': '#a855f7',
          '--text-accent': '#ffffff',
          '--text-neon': '#ff0080',
          '--text-glow': '#d946ef',
          '--border': '#6b21a8',
          '--border-glow': 'rgba(255, 0, 128, 0.4)',
          '--accent': '#ff0080',
          '--accent-secondary': '#d946ef',
          '--button-bg': '#251230',
          '--button-hover': '#301a40',
          '--shadow-glow': '0 0 20px rgba(255, 0, 128, 0.4)',
          '--shadow-glow-pink': '0 0 20px rgba(217, 70, 239, 0.4)',
          '--shadow-glow-green': '0 0 20px rgba(0, 255, 101, 0.4)'
        }
      },
      matrix: {
        name: 'Matrix',
        color: '#00ff41',
        vars: {
          '--bg-primary': '#000000',
          '--bg-secondary': '#001100',
          '--bg-tertiary': '#002200',
          '--bg-quaternary': '#003300',
          '--bg-hover': '#004400',
          '--bg-active': '#005500',
          '--bg-glass': 'rgba(0, 34, 0, 0.8)',
          '--bg-card': 'rgba(0, 51, 0, 0.95)',
          '--neon-cyan': '#00ff88',
          '--neon-pink': '#00ff41',
          '--neon-green': '#00ff41',
          '--neon-purple': '#39ff14',
          '--neon-orange': '#7fff00',
          '--neon-blue': '#00ff7f',
          '--text-primary': '#00ff41',
          '--text-secondary': '#00cc33',
          '--text-tertiary': '#009925',
          '--text-accent': '#00ff88',
          '--text-neon': '#00ff41',
          '--text-glow': '#00ff88',
          '--border': '#006600',
          '--border-glow': 'rgba(0, 255, 65, 0.4)',
          '--accent': '#00ff41',
          '--accent-secondary': '#00ff88',
          '--button-bg': '#002200',
          '--button-hover': '#003300',
          '--shadow-glow': '0 0 20px rgba(0, 255, 65, 0.4)',
          '--shadow-glow-pink': '0 0 20px rgba(0, 255, 136, 0.4)',
          '--shadow-glow-green': '0 0 20px rgba(57, 255, 20, 0.4)'
        }
      },
      vaporwave: {
        name: 'Vaporwave',
        color: '#ff006e',
        vars: {
          '--bg-primary': '#120458',
          '--bg-secondary': '#1e0a78',
          '--bg-tertiary': '#2a1098',
          '--bg-quaternary': '#3616b8',
          '--bg-hover': '#421cd8',
          '--bg-active': '#4e22f8',
          '--bg-glass': 'rgba(42, 16, 152, 0.8)',
          '--bg-card': 'rgba(54, 22, 184, 0.95)',
          '--neon-cyan': '#00d4ff',
          '--neon-pink': '#ff006e',
          '--neon-green': '#00ff9f',
          '--neon-purple': '#bf00ff',
          '--neon-orange': '#ff1744',
          '--neon-blue': '#2979ff',
          '--text-primary': '#ffeaa7',
          '--text-secondary': '#fab1a0',
          '--text-tertiary': '#e17055',
          '--text-accent': '#fdcb6e',
          '--text-neon': '#ff006e',
          '--text-glow': '#bf00ff',
          '--border': '#6c5ce7',
          '--border-glow': 'rgba(255, 0, 110, 0.4)',
          '--accent': '#ff006e',
          '--accent-secondary': '#bf00ff',
          '--button-bg': '#2a1098',
          '--button-hover': '#3616b8',
          '--shadow-glow': '0 0 20px rgba(255, 0, 110, 0.4)',
          '--shadow-glow-pink': '0 0 20px rgba(191, 0, 255, 0.4)',
          '--shadow-glow-green': '0 0 20px rgba(0, 255, 159, 0.4)'
        }
      },
      synthwave: {
        name: 'Synthwave',
        color: '#ff9500',
        vars: {
          '--bg-primary': '#0d1421',
          '--bg-secondary': '#162030',
          '--bg-tertiary': '#1f2c3f',
          '--bg-quaternary': '#28384e',
          '--bg-hover': '#31445d',
          '--bg-active': '#3a506c',
          '--bg-glass': 'rgba(31, 44, 63, 0.8)',
          '--bg-card': 'rgba(40, 56, 78, 0.95)',
          '--neon-cyan': '#00bfff',
          '--neon-pink': '#ff1493',
          '--neon-green': '#00ff7f',
          '--neon-purple': '#9370db',
          '--neon-orange': '#ff9500',
          '--neon-blue': '#00bfff',
          '--text-primary': '#ffd700',
          '--text-secondary': '#ffa500',
          '--text-tertiary': '#ff8c00',
          '--text-accent': '#ffff00',
          '--text-neon': '#ff9500',
          '--text-glow': '#00bfff',
          '--border': '#4682b4',
          '--border-glow': 'rgba(255, 149, 0, 0.4)',
          '--accent': '#ff9500',
          '--accent-secondary': '#00bfff',
          '--button-bg': '#1f2c3f',
          '--button-hover': '#28384e',
          '--shadow-glow': '0 0 20px rgba(255, 149, 0, 0.4)',
          '--shadow-glow-pink': '0 0 20px rgba(0, 191, 255, 0.4)',
          '--shadow-glow-green': '0 0 20px rgba(0, 255, 127, 0.4)'
        }
      }
    };

    this.init();
  }

  /**
   * Initialize theme switcher
   */
  init() {
    this.bindEvents();
    this.updateUI();
    
    // Listen for theme ready event
    document.addEventListener('cyberpunk:ready', () => {
      this.onReady();
    });
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleThemeSwitcher();
      });
    }

    // Theme buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-theme]')) {
        const themeName = e.target.closest('[data-theme]').dataset.theme;
        this.setTheme(themeName);
      }
    });

    // Close theme switcher when clicking outside
    document.addEventListener('click', (e) => {
      const themeSwitcher = document.getElementById('themeSwitcher');
      const themeToggle = document.getElementById('themeToggle');
      
      if (themeSwitcher && !themeSwitcher.contains(e.target) && !themeToggle?.contains(e.target)) {
        this.closeThemeSwitcher();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // T key toggles theme switcher
      if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeElement = document.activeElement;
        // Don't trigger if user is typing in an input
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          return;
        }
        this.toggleThemeSwitcher();
      }
      
      // ESC closes theme switcher
      if (e.key === 'Escape') {
        this.closeThemeSwitcher();
      }
      
      // Number keys (1-5) select themes
      const themeKeys = ['1', '2', '3', '4', '5'];
      const themeNames = ['cyberpunk', 'neon', 'matrix', 'vaporwave', 'synthwave'];
      
      if (themeKeys.includes(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          return;
        }
        
        const themeIndex = parseInt(e.key) - 1;
        if (themeNames[themeIndex]) {
          this.setTheme(themeNames[themeIndex]);
        }
      }
    });
  }

  /**
   * Set theme
   */
  setTheme(themeName) {
    if (!this.themes[themeName]) {
      console.warn(`Theme "${themeName}" not found`);
      return;
    }

    const theme = this.themes[themeName];
    const root = document.documentElement;
    
    // Add transition class for smooth theme change
    document.body.classList.add('theme-transition');
    
    // Update body class
    document.body.className = document.body.className.replace(/theme-\w+/g, '') + ` theme-${themeName}`;
    
    // Apply CSS variables
    Object.entries(theme.vars).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });
    
    // Update current theme
    this.currentTheme = themeName;
    
    // Save to localStorage
    localStorage.setItem(this.THEME_KEY, themeName);
    
    // Update UI
    this.updateUI();
    
    // Trigger theme change event
    document.dispatchEvent(new CustomEvent('cyberpunk:themeChange', {
      detail: { theme: themeName, themeData: theme }
    }));
    
    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
    
    // Show notification
    this.showThemeNotification(theme.name);
  }

  /**
   * Toggle theme switcher visibility
   */
  toggleThemeSwitcher() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
      themeSwitcher.classList.toggle('active');
    }
  }

  /**
   * Close theme switcher
   */
  closeThemeSwitcher() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    if (themeSwitcher) {
      themeSwitcher.classList.remove('active');
    }
  }

  /**
   * Update UI to reflect current theme
   */
  updateUI() {
    // Update active theme button
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.theme === this.currentTheme) {
        btn.classList.add('active');
      }
    });

    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor && this.themes[this.currentTheme]) {
      metaThemeColor.content = this.themes[this.currentTheme].vars['--bg-primary'];
    }
  }

  /**
   * Show theme change notification
   */
  showThemeNotification(themeName) {
    // Remove existing notification
    const existingNotification = document.querySelector('.theme-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'theme-notification glass';
    notification.innerHTML = `
      <div class="theme-notification-content">
        <span class="theme-notification-icon">🎨</span>
        <span class="theme-notification-text">${themeName} theme activated</span>
      </div>
    `;

    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 16px',
      borderRadius: '8px',
      zIndex: '9999',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: 'var(--text-accent)',
      border: '1px solid var(--border-glow)',
      boxShadow: 'var(--shadow-glow)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      pointerEvents: 'none'
    });

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Get theme data
   */
  getThemeData(themeName = null) {
    const theme = themeName || this.currentTheme;
    return this.themes[theme] || null;
  }

  /**
   * Cycle through themes
   */
  cycleTheme() {
    const themeNames = Object.keys(this.themes);
    const currentIndex = themeNames.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    const nextTheme = themeNames[nextIndex];
    
    this.setTheme(nextTheme);
  }

  /**
   * Handle ready event
   */
  onReady() {
    // Add hover effects to theme buttons
    this.addThemeButtonEffects();
    
    // Initialize theme-specific effects
    this.initThemeEffects();
  }

  /**
   * Add hover effects to theme buttons
   */
  addThemeButtonEffects() {
    document.querySelectorAll('[data-theme]').forEach(btn => {
      const themeName = btn.dataset.theme;
      const theme = this.themes[themeName];
      
      if (theme) {
        btn.addEventListener('mouseenter', () => {
          btn.style.boxShadow = `0 0 15px ${theme.color}40`;
        });
        
        btn.addEventListener('mouseleave', () => {
          if (!btn.classList.contains('active')) {
            btn.style.boxShadow = '';
          }
        });
      }
    });
  }

  /**
   * Initialize theme-specific effects
   */
  initThemeEffects() {
    // Add scan line effect for cyberpunk themes
    if (!document.querySelector('.scan-line')) {
      const scanLine = document.createElement('div');
      scanLine.className = 'scan-line';
      document.body.appendChild(scanLine);
    }

    // Add matrix rain effect for matrix theme
    document.addEventListener('cyberpunk:themeChange', (e) => {
      const { theme } = e.detail;
      
      // Remove existing effects
      const existingMatrixRain = document.querySelector('.matrix-rain');
      if (existingMatrixRain) {
        existingMatrixRain.remove();
      }
      
      // Add matrix-specific effects
      if (theme === 'matrix') {
        const matrixRain = document.createElement('div');
        matrixRain.className = 'matrix-rain';
        document.body.appendChild(matrixRain);
      }
    });
  }

  /**
   * Export theme settings
   */
  exportSettings() {
    return {
      theme: this.currentTheme,
      timestamp: Date.now()
    };
  }

  /**
   * Import theme settings
   */
  importSettings(settings) {
    if (settings && settings.theme && this.themes[settings.theme]) {
      this.setTheme(settings.theme);
      return true;
    }
    return false;
  }
}

// Initialize theme switcher
const themeSwitcher = new ThemeSwitcher();

// Export for external use
window.ThemeSwitcher = ThemeSwitcher;
window.themeSwitcher = themeSwitcher;