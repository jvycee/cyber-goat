/**
 * Cyberpunk Ghost Theme - Neon Effects
 * Special visual effects and interactions
 */

class NeonEffects {
  constructor() {
    this.init();
  }

  /**
   * Initialize neon effects
   */
  init() {
    this.bindEvents();
    this.initParticleSystem();
    this.initMouseTracker();
    this.initTextEffects();
    this.initImageEffects();
    
    // Wait for DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.onDOMReady();
      });
    } else {
      this.onDOMReady();
    }
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Listen for theme changes
    document.addEventListener('cyberpunk:themeChange', (e) => {
      this.onThemeChange(e.detail);
    });

    // Mouse movement for glow effects
    document.addEventListener('mousemove', (e) => {
      this.handleMouseMove(e);
    });

    // Click effects
    document.addEventListener('click', (e) => {
      this.handleClick(e);
    });
  }

  /**
   * Handle DOM ready
   */
  onDOMReady() {
    this.initGlowEffects();
    this.initHoverEffects();
    this.initScrollEffects();
    this.initTypingEffects();
  }

  /**
   * Initialize particle system
   */
  initParticleSystem() {
    this.particles = [];
    this.maxParticles = 50;
    this.createParticleCanvas();
    this.startParticleAnimation();
  }

  /**
   * Create particle canvas
   */
  createParticleCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'neon-particles';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.6;
    `;
    
    document.body.appendChild(canvas);
    
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  /**
   * Resize canvas
   */
  resizeCanvas() {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Create particle
   */
  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: this.getRandomNeonColor(),
      life: 1.0,
      decay: Math.random() * 0.01 + 0.005
    };
  }

  /**
   * Get random neon color
   */
  getRandomNeonColor() {
    const colors = [
      'rgba(0, 255, 255, ',    // cyan
      'rgba(255, 0, 128, ',    // pink
      'rgba(0, 255, 65, ',     // green
      'rgba(139, 92, 246, ',   // purple
      'rgba(255, 107, 0, '     // orange
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Update particles
   */
  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= particle.decay;
      
      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    // Add new particles
    while (this.particles.length < this.maxParticles) {
      this.particles.push(this.createParticle());
    }
  }

  /**
   * Draw particles
   */
  drawParticles() {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color + (particle.opacity * particle.life) + ')';
      this.ctx.fill();
      
      // Add glow effect
      this.ctx.shadowColor = particle.color + '0.8)';
      this.ctx.shadowBlur = particle.size * 2;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }

  /**
   * Start particle animation
   */
  startParticleAnimation() {
    const animate = () => {
      this.updateParticles();
      this.drawParticles();
      requestAnimationFrame(animate);
    };
    animate();
  }

  /**
   * Initialize mouse tracker
   */
  initMouseTracker() {
    this.mouseTrail = [];
    this.maxTrailLength = 20;
  }

  /**
   * Handle mouse move
   */
  handleMouseMove(e) {
    // Update mouse trail
    this.mouseTrail.unshift({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (this.mouseTrail.length > this.maxTrailLength) {
      this.mouseTrail.pop();
    }
    
    // Update CSS custom properties for mouse position
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    
    // Create particles on mouse move (occasionally)
    if (Math.random() < 0.1) {
      this.createMouseParticle(e.clientX, e.clientY);
    }
  }

  /**
   * Create mouse particle
   */
  createMouseParticle(x, y) {
    const particle = {
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: 0.8,
      color: this.getRandomNeonColor(),
      life: 1.0,
      decay: 0.02
    };
    
    this.particles.push(particle);
  }

  /**
   * Handle click effects
   */
  handleClick(e) {
    // Create explosion of particles on click
    this.createClickExplosion(e.clientX, e.clientY);
    
    // Add ripple effect
    this.createRippleEffect(e.clientX, e.clientY);
  }

  /**
   * Create click explosion
   */
  createClickExplosion(x, y) {
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10;
      const speed = Math.random() * 3 + 2;
      
      const particle = {
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        opacity: 1.0,
        color: this.getRandomNeonColor(),
        life: 1.0,
        decay: 0.03
      };
      
      this.particles.push(particle);
    }
  }

  /**
   * Create ripple effect
   */
  createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.cssText = `
      position: fixed;
      left: ${x - 25}px;
      top: ${y - 25}px;
      width: 50px;
      height: 50px;
      border: 2px solid var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: ripple-expand 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    // Remove after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }

  /**
   * Initialize glow effects
   */
  initGlowEffects() {
    // Add glow to buttons and links
    const glowElements = document.querySelectorAll('.btn, .nav-link, .post-card-title-link');
    
    glowElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.addGlowEffect(element);
      });
      
      element.addEventListener('mouseleave', () => {
        this.removeGlowEffect(element);
      });
    });
  }

  /**
   * Add glow effect to element
   */
  addGlowEffect(element) {
    element.style.transition = 'all 0.3s ease';
    element.style.textShadow = '0 0 10px var(--accent), 0 0 20px var(--accent)';
    element.style.boxShadow = '0 0 15px var(--accent)';
  }

  /**
   * Remove glow effect from element
   */
  removeGlowEffect(element) {
    element.style.textShadow = '';
    element.style.boxShadow = '';
  }

  /**
   * Initialize hover effects
   */
  initHoverEffects() {
    // Post card hover effects
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.addCardHoverEffect(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.removeCardHoverEffect(card);
      });
      
      card.addEventListener('mousemove', (e) => {
        this.updateCardHoverEffect(card, e);
      });
    });
  }

  /**
   * Add card hover effect
   */
  addCardHoverEffect(card) {
    card.style.transform = 'translateY(-5px) scale(1.02)';
    card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px var(--accent)';
  }

  /**
   * Remove card hover effect
   */
  removeCardHoverEffect(card) {
    card.style.transform = '';
    card.style.boxShadow = '';
  }

  /**
   * Update card hover effect based on mouse position
   */
  updateCardHoverEffect(card, e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `translateY(-5px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  /**
   * Initialize scroll effects
   */
  initScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.post-card, .hero-title, .section-title');
    animatedElements.forEach(el => observer.observe(el));
  }

  /**
   * Animate element on scroll
   */
  animateElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease';
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  /**
   * Initialize text effects
   */
  initTextEffects() {
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      this.addTypingEffect(heroTitle);
    }
  }

  /**
   * Add typing effect to text element
   */
  addTypingEffect(element) {
    const text = element.textContent;
    const typingSpeed = 100;
    let currentIndex = 0;
    
    element.textContent = '';
    element.style.borderRight = '2px solid var(--accent)';
    element.style.animation = 'blink 1s infinite';
    
    const typeChar = () => {
      if (currentIndex < text.length) {
        element.textContent += text[currentIndex];
        currentIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          element.style.borderRight = 'none';
          element.style.animation = 'none';
        }, 1000);
      }
    };
    
    // Start typing after a delay
    setTimeout(typeChar, 500);
  }

  /**
   * Initialize typing effects
   */
  initTypingEffects() {
    // Add CSS for typing cursor
    if (!document.querySelector('#typing-cursor-style')) {
      const style = document.createElement('style');
      style.id = 'typing-cursor-style';
      style.textContent = `
        @keyframes blink {
          0%, 50% { border-color: var(--accent); }
          51%, 100% { border-color: transparent; }
        }
        
        @keyframes ripple-expand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Initialize image effects
   */
  initImageEffects() {
    const images = document.querySelectorAll('.cyberpunk-image');
    
    images.forEach(img => {
      img.addEventListener('mouseenter', () => {
        this.addImageGlitchEffect(img);
      });
      
      img.addEventListener('mouseleave', () => {
        this.removeImageGlitchEffect(img);
      });
    });
  }

  /**
   * Add glitch effect to image
   */
  addImageGlitchEffect(img) {
    img.style.filter = 'hue-rotate(90deg) contrast(1.2) brightness(1.1)';
    img.style.animation = 'glitch 0.3s infinite';
  }

  /**
   * Remove glitch effect from image
   */
  removeImageGlitchEffect(img) {
    img.style.filter = '';
    img.style.animation = '';
  }

  /**
   * Handle theme change
   */
  onThemeChange(themeData) {
    // Update particle colors based on new theme
    this.updateParticleColors(themeData.theme);
    
    // Update special effects based on theme
    this.updateThemeEffects(themeData.theme);
  }

  /**
   * Update particle colors for theme
   */
  updateParticleColors(themeName) {
    // This would update the particle system colors
    // based on the new theme's color palette
    this.particles.forEach(particle => {
      particle.color = this.getRandomNeonColor();
    });
  }

  /**
   * Update theme-specific effects
   */
  updateThemeEffects(themeName) {
    // Remove existing theme effects
    const existingEffects = document.querySelectorAll('.theme-effect');
    existingEffects.forEach(effect => effect.remove());
    
    // Add theme-specific effects
    switch (themeName) {
      case 'matrix':
        this.addMatrixEffect();
        break;
      case 'cyberpunk':
        this.addCyberpunkEffect();
        break;
      case 'neon':
        this.addNeonEffect();
        break;
      case 'vaporwave':
        this.addVaporwaveEffect();
        break;
      case 'synthwave':
        this.addSynthwaveEffect();
        break;
    }
  }

  /**
   * Add Matrix-specific effect
   */
  addMatrixEffect() {
    // Add falling characters effect
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.className = 'theme-effect';
    matrixCanvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.1;
    `;
    
    document.body.appendChild(matrixCanvas);
    
    // Matrix rain animation would go here
    this.startMatrixRain(matrixCanvas);
  }

  /**
   * Start Matrix rain animation
   */
  startMatrixRain(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const matrixArray = matrix.split('');
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    setInterval(draw, 35);
  }

  /**
   * Add other theme effects (placeholders)
   */
  addCyberpunkEffect() {
    // Add cyberpunk-specific visual effects
  }

  addNeonEffect() {
    // Add neon-specific visual effects
  }

  addVaporwaveEffect() {
    // Add vaporwave-specific visual effects
  }

  addSynthwaveEffect() {
    // Add synthwave-specific visual effects
  }

  /**
   * Cleanup function
   */
  destroy() {
    // Remove particle canvas
    if (this.canvas) {
      this.canvas.remove();
    }
    
    // Remove theme effects
    const themeEffects = document.querySelectorAll('.theme-effect');
    themeEffects.forEach(effect => effect.remove());
    
    // Remove event listeners
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('click', this.handleClick);
  }
}

// Initialize neon effects
const neonEffects = new NeonEffects();

// Export for external use
window.NeonEffects = NeonEffects;
window.neonEffects = neonEffects;