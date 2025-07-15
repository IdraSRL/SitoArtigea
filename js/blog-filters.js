// Blog Category Filters - Artigea s.r.l.

class BlogFilters {
    constructor() {
        this.currentFilter = 'all';
        this.blogCards = document.querySelectorAll('.blog-card');
        this.categoryCards = document.querySelectorAll('.category-card');
        this.filterStatus = document.getElementById('filter-status');
        this.blogGrid = document.querySelector('.blog__grid');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCounts();
        this.initializeFilters();
    }

    initializeFilters() {
        // Ensure all blog cards have proper data attributes
        this.blogCards.forEach(card => {
            if (!card.dataset.category) {
                // Try to extract category from the category span
                const categorySpan = card.querySelector('.blog-card__category');
                if (categorySpan) {
                    const categoryText = categorySpan.textContent.trim().toLowerCase();
                    // Map Italian category names to filter keys
                    const categoryMap = {
                        'guide': 'guide',
                        'guide casa': 'guide',
                        'ambiente': 'ambiente',
                        'business': 'business',
                        'sanificazione': 'sanificazione',
                        'salute': 'salute',
                        'consigli': 'guide'
                    };
                    card.dataset.category = categoryMap[categoryText] || 'guide';
                } else {
                    // Default category if none found
                    card.dataset.category = 'guide';
                }
            }
        });

        // Set initial filter state
        this.updateActiveCategoryCard('all');
        this.updateFilterStatus('all', this.blogCards.length);
    }

    setupEventListeners() {
        // Add click listeners to category cards
        this.categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const category = card.dataset.category;
                this.filterByCategory(category);
                
                // Track filter usage if analytics available
                if (window.cookieConsent && window.cookieConsent.hasConsent('analytics')) {
                    window.cookieConsent.trackEvent('blog_filter_used', {
                        category: category,
                        articles_shown: this.getVisibleArticlesCount()
                    });
                }
            });

            // Add keyboard support for accessibility
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const category = card.dataset.category;
                    this.filterByCategory(category);
                }
            });

            // Make cards focusable
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Filtra articoli per categoria: ${card.querySelector('.category-card__title').textContent}`);
        });
    }

    filterByCategory(category) {
        // Don't filter if already active
        if (this.currentFilter === category) {
            return;
        }

        this.currentFilter = category;
        
        // Add loading state
        if (this.blogGrid) {
            this.blogGrid.classList.add('loading');
        }
        
        // Update active category card
        this.updateActiveCategoryCard(category);
        
        // Filter articles with animation
        setTimeout(() => {
            this.animateFilterChange(category);
        }, 150);
    }

    updateActiveCategoryCard(category) {
        this.categoryCards.forEach(card => {
            card.classList.remove('active');
            card.setAttribute('aria-pressed', 'false');
            if (card.dataset.category === category) {
                card.classList.add('active');
                card.setAttribute('aria-pressed', 'true');
            }
        });
    }

    animateFilterChange(category) {
        // First, fade out all cards
        this.blogCards.forEach(card => {
            card.classList.add('fade-out');
        });

        setTimeout(() => {
            // Hide/show cards based on category
            let visibleCount = 0;
            
            this.blogCards.forEach(card => {
                const cardCategory = card.dataset.category;
                const shouldShow = category === 'all' || cardCategory === category;
                
                if (shouldShow) {
                    card.classList.remove('hidden', 'fade-out');
                    card.classList.add('fade-in');
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('fade-in');
                    card.style.display = 'none';
                }
            });

            // Update filter status
            this.updateFilterStatus(category, visibleCount);
            
            // Remove loading state
            if (this.blogGrid) {
                this.blogGrid.classList.remove('loading');
            }
            
            // Show empty state if no articles
            this.toggleEmptyState(visibleCount === 0);
            
        }, 300);
    }

    updateFilterStatus(category, visibleCount) {
        if (!this.filterStatus) return;

        if (category === 'all') {
            this.filterStatus.style.display = 'none';
        } else {
            this.filterStatus.style.display = 'flex';
            const categoryName = this.getCategoryDisplayName(category);
            
            // Update count in status
            const countText = visibleCount === 1 ? '1 articolo' : `${visibleCount} articoli`;
            this.filterStatus.innerHTML = `
                <p>Mostrando ${countText} per: <span class="filter-category">${categoryName}</span></p>
                <button onclick="clearFilter()" class="btn btn--text">Mostra tutti</button>
            `;
        }
    }

    getCategoryDisplayName(category) {
        const categoryMap = {
            'guide': 'Guide Casa',
            'business': 'Business',
            'ambiente': 'Ambiente',
            'sanificazione': 'Sanificazione',
            'salute': 'Salute'
        };
        return categoryMap[category] || category;
    }

    toggleEmptyState(show) {
        let emptyState = document.querySelector('.empty-state');
        
        if (show && !emptyState) {
            // Create empty state if it doesn't exist
            emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <div class="empty-state__content">
                    <h3>Nessun articolo trovato</h3>
                    <p>Non ci sono articoli per questa categoria al momento.</p>
                    <button class="btn btn--primary" onclick="clearFilter()">Mostra tutti gli articoli</button>
                </div>
            `;
            
            if (this.blogGrid && this.blogGrid.parentNode) {
                this.blogGrid.parentNode.insertBefore(emptyState, this.blogGrid.nextSibling);
            }
        }
        
        if (emptyState) {
            emptyState.classList.toggle('show', show);
        }
    }

    getVisibleArticlesCount() {
        return Array.from(this.blogCards).filter(card => 
            !card.classList.contains('hidden') && 
            card.style.display !== 'none'
        ).length;
    }

    updateCounts() {
        // Count articles by category based on actual DOM elements
        const categoryCounts = {};
        let totalCount = 0;

        // Count actual articles in the DOM
        this.blogCards.forEach(card => {
            const category = card.dataset.category || 'guide';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            totalCount++;
        });

        console.log('Article counts by category:', categoryCounts);
        console.log('Total articles:', totalCount);

        // Update count displays in category cards
        this.categoryCards.forEach(card => {
            const category = card.dataset.category;
            const countElement = card.querySelector('.category-card__count');
            
            if (!countElement) {
                console.warn(`Count element not found for category: ${category}`);
                return;
            }
            
            if (category === 'all') {
                const countText = totalCount === 1 ? '1 articolo' : `${totalCount} articoli`;
                countElement.textContent = countText;
            } else if (categoryCounts[category]) {
                const count = categoryCounts[category];
                const countText = count === 1 ? '1 articolo' : `${count} articoli`;
                countElement.textContent = countText;
            } else {
                countElement.textContent = '0 articoli';
            }
        });

        // Update any other counters on the page
        this.updatePageCounters(totalCount, categoryCounts);
    }

    updatePageCounters(totalCount, categoryCounts) {
        // Update main blog section counter if it exists
        const blogCounter = document.querySelector('.blog-counter');
        if (blogCounter) {
            const countText = totalCount === 1 ? '1 articolo disponibile' : `${totalCount} articoli disponibili`;
            blogCounter.textContent = countText;
        }

        // Update section subtitle if it mentions article count
        const sectionSubtitle = document.querySelector('.blog .section__subtitle');
        if (sectionSubtitle && sectionSubtitle.textContent.includes('articoli')) {
            const baseText = 'Guide professionali e consigli utili per la pulizia e manutenzione dei tuoi ambienti';
            const countText = totalCount > 0 ? ` - ${totalCount} articoli disponibili` : '';
            sectionSubtitle.textContent = baseText + countText;
        }
    }

    // Method to refresh counts (useful for dynamic content)
    refreshCounts() {
        this.blogCards = document.querySelectorAll('.blog-card');
        this.updateCounts();
    }

    // Method to clear filter (called from global scope)
    clearFilter() {
        this.filterByCategory('all');
    }

    // Method to get current filter state
    getCurrentFilter() {
        return this.currentFilter;
    }

    // Method to get category statistics
    getCategoryStats() {
        const stats = {};
        let total = 0;

        this.blogCards.forEach(card => {
            const category = card.dataset.category || 'guide';
            stats[category] = (stats[category] || 0) + 1;
            total++;
        });

        return {
            categories: stats,
            total: total
        };
    }
}

