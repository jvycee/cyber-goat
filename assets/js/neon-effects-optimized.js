/**
 * Cyberpunk Neon Effects - Optimized (Carmack-style)
 * Performance-first particle system with proper resource management
 */

(function() {
  'use strict';
  
  // Configuration
  const config = {
    maxParticles: 30,  // Reduced from 50
    particleLife: 2000, // ms
    fps: 30,           // Reduced from 60fps
    enabled: true
  };
  
  // State
  const particles = [];
  let canvas, ctx;
  let animationId;
  let lastFrame = 0;
  let visible = true;
  
  // Initialize
  function init() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      config.enabled = false;
      return;
    }
    
    createCanvas();
    
    // Visibility API to pause when tab is hidden
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Start animation
    if (config.enabled) {
      startAnimation();
    }
  }
  
  // Create canvas
  function createCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'particles';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0.4';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d', { alpha: true });
    
    // Size canvas
    resize();
    window.addEventListener('resize', throttle(resize, 250));
  }
  
  // Resize canvas
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Handle visibility change (pause when tab is hidden)
  function handleVisibilityChange() {
    visible = !document.hidden;
    if (visible && config.enabled) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }
  
  // Start animation
  function startAnimation() {
    if (animationId) return;
    lastFrame = performance.now();
    animate();
  }
  
  // Stop animation
  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }
  
  // Main animation loop (optimized)
  function animate() {
    const now = performance.now();
    const delta = now - lastFrame;
    
    // Limit to configured FPS
    if (delta < 1000 / config.fps) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    
    lastFrame = now;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    updateParticles(delta);
    drawParticles();
    
    // Continue if visible
    if (visible && config.enabled) {
      animationId = requestAnimationFrame(animate);
    }
  }
  
  // Update particles (optimized)
  function updateParticles(delta) {
    const dt = delta / 1000; // Convert to seconds
    
    // Update existing particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      
      // Update position
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      
      // Update life
      p.life -= delta;
      
      // Remove dead particles
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
      
      // Wrap around screen (cheaper than creating new particles)
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    }
    
    // Add new particles (limited)
    while (particles.length < config.maxParticles) {
      particles.push(createParticle());
    }
  }
  
  // Create particle (optimized)
  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)`, // HSL is faster
      life: config.particleLife
    };
  }
  
  // Draw particles (batch rendering)
  function drawParticles() {
    // Batch by color to reduce state changes
    ctx.save();
    
    particles.forEach(p => {
      const opacity = p.life / config.particleLife;
      ctx.globalAlpha = opacity * 0.6;
      ctx.fillStyle = p.color;
      
      // Simple circle (no shadows for performance)
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.restore();
  }
  
  // Throttle function
  function throttle(func, limit) {
    let timeout;
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func.apply(this, args);
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          lastCall = Date.now();
          func.apply(this, args);
        }, limit - (now - lastCall));
      }
    };
  }
  
  // Cleanup
  function destroy() {
    stopAnimation();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    canvas?.remove();
    particles.length = 0;
  }
  
  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose API
  window.neonEffects = {
    pause: stopAnimation,
    resume: startAnimation,
    destroy,
    setEnabled: (enabled) => {
      config.enabled = enabled;
      enabled ? startAnimation() : stopAnimation();
    }
  };
  
})();