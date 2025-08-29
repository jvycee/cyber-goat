/**
 * Cyberpunk Ghost Theme - Optimized Main (Carmack-style)
 * Direct, efficient, no unnecessary abstractions
 */

(function() {
  'use strict';
  
  // Single state object - no classes, no BS
  const state = {
    mobileMenuOpen: false,
    searchOpen: false,
    scrollY: 0,
    theme: localStorage.getItem('cyberpunk-theme') || 'cyberpunk'
  };
  
  // Cache DOM elements once
  const dom = {};
  
  // Initialize on DOM ready
  function init() {
    // Cache all elements at once
    dom.body = document.body;
    dom.mobileToggle = document.getElementById('mobileMenuToggle');
    dom.mobileNav = document.getElementById('mobileNavigation');
    dom.searchToggle = document.getElementById('searchToggle');
    dom.searchOverlay = document.getElementById('searchOverlay');
    dom.searchInput = document.getElementById('searchInput');
    dom.searchResults = document.getElementById('searchResults');
    dom.progressBar = document.getElementById('readingProgressBar');
    dom.backToTop = document.getElementById('backToTop');
    
    // Single event listener for all clicks (event delegation)
    document.addEventListener('click', handleClick);
    
    // Optimized scroll handler (RAF-based)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
    
    // Search input (debounced)
    if (dom.searchInput) {
      let searchTimer;
      dom.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => search(e.target.value), 300);
      });
    }
    
    // Apply stored theme
    dom.body.className = `theme-${state.theme}`;
  }
  
  // Single click handler for everything (event delegation)
  function handleClick(e) {
    const target = e.target;
    
    // Mobile menu toggle
    if (target.closest('#mobileMenuToggle')) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      dom.mobileNav?.classList.toggle('active', state.mobileMenuOpen);
      dom.mobileToggle?.classList.toggle('active', state.mobileMenuOpen);
      dom.body.style.overflow = state.mobileMenuOpen ? 'hidden' : '';
      return;
    }
    
    // Search toggle
    if (target.closest('#searchToggle')) {
      openSearch();
      return;
    }
    
    // Search close
    if (target.closest('#searchClose') || target === dom.searchOverlay) {
      closeSearch();
      return;
    }
    
    // Theme selector
    const themeBtn = target.closest('[data-theme]');
    if (themeBtn) {
      setTheme(themeBtn.dataset.theme);
      return;
    }
    
    // Smooth scroll for anchors
    const anchor = target.closest('a[href^="#"]');
    if (anchor) {
      e.preventDefault();
      const targetEl = document.querySelector(anchor.getAttribute('href'));
      targetEl?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Back to top
    if (target.closest('#backToTop')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Close mobile menu when clicking outside
    if (state.mobileMenuOpen && !target.closest('#mobileNavigation') && !target.closest('#mobileMenuToggle')) {
      state.mobileMenuOpen = false;
      dom.mobileNav?.classList.remove('active');
      dom.mobileToggle?.classList.remove('active');
      dom.body.style.overflow = '';
    }
  }
  
  // Optimized scroll handler
  function updateScroll() {
    state.scrollY = window.pageYOffset;
    
    // Reading progress
    if (dom.progressBar) {
      const progress = (state.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      dom.progressBar.style.width = Math.min(progress, 100) + '%';
    }
    
    // Back to top visibility
    if (dom.backToTop) {
      dom.backToTop.classList.toggle('visible', state.scrollY > 300);
    }
    
    // Reset ticking
    ticking = false;
  }
  
  // Keyboard handler
  function handleKeyboard(e) {
    // Skip if typing in input
    if (e.target.matches('input, textarea')) return;
    
    switch(e.key) {
      case 'Escape':
        closeSearch();
        if (state.mobileMenuOpen) {
          state.mobileMenuOpen = false;
          dom.mobileNav?.classList.remove('active');
          dom.mobileToggle?.classList.remove('active');
          dom.body.style.overflow = '';
        }
        break;
      case 'k':
        if (e.metaKey || e.ctrlKey) {
          e.preventDefault();
          openSearch();
        }
        break;
    }
  }
  
  // Search functions
  function openSearch() {
    state.searchOpen = true;
    dom.searchOverlay?.classList.add('active');
    dom.body.style.overflow = 'hidden';
    setTimeout(() => dom.searchInput?.focus(), 100);
  }
  
  function closeSearch() {
    state.searchOpen = false;
    dom.searchOverlay?.classList.remove('active');
    dom.body.style.overflow = '';
  }
  
  // Optimized search (no innerHTML manipulation)
  async function search(query) {
    if (!dom.searchResults) return;
    
    if (!query.trim()) {
      dom.searchResults.textContent = '';
      const placeholder = document.createElement('div');
      placeholder.className = 'search-placeholder';
      placeholder.innerHTML = '<div class="search-icon-large">🔍</div><p>Enter keywords to search</p>';
      dom.searchResults.appendChild(placeholder);
      return;
    }
    
    // Show loading (reuse existing elements)
    dom.searchResults.textContent = 'Searching...';
    
    try {
      const response = await fetch(`/ghost/api/v3/content/posts/?key=${window.ghostPublicApiKey}&q=${encodeURIComponent(query)}&limit=5&fields=title,slug,excerpt,published_at`);
      const data = await response.json();
      
      // Clear and rebuild results (no innerHTML)
      dom.searchResults.textContent = '';
      
      if (!data.posts?.length) {
        dom.searchResults.textContent = 'No posts found';
        return;
      }
      
      // Create results efficiently
      const fragment = document.createDocumentFragment();
      data.posts.forEach(post => {
        const result = document.createElement('div');
        result.className = 'search-result';
        
        const title = document.createElement('h4');
        title.className = 'search-result-title';
        const link = document.createElement('a');
        link.href = `/${post.slug}/`;
        link.textContent = post.title;
        title.appendChild(link);
        
        const excerpt = document.createElement('p');
        excerpt.className = 'search-result-excerpt';
        excerpt.textContent = post.excerpt || '';
        
        const meta = document.createElement('div');
        meta.className = 'search-result-meta';
        const time = document.createElement('time');
        time.textContent = new Date(post.published_at).toLocaleDateString();
        meta.appendChild(time);
        
        result.appendChild(title);
        result.appendChild(excerpt);
        result.appendChild(meta);
        fragment.appendChild(result);
      });
      
      dom.searchResults.appendChild(fragment);
    } catch (error) {
      dom.searchResults.textContent = 'Search unavailable';
    }
  }
  
  // Theme switcher (minimal)
  function setTheme(themeName) {
    state.theme = themeName;
    localStorage.setItem('cyberpunk-theme', themeName);
    dom.body.className = `theme-${themeName}`;
    
    // Close theme switcher
    const switcher = document.getElementById('themeSwitcher');
    switcher?.classList.remove('active');
  }
  
  // Initialize when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose minimal API
  window.cyberpunk = { state, setTheme };
  
})();