// Global function for clear filter button
function clearFilter() {
    if (window.blogFilters) {
        window.blogFilters.clearFilter();
    }
}

// Search functionality
class BlogSearch {
    constructor() {
        this.searchInput = document.getElementById('blog-search');
        this.blogCards = document.querySelectorAll('.blog-card');
        this.searchResults = document.querySelector('.search-results');
        
        if (this.searchInput) {
            this.init();
        }
    }

    init() {
        // Debounce search input
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                this.filterBySearch(searchTerm);
            }, 300);
        });

        // Clear search on escape
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
    }

    filterBySearch(searchTerm) {
        if (!searchTerm) {
            this.clearSearch();
            return;
        }

        let matchCount = 0;

        this.blogCards.forEach(card => {
            const title = card.querySelector('.blog-card__title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.blog-card__excerpt')?.textContent.toLowerCase() || '';
            const category = card.querySelector('.blog-card__category')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          excerpt.includes(searchTerm) || 
                          category.includes(searchTerm);
            
            if (matches) {
                card.style.display = '';
                card.classList.remove('hidden');
                matchCount++;
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });

        this.updateSearchResults(searchTerm, matchCount);

        // Track search if analytics available
        if (window.cookieConsent && window.cookieConsent.hasConsent('analytics')) {
            window.cookieConsent.trackEvent('blog_search', {
                search_term: searchTerm,
                results_count: matchCount
            });
        }
    }

    updateSearchResults(searchTerm, matchCount) {
        if (!this.searchResults) {
            this.createSearchResults();
        }

        if (searchTerm) {
            const resultText = matchCount === 1 
                ? `1 risultato per "${searchTerm}"` 
                : `${matchCount} risultati per "${searchTerm}"`;
            
            this.searchResults.innerHTML = `
                <p>${resultText}</p>
                <button onclick="clearSearch()" class="btn btn--text">Cancella ricerca</button>
            `;
            this.searchResults.style.display = 'flex';
        } else {
            this.searchResults.style.display = 'none';
        }
    }

    createSearchResults() {
        this.searchResults = document.createElement('div');
        this.searchResults.className = 'search-results';
        
        const blogGrid = document.querySelector('.blog__grid');
        if (blogGrid && blogGrid.parentNode) {
            blogGrid.parentNode.insertBefore(this.searchResults, blogGrid);
        }
    }

    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        
        this.blogCards.forEach(card => {
            card.style.display = '';
            card.classList.remove('hidden');
        });

        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }

        // Reset any active filters
        if (window.blogFilters) {
            window.blogFilters.refreshCounts();
        }
    }
}

// Global function for clear search
function clearSearch() {
    if (window.blogSearch) {
        window.blogSearch.clearSearch();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize filters
    window.blogFilters = new BlogFilters();
    
    // Initialize search
    window.blogSearch = new BlogSearch();
    
    // Debug information
    if (window.blogFilters) {
        const stats = window.blogFilters.getCategoryStats();
        console.log('Blog initialization complete:', stats);
    }
});

// Utility function to manually refresh counts (useful for dynamic content)
function refreshBlogCounts() {
    if (window.blogFilters) {
        window.blogFilters.refreshCounts();
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogFilters, BlogSearch, clearFilter, clearSearch, refreshBlogCounts };
}