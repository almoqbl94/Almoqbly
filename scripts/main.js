// Main JavaScript for AllMohtarif Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeSearch();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeAnimations();
    initializeLazyLoading();
});

// Search functionality
function initializeSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInputs = document.querySelectorAll('.search-input, .sidebar-search');
    
    // Toggle search overlay
    window.toggleSearch = function() {
        searchOverlay.classList.toggle('active');
        if (searchOverlay.classList.contains('active')) {
            const searchInput = searchOverlay.querySelector('.search-input');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };
    
    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            toggleSearch();
        }
    });
    
    // Close search on overlay click
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            toggleSearch();
        }
    });
    
    // Handle search form submissions
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(input.value);
            }
        });
    });
    
    // Search button clicks
    document.querySelectorAll('.search-btn, .search-submit').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.closest('.search-box, .search-container').querySelector('input');
            if (input) {
                performSearch(input.value);
            }
        });
    });
}

// Perform search operation
function performSearch(query) {
    if (!query.trim()) return;
    
    // Add loading state
    const searchBtn = document.querySelector('.search-submit');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    searchBtn.disabled = true;
    
    // Simulate search (replace with actual search functionality)
    setTimeout(() => {
        console.log(`Searching for: ${query}`);
        // Close search overlay
        toggleSearch();
        
        // Reset button
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
        
        // Show search results (implement as needed)
        showSearchResults(query);
    }, 1000);
}

// Show search results
function showSearchResults(query) {
    // This would typically navigate to a search results page
    // For now, we'll show an alert
    alert(`سيتم البحث عن: "${query}" في المقالات المتاحة`);
}

// Scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Create mobile menu toggle if it doesn't exist
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    
    if (window.innerWidth <= 768) {
        createMobileMenuToggle(header, nav);
    }
    
    // Recreate on window resize
    window.addEventListener('resize', function() {
        const existingToggle = document.querySelector('.mobile-menu-toggle');
        if (window.innerWidth <= 768 && !existingToggle) {
            createMobileMenuToggle(header, nav);
        } else if (window.innerWidth > 768 && existingToggle) {
            existingToggle.remove();
            nav.classList.remove('mobile-active');
        }
    });
}

// Create mobile menu toggle
function createMobileMenuToggle(header, nav) {
    const toggle = document.createElement('button');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
    toggle.setAttribute('aria-label', 'فتح القائمة');
    
    toggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-active');
        const icon = this.querySelector('i');
        if (nav.classList.contains('mobile-active')) {
            icon.className = 'fas fa-times';
            this.setAttribute('aria-label', 'إغلاق القائمة');
        } else {
            icon.className = 'fas fa-bars';
            this.setAttribute('aria-label', 'فتح القائمة');
        }
    });
    
    header.appendChild(toggle);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe article cards and widgets
    document.querySelectorAll('.article-card, .widget').forEach(el => {
        observer.observe(el);
    });
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Utility functions
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

function throttle(func, limit) {
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

// Theme switching (optional)
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Reading progress indicator
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0066FF, #0047B3);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }, 10));
}

// Initialize reading progress if on article page
if (document.querySelector('.article-content')) {
    initializeReadingProgress();
}

// Social sharing functionality
function initializeSocialSharing() {
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title} ${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Initialize social sharing
initializeSocialSharing();

// Back to top button
function initializeBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', 'العودة للأعلى');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        width: 48px;
        height: 48px;
        background: #0066FF;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
initializeBackToTop();

// Print styles optimization
window.addEventListener('beforeprint', function() {
    // Expand all collapsed content for printing
    document.querySelectorAll('.collapsed').forEach(el => {
        el.classList.remove('collapsed');
    });
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page load time:', pageLoadTime + 'ms');
            }, 0);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can send error reports to your analytics service here
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .main-header {
        transition: transform 0.3s ease;
    }
    
    .main-header.scrolled {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        color: #374151;
        font-size: 18px;
        cursor: pointer;
        padding: 8px;
        border-radius: 6px;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .main-nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .main-nav.mobile-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu {
            flex-direction: column;
            padding: 16px;
        }
    }
`;
document.head.appendChild(style);