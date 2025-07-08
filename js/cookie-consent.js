// Cookie Consent Management for Artigea Website

class CookieConsent {
    constructor() {
        this.cookieName = 'artigea-cookie-consent';
        this.cookieValue = 'accepted';
        this.expiryDays = 365;
        
        this.init();
    }

    init() {
        if (!this.hasConsent()) {
            this.showBanner();
        }
        this.setupEventListeners();
    }

    hasConsent() {
        return this.getCookie(this.cookieName) === this.cookieValue;
    }

    showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            // Small delay to ensure page is loaded
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000);
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            // Remove from DOM after animation
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    acceptCookies() {
        this.setCookie(this.cookieName, this.cookieValue, this.expiryDays);
        this.hideBanner();
        this.enableAnalytics();
        
        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('cookiesAccepted'));
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const expiresString = expires.toUTCString();
        
        document.cookie = `${name}=${value};expires=${expiresString};path=/;SameSite=Lax;Secure`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }

    enableAnalytics() {
        // Enable Google Analytics if consent is given
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }

        // Enable other analytics tools here
        this.enableCustomAnalytics();
    }

    enableCustomAnalytics() {
        // Custom analytics implementation
        // Track page view
        this.trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }

    trackEvent(eventName, parameters = {}) {
        // Only track if user has consented
        if (!this.hasConsent()) {
            return;
        }

        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }

        // Custom tracking logic can be added here
        console.log('Event tracked:', eventName, parameters);
    }

    setupEventListeners() {
        // Accept cookies button
        const acceptBtn = document.getElementById('accept-cookies');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                this.acceptCookies();
            });
        }

        // Track form interactions if consent given
        if (this.hasConsent()) {
            this.setupFormTracking();
            this.setupScrollTracking();
            this.setupClickTracking();
        }

        // Listen for consent acceptance
        window.addEventListener('cookiesAccepted', () => {
            this.setupFormTracking();
            this.setupScrollTracking();
            this.setupClickTracking();
        });
    }

    setupFormTracking() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                this.trackEvent('form_submit', {
                    form_name: 'contact_form'
                });
            });
        }

        // Track phone number clicks
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('phone_click', {
                    phone_number: link.href.replace('tel:', '')
                });
            });
        });

        // Track email clicks
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('email_click', {
                    email: link.href.replace('mailto:', '')
                });
            });
        });
    }

    setupScrollTracking() {
        let scrollDepth = 0;
        const thresholds = [25, 50, 75, 90];
        const trackedThresholds = new Set();

        const trackScrollDepth = () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScrollDepth = Math.round((scrollTop / documentHeight) * 100);

            if (currentScrollDepth > scrollDepth) {
                scrollDepth = currentScrollDepth;

                thresholds.forEach(threshold => {
                    if (scrollDepth >= threshold && !trackedThresholds.has(threshold)) {
                        trackedThresholds.add(threshold);
                        this.trackEvent('scroll_depth', {
                            depth_percentage: threshold
                        });
                    }
                });
            }
        };

        // Throttle scroll tracking
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(trackScrollDepth, 100);
        });
    }

    setupClickTracking() {
        // Track service card clicks
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.service-card__title')?.textContent || `Service ${index + 1}`;
                this.trackEvent('service_card_click', {
                    service_name: title
                });
            });
        });

        // Track blog card clicks
        document.querySelectorAll('.blog-card a').forEach(link => {
            link.addEventListener('click', () => {
                const title = link.textContent || 'Blog Article';
                this.trackEvent('blog_click', {
                    article_title: title,
                    article_url: link.href
                });
            });
        });

        // Track navigation clicks
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('navigation_click', {
                    link_text: link.textContent,
                    link_url: link.href
                });
            });
        });
    }

    // Privacy-friendly user identification
    generateUserHash() {
        // Generate a privacy-friendly user identifier
        const navigator_info = navigator.userAgent + navigator.language + screen.width + screen.height;
        let hash = 0;
        
        for (let i = 0; i < navigator_info.length; i++) {
            const char = navigator_info.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        return Math.abs(hash).toString(36);
    }

    // GDPR compliance methods
    exportUserData() {
        // Provide user data export functionality
        const userData = {
            consent_date: this.getCookie(this.cookieName + '_date'),
            user_hash: this.generateUserHash(),
            preferences: this.getUserPreferences()
        };
        
        return userData;
    }

    deleteUserData() {
        // Delete all user data
        this.setCookie(this.cookieName, '', -1);
        this.setCookie(this.cookieName + '_date', '', -1);
        
        // Clear other cookies
        document.cookie.split(";").forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
        
        // Disable analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    getUserPreferences() {
        return {
            analytics: this.hasConsent(),
            functional: true, // Always true for essential cookies
            marketing: false // Not implemented yet
        };
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});

// Utility function to check consent from other scripts
window.hasCookieConsent = function() {
    return window.cookieConsent ? window.cookieConsent.hasConsent() : false;
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CookieConsent;
}