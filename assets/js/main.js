/**
 * Cyberpunk Ghost Theme - Main JavaScript
 * Entry point for all theme functionality
 */

/**
 * Main theme initialization
 */
class CyberpunkTheme {
  constructor() {
    this.init();
  }

  /**
   * Initialize the theme
   */
  init() {
    this.initializeComponents();
    this.bindEvents();
    this.loadStoredPreferences();
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.onDOMReady();
      });
    } else {
      this.onDOMReady();
    }
  }

  /**
   * Initialize theme components
   */
  initializeComponents() {
    // Mobile menu functionality
    this.initMobileMenu();
    
    // Search functionality
    this.initSearch();
    
    // Reading progress (for posts/pages)
    this.initReadingProgress();
    
    // Table of contents
    this.initTableOfContents();
    
    // Back to top button
    this.initBackToTop();
    
    // Member portal integration
    this.initMemberPortal();
    
    // Newsletter forms
    this.initNewsletterForms();
    
    // Image lazy loading
    this.initLazyLoading();
  }

  /**
   * Bind global event listeners
   */
  bindEvents() {
    // Window resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // Scroll handler
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboard(e);
    });
  }

  /**
   * Handle DOM ready event
   */
  onDOMReady() {
    // Add loaded class to body
    document.body.classList.add('theme-loaded');
    
    // Initialize any components that need DOM to be ready
    this.initPostInteractions();
    this.initSmoothScrolling();
    
    // Trigger custom event
    document.dispatchEvent(new CustomEvent('cyberpunk:ready'));
  }

  /**
   * Initialize mobile menu
   */
  initMobileMenu() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNavigation');
    
    if (toggleBtn && mobileNav) {
      toggleBtn.addEventListener('click', () => {
        const isActive = toggleBtn.classList.contains('active');
        
        if (isActive) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu();
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !mobileNav.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }
  }

  /**
   * Open mobile menu
   */
  openMobileMenu() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNavigation');
    
    toggleBtn?.classList.add('active');
    mobileNav?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNavigation');
    
    toggleBtn?.classList.remove('active');
    mobileNav?.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Initialize search functionality
   */
  initSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    
    if (searchToggle && searchOverlay) {
      searchToggle.addEventListener('click', () => {
        this.openSearch();
      });

      searchClose?.addEventListener('click', () => {
        this.closeSearch();
      });

      searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
          this.closeSearch();
        }
      });

      // Search functionality
      if (searchInput) {
        searchInput.addEventListener('input', this.debounce((e) => {
          this.performSearch(e.target.value);
        }, 300));
      }
    }
  }

  /**
   * Open search overlay
   */
  openSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    
    searchOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus search input with a slight delay
    setTimeout(() => {
      searchInput?.focus();
    }, 100);
  }

  /**
   * Close search overlay
   */
  closeSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    
    searchOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Perform search
   */
  async performSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (!query.trim() || !resultsContainer) {
      resultsContainer.innerHTML = `
        <div class="search-placeholder">
          <div class="search-icon-large">🔍</div>
          <p class="search-placeholder-text">Enter keywords to search posts</p>
        </div>
      `;
      return;
    }

    // Show loading state
    resultsContainer.innerHTML = `
      <div class="search-loading">
        <div class="loading shimmer" style="height: 60px; margin-bottom: 16px;"></div>
        <div class="loading shimmer" style="height: 60px; margin-bottom: 16px;"></div>
        <div class="loading shimmer" style="height: 60px;"></div>
      </div>
    `;

    try {
      // Use Ghost's built-in search API
      const response = await fetch(`${window.location.origin}/ghost/api/v3/content/posts/?key=${window.ghostPublicApiKey}&q=${encodeURIComponent(query)}&limit=5&fields=title,slug,excerpt,published_at,feature_image`);
      const data = await response.json();
      
      this.displaySearchResults(data.posts || []);
    } catch (error) {
      console.error('Search error:', error);
      resultsContainer.innerHTML = `
        <div class="search-error">
          <p>Search is temporarily unavailable. Please try again later.</p>
        </div>
      `;
    }
  }

  /**
   * Display search results
   */
  displaySearchResults(posts) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (!posts.length) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>No posts found. Try different keywords.</p>
        </div>
      `;
      return;
    }

    const resultsHTML = posts.map(post => `
      <div class="search-result">
        <h4 class="search-result-title">
          <a href="/${post.slug}/">${post.title}</a>
        </h4>
        <p class="search-result-excerpt">${post.excerpt || ''}</p>
        <div class="search-result-meta">
          <time>${new Date(post.published_at).toLocaleDateString()}</time>
        </div>
      </div>
    `).join('');

    resultsContainer.innerHTML = `<div class="search-results-list">${resultsHTML}</div>`;
  }

  /**
   * Initialize reading progress
   */
  initReadingProgress() {
    const progressBar = document.getElementById('readingProgressBar');
    
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener('scroll', this.throttle(updateProgress, 16));
  }

  /**
   * Initialize table of contents
   */
  initTableOfContents() {
    const tocContainer = document.getElementById('tableOfContents');
    const tocNav = document.getElementById('tocNav');
    const tocToggle = document.getElementById('tocToggle');
    
    if (!tocContainer || !tocNav) return;

    // Generate TOC from headings
    this.generateTableOfContents();

    // Toggle TOC visibility
    if (tocToggle) {
      tocToggle.addEventListener('click', () => {
        tocContainer.classList.toggle('collapsed');
      });
    }

    // Update active TOC item on scroll
    window.addEventListener('scroll', this.throttle(() => {
      this.updateActiveTocItem();
    }, 100));
  }

  /**
   * Generate table of contents
   */
  generateTableOfContents() {
    const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .page-content h1, .page-content h2, .page-content h3');
    const tocNav = document.getElementById('tocNav');
    
    if (!headings.length || !tocNav) return;

    const tocHTML = Array.from(headings).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      
      const level = parseInt(heading.tagName.charAt(1));
      const indent = (level - 1) * 12;
      
      return `
        <a href="#${id}" class="toc-link" style="padding-left: ${indent}px;">
          ${heading.textContent}
        </a>
      `;
    }).join('');

    tocNav.innerHTML = tocHTML;

    // Add click handlers for smooth scrolling
    tocNav.querySelectorAll('.toc-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /**
   * Update active TOC item
   */
  updateActiveTocItem() {
    const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .page-content h1, .page-content h2, .page-content h3');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    if (!headings.length || !tocLinks.length) return;

    let activeHeading = null;
    const scrollTop = window.pageYOffset + 100;

    for (let i = headings.length - 1; i >= 0; i--) {
      if (headings[i].offsetTop <= scrollTop) {
        activeHeading = headings[i];
        break;
      }
    }

    tocLinks.forEach(link => link.classList.remove('active'));
    
    if (activeHeading) {
      const activeLink = document.querySelector(`.toc-link[href="#${activeHeading.id}"]`);
      activeLink?.classList.add('active');
    }
  }

  /**
   * Initialize back to top button
   */
  initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', this.throttle(() => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, 100));
  }

  /**
   * Initialize member portal integration
   */
  initMemberPortal() {
    // Member dropdown toggle
    const memberToggle = document.getElementById('memberToggle');
    const memberDropdown = document.getElementById('memberDropdown');
    
    if (memberToggle && memberDropdown) {
      memberToggle.addEventListener('click', () => {
        memberDropdown.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!memberToggle.contains(e.target) && !memberDropdown.contains(e.target)) {
          memberDropdown.classList.remove('active');
        }
      });
    }
  }

  /**
   * Initialize newsletter forms
   */
  initNewsletterForms() {
    const forms = document.querySelectorAll('[data-members-form="subscribe"]');
    
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleNewsletterSubmit(form);
      });
    });
  }

  /**
   * Handle newsletter form submission
   */
  async handleNewsletterSubmit(form) {
    const emailInput = form.querySelector('[data-members-email]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = form.querySelector('[data-members-success]');
    const errorMsg = form.querySelector('[data-members-error]');
    
    if (!emailInput || !submitBtn) return;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Hide previous messages
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    try {
      // This would integrate with Ghost's member API
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      if (successMsg) {
        successMsg.style.display = 'block';
        emailInput.value = '';
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      if (errorMsg) {
        errorMsg.style.display = 'block';
      }
    } finally {
      // Reset button state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  /**
   * Initialize image lazy loading
   */
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Initialize post interactions
   */
  initPostInteractions() {
    // Add mouse tracking for post cards
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /**
   * Load stored user preferences
   */
  loadStoredPreferences() {
    // This will be handled by the theme switcher module
    // But we can load other preferences here
    
    // Load reading preferences
    const fontSize = localStorage.getItem('cyberpunk-font-size');
    if (fontSize) {
      document.documentElement.style.setProperty('--reader-font-size', fontSize);
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
    
    // Update TOC position if needed
    this.updateTableOfContents();
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    // This is handled by individual scroll handlers
    // But we can add global scroll logic here if needed
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyboard(e) {
    // ESC key closes overlays
    if (e.key === 'Escape') {
      this.closeSearch();
      this.closeMobileMenu();
    }
    
    // CMD/Ctrl + K opens search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.openSearch();
    }
  }

  /**
   * Update table of contents on resize
   */
  updateTableOfContents() {
    // Regenerate TOC if content has changed
    if (window.innerWidth <= 768) {
      const tocContainer = document.getElementById('tableOfContents');
      if (tocContainer) {
        tocContainer.style.display = 'none';
      }
    } else {
      const tocContainer = document.getElementById('tableOfContents');
      if (tocContainer) {
        tocContainer.style.display = 'block';
      }
    }
  }

  /**
   * Debounce utility function
   */
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  /**
   * Throttle utility function
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize the theme when script loads
const cyberpunkTheme = new CyberpunkTheme();

// Export for potential external use
window.CyberpunkTheme = CyberpunkTheme;